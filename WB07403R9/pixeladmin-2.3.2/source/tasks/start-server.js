// Modules
var path = require('path');
var gulp = require('gulp');

// Config
var config = require('../config.js').get();

// Gulp plugins
var gulpWebserver = require('gulp-webserver');


// Definitions
//

function startWebserver() {
  'use strict';

  var serverPath = path.resolve(config.paths.root, '..');

  return gulp
    .src(serverPath)
    .pipe(gulpWebserver({
      livereload      : true,
      open            : true,
      fallback        : 'index.html',
      directoryListing: {
        enable: true,
        path  : serverPath
      },
    }));
}


// Tasks
//

gulp.task('start-server', startWebserver);
