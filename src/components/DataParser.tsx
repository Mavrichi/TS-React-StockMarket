import React, { useState, useEffect, MouseEvent } from "react";
import StockChart from "./ChartLogic";
interface Props {
   userSymbol: string;
   correctInput: boolean;
}
const DataParser: React.FC<Props> = ({ userSymbol, correctInput }) => {
   const [StockData, setStockData] = useState<stocktype[]>();
   const [companyName, setCompanyName] = useState<string>();
   const [companyLogoUrl, setCompanyLogoUrl] = useState<string>("");
   const [companyWebsite, setCompanyWebsite] = useState<string>();
   const [startTimeStamp, setStartTimeStamp] = useState<number>(1577836800);
   const [resolution, setResolution] = useState<string>("D");
   const [averageLine, setAverageLine] = useState<boolean>(false);

   interface stocktype {
      c: string; // close price
      o: string; // open price
      h: string; // high price
      l: string; // low price
      v: string; // volume
      t: string; // timestamp
      avg: number; //average point
   }
   const handleAverageShow = () => (event: MouseEvent) => {
      setAverageLine(!averageLine);
   };
   const handleDateChange = (timestamp: string) => (event: MouseEvent) => {
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
         setResolution("30");
      }
      if (timestamp === "1M") {
         newStamp = currDate - 30 * 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setResolution("30");
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
         setResolution("W");
      }
   };
   const getDate = (UNIX: number) => {
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
      var time = year + "-" + month + "-" + date + "-" + hour + "-" + min; // + " " + hour + ":" + min + ":" + sec;
      return time;
   };
   useEffect(() => {
      let sum: number;
      let index: number;
      function symbolUrl(): string {
         return `https://finnhub.io/api/v1/stock/candle?symbol=${userSymbol}&resolution=${resolution}&from=${startTimeStamp}&to=${Math.floor(
            Date.now() / 1000
         )}&token=butpoev48v6skju275a0`;
      }
      const urlCompanyDescription = `https://finnhub.io/api/v1/stock/profile2?symbol=${userSymbol}&token=butpoev48v6skju275a0`;

      async function fetchCandleData() {
         sum = 0;
         index = 0;
         await fetch(urlCompanyDescription)
            .then((res) => res.json())
            .then((data) => {
               setCompanyName(data.name);
               setCompanyLogoUrl(data.logo);
               setCompanyWebsite(data.weburl);
               console.log("data este", data);
            });
         await fetch(symbolUrl())
            .then((res) => res.json())
            .then((data) => {
               const resData = data.c.map(function (
                  c: number,
                  i: number,
                  o: number,
                  h: number,
                  l: number
               ) {
                  index++;
                  sum += data.c[i];
                  return {
                     date: getDate(data.t[i]),
                     open: data.o[i].toString(),
                     high: data.h[i].toString(),
                     low: data.l[i].toString(),
                     close: data.c[i].toString(),

                     average: (sum / index).toString(),
                  };
               });

               setStockData(resData);
            });
      }
      fetchCandleData();
   }, [userSymbol, startTimeStamp, resolution]);
   return (
      <div className="DataParserMain">
         {correctInput ? (
            <div className="charting">
               <div className="companyInfo">Name: {companyName}</div>
               <a href={companyWebsite}>
                  <img src={companyLogoUrl} className="companyInfo"></img>
               </a>
               <a href={companyWebsite} className="companyInfo">
                  Website: {companyWebsite}
               </a>
               <div className="buttonList">
                  <button
                     id="1D"
                     className="button1"
                     onClick={handleDateChange("1D")}
                  >
                     1 Day
                  </button>
                  <button
                     id="5D"
                     className="button2"
                     onClick={handleDateChange("5D")}
                  >
                     5 Days
                  </button>
                  <button
                     id="1W"
                     className="button1"
                     onClick={handleDateChange("1W")}
                  >
                     1 Week
                  </button>
                  <button
                     id="1M"
                     className="button2"
                     onClick={handleDateChange("1M")}
                  >
                     1 Month
                  </button>
                  <button
                     id="6M"
                     className="button1"
                     onClick={handleDateChange("6M")}
                  >
                     6 Months
                  </button>
                  <button
                     id="1Y"
                     className="button2"
                     onClick={handleDateChange("1Y")}
                  >
                     1 Year
                  </button>
                  <button
                     id="5Y"
                     className="button1"
                     onClick={handleDateChange("5Y")}
                  >
                     5 Years
                  </button>
                  {averageLine ? (
                     <button className="button4" onClick={handleAverageShow()}>
                        Hide average line
                     </button>
                  ) : (
                     <button className="button3" onClick={handleAverageShow()}>
                        Show average line
                     </button>
                  )}
               </div>
               <StockChart StockData={StockData} averageLine={averageLine} />
            </div>
         ) : (
            <div className="Loading">
               Sorry , couldn't find a company with this symbol
            </div>
         )}
      </div>
   );
};

export default DataParser;
