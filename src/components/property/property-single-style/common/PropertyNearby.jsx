import { MapPin } from "lucide-react";
import React from "react";

const PropertyNearby = ({ map_points }) => {
  // Define tabs based on map_points
  const tabsData = [
    {
      title: "Nearby Places",
      details:
        map_points?.map((point) => ({
          name: point.name,
          distance: `${point.distance_km} km`,
        })) || [],
    },
  ];

  return (
    <div className="col-md-12">
      <div className="navtab-style1">
        <div className="tab-content" id="nav-tabContent">
          {tabsData.map((tab, index) => (
            <div
              key={index}
              className={`tab-pane fade fz15 ${
                index === 0 ? "active show" : ""
              }`}
              id={`nav-item${index + 1}`}
              role="tabpanel"
              aria-labelledby={`nav-item${index + 1}-tab`}
            >
              {tab.details.length > 0 ? (
                tab.details.map((detail, detailIndex) => (
                  <div
                    key={detailIndex}
                    className="nearby d-sm-flex align-items-baseline mb20"
                  >
                    <div
                      style={{ justifyContent: "space-between", width: "100%" }}
                      className="details d-flex "
                    >
                      <div className="d-flex align-items-center">
                        <span
                          className="mr15 d-flex justify-content-center align-items-center  rounded"
                          style={{ width: "35px", aspectRatio: "1/1", background:"#65C466" }}
                        >
                          <MapPin size={22} color="white" />
                        </span>
                        <p className="dark-color fw600 mb-0">{detail.name}</p>
                      </div>
                      <p className="text text-muted mb-0"> {detail.distance}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text">No nearby places available.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyNearby;
