'use strict';

/* Controllers */


function loginCtrl($scope) {
  $scope.master = [];

  $scope.update = function(user) {
    $scope.master.push(user);
  };
}
loginCtrl.$inject = ['$scope'];

function homeCtrl ($scope, $http) {
  $scope.catDataInc = glb.categoryDataIncremental;
  $http.get('/app/data/mod_category_data_inc.js').success(function(data){
    $scope.categories = data;
    console.log($scope.categories);
  });
}
homeCtrl.$inject = ['$scope', '$http'];

function twoBytwoCtrl($scope, $http) {
  $http.get('data/twoBytwoData.js').success(function(data){
    $scope.twoBytwo = data;
  });
}
twoBytwoCtrl.$inject = ['$scope', '$http'];
