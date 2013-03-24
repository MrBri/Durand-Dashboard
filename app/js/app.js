'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/login.html', controller: loginCtrl});
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: homeCtrl});
    // $routeProvider.when('/home/:id', {templateUrl: 'partials/brand.html', controller: brandCtrl});
    $routeProvider.when('/twoBytwo', {templateUrl: 'partials/twoBytwo.html', controller: twoBytwoCtrl});
    $routeProvider.when('/brand', {templateUrl: 'partials/brand.html', controller: brandCtrl});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
