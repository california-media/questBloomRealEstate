import React, { useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const PercentagePreHandover = ({
  setPercentagePreHandover,
  percentagePreHandover = 0,
}) => {
  const [percentage, setPercentage] = useState({
    value: percentagePreHandover,
  });

  // percentage handler
  const handleOnChange = (value) => {
    setPercentage({ value });
    setPercentagePreHandover(value);
  };

  return (
    <>
      <div className="range-wrapper">
        <InputRange
          formatLabel={() => ``}
          maxValue={100}
          minValue={0}
          value={percentage.value}
          onChange={(value) => handleOnChange(value)}
          id="percentage-slider"
        />
        <div className="d-flex align-items-center">
          <span id="percentage-slider-value">{percentage.value}%</span>
        </div>
      </div>
    </>
  );
};

export default PercentagePreHandover;
