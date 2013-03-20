/* Creates the bar charts for the Category page
 *
 * */

var getAverage = function(data) {

  var average = 0;
  for (var j=0; j < data.length; j++) {
    average += data[j];
  }
  return average = average / data.length;
}

//Setup the attributes of the data points
var setDataObj = function(data) {

  var dataArr = [];
  var average = getAverage(data);

  for (var i=0; i < data.length; i++) {
    var dataObj = {};
    dataObj["y"] = data[i];
    dataObj["pointWidth"] = 25;
    if (data[i] < 0) {
      dataObj["color"] = charts.settings.NEGATIVE_COLOR;
    }
    else if (data[i] < average) {
      dataObj["color"] = charts.settings.WARNING_COLOR;
    }
    else {
      dataObj["color"] = charts.settings.POSITIVE_COLOR;
    }
    dataArr.push(dataObj);
  }

  return dataArr;
};

var drawColumn = function(data, colNumber) {

  var graphOptions = charts.barOptions();
  graphOptions.chart.renderTo = charts.settings.$container[colNumber];
  graphOptions.series = [];
  var seriesObj = {};
  seriesObj["data"] = setDataObj(data);

  var average = getAverage(data);
  graphOptions.yAxis.plotLines = [{
    color: 'gray',
      width: 1,
      value: average,
      dashStyle: 'longdashdot'
  }];

  //! FIX - trying to get negative numbers to attach to axis
  var lowestValue = _.min(data);
  var highestValue = _.max(data);
  //graphOptions.xAxis.min = lowestValue;

  graphOptions.series.push(seriesObj);
  charts.createChart(graphOptions);
};

//Convert the data into JSON objects and store it in an array
var setupBarGraph = function(brands) {

  var salesData = [];
  var marginData = [];
  var volumeData = [];
  var profitData = [];
  var transactionsData = [];
  var impactData = [];

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

  drawColumn(salesData, 0);
  drawColumn(volumeData, 1);
  drawColumn(marginData, 2);
  drawColumn(profitData, 3);
  drawColumn(transactionsData, 4);
  drawColumn(impactData, 5);
};

//Load up data file and process it
charts.loadDataFile('../../data/mod_category_data_inc.js', setupBarGraph);
