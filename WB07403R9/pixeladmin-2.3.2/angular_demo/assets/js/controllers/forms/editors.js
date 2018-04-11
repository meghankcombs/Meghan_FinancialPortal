(function() {
  // ===============================================================================
  // Controllers / Forms / Editors
  //

  function FormsEditorsCtrl() {
    this.switchLayout = function(e) {
      var $el    = $(e.target);
      var method = $el.is(':checked') ? 'addClass' : 'removeClass';

      $el.parents('.panel')
        .find('> .panel-body')[method]('p-a-0')
        .find('> *')[method]('m-a-0 b-a-0 border-radius-0');
    }
  }

  function FormsEditorsMarkdownCtrl() {
    this.text = [
      '### Hello there',
      'How are you?',
      '',
      'I have bellow task for you:',
      '',
      '- Select from this text...',
      '- Click the bold on THIS WORD and make THESE ONE italic',
      '- Link GOOGLE to google.com',
      '- Test to insert image (and try to tab after write the image description)',
      '- Test Preview',
      '- And ending here... Click "List"',
      '',
      'Enjoy!',
    ].join('\n');

    this.footer = '<div id="md-character-footer"></div><small id="md-character-counter" class="text-muted">350 character left</small>';

    this.onChange = function(e) {
      var contentLength = e.getContent().length;

      if (contentLength > 350) {
        $('#md-character-counter')
          .removeClass('text-muted')
          .addClass('text-danger')
          .html((contentLength - 350) + ' character surplus.');
      } else {
        $('#md-character-counter')
          .removeClass('text-danger')
          .addClass('text-muted')
          .html((350 - contentLength) + ' character left.');
      }
    };
  }

  function FormsEditorsSummernoteCtrl() {
    this.options = {
      toolbar: [
        ['parastyle', ['style']],
        ['fontstyle', ['fontname', 'fontsize']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['insert', ['picture', 'link', 'video', 'table', 'hr']],
        ['history', ['undo', 'redo']],
        ['misc', ['codeview', 'fullscreen']],
        ['help', ['help']]
      ],
    };
  }

  angular.module('pixeladmin')
    .controller('FormsEditorsCtrl', FormsEditorsCtrl)
    .controller('FormsEditorsMarkdownCtrl', FormsEditorsMarkdownCtrl)
    .controller('FormsEditorsSummernoteCtrl', FormsEditorsSummernoteCtrl);

})();
