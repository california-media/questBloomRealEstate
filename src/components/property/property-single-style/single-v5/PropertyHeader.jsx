import { Heart } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
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
const PropertyHeader = ({ property, loading }) => {
  // Helper function to get completion year
  const getCompletionYear = () => {
    if (!property?.completion_datetime) return null;
    return new Date(property?.completion_datetime).getFullYear();
  };

  // Helper function to calculate years until completion
  const getYearsUntilCompletion = () => {
    const completionYear = getCompletionYear();
    if (!completionYear) return null;
    const currentYear = new Date().getFullYear();
    const diff = completionYear - currentYear;
    return diff > 0
      ? `${diff} year${diff === 1 ? "" : "s"} to completion`
      : `Completed ${Math.abs(diff)} year${
          Math.abs(diff) === 1 ? "" : "s"
        } ago`;
  };

  // Get area range for price per sqft calculation
  const getAreaDisplay = () => {
    if (property?.unit_blocks && property?.unit_blocks.length > 0) {
      const areas = property?.unit_blocks
        .filter(
          (block) =>
            block.units_area_from_m2 && parseFloat(block.units_area_from_m2) > 0
        )
        .map((block) => parseFloat(block.units_area_from_m2));

      if (areas.length > 0) {
        const minArea = Math.min(...areas);
        // Convert m2 to sqft (1 m2 = 10.764 sqft)
        return Math.round(minArea * 10.764);
      }
    }
    return null;
  };

  // Skeleton loader component
  const SkeletonLoader = ({
    width = "100%",
    height = "1rem",
    className = "",
  }) => (
    <div
      className={`skeleton-loader ${className}`}
      style={{
        width,
        height,
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    ></div>
  );

  return (
    <>
      <div
        className="col-lg-8 pb-1 pb-md-4 pt-3 "
        style={{ padding: "50px", paddingTop: "30px", paddingLeft: "30px" }}
      >
        <div className="single-property-content mb30-md">
          {loading ? (
            <>
              {/* Loading state for years until completion */}
              <div
                className="d-none d-lg-block"
                style={{
                  padding: "6px 12px",
                  backgroundColor: "rgba(128, 128, 128, 0.4)",
                  borderRadius: "4px",
                  width: "fit-content",
                  marginBottom: "10px",
                }}
              >
                <SkeletonLoader width="150px" height="1rem" />
              </div>
              <div
                className="d-lg-none mb10"
                style={{
                  padding: "6px 12px",
                  backgroundColor: "rgba(128, 128, 128, 0.2)",
                  borderRadius: "4px",
                  width: "fit-content",
                  marginBottom: "10px",
                }}
              >
                <SkeletonLoader width="150px" height="1rem" />
              </div>

              {/* Loading state for title */}
              <div
                className="mt10 d-none d-lg-block"
                style={styles.textShadowDesktop}
              >
                <SkeletonLoader width="80%" height="2rem" />
              </div>
              <div className="d-lg-none">
                <SkeletonLoader width="80%" height="2rem" />
              </div>

              {/* Loading state for location */}
              <div className="pd-meta mb15 d-md-flex align-items-center">
                <div
                  className="pr10 bdrrn-sm d-none d-lg-block"
                  style={styles.textShadowDesktop}
                ></div>
              </div>

              {/* Loading state for property meta */}
              <div className="property-meta d-flex align-items-center">
                <div
                  className="ff-heading text-thm fz15 bdrr1 d-flex pr10 bdrrn-sm d-none d-lg-block"
                  style={styles.textShadowDesktop}
                >
                  <SkeletonLoader width="100px" height="1rem" />
                </div>
                <div className="ff-heading text-thm fz15 bdrr1 pr10 bdrrn-sm d-lg-none">
                  <SkeletonLoader width="100px" height="1rem" />
                </div>

                <div
                  className="ff-heading ml10 ml0-sm fz15 d-none d-lg-block"
                  style={styles.textShadowDesktop}
                >
                  <SkeletonLoader width="80px" height="1rem" />
                </div>
                <div className="ff-heading ml10 ml0-sm fz15 d-lg-none">
                  <SkeletonLoader width="80px" height="1rem" />
                </div>
              </div>
            </>
          ) : (
            <>
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
                    className="ff-heading bdrr1 fz15 pr10 mb10 ml10 ml0-sm bdrrn-sm d-lg-none"
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
                {property?.name || "Property Name"}
              </h2>
              <h2 className="sp-lg-title d-lg-none">
                {property?.name || "Property Name"}
              </h2>
              <div className="pd-meta mb15 d-md-flex align-items-center">
                <p
                  className="text fz15 mb-0  pr10 bdrrn-sm d-none d-lg-block"
                  style={styles.textShadowDesktop}
                >
                  {property?.area}, {property?.country}
                </p>
                <p className="text fz15 mb-0 pr10 bdrrn-sm d-lg-none">
                  {property?.area}, {property?.country}
                </p>
              </div>
              <div className="property-meta d-flex align-items-center">
                <a
                  className="ff-heading text-thm fz15 bdrr1 d-flex pr10 bdrrn-sm d-none d-lg-block "
                  href="#"
                  style={styles.textShadowDesktop}
                >
                  <i className="fas fa-circle fz10  pe-2  " />
                  {property?.sale_status}
                </a>
                <a
                  className="ff-heading text-thm fz15 bdrr1 pr10 bdrrn-sm d-lg-none "
                  href="#"
                >
                  <i className="fas fa-circle fz10 pe-2" />
                  {property?.sale_status}
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
                    <a
                      className="ff-heading ml10 ml0-sm fz15 d-lg-none"
                      href="#"
                    >
                      <i className="flaticon-fullscreen pe-2 align-text-top" />
                      {getAreaDisplay()} sqft
                    </a>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add CSS animation for the skeleton loader */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default PropertyHeader;
