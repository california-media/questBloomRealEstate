import React from "react";
import GoogleMapEmbed from "./property-gallery/Map";

const PropertyAddress = ({ property, coordinates }) => {
  const coords = coordinates?.split(",")?.map(Number);
  return (
    <>
      <div className="col-md-10 col-xl-10">
        <div className="d-flex justify-content-between">
          <div className="pd-list">
            <p className="fw600 mb10 ff-heading dark-color">Area</p>
            <p className="fw600 mb10 ff-heading dark-color">City</p>
            <p className="fw600 mb-0 ff-heading dark-color">Country</p>
          </div>
          <div className="pd-list">
            <p className="text mb10">{property?.area || "N/A"}</p>
            <p className="text mb10">{property?.city || "N/A"}</p>
            <p className="text mb-0">{property?.country || "N/A"}</p>
          </div>
        </div>
      </div>
      {/* End col */}

      <div className="col-md-12 " style={{ marginTop: "30px" }}>
        {coords && (
          <GoogleMapEmbed location={{ lat: coords[0], lng: coords[1] }} />
        )}
      </div>
      {/* End col */}
    </>
  );
};

export default PropertyAddress;
