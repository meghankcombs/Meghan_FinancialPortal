(function() {
  // ===============================================================================
  // Controllers / Dashboards / Financial
  //

  function FinancialDashboardBalanceCtrl() {
    var chartColor = pxDemo.getRandomColors(1)[0];

    this.sparklineData = [pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), pxDemo.getRandomData(40000, 20000), 31600];

    this.sparklineOptions = {
      type: 'line',
      width: '100%',
      height: '60px',
      fillColor: pxUtil.hexToRgba(chartColor, 0.3),
      lineColor: chartColor,
      lineWidth: 1,
      spotColor: null,
      minSpotColor: null,
      maxSpotColor: null,
      highlightSpotColor: chartColor,
      highlightLineColor: chartColor,
      spotRadius: 3,
    };
  }

  function FinancialDashboardChartsCtrl() {
    var chartColors = pxDemo.getRandomColors();

    // Revenue
    //

    this.revenueLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    this.revenueData   = [ [pxDemo.getRandomData(5000, 2000), pxDemo.getRandomData(5000, 2000), pxDemo.getRandomData(5000, 2000), pxDemo.getRandomData(5000, 2000), pxDemo.getRandomData(5000, 2000), pxDemo.getRandomData(5000, 2000), 3239] ];

    this.revenueDatasetOverride = [{
      label:                     'Revenue, $',
      borderWidth:               1,
      backgroundColor:           pxUtil.hexToRgba(chartColors[0], 0.3),
      borderColor:               chartColors[0],
      pointBackgroundColor:      pxUtil.hexToRgba(chartColors[0], 0.3),
      pointBorderColor:          chartColors[0],
      pointHoverBackgroundColor: pxUtil.hexToRgba(chartColors[0], 0.3),
      pointHoverBorderColor:     chartColors[0],
    }];

    this.revenueOptions = {
      legend: { display: false },
    };

    // Expenses
    //

    this.expensesLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    this.expensesData   = [ [pxDemo.getRandomData(3000, 900), pxDemo.getRandomData(3000, 900), pxDemo.getRandomData(3000, 900), pxDemo.getRandomData(3000, 900), pxDemo.getRandomData(3000, 900), pxDemo.getRandomData(3000, 900), 1273] ];

    this.expensesDatasetOverride = [{
      label:           'Expenses, $',
      borderWidth:     1,
      backgroundColor: pxUtil.hexToRgba(chartColors[1], 0.3),
      borderColor:     chartColors[1],
    }];

    this.expensesOptions = {
      legend: { display: false },
    };
  }

  angular.module('pixeladmin')
    .controller('FinancialDashboardBalanceCtrl', FinancialDashboardBalanceCtrl)
    .controller('FinancialDashboardChartsCtrl', FinancialDashboardChartsCtrl);

})();
