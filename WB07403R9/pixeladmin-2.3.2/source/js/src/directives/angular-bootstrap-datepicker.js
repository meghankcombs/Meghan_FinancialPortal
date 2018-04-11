function bootstrapDatepickerDirective($parse) {
  'use strict';

  const SCOPE_OPTIONS = [
    'datesDisabled', 'daysOfWeekDisabled', 'daysOfWeekHighlighted',
    'enableOnReadonly', 'endDate', 'format', 'language', 'maxViewMode',
    'minViewMode', 'multidate', 'multidateSeparator', 'orientation',
    'startDate', 'startView', 'toggleActive', 'weekStart'
  ];

  const AVAILABLE_OPTIONS = [
    'autoclose', 'beforeShowDay', 'beforeShowMonth', 'beforeShowYear',
    'beforeShowDecade', 'beforeShowCentury', 'calendarWeeks', 'clearBtn',
    'container', 'disableTouchKeyboard', 'forceParse', 'assumeNearbyYear',
    'immediateUpdates', 'keepEmptyValues', 'keyboardNavigation', 'showOnFocus',
    'templates', 'title', 'todayBtn', 'todayHighlight', 'updateViewDate',
    'zIndexOffset',
  ];

  const EVENTS = [
    'onShow', 'onHide', 'onClearDate', 'onChangeDate', 'onChangeMonth', 'onChangeYear',
    'onChangeDecade', 'onChangeCentury'
  ];

  function getEventName(key) {
    return key.replace(/^on([A-Z])/, (_m_, $1) => $1.toLowerCase());
  }

  return {
    restrict: 'A',
    scope: {
      date:                  '=',
      datesDisabled:         '=',
      daysOfWeekDisabled:    '=',
      daysOfWeekHighlighted: '=',
      enableOnReadonly:      '=',
      endDate:               '=',
      format:                '=',
      language:              '=',
      maxViewMode:           '=',
      minViewMode:           '=',
      multidate:             '=',
      multidateSeparator:    '=',
      orientation:           '=',
      startDate:             '=',
      startView:             '=',
      toggleActive:          '=',
      weekStart:             '=',
    },

    link($scope, $element, $attrs) {
      const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;
      const options = {};
      let _oldDate;

      // Collect initial options
      //

      const mode = (function() {
        if ($element.is('input')) {
          return 'input';
        } else if ($element.hasClass('date')) {
          return 'component';
        } else if ($element.hasClass('input-daterange')) {
          return 'range';
        }
        return 'inline';
      })();

      AVAILABLE_OPTIONS.forEach(optName => {
        if (typeof $attrs[optName] === 'undefined') { return; }
        options[optName] = $parse($attrs[optName])($scope.$parent);
      });

      // Utility functions
      //

      function _normalizeDates(d) {
        if (mode === 'input' && options.multidate) {
          return `[${[].concat(d).join('|')}]`;
        } else if (mode === 'range') {
          return `{${String((d && d.start) || null)}|${String((d && d.end) || null)}}`;
        }
        return `-${String(d)}-`;
      }
      function _saveDate(newDate) { _oldDate = _normalizeDates(newDate); }
      function _isDateChanged(newDate) { return _normalizeDates(newDate) !== _oldDate; }

      function _updateDatepicker() {
        if (!_isDateChanged($scope.date)) { return; }

        _saveDate($scope.date);
        if (mode === 'input') {
          if (!options.multidate) {
            $element.datepicker('setDate', $scope.date);
          } else {
            const val = [].concat($scope.date);

            if (val.length) {
              $element.datepicker('setDates', val);
            } else {
              $element.datepicker('clearDates');
            }
          }
        } else if (mode === 'range') {
          $element.find('.bs-datepicker-start').datepicker('setDate', $scope.date.start);
          $element.find('.bs-datepicker-end').datepicker('setDate', $scope.date.end);
        } else {
          $element.datepicker('setDate', $scope.date);
        }
      }

      function _updateModel() {
        let newDate;

        if (mode === 'input' && options.multidate) {
          newDate = $element.datepicker('getDates');
        } else if (mode === 'range') {
          newDate = {
            start: $element.find('.bs-datepicker-start').datepicker('getDate'),
            end:   $element.find('.bs-datepicker-end').datepicker('getDate'),
          };
        } else {
          newDate = $element.datepicker('getDate');
        }

        if (!_isDateChanged(newDate)) { return; }

        _saveDate(newDate);
        $scope.$applyAsync(() => {
          $scope.date = newDate;
        });
      }

      // Initialization function
      //

      function init() {
        SCOPE_OPTIONS.forEach(optName => {
          if (typeof $scope[optName] === 'undefined') {
            delete options[optName];
            return;
          }
          options[optName] = $scope[optName];
        });

        $element.datepicker(options);

        _updateDatepicker();
      }

      // Initialize
      //

      init();

      // Set events
      //

      EVENTS.forEach(event => {
        if (!$attrs[event]) { return; }
        $element.on(getEventName(event), $parse($attrs[event])($scope.$parent));
      });

      // Handle changes
      //

      $element.on('hide.px-datepicker', _updateModel);
      $element.on('changeDate.px-datepicker', _updateModel);
      $scope.$watch('date', _updateDatepicker, true);

      // Watchers
      //

      SCOPE_OPTIONS.forEach(optName => {
        $scope.$watch(optName, (val, oldVal) => {
          if (typeof val === 'undefined' || val === oldVal) { return; }
          $element.datepicker('destroy');
          init();
        });
      });

      // Readonly variable
      setInstancePointer($scope.$parent, $.fn.datepicker.bind($element));

      $element.on('$destroy', () => {
        $element.off().datepicker('destroy');
      });
    },
  };
}

function bootstrapDatepickerStartDirective() {
  'use strict';

  return {
    restrict: 'E',
    template: '<input type="text" class="form-control bs-datepicker-start">',
    replace:  true,
  };
}

function bootstrapDatepickerEndDirective() {
  'use strict';

  return {
    restrict: 'E',
    template: '<input type="text" class="form-control bs-datepicker-end">',
    replace:  true,
  };
}

angular.module('bootstrap-datepicker', [])
  .directive('bootstrapDatepicker', [ '$parse', bootstrapDatepickerDirective ])
  .directive('bootstrapDatepickerStart', bootstrapDatepickerStartDirective)
  .directive('bootstrapDatepickerEnd', bootstrapDatepickerEndDirective);
