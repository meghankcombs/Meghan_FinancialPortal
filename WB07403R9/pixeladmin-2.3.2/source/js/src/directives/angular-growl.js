function $growlService() {
  'use strict';

  return {
    default(options) {
      return $.growl(options);
    },
    success(options) {
      return $.growl.success(options);
    },
    error(options) {
      return $.growl.error(options);
    },
    notice(options) {
      return $.growl.notice(options);
    },
    warning(options) {
      return $.growl.warning(options);
    },
  };
}

angular.module('growl', [])
  .factory('$growl', $growlService);
