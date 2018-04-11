function pxResponsiveBgDirective($parse) {
  'use strict';

  const SCOPE_OPTIONS = [ 'backgroundImage', 'overlay', 'overlayOpacity', 'backgroundPosition' ];

  function getEventName(key) {
    return key.replace(/^on([A-Z])/, (_m_, $1) => $1.toLowerCase());
  }

  return {
    restrict: 'EA',
    scope: {
      backgroundImage: '=',
      overlay:         '=',
      overlayOpacity:  '=',
    },

    link($scope, $element) {
      const DATA_KEY = $.fn.pxResponsiveBg.Constructor.DATA_KEY;

      function init() {
        if ($element.data(DATA_KEY)) { $element.pxResponsiveBg('destroy'); }

        const options = {};

        SCOPE_OPTIONS.forEach(optName => options[optName] = $scope[optName]);

        $element.pxResponsiveBg(options);
      }

      SCOPE_OPTIONS.forEach(optName => $scope.$watch(optName, init));

      $element.on('$destroy', () => $element.pxResponsiveBg('destroy'));
    },
  };
}

angular.module('px-responsive-bg', [])
  .directive('responsiveBg', [ '$parse', pxResponsiveBgDirective ]);
