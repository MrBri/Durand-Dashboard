'use strict';

/* Controllers */

function indexCtrl ($scope, $location, LogInSvc ) {
  $scope.goHome = function() {
    $location.path("/home");
  };

}

function loginCtrl($scope, $location, LogInSvc) {

  $scope.login = function() {
    LogInSvc.setLogin(true);
   $location.path("/twoBytwo");
 
  };

  $scope.isLoggedIn = function() {
    return LogInSvc.getLoginStatus();
  };

}

function homeCtrl ($scope, $http, $location, CategoryAvgSvc, timeChartSvc) {
  // $scope.categories = glb.categoryDataIncremental;

  //Set bool to determine whether incremental or total button is selected.
  //False = Incremental View, True = Total View
  $scope.curDurationBtn = false;

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

  // Retrieves totals for category total averages
  $http.get('/app/data/mod_category_data_total.js').success(function(data) {
    $scope.avg_total = CategoryAvgSvc.calc(data);
  });

  // Retrieves totals for category week averages
  $http.get('/app/data/mod_category_data_inc.js').success(function(data) {
    $scope.avg_inc = CategoryAvgSvc.calc(data);
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

  //Load up intiial time series data
  $scope.timeseries = timeChartSvc.showSales();

  //Functions to display the correct line graph
  $scope.showSales = function() {
    $scope.timeseries = timeChartSvc.showSales();
  };

  $scope.showVolume = function() {
    $scope.timeseries = timeChartSvc.showVolume();
  };

  $scope.showMargin = function() {
    $scope.timeseries = timeChartSvc.showMargin();
  };

  $scope.showProfit = function() {
    $scope.timeseries = timeChartSvc.showProfit();
  };

  $scope.showTrans = function() {
    $scope.timeseries = timeChartSvc.showTrans();
  };

  $scope.showImpact = function() {
    $scope.timeseries = timeChartSvc.showImpact();
  };

  $scope.viewTactic = function() {
    $location.path("/twoBytwo");
  };

  $scope.concat = function(itemName) {
    if(itemName.length > 18) {
      return(itemName.slice(0,18) + "...");
    } else {
      return(itemName);
    }
  };

}

//FIX - commenting this out for now since it breaks the CategoryAvgSvc
//homeCtrl.$inject = ['$scope', '$http', 'CategoryAvgSvc', '$location'];

function datePickerCtrl($scope) {
  var fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - 1);
  var fromDateStr = ""+(fromDate.getMonth()+1)+"\/"+fromDate.getDate()+"\/"+fromDate.getFullYear();
  var toDate = new Date();
  var toDateStr = ""+(toDate.getMonth()+1)+"\/"+toDate.getDate()+"\/"+toDate.getFullYear();

  $scope.datepicker = {
    'fromDate': fromDateStr,
    'toDate': toDateStr,
    'language': 'en',
    'format': 'mm/dd/yyyy'
  };
}

function twoBytwoCtrl($scope, $http) {
  $http.get('data/twoByTwoData.js').success(function(data){
    $scope.twoBytwo = data;
  });
}
twoBytwoCtrl.$inject = ['$scope', '$http'];

function brandCtrl($scope, $http, AverageSvc, timeChartSvc) {
  $http.get('/app/data/brand_bar.json').success(function(data){
    var stringified = JSON.stringify(data);
    var colData = JSON.parse(stringified);
    $scope.brand_sales = colData[0];
    $scope.brand_vol = colData[1];
    $scope.brand_margin = colData[2];
  });

  $http.get('/app/data/mod_brand_data.js').success(function(data) {
    $scope.brands = data;
    var averages = AverageSvc.calc(data);
    $scope.avg_sale = averages[0];
    $scope.avg_vol = averages[1];
    $scope.avg_margin = averages[2];
  });

  //$scope.salesTimeChart = salesTimeChartSvc.query();
  $scope.timeseries = timeChartSvc.showSales();

  $scope.showSales = function() {
    $scope.timeseries = timeChartSvc.showSales();
  };

  $scope.showVolume = function() {
    $scope.timeseries = timeChartSvc.showVolume();
  };

  $scope.showMargin = function() {
    $scope.timeseries = timeChartSvc.showMargin();
  };

  $http.get('/app/data/mod_category_data_inc.js').success(function(data){
    $scope.categories = data;
  });

  $scope.actionIsNotNull = function(brand) {
    return brand.action !== null;
  };

  $scope.followUpIsNotNull = function(brand) {
    return brand.followUp !== null;
  };
}

function actionItemCtrl($scope) {
  $scope.open = false;

  $scope.toggleOpen = function () {
    $scope.open = ($scope.open) ? false : true;
  };
}

function timeSeriesCtrl($scope) {
  $scope.toggleSelected = function (colNum) {
    for (var i = 0; i < 6; i++) {
      $scope.selected[i] = false;
    };
    $scope.selected[colNum] = true;
  };
  
  $scope.selected = [];
  $scope.selected[0] = true;
}
