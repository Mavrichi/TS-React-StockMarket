import React from "react";
import "./App.css";
import SymbolSearch from "./components/SymbolSearcher";
//import WS from "./components/WS";

function App() {
   return (
      <div className="App">
         <h1 id="mainTitle">
            (っ◔◡◔)っ ♥ Just another free Stock Charts Website ♥
         </h1>
         <SymbolSearch></SymbolSearch>
         {/* <WS></WS> */}
      </div>
   );
}

export default App;
