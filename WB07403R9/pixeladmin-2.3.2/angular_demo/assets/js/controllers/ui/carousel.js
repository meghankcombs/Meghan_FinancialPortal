(function() {
  // ===============================================================================
  // Controllers / UI / Carousel
  //

  function UiCarouselCtrl() {
    this.isRtl = $('html').attr('dir') === 'rtl';
  }

  angular.module('pixeladmin')
    .controller('UiCarouselCtrl', UiCarouselCtrl)

})();
