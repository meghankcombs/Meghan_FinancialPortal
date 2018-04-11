function bootstrapMarkdownDirective($parse) {
  'use strict';

  const SCOPE_OPTIONS = [
    'autofocus', 'savable', 'hideable', 'width', 'height', 'resize', 'iconlibrary',
    'language', 'footer', 'fullscreen', 'hiddenButtons', 'disabledButtons',
    'dropZoneOptions', 'additionalButtons',
  ];

  const EVENTS = [ 'onShow', 'onPreview', 'onChange', 'onSave', 'onFocus', 'onBlur' ];

  return {
    restrict: 'A',
    scope: {
      ngModel:           '=',
      autofocus:         '=',
      savable:           '=',
      hideable:          '=',
      width:             '=',
      height:            '=',
      resize:            '=',
      iconlibrary:       '=',
      language:          '=',
      footer:            '=',
      fullscreen:        '=',
      hiddenButtons:     '=',
      disabledButtons:   '=',
      dropZoneOptions:   '=',
      additionalButtons: '=',
    },

    link($scope, $element, $attrs) {
      const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;
      const options = {};

      if (!$scope.ngModel) { $scope.ngModel = ''; }
      let _oldText = $scope.ngModel;

      function _updateOptions() {
        SCOPE_OPTIONS.forEach(optName => {
          options[optName] = $scope[optName];
        });

        if (!options.iconlibrary) { options.iconlibrary = 'fa'; }
      }

      function init() {
        _updateOptions();
        $element.val($scope.ngModel).markdown(options);

        // Trigger show and change events after init
        var editor = $element.data('markdown');

        editor.change(editor);
        editor.$options.onShow(editor);
      }

      function destroy() {
        const $editor = $element.data('markdown').$editor;

        $element.data('markdown').setFullscreen(false);

        $editor.off();
        $editor.find('.md-header').remove();
        $editor.find('.md-footer').remove();
        $editor.find('.md-preview').remove();
        $editor.find('.md-fullscreen-controls').remove();

        $element
          .off()
          .removeClass('md-input')
          .removeData('markdown')
          .unwrap('.md-editor');

        $element[0].removeAttribute('style');
      }

      EVENTS.forEach(event => {
        if (!$attrs[event]) { return; }
        options[event] = $parse($attrs[event])($scope.$parent);
      });

      const onChange  = options.onChange || function() {};

      options.onChange = function(...args) {
        const text = $element.val();

        if (_oldText !== text) {
          _oldText = text;
          $scope.$applyAsync(() => $scope.ngModel = text);
        }

        onChange.apply(this, args);
      };

      init();

      $scope.$watch('ngModel', text => _oldText = text);

      SCOPE_OPTIONS.forEach(optName => {
        $scope.$watch(optName, val => {
          if (typeof val === 'undefined') { return; }
          _updateOptions();
          destroy();
          init();
        });
      });

      // Readonly variable
      setInstancePointer($scope.$parent, $.fn.markdown.bind($element));

      $element.on('$destroy', destroy);
    },
  };
}

angular.module('bootstrap-markdown', [])
  .directive('markdownEditor', [ '$parse', bootstrapMarkdownDirective ]);
