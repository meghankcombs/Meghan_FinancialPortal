(function() {
  // ===============================================================================
  // Controllers / Main
  //

  function MainCtrl() {
    this.companyName = 'Your Company';
    this.username = 'User Name';
  }

  angular.module('pixeladmin')
    .controller('MainCtrl', MainCtrl);

})();
