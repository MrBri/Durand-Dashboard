/* Creates the line graph using time charts.
 *
 */

var setDataObj = function(data, graphLabel) {

  var dataArr = [];

  for (var i=0; i < data.length; i++) {
    var dataObj = {};
    var propertyObj = {};
    propertyObj['radius'] = charts.settings.POINT_RADIUS;
    dataObj["y"] = data[i];
    if (data[i] < 0) {
      propertyObj['fillColor'] = charts.settings.NEGATIVE_COLOR;
      dataObj["marker"] = propertyObj;
    }
    else if (data[i] < target[graphLabel]) {
      var obj = {};
      propertyObj['fillColor'] = charts.settings.WARNING_COLOR;
      dataObj["marker"] = propertyObj;
    }
    else {
      propertyObj['fillColor'] = charts.settings.POSITIVE_COLOR;
      dataObj["marker"] = propertyObj;
    }
    dataArr.push(dataObj);
  }

  return dataArr;
};

var setupGraph = function(data, graphLabel) {
  var options = charts.lineGraphOptions();
  options.series = [];
  options.yAxis.plotLines.push({
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
  });
  var seriesObj = {};
  seriesObj["data"] = setDataObj(data, graphLabel);
  options.series.push(seriesObj);
  charts.createChart(options);

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
  // setupGraph(sales, 'sales');
  // setupGraph(volume, 'volume');
  setupGraph(margin, 'margin');
  // setupGraph(profit);
  // setupGraph(transactions);
  // setupGraph(impact);

};

//Store target data
var target = {};

//Load the data file
$.ajax({
  url: '../../data/mod_category_linechart.js',
  success: function(data) {
    loadDataFile(data);
  },
  error: function() {
    console.log("ERROR loading data!");
  }
});
