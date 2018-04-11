(function() {
  // ===============================================================================
  // Controllers / Pages / Sign In
  //

  function PagesSignInCtrl($scope, $window, $state) {
    this.credentials = {
      login:      '',
      password:   '',
      rememberMe: false
    };

    this.resetEmail = '';

    this.signIn = function() {
      if ($scope.signInForm.$invalid) { return; }
      $state.go('dashboards.default');
    };

    this.sendResetLink = function() {
      if ($scope.resetForm.$invalid) { return; }
      $state.go('dashboards.default');
    };

    $scope.$watch('passwordResetView', function() {
      angular.element($window).trigger('resize');
    });

    // Initialize backgrounds
    pxDemo.initializeBgsDemo('responsive-bg', $('#px-demo-signup-link').length ? 1 : 0, '#000', function(isBgSet) {
      $('#px-demo-signup-link, #px-demo-signup-link a, .authentication-v2-social')
        .addClass(isBgSet ? 'text-white' : 'text-muted')
        .removeClass(isBgSet ? 'text-muted' : 'text-white');

      $('.authentication-v2-header')[isBgSet ? 'addClass' : 'removeClass']('text-white font-weight-bold');
    });
  }

  angular.module('pixeladmin')
    .controller('PagesSignInCtrl', [ '$scope', '$window', '$state', PagesSignInCtrl ]);

})();
