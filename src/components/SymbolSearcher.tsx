import React, { useEffect, useState, useRef } from "react";
import "./MainComponent.css";
import DataParser from "./DataParser";
const SymbolSearch: React.FC = () => {
   const [searchInput, setSearchInput] = useState<string>("");
   const [isFound, setIsFound] = useState<boolean>(true);
   const [transformed, setTransformed] = useState<boolean>(false);
   const [symbols, setSymbols] = useState<string[]>([]);
   const [companyName, setCompanyName] = useState<string[]>([]);
   const symbolUrl: string =
      "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bvbbumf48v6q7r403elg";
   const inputRef = useRef<HTMLInputElement | null | any>(null);
   interface datatype {
      currency: string;
      description: string[];
      displaySymbol: string;
      symbol: string;
      type: string;
   }

   useEffect(() => {
      inputRef.current.focus();
      fetch(symbolUrl)
         .then((res) => res.json())
         .then((data) => {
            setCompanyName(data.map((e: datatype) => e.description));
            setSymbols(data.map((e: datatype) => e.symbol));
         });
   }, []);
   var setTimeoutName: NodeJS.Timeout;
   //setTimeoutName we need this so we cna clear the Timeout ( instead of waiting 2 seconds for each change we only wait once).
   const handleSearch = (ev: {
      preventDefault: () => void;
      target: { value: string };
   }) => {
      ev.preventDefault();
      clearTimeout(setTimeoutName);
      setTimeoutName = setTimeout(() => {
         if (symbols.includes(ev.target.value.toUpperCase())) {
            setSearchInput(ev.target.value.toUpperCase());
            setTransformed(true);
            setIsFound(true);
         } else {
            setIsFound(false);
         }
      }, 2000);
   };
   // const handleKeypress = (e: { keyCode: number }, value:string) => {
   //    //it triggers by pressing the enter key
   //    if (e.keyCode === 13) {
   //       handleSearch(ev.target.value);
   //    }
   // };
   // If i ever want to submit the form on Enter key

   const SymbolList = () => {
      const rows = [];
      for (let i: number = 0; i < symbols.length; i++) {
         rows.push(
            <option key={i} value={symbols[i]} label={companyName[i]}>
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
               ref={inputRef}
               placeholder="Search for a stock market symbol ex: AAPL | GOOG | TSLA..."
               className="searchBar"
               list="browsers"
               name="browser"
               id="browser"
               onChange={handleSearch}
               //onKeyPress={handleKeypress}
            ></input>
            <datalist id="browsers" className="InputArea">
               {SymbolList()}
            </datalist>
         </div>

         <div className="MiddleSection">
            {transformed ? (
               <DataParser userSymbol={searchInput} correctInput={isFound} />
            ) : (
               <div className="Loading">
                  Search for a symbol to render a new chart !
               </div>
            )}
         </div>
      </div>
   );
};

export default SymbolSearch;
