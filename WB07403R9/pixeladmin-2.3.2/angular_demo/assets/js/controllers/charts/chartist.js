(function() {
  // ===============================================================================
  // Controllers / Charts / Chartist
  //

  function ChartsChartistCtrl() {
    var chartColors = pxDemo.getRandomColors();

    // Line
    //

    this.lineData = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [
        [pxDemo.getRandomData(1, 15), pxDemo.getRandomData(1, 15), pxDemo.getRandomData(1, 15), pxDemo.getRandomData(1, 15), pxDemo.getRandomData(1, 15)],
        [pxDemo.getRandomData(1, 15), pxDemo.getRandomData(1, 15), pxDemo.getRandomData(1, 15), pxDemo.getRandomData(1, 15), pxDemo.getRandomData(1, 15)],
        [pxDemo.getRandomData(1, 15), pxDemo.getRandomData(1, 15), pxDemo.getRandomData(1, 15), pxDemo.getRandomData(1, 15), pxDemo.getRandomData(1, 15)],
      ],
    };

    this.lineOptions = {
      fullWidth: true,
      chartPadding: {
        right: 40
      }
    };

    // BI-Polar
    //

    this.biPolarData = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
      series: [
        [pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3)],
        [pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3)],
        [pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3)],
        [pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3), pxDemo.getRandomData(-3, 3)]
      ]
    };

    this.biPolarOptions = {
      high: 3,
      low: -3,
      showArea:  true,
      showLine:  false,
      showPoint: false,
      fullWidth: true,
      axisX: {
        showLabel: false,
        showGrid:  false
      }
    };

    // Bars
    //

    this.barsData = {
      labels: ['First quarter of the year', 'Second quarter of the year', 'Third quarter of the year', 'Fourth quarter of the year'],
      series: [
        [pxDemo.getRandomData(30000, 80000), pxDemo.getRandomData(30000, 80000), pxDemo.getRandomData(30000, 80000), pxDemo.getRandomData(30000, 80000)],
        [pxDemo.getRandomData(30000, 80000), pxDemo.getRandomData(30000, 80000), pxDemo.getRandomData(30000, 80000), pxDemo.getRandomData(30000, 80000)],
        [pxDemo.getRandomData(1000, 10000),  pxDemo.getRandomData(1000, 10000),  pxDemo.getRandomData(1000, 10000),  pxDemo.getRandomData(1000, 10000)]
      ]
    };

    this.barsOptions = {
      seriesBarDistance: 10,
      axisX: { offset: 60 },
      axisY: {
        offset:        80,
        scaleMinSpace: 15,

        labelInterpolationFnc: function(value) {
          return value + ' CHF';
        },
      },
    };

    // Horizontal bars
    //

    this.hBarsData = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      series: [
        [pxDemo.getRandomData(1, 10), pxDemo.getRandomData(1, 10), pxDemo.getRandomData(1, 10), pxDemo.getRandomData(1, 10), pxDemo.getRandomData(1, 10), pxDemo.getRandomData(1, 10), pxDemo.getRandomData(1, 10)],
        [pxDemo.getRandomData(1, 10), pxDemo.getRandomData(1, 10), pxDemo.getRandomData(1, 10), pxDemo.getRandomData(1, 10), pxDemo.getRandomData(1, 10), pxDemo.getRandomData(1, 10), pxDemo.getRandomData(1, 10)]
      ]
    };

    this.hBarsOptions = {
      seriesBarDistance: 10,
      reverseData:       true,
      horizontalBars:    true,
      axisY:             { offset: 70 }
    };

    // Pie
    //

    function sum(a, b) {
      return a + b;
    };

    this.pieData = {
      series: [pxDemo.getRandomData(1, 10), pxDemo.getRandomData(1, 10), pxDemo.getRandomData(1, 10)],
    };

    this.pieOptions = {
      labelInterpolationFnc: value => {
        return Math.round(value / this.pieData.series.reduce(sum) * 100) + '%';
      }
    };

    // Gauge
    //

    this.gaugeData = {
      series: [20, 10, 30, 40],
    };

    this.gaugeOptions = {
      donut:      true,
      donutWidth: 60,
      startAngle: 270,
      total:      200,
      showLabel:  false
    };
  }

  angular.module('pixeladmin')
    .controller('ChartsChartistCtrl', ChartsChartistCtrl);

})();
