function $pxBlockAlertService() {
  'use strict';

  const DEFAULT_CONTAINER = '.px-content';

  return {
    add(content, options) {
      return $((options || {}).container || DEFAULT_CONTAINER).pxBlockAlert(content, options);
    },
    remove($alert, animate, options) {
      return $((options || {}).container || DEFAULT_CONTAINER).pxBlockAlert('remove', $alert, animate);
    },
    clear(namespace, animate, options) {
      return $((options || {}).container || DEFAULT_CONTAINER).pxBlockAlert('clear', namespace, animate);
    },
    clearAll(animate, options) {
      return $((options || {}).container || DEFAULT_CONTAINER).pxBlockAlert('clearAll', animate);
    },
    destroy(options) {
      return $((options || {}).container || DEFAULT_CONTAINER).pxBlockAlert('destroy');
    },
  };
}

angular.module('px-block-alert', [])
  .factory('$pxBlockAlert', $pxBlockAlertService);
