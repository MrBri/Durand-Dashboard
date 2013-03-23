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
      // dataObj["color"] = charts.settings.NEGATIVE_COLOR;
      dataObj["color"] = {linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
                         stops: [[0, charts.settings.NEGATIVE_COLOR_LIGHT],
                               [1, charts.settings.NEGATIVE_COLOR]]
                         }
      // dataObj["linearGradient"] = ;
      // dataObj["stops"] = 
    }
    else if (data[i] < average) {
      dataObj["color"] = {linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
                         stops: [[0, charts.settings.WARNING_COLOR_LIGHT],
                               [1, charts.settings.WARNING_COLOR]]
                         }
    }
    else {
      dataObj["color"] = {linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
                         stops: [[0, charts.settings.POSITIVE_COLOR_LIGHT],
                               [1, charts.settings.POSITIVE_COLOR]]
                         }
    }
    dataArr.push(dataObj);
  }

  return dataArr;
};
charts.setupBrandBarDataObj = function(data, name) {

  var dataArr = [];
  for (var i=0; i < data[name].length; i++) {
    var dataObj = {};
    dataObj["y"] = data[name][i];
    dataObj["pointWidth"] = charts.settings.BAR_WIDTH;

    //if (data[i] < 0) {
      //dataObj["color"] = {linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
                         //stops: [[0, charts.settings.NEGATIVE_COLOR_LIGHT],
                               //[1, charts.settings.NEGATIVE_COLOR]]
                         //}
    //}
    //else if (data[i] < average) {
      //dataObj["color"] = {linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
                         //stops: [[0, charts.settings.WARNING_COLOR_LIGHT],
                               //[1, charts.settings.WARNING_COLOR]]
                         //}
    //}
   dataObj["color"] = {linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
                         stops: [[0, charts.settings.POSITIVE_COLOR_LIGHT],
                               [1, charts.settings.POSITIVE_COLOR]]
                         };
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

charts.drawBrandColumn = function(data, $container, colNumber) {

  var graphOptions = charts.barOptions();
  graphOptions.chart.renderTo = $container[colNumber];
  graphOptions.series = [];
  var seriesObj = {};
  seriesObj["data"] = charts.setupBrandBarDataObj(data, "min");

  //var average = charts.getAverage(data);
  graphOptions.plotOptions = {
    series: {
      stacking: 'normal',
      shadow: false,
      borderWidth: 0
    }
  };
  //graphOptions.yAxis.plotLines = [{
    //color: 'grey',
      //width: 1,
      //value: average,
      //dashStyle: 'dash'
  //},
  //{
    //color: 'black',
      //width: 1.5,
      //value: 0,
      //dashStyle: 'line'
  //}];

  //! FIX - trying to get negative numbers to attach to axis
  //var lowestValue = _.min(data);
  //var highestValue = _.max(data);
  //graphOptions.xAxis.min = lowestValue;

  graphOptions.series.push(seriesObj);

  var secondSeriesObj = {};
  secondSeriesObj["data"] = charts.setupBrandBarDataObj(data, "max");
  graphOptions.series.push(secondSeriesObj);
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
charts.setupBrandBarData = function(data, category) {
  var incSalesMin  = [],
      incSalesMax  = [],
      incSalesMean = [],
      volSalesMin  = [],
      volSalesMax  = [],
      volSalesMean = [],
      marSalesMin  = [],
      marSalesMax  = [],
      marSalesMean = [];

  //Load arrays with data which matches the selected category
  //If Category is ALL, load everything up
  for (var item in data) {
    if ((data[item]['Category'] === category) || (category === "All")) {
      incSalesMin.push(data[item]['IncSalesMin']);
      incSalesMax.push(data[item]['IncSalesMax']);
      incSalesMean.push(data[item]['IncSalesMean']);
      volSalesMin.push(data[item]['VolSalesMin']);
      volSalesMax.push(data[item]['VolSalesMax']);
      volSalesMean.push(data[item]['VolSalesMean']);
      marSalesMin.push(data[item]['MarSalesMin']);
      marSalesMax.push(data[item]['MarSalesMax']);
      marSalesMean.push(data[item]['MarSalesMean']);

    }
  }

  var sales = {};
  sales["min"] = incSalesMin;
  sales["max"] = incSalesMax;
  sales["mean"] = incSalesMean;

  var volume = {};
  volume["min"] = volSalesMin;
  volume["max"] = volSalesMax;
  volume["mean"] = volSalesMean;

  var margin = {};
  margin["min"] = marSalesMin;
  margin["max"] = marSalesMax;
  margin["mean"] = marSalesMean;

  var $container =  $('.data');

  debugger;
  charts.drawBrandColumn(sales, $container, 0);
  charts.drawBrandColumn(volume, $container, 1);
  charts.drawBrandColumn(margin, $container, 2);
};


//Load data files and begin creating the bar graphs
//charts.loadDataFile('/app/data/mod_category_data_inc.js', charts.setupBarGraph);
charts.loadDataFile('../../data/mod_brand_data.js', charts.setupBrandBarData, 5);

