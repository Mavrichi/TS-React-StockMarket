import { getDistance } from "@amcharts/amcharts4/.internal/core/utils/Math";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import StockChart from "./ChartLogic";
//import ChartPoint, { Chart } from "chart.js";
interface Props {
   userSymbol: string;
}
const Charting: React.FC<Props> = ({ userSymbol }) => {
   const [StockData, setStockData] = useState<stocktype[]>();
   const symbolUrl: string = `https://finnhub.io/api/v1/stock/candle?symbol=${userSymbol}&resolution=D&from=1577836800&to=1605830400&token=butpoev48v6skju275a0`;

   interface stocktype {
      c: string; // close price
      o: string; // open price
      h: string; // high price
      l: string; // low price
      v: string; // volume
      t: string; // timestamp
   }
   const getDate: any = (UNIX: number) => {
      var a = new Date(UNIX * 1000);
      var months = [
         "Jan",
         "Feb",
         "Mar",
         "Apr",
         "May",
         "Jun",
         "Jul",
         "Aug",
         "Sep",
         "Oct",
         "Nov",
         "Dec",
      ];
      var year = a.getFullYear();
      var month = a.getMonth();
      var date = a.getDate();
      var hour = a.getHours();
      // var min = a.getMinutes();
      // var sec = a.getSeconds();
      //var time = date + "-" + month + "-" + year; // + " " + hour + ":" + min + ":" + sec;
      var time = year + "-" + month + "-" + date + "-" + hour; // + " " + hour + ":" + min + ":" + sec;
      return time;
   };
   useEffect(() => {
      async function fetcher() {
         await fetch(symbolUrl)
            .then((res) => res.json())
            .then((data) => {
               const datanoua = data.c.map(function (c: number, i: number) {
                  return {
                     date: getDate(data.t[i]),
                     open: data.o[i].toString(),
                     high: data.h[i].toString(),
                     low: data.l[i].toString(),
                     close: data.c[i].toString(),
                  };
               });
               console.log("datanoua este ", datanoua);
               setStockData(datanoua);
            });
      }
      fetcher();
   }, [userSymbol]);
   return (
      <div className="charting">
         <StockChart StockData={StockData} />
      </div>
   );
};

export default Charting;
