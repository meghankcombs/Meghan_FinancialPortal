(function() {
  // ===============================================================================
  // Controllers / Charts / Easy Pie Chart
  //

  function ChartsEasyPieChartCtrl() {
    var options = {
      animate: 1000,
      size: 120,
      onStep: function(_from, _to, currentValue) {
        $(this.el).find('> span').text(Math.round(currentValue) + '%');
      },
    }

    // EasyPieChart 1

    this.easyPieChart1Data = pxDemo.getRandomData(100, 0);
    this.easyPieChart1Options = options;

    // EasyPieChart 2

    this.easyPieChart2Data = pxDemo.getRandomData(100, 0);
    this.easyPieChart2Options = options;
  }

  angular.module('pixeladmin')
    .controller('ChartsEasyPieChartCtrl', ChartsEasyPieChartCtrl);

})();
