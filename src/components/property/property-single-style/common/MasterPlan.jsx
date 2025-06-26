import React from "react";
import { ImageOff } from "lucide-react";

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
          <ImageOff size={58} className="text-muted" />
        </div>
      )}
    </div>
  );
};

export default MasterPlan;
