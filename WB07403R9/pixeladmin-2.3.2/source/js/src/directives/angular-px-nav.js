function pxNavDirective($parse, $timeout) {
  'use strict';

  const AVAILABLE_OPTIONS = [
    'accordion', 'transitionDuration', 'dropdownCloseDelay', 'enableTooltips',
    'animate', 'storeState', 'storagePrefix', 'modes',
  ];

  const EVENTS = [
    'onExpand', 'onExpanded', 'onCollapse', 'onCollapsed', 'onDestroy', 'onDropdownOpen',
    'onDropdownOpened', 'onDropdownClose', 'onDropdownClosed', 'onDropdownFrozen',
    'onDropdownUnfrozen',
  ];

  function getEventName(key) {
    return key
      .replace(/^on([A-Z])/, (_m_, $1) => $1.toLowerCase())
      .replace(/[A-Z]/g, $m => '-' + $m.toLowerCase());
  }

  return {
    restrict:   'E',
    transclude: true,
    replace:    true,
    template:   '<nav class="px-nav"></nav>',

    compile($element, $attrs) {
      const callbackName = `ngSidebarContentLoaded_${pxUtil.generateUniqueId()}`;

      $element.append(
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

        function initPxNav() {
          $element.pxNav(options);

          // Set events
          EVENTS.forEach(event => {
            if (!$attrs[event]) { return; }
            $element.on(`${getEventName(event)}.px.nav`, $parse($attrs[event])($scope));
          });

          // Readonly variable
          setInstancePointer($scope, $.fn.pxNav.bind($element));

          $element.on('$destroy', () => $element.off().pxNav('destroy'));
        }

        // Initialize immediately if no template url provided
        if (!$attrs.templateUrl) { return $timeout(initPxNav); }

        // Else initialize after content loaded
        $scope[callbackName] = () => {
          delete $scope[callbackName];
          initPxNav();
        };
      }

      return { pre: link };
    },
  };
}

angular.module('px-nav', [])
  .directive('pxNav', [ '$parse', '$timeout', pxNavDirective ]);
