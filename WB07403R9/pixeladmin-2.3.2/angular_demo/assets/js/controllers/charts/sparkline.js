(function() {
  // ===============================================================================
  // Controllers / Charts / Sparkline
  //

  function ChartsSparklineCtrl() {
    var colors = pxDemo.getRandomColors();

    // Line
    //

    this.lineData = [];
    for (var i1 = 0; i1 < 30; i1++) { this.lineData.push(pxDemo.getRandomData()); }

    this.lineOptions = {
      height:             '100px',
      width:              '100%',
      lineColor:          colors[0],
      fillColor:          pxUtil.hexToRgba(colors[0], 0.2),
      spotRadius:         3,
      spotColor:          colors[1],
      minSpotColor:       colors[2],
      maxSpotColor:       colors[3],
      highlightSpotColor: colors[4],
      highlightLineColor: colors[5],
    };

    // Bars
    //

    this.barsData = [];
    for (var i2 = 0; i2 < 30; i2++) { this.barsData.push(pxDemo.getRandomData(100, -100)); }

    this.barsOptions = {
      height:      '100px',
      width:       '100%',
      type:        'bar',
      barColor:    colors[6],
      negBarColor: colors[7],
    };

    // Tristrate
    //

    this.tristrateData = [];
    for (var i3 = 0; i3 < 30; i3++) { this.tristrateData.push(pxDemo.getRandomData(100, -100)); }

    this.tristrateOptions = {
      height:       '100px',
      width:        '100%',
      type:         'tristate',
      posBarColor:  colors[8],
      negBarColor:  colors[9],
      zeroBarColor: colors[10],
    };

    // Discrete
    //

    this.discreteData = [];
    for (var i4 = 0; i4 < 30; i4++) { this.discreteData.push(pxDemo.getRandomData()); }

    this.discreteOptions = {
      height:    '100px',
      width:     '100%',
      type:      'discrete',
      lineColor: colors[11],
    };

    // Bullet
    //

    var colors2 = pxDemo.getRandomColors();

    this.bulletData = [10, 12, 12, 9, 7];

    this.bulletOptions = {
      height:           '100px',
      width:            '100%',
      type:             'bullet',
      targetColor:      colors2[0],
      performanceColor: colors2[1],
      rangeColors:      colors2.slice(2),
    };

    // Pie
    //

    this.pieData = [];
    for (var i5 = 0; i5 < 4; i5++) { this.pieData.push(pxDemo.getRandomData()); }

    this.pieOptions = {
      height:      '100px',
      width:       '100px',
      type:        'pie',
      sliceColors: pxDemo.getRandomColors(),
    };

    // Box
    //

    var colors3 = pxDemo.getRandomColors();

    this.boxData = [4, 27, 34, 52, 54, 59, 61, 68, 78, 82, 85, 87, 91, 93, 100];

    this.boxOptions = {
      height:           '100px',
      width:            '100%',
      type:             'box',
      boxLineColor:     colors3[0],
      boxFillColor:     colors3[1],
      whiskerColor:     colors3[2],
      outlierLineColor: colors3[3],
      outlierFillColor: colors3[4],
      medianColor:      colors3[5],
      targetColor:      colors3[6]
    };
  }

  angular.module('pixeladmin')
    .controller('ChartsSparklineCtrl', ChartsSparklineCtrl);

})();
