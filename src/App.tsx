import React from "react";
import "./App.css";
import SymbolFetcher from "./Fetches/SymbolFetcher";
//import WS from "./components/WebSocket";

function App() {
   return (
      <div className="App">
         <h1 id="mainTitle">Free OHLC Candlestick Stock Market Chart</h1>
         <SymbolFetcher></SymbolFetcher>
         {/* <WS></WS> */}
      </div>
   );
}

export default App;
