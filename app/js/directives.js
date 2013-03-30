'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('accountLinks', function () {
    return {
      templateUrl: 'partials/accountLinks.html'
    };
  }).
  directive('subHeader', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/subHeader.html',
      link: function(scope, element, attrs) {
        setTimeout(function(){
          var $dropdowns = element.children().children().children('.dropdown-menu');
          $.each( $dropdowns, function(){
            if($(this).children().length === 0) {
              $(this).parent().children().attr('disabled','disabled')
            }
          })
        }, 100)
      }
    };
  }).
  directive('sidebar', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/sidebar.html'
    };
  }).
  directive('modal', function () {
    return {
      templateUrl: 'partials/modal.html'
    };
  }).
  directive('chart', function () {
    return {
      restrict: 'E',
      template: '<div></div>',
      transclude:true,
      replace: true,

      link: function (scope, element, attrs) {
        var chartsDefaults = {
          chart: {
            renderTo: element[0]
          }
        };
       //Update when charts data changes
       scope.$watch(function() { return attrs.value; }, function(value) {
         if(!attrs.value) return;
           // We need deep copy in order to NOT override original chart object.
           // This allows us to override chart data member and still the keep
           // our original renderTo will be the same
           var deepCopy = true;
           var newSettings = {};
           $.extend(deepCopy, newSettings, chartsDefaults, JSON.parse(attrs.value));
           var chart = new Highcharts.Chart(newSettings);
       });
     }
   }
  }).
  directive('bsDatepicker', ['$timeout', function($timeout, config) {
  'use strict';

  var isTouch = 'ontouchstart' in window && !window.navigator.userAgent.match(/PhantomJS/i);

  var regexpMap = function regexpMap(language) {
    language = language || 'en';
    return {
      '/'    : '[\\/]',
      '-'    : '[-]',
      '.'    : '[.]',
      ' '    : '[\\s]',
      'dd'   : '(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))',
      'd'    : '(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))',
      'mm'   : '(?:[0]?[1-9]|[1][012])',
      'm'    : '(?:[0]?[1-9]|[1][012])',
      'DD'   : '(?:' + $.fn.datepicker.dates[language].days.join('|') + ')',
      'D'    : '(?:' + $.fn.datepicker.dates[language].daysShort.join('|') + ')',
      'MM'   : '(?:' + $.fn.datepicker.dates[language].months.join('|') + ')',
      'M'    : '(?:' + $.fn.datepicker.dates[language].monthsShort.join('|') + ')',
      'yyyy' : '(?:(?:[1]{1}[0-9]{1}[0-9]{1}[0-9]{1})|(?:[2]{1}[0-9]{3}))(?![[0-9]])',
      'yy'   : '(?:(?:[0-9]{1}[0-9]{1}))(?![[0-9]])'
    };
  };

  var regexpForDateFormat = function regexpForDateFormat(format, language) {
    var re = format, map = regexpMap(language), i;
    // Abstract replaces to avoid collisions
    i = 0; angular.forEach(map, function(v, k) {
      re = re.split(k).join('${' + i + '}'); i++;
    });
    // Replace abstracted values
    i = 0; angular.forEach(map, function(v, k) {
      re = re.split('${' + i + '}').join(v); i++;
    });
    return new RegExp('^' + re + '$', ['i']);
  };

  return {
    restrict: 'A',
    require: '?ngModel',
    link: function postLink(scope, element, attrs, controller) {

      var options = {},
          language = attrs.language || options.language || 'en',
          format = attrs.dateFormat || options.format || ($.fn.datepicker.dates[language] && $.fn.datepicker.dates[language].format) || 'mm/dd/yyyy';

      var dateFormatRegexp = isTouch ? 'yyyy/mm/dd' : regexpForDateFormat(format, language);

      // Handle date validity according to dateFormat
      if(controller) {
        controller.$parsers.unshift(function(viewValue) {
          //console.warn('viewValue', viewValue, dateFormatRegexp,  dateFormatRegexp.test(viewValue));
          if (!viewValue || dateFormatRegexp.test(viewValue)) {
            controller.$setValidity('date', true);
            return viewValue;
          } else {
            controller.$setValidity('date', false);
            return undefined;
          }
        });
      }

      // Use native interface for touch devices
      if(isTouch && element.prop('type') === 'text') {

        element.prop('type', 'date');
        element.on('change', function(ev) {
          scope.$apply(function () {
            controller.$setViewValue(element.val());
          });
        });

      } else {

        // If we have a controller (i.e. ngModelController) then wire it up
        if(controller) {
          element.on('changeDate', function(ev) {
            scope.$apply(function () {
              controller.$setViewValue(element.val());
            });
          });
        }

        // Popover GarbageCollection
        var $popover = element.closest('.popover');
        if($popover) {
          $popover.on('hide', function(e) {
            var datepicker = element.data('datepicker');
            if(datepicker) {
              datepicker.picker.remove();
              element.data('datepicker', null);
            }
          });
        }

        // Create datepicker
        element.attr('data-toggle', 'datepicker');
        element.datepicker({
          autoclose: true,
          format: format,
          language: language,
          forceParse: attrs.forceParse || false
        });

      }

      // Support add-on
      var component = element.siblings('[data-toggle="datepicker"]');
      if(component.length) {
        component.on('click', function() { element.trigger('focus'); });
      }

    }

  };

}]);
