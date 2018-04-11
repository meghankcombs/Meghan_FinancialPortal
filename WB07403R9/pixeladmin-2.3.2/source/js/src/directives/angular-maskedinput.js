function angularMaskedinputDirective($parse) {
  'use strict';

  const AVAILABLE_OPTIONS = [ 'miPlaceholder', 'autoclear', 'completed' ];

  return {
    restrict: 'A',

    link($scope, $element, $attrs) {
      const mask = $attrs.mask && $parse($attrs.mask)($scope);

      if (!mask) {
        throw new Error('Mask is not specified.');
      }

      const options = {};

      AVAILABLE_OPTIONS.forEach(optName => {
        if (typeof $attrs[optName] === 'undefined') { return; }
        options[optName === 'miPlaceholder' ? 'placeholder' : optName] = $parse($attrs[optName])($scope);
      });

      $element.mask(mask, options);
      $element.on('$destroy', () => $element.off());
    },
  };
}

angular.module('angular-maskedinput', [])
  .directive('maskedinput', [ '$parse', angularMaskedinputDirective ]);
