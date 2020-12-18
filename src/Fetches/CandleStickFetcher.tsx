import React, { useEffect, useState } from "react";
import StockChart from "../components/ChartLogic";
interface Props {
   symbolUrl: string;
   averageLine: boolean;
}
interface stocktype {
   c: string; // close price
   o: string; // open price
   h: string; // high price
   l: string; // low price
   v: string; // volume
   t: string; // timestamp
   avg: number; //average point
}
const CandleSticksFetcher: React.FC<Props> = ({ symbolUrl, averageLine }) => {
   const [StockData, setStockData] = useState<stocktype[]>();

   const getDate = (UNIX: number) => {
      var a = new Date(UNIX * 1000);
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
      async function fetchCandleData() {
         sum = 0;
         index = 0;
         console.log("Symbol url in CandleFetcher este", symbolUrl);

         let newUrl = symbolUrl;
         await fetch(newUrl)
            .then((res) => res.json())
            .then((data) => {
               if (data.c !== undefined) {
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
               } else
                  window.alert(
                     "Din pacate APi-ul nu are date pentru perioada selectata , va rugam schimbati perioada de timp"
                  );
            });
      }
      fetchCandleData();
   }, [symbolUrl]);
   return <StockChart StockData={StockData} averageLine={averageLine} />;
};

export default CandleSticksFetcher;
