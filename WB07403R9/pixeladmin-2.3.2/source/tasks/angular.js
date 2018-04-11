// Modules
var fs          = require('fs');
var path        = require('path');
var gulp        = require('gulp');
var _           = require('lodash');
var util        = require('./util');
var runSequence = require('run-sequence').use(gulp);

// Gulp config
var config = require('../config.js').get();

// Gulp plugins
var gulpUglify = require('gulp-uglify');
var gulpConcat = require('gulp-concat');
var gulpFilter = require('gulp-filter');
var through    = require('through2');

// Paths
var JS_PATH           = path.join(config.paths.root, config.paths.js);
var CUSTOM_PATH       = path.join(config.paths.root, config.paths.custom);
var ANGULAR_PATH      = path.join(config.paths.root, config.paths.jsAngular);
var ANGULAR_DIST_PATH = path.join(config.paths.root, config.paths.distAngular);

var UI_BOOTSTRAP_FILE_NAME = 'ui-bootstrap.js';

var CUSTOM_JS_PATH  = path.join(config.paths.root, config.paths.customJs);
var BUILD_CUSTOM_JS = fs.existsSync(path.join(CUSTOM_PATH, 'custom.js')) || fs.existsSync(CUSTOM_JS_PATH);


// Utilities
//

function createCompileTasks(files) {
  'use strict';

  return files.reduce(function(tasks, relativePath) {
    var filePath = path.join(JS_PATH, relativePath);
    var fileName = path.basename(filePath);
    var dirPath  = path.dirname(filePath);

    if (!fs.existsSync(filePath)) { return tasks; }

    var taskName = 'compile-angular-' + fileName.replace(/\.js$/, '');
    var sources  = [];

    // Collect js sources to require
    fs.readFileSync(filePath, 'utf-8')
      .replace(/\/\/=\s+require\s+(.*)\s*/gi, function(_m_, $1) {
        sources.push(util.checkJsPathExistence(path.join(dirPath, $1)));
        return '';
      });

    gulp.task(taskName, function() {
      var stream;

      stream = gulp
        .src(sources, { base: '.' })
        .pipe(gulpConcat(fileName));

      if (config.dist.minifyJs) {
        stream = stream.pipe(gulpUglify());
      }

      return stream.pipe(gulp.dest(ANGULAR_DIST_PATH));
    });

    return tasks.concat([taskName]);
  }, []);
}

function createCopyTasks(files) {
  'use strict';

  return files.reduce(function(tasks, relativePath) {
    var filePath = path.join(JS_PATH, relativePath);
    var fileName = path.basename(filePath);
    var dirPath  = path.dirname(filePath);

    if (!fs.existsSync(filePath)) { return tasks; }

    var taskName = 'compile-angular-copy-' + fileName.replace(/\.js$/, '');
    var sources  = [];

    // Collect js sources
    fs.readFileSync(filePath, 'utf-8')
      .replace(/\/\/=\s+require\s+(.*)\s*/gi, function(_m_, $1) {
        var fullPath = util.checkJsPathExistence(path.join(dirPath, $1));

        // Return if the file is inside the js directory
        if (fullPath.indexOf(JS_PATH) === 0) { return ''; }

        sources.push(fullPath);

        return '';
      });

    // Collect custom js sources
    if (fileName === 'pixeladmin.js' && BUILD_CUSTOM_JS) {
      fs.readFileSync(path.join(CUSTOM_PATH, 'custom.js'), 'utf-8')
        .replace(/\/\/=\s+require\s+(.*)\s*/gi, function(_m_, $1) {
          var fullPath = util.checkJsPathExistence(path.join(CUSTOM_PATH, $1));

          // Return if the file is inside the custom directory
          if (fullPath.indexOf(CUSTOM_PATH) === 0) { return ''; }

          sources.push(fullPath);

          return '';
        });
    }

    gulp.task(taskName, function() {
      var stream;

      stream = gulp
        .src(sources, { base: '.' })
        .pipe(gulpFilter(['**/*']));

      if (config.dist.minifyJs) {
        stream = stream.pipe(gulpUglify());
      }

      return stream.pipe(gulp.dest(function(file) {
        file.path = 'libs/' + path.basename(file.path);
        return ANGULAR_DIST_PATH;
      }));
    });

    return tasks.concat([taskName]);
  }, []);
}


// Definitions
//

var COMPILE_TASKS = createCompileTasks([ 'bootstrap.js', 'angular/angular.js' ]);
var COPY_TASKS    = createCopyTasks(
  _.without(config.sources.js, 'bootstrap.js').concat(
    _.without(config.sources.angular, 'angular.js', 'ui-bootstrap.js').map(function(fileName) { return 'angular/' + fileName; })
  )
);

