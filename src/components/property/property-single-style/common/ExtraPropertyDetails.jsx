import React from "react";

const ExtraPropertyDetails = ({ property }) => {
  // Helper function to format enum values to display text
  const formatEnumValue = (value) => {
    if (!value) return "N/A";
    return value
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Helper function to format price
  const formatPrice = (price) => {
    if (!price || price === 0) return "N/A";
    return `AED ${Math.round(price).toLocaleString()}`;
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  // Helper function to format area
  const formatArea = (area) => {
    if (!area || parseFloat(area) <= 0) return "N/A";
    const areaM2 = parseFloat(area);
    const areaSqft = Math.round(areaM2 * 10.764);
    return `${areaSqft.toLocaleString()} sqft`;
  };

  // Helper function to format boolean
  const formatBoolean = (value) => {
    if (value === null || value === undefined) return "N/A";
    return value ? "Yes" : "No";
  };

  return (
    <div className="row">
      {/* Contact Information Section */}
      <div className="col-12 mb-4">
        <div
          className="contact-section"
          style={{
            background: "#f8f9fa",
            borderRadius: "15px",
            padding: "25px",
            color: "#797633",
            position: "relative",
            border: "1px solid #e9ecef",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "100px",
              height: "100px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
              opacity: "0.5",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "80px",
              height: "80px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "50%",
            }}
          ></div>

          <div className="d-flex align-items-center mb-3">
            <h4
              className="mb-0"
              style={{ fontWeight: "600", letterSpacing: "0.5px" }}
            >
              Contact Information
            </h4>
          </div>

          <div className="row gx-4">
            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <i
                  className="flaticon-email me-3 align-self-start mt-1"
                  style={{ fontSize: "18px", opacity: "0.9", color: "#797633" }}
                ></i>
                <div>
                  <small
                    style={{
                      opacity: "0.8",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Email
                  </small>
                  <div style={{ fontWeight: "500", fontSize: "16px" }}>
                    {property?.email || "N/A"}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="d-flex align-items-center justify-content-center ">
                <i
                  className="flaticon-call me-3 align-self-start mt-2"
                  style={{ fontSize: "18px", opacity: "0.9", color: "#797633" }}
                ></i>
                <div>
                  <small
                    style={{
                      opacity: "0.8",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Phone
                  </small>
                  <div style={{ fontWeight: "500", fontSize: "16px" }}>
                    {property?.phone || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Specifications Section */}
      <div className="col-md-12 p-2 mb-4">
        <div
          style={{
            background: "#f8f9fa",
            borderRadius: "12px",
            padding: "25px",
            position: "relative",
            // border: "2px solid #797633",
            border: "1px solid #e9ecef",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              height: "10px",
              // background:
              //   "linear-gradient(135deg, #797631 0%, #a5a24a 50%, #797631 100%)",
              borderRadius: "12px 12px 0 0",
            }}
          ></div>
          <div className="d-flex align-items-center mb-4">
            <h5 className="mb-0" style={{ color: "black", fontWeight: "600" }}>
              Property Specifications
            </h5>
          </div>

          <div className="specifications-grid">
            {[
              {
                label: "Usage",
                value: formatEnumValue(property?.usage),
                icon: "flaticon-home-1",
              },
              {
                label: "Ownership",
                value: formatEnumValue(property?.ownership),
                icon: "flaticon-user-1",
              },
              {
                label: "Furnishing",
                value: formatEnumValue(property?.furnishing),
                icon: "flaticon-bed",
              },
              {
                label: "Balcony Size",
                value: formatArea(property?.balcony_size),
                icon: "flaticon-expand",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="spec-item mb-3"
                style={{
                  padding: "15px",
                  background: "white",
                  borderRadius: "8px",
                  border: "1px solid #e9ecef",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#797633";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(121, 118, 51, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e9ecef";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="d-flex align-items-start">
                  <i
                    className={item.icon}
                    style={{
                      fontSize: "16px",
                      color: "#797633",
                      marginRight: "10px",
                      opacity: "0.8",
                      marginTop: "5px",
                    }}
                  ></i>
                  <div className="flex-grow-1">
                    <small
                      style={{
                        color: "#6c757d",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {item.label}
                    </small>
                    <div
                      style={{
                        fontWeight: "500",
                        color: "#495057",
                        fontSize: "14px",
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial & Timeline Section */}
      {/* <div className="col-md-6 mb-4">
        <div
          style={{
            background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
            borderRadius: "12px",
            padding: "25px",
            border: "2px solid #797633",
            position: "relative",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              height: "10px",
              background:
                "linear-gradient(135deg, #797631 0%, #a5a24a 50%, #797631 100%)",
              borderRadius: "12px 12px 0 0",
            }}
          ></div>

          <div className="d-flex align-items-center mb-4">
            <h5 className="mb20" style={{ color: "black", fontWeight: "600" }}>
              Charges & Timeline
            </h5>
          </div>

          <div className="financial-items">
            {[
              {
                label: "Handover Date",
                value: formatDate(property?.handover_date),
                icon: "flaticon-event",
                highlight: true,
              },
              {
                label: "Service Charges",
                value: formatPrice(property?.service_charges),
                icon: "flaticon-investment",
              },
              {
                label: "Sale Starts",
                value: formatDate(property?.sale_starts),
                icon: "flaticon-event",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`financial-item ${
                  item.highlight ? "highlight" : ""
                }`}
                style={{
                  padding: item.highlight ? "20px" : "15px",
                  background: item.highlight
                    ? "linear-gradient(135deg, #797631 0%, #a5a24a 50%, #797631 100%)"
                    : "rgba(121, 118, 51, 0.05)",
                  borderRadius: "10px",
                  marginBottom: "30px",
                  border: item.highlight
                    ? "none"
                    : "1px solid rgba(121, 118, 51, 0.2)",
                  color: item.highlight ? "white" : "#495057",
                }}
              >
                <div className="d-flex align-items-start">
                  <i
                    className={item.icon}
                    style={{
                      fontSize: "18px",
                      color: item.highlight ? "white" : "#797633",
                      marginRight: "12px",
                      marginTop: "5px",
                      opacity: item.highlight ? "1" : "0.8",
                    }}
                  ></i>
                  <div className="flex-grow-1">
                    <small
                      style={{
                        color: item.highlight
                          ? "rgba(255,255,255,0.8)"
                          : "#6c757d",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {item.label}
                    </small>
                    <div
                      style={{
                        fontWeight: item.highlight ? "600" : "500",
                        fontSize: item.highlight ? "16px" : "14px",
                        marginTop: "2px",
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Additional Features Section */}
      <div className="col-12">
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "25px",
            border: "1px solid #e9ecef",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div className="d-flex align-items-center mb-1">
            <div
              style={{
                borderRadius: "8px",
                padding: "8px",
                marginRight: "8px",
                marginTop: "4px",
              }}
            >
              <i
                className="flaticon-favourite"
                style={{ fontSize: "20px", color: "#797633" }}
              ></i>
            </div>
            <h5 className="mb-0" style={{ color: "black", fontWeight: "600" }}>
              Additional Features
            </h5>
          </div>

          <div className="row d-flex">
            <div className="col-md-4 mb-3 d-flex align-items-center">
              <div
                className="feature-card w-100 text-center"
                style={{
                  padding: "20px",
                  background:
                    "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  borderRadius: "10px",
                  border: "1px solid #dee2e6",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "white";
                  e.currentTarget.querySelector(".feature-icon").style.color =
                    "white";
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(121, 118, 51, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)";
                  e.currentTarget.style.color = "#495057";
                  e.currentTarget.querySelector(".feature-icon").style.color =
                    "#797633";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <i
                  className="flaticon-car feature-icon"
                  style={{
                    fontSize: "32px",
                    color: "#797633",
                    marginBottom: "10px",
                    transition: "color 0.3s ease",
                  }}
                ></i>
                <h6 style={{ fontWeight: "600", marginBottom: "5px" }}>
                  Parking Available
                </h6>
                <p
                  className="mb-0"
                  style={{ fontSize: "14px", opacity: "0.8" }}
                >
                  {formatBoolean(property?.parking_available)}
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-3 d-flex align-items-center">
              <div
                className="feature-card text-center"
                style={{
                  padding: "20px",
                  background:
                    "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  borderRadius: "10px",
                  border: "1px solid #dee2e6",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "white";
                  e.currentTarget.querySelector(".feature-icon").style.color =
                    "white";
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(121, 118, 51, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)";
                  e.currentTarget.style.color = "#495057";
                  e.currentTarget.querySelector(".feature-icon").style.color =
                    "#797633";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <i
                  className="flaticon-shopping-cart feature-icon"
                  style={{
                    fontSize: "32px",
                    color: "#797633",
                    marginBottom: "10px",
                    transition: "color 0.3s ease",
                  }}
                ></i>
                <h6 style={{ fontWeight: "600", marginBottom: "5px" }}>
                  Retail Centers
                </h6>
                <p
                  className="mb-0"
                  style={{ fontSize: "14px", opacity: "0.8" }}
                >
                  {property?.retail_centers || 0}
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-3 d-flex align-items-center">
              <div
                className="feature-card text-center"
                style={{
                  padding: "20px",

                  borderRadius: "10px",
                  color: "white",
                  border: "none",
                  boxShadow: "0 4px 15px rgba(121, 118, 51, 0.3)",
                }}
              >
                <i
                  className="flaticon-star"
                  style={{
                    fontSize: "32px",
                    color: "white",
                    marginBottom: "10px",
                  }}
                ></i>
                <h6 style={{ fontWeight: "600", marginBottom: "5px" }}>
                  Premium Property
                </h6>
                <p
                  className="mb-0"
                  style={{ fontSize: "14px", opacity: "0.9" }}
                >
                  Exclusive Features Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraPropertyDetails;
