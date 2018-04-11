function pxSparklineDirective($parse) {
  'use strict';

  return {
    restrict: 'A',
    require:  'ngModel',

    link($scope, $element, $attrs, ngModel) {
      function render() {
        const options = angular.extend({ type: 'line' }, $parse($attrs.options)($scope) || {});

        // Trim trailing comma if we are a string
        const model = angular.isString(ngModel.$viewValue) ?
          ngModel.$viewValue.replace(/(^,)|(,$)/g, '') :
          ngModel.$viewValue;

        // Make sure that we have an array of numbers
        const data = angular.isArray(model) ? model : model.split(',');

        $element.pxSparkline(data, options);
      }

      $scope.$watch($attrs.ngModel, () => render());
      $scope.$watch($attrs.options, () => render());
      $element.on('$destroy', () => $element.pxSparkline('destroy'));
    },
  };
}

angular.module('px-sparkline', [])
  .directive('pxSparkline', [ '$parse', pxSparklineDirective ]);
