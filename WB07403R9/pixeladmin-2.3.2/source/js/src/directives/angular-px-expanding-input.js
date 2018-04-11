function pxExpandingInputDirective($timeout, $parse) {
  'use strict';

  const EVENTS = [ 'onExpand', 'onExpanded', 'onCollapse', 'onCollapsed' ];

  function getEventName(key) {
    return key.replace(/on([A-Z])/g, (_m_, $1) => $1.toLowerCase());
  }

  return {
    restrict:   'E',
    transclude: true,
    template:   '<div class="expanding-input" ng-transclude></div>',
    replace:    true,

    link($scope, $element, $attrs) {
      const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;

      $timeout(() => {
        $element.pxExpandingInput();

        // Set events
        EVENTS.forEach(event => {
          if (!$attrs[event]) { return; }
          $element.on(`${getEventName(event)}.px.expanding-input`, $parse($attrs[event])($scope));
        });

        if (typeof $attrs.expand !== 'undefined') {
          $scope.$watch($attrs.expand, val => {
            $element.pxExpandingInput(val ? 'expand' : 'collapse');
          });
        }

        // Readonly variable
        setInstancePointer($scope, $.fn.pxExpandingInput.bind($element));

        $element.on('$destroy', () => $element.off().pxExpandingInput('destroy'));
      });
    },
  };
}

function pxExpandingInputControlDirective() {
  'use strict';

  return {
    restrict: 'A',

    link(_scope_, $element) {
      $element.addClass('expanding-input-control');
    },
  };
}

function pxExpandingInputContentDirective() {
  'use strict';

  return {
    restrict:   'E',
    transclude: true,
    template:   '<div class="expanding-input-content" ng-transclude></div>',
    replace:    true,
  };
}

angular.module('px-expanding-input', [])
  .directive('pxExpandingInput', [ '$timeout', '$parse', pxExpandingInputDirective ])
  .directive('pxExpandingInputControl', pxExpandingInputControlDirective)
  .directive('pxExpandingInputContent', pxExpandingInputContentDirective);
