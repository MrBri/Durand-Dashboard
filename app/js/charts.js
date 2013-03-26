/* Settings and utility functions for creating bar/line graphs using
 * High Charts
 * */

var charts = {};

//Commonly used settings.
charts.settings = {
  NEGATIVE_COLOR:  '#F77B00',
  NEGATIVE_COLOR_LIGHT:  '#C35B00',
  WARNING_COLOR:  '#FDBA30',
  WARNING_COLOR_LIGHT:  '#E89C01',
  POSITIVE_COLOR:  '#007ABE',
  POSITIVE_COLOR_LIGHT:  '#006095',
  POINT_RADIUS: 8,
  BAR_WIDTH: 15,
  TARGET_COLOR_GREEN: '#8DC63F'
};

//Default options for the bar graph
charts.barOptions = function() {
  var defaultOptions = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
      //Fix - these need to be recalculated depending
      //on screen size.
      width: 100,
      height: 376
    },
    title: {
      text: ''
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        shadow: false,
        pointPadding: -1,
        groupPadding: -1,
        pointWidth: 20,
        dataLabels: {
          enabled: true
        }
      }
    },
    xAxis: {
      labels: {
        enabled: false
      },
      tickLength: 0,
      lineWidth: 0

    },
    yAxis: {
      gridLineWidth: 0,
      tickLength: 0,
      labels: {
        enabled: false
      },
      title: {
        text: ''
      },
      lineWidth: 0,
    },
    legend: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    series: [{}]
  };

  return defaultOptions;
};

//Default options for the line graph
charts.lineGraphOptions = function() {
  var defaultOptions = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'spline',
      backgroundColor: 'transparent',
      renderTo: 'time-series',
      height: 130
    },
    title: {
      text: ''
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        shadow: false
      }
    },
    xAxis: {
      labels: {
        enabled: true
      },
      tickLength: 0,
      categories: ['Sep', 'Oct', 'Nov','Dec',
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug']
    },
    yAxis: {
      gridLineWidth: 1,
      tickLength: 0,
      title: {
        text: ''
      },
      plotLines: []
    },
    legend: {
      enabled: false
    },
    series: [{}]
  };
  return defaultOptions;
};

//Properties for the Y Axis of the Line Graph
charts.lineGraphYProps = function(graphLabel) {
  var properties = {
    color: charts.settings.TARGET_COLOR_GREEN,
    value: charts.target[graphLabel],
    width: 2,
    dashStyle: 'dash',
    label: {
      text: 'Target',
      style: {
        color: charts.settings.TARGET_COLOR_GREEN
      }
    }
  };
  return properties;
};

//Create a graph with passed in options
charts.createChart = function(options) {
  var chart = new Highcharts.Chart(options);
};


//Return the average of a passed in array
charts.getAverage = function(data) {
    return _.reduce(data, function(memo, num) {
      return memo + num;
    }, 0) / data.length;
};

//Load data file and convert it to an object
// charts.loadDataFile = function(filepath, callback) {
//   $.ajax({
//     url: filepath,
//     success: function(result) {
//       var data = JSON.parse(result);
//       console.log('data from ajax', data);
//       callback(data);
//     },
//     error: function() {
//       console.log("ERROR loading data!");
//     }
//   });
// };
