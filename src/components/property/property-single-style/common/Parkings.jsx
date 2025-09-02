import React, { useState } from "react";

const Parkings = ({ parkings = [] }) => {
  if (!parkings?.length) {
    return (
      <div className="col-md-12">
        <div className="text-center py-4">
          <p>No parking available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid ">
      <div className="row g-3">
        <div className="col-md-6">
          <div
            className="card h-100"
            style={{
              border: "none",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
            }}
          >
            <div className="card-body" style={{ padding: "15px" }}>
              {/* Header with Icon and Title */}

              {/* Payment Steps */}
              <div>
                {/* Payment Steps */}
                <div className="mb-2">
                  {parkings.map((parking_array, parkingArrayIndex) => {
                    return parking_array.map((parking, parkingIndex) => (
                      <div
                        key={parkingIndex}
                        className="d-flex justify-content-between align-items-center"
                        style={{
                          marginBottom:
                            parkingArrayIndex === parkings.length - 1
                              ? "0"
                              : "12px",
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <span
                            className="me-2 fw-semibold"
                            style={{
                              fontSize: "14px",
                              color: "#333333",
                              minWidth: "30px",
                            }}
                          >
                            {Array.isArray(parking.Unit_bedrooms)
                              ? parking.Unit_bedrooms.join(", ")
                              : parking.Unit_bedrooms}
                          </span>
                          <span
                            style={{
                              fontSize: "14px",
                              color: "#777777",
                              fontWeight: "400",
                            }}
                          >
                            {parking.Unit_type}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#777777",
                            fontWeight: "400",
                            textAlign: "right",
                          }}
                        >
                          {parking.Parking_spaces} parkings
                        </span>
                      </div>
                    ));
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parkings;
