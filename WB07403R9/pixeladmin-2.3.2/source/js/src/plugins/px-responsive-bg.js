import jQuery from 'jquery';
import pxUtil from 'px/util';

// Plugins / PxResponsiveBg
// --------------------------------------------------

const PxResponsiveBg = (function($) {
  'use strict';

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME               = 'pxResponsiveBg';
  const DATA_KEY           = 'px.responsiveBg';
  const EVENT_KEY          = `.${DATA_KEY}`;
  const JQUERY_NO_CONFLICT = $.fn[NAME];


  const Default = {
    backgroundImage:    null,
    backgroundPosition: 'center middle',
    overlay:            false,
    overlayOpacity:     0.2,
  };

  const ClassName = {
    CONTAINER: 'px-responsive-bg-container',
    IMAGE:     'px-responsive-bg',
    OVERLAY:   'px-responsive-bg-overlay',
  };

  const Event = {
    RESIZE: `resize${EVENT_KEY}`,
  };


  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class ResponsiveBg {
    constructor(element, config) {
      this.uniqueId = pxUtil.generateUniqueId();

      this.element = element;
      this.config  = this._getConfig(config);

      // Return if "dummy" object
      if (this.config.backgroundImage === null) { return; }

      this._loadImage(this.config.backgroundImage, (img) => {
        this._sizeRatio = img.height / img.width;

        this._setupMarkup(img);
        this._setListeners();

        this.update();
      });
    }


    // getters

    static get Default() {
      return Default;
    }

    static get NAME() {
      return NAME;
    }

    static get DATA_KEY() {
      return DATA_KEY;
    }

    static get Event() {
      return Event;
    }

    static get EVENT_KEY() {
      return EVENT_KEY;
    }


    // public

    update() {
      const parentEl     = this.image.parentNode;
      const parentHeight = $(parentEl).height();
      const parentWidth  = $(parentEl).width();

      let height;
      let width;
      let top;
      let left;

      if (parentWidth * this._sizeRatio > parentHeight) {
        width  = '100%';
        height = Math.ceil(parentWidth * this._sizeRatio);
        left   = 0;

        if (this.config.backgroundPosition[1] === 'top') {
          top = 0;
        } else if (this.config.backgroundPosition[1] === 'bottom') {
          top = -1 * (height - parentHeight);
        } else {
          top = Math.floor(-1 * (height - parentHeight) / 2);
        }
      } else {
        width  = Math.ceil(parentHeight / this._sizeRatio);
        height = parentHeight;
        top    = 0;

        if (this.config.backgroundPosition[0] === 'left') {
          left = 0;
        } else if (this.config.backgroundPosition[0] === 'right') {
          left = -1 * (width - parentWidth);
        } else {
          left   = Math.floor(-1 * (width - parentWidth) / 2);
        }
      }

      this.image.style.width  = width === '100%' ? width : `${width}px`;
      this.image.style.height = `${height}px`;
      this.image.style.top    = `${top}px`;
      this.image.style.left   = `${left}px`;
    }

    destroy(clearMarkup) {
      this._unsetListeners();

      if (clearMarkup) {
        $(this.element)
          .removeClass(ClassName.CONTAINER)
          .find(`> .${ClassName.IMAGE}`).remove();
      }

      $(this.element).removeData(DATA_KEY);
    }


    // private

    _loadImage(path, cb) {
      const img  = new Image();

      img.onload = () => cb(img);
      img.src    = path;
    }

    _setupMarkup(img) {
      pxUtil.addClass(this.element, ClassName.CONTAINER);

      let $imageContainer = $(this.element).find(`> .${ClassName.IMAGE}`);

      if (!$imageContainer.length) {
        $imageContainer = $(`<div class="${ClassName.IMAGE}"></div>`).appendTo(this.element);
        $imageContainer.append('<img alt="">');
      }

      this.image = $imageContainer.find('> img')[0];

      if (!this.image) {
        throw new Error('Background <img> element not found!');
      }

      $(this.image).attr('src', img.src);

      if (this.config.overlay !== false) {
        $imageContainer.find(`.${ClassName.OVERLAY}`).remove();

        $imageContainer.prepend(
          (typeof this.config.overlay === 'string' && this.config.overlay[0] === '<') ?
            $(this.config.overlay)
              .addClass(ClassName.OVERLAY)
              .css('opacity', this.config.overlayOpacity) :
            $(`<div class="${ClassName.OVERLAY}"></div>`)
              .css({
                background: typeof this.config.overlay === 'boolean' ? '#000' : this.config.overlay,
                opacity:    this.config.overlayOpacity,
              })
        );
      } else {
        $imageContainer.find(`> .${ClassName.OVERLAY}`).remove();
      }
    }

    _setListeners() {
      $(window).on(`${this.constructor.Event.RESIZE}.${this.uniqueId}`, $.proxy(this.update, this));
    }

    _unsetListeners() {
      $(window).off(`${this.constructor.Event.RESIZE}.${this.uniqueId}`);
    }

    _getConfig(config) {
      const result = $.extend({},
        this.constructor.Default,
        $(this.element).data(),
        config
      );

      if (!result.backgroundImage && result.backgroundImage !== null) {
        throw new Error('Background image is not specified.');
      }

      const parts = String(result.backgroundPosition).split(' ').slice(0, 2);

      if (parts[0] !== 'center' && parts[0] !== 'left' && parts[0] !== 'right') {
        parts[0] = 'center';
      }

      if (parts[1] !== 'middle' && parts[1] !== 'top' && parts[1] !== 'bottom') {
        parts[1] = 'middle';
      }

      result.backgroundPosition = parts;

      return result;
    }


    // static

    static _jQueryInterface(config, ...args) {
      return this.each(function() {
        let data    = $(this).data(DATA_KEY);
        let _config = typeof config === 'object' ? config : null;

        if (!data && config !== 'destroy') {
          data = new ResponsiveBg(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (data && typeof config === 'string') {
          if (!data[config]) {
            throw new Error(`No method named "${config}"`);
          }
          data[config](...args);
        }
      });
    }

  }


  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME]             = ResponsiveBg._jQueryInterface;
  $.fn[NAME].Constructor = ResponsiveBg;
  $.fn[NAME].noConflict  = function() {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ResponsiveBg._jQueryInterface;
  };

  return ResponsiveBg;
})(jQuery);

export default PxResponsiveBg;
