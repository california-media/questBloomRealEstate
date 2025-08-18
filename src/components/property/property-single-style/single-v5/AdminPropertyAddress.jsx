import React from "react";
import GoogleMapEmbed from "./admin-property-gallery/Map";

const AdminPropertyAddress = ({ property, location }) => {
  return (
    <>
      {/* End col */}

      <div className="col-md-12">
        {property?.google_maps_link && (
          <GoogleMapEmbed googleMapsLink={property?.google_maps_link} />
        )}
          <p className="text mt20 pl20">
          {location?.charAt(0).toUpperCase() + location?.slice(1) || "N/A"}
        </p>
      </div>
    
      {/* End col */}
    </>
  );
};

export default AdminPropertyAddress;
