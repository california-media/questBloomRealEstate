import React from "react";

const MasterPlan = ({ master_plan }) => {
  const imageUrl = master_plan?.[0]?.url;

  return (
    <div className="col-md-12">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="virtual image"
          className="w-100 bdrs12 h-100 cover"
        />
      ) : (
        <div
          className="w-100 bdrs12 h-100 d-flex justify-content-center align-items-center bg-light border"
          style={{ aspectRatio: "16 / 9" }}
        >
          <span className="text-muted fw-bold">N/A</span>
        </div>
      )}
    </div>
  );
};

export default MasterPlan;
