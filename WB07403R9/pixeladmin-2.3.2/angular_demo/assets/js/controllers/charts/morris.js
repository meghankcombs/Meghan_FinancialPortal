(function() {
  // ===============================================================================
  // Controllers / Charts / Morris
  //

  function ChartsMorrisCtrl() {
    // Graph
    //

    this.lineData = [
      {period: '2011 Q3', licensed: pxDemo.getRandomData(), sorned: pxDemo.getRandomData()},
      {period: '2011 Q2', licensed: pxDemo.getRandomData(), sorned: pxDemo.getRandomData()},
      {period: '2011 Q1', licensed: pxDemo.getRandomData(), sorned: pxDemo.getRandomData()},
      {period: '2010 Q4', licensed: pxDemo.getRandomData(), sorned: pxDemo.getRandomData()},
      {period: '2009 Q4', licensed: pxDemo.getRandomData(), sorned: pxDemo.getRandomData()},
      {period: '2008 Q4', licensed: pxDemo.getRandomData(), sorned: pxDemo.getRandomData()},
      {period: '2007 Q4', licensed: pxDemo.getRandomData(), sorned: pxDemo.getRandomData()},
      {period: '2006 Q4', licensed: pxDemo.getRandomData(), sorned: pxDemo.getRandomData()},
      {period: '2005 Q4', licensed: pxDemo.getRandomData(), sorned: pxDemo.getRandomData()}
    ];

    this.lineOptions = {
      xkey:          'period',
      ykeys:         ['licensed', 'sorned'],
      labels:        ['Licensed', 'Off the road'],
      lineColors:    pxDemo.getRandomColors(),
      lineWidth:     1,
      pointSize:     4,
      gridLineColor: '#cfcfcf',
      resize:        true
    };

    // Bars
    //

    this.barsData = [
      { device: 'iPhone',     geekbench: pxDemo.getRandomData() },
      { device: 'iPhone 3G',  geekbench: pxDemo.getRandomData() },
      { device: 'iPhone 3GS', geekbench: pxDemo.getRandomData() },
      { device: 'iPhone 4',   geekbench: pxDemo.getRandomData() },
      { device: 'iPhone 4S',  geekbench: pxDemo.getRandomData() },
      { device: 'iPhone 5',   geekbench: pxDemo.getRandomData() },
    ];

    this.barsOptions = {
      xkey:          'device',
      ykeys:         ['geekbench'],
      labels:        ['Geekbench'],
      barRatio:      0.4,
      xLabelAngle:   35,
      hideHover:     'auto',
      barColors:     pxDemo.getRandomColors(),
      gridLineColor: '#cfcfcf',
      resize:        true
    };

    // Area
    //

    this.areaData = [
      { period: '2010 Q1', iphone: pxDemo.getRandomData(), ipad: pxDemo.getRandomData(), itouch: pxDemo.getRandomData() },
      { period: '2010 Q2', iphone: pxDemo.getRandomData(), ipad: pxDemo.getRandomData(), itouch: pxDemo.getRandomData() },
      { period: '2010 Q3', iphone: pxDemo.getRandomData(), ipad: pxDemo.getRandomData(), itouch: pxDemo.getRandomData() },
      { period: '2010 Q4', iphone: pxDemo.getRandomData(), ipad: pxDemo.getRandomData(), itouch: pxDemo.getRandomData() },
      { period: '2011 Q1', iphone: pxDemo.getRandomData(), ipad: pxDemo.getRandomData(), itouch: pxDemo.getRandomData() },
      { period: '2011 Q2', iphone: pxDemo.getRandomData(), ipad: pxDemo.getRandomData(), itouch: pxDemo.getRandomData() },
      { period: '2011 Q3', iphone: pxDemo.getRandomData(), ipad: pxDemo.getRandomData(), itouch: pxDemo.getRandomData() },
      { period: '2011 Q4', iphone: pxDemo.getRandomData(), ipad: pxDemo.getRandomData(), itouch: pxDemo.getRandomData() },
      { period: '2012 Q1', iphone: pxDemo.getRandomData(), ipad: pxDemo.getRandomData(), itouch: pxDemo.getRandomData() },
      { period: '2012 Q2', iphone: pxDemo.getRandomData(), ipad: pxDemo.getRandomData(), itouch: pxDemo.getRandomData() },
    ];

    this.areaOptions = {
      xkey:           'period',
      ykeys:          ['iphone', 'ipad', 'itouch'],
      labels:         ['iPhone', 'iPad', 'iPod Touch'],
      hideHover:      'auto',
      lineColors:     pxDemo.getRandomColors(),
      fillOpacity:    0.1,
      behaveLikeLine: true,
      lineWidth:      1,
      pointSize:      4,
      gridLineColor:  '#cfcfcf',
      resize:         true
    };

    // Donut
    //

    this.donutData = [
      { label: 'Jam',     value: 25 },
      { label: 'Frosted', value: 40 },
      { label: 'Custard', value: 25 },
      { label: 'Sugar',   value: 10 },
    ];

    this.donutOptions = {
      colors:     pxDemo.getRandomColors(),
      resize:     true,
      labelColor: '#888',
      formatter:  function (y) { return y + "%" }
    };
  }

  angular.module('pixeladmin')
    .controller('ChartsMorrisCtrl', ChartsMorrisCtrl);

})();
