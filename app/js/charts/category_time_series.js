// var $container = $('#durand1');

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

var setupGraph = function(data) {
  // options.chart.renderTo = $container;
  options.series = [];
  options.yAxis.plotLines = [{
    color: '#8DC63F',
    value: target['sales'],
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
  seriesObj["data"] = data;
  options.series.push(seriesObj);
  // debugger;
  createChart(options);

};

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
  // setupGraph(sales);
  // setupGraph(volume);
  // setupGraph(margin);
  setupGraph(profit);
  // setupGraph(transactions);
  // setupGraph(impact);

};