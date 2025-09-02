import React from "react";
import { ImageIcon } from "lucide-react";

const UnitPlans = ({ units = [] }) => {
  // Helper function to extract image URL from the string format
  const getImageUrl = (imageUrlString) => {
    try {
      const parsed = JSON.parse(imageUrlString);
      return parsed[0]?.url || "";
    } catch (error) {
      return "";
    }
  };

  // Helper function to extract bedroom count for display
  const getBedroomCount = (name) => {
    // Extract bedroom info from name (e.g., "1 bedroom" or "1,5 bedroom")
    if (!name) return "N/A";

    const nameLower = name.toLowerCase();

    // Handle "Studio Apartments" case specifically
    if (nameLower.includes("studio apartments")) {
      return "Studio";
    }

    // Handle regular bedroom patterns
    const match = name.match(/(\d+(?:,\d+)?)\s*bedroom/i);
    if (match) {
      const bedrooms = match[1].replace(",", ".");
      const bedroomNum = parseFloat(bedrooms);

      // Convert decimal to range format (e.g., 1.5 becomes "1-2")
      if (bedroomNum % 1 !== 0) {
        const lower = Math.floor(bedroomNum);
        const upper = Math.ceil(bedroomNum);
        return `${lower}-${upper}`;
      }
      return Math.floor(bedroomNum).toString();
    }

    return "N/A";
  };

  // Helper function to format area
  const formatArea = (areaFromM2, areaToM2, areaUnit = "sqft") => {
    const areaFrom = areaFromM2 ? parseFloat(areaFromM2) : null;
    const areaTo = areaToM2 ? parseFloat(areaToM2) : null;

    if (!areaFrom && !areaTo) return "N/A";

    const convertToSqft = (area) => {
      if (areaUnit === "sqft") {
        return Math.round(area * 10.764);
      }
      return Math.round(area);
    };

    const unit = areaUnit === "sqft" ? "sqft" : "m²";

    if (areaFrom && !areaTo) {
      return `Starting from ${convertToSqft(areaFrom)} ${unit}`;
    }

    if (!areaFrom && areaTo) {
      return `No info - ${convertToSqft(areaTo)} ${unit}`;
    }

    if (areaFrom && areaTo && areaFrom !== areaTo) {
      return `${convertToSqft(areaFrom)} ${unit} — ${convertToSqft(
        areaTo
      )} ${unit}`;
    }

    const area = areaFrom || areaTo;
    return `${convertToSqft(area)} ${unit}`;
  };

  // Helper function to extract property type from name
  const getPropertyType = (name) => {
    if (!name) return "Property";

    const nameLower = name.toLowerCase();

    // Handle "Studio Apartments" case specifically
    if (nameLower.includes("studio apartments")) {
      return "Apartments";
    }

    // Look for other property types
    const propertyTypes = [
      { key: "apartment", display: "Apartments" },
      { key: "villa", display: "Villas" },
      { key: "townhouse", display: "Townhouses" },
      { key: "penthouse", display: "Penthouses" },
    ];

    for (const type of propertyTypes) {
      if (nameLower.includes(type.key)) {
        return type.display;
      }
    }

    return "Property";
  };

  // Helper function to format price
  const formatPrice = (priceFromAed, priceToAed, currency = "AED") => {
    if (!priceFromAed && !priceToAed) return "Ask for Price";

    if (priceFromAed && priceToAed && priceFromAed !== priceToAed) {
      return `${currency} ${parseInt(
        priceFromAed
      ).toLocaleString()} — ${currency} ${parseInt(
        priceToAed
      ).toLocaleString()}`;
    }

    const price = priceFromAed || priceToAed;
    return `${currency} ${parseInt(price).toLocaleString()}`;
  };

  if (!units.length) {
    return (
      <div className="col-md-12">
        <div className="text-center py-4">
          <p>No unit information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row w-100 p-0 justify-content-center align-items-center pt-2">
      <div className="row row-cols-1  row-cols-md-2 g-3 mt-0">
        {units.map((unit, index) => (
          <div
            className="col d-flex flex-column m-0 mb-3"
            key={unit.id || index}
          >
            <div className="card border-0 flex-grow-1 h-100">
              {getImageUrl(unit.typical_unit_image_url) ? (
                <img
                  src={getImageUrl(unit.typical_unit_image_url)}
                  className="card-img-top img-fluid rounded-top"
                  alt={`Unit ${index + 1} floor plan`}
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
                    height: "300px",
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
                {/* Property Type and Bedroom Tags */}
                <div className="mb-3">
                  <span
                    className="badge me-2 px-2 py-1 rounded"
                    style={{
                      backgroundColor: "#f8f9fa",
                      color: "#6c757d",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {getPropertyType(unit.name)}
                  </span>
                  <span
                    className="badge px-2 py-1 rounded"
                    style={{
                      backgroundColor: "#f8f9fa",
                      color: "#6c757d",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {getBedroomCount(unit.name) === "Studio"
                      ? "Studio"
                      : `${getBedroomCount(unit.name)} bedroom`}
                  </span>
                </div>

                <div className="unit-details">
                  <div className="price-section mb-2">
                    <h5 className="text-dark mb-0">
                      {formatPrice(
                        unit.units_price_from_aed,
                        unit.units_price_to_aed,
                        unit.price_currency
                      )}
                    </h5>
                  </div>

                  <div className="area-section">
                    <p className="card-text text-muted small mb-0">
                      {formatArea(
                        unit.units_area_from_m2,
                        unit.units_area_to_m2,
                        unit.area_unit
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitPlans;
