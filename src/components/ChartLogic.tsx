import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ReactComponentElement } from "react";
import React, { useEffect } from "react";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
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
}
const StockChart: React.FC<Props> = ({ StockData }) => {
   useEffect(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.paddingRight = 20;

      chart.dateFormatter.inputDateFormat = "yyyy-MM-dd-hh-mm";

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      if (valueAxis.tooltip != undefined) {
         valueAxis.tooltip.disabled = true;
      }

      let series = chart.series.push(new am4charts.CandlestickSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "close";
      series.dataFields.openValueY = "open";
      series.dataFields.lowValueY = "low";
      series.dataFields.highValueY = "high";
      //series.dataFields.volumeValueY = "Volume";
      series.simplifiedProcessing = true;
      series.tooltipText =
         "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}";

      chart.cursor = new am4charts.XYCursor();

      // a separate series for scrollbar
      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.dateX = "date";
      lineSeries.dataFields.valueY = "close";
      // need to set on default state, as initially series is "show"
      lineSeries.defaultState.properties.visible = false;

      // hide from legend too (in case there is one)
      lineSeries.hiddenInLegend = true;
      lineSeries.fillOpacity = 0.5;
      lineSeries.strokeOpacity = 0.5;

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(lineSeries);
      chart.scrollbarX = scrollbarX;
      console.log("Valoarea stockdata este", StockData);
      if (StockData !== undefined) {
         chart.data = StockData;
      }
      //chart.current = chart;

      return () => {
         chart.dispose();
      };
   }, [StockData]);

   return <div id="chartdiv" style={{ width: "100%", height: "100%" }}></div>;
};
export default StockChart;
