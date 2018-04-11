function bootstrapSliderDirective($timeout, $parse) {
  'use strict';

  const SCOPE_OPTIONS = [
    'value', 'min', 'max', 'step', 'range', 'scale', 'ticksLabels', 'ticks',
    'rangeHighlights', 'enabled',
  ];

  const OPTION_TYPES = {
    min: 'num', max: 'num', step: 'num', range: 'bool', scale: 'str',
    ticksLabels: 'arr', ticks: 'arr', rangeHighlights: 'arr', enabled: 'bool',
  };

  const AVAILABLE_OPTIONS = [
    'precision', 'orientation', 'selection', 'tooltip', 'tooltipSplit',
    'tooltipPosition', 'handle', 'reversed', 'formatter', 'naturalArrowKeys',
    'ticksPositions', 'ticksSnapBounds', 'ticksTooltip',
    'focus', 'labelledby',
  ];

  const EVENTS = [ 'onSlide', 'onSlideStart', 'onSlideStop', 'onChange', 'onSlideEnabled', 'onSlideDisabled' ];

  function getOptionName(key) {
    return key === 'rangeHighlights' ? key : key.replace(/[A-Z]/g, $m => '_' + $m.toLowerCase());
  }

  function getEventName(key) {
    return key.replace(/^on([A-Z])/, (_m_, $1) => $1.toLowerCase());
  }

  return {
    restrict: 'E',
    replace:  true,
    template: '<div><input type="text" value=""></div>',
    scope: {
      value:           '=',
      min:             '=',
      max:             '=',
      step:            '=',
      range:           '=',
      scale:           '=',
      ticksLabels:     '=',
      ticks:           '=',
      rangeHighlights: '=',
      enabled:         '=',
    },

    link: function($scope, $element, $attrs) {
      const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;

      const $input = $element.find('input');

      const options = {};
      const evts    = {};

      let _oldValue = null;

      // Utility functions
      //

      function _parseValue(val) {
        let result;

        if (Object.prototype.toString.call(val) === '[object Array]') {
          result = [ parseFloat(val[0]), parseFloat(val[1]) ];

          if (isNaN(result[0])) { result[0] = 0; }
          if (isNaN(result[1])) { result[1] = 0; }
        } else {
          result = parseFloat(val);

          if (isNaN(result)) { result = 0; }
        }

        return result;
      }

      function _isValueChanged(newValue) { return _oldValue !== [].concat(newValue).join(','); }
      function _saveValue(newValue) { _oldValue = [].concat(newValue).join(','); }

      // Prepare
      //

      // Collect attribute options
      AVAILABLE_OPTIONS.forEach(optName => {
        if (typeof $attrs[optName] === 'undefined') { return; }
        options[getOptionName(optName)] = $parse($attrs[optName])($scope.$parent);
      });

      // Collect events
      EVENTS.forEach(event => {
        if (!$attrs[event]) { return; }
        evts[getEventName(event)] = $parse($attrs[event])($scope.$parent);
      });

      // Wrap change event callback
      //

      const changeFn  = evts.change || function() {};

      evts.change = function(...args) {
        const newVal = args[0].value.newValue;

        if (!_isValueChanged(newVal)) { return; }
        $scope.$apply(() => {
          _saveValue(newVal);
          $scope.value = newVal;

          changeFn.apply(this, args);
        });
      };

      // Initialization
      //

      function init() {
        // Collect scope options
        SCOPE_OPTIONS.forEach(optName => {
          if (typeof $scope[optName] === 'undefined') {
            delete options[getOptionName(optName)];
            return;
          }

          const optType = OPTION_TYPES[optName];
          const optKey  = getOptionName(optName);

          if (optType === 'num') {
            options[optKey] = Number($scope[optName]);

            if (isNaN(options[optKey])) {
              throw new Error(`${optKey}: ${$scope[optName]} is not a valid number!`);
            }
          } else if (optType === 'str') {
            options[optKey] = String($scope[optName]);
          } else if (optType === 'bool') {
            options[optKey] = Boolean($scope[optName]);
          } else if (optType === 'arr') {
            if (Object.prototype.toString.call($scope[optName]) !== '[object Array]') {
              throw new Error(`${optKey}: ${$scope[optName]} is not an array!`);
            }
            options[optKey] = $scope[optName];
          } else {
            options[optKey] = $scope[optName];
          }
        });

        // Reset slider
        //

        if ($input.data('slider')) {
          $input.off().slider('destroy');
        }

        // Initialize slider
        //

        $input.slider(options);

        // Set events
        //

        Object.keys(evts).forEach(event => {
          $input.on(event, evts[event]);
        });
      }

      init();

      // Set instance variable
      //

      setInstancePointer($scope.$parent, $.fn.slider.bind($input));

      // Handle value change
      //

      $scope.$watch('value', newVal => {
        if (!_isValueChanged(newVal)) { return; }
        _saveValue(newVal);
        $input.slider('setValue', _parseValue(newVal));
      }, true);

      // Disable / Enable
      //

      $scope.$watch('enabled', enable => {
        $input.slider(enable ? 'enable' : 'disable');
      });

      // Watchers
      //

      SCOPE_OPTIONS
        .filter(optName => optName !== 'value' && optName !== 'enabled')
        .forEach(optName => {
          $scope.$watch(optName, init);
        });

      // On destroy
      //

      $scope.$on('$destroy', () => $input.off().slider('destroy'));
    },
  };
}

angular.module('bootstrap-slider', [])
  .directive('bootstrapSlider', [ '$timeout', '$parse', bootstrapSliderDirective ]);
