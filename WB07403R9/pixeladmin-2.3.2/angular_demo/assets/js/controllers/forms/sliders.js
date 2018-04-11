(function() {
  // ===============================================================================
  // Controllers / Forms / Sliders
  //

  function FormsSlidersBsSliderCtrl() {
    this._isRtl = $('html').attr('dir') === 'rtl';

    this.formatter = function(value) {
      return 'Current value: ' + value;
    };

    this.single = {
      val: 160,
      min: 0,
      max: 400
    };

    this.range = {
      val: [ 100, 685 ],
      min: 10,
      max: 1000
    };

    this.ticks = {
      values: [0, 100, 200, 300, 400],
      labels: ['$0', '$100', '$200', '$300', '$400'],
    }
  }

  function FormsSlidersNoUiSliderCtrl() {
    this.direction = $('html').attr('dir') === 'rtl' ? 'rtl' : 'ltr';

    this.singleValue = [ 80 ];
    this.singleRange = { min: 0, max: 100 };

    this.multipleValue = [ 4000, 8000 ];
    this.multipleRange = { min: 2000, max: 10000 };

    this.tooltipsValue = [ 20, 80, 120 ];
    this.tooltipsRange = { min: 0, max: 200 };
    this.tooltipsTltps = [ false, true, true ];

    this.dragtapValue = [ 80, 120 ];
    this.dragtapRange = { min: 0, max: 200 };

    this.full = {
      value:     [ 1450, 2050, 2350, 3000 ],
      range:     { min: 1000, max: 3750 },
      behaviour: 'tap-drag',
      connect:   true,
      step:      150,
      tooltips:  true,

      pips: {
        mode:    'steps',
        stepped: true,
        density: 4,
      },
    };

    this.colors = angular.extend({}, this.full, {
      value: [ 2050, 3000 ],
    });
  }

  angular.module('pixeladmin')
    .controller('FormsSlidersBsSliderCtrl', FormsSlidersBsSliderCtrl)
    .controller('FormsSlidersNoUiSliderCtrl', FormsSlidersNoUiSliderCtrl);

})();
