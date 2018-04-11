function pxSidebarDirective($rootScope, $parse, $timeout) {
  'use strict';

  const AVAILABLE_OPTIONS = [ 'width', 'enableScrollbar', 'desktopMode' ];
  const EVENTS            = [ 'onExpand', 'onExpanded', 'onCollapse', 'onCollapsed' ];

  function getEventName(key) {
    return key.replace(/^on([A-Z])/, (_m_, $1) => $1.toLowerCase());
  }

  return {
    restrict:   'E',
    transclude: true,
    replace:    true,
    template:   '<div><div class="px-sidebar-content"></div></div>',

    compile($element, $attrs) {
      const callbackName = `ngSidebarContentLoaded_${pxUtil.generateUniqueId()}`;

      $element.find('.px-sidebar-content').append(
        $attrs.templateUrl ?
          `<div ng-include="${$attrs.templateUrl}" onload="${callbackName}()"></div>` :
          '<div ng-transclude></div>'
      );

      function link($scope) {
        const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;
        const options = {};

        AVAILABLE_OPTIONS.forEach(optName => {
          if (typeof $attrs[optName] === 'undefined') { return; }
          options[optName] = $parse($attrs[optName])($scope);
        });

        function initPxSidebar() {
          // Set events
          EVENTS.forEach(event => {
            if (!$attrs[event]) { return; }
            $element.on(`${getEventName(event)}.px.sidebar`, $parse($attrs[event])($scope));
          });

          $element.pxSidebar(options);

          // Readonly variable
          setInstancePointer($scope, $.fn.pxSidebar.bind($element));

          // Update footer position on page change
          const contentLoadedHandler = $rootScope.$on('$viewContentLoaded', () => $element.pxSidebar('update'));

          $element.on('$destroy', () => {
            $element.off().pxSidebar('destroy');
            contentLoadedHandler();
          });
        }

        // Initialize immediately if no template url provided
        if (!$attrs.templateUrl) { return $timeout(initPxSidebar); }

        // Else initialize after content loaded
        $scope[callbackName] = () => {
          delete $scope[callbackName];
          initPxSidebar();
        };
      }

      return { pre: link };
    },
  };
}

angular.module('px-sidebar', [])
  .directive('pxSidebar', [ '$rootScope', '$parse', '$timeout', pxSidebarDirective ]);
