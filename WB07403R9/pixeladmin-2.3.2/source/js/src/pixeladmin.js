import jQuery from 'jquery';
import pxUtil from 'px/util';
import 'px/polyfills';

const PixelAdmin = (function($) {
  'use strict';

  const PixelAdminObject = {
    isRtl:                   document.documentElement.getAttribute('dir') === 'rtl',
    isMobile:                (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i).test(navigator.userAgent.toLowerCase()),
    isLocalStorageSupported: typeof window.Storage !== 'undefined',

    // Application-wide options
    options: {
      resizeDelay:      100,
      storageKeyPrefix: 'px_s_',
      cookieKeyPrefix:  'px_c_',
    },

    getScreenSize() {
      const isBreakpointVisible = PixelAdminObject._isBreakpointVisible;

      if (isBreakpointVisible('xs')) {
        return 'xs';
      } else if (isBreakpointVisible('sm')) {
        return 'sm';
      } else if (isBreakpointVisible('md')) {
        return 'md';
      } else if (isBreakpointVisible('lg')) {
        return 'lg';
      }

      return 'xl';
    },


    // Storage
    //

    storage: {
      _prefix(key) {
        return `${PixelAdminObject.options.storageKeyPrefix}${key}`;
      },

      set(key, value) {
        const obj  = (typeof key === 'string') ? { [key]: value } : key;
        const keys = Object.keys(obj);

        try {
          for (let i = 0, len = keys.length; i < len; i++) {
            window.localStorage
              .setItem(this._prefix(keys[i]), obj[keys[i]]);
          }
        } catch(e) {
          PixelAdminObject.cookies.set(key, value);
        }
      },

      get(key) {
        const keys   = $.isArray(key) ? key : [key];
        const result = {};

        try {
          for (let i = 0, len = keys.length; i < len; i++) {
            result[keys[i]] = window.localStorage
              .getItem(this._prefix(keys[i]));
          }

          return $.isArray(key) ? result : result[key];
        } catch(e) {
          return PixelAdminObject.cookies.get(key);
        }
      },
    },


    // Cookies
    //

    cookies: {
      _prefix(key) {
        return `${PixelAdminObject.options.cookieKeyPrefix}${key}`;
      },

      set(key, value) {
        const obj  = (typeof key === 'string') ? { [key]: value } : key;
        const keys = Object.keys(obj);

        let encodedKey;
        let encodedVal;

        for (let i = 0, len = keys.length; i < len; i++) {
          encodedKey = encodeURIComponent(this._prefix(keys[i]));
          encodedVal = encodeURIComponent(obj[keys[i]]);

          document.cookie = `${(encodedKey)}=${encodedVal}`;
        }
      },

      get(key) {
        const cookie = `;${document.cookie};`;
        const keys   = $.isArray(key) ? key : [key];
        const result = {};

        let escapedKey;
        let re;
        let found;

        for (let i = 0, len = keys.length; i < len; i++) {
          escapedKey = pxUtil.escapeRegExp(
            encodeURIComponent(this._prefix(keys[i]))
          );
          re = new RegExp(`;\\s*${escapedKey}\\s*=\\s*([^;]+)\\s*;`);
          found = cookie.match(re);

          result[keys[i]] = found ?
            decodeURIComponent(found[1]) :
            null;
        }

        return $.isArray(key) ? result : result[key];
      },
    },

    _isBreakpointVisible(name) {
      const el = document.getElementById(`px-breakpoint-${name}`) ||
        $(`<div id="px-breakpoint-${name}"></div>`).prependTo(document.body)[0];

      return el.offsetTop;
    },

    _setDelayedResizeListener() {
      function delayedResizeHandler(callback) {
        let resizeTimer = null;

        return function() {
          if (resizeTimer) {
            clearTimeout(resizeTimer);
          }

          resizeTimer = setTimeout(function() {
            resizeTimer = null;
            callback();
          }, PixelAdminObject.options.resizeDelay);
        };
      }

      const $window  = $(window);
      let prevScreen = null;

      $window.on('resize', delayedResizeHandler(function() {
        const curScreen = PixelAdminObject.getScreenSize();

        $window.trigger('px.resize');

        if (prevScreen !== curScreen) {
          $window.trigger(`px.screen.${curScreen}`);
        }

        prevScreen = curScreen;
      }));
    },
  };

  PixelAdminObject._setDelayedResizeListener();

  // Wait for the document load
  $(function() {
    if (PixelAdminObject.isMobile && window.FastClick) {
      window.FastClick.attach(document.body);
    }

    // Repaint to fix strange BODY offset bug in RTL mode
    if (PixelAdminObject.isRtl) {
      $(window).on('px.resize.px-rtl-fix', () => {
        document.body.style.overflow = 'hidden';

        const trick = document.body.offsetHeight;

        document.body.style.overflow = '';
      });
    }

    // Trigger 'px.load' and 'resize' events on window
    $(window).trigger('px.load');
    pxUtil.triggerResizeEvent();
  });

  return PixelAdminObject;
})(jQuery);

window.PixelAdmin = PixelAdmin;

export default PixelAdmin;
