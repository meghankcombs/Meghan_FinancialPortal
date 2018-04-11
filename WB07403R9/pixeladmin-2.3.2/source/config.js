// Modules
var fs   = require('fs');
var path = require('path');
var os   = require('os');

var LOADED_CONFIG;

function _isBoolean(value) {
  return value === true || value === false;
}

function _isArray(value) {
  return Array.isArray(value);
}

function _detectOS() {
  'use strict';

  switch (os.platform()) {
  case 'win32':
  case 'win64':
    return 'windows';
  case 'darwin':
    return 'osx';
  default:
    return 'linux';
  }
}

function _getVersions(versions) {
  return [ 'concatenated', 'amd', 'angular' ].reduce(function(result, val) {
    return versions.indexOf(val) !== -1 ? result.concat([val]) : result;
  }, []);
}

function _switchToProductionConfig(config) {
  [ 'paths', 'dist' ].forEach(function(key) {
    if (!config.production[key]) { return; }
    else if (!config[key]) { config[key] = config.production[key]; }
    else { Object.assign(config[key], config.production[key]); }
  });
}

function _getScssSources(config) {
  'use strict';

  var re         = (/^[^_][a-zA-Z0-9_-]+\.scss$/i);
  var searchPath = path.join(config.paths.root, config.paths.scss);

  if (!fs.existsSync(searchPath)) { return []; }

  return fs
    .readdirSync(searchPath)
    .filter(function(fileName) { return re.test(fileName); });
}

function _getThemes(config, searchPath) {
  'use strict';

  var re     = (/^[a-zA-Z0-9-]+$/i);
  searchPath = path.join(config.paths.root, searchPath);

  if (!fs.existsSync(searchPath)) { return []; }

  return fs
    .readdirSync(searchPath)
    .filter(function(fileName) { return re.test(fileName); });
}

function _getJsSources(config) {
  'use strict';

  var re = (/^[a-zA-Z0-9_-]+\.js$/i);
  var searchPath = path.join(config.paths.root, config.paths.js);

  if (!fs.existsSync(searchPath)) { return []; }

  return fs
    .readdirSync(searchPath)
    .filter(function(fileName) { return re.test(fileName); });
}

function _getAngularSources(config) {
  'use strict';

  var re = (/^[a-zA-Z0-9_-]+\.js$/i);
  var searchPath = path.join(config.paths.root, config.paths.jsAngular);

  if (!fs.existsSync(searchPath)) { return []; }

  return fs
    .readdirSync(searchPath)
    .filter(function(fileName) { return re.test(fileName); });
}

function loadConfig(cfgPath) {
  'use strict';

  var config = fs.existsSync(cfgPath) ? require(cfgPath) : {};

  // Rewrite config with production settings
  if (process.env.NODE_ENV === 'production' && config.production) {
    _switchToProductionConfig(config);
  }

  // Common config
  //

  config.os = _detectOS();

  // Get compilation options
  //

  // Defaults
  if (typeof config.dist === 'undefined')         { config.dist                   = {}; }
  if (!_isArray(config.dist.versions))            { config.dist.versions          = []; }
  if (!_isBoolean(config.dist.compileCss))        { config.dist.compileCss        = true; }
  if (!_isBoolean(config.dist.minifyCss))         { config.dist.minifyCss         = false; }
  if (!_isBoolean(config.dist.keepUnminifiedCss)) { config.dist.keepUnminifiedCss = true; }
  if (!_isBoolean(config.dist.compileJs))         { config.dist.compileJs         = true; }
  if (!_isBoolean(config.dist.minifyJs))          { config.dist.minifyJs          = false; }
  if (!_isBoolean(config.dist.keepUnminifiedJs))  { config.dist.keepUnminifiedJs  = true; }
  if (!_isBoolean(config.dist.rtlSupport))        { config.dist.rtlSupport        = false; }

  // Filter versions
  config.dist.versions = _getVersions(config.dist.versions);

  // Define paths
  //

  if (typeof config.paths === 'undefined') { config.paths = {}; }

  config.paths.root = path.dirname(cfgPath);

  config.paths.scss   = 'scss';
  config.paths.js     = 'js';
  config.paths.libs   = 'libs';
  config.paths.custom = 'custom';

  config.paths.bsScss = path.join(config.paths.libs, 'bootstrap-sass/assets/stylesheets/bootstrap');
  config.paths.bsJs   = path.join(config.paths.libs, 'bootstrap-sass/assets/javascripts/bootstrap');

  config.paths.jsSrc     = path.join(config.paths.js, 'src');
  config.paths.jsBuild   = path.join(config.paths.js, 'build');
  config.paths.jsAngular = path.join(config.paths.js, 'angular');

  config.paths.customScss  = path.join(config.paths.custom, 'scss');
  config.paths.customJs    = path.join(config.paths.custom, 'js');
  config.paths.customBuild = path.join(config.paths.custom, 'build');

  config.paths.distCss          = config.paths.distCss || 'dist/css';
  config.paths.distConcatenated = config.paths.distConcatenated || 'dist/js';
  config.paths.distAmd          = config.paths.distAmd || 'dist/js/amd';
  config.paths.distAngular      = config.paths.distAngular || 'dist/js/angular';

  // Get existing source file names

  config.sources = {
    scss:    _getScssSources(config),
    js:      _getJsSources(config),
    angular: _getAngularSources(config),
  };

  config.themes       = _getThemes(config, path.join(config.paths.scss, 'themes'));
  config.customThemes = _getThemes(config, path.join(config.paths.customScss, 'themes'));

  return config;
}

module.exports = {
  get: function() {
    return LOADED_CONFIG || (LOADED_CONFIG = loadConfig(path.join(__dirname, 'config.json')));
  },
  loadConfig: loadConfig,
};
