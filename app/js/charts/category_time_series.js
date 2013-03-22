/* Create a time-series graph using High Charts.  */
var NEGATIVE_COLOR = '#D7772A';
var WARNING_COLOR = '#E9AA35';
var POSITIVE_COLOR = '#206CA3';
var POINT_RADIUS = 8;

var options = {
        credits: {
          enabled: false
        },
        chart: {
            type: 'line',
            backgroundColor: 'transparent',
            renderTo: 'container'
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
          }
        },
        legend: {
          enabled: false
        },
        series: [{}]
};

//Store target data here
var target = {};

//Get data file
$.ajax({
  url: '../../data/mod_category_linechart.js',
  success: function(data) {
    loadDataFile(data);
  },
  error: function() {
    console.log("ERROR loading data!");
  }
});

var createChart = function(options) {
  var chart = new Highcharts.Chart(options);
};

var setDataObj = function(data, graphLabel) {

  var dataArr = [];

  for (var i=0; i < data.length; i++) {
    var dataObj = {};
    var propertyObj = {};
    propertyObj['radius'] = POINT_RADIUS;
    dataObj["y"] = data[i];
    if (data[i] < 0) {
      propertyObj['fillColor'] = NEGATIVE_COLOR;
      dataObj["marker"] = propertyObj;
    }
    else if (data[i] < target[graphLabel]) {
      var obj = {};
      propertyObj['fillColor'] = WARNING_COLOR;
      dataObj["marker"] = propertyObj;
    }
    else {
      propertyObj['fillColor'] = POSITIVE_COLOR;
      dataObj["marker"] = propertyObj;
    }
    dataArr.push(dataObj);
  }

  return dataArr;
};

var setupGraph = function(data, graphLabel) {
  // options.chart.renderTo = $container;
  options.series = [];
  options.yAxis.plotLines = [{
    color: '#8DC63F',
    value: target[graphLabel],
    width: 2,
    dashStyle: 'dash',
    label: {
      text: 'Target',
      style: {
        color: '#8DC63F'
      }
    }
  }];
  var seriesObj = {};
  seriesObj["data"] = setDataObj(data, graphLabel);
  // seriesObj["data"] = data;
  options.series.push(seriesObj);
  // debugger;
  createChart(options);

};

var graphTypes = ['sales', 'volume', 'margin', 'profit', 'transactions', 'impact'];

//Load data file into arrays
var loadDataFile = function(string) {
  var data = JSON.parse(string);

  var sales = [];
  var volume = [];
  var margin = [];
  var profit = [];
  var transactions = [];
  var impact = [];

  for (var item in data) {
    if (data[item]['id'] === null) {
      continue;
    }

    //if this is target data instead of monthly data
    if (data[item]['month'] === 'Target') {
      target['sales'] = data[item]['sales'];
      target['volume'] = data[item]['volume'];
      target['margin'] = data[item]['margin'];
      target['profit'] = data[item]['profit'];
      target['transactions'] = data[item]['transactions'];
      target['impact'] = data[item]['impact'];
      continue;
    }

    sales.push(data[item]['sales']);
    volume.push(data[item]['volume']);
    margin.push(data[item]['margin']);
    profit.push(data[item]['profit']);
    transactions.push(data[item]['transactions']);
    impact.push(data[item]['impact']);
  }

  //load graphs
  // setupGraph(sales, 'sales');
  // setupGraph(volume, 'volume');
  setupGraph(margin, 'margin');
  // setupGraph(profit);
  // setupGraph(transactions);
  // setupGraph(impact);

};