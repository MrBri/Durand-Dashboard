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

  $http.get('/app/data/category_data_inc.json').success(function(data) {
    var stringified = JSON.stringify(data);
    var colData = JSON.parse(stringified);

    $scope.cat_inc_sales = colData[0];
    $scope.cat_inc_vol = colData[1];
    $scope.cat_inc_margin = colData[2];
    $scope.cat_inc_profit = colData[3];
    $scope.cat_inc_trans = colData[4];
    $scope.cat_inc_impact = colData[5];
  });

  $scope.loadTotal = function() {
    $http.get('/app/data/category_data_total.json').success(function(data) {
      var stringified = JSON.stringify(data);
      var colData = JSON.parse(stringified);
      $scope.cat_inc_sales = colData[0];
      $scope.cat_inc_vol = colData[1];
      $scope.cat_inc_margin = colData[2];
      $scope.cat_inc_profit = colData[3];
      $scope.cat_inc_trans = colData[4];
      $scope.cat_inc_impact = colData[5];
    });
  };

  $http.get('/app/data/salesTimeSeries.json').success(function(data) {
    $scope.timeseries = data;
  });

  $scope.showSales = function() {
    $http.get('/app/data/salesTimeSeries.json').success(function(data) {
      $scope.timeseries = data;
    });
  }

  $scope.showVolume = function() {
    $http.get('/app/data/volumeTimeSeries.json').success(function(data) {
      $scope.timeseries = data;
    });
  }

  $scope.showMargin = function() {
    $http.get('/app/data/marginTimeSeries.json').success(function(data) {
      $scope.timeseries = data;
    });
  }

  $scope.showProfit = function() {
    $http.get('/app/data/profitTimeSeries.json').success(function(data) {
      $scope.timeseries = data;
    });
  }

  $scope.showTrans = function() {
    $http.get('/app/data/transactionsTimeSeries.json').success(function(data) {
      $scope.timeseries = data;
    });
  }

  $scope.showImpact = function() {
    $http.get('/app/data/impactTimeSeries.json').success(function(data) {
      $scope.timeseries = data;
    });
  }

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
