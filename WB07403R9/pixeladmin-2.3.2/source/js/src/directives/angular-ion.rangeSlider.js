function ionRangeSliderDirective($timeout, $parse) {
  'use strict';

  const SCOPE_OPTIONS = [ 'min', 'max', 'from', 'to', 'disable' ];

  const AVAILABLE_OPTIONS = [
    'irsType', 'step', 'minInterval', 'maxInterval', 'dragInterval', 'values',
    'fromFixed', 'fromMin', 'fromMax', 'fromShadow', 'toFixed', 'toMin',
    'toMax', 'toShadow', 'prettifyEnabled', 'prettifySeparator',
    'prettify', 'forceEdges', 'keyboard', 'keyboardStep', 'grid',
    'gridMargin', 'gridNum', 'gridSnap', 'hideMinMax', 'hideFromTo',
    'prefix', 'postfix', 'maxPostfix', 'decorateBoth', 'valuesSeparator',
    'inputValuesSeparator',
  ];

  const CALLBACKS = [ 'onStart', 'onChange', 'onFinish', 'onUpdate' ];

  function getOptionName(key) {
    return key === 'irsType' ? 'type' : key.replace(/[A-Z]/g, $m => '_' + $m.toLowerCase());
  }

  return {
    restrict: 'E',
    replace:  true,
    template: '<input type="text" value="">',
    scope: {
      min:     '=',
      max:     '=',
      from:    '=',
      to:      '=',
      disable: '=',
    },

    link: function($scope, $element, $attrs) {
      const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;
      const options = {};

      SCOPE_OPTIONS.forEach(optName => {
        if (typeof $scope[optName] === 'undefined') { return; }
        options[optName] = $scope[optName];
      });

      AVAILABLE_OPTIONS.forEach(optName => {
        if (typeof $attrs[optName] === 'undefined') { return; }
        options[getOptionName(optName)] = $parse($attrs[optName])($scope.$parent);
      });

      CALLBACKS.forEach(callback => {
        if (typeof $attrs[callback] === 'undefined') { return; }
        options[callback] = $parse($attrs[callback])($scope.$parent);
      });

      const onFinishFn  = options.onFinish || function() {};

      options.onFinish = function(...args) {
        $scope.$apply(() => {
          $scope.from = args[0].from;
          $scope.to   = args[0].to;

          onFinishFn.apply(this, args);
        });
      };

      $timeout(() => {
        $element.ionRangeSlider(options);

        const slider = $element.data('ionRangeSlider');

        $scope.$watch('min', min => slider.update({ min }));
        $scope.$watch('max', max => slider.update({ max }));

        $scope.$watch('from', from => {
          if (slider.old_from !== from) { slider.update({ from }); }
        });

        $scope.$watch('to', to => {
          if (slider.old_to !== to) { slider.update({ to }); }
        });

        $scope.$watch('disable', disable => slider.update({ disable }));

        // Readonly variable
        setInstancePointer($scope.$parent, slider);

        $scope.$on('$destroy', () => {
          $element.ionRangeSlider('destroy');
          $element.off().removeData('ionRangeSlider');
        });
      });
    },
  };
}

angular.module('ion.rangeslider', [])
  .directive('ionRangeSlider', [ '$timeout', '$parse', ionRangeSliderDirective ]);
