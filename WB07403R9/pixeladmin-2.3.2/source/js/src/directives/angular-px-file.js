function pxFileDirective($timeout) {
  'use strict';

  return {
    restrict:   'E',
    require:    'ngModel',
    transclude: 'element',
    template:   '<label class="custom-file" for="{{pxFileId}}"><input type="file" class="custom-file-input" id="{{pxFileId}}" ng-disabled="disable"><span class="custom-file-control form-control" ng-class="{\'input-sm\':size === \'sm\',\'input-lg\':size === \'lg\'}">{{pxFilePlaceholder}}</span></label>',
    replace:    true,

    scope: {
      ngModel: '=',
      disable: '=?',
      size:    '@',
    },

    link($scope, $element, $attrs) {
      const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;
      $scope.pxFileId          = $attrs.inputId || `px-file-${pxUtil.generateUniqueId()}`;
      $scope.pxFilePlaceholder = $attrs.placeholder || 'Choose file...';

      $timeout(() => {
        $element.find('input').bind('change', function(e) {
          $scope.$apply(() => $scope.ngModel = e.target.files);
        });

        $element.pxFile();

        // Readonly variable
        setInstancePointer($scope, $.fn.pxFile.bind($element));

        $element.on('$destroy', () => {
          $element.find('input').off('change');
          $element.pxFile('destroy');
        });
      });
    },
  };
}

function pxCustomFileDirective($timeout) {
  'use strict';

  return {
    restrict:   'E',
    require:    'ngModel',
    transclude: 'element',
    template:   '<label class="custom-file px-file" for="{{pxFileId}}"><input type="file" class="custom-file-input" id="{{pxFileId}}" ng-disabled="disable"><span class="custom-file-control form-control" ng-class="{\'input-sm\':size === \'sm\',\'input-lg\':size === \'lg\'}">{{pxFilePlaceholder}}</span><div class="px-file-buttons"><button type="button" class="btn px-file-clear" ng-class="{disabled: disable}">{{pxFileClearText}}</button><button type="button" class="btn btn-primary px-file-browse" ng-class="{disabled: disable}">{{pxFileBrowseText}}</button></div></label>',
    replace:    true,

    scope: {
      ngModel: '=',
      disable: '=?',
      size:    '@',
    },

    link($scope, $element, $attrs) {
      const setInstancePointer = $attrs.instance ? $parse($attrs.instance).assign : angular.noop;
      $scope.pxFileId          = $attrs.inputId || `px-file-${pxUtil.generateUniqueId()}`;
      $scope.pxFilePlaceholder = $attrs.placeholder || 'Choose file...';
      $scope.pxFileClearText   = $attrs.clearText || 'Clear';
      $scope.pxFileBrowseText  = $attrs.browseText || 'Browse';

      $timeout(() => {
        $element.find('input').bind('change', function(e) {
          $scope.$apply(() => $scope.ngModel = e.target.files);
        });

        $element.pxFile();

        // Readonly variable
        setInstancePointer($scope, $.fn.pxFile.bind($element));

        $element.on('$destroy', () => {
          $element.find('input').off('change');
          $element.pxFile('destroy');
        });
      });
    },
  };
}


angular.module('px-file', [])
.directive('pxFile', [ '$timeout', pxFileDirective ])
.directive('pxCustomFile', [ '$timeout', pxCustomFileDirective ]);
