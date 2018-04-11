(function() {
  // ===============================================================================
  // Controllers / UI / Panels
  //

  function UIPanelsStyleCtrl($scope) {
    var self = this;

    // Default class
    $scope.panelStyle = 'panel';

    $scope.$watch('panelStyle', function() {
      $('.panels-example .panel').each(function() {
        this.className = $scope.panelStyle;
      });

      if ($scope.panelStyle.indexOf('dark') !== -1) {
        $('.panels-example .btn-outline-colorless')
          .removeClass('btn-outline-colorless')
          .addClass('btn-outline-colorless-inverted');
      } else {
        $('.panels-example .btn-outline-colorless-inverted')
          .removeClass('btn-outline-colorless-inverted')
          .addClass('btn-outline-colorless');
      }
    });
  }

  angular.module('pixeladmin')
    .controller('UIPanelsStyleCtrl', ['$scope', UIPanelsStyleCtrl]);

})();
