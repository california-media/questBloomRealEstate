import React from "react";
import GoogleMapEmbed from "./property-gallery/Map";

const AdminPropertyAddress = ({ property, location }) => {
  return (
    <>
      <div className="col-md-10 col-xl-10">
        <div className="d-flex justify-content-between">
          <div className="pd-list">
            <p className="fw600 mb10 ff-heading dark-color">Location</p>
            <p className="fw600 mb10 ff-heading dark-color">Property Type</p>
            <p className="fw600 mb-0 ff-heading dark-color">Furnishing</p>
          </div>
          <div className="pd-list">
            <p className="text mb10">
              {location?.charAt(0).toUpperCase() + location?.slice(1) || "N/A"}
            </p>
            <p className="text mb10">
              {property?.property_type.name?.charAt(0).toUpperCase() +
                property?.property_type.name?.slice(1) || "N/A"}
            </p>
            <p className="text mb-0">
              {property?.furnishing?.charAt(0).toUpperCase() +
                property?.furnishing?.slice(1) || "N/A"}
            </p>
          </div>
        </div>
      </div>
      {/* End col */}

      <div className="col-md-12" style={{ marginTop: "30px" }}>
        {property?.google_maps_link && (
          <GoogleMapEmbed googleMapsLink={property.google_maps_link} />
        )}
      </div>
      {/* End col */}
    </>
  );
};

export default AdminPropertyAddress;
