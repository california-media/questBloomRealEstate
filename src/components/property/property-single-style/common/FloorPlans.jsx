const UnitPlans = ({ property }) => {
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
    const match = name.match(/(\d+(?:,\d+)?)\s*bedroom/i);
    if (match) {
      const bedrooms = match[1].replace(",", ".");
      const bedroomNum = parseFloat(bedrooms);
      if (bedroomNum === 0 || name.toLowerCase().includes("studio")) {
        return "Studio";
      }
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
  const formatArea = (areaM2, areaUnit = "sqft") => {
    if (!areaM2 || areaM2 === "0") return "N/A";

    const area = parseFloat(areaM2);
    if (areaUnit === "sqft") {
      // Convert m2 to sqft (1 m2 = 10.764 sqft)
      const sqft = Math.round(area * 10.764);
      return `${sqft} sqft`;
    }
    return `${Math.round(area)} m²`;
  };

  // Helper function to format price
  const formatPrice = (priceFromAed, priceToAed, currency = "AED") => {
    if (!priceFromAed && !priceToAed) return "Price on Request";

    if (priceFromAed && priceToAed && priceFromAed !== priceToAed) {
      return `${currency} ${parseInt(
        priceFromAed
      ).toLocaleString()} - ${parseInt(priceToAed).toLocaleString()}`;
    }

    const price = priceFromAed || priceToAed;
    return `${currency} ${parseInt(price).toLocaleString()}`;
  };

  const units = property?.unit_blocks || [];

  if (!units.length) {
    return (
      <div className="text-center py-4">
        <p>No unit information available</p>
      </div>
    );
  }

  return (
    <div className="accordion" id="accordionExample">
      {units.map((unit, index) => (
        <div
          className={`accordion-item ${index === 0 ? "active" : ""}`}
          key={unit.id}
        >
          <h2 className="accordion-header" id={`heading${index}`}>
            <button
              className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded={index === 0 ? "true" : "false"}
              aria-controls={`collapse${index}`}
            >
              <span className="w-100 d-md-flex align-items-center">
                <span className="mr10-sm">Unit {index + 1}</span>
                <span className="ms-auto d-md-flex align-items-center justify-content-end">
                  <span className="me-2 me-md-4">
                    <span className="fw600">Size: </span>
                    <span className="text">
                      {formatArea(unit.units_area_from_m2, unit.area_unit)}
                    </span>
                  </span>
                  <span className="me-2 me-md-4">
                    <span className="fw600">Bedrooms: </span>
                    <span className="text">{getBedroomCount(unit.name)}</span>
                  </span>
                  <span>
                    <span className="fw600">Price: </span>
                    <span className="text">
                      {formatPrice(
                        unit.units_price_from_aed,
                        unit.units_price_to_aed,
                        unit.price_currency
                      )}
                    </span>
                  </span>
                </span>
              </span>
            </button>
          </h2>
          <div
            id={`collapse${index}`}
            className={`accordion-collapse collapse ${
              index === 0 ? "show" : ""
            }`}
            aria-labelledby={`heading${index}`}
            data-parent="#accordionExample"
          >
            <div className="accordion-body text-center">
              {getImageUrl(unit.typical_unit_image_url) ? (
                <img
                  className="w-100 h-100 cover"
                  src={getImageUrl(unit.typical_unit_image_url)}
                  alt={`Unit ${index + 1} floor plan`}
                />
              ) : (
                <div className="text-muted py-4">
                  <p>Floor plan image not available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UnitPlans;
