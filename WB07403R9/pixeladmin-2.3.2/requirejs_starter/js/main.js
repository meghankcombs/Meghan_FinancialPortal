// ===============================================================================
// Main script
//

// Config
requirejs.config({
  baseUrl: 'js'
});

// Initialize
require(['jquery', 'px/pixeladmin', 'px/plugins/px-nav', 'px/plugins/px-navbar', 'px/plugins/px-footer'], function($) {
  $('body > .px-nav').pxNav();
  $('body > .px-footer').pxFooter();
});
