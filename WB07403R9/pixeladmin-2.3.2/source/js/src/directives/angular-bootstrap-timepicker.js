function bootstrapTimepickerDirective($parse) {
  'use strict';

  const AVAILABLE_OPTIONS = [
    'template', 'defaultTime', 'disableFocus', 'disableMousewheel', 'modalBackdrop',
    'appendWidgetTo', 'explicitMode', 'icons', 'maxHours', 'snapToStep',
    'minuteStep', 'showSeconds', 'secondStep', 'showMeridian', 'showInputs',
  ];

  const EVENTS = [ 'onShow', 'onHide', 'onChangeTime' ];

  function getEventName(key) {
    return key.replace(/^on([A-Z])/, (_m_, $1) => $1.toLowerCase());
  }

  return {
    restrict: 'A',
    scope: {
      ngModel: '=',
    },

    link($scope, $element, $attrs) {
      const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;
      const options = {};
      let _oldTime;

      AVAILABLE_OPTIONS.forEach(optName => {
        if (typeof $attrs[optName] === 'undefined') { return; }
        options[optName] = $parse($attrs[optName])($scope.$parent);
      });

      if ($scope.ngModel) {
        _oldTime = $scope.ngModel;
        $element.val($scope.ngModel);
      }

      $element.timepicker(options);

      EVENTS.forEach(event => {
        if (!$attrs[event]) { return; }
        $element.on(`${getEventName(event)}.timepicker`, $parse($attrs[event])($scope.$parent));
      });

      $scope.$watch('ngModel', val => {
        if (_oldTime === val) { return; }

        _oldTime = val;
        $element.timepicker('setTime', val);
      });

      // Readonly variable
      setInstancePointer($scope.$parent, $.fn.timepicker.bind($element));

      $element.on('$destroy', () => {
        $element.off().timepicker('remove');
      });
    },
  };
}

angular.module('bootstrap-timepicker', [])
  .directive('bootstrapTimepicker', [ '$parse', bootstrapTimepickerDirective ]);
