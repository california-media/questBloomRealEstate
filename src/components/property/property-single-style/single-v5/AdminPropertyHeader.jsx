import { Heart, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminPropertyPDF from "./AdminPropertyPDF";
import { pdf } from "@react-pdf/renderer";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    typeof window !== "undefined" && localStorage.getItem("favourites")
      ? JSON.parse(localStorage.getItem("favourites")).includes(prefixedId)
      : false
  );

  

  const handleShareClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!", {
      position: "bottom-right",
      duration: 3000,
    });
  };

  const handlePrintClick = async () => {
    try {
      setIsGenerating(true);
      const blob = await pdf(<AdminPropertyPDF property={property} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${property.property_title}_brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    let favorites = [];
    if (typeof window !== "undefined") {
      favorites = localStorage.getItem("favourites")
        ? JSON.parse(localStorage.getItem("favourites"))
        : [];
    }

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((id) => id !== prefixedId);
      toast(
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="red">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>Removed from favorites!</span>
        </div>,
        {
          position: "bottom-right",
          duration: 2000,
        }
      );
    } else {
      // Add to favorites
      favorites.push(prefixedId);
      toast(
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="red">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>Added to favorites!</span>
        </div>,
        {
          position: "bottom-right",
          duration: 2000,
        }
      );
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("favourites", JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  // Helper function to format price
  const formatPrice = (price) => {
    if (!price) return "Ask for price";
    return `${Math.round(price).toLocaleString()}`;
  };

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

  // Get price display
  const getPriceDisplay = () => {
    if (property?.price) {
      return formatPrice(property.price);
    }
    return "Ask for price";
  };

  // Helper function to get price per sqft display
  const getPricePerSqftDisplay = () => {
    if (!property?.price || !property?.area) return null;

    const priceAed = property.price;
    const areaM2 = parseFloat(property.area);

    if (areaM2 <= 0) return null;

    const areaSqft = areaM2 * 10.764; // Convert m2 to sqft
    const pricePerSqft = priceAed / areaSqft;

    return isFinite(pricePerSqft)
      ? Math.floor(pricePerSqft).toLocaleString()
      : null;
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
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2
            className="sp-lg-title d-none d-lg-block"
            style={styles.textShadowDesktop}
          >
            {property?.property_title || "Property Name"}
          </h2>
          <h2 className="sp-lg-title d-lg-none">
            {property?.property_title || "Property Name"}
          </h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p
              className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm d-none d-lg-block"
              style={styles.textShadowDesktop}
            >
              {property?.location || "Location"}
            </p>
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm d-lg-none">
              {property?.location || "Location"}
            </p>
          </div>
          <div className="property-meta d-flex align-items-center">
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

            {getYearsUntilCompletion() && (
              <>
                <a
                  className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm d-none d-lg-block"
                  href="#"
                  style={styles.textShadowDesktop}
                >
                  <i className="far fa-clock pe-2" />
                  {getYearsUntilCompletion()}
                </a>
                <a
                  className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm d-lg-none"
                  href="#"
                >
                  <i className="far fa-clock pe-2" />
                  {getYearsUntilCompletion()}
                </a>
              </>
            )}

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

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              {/* Favorite/Like Button - Desktop */}
              <a
                className="icon mr10 d-none d-lg-block"
                href="#"
                onClick={handleFavoriteClick}
                style={styles.textShadowDesktop}
              >
                <Heart
                  fill={isFavorite ? "red" : "none"}
                  color={isFavorite ? "red" : "currentColor"}
                  size={20} // adjust as needed
                  className="pb5"
                />
              </a>

              {/* Favorite/Like Button - Mobile */}
              <a
                className="icon mr10 d-lg-none"
                href="#"
                onClick={handleFavoriteClick}
              >
                <Heart
                  fill={isFavorite ? "red" : "none"}
                  color={isFavorite ? "red" : "currentColor"}
                  size={20} // adjust as needed
                />
              </a>

              {/* Share Button */}
              <a
                className="icon mr10 d-none d-lg-block"
                href="#"
                onClick={handleShareClick}
                style={styles.textShadowDesktop}
              >
                <span className="flaticon-share-1" />
              </a>
              <a
                className="icon mr10 d-lg-none"
                href="#"
                onClick={handleShareClick}
              >
                <span className="flaticon-share-1" />
              </a>

              {/* Print Button */}
              <a
                className="icon d-none d-lg-block"
                href="#"
                onClick={handlePrintClick}
                style={styles.textShadowDesktop}
              >
                {isGenerating ? (
                  <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <span className="flaticon-printer" />
                )}
              </a>
              <a className="icon d-lg-none" href="#" onClick={handlePrintClick}>
                {isGenerating ? (
                  <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <span className="flaticon-printer" />
                )}
              </a>
            </div>

            <h3
              className="price mb-0 d-none d-lg-block"
              style={styles.textShadowDesktop}
            >
              {getPriceDisplay() === "Ask for price"
                ? "Ask for price"
                : "AED " + getPriceDisplay()}
            </h3>
            <h3 className="price mb-0 d-lg-none">
              {getPriceDisplay() === "Ask for price"
                ? "Ask for price"
                : "AED " + getPriceDisplay()}
            </h3>

            {(() => {
              const pricePerSqft = getPricePerSqftDisplay();
              return pricePerSqft ? (
                <>
                  <p
                    className="text space fz15 d-none d-lg-block"
                    style={styles.textShadowDesktop}
                  >
                    Starting from AED {pricePerSqft} per sqft
                  </p>
                  <p className="text space fz15 d-lg-none">
                    Starting from AED {pricePerSqft} per sqft
                  </p>
                </>
              ) : null;
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPropertyHeader;
