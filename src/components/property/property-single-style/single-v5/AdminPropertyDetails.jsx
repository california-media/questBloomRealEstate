import React from "react";
import { useLocation } from "react-router-dom";

const AdminPropertyDetails = ({ property, prefixedId }) => {
  const location = useLocation();
  const isOffPlan = location.pathname.startsWith("/off-plan");

  // Helper function to get bedroom count
  const getBedroomList = () => {
    if (!property?.bedrooms) return "N/A";
    return `${property?.bedrooms} BR`;
  };

  // Helper function to get completion year
  const getYearBuilt = () => {
    if (!property?.year_built) return "Under Construction";
    const currentYear = new Date().getFullYear();
    return property?.year_built > currentYear
      ? `${!isOffPlan ? "Est. " : ""}${property?.year_built}`
      : property?.year_built?.toString();
  };

  // Helper function to get area in sqft
  const getArea = () => {
    if (!property?.area) return "N/A";
    const areaSqft = Math.round(parseFloat(property?.area) * 10.764); // Convert to sqft if needed
    return `${areaSqft.toLocaleString()} sqft`;
  };

  // Helper function to get property type
  const getPropertyType = () => {
    return (
      (property?.property_type?.name || "Residential").charAt(0).toUpperCase() +
      property?.property_type?.name?.slice(1)
    );
  };

  // Helper function to get price
  const getPrice = () => {
    if (!property?.price) return "Ask for price";
    return `AED ${property?.price?.toLocaleString()}`;
  };

  const columns = [
    [
      {
        label: "Property ID",
        value: prefixedId || "N/A",
      },
      {
        label: "Price",
        value: getPrice(),
      },
      {
        label: "Property Size",
        value: getArea(),
      },
    ],
    [
      {
        label: "Bedrooms",
        value: getBedroomList(),
      },
      {
        label: isOffPlan ? "Handover" : "Year built",
        value: getYearBuilt(),
      },
      {
        label: "Property Type",
        value: getPropertyType(),
      },
    ],
  ];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="col-md-6 col-xl-6">
          {column.map((detail, index) => (
            <div key={index} className="d-flex justify-content-between">
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">
                  {detail.label}
                </p>
              </div>
              <div className="pd-list">
                <p className="text mb10">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminPropertyDetails;
