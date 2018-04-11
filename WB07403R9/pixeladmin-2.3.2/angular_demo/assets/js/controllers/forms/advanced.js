(function() {
  // ===============================================================================
  // Controllers / Forms / Advanced
  //

  function FormsAdvancedMaskedInputCtrl() {
    this.completed = function() {
      alert('You typed the following: ' + this.val());
    };
  }

  function FormsAdvancedDropzoneCtrl() {
    this.$dropzone = null;

    this.options = {
      parallelUploads: 2,
      maxFilesize:     50,
      filesizeBase:    1000,

      resize: function(file) {
        return {
          srcX:      0,
          srcY:      0,
          srcWidth:  file.width,
          srcHeight: file.height,
          trgWidth:  file.width,
          trgHeight: file.height,
        };
      },
    };

    var self = this;

    this.callbacks = {
      queuecomplete: function() {
        console.log('Upload queue is complete.');
      },
    };

    // Mock the file upload progress (only for the demo)
    //
    Dropzone.prototype.uploadFiles = function(files) {
      var minSteps         = 6;
      var maxSteps         = 60;
      var timeBetweenSteps = 100;
      var bytesPerStep     = 100000;
      var isUploadSuccess  = Math.round(Math.random());

      var self = this;

      for (var i = 0; i < files.length; i++) {

        var file = files[i];
        var totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

        // Stub "abort" method
        file.xhr = {
          abort: function() {}
        };

        for (var step = 0; step < totalSteps; step++) {
          var duration = timeBetweenSteps * (step + 1);

          setTimeout(function(file, totalSteps, step) {
            return function() {
              file.upload = {
                progress: 100 * (step + 1) / totalSteps,
                total: file.size,
                bytesSent: (step + 1) * file.size / totalSteps
              };

              self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
              if (file.upload.progress == 100) {

                if (isUploadSuccess) {
                  file.status =  Dropzone.SUCCESS;
                  self.emit('success', file, 'success', null);
                } else {
                  file.status =  Dropzone.ERROR;
                  self.emit('error', file, 'Some upload error', null);
                }

                self.emit('complete', file);
                self.processQueue();
              }
            };
          }(file, totalSteps, step), duration);
        }
      }
    };
  }

  angular.module('pixeladmin')
    .controller('FormsAdvancedMaskedInputCtrl', FormsAdvancedMaskedInputCtrl)
    .controller('FormsAdvancedDropzoneCtrl', FormsAdvancedDropzoneCtrl);

})();
