import React, { useState } from "react";
import "./MainComponent.css";
import DataParser from "./Buttons";
import CandleSticksFetcher from "../Fetches/CandleStickFetcher";
import CompanyInfoFetcher from "../Fetches/CompanyInfoFetcher";

interface Props {
   companyName: string[];
   symbols: string[];
}

const SymbolSearch: React.FC<Props> = ({ companyName, symbols }) => {
   const [searchInput, setSearchInput] = useState<string>("");
   const [isFound, setIsFound] = useState<boolean>(true);
   const [transformed, setTransformed] = useState<boolean>(false);
   var setTimeoutName: NodeJS.Timeout;
   //setTimeoutName we need this so we can clear the Timeout ( instead of waiting 2 seconds for each change we only wait once).
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
      }, 1000);
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
               <div className="chartAndInfo">
                  <CompanyInfoFetcher
                     userSymbol={searchInput}
                     correctInput={isFound}
                  />
                  <DataParser userSymbol={searchInput} correctInput={isFound} />
               </div>
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
