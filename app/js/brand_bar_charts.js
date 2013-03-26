/* Creates the bar charts for the Brand Page
 * */

charts.setupBrandBarDataObj = function(data, name) {

  var dataArr = [];
  for (var i=0; i < data[name].length; i++) {
    var dataObj = {};
    dataObj["y"] = data[name][i];
    dataObj["pointWidth"] = charts.settings.BAR_WIDTH;

    //Set bar color and data label for Negative color
    if (data["color"][i] === "NEGATIVE_COLOR_LIGHT") {
      dataObj["color"] = {linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
        stops: [[0, charts.settings.NEGATIVE_COLOR_LIGHT],
        [1, charts.settings.NEGATIVE_COLOR]]
      }
      if (name === "max") {
        var labelDistance = 0;
        if (dataObj["y"] > 99) {
          labelDistance = 35;
        }
        else {
          labelDistance = 25;
        }

        dataObj["dataLabels"] = {
          enabled: true,
          align: 'right',
          x: labelDistance
        };
      }
    }

    else if (data["color"][i] === "WARNING_COLOR_LIGHT") {
      dataObj["color"] = {linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
        stops: [[0, charts.settings.WARNING_COLOR_LIGHT],
        [1, charts.settings.WARNING_COLOR]]
      }
      if (name === "max") {
        console.log("Warning color");
        var labelDistance = 0;
        if (dataObj["y"] > 99) {
          labelDistance = 35;
        }
        else {
          labelDistance = 25;
        }

        dataObj["dataLabels"] = {
          enabled: true,
          align: 'right',
          x: labelDistance
        };
      }

    }
    else {
      dataObj["color"] = {linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
        stops: [[0, charts.settings.POSITIVE_COLOR_LIGHT],
        [1, charts.settings.POSITIVE_COLOR]]
      };
      if (name === "max") {
        var labelDistance = 0;
        if (dataObj["y"] > 99) {
          labelDistance = 35;
        }
        else {
          labelDistance = 25;
        }

        dataObj["dataLabels"] = {
          enabled: true,
          align: 'right',
          x: labelDistance
        };
      }
    }
    dataArr.push(dataObj);
  }


  return dataArr;
};

charts.drawBrandColumn = function(data, $container, colNumber) {

  //get default graph options
  var graphOptions = charts.barOptions();

  graphOptions.chart.renderTo = $container[colNumber];
  graphOptions.series = [];

  //Create part 1 of the stacked column for MIN value
  var seriesObj = {};
  seriesObj["data"] = charts.setupBrandBarDataObj(data, "min");

  //Setup the plot lines
  graphOptions.plotOptions = {
    series: {
      stacking: 'normal',
      shadow: false,
      borderWidth: 0,
    }
  };

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

  //Export the JSON info
  graphOptions.chart.renderTo = "durand1";
  var stringified = JSON.stringify(graphOptions);

  //Create the graph
  var chart = charts.createChart(graphOptions);
};

//Set the color of the bars depending on the min/max values
charts.setBrandBarColor = function(data) {
  var colors = [];

  for (var i=0; i<data["min"].length; i++) {
    if (data["min"][i] > 0) {
      colors[i] = "POSITIVE_COLOR_LIGHT";
    }
    else if ((data["min"][i] <= 0) && (data["max"][i] > 0)) {
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
  sales["color"] = charts.setBrandBarColor(sales);

  var volume = {};
  volume["min"] = volSalesMin;
  volume["max"] = volSalesMax;
  volume["mean"] = volSalesMean;
  volume["color"] = charts.setBrandBarColor(volume);

  var margin = {};
  margin["min"] = marSalesMin;
  margin["max"] = marSalesMax;
  margin["mean"] = marSalesMean;
  margin["color"] = charts.setBrandBarColor(margin);

  var $container =  $('.data');
  charts.drawBrandColumn(sales, $container, 0);
  charts.drawBrandColumn(volume, $container, 1);
  charts.drawBrandColumn(margin, $container, 2);
};


//Load data files and begin creating the bar graphs
//charts.loadDataFile('/app/data/mod_category_data_inc.js', charts.setupBarGraph);
charts.loadDataFile('../../data/mod_brand_data.js', charts.setupBrandBarData);

