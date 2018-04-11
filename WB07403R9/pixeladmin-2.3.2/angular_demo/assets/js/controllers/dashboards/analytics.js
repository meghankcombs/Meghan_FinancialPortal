(function() {
  // ===============================================================================
  // Controllers / Dashboards / Analytics
  //

  function AnalyticsDashboardChartsCtrl() {
    var colors = pxDemo.getRandomColors();

    // Sparkline
    //

    function generateSparklineData(index, type) {
      var data = [
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
      ];

      var options = type === 'bar' ? {
        type:       'bar',
        barColor:   colors[index],
        barSpacing: 2,
      } : {
        type:               'line',
        fillColor:          null,
        lineColor:          colors[index],
        lineWidth:          1,
        spotColor:          null,
        minSpotColor:       null,
        maxSpotColor:       null,
        highlightSpotColor: colors[index + 1],
        highlightLineColor: colors[index + 1],
        spotRadius:         3,
      };

      return {
        data: data,
        options: $.extend({
          width:              '100%',
          height:             '70px',
        }, options)
      }
    }

    this.sparklineData = [
      generateSparklineData(0, 'line'),
      generateSparklineData(1, 'bar'),
      generateSparklineData(2, 'line'),
      generateSparklineData(3, 'bar'),
    ];

    // C3
    //

    this.c3Data = [
      pxDemo.getRandomData(300, 50),
      pxDemo.getRandomData(300, 50),
      pxDemo.getRandomData(300, 50),
    ];

    this.c3Options = {
      colorPattern: [ colors[4], colors[5], colors[6] ]
    };
  }

  function AnalyticsDashboardTrendingCtrl() {
    var color = pxDemo.getRandomColors(1)[0];

    function generateChartData() {
      var data = [
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
        pxDemo.getRandomData(300, 100),
      ];

      return {
        data: data,
        options: {
          type:       'bar',
          barWidth:   2,
          height:     20,
          barColor:   color,
          barSpacing: 2,
        }
      };
    }

    this.chartData = [
      generateChartData(),
      generateChartData(),
      generateChartData(),
      generateChartData(),
      generateChartData(),
      generateChartData(),
      generateChartData(),
    ];
  }

  angular.module('pixeladmin')
    .controller('AnalyticsDashboardChartsCtrl', AnalyticsDashboardChartsCtrl)
    .controller('AnalyticsDashboardTrendingCtrl', AnalyticsDashboardTrendingCtrl);

})();
