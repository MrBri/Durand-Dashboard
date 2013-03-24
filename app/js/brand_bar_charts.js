charts.loadDataFile('/app/data/mod_brand_data.js', charts.setupBrandBarData);

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
