(function() {
  // ===============================================================================
  // Controllers / Forms / Pickers
  //

  function FormsPickersDaterangePickerCtrl() {
    this.default = {
      startDate: moment('01/01/2015', 'MM/DD/YYYY'),
      endDate:   moment('02/25/2015', 'MM/DD/YYYY'),
    };

    this.dateTime = {
      startDate: moment('01/01/2015 1:30 PM', 'MM/DD/YYYY h:mm A'),
      endDate:   moment('01/02/2015 2:00 PM', 'MM/DD/YYYY h:mm A'),
    };

    // Single
    //

    this.single = moment('10/24/1984', 'MM/DD/YYYY');

    this.singleCallback = function(start) {
      alert('You are ' + moment().diff(start, 'years') + ' years old.');
    };

    // Predefined ranges
    //

    var startDate = moment().subtract(29, 'days');
    var endDate   = moment();

    this.range = {
      startDate: startDate,
      endDate:   endDate,
    };

    this.ranges = {
      'Today':        [ moment(),                                       moment() ],
      'Yesterday':    [ moment().subtract(1, 'days'),                   moment().subtract(1, 'days') ],
      'Last 7 Days':  [ moment().subtract(6, 'days'),                   moment() ],
      'Last 30 Days': [ moment().subtract(29, 'days'),                  moment() ],
      'This Month':   [ moment().startOf('month'),                      moment().endOf('month') ],
      'Last Month':   [ moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month') ],
    };

    this.rangeCallback = function(start, end) {
      $('#daterangepicker-btn').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    };

    this.rangeCallback(startDate, endDate);
  }

  function FormsPickersBootstrapDatepickerCtrl() {
    this.model = moment('12/02/2016', 'MM/DD/YYYY').toDate();

    this.featuresModel = [];

    this.rangeModel = {
      start: moment('12/02/2016', 'MM/DD/YYYY').toDate(),
      end:   null,
    };

    this.beforeShowMonth = function(date) {
      if (date.getMonth() === 8) {
        return false;
      }
    };

    this.beforeShowYear = function(date) {
      if (date.getFullYear() === 2014) {
        return false;
      }
    };
  }

  function FormsPickersMinicolorsCtrl() {
    this.color = {
      value: '#ff6161',
    };

    this.rgbColor = {
      value: 'rgba(97, 217, 90, 0.7)',
      opacity: 0.7,
    };

    this.colorWithOpacity = {
      value:   '#766fa8',
      opacity: 0.5,
    };
  }

  angular.module('pixeladmin')
    .controller('FormsPickersDaterangePickerCtrl', FormsPickersDaterangePickerCtrl)
    .controller('FormsPickersBootstrapDatepickerCtrl', FormsPickersBootstrapDatepickerCtrl)
    .controller('FormsPickersMinicolorsCtrl', FormsPickersMinicolorsCtrl);

})();
