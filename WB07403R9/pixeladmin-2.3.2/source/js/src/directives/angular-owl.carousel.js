function owlCarouselDirective($timeout, $parse) {
  'use strict';

  const SCOPE_OPTIONS = [
    'items', 'loop', 'center', 'mouseDrag', 'touchDrag', 'pullDrag', 'freeDrag',
    'merge', 'mergeFit', 'autoWidth', 'startPosition', 'urlHashListener', 'nav',
    'rewind', 'navText', 'slideBy', 'dots', 'dotsEach', 'dotData', 'lazyLoad',
    'lazyContent', 'autoplay', 'autoplayTimeout', 'autoplayHoverPause',
    'smartSpeed', 'fluidSpeed', 'autoplaySpeed', 'navSpeed', 'dotsSpeed',
    'dragEndSpeed', 'responsive', 'responsiveRefreshRate', 'video', 'videoHeight',
    'videoWidth', 'autoHeight', 'autoHeightClass',
  ];

  const AVAILABLE_OPTIONS = [
    'margin', 'stagePadding', 'navElement', 'responsiveBaseElement', 'animateOut',
    'animateIn', 'fallbackEasing', 'info', 'nestedItemSelector', 'itemElement',
    'stageElement', 'navContainer', 'dotsContainer', 'rtl',
  ];

  const EVENTS = [
    'onInitialize', 'onInitialized', 'onResize', 'onResized', 'onRefresh',
    'onRefreshed', 'onDrag', 'onDragged', 'onTranslate', 'onTranslated',
    'onChange', 'onChanged', 'onLoadLazy', 'onLoadedLazy', 'onStopVideo',
    'onPlayVideo',
  ];

  const AVAILABLE_METHODS = [
    'refresh', 'next', 'prev', 'to', 'replace', 'add', 'remove', 'play', 'stop',
  ];

  return {
    restrict:   'E',
    replace:    true,
    transclude: true,
    template:   '<div class="owl-carousel" ng-transclude />',
    scope: {
      items:                 '=',
      loop:                  '=',
      center:                '=',
      mouseDrag:             '=',
      touchDrag:             '=',
      pullDrag:              '=',
      freeDrag:              '=',
      merge:                 '=',
      mergeFit:              '=',
      autoWidth:             '=',
      startPosition:         '=',
      UrlHashListener:       '=',
      nav:                   '=',
      rewind:                '=',
      navText:               '=',
      slideBy:               '=',
      dots:                  '=',
      dotsEach:              '=',
      dotData:               '=',
      lazyLoad:              '=',
      lazyContent:           '=',
      autoplay:              '=',
      autoplayTimeout:       '=',
      autoplayHoverPause:    '=',
      smartSpeed:            '=',
      fluidSpeed:            '=',
      autoplaySpeed:         '=',
      navSpeed:              '=',
      dotsSpeed:             '=',
      dragEndSpeed:          '=',
      responsive:            '=',
      responsiveRefreshRate: '=',
      video:                 '=',
      videoHeight:           '=',
      videoWidth:            '=',
      autoHeight:            '=',
      autoHeightClass:       '=',
    },

    link: function($scope, $element, $attrs) {
      const options = {};
      const methods = {};
      const setMethodsPointer = $attrs.methods ? $parse($attrs.methods).assign : angular.noop;

      AVAILABLE_OPTIONS.forEach(optName => {
        if (typeof $attrs[optName] === 'undefined') { return; }
        options[optName] = $parse($attrs[optName])($scope.$parent);
      });

      AVAILABLE_METHODS.forEach(methodName => {
        methods[methodName] = function(param) {
          const suffix = methodName === 'play' || methodName === 'stop' ? 'autoplay' : 'carousel';

          $element.trigger(`${methodName}.owl.${suffix}`, param);
        };
      });

      // Set callbacks
      EVENTS.forEach(event => {
        if (!$attrs[event]) { return; }
        options[event] = $parse($attrs[event])($scope.$parent);
      });

      // Readonly variable
      setMethodsPointer($scope.$parent, methods);

      function init() {
        SCOPE_OPTIONS.forEach(optName => {
          if (typeof $scope[optName] === 'undefined') {
            delete options[optName];
            return;
          }
          options[optName] = $scope[optName];
        });

        $element.owlCarousel(options);
      }

      $timeout(() => {
        init();

        // Watchers
        SCOPE_OPTIONS.forEach(optName => {
          $scope.$watch(optName, (val, oldVal) => {
            if (typeof val === 'undefined' || val === oldVal) { return; }
            $element.trigger('destroy.owl.carousel');
            init();
          });
        });

        $element.on('$destroy', () => $element.trigger('destroy.owl.carousel'));
      });
    },
  };
}

angular.module('owl.carousel', [])
  .directive('owlCarousel', [ '$timeout', '$parse', owlCarouselDirective ]);
