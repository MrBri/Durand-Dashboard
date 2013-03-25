'use strict';

/* Controllers */


function loginCtrl($scope, $location) {
  $scope.login = function() {
    $location.path("/home");
  };
}
loginCtrl.$inject = ['$scope', '$location'];

function homeCtrl ($scope, $http, $location) {
  $scope.catDataInc = glb.categoryDataIncremental;

  $http.get('/app/data/mod_category_data_inc.js').success(function(data){
    $scope.categories = data;
    charts.setupBarGraph($scope.categories);
  });

  $http.get("/app/data/salesTimeSeries.json").success(function(data) {
    $scope.basicAreaChart = data;
  });

  // $http.get('/app/data/mod_category_linechart.js').success(function(data){
  //   $scope.linechart = data;
  //   charts.setupLineGraph($scope.linechart);
  // });

  $scope.viewTactic = function() {
    $location.path("/twoBytwo");
  };
}
homeCtrl.$inject = ['$scope', '$http', '$location'];

function twoBytwoCtrl($scope, $http) {
  $http.get('data/twoBytwoData.js').success(function(data){
    $scope.twoBytwo = data;
  });
}
twoBytwoCtrl.$inject = ['$scope', '$http'];

function brandCtrl($scope, $http) {

}

function actionItemCtrl($scope) {
    $scope.open = false;

  $scope.toggleOpen = function () {
    $scope.open = ($scope.open) ? false : true;
  };
}


angular.module('chartsExample.directives',[])

.directive('chart', function () {
  return {
    restrict: 'E',
    template: '<div></div>',
    transclude:true,
    replace: true,

    link: function (scope, element, attrs) {
      var chartsDefaults = {
        chart: {
          renderTo: element[0],
          type: attrs.type || null,
          height: attrs.height || null,
          width: attrs.width || null,
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
});