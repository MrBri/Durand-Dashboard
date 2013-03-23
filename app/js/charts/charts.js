/* Settings and utility functions for creating bar/line graphs using
 * High Charts
 * */

var charts = {};

//Commonly used settings.
charts.settings = {
  NEGATIVE_COLOR:  '#D7772A',
  WARNING_COLOR:  '#E9AA35',
  POSITIVE_COLOR:  '#206CA3',
  POINT_RADIUS: 8,
  BAR_WIDTH: 25,
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
      backgroundColor: 'transparent'
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
        enabled: false
      },
      tickLength: 0,
      lineWidth: 1.5,
      lineColor: 'black'

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
      renderTo: 'container',
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
      legend: {
        enabled: false
      },
      series: [{}]
    }
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
charts.loadDataFile = function(filepath, callback, category) {
  $.ajax({
    url: filepath,
    success: function(result) {
      var data = JSON.parse(result);
      callback(data, category);
    },
    error: function() {
      console.log("ERROR loading data!");
    }
  });
};
