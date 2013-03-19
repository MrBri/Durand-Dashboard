var charts = [];
var $containers = $('div.data');
var datasets = [{}];
var min = -500;
var max = 1000;

var options = {
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
          tickLength: 0
        },
        yAxis: {
          gridLineWidth: 0,
          tickLength: 0,
          minorGridLineWidth: 1,
          minorGridLineColor: 'green',
          labels: {
            enabled: false 
          },
          title: {
            text: ''
          }
        },
        legend: {
          enabled: false
        },
        series: [{}]
};

var createChart = function(options) {
  var chart = new Highcharts.Chart(options);
};

var drawColumn = function(title, data, colNumber) {

  options.title.text = title; 
  options.chart.renderTo = $containers[colNumber];
  options.series = [{}];
  var dataInfo = [];
  dataInfo["data"] = data;
  dataInfo["color"] = '#206CA3';
  dataInfo["pointWidth"] = 25;
  options.series.push(dataInfo);
  createChart(options);
};

var setupFileFormat = function(string) {
  debugger;
  var fixedFormat = JSON.stringify(string);
  var brands = JSON.parse(string);

  var brandNames = [];
  var numEvents = [];
  var salesData = [];
  var marginData = [];
  var volumeData = []; 
  var profitData = [];
  var transactionsData = [];
  var impactData = [];
  var count = 0; 

  //Load up data in proper arrays
  for (var item in brands) {
    brandNames.push(brands[item]['item']);
    numEvents.push(brands[item]['numEvents']);
    salesData.push(brands[item]['sales']);
    marginData.push(brands[item]['volume']);
    volumeData.push(brands[item]['margin']);
    profitData.push(brands[item]['profit']);
    transactionsData.push(brands[item]['transactions']);
    impactData.push(brands[item]['impact']);
  }

  drawColumn('', salesData, 0);
  drawColumn('', volumeData, 1);
  drawColumn('', marginData, 2);
  drawColumn('', profitData, 3);
  drawColumn('', transactionsData, 4);
  drawColumn('', impactData, 5);
};


$.ajax({
  url: '../../data/mod_category_data_total.js',
  success: function(data) {
    console.log("SUCCESS");
    setupFileFormat(data);
  },
  error: function() {
    console.log("ERROR");
  }
});

