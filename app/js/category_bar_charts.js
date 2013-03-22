/* Creates the bar charts for the Category and Brands pages
 *
 * */

//Setup the attributes of the data points
charts.setupBarDataObj = function(data) {

  var dataArr = [];
  var average = charts.getAverage(data);

  for (var i=0; i < data.length; i++) {
    var dataObj = {};
    dataObj["y"] = data[i];

    dataObj["pointWidth"] = charts.settings.BAR_WIDTH;
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

charts.drawColumn = function(data, $container, colNumber) {

  var graphOptions = charts.barOptions();
  graphOptions.chart.renderTo = $container[colNumber];
  graphOptions.series = [];
  var seriesObj = {};
  seriesObj["data"] = charts.setupBarDataObj(data);
  var average = charts.getAverage(data);

  graphOptions.yAxis.plotLines = [{
    color: 'grey',
      width: 1,
      value: average,
      dashStyle: 'dash'
  },
  {
    color: 'black',
      width: 1.5,
      value: 0,
      dashStyle: 'line'
  }];

  //! FIX - trying to get negative numbers to attach to axis
  //var lowestValue = _.min(data);
  //var highestValue = _.max(data);
  //graphOptions.xAxis.min = lowestValue;

  graphOptions.series.push(seriesObj);
  charts.createChart(graphOptions);
};

//Setup for incremental bar graph
charts.setupBarGraph = function(brands) {

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

  var $container = $('div.data');
  charts.drawColumn(salesData, $container, 0);
  charts.drawColumn(volumeData, $container, 1);
  charts.drawColumn(marginData, $container, 2);
  charts.drawColumn(profitData, $container, 3);
  charts.drawColumn(transactionsData, $container, 4);
  charts.drawColumn(impactData, $container, 5);
};

//setup for brand bar graphs
charts.setupBrandBarData = function(data) {
  var incSales  = [],
      incVol    = [],
      incMargin = [];

  //! TODO This is prob not the right data file
  for (var item in data) {
    incSales.push(data[item]['IncSalesMean']);
    incVol.push(data[item]['VolSalesMean']);
    incMargin.push(data[item]['MarSalesMean']);
  }

  var $container =  $('.brand-sales');
  charts.drawColumn(incSales, $container, 0);
  charts.drawColumn(incVol, $container, 1);
  charts.drawColumn(incMargin, $container, 2);
};

//Load data files and begin creating the bar graphs
charts.loadDataFile('/app/data/mod_category_data_inc.js', charts.setupBarGraph);
charts.loadDataFile('/app/data/mod_brand_data.js', charts.setupBrandBarData);
