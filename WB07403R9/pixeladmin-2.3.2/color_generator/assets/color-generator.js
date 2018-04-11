function ColorGenerator() {
  'use strict';

  // Constants

  var CODE_TEMPLATE = '@inclide pixel-color-variant({color-name}, {color}, {text-color});';

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

  // Attributes

  var predefinedColors = [
    { name: 'material-red',     textColor: '#fff',    color: '#F44336' },
    { name: 'material-pink',    textColor: '#fff',    color: '#E91E63' },
    { name: 'material-purple',  textColor: '#fff',    color: '#9C27B0' },
    { name: 'material-dpurple', textColor: '#fff',    color: '#673AB7' },
    { name: 'material-indigo',  textColor: '#fff',    color: '#3F51B5' },
    { name: 'material-blue',    textColor: '#fff',    color: '#2196F3' },
    { name: 'material-lblue',   textColor: '#fff',    color: '#03A9F4' },
    { name: 'material-cyan',    textColor: '#fff',    color: '#00BCD4' },
    { name: 'material-teal',    textColor: '#fff',    color: '#009688' },
    { name: 'material-green',   textColor: '#fff',    color: '#4CAF50' },
    { name: 'material-lgreen',  textColor: '#fff',    color: '#8BC34A' },
    { name: 'material-lime',    textColor: '#616633', color: '#CDDC39' },
    { name: 'material-yellow',  textColor: '#706b4d', color: '#FFEB3B' },
    { name: 'material-amber',   textColor: '#fff',    color: '#FFC107' },
    { name: 'material-orange',  textColor: '#fff',    color: '#FF9800' },
    { name: 'material-dorange', textColor: '#fff',    color: '#FF5722' },
    { name: 'material-brown',   textColor: '#fff',    color: '#795548' },
    { name: 'material-grey',    textColor: '#fff',    color: '#9E9E9E' },
    { name: 'material-bgrey',   textColor: '#fff',    color: '#607D8B' },
  ];

  var _curColorName;
  var _curColor;
  var _curTextColor = '#fff';

  var _pxStyle = decodeURIComponent(((new RegExp(';\\s*' + encodeURIComponent('px-demo-theme') + '\\s*=\\s*([^;]+)\\s*;', 'g')).exec(';' + document.cookie + ';') || [])[1] || 'default')
    .indexOf('dark') === -1 ? 'light' : 'dark';

  $('body')[_pxStyle === 'dark' ? 'addClass' : 'removeClass']('px-style-dark');

  // Private

  // Utility functions
  //

  function _replaceWithMap(str, map) {
    var search = Object.keys(map).join('|');

    return str.replace(new RegExp(search, 'ig'), function(ch) {
      return map[ch];
    });
  }


  function _escapeHTML(html) {
    return _replaceWithMap(html, ESCAPE_HTML_MAP);
  }

  function _unescapeHTML(html) {
    var UNESCAPE_HTML_MAP = {};

    for (prop in ESCAPE_HTML_MAP) {
      if (hasOwnProperty.call(ESCAPE_HTML_MAP, prop)) {
        UNESCAPE_HTML_MAP[ESCAPE_HTML_MAP[prop]] = prop;
      }
    }

    return _replaceWithMap(html, UNESCAPE_HTML_MAP);
  }

  function _sanitizeSource(source) {
    return _replaceWithMap(source.replace(/^\s+|\s+$/g, ''), SANITIZE_SOURCE_MAP);
  }

  function _highlightSource(lang_, source_, searches_) {
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

        accents[curIndex] = '<span class="doc-accent">' + _escapeHTML(r) + '</span>';

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

  function _validateColor(value) {
    const result = value.replace(/^\s+|\s+$/, '').replace(/^#/, '');

    if (result.length !== 3 && result.length !== 6) { return null; }

    return (/^[0-9a-f]+$/i).test(result) ? ('#' + result) : null;
  }

  function _validateColorName(value) {
    const result = value.replace(/^\s+|\s+$/, '');

    return (/^[0-9a-z_-]+$/i).test(result) ? result : null;
  }

  function _saveSelectedColors() {
    var selectedColors = [];

    $('#cg-selected-colors .color').each(function() {
      selectedColors.push({
        name:      $(this).data('name'),
        textColor: $(this).data('textColor'),
        color:     $(this).data('color'),
      });
    });

    PixelAdmin.storage.set('cg-selected-colors', JSON.stringify(selectedColors));
  }

  function _loadColors(container, data) {
    var $colorsList = $(container);

    for (var i = 0, l = data.length; i < l; i++) {
      $colorsList.append(
        $('<div class="color" style="background: ' + data[i].color + ';"></div>')
          .data('name', data[i].name)
          .data('textColor', data[i].textColor)
          .data('color', data[i].color)
      );
    }
  }

  // ---------------------------------------------------------------------------
  //

  function _update() {
    if (_curColorName) {
      $('#cg-color-name').val(_curColorName);
    }

    if (_curColor) {
      $('#cg-color').val(_curColor);
      $('#cg-cur-color').css('background', _curColor);

      if (_curColor !== $('#cg-palette')[0].value) {
        $('#cg-palette').minicolors('value', { color: _curColor });
      }
    }

    if (_curTextColor) {
      if (_curTextColor !== $('#cg-text-color')[0].value) {
        $('#cg-text-color').minicolors('value', { color: _curTextColor });
      }
    }

    if (!_curColorName || !_curColor || !_curTextColor) {
      $('#cg-code').text('//');
      $('#colors-list-add').prop('disabled', true);

      return;
    }

    $('#cg-code').text(
      CODE_TEMPLATE
        .replace('{color-name}', _curColorName)
        .replace('{color}', _curColor)
        .replace('{text-color}', _curTextColor)
    );

    $('#colors-list-add').prop('disabled', false);

    // Generate CSS

    var source = PX_COLOR_GENERATOR_DATA[_pxStyle] +
      CODE_TEMPLATE
        .replace('@inclide ', '.')
        .replace('{color-name}', 'cg-generated')
        .replace('{color}', _curColor)
        .replace('{text-color}', _curTextColor);

    less.render(source, function (e, output) {
      if (e) { console.log(e); alert('Error occured while compiling CSS! See output in the console.') }
      document.getElementById('cg-generated-style').innerHTML = output.css.replace(/@.*?;\n/g, '');
    });
  }

  function _loadInitialColor() {
    var container = $('#cg-selected-colors .color').length ? '#cg-selected-colors' : '#cg-predefined-colors';
    var $colors   = $(container + ' .color');

    $colors.eq($colors.length > 1 ? pxDemo.getRandomData($colors.length, 0) : 0).trigger('click');
  }

  function _initCodeExamples() {
    $('.cg-example')
      .each(function() {
        $(this).parents('.panel').find('.cg-example-show-code').data('cg-example-source', _sanitizeSource(this.innerHTML));
      });
  }

  function _setListeners() {
    $('#cg-color-name').on('keyup change', function() {
      _curColorName = _validateColorName(this.value);

      _update();
    });

    $('#cg-text-color').on('keyup change', function() {
      if (_curTextColor === this.value) { return; }

      _curTextColor = _validateColor(this.value);

      _update();
    });

    $('#cg-color').on('keyup change', function() {
      _curColor = _validateColor(this.value);

      _update();
    });

    $('#cg-palette').on('change', function() {
      if (_curColor === this.value) { return; }

      _curColor = this.value;

      _update();
    });

    $('.colors-list').on('click', '.color', function() {
      if ($(this).parent().hasClass('edit-mode')) {
        $(this).remove();

        _saveSelectedColors();
      } else {
        _curColorName = $(this).data('name');
        _curColor = $(this).data('color');
        _curTextColor = $(this).data('textColor');

        _update();
      }
    });

    $('body').on('click', '.cg-example-show-code', function() {
      var source = $(this).data('cg-example-source');
      var $pre   = $('<div class="clearfix"></div><pre><code class="html"></code></pre>');
      var $code  = $pre.find('code');

      $code
        .html(_highlightSource('html', source, $(this).parents('.panel').find('.cg-example').attr('data-accent')).replace(/cg\-generated/g, _curColorName))
        .addClass('hljs html xml');

      var $modal = $(
'<div class="modal fade cg-example-modal" tabindex="-1" role="dialog">' +
' <div class="modal-dialog" role="document">' +
'   <div class="modal-content">' +
'     <div class="modal-body"></div>' +
'   </div>' +
' </div>' +
'</div>'
      );

      $modal.find('.modal-body').append($pre);

      $modal
        .on('hidden.bs.modal', function() { $(this).remove(); })
        .modal();
    });

    $('input[name="px-demo-current-theme"]').on('change', function() {
      _pxStyle = this.value.indexOf('dark') === -1 ? 'light' : 'dark';
      $('body')[_pxStyle === 'dark' ? 'addClass' : 'removeClass']('px-style-dark');

      _update();
    });

    $('#colors-list-add').on('click', function() {
      $('#cg-selected-colors').prepend(
        $('<div class="color" style="background: ' + _curColor + ';"></div>')
          .data('name', _curColorName)
          .data('textColor', _curTextColor)
          .data('color', _curColor)
      );

      _saveSelectedColors();
    });

    $('#cg-selected-colors-edit').on('click', function() {
      var $colors = $('#cg-selected-colors');

      if ($colors.hasClass('edit-mode')) {
        $(this).text('EDIT').removeClass('btn-success');
        $colors.removeClass('edit-mode');
      } else {
        $(this).text('DONE').addClass('btn-success');
        $colors.addClass('edit-mode');
      }
    });
  }

  // Initialization

  $('#cg-palette').minicolors({ inline: true });
  $('#cg-text-color').minicolors({});
  $('#cg-palette').parent().find('.minicolors-panel').addClass('bg-white');

  _loadColors('#cg-selected-colors', JSON.parse(PixelAdmin.storage.get('cg-selected-colors') || '[]'));
  _loadColors('#cg-predefined-colors', predefinedColors);

  _setListeners();
  _initCodeExamples();

  _loadInitialColor();
}
