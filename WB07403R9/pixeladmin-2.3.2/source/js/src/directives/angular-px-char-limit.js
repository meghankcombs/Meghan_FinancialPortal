function angularPxCharLimitDirective() {
  'use strict';

  return {
    restrict: 'A',

    link(_scope_, $element, $attrs) {
      const options = {};

      if ($attrs.counter) { options.counter = $attrs.counter; }

      $element.pxCharLimit(options);
      $element.on('$destroy', () => $element.pxCharLimit('destroy'));
    },
  };
}

angular.module('angular-px-char-limit', [])
  .directive('pxCharLimit', angularPxCharLimitDirective);
