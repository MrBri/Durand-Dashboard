'use strict';

/* Filters */

angular.module('myApp.filters', [])
  .filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }])
  .filter('action', function(){
    return function(input, prop) {
      var arrayToReturn = [];
      for (var i = 0; i < input.length; i++) {
        if ( input[i].action !== "" ) {
          arrayToReturn.push(input[i]);
        }
      }
      return arrayToReturn;
    };
  })
  .filter('followUp', function() {
    return function(input) {
      var arrayToReturn = [];
      for (var i = 0; i < input.length; i++) {
        if (input[i].followUp !== "") {
          arrayToReturn.push(input[i]);
        }
      }
      return arrayToReturn;
    };
  });
