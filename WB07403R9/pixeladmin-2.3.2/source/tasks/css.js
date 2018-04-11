// Modules
var fs          = require('fs');
var path        = require('path');
var _           = require('lodash');
var gulp        = require('gulp');
var runSequence = require('run-sequence').use(gulp);

// Config
var config = require('../config.js').get();

// Gulp plugins
var gulpSourcemaps   = require('gulp-sourcemaps');
var gulpSass         = require('gulp-sass');
var gulpAutoprefixer = require('gulp-autoprefixer');
var gulpRename       = require('gulp-rename');
var gulpMinifyCss    = require('gulp-minify-css');
var cssFlip          = require('css-flip');
var through          = require('through2');

// Paths
var SCSS_PATH        = path.join(config.paths.root, config.paths.scss);
var CUSTOM_SCSS_PATH = path.join(config.paths.root, config.paths.customScss);
var CSS_DIST_PATH    = path.join(config.paths.root, config.paths.distCss);
var THEMES_DIST_PATH = path.join(config.paths.root, config.paths.distCss, 'themes');


// Utilities
//

function getScssStream(src, sourceRoot) {
  'use strict';

  var stream;

  // Generate sourcemaps only if unminified sources required
  if (!config.dist.minifyCss || config.dist.keepUnminifiedCss) {
    stream = gulp.src(src)
      .pipe(gulpSourcemaps.init())
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(gulpAutoprefixer({
        browsers: [ '> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'IE 9' ],
      }))
      .pipe(gulpSourcemaps.write('.', { sourceRoot: sourceRoot }));
  } else {
    stream = gulp.src(src)
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(gulpAutoprefixer({
        browsers: [ '> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'IE 9' ],
      }));
  }

  return stream;
}

function createScssTasks(files) {
  'use strict';

  return files.reduce(function(tasks, fileName) {
    var filePath = path.join(SCSS_PATH, fileName);

    if (!fs.existsSync(filePath)) { return tasks; }

    var taskName = 'compile-scss-' + fileName.replace(/\.scss$/, '');

    gulp.task(taskName, function() {
      return getScssStream(filePath, path.relative(CSS_DIST_PATH, SCSS_PATH))
        .pipe(gulp.dest(CSS_DIST_PATH));
    });

    return tasks.concat([taskName]);
  }, []);
}


// Definitions
//

var SCSS_TASKS = createScssTasks(config.sources.scss);

function scssThemesTask() {
  'use strict';

  var themes = config.themes
    .map(function(fileName) { return path.join(path.join(SCSS_PATH, 'themes'), fileName, fileName + '.scss'); })
    .concat(
      config.customThemes
        .map(function(fileName) { return path.join(path.join(CUSTOM_SCSS_PATH, 'themes'), fileName, fileName + '.scss'); })
    );

  return getScssStream(themes, function(file) { return path.relative(THEMES_DIST_PATH, file.base); })
    .pipe(gulp.dest(THEMES_DIST_PATH));
}

function cssRtlTask() {
  'use strict';

  return gulp.src([ path.join(CSS_DIST_PATH, '**/*.css'), '!' + path.join(CSS_DIST_PATH, '**/*.rtl.css') ])
    .pipe(gulpRename({ suffix: '.rtl' }))
    .pipe(through.obj(function(file, _enc_, cb) {
      file.contents = new Buffer(cssFlip(file.contents.toString('utf8')));
      cb(null, file);
    }))
    .pipe(gulp.dest(CSS_DIST_PATH));
}

function cssMinifyTask() {
  'use strict';

  return gulp.src([ path.join(CSS_DIST_PATH, '**/*.css'), '!' + path.join(CSS_DIST_PATH, '**/*.min.css') ])
    .pipe(gulpRename({ suffix: '.min' }))
    .pipe(gulpMinifyCss())
    .pipe(gulp.dest(CSS_DIST_PATH));
}

function cssCompileTask(cb) {
  'use strict';

  if (!config.dist.compileCss || !SCSS_TASKS.length) {
    console.log('Skip SCSS compilation');
    return cb();
  }

  var tasks = [].concat(['clean-css-dist'], SCSS_TASKS, ['compile-scss-themes']);

  // Create RTL version?
  if (config.dist.rtlSupport) { tasks.push('compile-css-rtl'); }

  // Minify?
  if (config.dist.minifyCss) {
    tasks.push('compile-css-minify');

    // Remove unminified files?
    if (!config.dist.keepUnminifiedCss) { tasks.push('clean-unminified-css-dist'); }
  }

  tasks.push(cb);
  return runSequence.apply(null, tasks);
}


// Tasks
//

gulp.task('compile-scss-themes', scssThemesTask);
gulp.task('compile-css-rtl', cssRtlTask);
gulp.task('compile-css-minify', cssMinifyTask);
gulp.task('compile-css', cssCompileTask);
