(function() {
  // ===============================================================================
  // Controllers / Pages / Messages Item
  //

  function PagesMessagesItemReplyCtrl($scope) {
    var self           = this;
    var editorAttached = false;

    this.message = '';

    this.onExpand = function() {
      editorAttached = true;

      $('#message-reply')
        .summernote({
          height: 200,
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
          callbacks: {
            onChange: function(contents, $editable) {
              $scope.$apply(function() { self.message = contents; });
            },
          },
        });
    };

    $scope.$on('$destroy', function() {
      editorAttached && $('#message-reply').summernote('destroy');
    });
  }

  angular.module('pixeladmin')
    .controller('PagesMessagesItemReplyCtrl', [ '$scope', PagesMessagesItemReplyCtrl ]);

})();
