// Modules
var path = require('path');
var gulp = require('gulp');
var _    = require('lodash');

// Config
var config = require('../config.js').get();

// Gulp plugins
var gulpStripLine = require('gulp-strip-line');
var gulpBabel     = require('gulp-babel');
var gulpFilter    = require('gulp-filter');
var gulpUglify    = require('gulp-uglify');

// Paths
var JS_PATH           = path.join(config.paths.root, config.paths.jsSrc);
var BUILD_PATH        = path.join(config.paths.root, config.paths.jsBuild);
var CUSTOM_JS_PATH    = path.join(config.paths.root, config.paths.customJs);
var CUSTOM_BUILD_PATH = path.join(config.paths.root, config.paths.customBuild);
var AMD_DIST_PATH     = path.join(config.paths.root, config.paths.distAmd);
var ANGULAR_DIST_PATH = path.join(config.paths.root, config.paths.distAngular);


// Utilities
//

function getPaths(srcPath, files) {
  'use strict';

  return files.reduce(function(result, file) {
    var prefix = file[0] === '!' ? '!' : '';

    return result.concat([prefix + path.join(srcPath, prefix ? file.slice(1) : file)]);
  }, []);
}

function getJsStream(srcPath, files, isAmd) {
  'use strict';

  var babelConfig = { presets: ['es2015']};

  if (isAmd) { babelConfig.plugins = [ 'add-module-exports', 'transform-es2015-modules-umd' ]; }

  var stream = gulp
    .src(getPaths(srcPath, files))
    .pipe(gulpFilter('**/*'));

  if (!isAmd) {
    stream = stream.pipe(gulpStripLine([/^(import|export)/]));
  }

  stream = stream.pipe(gulpBabel(babelConfig));

  if (!isAmd) {
    stream = stream.pipe(gulpStripLine([/^((?:"|')use strict(?:"|'))/]));
  }

  return stream;
}


// Definitions
//

function jsSrcTask() {
  'use strict';

  return getJsStream(JS_PATH, [ '**/*.js', '!requirejs-config.js', '!directives/*.js' ]).pipe(gulp.dest(BUILD_PATH));
}

function customJsSrcTask() {
  'use strict';

  return getJsStream(CUSTOM_JS_PATH, ['**/*.js']).pipe(gulp.dest(CUSTOM_BUILD_PATH));
}

function jsSrcAMDTask() {
  'use strict';

  var stream = getJsStream(JS_PATH, [ '**/*.js', '!requirejs-config.js', '!directives/*.js' ], true);

  if (config.dist.minifyJs) { stream = stream.pipe(gulpUglify()); }

  return stream.pipe(gulp.dest(path.join(AMD_DIST_PATH, 'pixeladmin')));
}

function customJsSrcAMDTask() {
  'use strict';

  var stream = getJsStream(CUSTOM_JS_PATH, ['**/*.js'], true);

  if (config.dist.minifyJs) { stream = stream.pipe(gulpUglify()); }

  return stream.pipe(gulp.dest(path.join(AMD_DIST_PATH, 'pixeladmin/custom')));
}

function jsSrcAngularTask() {
  'use strict';

  var stream = getJsStream(JS_PATH, [ '**/*.js', '!requirejs-config.js' ]);

  if (config.dist.minifyJs) { stream = stream.pipe(gulpUglify()); }

  return stream.pipe(gulp.dest(path.join(ANGULAR_DIST_PATH, 'pixeladmin')));
}

function customJsSrcAngularTask() {
  'use strict';

  var stream = getJsStream(CUSTOM_JS_PATH, ['**/*.js']);

  if (config.dist.minifyJs) { stream = stream.pipe(gulpUglify()); }

  return stream.pipe(gulp.dest(path.join(ANGULAR_DIST_PATH, 'pixeladmin/custom')));
}


// Tasks
//

gulp.task('compile-js-src', jsSrcTask);
gulp.task('compile-custom-js-src', customJsSrcTask);
gulp.task('compile-js-src-amd', jsSrcAMDTask);
gulp.task('compile-custom-js-src-amd', customJsSrcAMDTask);
gulp.task('compile-js-src-angular', jsSrcAngularTask);
gulp.task('compile-custom-js-src-angular', customJsSrcAngularTask);
