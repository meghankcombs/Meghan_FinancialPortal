function pxWizardDirective($parse, $timeout) {
  'use strict';

  const EVENTS = [
    'onStepchange', 'onStepchanged', 'onFinish', 'onFinished', 'onFrozen', 'onUnfrozen',
    'onReseted', 'onDestroy',
  ];

  function getEventName(key) {
    return key.replace(/^on([A-Z])/, (_m_, $1) => $1.toLowerCase());
  }

  return {
    transclude: true,
    replace:    true,
    template:   '<div class="px-wizard" ng-transclude></div>',

    link($scope, $element, $attrs) {
      const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;
      const options = {};

      if ($attrs.minStepWidth) { options.minStepWidth = $parse($attrs.minStepWidth)($scope); }

      $timeout(function() {
        $element.pxWizard(options);

        // Set events
        EVENTS.forEach(event => {
          if (!$attrs[event]) { return; }
          $element.on(`${getEventName(event)}.px.wizard`, $parse($attrs[event])($scope));
        });

        // Readonly variable
        setInstancePointer($scope, $.fn.pxWizard.bind($element));

        $element.on('$destroy', () => $element.off().pxWizard('destroy'));
      });
    },
  };
}

angular.module('px-wizard', [])
  .directive('pxWizard', [ '$parse', '$timeout', pxWizardDirective ]);
