import React, { useEffect, useState } from "react";
import "./MainComponent.css";
import gsap from "gsap";
import Charting from "./Charting";
import StockChart from "./ChartLogic";
const Main: React.FC = () => {
   const [searchInput, setSearchInput] = useState<string>("");
   const [transformed, setTransformed] = useState(false);
   const [symbols, setSymbols] = useState<string[]>([]);
   const symbolUrl =
      "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=butpoev48v6skju275a0";
   interface datatype {
      currency: string;
      description: string;
      displaySymbol: string;
      symbol: string;
      type: string;
   }
   useEffect(() => {
      fetch(symbolUrl)
         .then((res) => res.json())
         .then((data) => {
            const dataMap = data.map((e: datatype) => e.symbol);
            setSymbols(dataMap);
         });
   }, []);
   const [symbolOptions, setSymbolOptions] = useState<JSX.Element[]>();

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (symbols.includes(e.target.value.toUpperCase())) {
         if (transformed) {
            gsap.to(".App", { justifyContent: "start" });
         }
         setSearchInput(e.target.value.toUpperCase());
         setTransformed(true);
      }
   };

   const SymbolList = () => {
      const rows = [];
      for (var i = 0; i < symbols.length; i++) {
         rows.push(
            <option key={i} value={symbols[i]}>
               {symbols[i]}
            </option>
         );
      }

      return rows;
   };

   return (
      <div className="MainDiv">
         <form>
            <label htmlFor="browser">Choose a symbol:</label>
            <input
               list="browsers"
               name="browser"
               id="browser"
               onChange={handleSearch}
            ></input>
            <datalist id="browsers" className="InputArea">
               {SymbolList()}
            </datalist>
         </form>
         <div className="MiddleSection">
            {transformed ? (
               <Charting userSymbol={searchInput} />
            ) : (
               <div>...Loading chart</div>
            )}
            {/* <Charting userSymbol={searchInput} /> */}
            {/* <StockChart /> */}
         </div>
      </div>
   );
};

export default Main;
