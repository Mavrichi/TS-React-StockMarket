import React from "react";
import "./App.css";
import SymbolSearch from "./components/SymbolSearcher";
//import WS from "./components/WebSocket";

function App() {
   return (
      <div className="App">
         <h1 id="mainTitle">Free OHLC Candlestick Stock Market Chart</h1>
         <SymbolSearch></SymbolSearch>
         {/* <WS></WS> */}
      </div>
   );
}

export default App;
