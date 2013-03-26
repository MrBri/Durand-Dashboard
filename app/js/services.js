'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.1')
  .service('AverageSvc', function() {
    console.log("Average svc called");
    this.calc = function(data) {
      console.log("In calc");
      var averages = [];
      averages[0] = 0;
      averages[1] = 0;
      averages[2] = 0;

      for (var key in data) {
        averages[0] += data[key]['IncSalesMean'];
        averages[1] += data[key]['VolSalesMean'];
        averages[2] += data[key]['MarSalesMean'];
      }
      return averages;
    }

  });
