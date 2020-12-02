import React, { useEffect, useState } from "react";
import "./MainComponent.css";
import gsap from "gsap";
import Charting from "./Charting";
const Main: React.FC = () => {
   const [searchInput, setSearchInput] = useState<string>("");
   const [transformed, setTransformed] = useState<boolean>(false);
   const [symbols, setSymbols] = useState<string[]>([]);
   const symbolUrl: string =
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

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      // if(e.target.value.keyCode == 13) {
      //    e.preventDefault();
      //    return false;
      //  }
      e.preventDefault();
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
      for (let i: number = 0; i < symbols.length; i++) {
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
         <div className="searchBox">
            <label htmlFor="browser"></label>
            <input
               placeholder="Search for a stock market symbol ex: AAPL | GOOG | TSLA..."
               className="searchBar"
               list="browsers"
               name="browser"
               id="browser"
               onChange={handleSearch}
            ></input>
            <datalist id="browsers" className="InputArea">
               {SymbolList()}
            </datalist>
         </div>

         <div className="MiddleSection">
            {transformed ? (
               <Charting userSymbol={searchInput} />
            ) : (
               <div className="Loading">Search for a symbol</div>
            )}
         </div>
      </div>
   );
};

export default Main;
