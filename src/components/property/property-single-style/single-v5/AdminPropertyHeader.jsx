import React, { useEffect, useState } from "react";

const styles = {
  textShadowDesktop: {
    // Base style (no shadow by default)
    textShadow: "none",
    // Apply shadow only on desktop (≥ 992px)
    "@media (minWidth: 992px)": {
      textShadow: "0px 0px 7px rgba(0, 0, 0, 0.7)",
    },
  },
};

const AdminPropertyHeader = ({ property, prefixedId }) => {
  // Helper function to get completion year
  const getCompletionYear = () => {
    if (!property?.year_built) return null;
    return property?.year_built;
  };

  // Helper function to calculate years until completion
  const getYearsUntilCompletion = () => {
    const completionYear = getCompletionYear();
    if (!completionYear) return null;
    const currentYear = new Date().getFullYear();
    const diff = completionYear - currentYear;
    return diff > 0
      ? `${diff} years to completion`
      : `Completed ${Math.abs(diff)} years ago`;
  };

  // Get area display
  const getAreaDisplay = () => {
    if (property?.area && parseFloat(property.area) > 0) {
      const areaM2 = parseFloat(property.area);
      // Convert m2 to sqft (1 m2 = 10.764 sqft)
      return Math.round(areaM2 * 10.764);
    }
    return null;
  };

  // Get property status
  const getPropertyStatus = () => {
    if (property?.project_status) {
      return (
        property.project_status.charAt(0).toUpperCase() +
        property.project_status.slice(1)
      );
    }
    return "Available";
  };

  return (
    <>
      <div
        className="col-lg-8 w-100 "
        style={{ padding: "50px", paddingTop: "30px", paddingLeft: "30px" }}
      >
        <div className="single-property-content mb30-md ">
          {getYearsUntilCompletion() && (
            <>
              {/* Desktop version */}
              <a
                className="ff-heading fz15 pr10 ml0-sm bdrrn-sm d-none  d-lg-block"
                href="#"
                style={{
                  ...styles.textShadowDesktop,
                  padding: "6px 12px",
                  backgroundColor: "rgba(128, 128, 128, 0.4)",
                  borderRadius: "4px",
                  display: "block", // Ensures width fits content
                  width: "fit-content",
                  whiteSpace: "nowrap", // Prevents text from wrapping
                }}
              >
                <i className="far fa-clock pe-2" />
                {getYearsUntilCompletion()}
              </a>

              {/* Mobile version */}
              <a
                className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm d-lg-none"
                href="#"
                style={{
                  padding: "6px 12px",
                  backgroundColor: "rgba(128, 128, 128, 0.2)",
                  borderRadius: "4px",
                  display: "inline-block", // Ensures width fits content
                  whiteSpace: "nowrap", // Prevents text from wrapping
                }}
              >
                <i className="far fa-clock pe-2" />
                {getYearsUntilCompletion()}
              </a>
            </>
          )}
          <h2
            className="sp-lg-title mt10 d-none d-lg-block"
            style={styles.textShadowDesktop}
          >
            {property?.property_title || "Property Name"}
          </h2>
          <h2 className="sp-lg-title d-lg-none">
            {property?.property_title || "Property Name"}
          </h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p
              className="text fz15 mb-0  pr10 bdrrn-sm d-none d-lg-block"
              style={styles.textShadowDesktop}
            >
              {property?.location || "Location"}
            </p>
            <p className="text fz15 mb-0 pr10 bdrrn-sm d-lg-none">
              {property?.location || "Location"}
            </p>
          </div>
          <div className="property-meta d-flex align-items-baseline">
            <a
              className="ff-heading text-thm fz15 bdrr1 d-flex pr10 bdrrn-sm d-none d-lg-block "
              href="#"
              style={styles.textShadowDesktop}
            >
              <i className="fas fa-circle fz10  pe-2  " />
              {getPropertyStatus()}
            </a>
            <a
              className="ff-heading text-thm fz15 bdrr1 pr10 bdrrn-sm d-lg-none "
              href="#"
            >
              <i className="fas fa-circle fz10 pe-2" />
              {getPropertyStatus()}
            </a>

            {getAreaDisplay() && (
              <>
                <a
                  className="ff-heading ml10 ml0-sm fz15 d-none d-lg-block"
                  href="#"
                  style={styles.textShadowDesktop}
                >
                  <i className="flaticon-fullscreen pe-2 align-text-top" />
                  {getAreaDisplay()} sqft
                </a>
                <a className="ff-heading ml10 ml0-sm fz15 d-lg-none" href="#">
                  <i className="flaticon-fullscreen pe-2 align-text-top" />
                  {getAreaDisplay()} sqft
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPropertyHeader;
