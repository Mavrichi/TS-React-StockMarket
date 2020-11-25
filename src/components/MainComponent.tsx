import React, { useEffect, useState } from "react";
import "./MainComponent.css";
import gsap from "gsap";
import Charting from "./Charting";
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
            console.log("S-a executat Search symbol");
         });
   }, []);
   const [symbolOptions, setSymbolOptions] = useState<JSX.Element[]>();

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("Inainte de IF 1");
      if (symbols.includes(e.target.value.toUpperCase())) {
         if (transformed) {
            gsap.to(".MiddleSection", { justifyContent: "start" });
         }
         setSearchInput(e.target.value.toUpperCase());
         setTransformed(true);
         console.log(
            "Inauntru la ambele ifuri E.TargetVALUE: ",
            e.target.value,
            "searchInput este:",
            searchInput
         );
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
         <div className="MiddleSection">
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
               <span>
                  <button className="searchBtn" type="submit">
                     🔍
                  </button>
               </span>
            </form>
            {transformed ? (
               <Charting userSymbol={searchInput} />
            ) : (
               <div>...Loading chart</div>
            )}
            {/* <Charting userSymbol={searchInput} /> */}
         </div>
      </div>
   );
};

export default Main;
