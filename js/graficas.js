var Graficas = function (){
  var pastelV1 = function()
  {
    var chart = am4core.create("chartPastel", am4charts.PieChart);

    chart.data =
        [{
          "proyecto": "Feria del Mezcal",
          "valor": 10
      }, {
          "proyecto": "Feria del Tejate",
          "valor": 20
      }, {
          "proyecto": "Feria de la Tlayuda",
          "valor": 10
      }, {
          "proyecto": "FILO",
          "valor": 60
      }];

  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "valor";
  pieSeries.dataFields.category = "proyecto";

  chart.legend = new am4charts.Legend();

  pieSeries.colors.list = [
  am4core.color("#fbaf2c"),
  am4core.color("#8bc63e"),
  am4core.color("#d8117a"),
  am4core.color("#21a193"),
  am4core.color("#d2d2d2"),
  am4core.color("#f26021"),
  ];
}

var barrasV1 = function(){
    var chart = am4core.create("chartBarras", am4charts.XYChart);
    
    chart.data = [{
        "category": "Población economicamente activa",
        "value": 12.5
    }, {
        "category": "Empresas",
        "value": 6
    }, {
        "category": "Emprendedores",
        "value": 30
    }];
    chart.colors.list = [
    am4core.color("#845EC2"),
    am4core.color("#D65DB1"),
    am4core.color("#FF6F91"),
    am4core.color("#FF9671"),
    am4core.color("#FFC75F"),
    am4core.color("#F9F871"),
    ];
    
    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "category";
    series.name = "Sales";


    chart.exporting.menu               = new am4core.ExportMenu();
    chart.exporting.menu.align         = "left";
    chart.exporting.menu.verticalAlign = "top";
    chart.exporting.menu.items         = [
    {
      "label"                            : "...",
      "menu"                             : [
      { "type"                           : "png", "label": "PNG" },
      { "type"                           : "pdf", "label": "PDF" },
      { "label"                          : "Imprimir", "type": "print" },
      { "type"                           : "jpg", "label": "JPG" }
      ]
  }
  ];

}
var chartBarrasv2 = function() {
    am4core.useTheme(am4themes_animated);
     var chart = am4core.create("chartBarrasv2", am4charts.XYChart);

    chart.data = [{
      "year": 2016,
      "empresas": 24,
      "emprendedores": 130
    },{
      "year": 2017,
      "empresas": 30,
      "emprendedores": 120
    },{
      "year": 2018,
      "empresas": 45,
      "emprendedores": 100
    },{
      "year": 2019,
      "empresas": 60,
      "emprendedores": 90
    }];

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "year";
categoryAxis.numberFormatter.numberFormat = "#";
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.cellStartLocation = 0.1;
categoryAxis.renderer.cellEndLocation = 0.9;

var  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
valueAxis.renderer.opposite = true;

var range = categoryAxis.axisRanges.create();
range.axisFill.fillOpacity = 0.3;
range.axisFill.fill = chart.colors.getIndex(6);
range.label.disabled = true;
range.grid.disabled = true;

function createSeries(field, name) {
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueX = field;
  series.dataFields.categoryY = "year";
  series.name = name;
  series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
  series.columns.template.height = am4core.percent(100);
  series.sequencedInterpolation = true;
  
  series.columns.template.events.on("hit", function(event){
    var dataItem = event.target.dataItem;
    range.category = dataItem.categoryY;
    categoryAxis.invalidateDataItems();

})

  var valueLabel = series.bullets.push(new am4charts.LabelBullet());
  valueLabel.label.text = "{valueX}";
  valueLabel.label.horizontalCenter = "left";
  valueLabel.label.dx = 10;
  valueLabel.label.hideOversized = false;
  valueLabel.label.truncate = false;

  var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
  categoryLabel.label.text = "{name}";
  categoryLabel.label.horizontalCenter = "right";
  categoryLabel.label.dx = -10;
  categoryLabel.label.fill = am4core.color("#fff");
  categoryLabel.label.hideOversized = false;
  categoryLabel.label.truncate = false;
}

createSeries("empresas", "Empresas");
createSeries("emprendedores", "Emprendedores");

}

return {
    init: function() {

        pastelV1();
        barrasV1();
        chartBarrasv2();
    }

};

}();

