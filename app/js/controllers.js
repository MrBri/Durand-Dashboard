'use strict';

/* Controllers */


function loginCtrl($scope) {
  $scope.master = [];

  $scope.update = function(user) {
    $scope.master.push(user);
  };
}
loginCtrl.$inject = ['$scope'];

function homeCtrl ($scope) {
  $scope.catDataInc = glb.categoryDataIncremental;
}
homeCtrl.$inject = ['$scope'];

function twoBytwoCtrl($scope, $http) {
  $http.get('data/twoBytwoData.js').success(function(data){
    $scope.twoBytwo = data;
  });
}
twoBytwoCtrl.$inject = ['$scope', '$http'];
