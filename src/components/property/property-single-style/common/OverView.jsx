import React from "react";
import { useLocation } from "react-router-dom";

const OverView = ({ property }) => {
  const location = useLocation();
  const isOffPlan = location.pathname.startsWith("/off-plan");
  // Helper function to get comma-separated bedroom list
  const getBedroomList = () => {
    if (!property?.unit_blocks || property.unit_blocks.length === 0) {
      return "N/A";
    }

    const bedrooms = [];
    property.unit_blocks.forEach((block) => {
      const name = block?.name?.toLowerCase() || "";

      // Skip studios
      if (name.includes("studio")) return;

      if (name.includes("1,5") || name.includes("1.5")) {
        bedrooms.push(1.5);
      } else if (name.includes("2,5") || name.includes("2.5")) {
        bedrooms.push(2.5);
      } else {
        const match = name.match(/(\d+)\s*bedroom/);
        if (match) {
          bedrooms.push(parseFloat(match[1]));
        }
      }
    });

    if (bedrooms.length === 0) return "N/A";

    const uniqueBedrooms = [...new Set(bedrooms)].sort((a, b) => a - b);
    const min = uniqueBedrooms[0];
    const max = uniqueBedrooms[uniqueBedrooms.length - 1];

    // Format as "1 BR - 2.5 BR" or just "2 BR"
    return min === max ? `${min} BR` : `${min} BR - ${max} BR`;
  };
  // Helper function to get completion year
  const getYearBuilt = () => {
    if (!property?.completion_datetime) return "Under Construction";
    const year = new Date(property.completion_datetime).getFullYear();
    const currentYear = new Date().getFullYear();
    return year > currentYear
      ? `${!isOffPlan ? "Est. " : ""} ${year}`
      : year.toString();
  };

  // Helper function to get area range in sqft
  const getAreaRange = () => {
    if (!property?.unit_blocks || property.unit_blocks.length === 0) {
      return "N/A";
    }

    const areas = property.unit_blocks
      .filter(
        (block) =>
          block?.units_area_from_m2 && parseFloat(block.units_area_from_m2) > 0
      )
      .map((block) =>
        Math.round(parseFloat(block.units_area_from_m2) * 10.764)
      ); // Convert m2 to sqft

    if (areas.length === 0) return "N/A";

    const min = Math.min(...areas);
    const max = Math.max(...areas);

    if (min === max) {
      return `${min.toLocaleString()} sqft`;
    } else {
      return `${min.toLocaleString()} - ${max.toLocaleString()} sqft`;
    }
  };

  // Helper function to get all unique property types
  const getPropertyType = () => {
    if (!property?.unit_blocks || property.unit_blocks.length === 0) {
      return "Residential";
    }

    const uniqueTypes = [
      ...new Set(
        property.unit_blocks
          .map((block) => block?.normalized_type)
          .filter((type) => type) // Remove null/undefined values
      ),
    ];

    return uniqueTypes.length > 0 ? uniqueTypes.join(", ") : "Residential";
  };

  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "Bedroom",
      value: getBedroomList(),
    },
    {
      icon: "flaticon-event",
      label: isOffPlan ? "Handover" : "Year built",
      value: getYearBuilt(),
    },
    {
      icon: "flaticon-expand",
      label: "Area",
      value: getAreaRange(),
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "Property Type",
      value: getPropertyType(),
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

export default OverView;
