'use strict';

/* Filters */

angular.module('myApp.filters', [])
  .filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }])
  .filter('action', function(){
    return function(input) {
      var arrayToReturn = [];
      for (var i = 0; i < input.length; i++) {
        if ( input[i].action !== null ) {
          arrayToReturn.push(input[i]);
        }
      }
      return arrayToReturn;
    };
  });
