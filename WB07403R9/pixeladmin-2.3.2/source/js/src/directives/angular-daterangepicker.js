function daterangepickerDirective($parse) {
  'use strict';

  const SCOPE_OPTIONS = [
    'startDate', 'endDate', 'minDate', 'maxDate', 'dateLimit', 'ranges', 'locale', 'singleDatePicker',
  ];

  const AVAILABLE_OPTIONS = [
    'showDropdowns', 'showWeekNumbers', 'showISOWeekNumbers', 'timePicker',
    'timePickerIncrement', 'timePicker24Hour', 'timePickerSeconds',
    'showCustomRangeLabel', 'alwaysShowCalendars', 'opens', 'drops', 'buttonClasses',
    'applyClass', 'cancelClass', 'autoApply', 'linkedCalendars', 'isInvalidDate',
    'isCustomDate', 'autoUpdateInput', 'parentEl',
  ];

  const EVENTS = [ 'onShow', 'onHide', 'onShowCalendar', 'onHideCalendar', 'onApply', 'onCancel' ];

  function getEventName(key) {
    return key.replace(/^on([A-Z])/, (_m_, $1) => $1.toLowerCase());
  }

  return {
    restrict: 'A',
    scope: {
      startDate:        '=',
      endDate:          '=?',
      minDate:          '=',
      maxDate:          '=',
      dateLimit:        '=',
      ranges:           '=',
      locale:           '=',
      singleDatePicker: '=',
      callback:         '=',
    },

    link: function($scope, $element, $attrs) {
      const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;
      const options = {};
      const evts    = {};

      let _oldStartDate;
      let _oldEndDate;

      // Collect init data
      //

      AVAILABLE_OPTIONS.forEach(optName => {
        if (typeof $attrs[optName] === 'undefined') { return; }
        options[optName] = $parse($attrs[optName])($scope.$parent);
      });

      EVENTS.forEach(event => {
        if (!$attrs[event]) { return; }
        evts[getEventName(event)] = $parse($attrs[event])($scope.$parent);
      });

      // Update model
      //

      function _update() {
        const picker = $element.data('daterangepicker');

        if (!picker) { return; }

        const startDate = picker.startDate;
        const endDate   = picker.endDate;

        if (_oldStartDate === startDate && _oldEndDate === endDate) { return; }

        $scope.$applyAsync(() => {
          if (_oldStartDate !== startDate) {
            _oldStartDate = startDate;
            $scope.startDate = startDate;
          }

          if (_oldEndDate !== endDate) {
            _oldEndDate = endDate;
            $scope.endDate = endDate;
          }
        });
      }

      // Update on picker hide

      const onHide = evts.hide || function() {};

      evts.hide = function(...args) {
        _update();
        onHide.apply(this, args);
      };

      // Initialization function
      //

      function init() {
        SCOPE_OPTIONS.forEach(optName => {
          if (typeof $attrs[optName] === 'undefined') {
            delete options[optName];
            return;
          }
          options[optName] = $scope[optName];
        });

        _oldStartDate = $scope.startDate;
        _oldEndDate   = $scope.endDate;

        $element
          .off('.daterangepicker')
          .daterangepicker(options, $scope.callback);

        Object.keys(evts).forEach(event => {
          $element.on(`${event}.daterangepicker`, evts[event]);
        });

        _update();
      }

      // Init
      //

      init();

      // Watch model
      //

      $scope.$watch('startDate', val => {
        if (typeof val === 'undefined' || _oldStartDate === val) { return; }
        _oldStartDate = val;
        $element.data('daterangepicker').setStartDate(val);
      });

      $scope.$watch('endDate', val => {
        if (typeof val === 'undefined' || _oldEndDate === val) { return; }
        _oldEndDate = val;
        $element.data('daterangepicker').setEndDate(val);
      });

      // Watch options
      //

      [ 'minDate', 'maxDate', 'dateLimit', 'ranges', 'locale', 'singleDatePicker' ].forEach(optName => {
        $scope.$watch(optName, val => {
          if (typeof val === 'undefined') { return; }

          init();
        });
      });

      // Readonly variable
      setInstancePointer($scope.$parent, $.fn.daterangepicker.bind($element));

      $element.on('$destroy', () => {
        $element.off().data('daterangepicker').remove();
      });
    },
  };
}

angular.module('daterangepicker', [])
  .directive('daterangepicker', [ '$parse', daterangepickerDirective ]);
