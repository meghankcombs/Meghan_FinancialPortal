window.initPixelAdminDocs = function(curPage) {

  //
  // Constants

  var ESCAPE_HTML_MAP = {
    '&': '&amp;',
    '"': '&quot;',
    '\'': '&#39;',
    '<': '&lt;',
    '>': '&gt;'
  };

  var SANITIZE_SOURCE_MAP = {
    'disabled=""': 'disabled',
    'checked=""': 'checked',
    'selected=""': 'selected',
    'multiple=""': 'multiple',
    'readonly=""': 'readonly',
  };

  //
  // Utility functions

  function replaceWithMap(str, map) {
    var search = Object.keys(map).join('|');

    return str.replace(new RegExp(search, 'ig'), function(ch) {
      return map[ch];
    });
  };


  function escapeHTML(html) {
    return replaceWithMap(html, ESCAPE_HTML_MAP);
  }

  function unescapeHTML(html) {
    var UNESCAPE_HTML_MAP = {};

    for (prop in ESCAPE_HTML_MAP) {
      if (hasOwnProperty.call(ESCAPE_HTML_MAP, prop)) {
        UNESCAPE_HTML_MAP[ESCAPE_HTML_MAP[prop]] = prop;
      }
    }

    return replaceWithMap(html, UNESCAPE_HTML_MAP);
  }

  function sanitizeSource(source, attrs) {
    var map = $.extend({}, SANITIZE_SOURCE_MAP);
    var attrsToReplace = (attrs || '').split(',');

    for (var i = 0, l = attrsToReplace.length; i < l; i++) {
      map[attrsToReplace + '=""'] = attrsToReplace;
    }

    return replaceWithMap(source.replace(/^\s+|\s+$/g, ''), map);
  }

  function highlightSource(lang_, source_, searches_) {
    if (!searches_) {
      return hljs.highlight(lang_, source_).value;
    }

    var result   = source_;
    var searches = searches_.replace(/''/g, '"').split('||');
    var accents  = [];

    for (var i = 0, searchesLen = searches.length; i < searchesLen; i++) {
      result = result.replace(new RegExp(searches[i], 'g'), function(m, r) {
        if (!r) { return m; }

        var curIndex = accents.length;

        accents[curIndex] = '<span class="doc-accent">' + escapeHTML(r) + '</span>';

        return m.replace(r, 'doc_accent_' + curIndex + 'z');
      });
    }

    result = hljs.highlight(lang_, result).value;

    if (accents.length) {
      for (var j = 0, accentsLen = accents.length; j < accentsLen; j++) {
        result = result.replace('doc_accent_' + j + 'z', accents[j]);
      }
    }

    return result;
  }

  //
  // Configure highlight.js

  hljs.configure({ tabReplace: '  ' });

  //
  // Highlight no code blocks

  $('div.example.nocode')
    .each(function() {
      var codeEl = $(this).find('> pre > code')[0];
      var lang   = $(codeEl).attr('data-lang') || 'html';

      var highlightedCode = highlightSource(
        lang,
        sanitizeSource(unescapeHTML(codeEl.innerHTML), $(this).attr('data-attrs')),
        $(this).attr('data-accent')
      );

      $(codeEl).addClass('hljs ' + (lang === 'html' ? '' : lang));

      codeEl.innerHTML = highlightedCode;
    });

  //
  // Append code and highlight examples

  $('div.example:not(.nocode)')
    .each(function() {
      var $pre   = $('<div class="clearfix"></div><pre><code class="html"></code></pre>');
      var $code  = $pre.find('code');
      var source = sanitizeSource(this.innerHTML, $(this).attr('data-attrs-replace'));
      var lang   = $code.attr('data-lang') || 'html';

      $(this).data('source', source);

      $code
        .html(highlightSource(lang, source, $(this).attr('data-accent')))
        .addClass('hljs ' + (lang === 'html' ? 'html xml' : lang));

      $pre.appendTo(this);

      $('<a href="#" class="code-block-toggle"><i class="fa fa-code"></i>&nbsp;&nbsp;</a>')
        .appendTo(this);

      $('<a href="javascript:void(0)" class="code-block-copy"><i class="fa fa-copy"></i>&nbsp;&nbsp;Copy</a>')
        .appendTo(this);
    });

  //
  // Create clipboard

  var curClipboard = new Clipboard(document.querySelectorAll('.code-block-copy'), {
    text: function(trigger) {
      return $(trigger).parents('.example').data('source');
    }
  });

  curClipboard
    .on('success', function(e) {
      $(e.trigger)
        .addClass('copied')
        .text('Copied!');

      setTimeout(function() {
        $(e.trigger)
          .html('<i class="fa fa-copy"></i>&nbsp;&nbsp;Copy')
          .removeClass('copied');
      }, 1000);
    });

  curClipboard
    .on('error', function(e) {
      var actionMsg = '';

      if(/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = 'No support :(';
      }
      else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = 'Press ⌘-C to copy';
      }
      else {
        actionMsg = 'Press Ctrl-C to copy';
      }

      $(e.trigger)
        .tooltip({
          trigger: 'click',
          title: actionMsg,
        })
        .on('shown.bs.tooltip', function() {
          setTimeout(function() {
            $(e.trigger).tooltip('dispose');
          }, 1000);
        })
        .tooltip('show');
    });

  //
  // Add click handlers for the code togglers

  $('body')
    .on('click', '.code-block-toggle', function(e) {
      e.preventDefault();
      $(this)
        .parents('.example')
        .toggleClass('show-code-block');
    });

  //
  // Add click headers for the nav dropdowns

  $('.doc-link[href="#"]')
    .click(function(e) {
      e.preventDefault();

      $(this).toggleClass('open');
      $('#sidebar').perfectScrollbar('update');

      return false;
    });

  //
  // Activate current page link

  $('#sidebar a.doc-link[href="' + curPage + '"]')
    .each(function() {
      var $parent = $(this)
        .addClass('active')
        .parent('.doc-dropdown');

      if ($parent) {
        $parent
          .prev()
          .addClass('open');
      }
    });


  //
  // Add sidebar scrollbar

  $('#sidebar').perfectScrollbar();
  $(window).on('resize', function() {
    $('#sidebar').perfectScrollbar('update');
  });

  $('#sidebar-button')
    .click(function() {
      $('body').addClass('sidebar-open');
    });

  $('#sidebar-dimmer')
    .click(function() {
      $('body').removeClass('sidebar-open');
    });

  //
  // Scroll menu to active menu item

  (function() {
    var $link = $('#sidebar a.doc-link[href="' + curPage + '"]');

    if (!$link.length) { return; }

    var linkTop        = $link.offset().top;
    var targetPosition = $(window).height() / 2 - 20;

    if (linkTop > targetPosition) {
      $('#sidebar')[0].scrollTop = linkTop - targetPosition;
    }
  })();

  // Handle changing between ligth/dark versions

  function docsSwitchTheme(themeName) {
    $('body')[themeName.indexOf('dark') !== -1 ? 'addClass' : 'removeClass']('docs-dark');
  }

  docsSwitchTheme(
    decodeURIComponent(((new RegExp(';\\s*' + encodeURIComponent('px-demo-theme') + '\\s*=\\s*([^;]+)\\s*;', 'g')).exec(';' + document.cookie + ';') || [])[1] || 'default')
  );

  $(function() {
    $('input[name="px-demo-current-theme"]').on('change', function() {
      docsSwitchTheme(this.value);
    });
  });
};
