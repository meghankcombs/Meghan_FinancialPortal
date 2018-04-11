(function() {
  // ===============================================================================
  // Controllers / Pages / Sign Up
  //

  function PagesSignUpCtrl($scope, $state) {
    this.user = {
      fullName: '',
      email:    '',
      username: '',
      password: '',
    };

    this.signUp = function() {
      if ($scope.signUpForm.$invalid) { return; }
      $state.go('dashboards.default');
    };

    // Initialize backgrounds
    pxDemo.initializeBgsDemo('responsive-bg', $('#px-demo-signup-link').length ? 1 : 0, '#000', function(isBgSet) {
      $('#px-demo-signin-link, #px-demo-signin-link a, .authentication-v2-social')
        .addClass(isBgSet ? 'text-white' : 'text-muted')
        .removeClass(isBgSet ? 'text-muted' : 'text-white');

      $('.authentication-v2-header')[isBgSet ? 'addClass' : 'removeClass']('text-white font-weight-bold');
    });
  }

  angular.module('pixeladmin')
    .controller('PagesSignUpCtrl', [ '$scope', '$state', PagesSignUpCtrl ]);

})();
