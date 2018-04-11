// Modules
var fs          = require('fs');
var path        = require('path');
var gulp        = require('gulp');
var _           = require('lodash');
var runSequence = require('run-sequence').use(gulp);
var util        = require('./util');

// Config
var config = require('../config.js').get();

// Gulp plugins
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpConcat     = require('gulp-concat');
var gulpReplace    = require('gulp-replace');
var gulpRename     = require('gulp-rename');
var gulpUglify     = require('gulp-uglify');

// Paths
var JS_PATH        = path.join(config.paths.root, config.paths.js);
var CUSTOM_PATH    = path.join(config.paths.root, config.paths.custom);
var JS_DIST_PATH   = path.join(config.paths.root, config.paths.distConcatenated);

var CUSTOM_JS_PATH  = path.join(config.paths.root, config.paths.customJs);
var BUILD_CUSTOM_JS = fs.existsSync(path.join(CUSTOM_PATH, 'custom.js')) || fs.existsSync(CUSTOM_JS_PATH);


// Utilities
//

function createJsTasks(files) {
  'use strict';

  return files.reduce(function(tasks, fileName) {
    var filePath = path.join(JS_PATH, fileName);

    if (!fs.existsSync(filePath)) { return tasks; }

    var taskName = 'compile-js-' + fileName.replace(/\.js$/, '');
    var sources  = [];

    // Collect js sources to require
    fs.readFileSync(filePath, 'utf-8')
      .replace(/\/\/=\s+require\s+(.*)\s*/gi, function(_m_, $1) {
        sources.push(util.checkJsPathExistence(path.join(JS_PATH, $1)));
        return '';
      });

    // Inject custom js sources
    if (fileName === 'pixeladmin.js' && BUILD_CUSTOM_JS) {
      fs.readFileSync(path.join(CUSTOM_PATH, 'custom.js'), 'utf-8')
        .replace(/\/\/=\s+require\s+(.*)\s*/gi, function(_m_, $1) {
          sources.push(util.checkJsPathExistence(path.join(CUSTOM_PATH, $1)));
          return '';
        });
    }

    gulp.task(taskName, function() {
      var stream;

      // Generate sourcemaps only if unminified sources required
      if (!config.dist.minifyJs || config.dist.keepUnminifiedJs) {
        stream = gulp
          .src(sources, { base: '.' })
          .pipe(gulpSourcemaps.init({ loadMaps: true }))
          .pipe(gulpConcat(fileName))
          .pipe(gulpSourcemaps.write('.', { sourceRoot: '../../' }));
      } else {
        stream = gulp
          .src(sources, { base: '.' })
          .pipe(gulpConcat(fileName));
      }

      return stream.pipe(gulp.dest(JS_DIST_PATH));
    });

    return tasks.concat([taskName]);
  }, []);
}


// Tasks
//

var JS_TASKS = createJsTasks(config.sources.js);

function jsMinifyTask() {
  'use strict';

  return gulp
    .src([ path.join(JS_DIST_PATH, '*.js'), '!' + path.join(JS_DIST_PATH, '*.min.js') ])
    .pipe(gulpRename({ suffix: '.min' }))
    .pipe(gulpUglify())
    .pipe(gulp.dest(JS_DIST_PATH));
}

function jsFixSourcemapsTask() {
  'use strict';

  return gulp
    .src(path.join(JS_DIST_PATH, '*.js.map'))
    .pipe(gulpReplace('"' + config.paths.distConcatenated + '/', '"' + config.paths.jsSrc + '/'))
    .pipe(gulp.dest(JS_DIST_PATH));
}

function jsCompileTask(cb) {
  'use strict';

  if (!config.dist.compileJs || !JS_TASKS.length || !_.includes(config.dist.versions, 'concatenated')) {
    console.log('Skip JS compilation');
    return cb();
  }

  var tasks = [ 'clean-js-dist', 'compile-js-src' ];

  if (BUILD_CUSTOM_JS) { tasks.push('compile-custom-js-src'); }

  tasks = tasks.concat(JS_TASKS);

  // Minify?
  if (config.dist.minifyJs) {
    tasks.push('compile-js-minify');

    // Remove unminified files
    if (!config.dist.keepUnminifiedJs) {
      tasks.push('clean-unminified-js-dist');
    }
  }

  // Fix sourcemaps
  if (!config.dist.minifyJs || config.dist.keepUnminifiedJs) {
    tasks.push('compile-js-fix-sourcemaps');
  }

  tasks.push(cb);
  return runSequence.apply(null, tasks);
}


// Tasks
//

gulp.task('compile-js-minify', jsMinifyTask);
gulp.task('compile-js-fix-sourcemaps', jsFixSourcemapsTask);
gulp.task('compile-js', jsCompileTask);
