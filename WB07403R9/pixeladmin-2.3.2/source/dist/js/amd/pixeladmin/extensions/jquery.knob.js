!function(e,n){if("function"==typeof define&&define.amd)define(["jquery","px-libs/jquery.knob"],n);else if("undefined"!=typeof exports)n(require("jquery"),require("px-libs/jquery.knob"));else{n(e.jquery,e.jquery),e.jqueryKnob={exports:{}}.exports}}(this,function(e){"use strict";!function(e){if(!e.fn.knob)throw new Error("jquery.knob.js required.");var n=e.fn.knob;e.fn.knob=function(r){var i=n.call(this,r);return"rtl"===e("html").attr("dir")?i.each(function(){var n=e(this).find("input");n.css({"margin-left":0,"margin-right":n.css("margin-left")})}):i}}(function(e){return e&&e.__esModule?e:{default:e}}(e).default)});