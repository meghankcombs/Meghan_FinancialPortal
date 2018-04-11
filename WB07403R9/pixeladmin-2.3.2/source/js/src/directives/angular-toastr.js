function $toastrService() {
  'use strict';

  return {
    info(message, title, options) {
      return toastr.info(message, title, options);
    },
    warning(message, title, options) {
      return toastr.warning(message, title, options);
    },
    success(message, title, options) {
      return toastr.success(message, title, options);
    },
    error(message, title, options) {
      return toastr.error(message, title, options);
    },
    getContainer(options, create) {
      return toastr.getContainer(options, create);
    },
    subscribe(callback) {
      return toastr.subscribe(callback);
    },
    clear($el, options) {
      return toastr.clear($el, options);
    },
    remove($el) {
      return toastr.remove($el);
    },
  };
}

angular.module('toastr', [])
  .factory('$toastr', $toastrService);
