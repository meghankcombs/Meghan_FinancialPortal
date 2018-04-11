(function() {
  // ===============================================================================
  // Controllers / Boxes
  //

  function BoxesCtrl() {
    var colors = pxDemo.getRandomColors();

    this.equalizeHeights = function() {
      $('.box-examples').each(function() {
        var maxHeight = 0;

        $(this)
          .find('.box')
          .each(function() {
            var height = $(this).height();

            if (height > maxHeight) {
              maxHeight = height;
            }
          })
          .height(maxHeight);
      });
    };

    this.sparklines = [
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
          height: '50px',
          width: '100%',
          barSpacing: 2,
          zeroAxis: false,
          barColor: '#ffffff',
        },
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
        ],
        options: {
          type: 'line',
          width: '100%',
          height: '50px',
          fillColor: '',
          lineColor: '#fff',
          lineWidth: 2,
          spotColor: '#ffffff',
          minSpotColor: '#ffffff',
          maxSpotColor: '#ffffff',
          highlightSpotColor: '#ffffff',
          highlightLineColor: '#ffffff',
          spotRadius: 4,
        },
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
          type: 'line',
          width: '100%',
          height: '80px',
          lineColor: 'rgba(0,0,0,0)',
          fillColor: 'rgba(0,0,0,.18)',
          lineWidth: 0,
          spotColor: '',
          minSpotColor: '',
          maxSpotColor: '',
          highlightSpotColor: '',
          highlightLineColor: '#ffffff',
          spotRadius: 1.8,
          chartRangeMin: 150
        },
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
        ],
        options: {
          type: 'line',
          width: '100%',
          height: '50px',
          fillColor: '',
          lineColor: '#fff',
          lineWidth: 2,
          spotColor: '#ffffff',
          minSpotColor: '#ffffff',
          maxSpotColor: '#ffffff',
          highlightSpotColor: '#ffffff',
          highlightLineColor: '#ffffff',
          spotRadius: 4,
        },
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
        ],
        options: {
          type: 'line',
          width: '100%',
          height: '70px',
          fillColor: null,
          lineColor: colors[0],
          lineWidth: 1,
          spotColor: null,
          minSpotColor: null,
          maxSpotColor: null,
          highlightSpotColor: colors[1],
          highlightLineColor: colors[1],
          spotRadius: 3,
        },
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
          height: '50px',
          width: '100%',
          barSpacing: 2,
          zeroAxis: false,
          barColor: '#ffffff',
        },
      },
    ];

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
      },
    };
  }

  angular.module('pixeladmin')
    .controller('BoxesCtrl', BoxesCtrl);

})();
