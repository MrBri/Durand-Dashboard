/* Creates the bar charts for the Category and Brands pages
 *
 * */

charts.setupBrandBarDataObj = function(data, name) {

  var dataArr = [];
  for (var i=0; i < data[name].length; i++) {
    var dataObj = {};
    dataObj["y"] = data[name][i];
    dataObj["pointWidth"] = charts.settings.BAR_WIDTH;

    debugger;
    if (data["color"][i] === "NEGATIVE_COLOR_LIGHT") {
      dataObj["color"] = {linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
                         stops: [[0, charts.settings.NEGATIVE_COLOR_LIGHT],
                               [1, charts.settings.NEGATIVE_COLOR]]
                         }
    }
    else if (data["color"][i] === "WARNING_COLOR_LIGHT") {
      dataObj["color"] = {linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
                         stops: [[0, charts.settings.WARNING_COLOR_LIGHT],
                               [1, charts.settings.WARNING_COLOR]]
                         }
    }
    else {
      dataObj["color"] = {linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
                         stops: [[0, charts.settings.POSITIVE_COLOR_LIGHT],
                               [1, charts.settings.POSITIVE_COLOR]]
                         };
    }
    dataArr.push(dataObj);
  }


  return dataArr;
};

charts.drawBrandColumn = function(data, $container, colNumber) {

  var graphOptions = charts.barOptions();
  graphOptions.chart.renderTo = $container[colNumber];
  graphOptions.series = [];

  //Create part 1 of the stacked column for MIN value
  var seriesObj = {};
  seriesObj["data"] = charts.setupBrandBarDataObj(data, "min");

  //debugger;
  //var average = charts.getAverage(data);

  //Setup the plog lines
  graphOptions.plotOptions = {
    series: {
      stacking: 'normal',
      shadow: false,
      borderWidth: 0
    }
  };

  //TODO - take out plot line or move it
  graphOptions.yAxis.plotLines = [{
    color: 'grey',
      width: 1,
      value: 0,
      dashStyle: 'dash'
  },
  {
    color: 'black',
      width: 1.5,
      value: 0,
      dashStyle: 'line'
  }];

  graphOptions.series.push(seriesObj);

  var secondSeriesObj = {};

  //Create part 2 of the stacked column for MAX value
  secondSeriesObj["data"] = charts.setupBrandBarDataObj(data, "max");
  graphOptions.series.push(secondSeriesObj);

  var chart = charts.createChart(graphOptions);
};

charts.getBrandBarColor = function(data) {
 var colors = [];

 for (var i=0; i<data["min"].length; i++) {
   if (data["min"][i] > 0) {
     colors[i] = "POSITIVE_COLOR_LIGHT";
   }
   else if ((data["min"][i] > 0) && (data["max"][i] > 0)) {
     colors[i] = "WARNING_COLOR_LIGHT";
   }
   else {
     colors[i] = "NEGATIVE_COLOR_LIGHT";
   }
 }

 return colors;
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
    if ((data[item]['Category'] === category) || (category === undefined)) {
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
  sales["color"] = charts.getBrandBarColor(sales);

  var volume = {};
  volume["min"] = volSalesMin;
  volume["max"] = volSalesMax;
  volume["mean"] = volSalesMean;
  volume["color"] = charts.getBrandBarColor(volume);

  var margin = {};
  margin["min"] = marSalesMin;
  margin["max"] = marSalesMax;
  margin["mean"] = marSalesMean;
  margin["color"] = charts.getBrandBarColor(margin);

  var $container =  $('.data');
  charts.drawBrandColumn(sales, $container, 0);
  charts.drawBrandColumn(volume, $container, 1);
  debugger;
  charts.drawBrandColumn(margin, $container, 2);
};


//Load data files and begin creating the bar graphs
//charts.loadDataFile('/app/data/mod_category_data_inc.js', charts.setupBarGraph);
charts.loadDataFile('../../data/mod_brand_data.js', charts.setupBrandBarData);

