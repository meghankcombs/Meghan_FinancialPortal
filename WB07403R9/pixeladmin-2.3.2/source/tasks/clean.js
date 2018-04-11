// Modules
var path = require('path');
var gulp = require('gulp');

// Config
var config = require('../config.js').get();

// Gulp plugins
var gulpClean = require('gulp-clean');


// Utilities
//

function getPaths(pathName, files) {
  'use strict';

  var rootPath = path.join(config.paths.root, config.paths[pathName]);

  return files.reduce(function(result, file) {
    var prefix = file[0] === '!' ? '!' : '';

    return result.concat([prefix + path.join(rootPath, prefix ? file.slice(1) : file)]);
  }, []);
}


// Definitions
//

function cleanJsDistTask() {
  'use strict';

  return gulp
    .src(getPaths('distConcatenated', [ 'bootstrap*+(js|map)', 'pixeladmin*+(js|map)' ]))
    .pipe(gulpClean({ force: true }));
}

function cleanUnminifiedJsDistTask() {
  'use strict';

  return gulp
    .src(getPaths('distConcatenated', [
      'bootstrap*+(js|map)',
      'pixeladmin*+(js|map)',

      '!bootstrap*min.js',
      '!pixeladmin*min.js',
    ]))
    .pipe(gulpClean({ force: true }));
}

function cleanJsAMDDistTask() {
  'use strict';

  return gulp
    .src(getPaths('distAmd', [ 'bootstrap', 'pixeladmin', 'libs', 'requirejs*+(js|map)', 'require.js', 'require.map' ]))
    .pipe(gulpClean({ force: true }));
}

function cleanJsAngularDistTask() {
  'use strict';

  return gulp
    .src(getPaths('distAngular', [ 'pixeladmin', 'libs', 'angular*+(js|map)', 'bootstrap*+(js|map)', 'ui-bootstrap*+(js|map)' ]))
    .pipe(gulpClean({ force: true }));
}

function cleanCssDistTask() {
  'use strict';

  return gulp
    .src(getPaths('distCss', [ 'bootstrap*+(css|map)', 'pixeladmin*+(css|map)', 'widgets*+(css|map)', 'themes' ]))
    .pipe(gulpClean({ force: true }));
}

function cleanUnminifiedCssDistTask() {
  'use strict';

  return gulp
    .src(getPaths('distCss', [
      'bootstrap*+(css|map)',
      'pixeladmin*+(css|map)',
      'widgets*+(css|map)',
      'themes/*+(css|map)',

      '!bootstrap*min.css',
      '!pixeladmin*min.css',
      '!widgets*min.css',
      '!themes/*min.css',
    ]))
    .pipe(gulpClean({ force: true }));
}


// Tasks
//

gulp.task('clean-js-dist', cleanJsDistTask);
gulp.task('clean-unminified-js-dist', cleanUnminifiedJsDistTask);
gulp.task('clean-js-amd-dist', cleanJsAMDDistTask);
gulp.task('clean-js-angular-dist', cleanJsAngularDistTask);
gulp.task('clean-css-dist', cleanCssDistTask);
gulp.task('clean-unminified-css-dist', cleanUnminifiedCssDistTask);
