function nouisliderDirective($timeout, $parse) {
  'use strict';

  const SCOPE_OPTIONS = [
    'start', 'margin', 'limit', 'step', 'range', 'animate', 'snap', 'pips', 'disable',
  ];

  const AVAILABLE_OPTIONS = [
    'connect', 'direction', 'orientation', 'behaviour', 'tooltips', 'format', 'animationDuration',
  ];

  const EVENTS = [ 'onUpdate', 'onSlide', 'onSet', 'onChange', 'onStart', 'onEnd' ];

  function getEventName(key) {
    return key.replace(/^on([A-Z])/, (_m_, $1) => $1.toLowerCase());
  }

  return {
    restrict: 'E',
    replace:  true,
    template: '<div />',
    scope: {
      start:   '=',
      margin:  '=',
      limit:   '=',
      step:    '=',
      range:   '=',
      animate: '=',
      snap:    '=',
      pips:    '=',
      disable: '=',
    },

    link: function($scope, $element, $attrs) {
      const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;
      const options = {};
      const evts    = {};

      let _oldValue = [].concat($scope.start).join(',');

      // Utility functions
      //

      function _isValueChanged(newValue) { return _oldValue !== [].concat(newValue).join(','); }
      function _parseValues(values) { return values.map(val => typeof val === 'string' ? Number(val) : val); }
      function _saveValue(newValue) { _oldValue = [].concat(newValue).join(','); }

      // Prepare
      //

      SCOPE_OPTIONS.forEach(optName => {
        if (typeof $scope[optName] === 'undefined') { return; }
        options[optName] = $scope[optName];
      });

      AVAILABLE_OPTIONS.forEach(optName => {
        if (typeof $attrs[optName] === 'undefined') { return; }
        options[optName] = $parse($attrs[optName])($scope.$parent);
      });

      EVENTS.forEach(event => {
        if (typeof $attrs[event] === 'undefined') { return; }
        evts[getEventName(event)] = $parse($attrs[event])($scope.$parent);
      });

      // Handle change
      //

      const onUpdate  = evts.update || function() {};

      evts.update = function(...args) {
        const vals = _parseValues(args[0]);

        if (!_isValueChanged(vals)) { return; }
        $scope.$applyAsync(() => {
          _saveValue(vals);
          $scope.start = vals;

          onUpdate.apply(this, args);
        });
      };

      $timeout(() => {
        noUiSlider.create($element[0], options);

        const slider = $element[0].noUiSlider;

        // Setup events
        Object.keys(evts).forEach(event => {
          slider.on(event, evts[event]);
        });

        [ 'margin', 'limit', 'step', 'range', 'animate', 'snap' ].forEach(opt => {
          $scope.$watch(opt, val => {
            if (typeof val === 'undefined') { return; }
            $timeout(() => slider.updateOptions({ [opt]: val }));
          });
        });

        $scope.$watch('start', vals => {
          const _vals = _parseValues(vals);

          if (!_isValueChanged(_vals)) { return; }

          _saveValue(_vals);
          slider.set(_vals);
        }, true);

        $scope.$watch('pips', opts => {
          if (typeof opts === 'undefined') { return; }
          $timeout(() => slider.pips(opts));
        }, true);

        $scope.$watch('disable', disable => {
          if (disable) {
            $element[0].setAttribute('disabled', true);
          } else {
            $element[0].removeAttribute('disabled');
          }
        });

        // Readonly variable
        setInstancePointer($scope.$parent, slider);

        $scope.$on('$destroy', () => {
          slider.off();
          slider.destroy();
        });
      });
    },
  };
}

angular.module('nouislider', [])
  .directive('nouislider', [ '$timeout', '$parse', nouisliderDirective ]);
