(function() {
  // ===============================================================================
  // Config
  //

  function config($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    // Default url
    $urlRouterProvider.otherwise("/pages");
    $locationProvider.hashPrefix('!');

    $ocLazyLoadProvider.config({
      debug: false
    });

    // Routes
    $stateProvider
      .state('pages', {
        abstract: true,
        url: '/pages',
        templateUrl: 'views/common/layout.html',
      })
      .state('pages.main', {
        url: '',
        templateUrl: 'views/main.html',
        data: { pageTitle: 'Main page' },
      })
      .state('pages.second', {
        url: '/second',
        templateUrl: 'views/second.html',
        data: { pageTitle: 'Second page' },
        resolve: {
          // Load plugins here
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([]);
          },
        },
      });
  };

  function run($rootScope, $state) {
    $rootScope.$state = $state;

    $rootScope.$on('$stateChangeStart', function() {
      // Restart page loader
      if (window.Pace && typeof window.Pace.restart === 'function') {
        window.Pace.restart();
      }
    });
  }

  angular.module('pixeladmin')
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$ocLazyLoadProvider', config])
    .run(['$rootScope', '$state', run]);

})();
