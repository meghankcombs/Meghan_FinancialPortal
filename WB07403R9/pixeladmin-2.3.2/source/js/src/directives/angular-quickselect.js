function angularQuickselectDirective($parse, $timeout) {
  'use strict';

  const AVAILABLE_OPTIONS = [
    'activeButtonClass', 'breakOutAll', 'breakOutValues', 'buttonClass',
    'buttonDefaultClass', 'buttonRequiredClass', 'buttonTag', 'namespace',
    'selectDefaultText', 'wrapperClass',
  ];

  return {
    restrict: 'A',
    require:  'ngModel',
    scope: {
      ngModel: '=',
    },

    link($scope, $element, $attrs) {
      const options = {};

      AVAILABLE_OPTIONS.forEach(optName => {
        if (typeof $attrs[optName] === 'undefined') { return; }
        options[optName] = $parse($attrs[optName])($scope.$parent);
      });

      $timeout(() => {
        $element.quickselect(options);

        $scope.$watch('ngModel', () => {
          $timeout(() => $element.trigger('change'));
        });

        $element.on('$destroy', () => $element.off().removeData(`plugin_quickselect`));
      });
    },
  };
}

angular.module('angular-quickselect', [])
  .directive('quickselect', [ '$parse', '$timeout', angularQuickselectDirective ]);
