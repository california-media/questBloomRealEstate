import React from "react";

// Helper function to extract image URL from the building image array
const getImageUrl = (imageArray) => {
  try {
    return imageArray[0]?.url || "";
  } catch (error) {
    return "";
  }
};

// Helper function to format completion date
const formatCompletionDate = (completionDate) => {
  if (!completionDate) return "N/A";
  try {
    const date = new Date(completionDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  } catch (error) {
    return "N/A";
  }
};

const BuildingDetails = ({ buildings }) => {
  // Flatten the nested buildings array and handle undefined case
  const buildingList = buildings?.flat() || [];

  if (!buildingList.length) {
    return (
      <div className="text-center py-4">
        <p>No building information available</p>
      </div>
    );
  }

  return (
    <div className="accordion " id="accordionBuildings">
      {buildingList.map((building, index) => (
        <div
          className={`accordion-item ${index === 0 ? "active" : ""}`}
          key={building.Building_ID}
        >
          <h2 className="accordion-header" id={`buildingHeading${index}`}>
            <button
              className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#buildingCollapse${index}`}
              aria-expanded={index === 0 ? "true" : "false"}
              aria-controls={`buildingCollapse${index}`}
            >
              <span className="w-100 d-md-flex align-items-start">
                <span className="mr10-sm ">
                  <span className="fw600">Name: </span>
                  {building.Name || `Building ${index + 1}`}
                </span>
                <span className="ms-auto d-md-flex align-items-center justify-content-end">
                  <span className="me-2 me-md-4 d-flex flex-column">
                    <span className="fw600">Description: </span>
                    <span className="text">
                      {building.Description || "N/A"}
                    </span>
                  </span>
                  <span className=" text-center pr10">
                    <span className="fw600">Completion: </span>
                    <span className="text">
                      {formatCompletionDate(building.Completion_date)}
                    </span>
                  </span>
                </span>
              </span>
            </button>
          </h2>
          <div
            id={`buildingCollapse${index}`}
            className={`accordion-collapse collapse ${
              index === 0 ? "show" : ""
            }`}
            aria-labelledby={`buildingHeading${index}`}
            data-parent="#accordionBuildings"
          >
            <div className="accordion-body text-center">
              {getImageUrl(building.Building_image) ? (
                <img
                  className="w-100 h-100 cover"
                  src={getImageUrl(building.Building_image)}
                  alt={`${building.Name || `Building ${index + 1}`} image`}
                />
              ) : (
                <div className="text-muted py-4">
                  <p>Building image not available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuildingDetails;
