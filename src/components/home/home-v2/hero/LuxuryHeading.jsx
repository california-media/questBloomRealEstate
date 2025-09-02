import React from "react";
import "/public/css/LuxuryHeading.css"; 

const LuxuryHeading = ({ children }) => {
  return (
    <h2 className="luxury-heading">
      {children}
      <span className="luxury-heading-decoration"></span>
    </h2>
  );
};

export default LuxuryHeading;
