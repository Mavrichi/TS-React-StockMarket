import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import React, { useEffect } from "react";
import { Tooltip } from "chart.js";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);
// Themes end
interface stocktype {
   c: string; // close price
   o: string; // open price
   h: string; // high price
   l: string; // low price
   v: string; // volume
   t: string; // timestamp
}
interface Props {
   StockData: stocktype[] | undefined;
   averageLine: boolean;
}
const StockChart: React.FC<Props> = ({ StockData, averageLine }) => {
   useEffect(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.paddingRight = 20;

      chart.dateFormatter.inputDateFormat = "yyyy-MM-dd-H-mm";
      // chart.colors.list = [
      //    am4core.color("#845EC2"),
      //    am4core.color("#D65DB1"),
      //    am4core.color("#FF6F91"),
      //    am4core.color("#FF9671"),
      //    am4core.color("#FFC75F"),
      //    am4core.color("#F9F871"),
      // ];

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      if (valueAxis.tooltip !== undefined) {
         valueAxis.tooltip.disabled = true;
      }

      let series = chart.series.push(new am4charts.CandlestickSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "close";
      series.dataFields.openValueY = "open";
      series.dataFields.lowValueY = "low";
      series.dataFields.highValueY = "high";
      series.simplifiedProcessing = true;
      // series.fill = am4core.color("#e88029");
      //series.stroke = am4core.color("#e88029");
      series.tooltipText =
         "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}";
      //Custom average line
      if (averageLine) {
         let series2 = chart.series.push(new am4charts.LineSeries());
         series2.dataFields.dateX = "date";
         series2.dataFields.valueY = "average";
         series2.tooltipText = "Average:${valueY}";
         series2.strokeOpacity = 1;
         series2.stroke = am4core.color("#e88029");
      }

      chart.cursor = new am4charts.XYCursor();

      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.dateX = "date";
      lineSeries.dataFields.valueY = "close";
      lineSeries.defaultState.properties.visible = false;

      lineSeries.hiddenInLegend = true;
      lineSeries.fillOpacity = 0.5;
      lineSeries.strokeOpacity = 0.5;

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(lineSeries);
      chart.scrollbarX = scrollbarX;
      if (StockData !== undefined) {
         chart.data = StockData;
      }

      return () => {
         chart.dispose();
      };
   }, [StockData, averageLine]);

   return <div id="chartdiv"></div>;
};
export default StockChart;
