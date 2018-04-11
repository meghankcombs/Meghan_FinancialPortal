(function() {
  // ===============================================================================
  // Controllers / Charts / Flot
  //

  function ChartsFlotCtrl() {
    // Graph
    //

    this.graphData = [
      {
        label: 'Visits',
        data: [
          [6, pxDemo.getRandomData(250, 150)], [7, pxDemo.getRandomData(250, 150)], [8, pxDemo.getRandomData(250, 150)], [9, pxDemo.getRandomData(250, 150)], [10, pxDemo.getRandomData(250, 150)], [11, pxDemo.getRandomData(250, 150)], [12, pxDemo.getRandomData(250, 150)], [13, pxDemo.getRandomData(250, 150)], [14, pxDemo.getRandomData(250, 150)], [15, pxDemo.getRandomData(250, 150)]
        ],
      },
      {
        label: 'Returning visits',
        data: [
          [6, pxDemo.getRandomData(100, 0)], [7, pxDemo.getRandomData(100, 0)], [8, pxDemo.getRandomData(100, 0)], [9, pxDemo.getRandomData(100, 0)], [10, pxDemo.getRandomData(100, 0)], [11, pxDemo.getRandomData(100, 0)], [12, pxDemo.getRandomData(100, 0)], [13, pxDemo.getRandomData(100, 0)], [14, pxDemo.getRandomData(100, 0)], [15, pxDemo.getRandomData(100, 0)]
        ],
      }
    ];

    this.graphOptions = {
      series: {
        shadowSize: 0,
        lines: {
          show: true,
        },
        points: {
          show:   true,
          radius: 4,
        },
      },

      grid: {
        color:       '#999',
        borderColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 1,
        hoverable:   true,
        clickable:   true,
      },

      xaxis: { tickColor: 'rgba(255, 255, 255, 0)', },
      tooltip: { show: true },
      colors: pxDemo.getRandomColors(),
    };

    // Bars
    //

    this.barsData = [
      {
        label: 'Visits',
        data: [
          [6, pxDemo.getRandomData(250, 150)], [7, pxDemo.getRandomData(250, 150)], [8, pxDemo.getRandomData(250, 150)], [9, pxDemo.getRandomData(250, 150)], [10, pxDemo.getRandomData(250, 150)], [11, pxDemo.getRandomData(250, 150)], [12, pxDemo.getRandomData(250, 150)], [13, pxDemo.getRandomData(250, 150)], [14, pxDemo.getRandomData(250, 150)], [15, pxDemo.getRandomData(250, 150)]
        ],
      },
      {
        label: 'Returning visits',
        data: [
          [6, pxDemo.getRandomData(100, 0)], [7, pxDemo.getRandomData(100, 0)], [8, pxDemo.getRandomData(100, 0)], [9, pxDemo.getRandomData(100, 0)], [10, pxDemo.getRandomData(100, 0)], [11, pxDemo.getRandomData(100, 0)], [12, pxDemo.getRandomData(100, 0)], [13, pxDemo.getRandomData(100, 0)], [14, pxDemo.getRandomData(100, 0)], [15, pxDemo.getRandomData(100, 0)]
        ],
      }
    ];

    this.barsOptions = {
      series: {
        shadowSize: 0,
        bars: {
          show: true,
          barWidth: .6,
          align: 'center',
          lineWidth: 1,
          fill: 0.25,
        },
      },

      grid: {
        color:       '#999',
        borderColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 1,
        hoverable:   true,
        clickable:   true,
      },

      xaxis: {
        tickDecimals: 2,
        tickColor:    'rgba(255, 255, 255, 0)',
      },

      tooltip: { show: true },
      colors: pxDemo.getRandomColors(),
    };

    // Categories
    //

    this.categoriesData = [
      {
        label: 'iPhone',
        data: [
          [ '2010.Q1', pxDemo.getRandomData() ],
          [ '2010.Q2', pxDemo.getRandomData() ],
          [ '2010.Q3', pxDemo.getRandomData() ],
          [ '2010.Q4', pxDemo.getRandomData() ],
        ],
      },
      {
        label: 'iPad',
        data: [
          [ '2010.Q1', pxDemo.getRandomData() ],
          [ '2010.Q2', pxDemo.getRandomData() ],
          [ '2010.Q3', pxDemo.getRandomData() ],
          [ '2010.Q4', pxDemo.getRandomData() ],
        ],
      },
      {
        label: 'iTouch',
        data: [
          [ '2010.Q1', pxDemo.getRandomData() ],
          [ '2010.Q2', pxDemo.getRandomData() ],
          [ '2010.Q3', pxDemo.getRandomData() ],
          [ '2010.Q4', pxDemo.getRandomData() ],
        ],
      },
    ];

    this.categoriesOptions = {
      series: {
        shadowSize: 0,
        lines: {
          show: true,
          fill: 0.1,
          lineWidth: 1
        },
      },

      grid: {
        color:       '#999',
        borderColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 1,
        hoverable:   true,
        clickable:   true,
      },

      xaxis: {
        mode:      'categories',
        tickColor: 'rgba(255, 255, 255, 0)',
      },

      tooltip: {
        show: true,
        content: '%s: %y'
      },

      colors: pxDemo.getRandomColors(),
    };

    // Pie
    //

    this.pieData = [
      { label: 'Series1', data: pxDemo.getRandomData() },
      { label: 'Series2', data: pxDemo.getRandomData() },
      { label: 'Series3', data: pxDemo.getRandomData() },
      { label: 'Series4', data: pxDemo.getRandomData() },
      { label: 'Series5', data: pxDemo.getRandomData() },
      { label: 'Series6', data: pxDemo.getRandomData() },
      { label: 'Series9', data: pxDemo.getRandomData() },
    ];

    this.pieOptions = {
      series: {
        shadowSize: 0,
        pie: {
          show:        true,
          radius:      1,
          innerRadius: 0.5,

          label: {
            show:       true,
            radius:     3 / 4,
            background: { opacity: 0 },

            formatter: function(label, series) {
              return '<div style="font-size:11px;text-align:center;color:white;">' + Math.round(series.percent) + '%</div>';
            },
          },
        },
      },

      grid: {
        color:       '#999',
        borderColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 1,
        hoverable:   true,
        clickable:   true,
      },

      xaxis: { tickColor: 'rgba(255, 255, 255, 0)' },
      colors: pxDemo.getRandomColors(),
    };
  }

  angular.module('pixeladmin')
    .controller('ChartsFlotCtrl', ChartsFlotCtrl);

})();
