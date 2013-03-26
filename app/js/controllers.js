'use strict';

/* Controllers */

function loginCtrl($scope, $location) {
  $scope.login = function() {
    $location.path("/choose");
  };

  $scope.goHome = function() {
    $location.path("/home");
  };
}
loginCtrl.$inject = ['$scope', '$location'];

function homeCtrl ($scope, $http, $location, CategoryAvgSvc) {
  // $scope.categories = glb.categoryDataIncremental;

  //Category names
  $http.get('/app/data/mod_category_data_inc.js').success(function(data){
    $scope.categories = data;
  });

  $http.get('/app/data/mod_brand_data.js').success(function(data){
    $scope.brands = data;
  });

  $http.get('/app/data/mod_item_data.js').success(function(data){
    $scope.items = data;
  });

  $http.get('/app/data/mod_category_data_total.js').success(function(data) {
    console.log("Calling CatAvgSvc");
    $scope.total_avg = CategoryAvgSvc.calc(data);
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

  $scope.loadWeek = function() {
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
  };

  $http.get('/app/data/salesTimeSeries.json').success(function(data) {
    $scope.timeseries = data;
  });

  $scope.showSales = function() {
    $http.get('/app/data/salesTimeSeries.json').success(function(data) {
      $scope.timeseries = data;
    });
  };

  $scope.showVolume = function() {
    $http.get('/app/data/volumeTimeSeries.json').success(function(data) {
      $scope.timeseries = data;
    });
  };

  $scope.showMargin = function() {
    $http.get('/app/data/marginTimeSeries.json').success(function(data) {
      $scope.timeseries = data;
    });
  };

  $scope.showProfit = function() {
    $http.get('/app/data/profitTimeSeries.json').success(function(data) {
      $scope.timeseries = data;
    });
  };

  $scope.showTrans = function() {
    $http.get('/app/data/transactionsTimeSeries.json').success(function(data) {
      $scope.timeseries = data;
    });
  };

  $scope.showImpact = function() {
    $http.get('/app/data/impactTimeSeries.json').success(function(data) {
      $scope.timeseries = data;
    });
  };

  $scope.viewTactic = function() {
    $location.path("/twoBytwo");
  };

  $scope.concat = function(itemName) {
    if(itemName.length > 7) {
      return(itemName.slice(0,7) + "...");
    } else {
      return(itemName);
    }
  };

  var fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - 1);

  $scope.datepicker = {
    "fromDate": fromDate,
    "toDate": Date()
  };
}

//FIX - commenting this out for now since it breaks the CategoryAvgSvc
//homeCtrl.$inject = ['$scope', '$http', 'CategoryAvgSvc', '$location'];

function twoBytwoCtrl($scope, $http) {
  $http.get('data/twoBytwoData.js').success(function(data){
    $scope.twoBytwo = data;
  });
}
twoBytwoCtrl.$inject = ['$scope', '$http'];

function brandCtrl($scope, $http, AverageSvc) {
  $http.get('/app/data/brand_bar.json').success(function(data){
    var stringified = JSON.stringify(data);
    var colData = JSON.parse(stringified);
    $scope.brand_sales = colData[0];
    $scope.brand_vol = colData[1];
    $scope.brand_margin = colData[2]; 
  });

  $http.get('/app/data/mod_brand_data.js').success(function(data) {
    $scope.brands = data;
    $scope.averages = AverageSvc.calc(data);
  });
}

function actionItemCtrl($scope) {
    $scope.open = false;

  $scope.toggleOpen = function () {
    $scope.open = ($scope.open) ? false : true;
  };
}
