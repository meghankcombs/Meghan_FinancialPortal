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
            'PixelAdmin: Responsive Bootstrap Template';

          $element.text(title);
        }

        $rootScope.$on('$stateChangeStart', listener);
      }
    };
  }

  // Demo: Holder directive
  // https://github.com/joshvillbrandt/ng-holder
  function holderDirective() {
    return {
      link: function(_scope_,  $element, $attrs) {
        if ($attrs.holder) { $attrs.$set('data-src', $attrs.holder); }

        Holder.run({ images: $element[0] });
      }
    };
  }

  // Demo: jQuery Sortable
  function jquerySortableDirective($parse) {
    return {
      link: function(_scope_, $element, $attrs) {
        $element.sortable($parse($attrs.options)());

        $element.bind('$destroy', function() { $element.sortable('destroy'); });
      },
    };
  }

  // Demo: jQuery Sortable - Table columns
  function jquerySortableColumnsDirective() {
    return {
      link: function(_scope_, $element) {
        var $elements = $element.find('tr');
        var oldIndex;

        $elements.sortable({
          containerSelector: 'tr',
          itemSelector:      'th',
          placeholder:       '<th class="placeholder"/>',
          vertical:          false,

          onDragStart: function($item, container, _super) {
            oldIndex = $item.index();
            $item.appendTo($item.parent());
            _super($item, container);
          },

          onDrop: function($item, container, _super) {
            var newIndex = $item.index();
            var field;

            if (newIndex != oldIndex) {
              $item.closest('table').find('tbody tr').each(function (i, row) {
                row = $(row);

                if (newIndex < oldIndex) {
                  row.children().eq(newIndex).before(row.children()[oldIndex]);
                } else if (newIndex > oldIndex) {
                  row.children().eq(newIndex).after(row.children()[oldIndex]);
                }
              });
            }

            _super($item, container);
          }
        });

        $element.bind('$destroy', function() { $elements.sortable('destroy'); });
      },
    };
  }

  // Demo: initialize sidebar
  function pxDemoSidebarDirective() {
    return {
      link: function(_scope_, $element) {
        pxDemo.initializeDemoSidebar('body > ui-view');
        $('#px-demo-sidebar').pxSidebar();
        pxDemo.initializeDemo();

        $element.bind('$destroy', function() {
          $('#px-demo-sidebar').pxSidebar('destroy');
          $('#px-demo-sidebar').off();
          $('#px-demo-sidebar *').off();
          $('#px-demo-sidebar').remove();
        });
      },
    };
  }


  angular.module('pixeladmin')
    .directive('pageTitle', [ '$rootScope', pageTitleDirective ])
    .directive('holder', holderDirective)
    .directive('jquerySortable', [ '$parse', jquerySortableDirective ])
    .directive('jquerySortableColumns', jquerySortableColumnsDirective)
    .directive('pxDemoSidebar', pxDemoSidebarDirective);

})();
