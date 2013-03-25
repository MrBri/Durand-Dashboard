'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('logout', function () {
    return {
      template:
          '<ul class="span3 username">' +
            '<li>John Smith</li>' +
            '<li> | </li>' +
            '<li>Logout </li>' +
            '<i class="icon-play icon-white"></i>' +
          '</ul>'
    };
  }).
  directive('subHeader', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/subHeader.html'
    };
  }).
  directive('chart', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/barChart.html',
      link: function(scope, element, attrs) {
        scope.$watch(function() { return attrs.value; }, function(value) {
          charts.loadDataFile('/app/data/mod_category_data_inc.js', charts.setupBarGraph);
        });
      }
    };
  });