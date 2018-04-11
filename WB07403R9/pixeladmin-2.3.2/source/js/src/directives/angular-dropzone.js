function angularDropzoneDirective($timeout, $parse) {
  'use strict';

  const EVENTS = [
    'drop', 'dragstart', 'dragend', 'dragenter', 'dragover', 'dragleave',
    'addedfile', 'removedfile', 'thumbnail', 'error', 'processing',
    'uploadprogress', 'sending', 'success', 'complete', 'canceled',
    'maxfilesreached', 'maxfilesexceeded', 'processingmultiple',
    'sendingmultiple', 'successmultiple', 'completemultiple',
    'canceledmultiple', 'totaluploadprogress', 'reset', 'queuecomplete',
  ];

  return {
    restrict: 'A',

    link($scope, $element, $attrs) {
      const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;
      const options            = $attrs.options ? ($parse($attrs.options)($scope) || {}) : {};
      const callbacks          = $attrs.callbacks ? ($parse($attrs.callbacks)($scope) || {})  : {};

      $timeout(() => {
        $element.addClass('dropzone-box');
        $element.dropzone(options);

        // Set events
        EVENTS.forEach(event => {
          if (!callbacks[event]) { return; }
          $element.dropzone('on', event, callbacks[event]);
        });

        // Readonly variable
        setInstancePointer($scope, $.fn.dropzone.bind($element));

        $element.on('$destroy', () => $element.dropzone('destroy'));
      });
    },
  };
}

function angularDropzoneMessageDirective() {
  'use strict';

  return {
    restrict:   'E',
    transclude: true,
    replace:    true,
    template:   '<div class="dz-default dz-message" ng-transclude></div>',
  };
}

function angularDropzoneFallbackDirective() {
  'use strict';

  return {
    restrict:   'E',
    transclude: true,
    replace:    true,
    template:   '<div class="fallback" ng-transclude></div>',
  };
}

angular.module('angular-dropzone', [])
  .directive('dropzone', [ '$timeout', '$parse', angularDropzoneDirective ])
  .directive('dropzoneMessage', angularDropzoneMessageDirective)
  .directive('dropzoneFallback', angularDropzoneFallbackDirective);
