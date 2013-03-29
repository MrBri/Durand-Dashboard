'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
  .value('version', '0.1')
  .service('AverageSvc', function() {
    this.calc = function(data) {
      var averages = [];
      averages[0] = 0;
      averages[1] = 0;
      averages[2] = 0;

      var count = 0;

      //Grabbing data from Mean field although it doesn't match
      //what we create
      for (var key in data) {
        averages[0] += data[key]['IncSalesMean'];
        averages[1] += data[key]['VolSalesMean'];
        averages[2] += data[key]['MarSalesMean'];
        count++;
      }

      for (var i=0; i < averages.length; i++) {
        averages[i] /= count;
      }
      return averages;
    }
  })
  .service('CategoryAvgSvc', function() {
    this.calc = function(data) {
      var count = 0;

      //Setup array to store data
      var averages = [];
      for (var i=0; i < 6; i++) {
        averages[i] = 0;
      }

      //Insert data into array for processing
      for (var key in data) {
        averages[0] += data[key]['sales'];
        averages[1] += data[key]['volume'];
        averages[2] += data[key]['margin'];
        averages[3] += data[key]['profit'];
        averages[4] += data[key]['transactions'];
        averages[5] += data[key]['impact'];
        count++;
      }

      //Calculate the average
      for (var j=0; j < averages.length; j++) {
        averages[j] /= count;
        averages[j] = Math.round(averages[j]);
      }
      return averages;
    }

  })
  //Return the sales time series line graph
  .factory('timeChartSvc', function($http) {
    return {
      showSales: function() {
        return $http.get('/app/data/salesTimeSeries.json')
          .then(function(response) {
            return response.data;

        });
      },
      showVolume: function() {
        return $http.get('/app/data/volumeTimeSeries.json')
          .then(function(response) {
            return response.data;

        });
      },
      showMargin: function() {
        return $http.get('/app/data/marginTimeSeries.json')
          .then(function(response) {
            return response.data;
        });
      },
      showProfit: function() {
        return $http.get('/app/data/profitTimeSeries.json')
          .then(function(response) {
            return response.data;

        });
      },
      showTrans: function() {
        return $http.get('/app/data/transactionsTimeSeries.json')
          .then(function(response) {
            return response.data;

        });
      },
      showImpact: function() {
        return $http.get('/app/data/impactTimeSeries.json')
          .then(function(response) {
            return response.data;
        });
      }

    }
  });
