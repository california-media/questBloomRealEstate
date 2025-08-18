import React from "react";
import GoogleMapEmbed from "./property-gallery/Map";

const PropertyAddress = ({ property, coordinates }) => {
  const coords = coordinates?.split(",")?.map(Number);
  const location = `${property?.area}, ${property?.country}`;
  return (
    <>
      {/* End col */}

      <div className="col-md-12">
        {coords && (
          <GoogleMapEmbed location={{ lat: coords[0], lng: coords[1] }} />
        )}
        <p className="text mt20 pl20">
          {location?.charAt(0).toUpperCase() + location?.slice(1) || "N/A"}
        </p>
      </div>
      {/* End col */}
    </>
  );
};

export default PropertyAddress;
