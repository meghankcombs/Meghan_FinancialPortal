function angularTouchspinDirective($parse, $timeout) {
  'use strict';

  const AVAILABLE_OPTIONS = [
    'initval', 'min', 'max', 'step', 'forcestepdivisibility', 'decimals',
    'stepinterval', 'stepintervaldelay', 'verticalbuttons', 'verticalupclass',
    'verticaldownclass', 'prefix', 'postfix', 'prefixExtraclass',
    'postfixExtraclass', 'booster', 'boostat', 'maxboostedstep', 'mousewheel',
    'buttondownClass', 'buttonupClass',
  ];

  const EVENTS = [
    'onStartspin', 'onStartupspin', 'onStartdownspin', 'onStopspin',
    'onStopupspin', 'onStopdownspin', 'onMin', 'onMax',
  ];

  function getEventName(key) {
    return key.replace(/[A-Z]/g, $m => '.' + $m.toLowerCase());
  }

  function getOptionName(key) {
    return key.replace(/[A-Z]/g, $m => '_' + $m.toLowerCase());
  }

  return {
    restrict: 'A',

    link($scope, $element, $attrs) {
      const options = {};

      AVAILABLE_OPTIONS.forEach(optName => {
        if (typeof $attrs[optName] === 'undefined') { return; }
        options[getOptionName(optName)] = $parse($attrs[optName])($scope);
      });

      $timeout(() => {
        $element.TouchSpin(options);

        // Set events
        EVENTS.forEach(event => {
          if (!$attrs[event]) { return; }
          $element.on(`touchspin.${getEventName(event)}`, $parse($attrs[event])($scope));
        });

        $element.on('$destroy', () => $element.TouchSpin('destroy'));
      });
    },
  };
}

angular.module('angular-touchspin', [])
  .directive('touchSpin', [ '$parse', '$timeout', angularTouchspinDirective ]);
