(function() {
  // ===============================================================================
  // Application
  //

  angular.module('pixeladmin', [
    'ui.router',
    'oc.lazyLoad',
    'ui.bootstrap',

    // Common modules
    'perfect_scrollbar',
    'px-navbar',
    'px-nav',
    'px-footer',
  ]);

  // Other modules will be loaded dynamically using oc.lazyLoad plugin (see the config.js file)

})();
