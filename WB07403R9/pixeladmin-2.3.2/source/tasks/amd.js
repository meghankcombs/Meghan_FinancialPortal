// Modules
var fs          = require('fs');
var path        = require('path');
var gulp        = require('gulp');
var _           = require('lodash');
var util        = require('./util');
var runSequence = require('run-sequence').use(gulp);

// Config
var config = require('../config.js').get();

// Gulp plugins
var gulpUmd    = require('gulp-umd');
var gulpUglify = require('gulp-uglify');
var gulpFilter = require('gulp-filter');
var gulpConcat = require('gulp-concat');

// Paths
var LIBS_PATH         = path.join(config.paths.root, config.paths.libs);
var JS_PATH           = path.join(config.paths.root, config.paths.js);
var CUSTOM_PATH       = path.join(config.paths.root, config.paths.custom);
var CUSTOM_BUILD_PATH = path.join(config.paths.root, config.paths.customBuild);
var AMD_DIST_PATH     = path.join(config.paths.root, config.paths.distAmd);

var CUSTOM_JS_PATH  = path.join(config.paths.root, config.paths.customJs);
var BUILD_CUSTOM_JS = fs.existsSync(path.join(CUSTOM_PATH, 'custom.js')) || fs.existsSync(CUSTOM_JS_PATH);


// Utilities
//

var AMD_CONF    = require('../amd.json');
var AMD_DEPS    = AMD_CONF.dependencies;
var AMD_EXPORTS = AMD_CONF.exports;


function createTransformTask(fileName, sources) {
  'use strict';

  var taskName = 'compile-amd-' + fileName.replace(/\.js$/, '');

  gulp.task(taskName, function() {
    var stream = gulp
      .src(sources, { base: '.' })
      .pipe(gulpUmd({
        dependencies: function(file) {
          return (AMD_DEPS[util.getAmdFilePath(file.path)] || []);
        },
        exports: function(file) {
          return (AMD_EXPORTS[util.getAmdFilePath(file.path)] || null);
        },
        namespace: function(file) {
          return util.getAmdNamespace(
            file.path.replace(/\\/g, '/').split('/').slice(-1)[0].replace('.js', '')
          );
        },
      }));

    if (config.dist.minifyJs) {
      stream = stream.pipe(gulpUglify());
    }

    return stream.pipe(gulp.dest(function(file) {
      file.path = util.getAmdFilePath(file.path);
      return AMD_DIST_PATH;
    }));
  });

  return taskName;
}

function createCopyTask(fileName, sources) {
  'use strict';

  var taskName  = 'compile-amd-copy-' + fileName.replace(/\.js$/, '');

  gulp.task(taskName, function() {
    var stream = gulp
      .src(sources, { base: '.' })
      .pipe(gulpFilter(['**/*']));

    if (config.dist.minifyJs) {
      stream = stream.pipe(gulpUglify());
    }

    return stream.pipe(gulp.dest(function(file) {
      file.path = util.getAmdFilePath(file.path);
      return AMD_DIST_PATH;
    }));
  });

  return taskName;
}

function createAMDTasks(files) {
  'use strict';

  return files.reduce(function(tasks, fileName) {
    var filePath = path.join(JS_PATH, fileName);

    if (!fs.existsSync(filePath)) { return tasks; }

    var sourcesToTransform = [];
    var sourcesToCopy      = [];

    // Collect js sources
    fs.readFileSync(filePath, 'utf-8')
      .replace(/\/\/=\s+require\s+(.*)\s*/gi, function(_m_, $1) {
        var fullPath = util.checkJsPathExistence(path.join(JS_PATH, $1));

        // Return if the file is inside the js directory
        if (fullPath.indexOf(JS_PATH) === 0) { return ''; }

        if (AMD_DEPS[util.getAmdFilePath(fullPath)]) {
          sourcesToTransform.push(fullPath);
        } else {
          sourcesToCopy.push(fullPath);
        }

        return '';
      });

    // Collect custom js sources
    if (fileName === 'pixeladmin.js' && BUILD_CUSTOM_JS) {
      fs.readFileSync(path.join(CUSTOM_PATH, 'custom.js'), 'utf-8')
        .replace(/\/\/=\s+require\s+(.*)\s*/gi, function(_m_, $1) {
          var fullPath = util.checkJsPathExistence(path.join(CUSTOM_PATH, $1));

          // Return if the file is inside the custom js directory
          if (fullPath.indexOf(CUSTOM_BUILD_PATH) === 0) { return ''; }

          if (AMD_DEPS[util.getAmdFilePath(fullPath)]) {
            sourcesToTransform.push(fullPath);
          } else {
            sourcesToCopy.push(fullPath);
          }

          return '';
        });
    }

    if (sourcesToTransform.length) {
      tasks.push(createTransformTask(fileName, sourcesToTransform));
    }

    if (sourcesToCopy.length) {
      tasks.push(createCopyTask(fileName, sourcesToCopy));
    }

    return tasks;
  }, []);
}


// Definitions
//

// Do not compile requirejs file
var AMD_TASKS = createAMDTasks(config.sources.js);

function amdCopy() {
  'use strict';

  var stream = gulp.src([
      path.join(JS_PATH, 'src/requirejs-config.js'),
      path.join(LIBS_PATH, 'requirejs/require.js'),
    ])
    .pipe(gulpFilter(['**/*']));

  if (config.dist.minifyJs) {
    stream = stream.pipe(gulpUglify());
  }

  return stream.pipe(gulp.dest(AMD_DIST_PATH));
}

function amdCompileTask(cb) {
  'use strict';

  if (!config.dist.compileJs || !AMD_TASKS.length || !_.includes(config.dist.versions, 'amd')) {
    console.log('Skip AMD compilation');
    return cb();
  }

  var tasks = [ 'clean-js-amd-dist', 'compile-js-src-amd' ];

  if (BUILD_CUSTOM_JS) { tasks.push('compile-custom-js-src-amd'); }

  tasks = tasks.concat(AMD_TASKS);

  // Compile requirejs
  tasks.push('compile-amd-copy');

  tasks.push(cb);
  return runSequence.apply(null, tasks);
}


// Tasks
//

gulp.task('compile-amd-copy', amdCopy);
gulp.task('compile-amd', amdCompileTask);
