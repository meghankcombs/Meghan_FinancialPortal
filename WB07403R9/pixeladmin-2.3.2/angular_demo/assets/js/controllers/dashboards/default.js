(function() {
  // ===============================================================================
  // Controllers / Dashboards / Default
  //

  function DefaultDashboardChartsCtrl() {
    var colors = pxDemo.getRandomColors();

    // Morris chart
    //

    this.morrisData = [
      { day: '2014-03-10', v: pxDemo.getRandomData(20, 5) },
      { day: '2014-03-11', v: pxDemo.getRandomData(20, 5) },
      { day: '2014-03-12', v: pxDemo.getRandomData(20, 5) },
      { day: '2014-03-13', v: pxDemo.getRandomData(20, 5) },
      { day: '2014-03-14', v: pxDemo.getRandomData(20, 5) },
      { day: '2014-03-15', v: pxDemo.getRandomData(20, 5) },
      { day: '2014-03-16', v: pxDemo.getRandomData(20, 5) }
    ];

    this.morrisOptions = {
      xkey: 'day',
      ykeys: ['v'],
      labels: ['Value'],
      lineColors: ['#fff'],
      lineWidth: 2,
      pointSize: 4,
      gridLineColor: 'rgba(255,255,255,.5)',
      resize: true,
      gridTextColor: '#fff',
      xLabels: "day",
      xLabelFormat: function(d) {
        return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov', 'Dec'][d.getMonth()] + ' ' + d.getDate();
      }
    };

    // Easy pie chart
    //

    var getEpcConfig = function(maxValue, suffix) {
      return {
        animate: 2000,
        scaleColor: false,
        lineWidth: 4,
        lineCap: 'square',
        size: 90,
        trackColor: 'rgba(0, 0, 0, .09)',
        onStep: function(_from, _to, currentValue) {
          var value = maxValue * currentValue / 100;

          $(this.el)
            .find('> span')
            .text(Math.round(value) + suffix);
        },
      };
    }

    this.easyPieChartData = [
      {
        percent: (pxDemo.getRandomData(1000, 1) / 1000) * 100,
        options: $.extend({}, getEpcConfig(1000, 'TB'), { barColor: colors[0] }),
      },
      {
        percent: (pxDemo.getRandomData(100, 1) / 100) * 100,
        options: $.extend({}, getEpcConfig(100, '%'), { barColor: colors[1] }),
      },
      {
        percent: (pxDemo.getRandomData(64, 1) / 64) * 100,
        options: $.extend({}, getEpcConfig(64, 'GB'), { barColor: colors[2] }),
      }
    ];

    // Sparkline
    //

    this.sparklineData = [
      {
        data: [
          pxDemo.getRandomData(300, 100),
          pxDemo.getRandomData(300, 100),
          pxDemo.getRandomData(300, 100),
          pxDemo.getRandomData(300, 100),
          pxDemo.getRandomData(300, 100),
          pxDemo.getRandomData(300, 100),
          pxDemo.getRandomData(300, 100),
          pxDemo.getRandomData(300, 100),
          pxDemo.getRandomData(300, 100),
        ],
        options: {
          type: 'line',
          width: '100%',
          height: '42px',
          fillColor: '',
          lineColor: '#fff',
          lineWidth: 2,
          spotColor: '#ffffff',
          minSpotColor: '#ffffff',
          maxSpotColor: '#ffffff',
          highlightSpotColor: '#ffffff',
          highlightLineColor: '#ffffff',
          spotRadius: 4,
        }
      },
      {
        data: [
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
          pxDemo.getRandomData(300, 100),
          pxDemo.getRandomData(300, 100),
          pxDemo.getRandomData(300, 100),
          pxDemo.getRandomData(300, 100),
          pxDemo.getRandomData(300, 100),
          pxDemo.getRandomData(300, 100),
        ],
        options: {
          type: 'bar',
          height: '42px',
          width: '100%',
          barSpacing: 2,
          zeroAxis: false,
          barColor: '#ffffff',
        }
      }
    ];
  }

  angular.module('pixeladmin')
    .controller('DefaultDashboardChartsCtrl', DefaultDashboardChartsCtrl);

})();
