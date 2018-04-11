(function() {
  // ===============================================================================
  // Config
  //

  function config($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    // Default url
    $urlRouterProvider.otherwise("/dashboards");
    $locationProvider.hashPrefix('!');

    $ocLazyLoadProvider.config({
      debug: false
    });


    // Dashboards
    $stateProvider
      .state('dashboards', {
        abstract: true,
        url: '/dashboards',
        templateUrl: 'assets/views/common/layout.html',
      })
      .state('dashboards.default', {
        url: '',
        templateUrl: 'assets/views/dashboards/default.html',
        data: { pageTitle: 'Dashboard' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/dashboards/default.js',
              {
                serie: true,
                name: 'angular-morris',
                files: ['assets/js/libs/raphael.js', 'assets/js/libs/morris.js', 'assets/js/pixeladmin/directives/angular-morris.js']
              },
              {
                name: 'easypiechart',
                files: ['assets/js/libs/angular.easypiechart.js']
              },
              {
                serie: true,
                name: 'px-sparkline',
                files: ['assets/js/libs/jquery.sparkline.js', 'assets/js/pixeladmin/plugins/px-sparkline.js', 'assets/js/pixeladmin/directives/angular-px-sparkline.js']
              },
            ]);
          },
        },
      })
      .state('dashboards.analytics', {
        url: '/analytics',
        templateUrl: 'assets/views/dashboards/analytics.html',
        data: { pageTitle: 'Analytics - Dashboards' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/dashboards/analytics.js',
              {
                serie: true,
                name: 'px-sparkline',
                files: ['assets/js/libs/jquery.sparkline.js', 'assets/js/pixeladmin/plugins/px-sparkline.js', 'assets/js/pixeladmin/directives/angular-px-sparkline.js']
              },
              {
                serie: true,
                name: 'gridshore.c3js.chart',
                files: ['assets/js/libs/d3.js', 'assets/js/libs/c3.js', 'assets/js/libs/c3-angular.js']
              },
            ]);
          },
        },
      })
      .state('dashboards.videos', {
        url: '/videos',
        templateUrl: 'assets/views/dashboards/videos.html',
        data: { pageTitle: 'Videos - Dashboards' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/dashboards/videos.js',
              {
                serie: true,
                name: 'angular-morris',
                files: ['assets/js/libs/raphael.js', 'assets/js/libs/morris.js', 'assets/js/pixeladmin/directives/angular-morris.js']
              },
              {
                name: 'bootstrap-datepicker',
                files: ['assets/js/libs/bootstrap-datepicker.js', 'assets/js/pixeladmin/directives/angular-bootstrap-datepicker.js']
              },
            ]);
          },
        },
      })
      .state('dashboards.financial', {
        url: '/financial',
        templateUrl: 'assets/views/dashboards/financial.html',
        data: { pageTitle: 'Financial - Dashboards' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/dashboards/financial.js',
              {
                serie: true,
                name: 'chart.js',
                files: ['assets/js/libs/Chart.js', 'assets/js/libs/angular-chart.js']
              },
              {
                serie: true,
                name: 'px-sparkline',
                files: ['assets/js/libs/jquery.sparkline.js', 'assets/js/pixeladmin/plugins/px-sparkline.js', 'assets/js/pixeladmin/directives/angular-px-sparkline.js']
              },
            ]);
          },
        },
      })
      .state('dashboards.blog', {
        url: '/blog',
        templateUrl: 'assets/views/dashboards/blog.html',
        data: { pageTitle: 'Blog - Dashboards' },
      })

    // Widgets
    $stateProvider
      .state('widgets', {
        abstract: true,
        url: '/widgets',
        templateUrl: 'assets/views/common/layout.html',
      })
      .state('widgets.lists', {
        url: '/lists',
        templateUrl: 'assets/views/widgets/lists.html',
        data: { pageTitle: 'Lists - Widgets' },
      })
      .state('widgets.pricing', {
        url: '/pricing',
        templateUrl: 'assets/views/widgets/pricing.html',
        data: { pageTitle: 'Pricing - Widgets' },
      })
      .state('widgets.timeline', {
        url: '/timeline',
        templateUrl: 'assets/views/widgets/timeline.html',
        data: { pageTitle: 'Timeline - Widgets' },
      })
      .state('widgets.misc', {
        url: '/misc',
        templateUrl: 'assets/views/widgets/misc.html',
        data: { pageTitle: 'Misc - Widgets' },
      });

    // Boxes
    $stateProvider
      .state('boxes', {
        abstract: true,
        url: '/boxes',
        templateUrl: 'assets/views/common/layout.html',
      })
      .state('boxes.page', {
        url: '',
        templateUrl: 'assets/views/boxes.html',
        data: { pageTitle: 'Boxes' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/boxes.js',
              {
                serie: true,
                name: 'angular-morris',
                files: ['assets/js/libs/raphael.js', 'assets/js/libs/morris.js', 'assets/js/pixeladmin/directives/angular-morris.js']
              },
              {
                serie: true,
                name: 'px-sparkline',
                files: ['assets/js/libs/jquery.sparkline.js', 'assets/js/pixeladmin/plugins/px-sparkline.js', 'assets/js/pixeladmin/directives/angular-px-sparkline.js']
              },
            ]);
          }
        },
      });

    // Utilities
    $stateProvider
      .state('utilities', {
        abstract: true,
        url: '/utilities',
        templateUrl: 'assets/views/common/layout.html',
      })
      .state('utilities.page', {
        url: '',
        templateUrl: 'assets/views/utilities.html',
        data: { pageTitle: 'Boxes' },
      });

    // UI elements
    $stateProvider
      .state('ui', {
        abstract: true,
        url: '/ui',
        templateUrl: 'assets/views/common/layout.html',
      })
      .state('ui.buttons', {
        url: '/buttons',
        templateUrl: 'assets/views/ui/buttons.html',
        data: { pageTitle: 'Buttons - UI elements' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/ui/buttons.js',
            ]);
          }
        },
      })
      .state('ui.tabs', {
        url: '/tabs',
        templateUrl: 'assets/views/ui/tabs.html',
        data: { pageTitle: 'Tabs & Accordions - UI elements' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                name: 'px-tab-resize',
                files: ['assets/js/pixeladmin/plugins/px-tab-resize.js', 'assets/js/pixeladmin/directives/angular-px-tab-resize.js']
              },
            ]);
          }
        },
      })
      .state('ui.modals', {
        url: '/modals',
        templateUrl: 'assets/views/ui/modals.html',
        data: { pageTitle: 'Modals - UI elements' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/ui/modals.js',
              {
                name: 'ngBootbox',
                files: ['assets/js/libs/bootbox.js', 'assets/js/libs/ngBootbox.js']
              },
            ]);
          }
        },
      })
      .state('ui.alerts', {
        url: '/alerts',
        templateUrl: 'assets/views/ui/alerts.html',
        data: { pageTitle: 'Alerts & Tooltips - UI elements' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/ui/alerts.js',
              {
                name: 'px-block-alert',
                files: ['assets/js/pixeladmin/plugins/px-block-alert.js', 'assets/js/pixeladmin/directives/angular-px-block-alert.js']
              },
              {
                serie: true,
                name: 'growl',
                files: ['assets/js/libs/jquery.growl.js', 'assets/js/pixeladmin/extensions/growl.js', 'assets/js/pixeladmin/directives/angular-growl.js']
              },
              {
                name: 'toastr',
                files: ['assets/js/libs/toastr.js', 'assets/js/pixeladmin/directives/angular-toastr.js']
              },
            ]);
          }
        },
      })
      .state('ui.panels', {
        url: '/panels',
        templateUrl: 'assets/views/ui/panels.html',
        data: { pageTitle: 'Panels - UI elements' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/ui/panels.js',
              {
                name: 'px-wizard',
                files: ['assets/js/pixeladmin/plugins/px-wizard.js', 'assets/js/pixeladmin/directives/angular-px-wizard.js']
              },
            ]);
          },
        },
      })
      .state('ui.sortable', {
        url: '/sortable',
        templateUrl: 'assets/views/ui/sortable.html',
        data: { pageTitle: 'Sortable - UI elements' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/ui/sortable.js',
              'assets/js/libs/jquery-sortable.js',
              {
                serie: true,
                name: 'ng-sortable',
                files: [ 'assets/js/libs/Sortable.js', 'assets/js/libs/angular-legacy-sortable.js' ],
              },
            ]);
          },
        },
      })
      .state('ui.carousel', {
        url: '/carousel',
        templateUrl: 'assets/views/ui/carousel.html',
        data: { pageTitle: 'Carousel - UI elements' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/ui/carousel.js',
              {
                name: 'owl.carousel',
                files: [ 'assets/js/libs/owl.carousel.js', 'assets/js/pixeladmin/directives/angular-owl.carousel.js' ],
              },
            ]);
          },
        },
      })
      .state('ui.misc', {
        url: '/misc',
        templateUrl: 'assets/views/ui/misc.html',
        data: { pageTitle: 'Misc - UI elements' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                name: 'px-wizard',
                files: ['assets/js/pixeladmin/plugins/px-wizard.js', 'assets/js/pixeladmin/directives/angular-px-wizard.js']
              },
            ]);
          },
        },
      });

    // Forms
    $stateProvider
      .state('forms', {
        abstract: true,
        url: '/forms',
        templateUrl: 'assets/views/common/layout.html',
      })
      .state('forms.layout', {
        url: '/layout',
        templateUrl: 'assets/views/forms/layout.html',
        data: { pageTitle: 'Layout - Forms' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                name: 'px-file',
                files: ['assets/js/pixeladmin/plugins/px-file.js', 'assets/js/pixeladmin/directives/angular-px-file.js']
              },
            ]);
          },
        },
      })
      .state('forms.controls', {
        url: '/controls',
        templateUrl: 'assets/views/forms/controls.html',
        data: { pageTitle: 'Controls - Forms' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                name: 'px-file',
                files: ['assets/js/pixeladmin/plugins/px-file.js', 'assets/js/pixeladmin/directives/angular-px-file.js']
              },
            ]);
          },
        },
      })
      .state('forms.components', {
        url: '/components',
        templateUrl: 'assets/views/forms/components.html',
        data: { pageTitle: 'Components - Forms' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                name: 'px-file',
                files: ['assets/js/pixeladmin/plugins/px-file.js', 'assets/js/pixeladmin/directives/angular-px-file.js']
              },
            ]);
          },
        },
      })
      .state('forms.advanced', {
        url: '/advanced',
        templateUrl: 'assets/views/forms/advanced.html',
        data: { pageTitle: 'Advanced - Forms' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/forms/advanced.js',
              {
                name: 'ui.select',
                files: ['assets/js/libs/select.js']
              },
              {
                name: 'ngTagsInput',
                files: ['assets/js/libs/ng-tags-input.js']
              },
              {
                name: 'angular-touchspin',
                files: ['assets/js/libs/jquery.bootstrap-touchspin.js', 'assets/js/pixeladmin/directives/angular-touchspin.js']
              },
              {
                name: 'angular-autosize',
                files: ['assets/js/libs/jquery.autosize.js', 'assets/js/pixeladmin/directives/angular-autosize.js']
              },
              {
                name: 'angular-maskedinput',
                files: ['assets/js/libs/jquery.maskedinput.js', 'assets/js/pixeladmin/directives/angular-maskedinput.js']
              },
              {
                name: 'angular-px-char-limit',
                files: ['assets/js/pixeladmin/plugins/px-char-limit.js', 'assets/js/pixeladmin/directives/angular-px-char-limit.js']
              },
              {
                name: 'angular-quickselect',
                files: ['assets/js/libs/jquery.quickselect.js', 'assets/js/pixeladmin/directives/angular-quickselect.js']
              },
              {
                name: 'angular-px-expanding-input',
                files: ['assets/js/pixeladmin/plugins/px-expanding-input.js', 'assets/js/pixeladmin/directives/angular-px-expanding-input.js']
              },
              {
                name: 'angular-knob',
                files: ['assets/js/libs/jquery.knob.js', 'assets/js/pixeladmin/directives/angular-knob.js']
              },
              {
                serie: true,
                name: 'angular-dropzone',
                files: ['assets/js/libs/dropzone.js', 'assets/js/pixeladmin/extensions/dropzone.js', 'assets/js/pixeladmin/directives/angular-dropzone.js']
              },
            ]);
          },
        },
      })
      .state('forms.sliders', {
        url: '/sliders',
        templateUrl: 'assets/views/forms/sliders.html',
        data: { pageTitle: 'Sliders - Forms' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/forms/sliders.js',
              {
                name: 'ion.rangeslider',
                files: ['assets/js/libs/ion.rangeSlider.js', 'assets/js/pixeladmin/directives/angular-ion.rangeSlider.js']
              },
              {
                name: 'bootstrap-slider',
                files: ['assets/js/libs/bootstrap-slider.js', 'assets/js/pixeladmin/directives/angular-bootstrap-slider.js']
              },
              {
                name: 'nouislider',
                files: ['assets/js/libs/nouislider.js', 'assets/js/pixeladmin/directives/angular-nouislider.js']
              },
            ]);
          },
        },
      })
      .state('forms.pickers', {
        url: '/pickers',
        templateUrl: 'assets/views/forms/pickers.html',
        data: { pageTitle: 'Pickers - Forms' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/forms/pickers.js',
              {
                serie: true,
                name: 'daterangepicker',
                files: ['assets/js/libs/moment.js', 'assets/js/libs/daterangepicker.js', 'assets/js/pixeladmin/directives/angular-daterangepicker.js']
              },
              {
                name: 'bootstrap-datepicker',
                files: ['assets/js/libs/bootstrap-datepicker.js', 'assets/js/pixeladmin/directives/angular-bootstrap-datepicker.js']
              },
              {
                serie: true,
                name: 'bootstrap-timepicker',
                files: ['assets/js/libs/bootstrap-timepicker.js', 'assets/js/pixeladmin/extensions/bootstrap-timepicker.js', 'assets/js/pixeladmin/directives/angular-bootstrap-timepicker.js']
              },
              {
                name: 'minicolors',
                files: ['assets/js/libs/jquery.minicolors.js', 'assets/js/pixeladmin/directives/angular-minicolors.js']
              },
            ]);
          },
        },
      })
      .state('forms.editors', {
        url: '/editors',
        templateUrl: 'assets/views/forms/editors.html',
        data: { pageTitle: 'Editors - Forms' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/forms/editors.js',
              {
                serie: true,
                name: 'summernote',
                files: ['assets/js/libs/summernote.js', 'assets/js/pixeladmin/extensions/summernote.js', 'assets/js/libs/angular-summernote.js']
              },
              {
                serie: true,
                name: 'bootstrap-markdown',
                files: ['assets/js/libs/markdown.js', 'assets/js/libs/bootstrap-markdown.js', 'assets/js/pixeladmin/extensions/bootstrap-markdown.js', 'assets/js/pixeladmin/directives/angular-bootstrap-markdown.js']
              },
            ]);
          },
        },
      })
      .state('forms.validation', {
        url: '/validation',
        templateUrl: 'assets/views/forms/validation.html',
        data: { pageTitle: 'Validation - Forms' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/forms/validation.js',
              {
                name: 'ui.select',
                files: ['assets/js/libs/select.js']
              },
              {
                name: 'px-file',
                files: ['assets/js/pixeladmin/plugins/px-file.js', 'assets/js/pixeladmin/directives/angular-px-file.js']
              },
              {
                name: 'px-wizard',
                files: ['assets/js/pixeladmin/plugins/px-wizard.js', 'assets/js/pixeladmin/directives/angular-px-wizard.js']
              },
              {
                name: 'angular-maskedinput',
                files: ['assets/js/libs/jquery.maskedinput.js', 'assets/js/pixeladmin/directives/angular-maskedinput.js']
              },
            ]);
          },
        },
      });

    // Tables
    $stateProvider
      .state('tables', {
        abstract: true,
        url: '/tables',
        templateUrl: 'assets/views/common/layout.html',
      })
      .state('tables.bootstrap', {
        url: '/bootstrap',
        templateUrl: 'assets/views/tables/bootstrap.html',
        data: { pageTitle: 'Bootstrap - Tables' },
      })
      .state('tables.datatables', {
        url: '/datatables',
        templateUrl: 'assets/views/tables/datatables.html',
        data: { pageTitle: 'DataTables - Tables' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                serie: true,
                name: 'datatables',
                files: ['assets/js/libs/jquery.dataTables.js', 'assets/js/libs/dataTables.bootstrap.js', 'assets/js/pixeladmin/extensions/datatables.js', 'assets/js/libs/angular-datatables.js']
              },
            ]);
          },
        },
      })
      .state('tables.editable-table', {
        url: '/editable-table',
        templateUrl: 'assets/views/tables/editable-table.html',
        data: { pageTitle: 'Editable table - Tables' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                name: 'angular-editable-table',
                files: ['assets/js/pixeladmin/directives/angular-editable-table.js']
              },
            ]);
          },
        },
      });

    // Charts
    $stateProvider
      .state('charts', {
        abstract: true,
        url: '/charts',
        templateUrl: 'assets/views/common/layout.html',
      })
      .state('charts.flot', {
        url: '/flot',
        templateUrl: 'assets/views/charts/flot.html',
        data: { pageTitle: 'Flot.js - Charts' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/charts/flot.js',
              {
                serie: true,
                name: 'angular-flot',
                files: [
                  'assets/js/libs/jquery.flot.js',
                  'assets/js/libs/jquery.flot.resize.js',
                  'assets/js/libs/jquery.flot.tooltip.js',
                  'assets/js/libs/jquery.flot.categories.js',
                  'assets/js/libs/jquery.flot.pie.js',
                  'assets/js/libs/angular-flot.js'
                ],
              },
            ]);
          },
        },
      })
      .state('charts.morris', {
        url: '/morris',
        templateUrl: 'assets/views/charts/morris.html',
        data: { pageTitle: 'Morris.js - Charts' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/charts/morris.js',
              {
                serie: true,
                name: 'angular-morris',
                files: ['assets/js/libs/raphael.js', 'assets/js/libs/morris.js', 'assets/js/pixeladmin/directives/angular-morris.js']
              },
            ]);
          },
        },
      })
      .state('charts.chartjs', {
        url: '/chartjs',
        templateUrl: 'assets/views/charts/chartjs.html',
        data: { pageTitle: 'Chart.js - Charts' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/charts/chartjs.js',
              {
                serie: true,
                name: 'chart.js',
                files: ['assets/js/libs/Chart.js', 'assets/js/libs/angular-chart.js']
              },
            ]);
          },
        },
      })
      .state('charts.chartist', {
        url: '/chartist',
        templateUrl: 'assets/views/charts/chartist.html',
        data: { pageTitle: 'Chartist - Charts' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/charts/chartist.js',
              {
                serie: true,
                name: 'angular-chartist',
                files: ['assets/js/libs/chartist.js', 'assets/js/libs/angular-chartist.js']
              },
            ]);
          },
        },
      })
      .state('charts.c3', {
        url: '/c3',
        templateUrl: 'assets/views/charts/c3.html',
        data: { pageTitle: 'C3.js - Charts' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/charts/c3.js',
              {
                serie: true,
                name: 'gridshore.c3js.chart',
                files: ['assets/js/libs/d3.js', 'assets/js/libs/c3.js', 'assets/js/libs/c3-angular.js']
              },
            ]);
          },
        },
      })
      .state('charts.sparkline', {
        url: '/sparkline',
        templateUrl: 'assets/views/charts/sparkline.html',
        data: { pageTitle: 'Sparkline - Charts' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/charts/sparkline.js',
              {
                serie: true,
                name: 'px-sparkline',
                files: ['assets/js/libs/jquery.sparkline.js', 'assets/js/pixeladmin/plugins/px-sparkline.js', 'assets/js/pixeladmin/directives/angular-px-sparkline.js']
              },
            ]);
          },
        },
      })
      .state('charts.easy-pie-chart', {
        url: '/easy-pie-chart',
        templateUrl: 'assets/views/charts/easy-pie-chart.html',
        data: { pageTitle: 'Easy Pie Chart - Charts' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/charts/easy-pie-chart.js',
              {
                name: 'easypiechart',
                files: ['assets/js/libs/angular.easypiechart.js']
              },
            ]);
          },
        },
      });

    // Authentication
    $stateProvider
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'assets/views/common/layout-blank.html',
      })
      .state('authentication.signin1', {
        url: '/signin-v1',
        templateUrl: 'assets/views/pages/authentication/signin-v1.html',
        data: { pageTitle: 'Sign In v1 - Pages' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/pages/signin.js',
              {
                name: 'px-responsive-bg',
                files: ['assets/js/pixeladmin/plugins/px-responsive-bg.js', 'assets/js/pixeladmin/directives/angular-px-responsive-bg.js']
              },
            ]);
          },
        },
      })
      .state('authentication.signin2', {
        url: '/signin-v2',
        templateUrl: 'assets/views/pages/authentication/signin-v2.html',
        data: { pageTitle: 'Sign In v2 - Pages' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/pages/signin.js',
              {
                name: 'px-responsive-bg',
                files: ['assets/js/pixeladmin/plugins/px-responsive-bg.js', 'assets/js/pixeladmin/directives/angular-px-responsive-bg.js']
              },
            ]);
          },
        },
      })
      .state('authentication.signup1', {
        url: '/signup-v1',
        templateUrl: 'assets/views/pages/authentication/signup-v1.html',
        data: { pageTitle: 'Sign Up v1 - Pages' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/pages/signup.js',
              {
                name: 'px-responsive-bg',
                files: ['assets/js/pixeladmin/plugins/px-responsive-bg.js', 'assets/js/pixeladmin/directives/angular-px-responsive-bg.js']
              },
            ]);
          },
        },
      })
      .state('authentication.signup2', {
        url: '/signup-v2',
        templateUrl: 'assets/views/pages/authentication/signup-v2.html',
        data: { pageTitle: 'Sign Up v2 - Pages' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/pages/signup.js',
              {
                name: 'px-responsive-bg',
                files: ['assets/js/pixeladmin/plugins/px-responsive-bg.js', 'assets/js/pixeladmin/directives/angular-px-responsive-bg.js']
              },
            ]);
          },
        },
      });

    // Pages
    $stateProvider
      .state('pages', {
        abstract: true,
        url: '/pages',
        templateUrl: 'assets/views/common/layout.html',
      })

      .state('pages.blog', {
        abstract: true,
        url: '/blog',
        template: '<ui-view/>'
      })
      .state('pages.blog.posts', {
        url: '/posts',
        templateUrl: 'assets/views/pages/blog/posts.html',
        data: { pageTitle: 'Posts - Blog - Pages' },
      })
      .state('pages.blog.post', {
        url: '/post',
        templateUrl: 'assets/views/pages/blog/post.html',
        data: { pageTitle: 'Post - Blog - Pages' },
      })

      .state('pages.forum', {
        abstract: true,
        url: '/forum',
        template: '<ui-view/>'
      })
      .state('pages.forum.forums-list', {
        url: '/forums-list',
        templateUrl: 'assets/views/pages/forum/forums-list.html',
        data: { pageTitle: 'Forums list - Forum - Pages' },
      })
      .state('pages.forum.topics', {
        url: '/topics',
        templateUrl: 'assets/views/pages/forum/topics.html',
        data: { pageTitle: 'Topics - Forum - Pages' },
      })
      .state('pages.forum.thread', {
        url: '/thread',
        templateUrl: 'assets/views/pages/forum/thread.html',
        data: { pageTitle: 'Thread - Forum - Pages' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/pages/forum-thread.js',
              {
                serie: true,
                name: 'summernote',
                files: ['assets/js/libs/summernote.js', 'assets/js/pixeladmin/extensions/summernote.js', 'assets/js/libs/angular-summernote.js']
              },
            ]);
          },
        },
      })

      .state('pages.messages', {
        abstract: true,
        url: '/forum',
        template: '<ui-view/>'
      })
      .state('pages.messages.list', {
        url: '/list',
        templateUrl: 'assets/views/pages/messages/list.html',
        data: { pageTitle: 'List - Messages - Pages' },
      })
      .state('pages.messages.item', {
        url: '/item',
        templateUrl: 'assets/views/pages/messages/item.html',
        data: { pageTitle: 'Item - Messages - Pages' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/pages/messages-item.js',
              {
                name: 'angular-px-expanding-input',
                files: ['assets/js/pixeladmin/plugins/px-expanding-input.js', 'assets/js/pixeladmin/directives/angular-px-expanding-input.js']
              },
              {
                serie: true,
                files: ['assets/js/libs/summernote.js', 'assets/js/pixeladmin/extensions/summernote.js']
              },
            ]);
          },
        },
      })
      .state('pages.messages.new', {
        url: '/new',
        templateUrl: 'assets/views/pages/messages/new.html',
        data: { pageTitle: 'New - Messages - Pages' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/pages/messages-new.js',
              {
                serie: true,
                name: 'summernote',
                files: ['assets/js/libs/summernote.js', 'assets/js/pixeladmin/extensions/summernote.js', 'assets/js/libs/angular-summernote.js']
              },
              {
                name: 'ngTagsInput',
                files: ['assets/js/libs/ng-tags-input.js']
              },
            ]);
          },
        },
      })

      .state('pages.about-us', {
        url: '/about-us',
        templateUrl: 'assets/views/pages/about-us.html',
        data: { pageTitle: 'About Us - Pages' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                name: 'px-responsive-bg',
                files: ['assets/js/pixeladmin/plugins/px-responsive-bg.js', 'assets/js/pixeladmin/directives/angular-px-responsive-bg.js']
              },
            ]);
          },
        },
      })
      .state('pages.account', {
        url: '/account',
        templateUrl: 'assets/views/pages/account.html',
        data: { pageTitle: 'Account - Pages' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                name: 'px-tab-resize',
                files: ['assets/js/pixeladmin/plugins/px-tab-resize.js', 'assets/js/pixeladmin/directives/angular-px-tab-resize.js']
              },
              {
                name: 'angular-px-char-limit',
                files: ['assets/js/pixeladmin/plugins/px-char-limit.js', 'assets/js/pixeladmin/directives/angular-px-char-limit.js']
              },
            ]);
          }
        },
      })
      .state('pages.invoice', {
        url: '/invoice',
        templateUrl: 'assets/views/pages/invoice.html',
        data: { pageTitle: 'Invoice - Pages' },
      })
      .state('pages.pricing', {
        url: '/pricing',
        templateUrl: 'assets/views/pages/pricing.html',
        data: { pageTitle: 'Pricing - Pages' },
      })
      .state('pages.profile-v1', {
        url: '/profile-v1',
        templateUrl: 'assets/views/pages/profile-v1.html',
        data: { pageTitle: 'Profile v1 - Pages' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/js/controllers/pages/profile-v1.js',
              {
                name: 'px-tab-resize',
                files: ['assets/js/pixeladmin/plugins/px-tab-resize.js', 'assets/js/pixeladmin/directives/angular-px-tab-resize.js']
              },
              {
                name: 'angular-px-expanding-input',
                files: ['assets/js/pixeladmin/plugins/px-expanding-input.js', 'assets/js/pixeladmin/directives/angular-px-expanding-input.js']
              },
              {
                name: 'angular-autosize',
                files: ['assets/js/libs/jquery.autosize.js', 'assets/js/pixeladmin/directives/angular-autosize.js']
              },
            ]);
          }
        },
      })
      .state('pages.profile-v2', {
        url: '/profile-v2',
        templateUrl: 'assets/views/pages/profile-v2.html',
        data: { pageTitle: 'Profile v2 - Pages' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                name: 'px-tab-resize',
                files: ['assets/js/pixeladmin/plugins/px-tab-resize.js', 'assets/js/pixeladmin/directives/angular-px-tab-resize.js']
              },
            ]);
          }
        },
      })
      .state('pages.search-results', {
        url: '/search-results',
        templateUrl: 'assets/views/pages/search-results.html',
        data: { pageTitle: 'Search results - Pages' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                name: 'px-tab-resize',
                files: ['assets/js/pixeladmin/plugins/px-tab-resize.js', 'assets/js/pixeladmin/directives/angular-px-tab-resize.js']
              },
            ]);
          }
        },
      })
      .state('pages.support-center', {
        url: '/support-center',
        templateUrl: 'assets/views/pages/support-center.html',
        data: { pageTitle: 'Support Center - Pages' },
      })
      .state('pages.blank', {
        url: '/blank',
        templateUrl: 'assets/views/pages/blank.html',
        data: { pageTitle: 'Blank - Pages' },
      });

    // Error pages
    $stateProvider
      .state('errors', {
        abstract: true,
        url: '/errors',
        templateUrl: 'assets/views/common/layout-blank.html',
      })
      .state('errors.404', {
        url: '/404',
        templateUrl: 'assets/views/pages/errors/404.html',
        data: { pageTitle: '404 - Pages' },
      })
      .state('errors.500', {
        url: '/500',
        templateUrl: 'assets/views/pages/errors/500.html',
        data: { pageTitle: '500 - Pages' },
      });

    // Invoice - Print version
    $stateProvider
      .state('invoice-print', {
        abstract: true,
        url: '/invoice-print',
        templateUrl: 'assets/views/common/layout-blank.html',
      })
      .state('invoice-print.page', {
        url: '',
        templateUrl: 'assets/views/pages/invoice-print.html',
        data: { pageTitle: 'Invoice (Print version) - Pages' },
      });
  }

  function run($rootScope, $state) {
    $rootScope.$state = $state;

    $rootScope.$on('$stateChangeStart', function() {
      // Restart page loader
      if (window.Pace && typeof window.Pace.restart === 'function') {
        window.Pace.restart();
      }

      // DEMO ONLY
      pxDemo.destroyBgsDemo('[responsive-bg]');
    });
  }

  angular.module('pixeladmin')
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$ocLazyLoadProvider', config])
    .run(['$rootScope', '$state', run]);

})();
