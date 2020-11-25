import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import ChartPoint, { Chart } from "chart.js";
interface Props {
   userSymbol: string;
}
const Charting: React.FC<Props> = ({ userSymbol }) => {
   const [variabila, setVariabila] = useState<number[] | undefined>();
   //    const [UserSymbol, setUserSymbol] = useState<string>();
   //    setUserSymbol(userSymbol);
   const symbolUrl: string = `https://finnhub.io/api/v1/stock/candle?symbol=${userSymbol}&resolution=1&from=1605543327&to=1605629727&token=butpoev48v6skju275a0`;

   interface datatype {
      c: number; // close price
      o: number; // open price
      h: number; // high price
      l: number; // low price
      v: number; // volume
      t: number; // timestamp
      s: string; // api message
   }
   useEffect(() => {
      console.log("Symbolul ales este", userSymbol);
      async function fetcher() {
         await fetch(symbolUrl)
            .then((res) => res.json())
            .then((data) => {
               console.log(data);
               // const dataMap = data.map((e: datatype) => e.s);
               setVariabila(data.o);
            });
      }
      fetcher();
   }, []);
   return (
      <div className="charting">
         <Line
            data={{
               labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
               datasets: [
                  {
                     label: "Price",
                     data: variabila,
                     backgroundColor: "red",
                     fill: "false",
                  },
               ],
            }}
            width={1000}
            height={500}
            options={{ maintainAspectRatio: false }}
         />
      </div>
   );
};

export default Charting;
