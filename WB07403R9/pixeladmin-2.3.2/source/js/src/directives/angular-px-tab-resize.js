function pxTabResizeDirective($timeout, $parse) {
  'use strict';

  return {
    restrict: 'A',

    link($scope, $element, $attrs) {
      const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;
      const options = {};

      if ($attrs.buttonTemplate) { options.template = $parse($attrs.buttonTemplate)($scope); }
      if ($attrs.buttonContent) { options.content = $parse($attrs.buttonContent)($scope); }

      $timeout(() => {
        $element.pxTabResize(options);

        // Readonly variable
        setInstancePointer($scope, $.fn.pxTabResize.bind($element));

        $element.on('$destroy', () => $element.pxTabResize('destroy'));
      });
    },
  };
}

angular.module('px-tab-resize', [])
  .directive('pxTabResize', [ '$timeout', '$parse', pxTabResizeDirective ]);
