(function() {
  // ===============================================================================
  // Controllers / UI / Sortable
  //

  function UIJquerySortableCtrl() {
    this.handleOptions = {
      handle: 'i.fa-unsorted',
    };

    this.rowsOptions = {
      containerSelector: 'table',
      itemPath: '> tbody',
      itemSelector: 'tr',
      placeholder: '<tr class="placeholder">',
    };
  }

  function UISortableCtrl() {
    this.sortableItems = [
      { cls: 'bg-default', text: 'Item 1' },
      { cls: 'bg-primary', text: 'Item 2' },
      { cls: 'bg-success', text: 'Item 3' },
      { cls: 'bg-info',    text: 'Item 4' },
      { cls: 'bg-danger',  text: 'Item 5' },
    ];

    this.sortableImages = [
      'assets/demo/avatars/1.jpg',
      'assets/demo/avatars/2.jpg',
      'assets/demo/avatars/3.jpg',
      'assets/demo/avatars/4.jpg',
    ];
  }

  angular.module('pixeladmin')
    .controller('UIJquerySortableCtrl', UIJquerySortableCtrl)
    .controller('UISortableCtrl', UISortableCtrl);

})();
