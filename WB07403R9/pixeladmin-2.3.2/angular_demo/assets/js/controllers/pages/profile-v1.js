(function() {
  // ===============================================================================
  // Controllers / Pages / Profile v1
  //

  function PagesProfileV1CommentCtrl($scope) {
    this.onExpand = function(e) {
      var $textarea = angular.element(e.target).find('textarea');

      $textarea.attr('rows', '3').autosize();

      $scope.$on('$destoy', function() {
        $textarea.trigger('autosize.destroy')
      });
    };
  }

  angular.module('pixeladmin')
    .controller('PagesProfileV1CommentCtrl', [ '$scope', PagesProfileV1CommentCtrl ]);

})();
