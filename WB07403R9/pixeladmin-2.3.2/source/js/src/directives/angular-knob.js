function knobDirective($timeout, $parse) {
  'use strict';

  const HOOKS = [ 'onRelease', 'onChange', 'onDraw', 'onCancel', 'onFormat' ];

  function getEventName(key) {
    return key.replace(/^on([A-Z])/, (_m_, $1) => $1.toLowerCase());
  }

  return {
    restrict: 'A',
    require:  'ngModel',
    scope: {
      ngModel: '=',
    },

    link($scope, $element, $attrs) {
      const options = {};
      let _curValue;

      // Set hooks
      HOOKS.forEach(hook => {
        if (!$attrs[hook]) { return; }
        options[getEventName(hook)] = $parse($attrs[hook])($scope.$parent);
      });

      function _triggerUpdate(newVal) {
        if (newVal === _curValue) { return; }

        _curValue = newVal;

        $element.trigger('change');
      }

      const releaseFn  = options.release || function() {};

      options.release = function(...args) {
        _triggerUpdate(args[0]);

        releaseFn.apply(this, args);
      };

      $timeout(() => {
        $element.knob(options);

        $scope.$watch('ngModel', newVal => _triggerUpdate(newVal));

        $element.on('$destroy', () => $element.off());
      });
    },
  };
}

angular.module('angular-knob', [])
  .directive('knob', [ '$timeout', '$parse', knobDirective ]);
