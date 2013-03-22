var $containers = $('div.data');
var NEGATIVE_COLOR = '#D7772A';
var WARNING_COLOR = '#E9AA35';
var POSITIVE_COLOR = '#206CA3';

//Default options for the Category Barcharts
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

var getAverage = function(data) {

  var average = 0;
  for (var j=0; j < data.length; j++) {
    average += data[j];
  }
  return average = average / data.length;

}
//Sets the size, color, and datapoint of the data array
var setDataObj = function(data) {

  var dataArr = [];
  var average = getAverage(data);

  for (var i=0; i < data.length; i++) {
    var dataObj = {};
    dataObj["y"] = data[i];
    dataObj["pointWidth"] = 25;
    if (data[i] < 0) {
      dataObj["color"] = NEGATIVE_COLOR;
    }
    else if (data[i] < average) {
      dataObj["color"] = WARNING_COLOR;
    }
    else {
      dataObj["color"] = POSITIVE_COLOR;
    }
    dataArr.push(dataObj);
  }

  return dataArr;
};

var drawColumn = function(title, data, colNumber) {

  options.title.text = title;
  options.chart.renderTo = $containers[colNumber];
  options.series = [];
  var seriesObj = {};
  seriesObj["data"] = setDataObj(data);

  options.series.push(seriesObj);
  createChart(options);
  console.log(options.series);
};

var loadDataFile = function(string) {
  var brands = JSON.parse(string);

  var salesData = [];
  var marginData = [];
  var volumeData = [];
  var profitData = [];
  var transactionsData = [];
  var impactData = [];
  var count = 0;

  //Load up data in proper arrays
  for (var item in brands) {
    if (brands[item]['id'] === null) {
      continue;
    }

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
  url: '../../data/mod_category_data_inc.js',
  success: function(data) {
    loadDataFile(data);
  },
  error: function() {
    console.log("ERROR loading data!");
  }
});

