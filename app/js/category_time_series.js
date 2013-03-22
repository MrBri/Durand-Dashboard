/* Creates the line graph using time charts.
 *
 */

//Setup the array which contains attributes for the data points
charts.setDataObj = function(data, graphLabel) {

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
    else if (data[i] < charts.target[graphLabel]) {
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

//Setup options for graph
charts.setupGraph = function(data, graphLabel) {
  var options = charts.lineGraphOptions();
  options.series = [];
  var plotLineProperties = charts.lineGraphYProps(graphLabel);
  options.yAxis.plotLines = [];
  options.yAxis.plotLines.push(plotLineProperties);
  var seriesObj = {};
  seriesObj["data"] = charts.setDataObj(data, graphLabel);
  options.series.push(seriesObj);
  debugger;
  charts.createChart(options);

};

//Load data file into arrays
charts.setupLineGraph = function(data) {

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
      charts.target['sales'] = data[item]['sales'];
      charts.target['volume'] = data[item]['volume'];
      charts.target['margin'] = data[item]['margin'];
      charts.target['profit'] = data[item]['profit'];
      charts.target['transactions'] = data[item]['transactions'];
      charts.target['impact'] = data[item]['impact'];
      continue;
    }

    sales.push(data[item]['sales']);
    volume.push(data[item]['volume']);
    margin.push(data[item]['margin']);
    profit.push(data[item]['profit']);
    transactions.push(data[item]['transactions']);
    impact.push(data[item]['impact']);
  }

  //load graphs - only one shown for now
  // setupGraph(sales, 'sales');
  // setupGraph(volume, 'volume');
  charts.setupGraph(margin, 'margin');
  // setupGraph(profit);
  // setupGraph(transactions);
  // setupGraph(impact);

};

//Store target data
charts.target = {};

//Load the data then create the chart
charts.loadDataFile('/app/data/mod_category_linechart.js', charts.setupLineGraph);
