(function() {
  // ===============================================================================
  // Controllers / Forms / Validation
  //

  // Custom validators
  //

  function compareToValidatorDirective() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: { selector: '@compareTo' },
      link: function($scope, _element_, _attrs_, ctrl) {
        var $el = angular.element($scope.selector);

        ctrl.$validators.compareTo = function(_modelValue_, viewValue) {
          return (viewValue || '') === $el.val();
        };

        $el.on('input', function(){
          $scope.$apply(function() { ctrl.$validate(); });
        });
      }
    };
  }

  function phoneValidatorDirective() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function($scope, _element_, _attrs_, ctrl) {
        ctrl.$validators.phone = function(_modelValue_, viewValue) {
          return /^\(\d{3}\)[ ]\d{3}\-\d{4}$/.test(viewValue);
        };
      }
    };
  }

  function fileValidatorDirective() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function($scope, $element, _attrs_, ctrl) {
        ctrl.$validators.fileRequired = function(_modelValue_, viewValue) {
          return (viewValue instanceof FileList) && viewValue.length > 0;
        };

        $element.bind('change', function(){
          $scope.$apply(function(){
            ctrl.$setViewValue($element[0].files);
            ctrl.$validate();
          });
        });
      }
    };
  }

  function pxFileValidatorDirective() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function($scope, $element, _attrs_, ctrl) {
        ctrl.$validators.pxFileRequired = function(_modelValue_, viewValue) {
          return (viewValue instanceof FileList) && viewValue.length > 0;
        };

        $element.find('input[type="file"]').bind('change focusout', function(){
          $scope.$apply(function(){
            ctrl.$validate();
            ctrl.$setTouched();
          });
        });
      }
    };
  }


  // Validation controller
  //

  function FormValidationCtrl($scope) {
    var self = this;
    this.data = {};

    this.hasErr = function(field, err) {
      if (!$scope.validationForm.$submitted && !($scope.validationForm[field] || { $touched: false }).$touched) {
        return false;
      }

      if (!err) { return $scope.validationForm[field].$invalid; }
      return Boolean($scope.validationForm[field].$error[err]);
    }

    this.printData = function() {
      return JSON.stringify(self.data, null, 2);
    };
  }


  // Wizard validation controllers
  //

  function WizardValidationCtrl($scope, $element) {
    var self = this;

    this.data = {};
    this.$wizard = null;

    this.hasErr = function(form, field, err) {
      if (!form.$submitted && !(form[field] || { $touched: false }).$touched) {
        return false;
      }

      if (!err) { return form[field].$invalid; }
      return Boolean(form[field].$error[err]);
    }

    this.next = function(form) {
      if (form.$invalid) { return; }
      self.$wizard('goNext');
    }

    this.back = function() {
      self.$wizard('goPrev');
    }

    this.finish = function() {
      var $pane = self.$wizard('getActivePane');

      $pane.find('.ion-checkmark-round').removeClass('ion-checkmark-round').addClass('ion-checkmark-circled');
      $pane.find('h4').text('Thank You!');
      $pane.find('button').remove();

      console.log(self.data);
    };
  }


  //---
  //

  angular.module('pixeladmin')
    .directive('compareTo', compareToValidatorDirective)
    .directive('phone', phoneValidatorDirective)
    .directive('fileRequired', fileValidatorDirective)
    .directive('pxFileRequired', pxFileValidatorDirective)
    .controller('FormValidationCtrl', [ '$scope', FormValidationCtrl ])
    .controller('WizardValidationCtrl', [ '$scope', WizardValidationCtrl ]);

})();
