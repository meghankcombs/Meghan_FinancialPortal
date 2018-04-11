// Modules
var fs     = require('fs');
var path   = require('path');

// Config
var config = require('../config.js').get();

// Paths
var LIBS_PATH         = path.join(__dirname, '..', config.paths.libs);
var JS_BS_PATH        = path.join(__dirname, '..', config.paths.bsJs);
var JS_PATH           = path.join(__dirname, '..', config.paths.jsSrc);
var JS_BUILD_PATH     = path.join(__dirname, '..', config.paths.jsBuild);
var CUSTOM_JS_PATH    = path.join(__dirname, '..', config.paths.customJs);
var CUSTOM_BUILD_PATH = path.join(__dirname, '..', config.paths.customBuild);


// Utilities
//

function checkJsPathExistence(jsPath) {
  'use strict';

  var srcPath;

  if (jsPath.indexOf(JS_BUILD_PATH) === 0) {
    srcPath = jsPath.replace(JS_BUILD_PATH, JS_PATH);
  } else if (jsPath.indexOf(CUSTOM_BUILD_PATH) === 0) {
    srcPath = jsPath.replace(CUSTOM_BUILD_PATH, CUSTOM_JS_PATH);
  } else {
    srcPath = jsPath;
  }

  try {
    fs.statSync(srcPath);
  } catch (_e_) {
    console.log(_e_);
    throw new Error('Path "' + srcPath + '" not found.');
  }

  return jsPath;
}

function normalizePathSeparators(filePath) {
  'use strict';

  return filePath.replace(/\\/g, '/');
}

function getAmdFilePath(filePath) {
  'use strict';

  if (filePath.indexOf(JS_BS_PATH) !== -1) {
    return exports.normalizePathSeparators(filePath.replace(JS_BS_PATH, 'bootstrap'));
  }

  var parts    = exports.normalizePathSeparators(filePath.replace(LIBS_PATH  + path.sep, '')).split('/');
  var baseName = parts.slice(-1)[0];

  return 'libs/' + baseName;
}

function getAmdNamespace(str) {
  'use strict';

  var parts = str.split('-');

  for (var i = 0, l = parts.length; i < l; i++) {
    parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
  }

  return parts.join('').replace(/\./g, '_');
}


// Exports
//

exports.checkJsPathExistence    = checkJsPathExistence;
exports.normalizePathSeparators = normalizePathSeparators;
exports.getAmdFilePath          = getAmdFilePath;
exports.getAmdNamespace         = getAmdNamespace;
