(function() {
  // ===============================================================================
  // Controllers / Pages / Forum Thread
  //

  function PagesForumThreadReplyCtrl() {
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
    .controller('PagesForumThreadReplyCtrl', PagesForumThreadReplyCtrl);

})();
