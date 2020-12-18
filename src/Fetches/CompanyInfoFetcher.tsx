import React, { useEffect, useState } from "react";
interface Props {
   userSymbol: string;
   correctInput: boolean;
}
const CompanyInfoFetcher: React.FC<Props> = ({ userSymbol, correctInput }) => {
   const [companyName, setCompanyName] = useState<string>();
   const [companyLogoUrl, setCompanyLogoUrl] = useState<string>("");
   const [companyWebsite, setCompanyWebsite] = useState<string>();
   const urlCompanyDescription = `https://finnhub.io/api/v1/stock/profile2?symbol=${userSymbol}&token=bvbbumf48v6q7r403elg`;
   useEffect(() => {
      if (correctInput) {
         fetch(urlCompanyDescription)
            .then((res) => res.json())
            .then((data) => {
               setCompanyName(data.name);
               setCompanyLogoUrl(data.logo);
               setCompanyWebsite(data.weburl);
            });
      }
   }, [userSymbol]);
   return (
      <div className="companyInfoCard">
         <div className="companyName">{companyName}</div>
         <a href={companyWebsite}>
            <img
               alt="This company doesn't provide a logo :("
               src={companyLogoUrl}
               className="companyImage"
            ></img>
         </a>
         <a href={companyWebsite} className="companyWebsite">
            <button className="button1">Visit Website</button>
         </a>
      </div>
   );
};
export default CompanyInfoFetcher;
