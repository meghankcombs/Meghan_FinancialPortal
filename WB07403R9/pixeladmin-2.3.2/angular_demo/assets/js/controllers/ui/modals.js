(function() {
  // ===============================================================================
  // Controllers / UI / Modals
  //

  function UiModalsInstanceCtrl($uibModalInstance) {
    this.ok = function() { $uibModalInstance.close(); };
    this.cancel = function() { $uibModalInstance.dismiss('cancel'); };
  };

  function addDocumentClass() {
    $('html').addClass('modal-open');
  }

  function removeDocumentClass() {
    $('html').removeClass('modal-open');
  }

  function UiModalsDefaultCtrl($uibModal) {
    this.open = function(size, templateUrl, windowClass) {
      var modalInstance = $uibModal.open({
        templateUrl:  templateUrl,
        controller:   'UiModalsInstanceCtrl',
        controllerAs: '$ctrl',
        size:         size,
        windowClass:  windowClass
      });

      modalInstance.result.then(removeDocumentClass, removeDocumentClass);
      addDocumentClass();
    };
  }

  function UiModalsBootboxCtrl($ngBootbox) {
    this.alert = function() {
      $ngBootbox
        .alert('Are you sure?')
        .then(function(result) {
          alert('Confirm result: ' + result);
        });
    };

    this.confirm = function() {
      $ngBootbox
        .confirm('Hello world!')
        .then(function() {
          alert('Confirmed!');
        }, function() {
          alert('Confirm dismissed!');
        });
    };

    this.prompt = function() {
      $ngBootbox
        .prompt('Enter something!')
        .then(function(result) {
          alert('Prompt returned: ' + result);
        }, function() {
          alert('Prompt dismissed!');
        });
    };

    this.custom = function() {
      $ngBootbox
        .customDialog({
          title:     'Custom title',
          message:   'I am a custom dialog',

          buttons: {
            success: {
              label:     'Success!',
              className: 'btn-success',

              callback: function() {
                alert('great success');
              },
            },
            danger: {
              label:     'Danger!',
              className: 'btn-danger',

              callback: function() {
                alert('uh oh, look out!');
              },
            },
            main: {
              label:     'Click ME!',
              className: 'btn-primary',

              callback: function() {
                alert('Primary button');
              },
            }
          },
        });
    };

  }

  angular.module('pixeladmin')
    .controller('UiModalsInstanceCtrl', ['$uibModalInstance', UiModalsInstanceCtrl])
    .controller('UiModalsDefaultCtrl', ['$uibModal', UiModalsDefaultCtrl])
    .controller('UiModalsBootboxCtrl', ['$ngBootbox', UiModalsBootboxCtrl])

})();
