import React, { useState, useEffect, MouseEvent } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { DayRange } from "react-modern-calendar-datepicker";
import CandleSticksFetcher from "../Fetches/CandleStickFetcher";

interface Props {
   userSymbol: string;
   correctInput: boolean;
}

const DataParser: React.FC<Props> = ({ userSymbol, correctInput }) => {
   const [startTimeStamp, setStartTimeStamp] = useState<number>(1577836800);
   const [resolution, setResolution] = useState<string>("D");
   const [averageLine, setAverageLine] = useState<boolean>(false);
   const [dayRange, setDayRange] = React.useState<DayRange>({
      from: null,
      to: null,
   });
   const [endDate, setEndDate] = React.useState<number>(
      Math.floor(Date.now() / 1000)
   );
   const [symbolUrl, setSymbolUrl] = useState<string>("");

   const handleAverageShow = () => (event: MouseEvent) => {
      setAverageLine(!averageLine);
   };
   const handleDateChange = (timestamp: string) => (event: MouseEvent) => {
      let newStamp: number;
      const currDate: number = Math.floor(Date.now() / 1000);

      if (timestamp === "1D") {
         //calculeaza current date - o zi
         newStamp = currDate - 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setEndDate(Math.floor(Date.now() / 1000));
         setResolution("5");
         setDayRange({
            from: null,
            to: null,
         });
      }
      if (timestamp === "5D") {
         newStamp = currDate - 5 * 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setEndDate(currDate);
         setResolution("30");
         setDayRange({
            from: null,
            to: null,
         });
      }
      if (timestamp === "1W") {
         newStamp = currDate - 7 * 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setEndDate(currDate);
         setResolution("30");
         setDayRange({
            from: null,
            to: null,
         });
      }
      if (timestamp === "1M") {
         newStamp = currDate - 30 * 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setEndDate(currDate);
         setResolution("30");
         setDayRange({
            from: null,
            to: null,
         });
      }
      if (timestamp === "6M") {
         newStamp = currDate - 6 * 30 * 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setEndDate(currDate);
         setResolution("D");
         setDayRange({
            from: null,
            to: null,
         });
      }
      if (timestamp === "1Y") {
         newStamp = currDate - 12 * 30 * 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setEndDate(currDate);
         setResolution("D");
         setDayRange({
            from: null,
            to: null,
         });
      }
      if (timestamp === "5Y") {
         newStamp = currDate - 5 * 12 * 30 * 24 * 60 * 60;
         setStartTimeStamp(newStamp);
         setEndDate(currDate);
         setResolution("W");
         setDayRange({
            from: null,
            to: null,
         });
      }
   };

   useEffect(() => {
      if (dayRange.from !== undefined && dayRange.from !== null) {
         let startDate = new Date(
            ` ${dayRange.from.year}.
           ${dayRange.from.month}.
           ${dayRange.from.day}`
         );
         let startDateToUnix: number = Math.floor(startDate.getTime() / 1000);

         if (dayRange.to !== undefined && dayRange.to !== null) {
            let endDate = new Date(
               ` ${dayRange.to.year}.
              ${dayRange.to.month}.
              ${dayRange.to.day + 1}`
            );
            let endDateToUnix: number = Math.floor(endDate.getTime() / 1000);
            if (endDateToUnix - startDateToUnix <= 60 * 60 * 24 * 7) {
               setResolution("5");
            } else if (endDateToUnix - startDateToUnix <= 60 * 60 * 24 * 180) {
               setResolution("30");
            }
            setStartTimeStamp(startDateToUnix);
            setEndDate(endDateToUnix);
         }
      }

      setSymbolUrl(
         `https://finnhub.io/api/v1/stock/candle?symbol=${userSymbol}&resolution=${resolution}&from=${startTimeStamp}&to=${endDate}&token=bvbbumf48v6q7r403elg`
      );
      console.log("Symbol url in buttons este", symbolUrl);
   }, [userSymbol, startTimeStamp, dayRange.to]);
   return (
      <div className="DataParserMain">
         {correctInput ? (
            <div className="charting">
               <div className="buttonList">
                  <div className="DateRangePicker">
                     <span id="customDateText">Select a custom date:</span>
                     <DatePicker
                        value={dayRange}
                        onChange={setDayRange}
                        inputPlaceholder="Select a day"
                     />
                  </div>
                  <button
                     id="1D"
                     className="button1"
                     onClick={handleDateChange("1D")}
                  >
                     1 Day
                  </button>
                  <button
                     id="5D"
                     className="button2"
                     onClick={handleDateChange("5D")}
                  >
                     5 Days
                  </button>
                  <button
                     id="1W"
                     className="button1"
                     onClick={handleDateChange("1W")}
                  >
                     1 Week
                  </button>
                  <button
                     id="1M"
                     className="button2"
                     onClick={handleDateChange("1M")}
                  >
                     1 Month
                  </button>
                  <button
                     id="6M"
                     className="button1"
                     onClick={handleDateChange("6M")}
                  >
                     6 Months
                  </button>
                  <button
                     id="1Y"
                     className="button2"
                     onClick={handleDateChange("1Y")}
                  >
                     1 Year
                  </button>
                  <button
                     id="5Y"
                     className="button1"
                     onClick={handleDateChange("5Y")}
                  >
                     5 Years
                  </button>
                  {averageLine ? (
                     <button className="button4" onClick={handleAverageShow()}>
                        Hide average line
                     </button>
                  ) : (
                     <button className="button3" onClick={handleAverageShow()}>
                        Show average line
                     </button>
                  )}
               </div>
               <CandleSticksFetcher
                  symbolUrl={symbolUrl}
                  averageLine={averageLine}
               />
            </div>
         ) : (
            <div className="Loading">
               Sorry , couldn't find a company with this symbol
            </div>
         )}
      </div>
   );
};

export default DataParser;
