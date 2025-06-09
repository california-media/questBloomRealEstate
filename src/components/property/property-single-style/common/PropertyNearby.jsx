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
        {/* <nav>
          <div className="nav nav-tabs mb20" id="nav-tab2" role="tablist">
            {tabsData.map((tab, index) => (
              <button
                key={index}
                className={`nav-link fw600 ${index === 0 ? "active" : ""}`}
                id={`nav-item${index + 1}-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#nav-item${index + 1}`}
                type="button"
                role="tab"
                aria-controls={`nav-item${index + 1}`}
                aria-selected={index === 0 ? "true" : "false"}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </nav> */}
        {/* End nav tabs */}

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
                    className="nearby d-sm-flex align-items-center mb20"
                  >
                    <div
                      style={{ justifyContent: "space-between", width: "100%" }}
                      className="details d-flex "
                    >
                      <p className="dark-color fw600 mb-0">{detail.name}</p>
                      <p className="text mb-0">Distance: {detail.distance}</p>
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
