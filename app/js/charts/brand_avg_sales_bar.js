var getAverage = function(data) {
 var average = 0;
  for (var j=0; j < data.length; j++) {
    average += data[j];
  }
  return average = average / data.length;
};

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


var setupBrandBarGraphs = function(data) {
  var options = charts.barOptions();
  options.chart.renderTo = $('div.brand-sales');
  options.series = [];
  var seriesObj = {};
  seriesObj["data"] = setDataObj(data);

  options.series.push(seriesObj);
  charts.createChart(options);

};

//Load the data into arrays
var setupBrandBarData = function(data) {
  var incSales  = [],
      incVol    = [],
      incMargin = [];

  //! TODO This is prob not the right data file
  for (var item in data) {
    incSales.push(data[item]['IncSalesMean']);
    incVol.push(data[item]['VolSalesMean']);
    incMargin.push(data[item]['MarSalesMean']);
  }

  setupBrandBarGraphs(incSales);
  setupBrandBarGraphs(incVol);
  setupBrandBarGraphs(incMargin);
};

charts.loadDataFile('../../data/mod_brand_data.js', setupBrandBarData);
