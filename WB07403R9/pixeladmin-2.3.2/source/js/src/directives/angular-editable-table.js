function editableTableCtrl($element, $window) {
  'use strict';

  const ARROW_LEFT  = 37;
  const ARROW_UP    = 38;
  const ARROW_RIGHT = 39;
  const ARROW_DOWN  = 40;
  const ENTER       = 13;
  const ESC         = 27;
  const TAB         = 9;

  const self = this;

  function resizeHandler() {
    if (!self.$editor.is(':visible')) { return; }

    self.$editor
      .offset(self.active.offset())
      .width(self.active.width())
      .height(self.active.height());
  }

  this.init = options => {
    this.options = options;
    this.$editor = options.editor.clone(true).css('position', 'absolute').hide().appendTo($element.parent());

    this.$editor
      .blur(() => {
        this.setActiveText();
        this.$editor.hide();
      })
      .keydown(function(e) {
        if (e.which === ENTER) {
          self.setActiveText();
          self.$editor.hide();
          self.active.focus();
          e.preventDefault();
          e.stopPropagation();
        } else if (e.which === ESC) {
          self.$editor.val(self.active.text());
          e.preventDefault();
          e.stopPropagation();
          self.$editor.hide();
          self.active.focus();
        } else if (e.which === TAB) {
          self.active.focus();
        } else if (this.selectionEnd - this.selectionStart === this.value.length) {
          const possibleMove = self.movement(self.active, e.which);

          if (possibleMove.length > 0) {
            possibleMove.focus();
            e.preventDefault();
            e.stopPropagation();
          }
        }
      })
      .on('input paste', () => {
        const evt = $.Event('validate');

        this.active.trigger(evt, this.$editor.val());
        if (evt.result === false) {
          this.$editor.addClass('error');
        } else {
          this.$editor.removeClass('error');
        }
      });

    angular.element($window).on('resize', resizeHandler);
  };

  this.destroy = () => {
    $element.css('cursor', '').off().find('td').removeAttr('tabindex');
    angular.element($window).off('resize', resizeHandler);
    this.$editor.off().remove();
  };

  this.showEditor = select => {
    this.active = $element.find('td:focus');
    if (!this.active.length) { return; }

    this.$editor
      .val(this.active.text())
      .removeClass('error')
      .show()
      .offset(this.active.offset())
      .css(this.active.css(this.options.cloneProperties))
      .width(this.active.width())
      .height(this.active.height())
      .focus();

    if (select) { this.$editor.select(); }
  };

  this.setActiveText = () => {
    const text = this.$editor.val();
    const evt  = $.Event('change');
    let originalContent;

    if (this.active.text() === text || this.$editor.hasClass('error')) {
      return true;
    }

    originalContent = this.active.html();
    this.active.text(text).trigger(evt, text);

    if (evt.result === false) {
      this.active.html(originalContent);
    }
  };

  this.movement = (element, keycode) => {
    if (keycode === ARROW_RIGHT) {
      return element.next('td');
    } else if (keycode === ARROW_LEFT) {
      return element.prev('td');
    } else if (keycode === ARROW_UP) {
      return element.parent().prev().children().eq(element.index());
    } else if (keycode === ARROW_DOWN) {
      return element.parent().next().children().eq(element.index());
    }
    return [];
  };

  $element
    .on('click keypress dblclick', this.showEditor)
    .css('cursor', 'pointer')
    .keydown(e => {
      const possibleMove = this.movement(angular.element(e.target), e.which);
      let prevent = true;

      if (possibleMove.length > 0) {
        possibleMove.focus();
      } else if (e.which === ENTER) {
        this.showEditor(false);
      } else if (e.which === 17 || e.which === 91 || e.which === 93) {
        this.showEditor(true);
        prevent = false;
      } else {
        prevent = false;
      }
      if (prevent) {
        e.stopPropagation();
        e.preventDefault();
      }
    });

  $element.find('td').prop('tabindex', 1);
}

function editableTableDirective($parse) {
  'use strict';

  const DEFAULT_OPTIONS = {
    cloneProperties: [
      'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
      'text-align', 'font', 'font-size', 'font-family', 'font-weight', 'border',
      'border-top', 'border-bottom', 'border-left', 'border-right',
    ],

    editor: angular.element('<input>'),
  };

  const EVENTS = [ 'onChange', 'onValidate' ];

  function getEventName(key) {
    return key.replace(/^on([A-Z])/, (_m_, $1) => $1.toLowerCase());
  }

  return {
    restrict:   'A',
    controller: [ '$element', '$window', editableTableCtrl ],

    link: function($scope, $element, $attrs, ctrl) {
      const options = {};

      Object.keys(DEFAULT_OPTIONS).forEach(optName => {
        if (typeof $attrs[optName] === 'undefined') {
          options[optName] = DEFAULT_OPTIONS[optName];
          return;
        }

        options[optName] = $parse($attrs[optName])($scope);
      });

      ctrl.init(options);

      // Set events
      EVENTS.forEach(event => {
        if (!$attrs[event]) { return; }
        $element.on(getEventName(event), 'td', $parse($attrs[event])($scope));
      });

      $element.on('$destroy', ctrl.destroy);
    },
  };
}

angular.module('angular-editable-table', [])
  .directive('editableTable', [ '$parse', editableTableDirective ]);
