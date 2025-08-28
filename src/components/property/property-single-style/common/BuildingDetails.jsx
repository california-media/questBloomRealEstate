import React from "react";
import { ImageIcon } from "lucide-react";

// Helper function to extract image URL from the building image array
const getImageUrl = (imageArray) => {
  try {
    return imageArray[0]?.url || "";
  } catch (error) {
    return "";
  }
};

const BuildingDetailsGrid = ({ buildings }) => {
  // Flatten the nested buildings array and handle undefined case
  const buildingList = buildings?.flat() || [];

  if (!buildingList.length) {
    return (
      <div className="col-md-12">
        <div className="text-center py-4">
          <p>No building information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row w-100 align-items-center p-0 justify-content-center pt-2">
      <div className="row row-cols-1 row-cols-md-2 p-0 g-3 mt-0">
        {buildingList.map((building, index) => (
          <div
            className="col d-flex  flex-column m-0 mb-3"
            key={building.Building_ID || index}
          >
            <div className="card border-0 flex-grow-1 h-100">
              {getImageUrl(building.Building_image) ? (
                <img
                  src={getImageUrl(building.Building_image)}
                  className="card-img-top img-fluid rounded-top"
                  alt={building.Name || `Building ${index + 1}`}
                  style={{
                    height: "300px",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "200px",
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

              <div className="card-body flex-grow-1 p20 pb-25">
                <h6 className="card-title text-dark mb-2">
                  {building.Name || `Building ${index + 1}`}
                </h6>
                <p className="card-text text-muted small mb-0">
                  {building.Description || "No description available"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingDetailsGrid;
