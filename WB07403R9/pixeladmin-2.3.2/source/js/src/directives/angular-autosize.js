function angularAutosizeDirective() {
  'use strict';

  return {
    restrict: 'A',

    link(_scope_, $element) {
      $element.autosize();
      $element.on('$destroy', () => $element.trigger('autosize.destroy'));
    },
  };
}

angular.module('angular-autosize', [])
  .directive('autosize', angularAutosizeDirective);
