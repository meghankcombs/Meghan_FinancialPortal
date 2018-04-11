function pxFooterDirective($rootScope, $parse, $timeout) {
  'use strict';

  return {
    restrict:   'E',
    transclude: true,
    replace:    true,
    template:   '<footer class="px-footer"></footer>',

    compile($element, $attrs) {
      const callbackName = `ngFooterContentLoaded_${pxUtil.generateUniqueId()}`;

      if ($attrs.templateUrl) {
        $element.append($(`<div ng-include="${$attrs.templateUrl}" onload="${callbackName}()"></div>`))
      } else {
        $element.append('<div ng-transclude></div>');
      }

      function link($scope) {
        const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;

        function initPxFooter() {
          $element.pxFooter();

          // Readonly variable
          setInstancePointer($scope, $.fn.pxFooter.bind($element));

          // Update footer position on page change
          const contentLoadedHandler = $rootScope.$on('$viewContentLoaded', () => $element.pxFooter('update'));

          $element.on('$destroy', () => {
            $element.pxFooter('destroy');
            contentLoadedHandler();
          });
        }

        // Initialize immediately if no template url provided
        if (!$attrs.templateUrl) { return $timeout(initPxFooter); }

        // Else initialize after content loaded
        $scope[callbackName] = () => {
          delete $scope[callbackName];
          initPxFooter();
        };
      }

      return { pre: link };
    },
  };
}

angular.module('px-footer', [])
  .directive('pxFooter', [ '$rootScope', '$parse', '$timeout', pxFooterDirective ]);
