function morrisDirectiveDestroy() {
  'use strict';

  this.raphael.remove();
  $(this.el).unbind('mouseleave');
  $(this.el).unbind('mousemove');
  $(this.el).unbind('touchstart touchmove touchend');
  $(this.el).unbind('click');
  $(this.el).unbind('mouseup');
  $(this.el).unbind('mousedown');
  $(this.el).unbind('resize');
}

function morrisDirectiveConfig($el, data, options) {
  'use strict';

  // Copy options
  const result = angular.extend({}, options || {});

  result.element = $el[0];
  result.data = data;

  return result;
}

function morrisDirectiveFactory(type, $scope, $element) {
  'use strict';

  let options;
  let isResize;
  let delayedResize;
  let chart;

  function init() {
    // Destroy if chart is already initialized
    if (chart) { destroy(); }

    options  = morrisDirectiveConfig($element, $scope.data, $scope.options);
    isResize = Boolean(options.resize);

    // Turn off generic resize
    options.resize = false;

    // Initialize chart
    chart = Morris[type](options);

    // Handle resize
    if (isResize) {
      delayedResize = (function() {
        if (this.timeoutId !== null) { window.clearTimeout(this.timeoutId); }
        if(!$(this.el).is(':visible')) { return null; };

        this.timeoutId = window.setTimeout(this.resizeHandler.bind(this), 100);

        return this.timeoutId;
      }).bind(chart);

      $(window).on('resize', delayedResize);
    }
  }

  function destroy() {
    if (delayedResize) { $(window).off('resize', delayedResize); }
    morrisDirectiveDestroy.call(chart);
    $element.empty();

    // Hard destroy
    chart = null;
    options = null;
    isResize = null;
    delayedResize = null;
    chart = null;
  }

  init();

  // Watch scope data
  [ 'data', 'options' ].forEach(attrName => {
    if (typeof $scope[attrName] === 'undefined') { return; }
    $scope.$watch(attrName, init, true);
  });

  $element.on('$destroy', destroy);
}

function morrisLineDirective($timeout) {
  'use strict';

  return {
    restrict: 'EA',
    template: '<div></div>',
    replace:  true,
    scope: {
      data:    '=',
      options: '=',
    },

    link($scope, $element) {
      $timeout(() => morrisDirectiveFactory('Line', $scope, $element));
    },
  };
}

function morrisBarDirective($timeout) {
  'use strict';

  return {
    restrict: 'EA',
    template: '<div></div>',
    replace:  true,
    scope: {
      data:    '=',
      options: '=',
    },

    link($scope, $element) {
      $timeout(() => morrisDirectiveFactory('Bar', $scope, $element));
    },
  };
}

function morrisAreaDirective($timeout) {
  'use strict';

  return {
    restrict: 'EA',
    template: '<div></div>',
    replace:  true,
    scope: {
      data:    '=',
      options: '=',
    },

    link($scope, $element) {
      $timeout(() => morrisDirectiveFactory('Area', $scope, $element));
    },
  };
}

function morrisDonutDirective($timeout) {
  'use strict';

  return {
    restrict: 'EA',
    template: '<div></div>',
    replace:  true,
    scope: {
      data:    '=',
      options: '=',
    },

    link($scope, $element) {
      $timeout(() => morrisDirectiveFactory('Donut', $scope, $element));
    },
  };
}

angular.module('angular-morris', [])
  .directive('morrisLine', [ '$timeout', morrisLineDirective ])
  .directive('morrisBar', [ '$timeout', morrisBarDirective ])
  .directive('morrisArea', [ '$timeout', morrisAreaDirective ])
  .directive('morrisDonut', [ '$timeout', morrisDonutDirective ]);
