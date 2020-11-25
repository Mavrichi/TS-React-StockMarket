import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./components/MainComponent";
import WS from "./components/WS";
import { Line } from "react-chartjs-2";
import ChartPoint, { Chart } from "chart.js";

function App() {
   const [variabila, setVariabila] = useState<number[] | undefined>();

   const datavector: number[] | undefined = [
      12,
      45,
      12,
      55,
      63,
      53,
      23,
      67,
      56,
      88,
   ];
   useEffect(() => {
      setVariabila(datavector);
   }, []);

   return (
      <div className="App">
         <Main></Main>
         {/* <WS></WS> */}
      </div>
   );
}

export default App;
