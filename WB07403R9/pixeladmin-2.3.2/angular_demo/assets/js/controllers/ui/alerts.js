(function() {
  // ===============================================================================
  // Controllers / UI / Alerts
  //

  function UIAlertsCtrl() {
    this.alerts = [
      { msg: 'Default alert.' },
      { cls: 'alert-warning', msg: 'Best check yo self, you\'re not looking too good.' },
      { cls: 'alert-danger',  msg: 'Change a few things up and try submitting again.' },
      { cls: 'alert-success', msg: 'You successfully read this important alert message.' },
      { cls: 'alert-info',    msg: 'This alert needs your attention, but it\'s not super important.' },
    ];

    this.darkAlerts = [
      { cls: 'alert-warning alert-dark', msg: 'Best check yo self, you\'re not looking too good.' },
      { cls: 'alert-danger alert-dark',  msg: 'Change a few things up and try submitting again.' },
      { cls: 'alert-success alert-dark', msg: 'You successfully read this important alert message.' },
      { cls: 'alert-info alert-dark',    msg: 'This alert needs your attention, but it\'s not super important.' },
    ];

    this.closeAlert = function(index) {
      this.alerts.splice(index, 1);
    };

    this.closeDarkAlert = function(index) {
      this.darkAlerts.splice(index, 1);
    };
  }

  function UIAlertsBlockCtrl($pxBlockAlert) {
    function scrollToTop(cb) {
      // Go to the top
      $('html, body').animate({ scrollTop: 0 }, 200);

      setTimeout(cb, 300);
    }

    this.addPageAlert = function(content, type, style, timer) {
      scrollToTop(function() {
        $pxBlockAlert.add(content, {
          type:      type,
          style:     style,
          namespace: style,
          timer:     timer,
        });
      });
    }

    this.clearPageAlerts = function(namespace) {
      scrollToTop(function() {
        $pxBlockAlert.clear(namespace);
      });
    }
  }

  function UIAlertsGrowlsCtrl($growl) {
    this.showGrowl = function(type, options) {
      $growl[type](options);
    };
  }

  function UIAlertsToastrCtrl($toastr) {
    var curMsgIndex = -1;

    function getMessage() {
      var msgs = [
        'My name is Inigo Montoya. You killed my father. Prepare to die!',
        '<div><input class="form-control input-sm" value="textbox"/>&nbsp;<a href="http://johnpapa.net" target="_blank">This is a hyperlink</a></div><div><button type="button" id="okBtn" class="btn btn-primary">Close me</button><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px">Surprise me</button></div>',
        'Are you the six fingered man?',
        'Inconceivable!',
        'I do not think that means what you think it means.',
        'Have fun storming the castle!',
      ];

      curMsgIndex++;

      if (curMsgIndex === msgs.length) { curMsgIndex = 0; }

      return msgs[curMsgIndex];
    }

    // Toastr
    //

    this.toastrTitle   = '';
    this.toastrMessage = '';
    this.toastrType    = 'success',
    this.toastrOptions = {
      closeButton:       false,
      progressBar:       false,
      preventDuplicates: false,
      newestOnTop:       false,
      positionClass:     'toast-top-right',
    };

    this.showToast = function() {
      $toastr[this.toastrType](this.toastrMessage || getMessage(), this.toastrTitle, {
        closeButton:       this.toastrOptions.closeButton,
        progressBar:       this.toastrOptions.progressBar,
        preventDuplicates: this.toastrOptions.preventDuplicates,
        newestOnTop:       this.toastrOptions.newestOnTop,
        positionClass:     this.toastrOptions.positionClass,
      });
    };

    this.clearToasts = function() {
      $toastr.clear();
    }
  }

  angular.module('pixeladmin')
    .controller('UIAlertsCtrl', UIAlertsCtrl)
    .controller('UIAlertsBlockCtrl', ['$pxBlockAlert', UIAlertsBlockCtrl])
    .controller('UIAlertsGrowlsCtrl', ['$growl', UIAlertsGrowlsCtrl])
    .controller('UIAlertsToastrCtrl', ['$toastr', UIAlertsToastrCtrl]);

})();
