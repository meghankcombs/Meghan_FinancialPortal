(function() {
  // ===============================================================================
  // Custom directives
  //

  function pageTitleDirective($rootScope) {
    return {
      link: function(_scope_, $element) {
        function listener(event, toState, toParams, fromState, fromParams) {
          var title =
            (toState.data && toState.data.pageTitle ? (toState.data.pageTitle + ' - ') : '') +
            'Angular Starter Project';

          $element.text(title);
        }

        $rootScope.$on('$stateChangeStart', listener);
      }
    };
  }

  angular.module('pixeladmin')
    .directive('pageTitle', [ '$rootScope', pageTitleDirective ]);

})();
