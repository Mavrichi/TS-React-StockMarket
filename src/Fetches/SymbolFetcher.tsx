import React, { useEffect, useState } from "react";
import SymbolSearcher from "../components/SymbolSearcher";

const SymbolFetcher: React.FC = () => {
   const [symbols, setSymbols] = useState<string[]>([]);
   const [companyName, setCompanyName] = useState<string[]>([]);
   const symbolUrl: string =
      "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bvbbumf48v6q7r403elg";

   interface datatype {
      currency: string;
      description: string[];
      displaySymbol: string;
      symbol: string;
      type: string;
   }

   useEffect(() => {
      fetch(symbolUrl)
         .then((res) => res.json())
         .then((data) => {
            setCompanyName(data.map((e: datatype) => e.description));
            setSymbols(data.map((e: datatype) => e.symbol));
         });
   }, []);
   return (
      <div className="SymbolFetcher">
         <SymbolSearcher symbols={symbols} companyName={companyName} />
      </div>
   );
};
export default SymbolFetcher;
