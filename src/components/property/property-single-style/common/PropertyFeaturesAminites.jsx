import React from "react";
import "photoswipe/dist/photoswipe.css";
import { ImageIcon } from "lucide-react";

const PropertyFeaturesAmenities = ({ facilities = [] }) => {
  if (!facilities || facilities?.length === 0) {
    return (
      <div className="col-md-12">
        <div className="text-center py-4">
          <p>No facilities information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`row w-100 align-items-center  `}>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-3 pl0 mt-0">
        {facilities.map((facility, i) => (
          <div className="col d-flex flex-column mt-0 mb-3" key={i}>
            <div className="card border-0 flex-grow-1">
              {facility.image?.url ? (
                <img
                  src={facility.image?.url}
                  className="card-img-top img-fluid rounded-top"
                  alt={facility.name}
                  style={{
                    height: "200px",
                    aspectRatio: "1/2",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "2/1.5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                  className="card-img-top img-fluid rounded-top"
                >
                  <ImageIcon size={24} color="#6c757d" />
                </div>
              )}

              <div className="facility-info flex-grow-1 pt10 pb15 p15">
                <h6 className="mb-0 text-dark">{facility.name}</h6>
                <small className="text-muted">{facility?.image_source}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeaturesAmenities;
