'use strict';

/* Controllers */


function loginCtrl($scope) {
  $scope.master = [];

  $scope.update = function(user) {
    $scope.master.push(user);
  };
}
loginCtrl.$inject = ['$scope'];


function twoBytwoCtrl($scope, $http) {
  $http.get('data/twoBytwoData.js').success(function(data){
    $scope.twoBytwo = data;
  });
}
twoBytwoCtrl.$inject = ['$scope', '$http'];

function homeCtrl($scope, $http) {

  $scope.brandData = glb.brandData;
  $scope.categoryData = glb.categoryData;
  // $http.get('data/categoryData.js').success(function(data){
  //   $scope.categoryData = data;
  // });
  // $http.get('data/brandData.js').success(function(data){
  //   $scope.brandData = data;
  // });

}
homeCtrl.$inject = ['$scope', '$http'];
