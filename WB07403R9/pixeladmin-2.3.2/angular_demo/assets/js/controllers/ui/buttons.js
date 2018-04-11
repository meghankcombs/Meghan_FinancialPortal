(function() {
  // ===============================================================================
  // Controllers / UI / Buttons
  //

  function UIButtonsOutlineBoxCtrl() {
    this.darkBg = false;

    this.changeBg = function(a,b,c) {
      var $panel = $('#btn-outline-colorless-switcher').parents('.panel');

      $panel
        [this.darkBg ? 'addClass' : 'removeClass']('panel-primary panel-dark panel-body-colorful')
        .find('.btn')
        [this.darkBg ? 'addClass' : 'removeClass']('btn-outline-colorless-inverted')
        [this.darkBg ? 'removeClass' : 'addClass']('btn-outline-colorless');
    };
  }

  angular.module('pixeladmin')
    .controller('UIButtonsOutlineBoxCtrl', UIButtonsOutlineBoxCtrl);

})();
