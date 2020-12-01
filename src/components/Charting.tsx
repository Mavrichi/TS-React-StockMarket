import { getDistance } from "@amcharts/amcharts4/.internal/core/utils/Math";
import React, { useState, useEffect, MouseEvent } from "react";
import { Line } from "react-chartjs-2";
import StockChart from "./ChartLogic";
//import ChartPoint, { Chart } from "chart.js";
interface Props {
   userSymbol: string;
}
const Charting: React.FC<Props> = ({ userSymbol }) => {
   const [StockData, setStockData] = useState<stocktype[]>();
   const [mainUrl, setMainUrl] = useState<string>("");
   const [startTimeStamp, setStartTimeStamp] = useState<number>(1577836800);
   const [resolution, setResolution] = useState<string>("D");
   function symbolUrl(): string {
      return `https://finnhub.io/api/v1/stock/candle?symbol=${userSymbol}&resolution=${resolution}&from=${startTimeStamp}&to=${Math.floor(
         Date.now() / 1000
      )}&token=butpoev48v6skju275a0`;
   }

   interface stocktype {
      c: string; // close price
      o: string; // open price
      h: string; // high price
      l: string; // low price
      v: string; // volume
      t: string; // timestamp
   }
   const handleDateChange = (timestamp: string) => (event: any) => {
      let newStamp: number;
      const currDate: number = Math.floor(Date.now() / 1000);
      if (timestamp === "1D") {
         //calculeaza current date - o zi
         newStamp = currDate - 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setResolution("5");
      }
      if (timestamp === "5D") {
         newStamp = currDate - 5 * 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setResolution("30");
      }
      if (timestamp === "1W") {
         newStamp = currDate - 7 * 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setResolution("60");
      }
      if (timestamp === "1M") {
         newStamp = currDate - 30 * 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setResolution("D");
      }
      if (timestamp === "6M") {
         newStamp = currDate - 6 * 30 * 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setResolution("D");
      }
      if (timestamp === "1Y") {
         newStamp = currDate - 12 * 30 * 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setResolution("D");
      }
      if (timestamp === "5Y") {
         newStamp = currDate - 5 * 12 * 30 * 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setResolution("M");
      }
      //let newUrl: string = `https://finnhub.io/api/v1/stock/candle?symbol=${userSymbol}&resolution=D&from=${startTimeStamp}&to=${currDateInUnix}&token=butpoev48v6skju275a0`;

      //setMainUrl(newUrl);
   };
   const getDate: any = (UNIX: number) => {
      var a = new Date(UNIX * 1000);
      // var months = [
      //    "Jan",
      //    "Feb",
      //    "Mar",
      //    "Apr",
      //    "May",
      //    "Jun",
      //    "Jul",
      //    "Aug",
      //    "Sep",
      //    "Oct",
      //    "Nov",
      //    "Dec",
      // ];
      var year = a.getFullYear();
      var month = 1 + a.getMonth();
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      // var sec = a.getSeconds();
      //var time = date + "-" + month + "-" + year; // + " " + hour + ":" + min + ":" + sec;
      var time = year + "-" + month + "-" + date + "-" + hour + "-" + min; // + " " + hour + ":" + min + ":" + sec;
      console.log("time is ", time, "unix is ", UNIX);
      return time;
   };
   useEffect(() => {
      async function fetcher() {
         console.log(symbolUrl());
         // if (mainUrl === undefined)
         await fetch(symbolUrl())
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

               setStockData(datanoua);
            });
      }
      fetcher();
   }, [userSymbol, startTimeStamp]);
   return (
      <div className="charting">
         <div>
            <button id="1D" onClick={handleDateChange("1D")}>
               1 Day
            </button>
            <button id="5D" onClick={handleDateChange("5D")}>
               5 Days
            </button>
            <button id="1W" onClick={handleDateChange("1W")}>
               1 Week
            </button>
            <button id="1M" onClick={handleDateChange("1M")}>
               1 Month
            </button>
            <button id="6M" onClick={handleDateChange("6M")}>
               6 Months
            </button>
            <button id="1Y" onClick={handleDateChange("1Y")}>
               1 Year
            </button>
            <button id="5Y" onClick={handleDateChange("5Y")}>
               5 Years
            </button>
         </div>
         <StockChart StockData={StockData} />
      </div>
   );
};

export default Charting;
