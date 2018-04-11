function pxNavbarDirective($parse, $timeout) {
  'use strict';

  return {
    restrict:   'E',
    transclude: true,
    replace:    true,
    template:   '<nav class="navbar px-navbar"></nav>',

    compile($element, $attrs) {
      const callbackName = `ngNavbarContentLoaded_${pxUtil.generateUniqueId()}`;

      if ($attrs.templateUrl) {
        $element.append($(`<div ng-include="${$attrs.templateUrl}" onload="${callbackName}()"></div>`))
      } else {
        $element.append('<div ng-transclude></div>');
      }

      function link($scope) {
        const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;

        function initPxNavbar() {
          $element.pxNavbar();

          // Readonly variable
          setInstancePointer($scope, $.fn.pxNavbar.bind($element));

          $element.on('$destroy', () => $element.pxNavbar('destroy'));
        }

        // Initialize immediately if no template url provided
        if (!$attrs.templateUrl) { return $timeout(initPxNavbar); }

        // Else initialize after content loaded
        $scope[callbackName] = () => {
          delete $scope[callbackName];
          initPxNavbar();
        };
      }

      return { pre: link };
    },
  };
}

angular.module('px-navbar', [])
  .directive('pxNavbar', [ '$parse', '$timeout', pxNavbarDirective ]);