function angularUiBootstrapTask() {
  'use strict';

  var filePath = path.join(ANGULAR_PATH, UI_BOOTSTRAP_FILE_NAME);

  if (!fs.existsSync(filePath)) { return gulp.src(filePath).pipe(gulpFilter(['**/*'])); }

  var modules = [];

  // Collect js sources to require
  fs.readFileSync(filePath, 'utf-8')
    .replace(/\/\/=\s+require\s+(.*)\s*/gi, function(_m_, $1) {
      modules.push(util.checkJsPathExistence(path.join(ANGULAR_PATH, $1)));
      return '';
    });

  var uibModules   = ['ui.bootstrap.tpls'];
  var uibTpls      = [];
  var uibModulesJs = '';
  var uibTplsJs    = '';
  var uibCss       = '';

  var tplsRe = /\.html\.js$/i;
  var cssRe = /^\.\/.+\.css$/i;
  var jsRe   = /\.js$/i;
  var dirRe   = /^\.\//i;

  function parseRequires(modulePath, moduleName, content, parseCss) {
    content
      .replace(/require\((?:"|')(.*?)(?:"|')\)\s*/gi, function(_m_, $1) {
        var tmplPath, tmplName, tmplContent, cssAttrName;

        // If require template
        if (tplsRe.test($1) && !parseCss) {
          tmplPath    = $1.replace(tplsRe, '.html');
          tmplName    = tmplPath.replace('../..', 'uib');
          tmplContent = [];

          uibTpls.push(tmplName);

          fs.readFileSync(path.join(modulePath, tmplPath), 'utf-8').replace(/(.*)/g, function(match) {
            if (!match || !match.length) { return ''; }

            tmplContent.push(match.replace(/("|\\)/g, '\\$1'));

            return '';
          });

          uibTplsJs +=
            'angular.module("' + tmplName + '", []).run(["$templateCache", function($templateCache) {\n' +
            '$templateCache.put("' + tmplName + '",\n' +
            '"' + tmplContent.join('\\n" +\n"') + '\\n");\n' +
            '}]);\n\n';

        // If require CSS
        } else if (cssRe.test($1) && parseCss) {
          cssAttrName = moduleName.split('.').pop().toLowerCase().replace(/^(.)/, function(_m2_, $l) { return $l.toUpperCase(); });

          uibCss +=
            "angular.module('" + moduleName + "').run(function() {!angular.$$csp().noInlineStyle && !angular.$$uib" + cssAttrName + "Css && angular.element(document).find('head').prepend('<style type=\"text/css\">" + fs.readFileSync(path.join(modulePath, $1), 'utf-8').replace(/\n\s*/g, '') + "</style>'); angular.$$uib" + cssAttrName + "Css = true; });\n";

        // If require js
        } else if (dirRe.test($1) && !parseCss) {
          uibModulesJs += fs.readFileSync(path.join(modulePath, $1.replace(jsRe, '') + '.js'), 'utf-8') + '\n\n';
        }

        return '';
      });
  }

  modules.forEach(function(modulePath) {
    var indexContent;
    var _isNocss = false;

    try {
      indexContent = fs.readFileSync(path.join(modulePath, 'index-nocss.js'), 'utf-8');
      _isNocss     = true;
    } catch (_e_) {
      indexContent = fs.readFileSync(path.join(modulePath, 'index.js'), 'utf-8');
    }

    var moduleName = 'ui.bootstrap.' + path.basename(modulePath);

    uibModules.push(moduleName);

    if (_isNocss) {
      parseRequires(modulePath, moduleName, fs.readFileSync(path.join(modulePath, 'index.js'), 'utf-8'), true);
    }

    parseRequires(modulePath, moduleName, indexContent);
  });

  var fileContent =
    'angular.module("ui.bootstrap", ["' + uibModules.join('", "') + '"]);\n' +
    'angular.module("ui.bootstrap.tpls", ["' + uibTpls.join('", "') + '"]);\n\n' +
    uibModulesJs + uibTplsJs + uibCss;

  var stream = gulp.src(filePath)
    .pipe(through.obj(function(file, _enc_, cb) {
      file.contents = new Buffer(fileContent);
      cb(null, file);
    }));

  if (config.dist.minifyJs) {
    stream = stream.pipe(gulpUglify());
  }

  return stream.pipe(gulp.dest(ANGULAR_DIST_PATH));
}

function angularCompileTask(cb) {
  'use strict';

  if (!config.dist.compileJs || !_.includes(config.dist.versions, 'angular')) {
    console.log('Skip ANGULAR compilation');
    return cb();
  }

  var tasks = [ 'clean-js-angular-dist', 'compile-js-src-angular' ];

  if (BUILD_CUSTOM_JS) { tasks.push('compile-custom-js-src-angular'); }

  tasks = tasks.concat(COMPILE_TASKS);
  tasks = tasks.concat(COPY_TASKS);

  tasks.push('compile-angular-ui-bootstrap');

  tasks.push(cb);
  return runSequence.apply(null, tasks);
}


// Tasks
//

gulp.task('compile-angular-ui-bootstrap', angularUiBootstrapTask);
gulp.task('compile-angular', angularCompileTask);
