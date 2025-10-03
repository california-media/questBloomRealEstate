import React from "react";
import { useLocation } from "react-router-dom";

const AdminOverView = ({ property, prefixedId }) => {
  const location = useLocation();
  const isOffPlan = location.pathname.startsWith("/off-plan");

  // Helper function to get bedroom display
  const getBedroomDisplay = () => {
    if (!property?.bedrooms) return "N/A";
    return `${property?.bedrooms} BR`;
  };

  // Helper function to get completion year
  const getYearBuilt = () => {
    if (!property?.year_built) return "Under Construction";
    const year = property?.year_built;
    const currentYear = new Date().getFullYear();
    return year > currentYear
      ? `${!isOffPlan ? "Est. " : ""} ${year}`
      : year.toString();
  };

  // Helper function to get area in sqft
  const getAreaDisplay = () => {
    if (!property?.area || parseFloat(property?.area) <= 0) {
      return "N/A";
    }

    const areaM2 = parseFloat(property?.area);
    const areaSqft = Math.round(areaM2 * 10.764); // Convert m2 to sqft
    return `${areaSqft.toLocaleString()} sqft`;
  };

  // Helper function to get property type
  const getPropertyType = () => {
    if (!property?.property_type?.name) return "Residential";

    // Capitalize first letter of each word
    return property?.property_type?.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "Bedroom",
      value: getBedroomDisplay(),
    },
    {
      icon: "flaticon-event",
      label: isOffPlan ? "Handover" : "Year built",
      value: getYearBuilt(),
    },
    {
      icon: "flaticon-expand",
      label: "Area",
      value: getAreaDisplay(),
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "Property Type",
      value: getPropertyType(),
    },
    {
      icon: "flaticon-home-2",
      label: "Property ID",
      value: property && prefixedId,
    },
  ];

  return (
    <>
      {overviewData.map((item, index) => (
        <div
          key={index}
          className={`col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"} d-flex`}
        >
          <div className="overview-element d-flex align-items-start w-100">
            <span className={`icon ${item.icon} flex-shrink-0`} />
            <div className="ml15 flex-grow-1">
              <h6 className="mb-0">{item.label}</h6>
              <p className="text mb-0 fz15">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AdminOverView;
