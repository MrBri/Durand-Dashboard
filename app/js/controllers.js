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
  });

  // $http.get("/app/data/salesTimeSeries.json").success(function(data) {
  //   $scope.basicAreaChart = data;
  // });

  $scope.viewTactic = function() {
    $location.path("/twoBytwo");
  };

  $scope.loadTotal = function() {
    console.log('loading charts');
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
