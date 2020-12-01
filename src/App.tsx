import React from "react";
import "./App.css";
import Main from "./components/MainComponent";
//import WS from "./components/WS";

function App() {
   return (
      <div className="App">
         <h1 id="mainTitle">Just another free Stock Charts Website</h1>
         <Main></Main>
         {/* <WS></WS> */}
      </div>
   );
}

export default App;
