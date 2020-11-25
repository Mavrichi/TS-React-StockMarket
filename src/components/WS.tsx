import React, { useEffect, useState } from "react";

const WS: React.FC = () => {
   const [testState, setTestState] = useState([]);
   const socket = new WebSocket(
      "wss://ws.finnhub.io?token=butpoev48v6skju275a0"
   );
   // Connection opened -> Subscribe
   interface datatype {
      v: number; // volume
      t: number; // timestamp in unix miliseconds
      s: string; // symbol
      p: number; // last price
   }

   const [v, setV] = useState();
   const [t, setT] = useState();
   const [s, setS] = useState();
   const [p, setP] = useState<number>();
   useEffect(() => {
      socket.addEventListener("open", function (event) {
         socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
         socket.send(
            JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
         );
         socket.send(
            JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" })
         );
      });

      // Listen for messages
      socket.addEventListener("message", function (event) {
         //
         const dataLog = JSON.parse(event.data);
         setS(dataLog);
         setV(event.data.v);
         setT(event.data.t);
         setP(event.data.p);
         console.log("am primit mesaj de la socket");
      });
      return () => {
         // Unsubscribe
         var unsubscribe = function (symbol: string) {
            socket.send(
               JSON.stringify({ type: "unsubscribe", symbol: symbol })
            );
         };
      };
   });
   return (
      <div className="header">
         <div className="headerCard"></div>
      </div>
   );
};

export default WS;
