(function() {
  // ===============================================================================
  // Controllers / Charts / Chart.js
  //

  function ChartsChartjsCtrl() {
    var chartColors = pxDemo.getRandomColors();

    // Graph
    //

    this.graphLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    this.graphData   = [
      [pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData()],
      [pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData()],
    ];

    this.graphDatasetOverride = [{
      label:                     'My First dataset',
      borderWidth:               1,
      backgroundColor:           pxUtil.hexToRgba(chartColors[0], 0.3),
      borderColor:               chartColors[0],
      pointBackgroundColor:      pxUtil.hexToRgba(chartColors[0], 0.3),
      pointBorderColor:          chartColors[0],
      pointHoverBackgroundColor: pxUtil.hexToRgba(chartColors[0], 0.3),
      pointHoverBorderColor:     chartColors[0],
      borderDash:                [5, 5],
      fill:                      false,
    }, {
      label:                     'My Second dataset',
      borderWidth:               1,
      backgroundColor:           pxUtil.hexToRgba(chartColors[1], 0.3),
      borderColor:               chartColors[1],
      pointBackgroundColor:      pxUtil.hexToRgba(chartColors[1], 0.3),
      pointBorderColor:          chartColors[1],
      pointHoverBackgroundColor: pxUtil.hexToRgba(chartColors[1], 0.3),
      pointHoverBorderColor:     chartColors[1],
    }];

    this.graphOptions = {
      legend: { display: true },
    };

    // Bars
    //

    this.barsLabels = ['Italy', 'UK', 'USA', 'Germany', 'France', 'Japan'];
    this.barsData   = [
      [pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData()],
      [pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData()],
    ];

    this.barsDatasetOverride = [{
      label:                     '2010 customers #',
      borderWidth:               1,
      backgroundColor:           pxUtil.hexToRgba(chartColors[2], 0.3),
      borderColor:               chartColors[2],
      pointBackgroundColor:      pxUtil.hexToRgba(chartColors[2], 0.3),
      pointBorderColor:          chartColors[2],
      pointHoverBackgroundColor: pxUtil.hexToRgba(chartColors[2], 0.3),
      pointHoverBorderColor:     chartColors[2],
    }, {
      label:                     '2014 customers #',
      borderWidth:               1,
      backgroundColor:           pxUtil.hexToRgba(chartColors[3], 0.3),
      borderColor:               chartColors[3],
      pointBackgroundColor:      pxUtil.hexToRgba(chartColors[3], 0.3),
      pointBorderColor:          chartColors[3],
      pointHoverBackgroundColor: pxUtil.hexToRgba(chartColors[3], 0.3),
      pointHoverBorderColor:     chartColors[3],
    }];

    this.barsOptions = {
      legend: { display: true },
    };

    // Radar
    //

    this.radarLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
    this.radarData   = [
      [pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData()],
      [pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData(), pxDemo.getRandomData()],
    ];

    this.radarDatasetOverride = [{
      label:                     'My First dataset',
      borderWidth:               1,
      backgroundColor:           pxUtil.hexToRgba(chartColors[4], 0.2),
      borderColor:               chartColors[4],
      pointBackgroundColor:      chartColors[4],
      pointBorderColor:          '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor:     chartColors[4],
    }, {
      label:                     'My Second dataset',
      borderWidth:               1,
      backgroundColor:           pxUtil.hexToRgba(chartColors[5], 0.2),
      borderColor:               chartColors[5],
      pointBackgroundColor:      chartColors[5],
      pointBorderColor:          '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor:     chartColors[5],
    }];

    this.radarOptions = {
      legend: { display: true },
    };

    // Area
    //

    this.areaLabels = [ 'Red', 'Green', 'Yellow', 'Grey', 'Blue' ];
    this.areaData   = [
      [ pxDemo.getRandomData(20, 5), pxDemo.getRandomData(20, 5), pxDemo.getRandomData(20, 5), pxDemo.getRandomData(20, 5), pxDemo.getRandomData(20, 5) ],
    ];

    this.areaDatasetOverride = [{
      label:           'My dataset',
      backgroundColor: [ '#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB' ],
      borderColor:     '#fff',
    }];

    this.areaOptions = {
      legend: { display: true },
    };

    // Pie
    //

    this.pieLabels = [ 'Red', 'Blue', 'Yellow' ];
    this.pieData   = [
      [ pxDemo.getRandomData(300, 50), pxDemo.getRandomData(300, 50), pxDemo.getRandomData(300, 50) ],
    ];

    this.pieDatasetOverride = [{
      backgroundColor:      [ '#FF6384', '#36A2EB', '#FFCE56' ],
      hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
      borderColor:     '#fff',
    }];

    this.pieOptions = {
      legend: { display: true },
    };

    // Doughnut
    //

    this.doughnutLabels = [ 'Red', 'Blue', 'Yellow' ];
    this.doughnutData   = [
      [ pxDemo.getRandomData(300, 50), pxDemo.getRandomData(300, 50), pxDemo.getRandomData(300, 50) ],
    ];

    this.doughnutDatasetOverride = [{
      backgroundColor:      [ '#FF6384', '#36A2EB', '#FFCE56' ],
      hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
      borderColor:     '#fff',
    }];

    this.doughnutOptions = {
      legend: { display: true },
    };
  }

  angular.module('pixeladmin')
    .controller('ChartsChartjsCtrl', ChartsChartjsCtrl);

})();
