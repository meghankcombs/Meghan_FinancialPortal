var TASKS_DIR = './tasks';

// Modules
var path = require('path');
var gulp = require('gulp');

// Tasks
require(path.join(__dirname, TASKS_DIR, 'clean'));
require(path.join(__dirname, TASKS_DIR, 'js-src'));
require(path.join(__dirname, TASKS_DIR, 'js'));
require(path.join(__dirname, TASKS_DIR, 'amd'));
require(path.join(__dirname, TASKS_DIR, 'angular'));
require(path.join(__dirname, TASKS_DIR, 'css'));
require(path.join(__dirname, TASKS_DIR, 'watch'));
require(path.join(__dirname, TASKS_DIR, 'start-server'));

// Base JS task
gulp.task('compile-js-all', [ 'compile-js', 'compile-amd', 'compile-angular' ], function(cb) {
  'use strict';

  cb();
});

// Default task
gulp.task('default', [ 'compile-css', 'compile-js-all' ], function(cb) {
  'use strict';

  cb();
});
