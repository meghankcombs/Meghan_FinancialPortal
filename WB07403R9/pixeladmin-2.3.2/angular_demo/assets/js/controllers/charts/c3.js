(function() {
  // ===============================================================================
  // Controllers / Charts / C3
  //

  function ChartsC3Ctrl() {
    // Line
    //

    this.lineData = [
      { x: 0, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
      { x: 1, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
      { x: 2, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
      { x: 3, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
      { x: 4, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
      { x: 5, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
    ];

    this.lineColumns = [
      { id: 'y1', type: 'line', name: 'data1' },
      { id: 'y2', type: 'line', name: 'data2' },
    ];

    this.lineDataX = { id: 'x' };

    this.lineColors = pxDemo.getRandomColors();

    // Spline
    //

    this.splineData = [
      { x: 0, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
      { x: 1, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
      { x: 2, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
      { x: 3, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
      { x: 4, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
      { x: 5, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
    ];

    this.splineColumns = [
      { id: 'y1', type: 'spline', name: 'data1' },
      { id: 'y2', type: 'spline', name: 'data2' },
    ];

    this.splineDataX = { id: 'x' };

    this.splineColors = pxDemo.getRandomColors();

    // Step
    //

    this.stepData = [
      { x: 0, y1: pxDemo.getRandomData(500, 50), y2: pxDemo.getRandomData(500, 50)},
      { x: 1, y1: pxDemo.getRandomData(500, 50), y2: pxDemo.getRandomData(500, 50)},
      { x: 2, y1: pxDemo.getRandomData(500, 50), y2: pxDemo.getRandomData(500, 50)},
      { x: 3, y1: 0, y2: pxDemo.getRandomData(500, 50)},
      { x: 4, y1: 0, y2: pxDemo.getRandomData(500, 50)},
      { x: 5, y1: pxDemo.getRandomData(500, 50), y2: pxDemo.getRandomData(500, 50)},
    ];

    this.stepColumns = [
      { id: 'y1', type: 'step', name: 'data1' },
      { id: 'y2', type: 'area-step', name: 'data2' },
    ];

    this.stepDataX = { id: 'x' };

    this.stepColors = pxDemo.getRandomColors();

    // Area
    //

    this.areaData = [
      { x: 0, y1: pxDemo.getRandomData(500, 50), y2: pxDemo.getRandomData(500, 50)},
      { x: 1, y1: pxDemo.getRandomData(500, 50), y2: pxDemo.getRandomData(500, 50)},
      { x: 2, y1: pxDemo.getRandomData(500, 50), y2: pxDemo.getRandomData(500, 50)},
      { x: 3, y1: 0, y2: pxDemo.getRandomData(500, 50)},
      { x: 4, y1: 0, y2: pxDemo.getRandomData(500, 50)},
      { x: 5, y1: 0, y2: pxDemo.getRandomData(500, 50)},
    ];

    this.areaColumns = [
      { id: 'y1', type: 'area', name: 'data1' },
      { id: 'y2', type: 'area-spline', name: 'data2' },
    ];

    this.areaDataX = { id: 'x' };

    this.areaColors = pxDemo.getRandomColors();

    // Bar
    //

    this.barData = [

      { x: 1, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
      { x: 2, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
      { x: 3, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
      { x: 4, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
      { x: 5, y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()},
    ];

    this.barColumns = [
      { id: 'y1', type: 'bar', name: 'data1' },
      { id: 'y2', type: 'bar', name: 'data2' },
    ];

    this.barDataX = { id: 'x' };

    this.barColors = pxDemo.getRandomColors();

    // Scatter
    //

    this.scatterData = [];

    for (var i =0; i < 50; i++) {
      this.scatterData.push({ x: pxDemo.getRandomData(), y1: pxDemo.getRandomData(), y2: pxDemo.getRandomData()});
    }

    this.scatterColumns = [
      { id: 'y1', type: 'scatter', name: 'setosa' },
      { id: 'y2', type: 'scatter', name: 'versicolor' },
    ];

    this.scatterDataX = { id: 'x' };

    this.scatterColors = pxDemo.getRandomColors();

    // Pie
    //

    this.pieData = [
      {
        v1: pxDemo.getRandomData(),
        v2: pxDemo.getRandomData(),
        v3: pxDemo.getRandomData(),
        v4: pxDemo.getRandomData(),
        v5: pxDemo.getRandomData(),
      },
    ];

    this.pieColumns = [
      { id: 'v1', type: 'donut', name: 'data1' },
      { id: 'v2', type: 'donut', name: 'data2' },
      { id: 'v3', type: 'donut', name: 'data3' },
      { id: 'v4', type: 'donut', name: 'data4' },
      { id: 'v5', type: 'donut', name: 'data5' },
    ];

    this.pieColors = pxDemo.getRandomColors();

    // Gauge
    //

    this.gaugeData = [
      { val: pxDemo.getRandomData() },
    ];

    this.gaugeColumns = [
      { id: 'val', type: 'gauge', name: 'data' },
    ];

    this.gaugeColors = pxDemo.getRandomColors();
  }

  angular.module('pixeladmin')
    .controller('ChartsC3Ctrl', ChartsC3Ctrl);

})();
