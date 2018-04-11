function minicolorsDirective($parse) {
  'use strict';

  const SCOPE_OPTIONS = [
    'animationSpeed', 'animationEasing', 'changeDelay', 'control', 'dataUris',
    'defaultValue', 'format', 'hideSpeed', 'inline', 'opacity', 'keywords',
    'letterCase', 'position', 'showSpeed', 'theme', 'swatches',
  ];

  const EVENTS = [ 'onChange', 'onHide', 'onShow' ];

  function getEventName(key) {
    return key.replace(/^on([A-Z])/, (_m_, $1) => $1.toLowerCase());
  }

  return {
    restrict: 'A',
    scope: {
      color:           '=',
      animationSpeed:  '=',
      animationEasing: '=',
      changeDelay:     '=',
      control:         '=',
      dataUris:        '=',
      defaultValue:    '=',
      format:          '=',
      hideSpeed:       '=',
      inline:          '=',
      opacity:         '=',
      keywords:        '=',
      letterCase:      '=',
      position:        '=',
      showSpeed:       '=',
      theme:           '=',
      swatches:        '=',
    },

    link($scope, $element, $attrs) {
      const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;

      if (!$scope.color) { $scope.color = {}; }
      if (typeof $scope.color.value !== 'string') { $scope.color.value = ''; }

      const options = {};
      let _oldVal;

      EVENTS.forEach(event => {
        if (!$attrs[event]) { return; }
        options[getEventName(event)] = $parse($attrs[event])($scope.$parent);
      });

      function _updateOptions() {
        SCOPE_OPTIONS.forEach(optName => {
          options[optName] = $scope[optName];
        });

        if (options.opacity) {
          if (typeof $scope.color.opacity !== 'number') { $scope.color.opacity = 1; }
          $element[0].setAttribute('data-opacity', $scope.color.opacity);
        } else {
          $element[0].removeAttribute('data-opacity');
        }
      }

      function _parseValue(value, opacity) { return [ String(value), String(Number(opacity)) ].join('|'); }
      function _isValueChanged(val) { return _oldVal !== val; }
      function _saveValue(val) { _oldVal = val; }

      _updateOptions();

      EVENTS.forEach(event => {
        if (!$attrs[event]) { return; }
        options[getEventName(event)] = $parse($attrs[event])($scope.$parent);
      });

      const onChange  = options.change || function() {};

      options.change = function(...args) {
        const val = _parseValue(args[0], options.opacity ? args[1] : 1);

        if (!_isValueChanged(val)) { return; }
        _saveValue(val);

        $scope.$applyAsync(() => {
          $scope.color.value = args[0];

          if (options.opacity) {
            $scope.color.opacity = args[1];
          }

          onChange.apply(this, args);
        });
      };

      $element.val($scope.color.value);

      $element.minicolors(options);

      // Readonly variable
      setInstancePointer($scope.$parent, $.fn.minicolors.bind($element));

      $scope.$watch('color', val => {
        const _val = _parseValue(val.value, options.opacity ? val.opacity : 1);

        if (!_isValueChanged(_val)) { return; }
        _saveValue(_val);

        if (options.opacity) {
          $element.minicolors('value', { color: val.value, opacity: val.opacity });
        } else {
          $element.minicolors('value', val.value);
        }
      }, true);

      SCOPE_OPTIONS.forEach(optName => {
        $scope.$watch(optName, val => {
          if (typeof val === 'undefined') { return; }
          _updateOptions();
          $element.minicolors('settings', options);
        });
      });

      $element.on('$destroy', () => {
        $element.minicolors('destroy');
      });
    },
  };
}

angular.module('minicolors', [])
  .directive('minicolors', [ '$parse', minicolorsDirective ]);
