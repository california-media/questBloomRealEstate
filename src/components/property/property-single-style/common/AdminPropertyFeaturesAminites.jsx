import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { adminBaseUrl } from "@/api/adminApi";
import { ImageIcon } from "lucide-react";

const AdminPropertyFeaturesAminites = ({ amenities }) => {
  const amenitiesData = amenities || [];
  // Group amenities into columns of 2 for better image display
  const featuresAmenitiesData =
    amenitiesData.length > 0
      ? Array.from(
          { length: Math.ceil(amenitiesData.length / 2) },
          (_, colIndex) => amenitiesData.slice(colIndex * 2, (colIndex + 1) * 2)
        )
      : [];

  if (!amenitiesData.length) {
    return (
      <div className="col-md-12">
        <div className="text-center py-4">
          <p>No amenities information available</p>
        </div>
      </div>
    );
  }

  return (
    <Gallery>
      {featuresAmenitiesData.map((row, rowIndex) => (
        <div key={rowIndex} className="col-sm-6 col-md-6">
          <div className="pd-list">
            {row.map((amenity, index) => (
              <div key={index} className="facility-item mb20">
                <Item
                  original={adminBaseUrl + amenity.image_url}
                  thumbnail={adminBaseUrl + amenity.image_url}
                  width={1100}
                  height={700}
                >
                  {({ ref, open }) => (
                    <div className="d-flex gap-3 align-items-start">
                      <div
                        ref={ref}
                        onClick={open}
                        role="button"
                        className="facility-image-container"
                        style={{
                          width: "80px",
                          height: "60px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          overflow: "hidden",
                          border: "2px solid #e9ecef",
                          transition: "all 0.3s ease",
                          position: "relative",
                          flexShrink: 0,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.border = "2px solid #007bff";
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.border = "2px solid #e9ecef";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        {amenity.image_url ? (
                          <img
                            src={adminBaseUrl + amenity.image_url}
                            alt={amenity.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "#f0f0f0",
                            }}
                          >
                            <ImageIcon size={24} color="#6c757d" />
                          </div>
                        )}
                        {/* Overlay expand icon */}
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: "0",
                            transition: "opacity 0.3s ease",
                          }}
                          className="gallery-overlay"
                        >
                          <i
                            className="fas fa-expand"
                            style={{ color: "white", fontSize: "10px" }}
                          ></i>
                        </div>
                      </div>
                      <div className="facility-info flex-grow-1">
                        <h6 className="mb-1 text-dark">{amenity.title}</h6>
                      </div>
                    </div>
                  )}
                </Item>
              </div>
            ))}
          </div>
        </div>
      ))}

      <style>{`
        .facility-image-container:hover .gallery-overlay {
          opacity: 1 !important;
        }
        .facility-item {
          padding: 12px;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }
        .facility-item:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </Gallery>
  );
};

export default AdminPropertyFeaturesAminites;
