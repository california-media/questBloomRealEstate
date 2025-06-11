export default function mapApiDataToTemplate(normalData, detailedData) {
  let imageUrl = "";
  try {
    const parsedImage = JSON.parse(normalData.cover_image_url);
    imageUrl = parsedImage.url || "";
  } catch {
    imageUrl = "";
  }

  const getAreaRange = () => {
    if (!detailedData?.unit_blocks || detailedData.unit_blocks.length === 0) {
      return [0, 0]; ///min 0 max 0
    }

    const areas = detailedData.unit_blocks
      .filter(
        (block) =>
          block?.units_area_from_m2 && parseFloat(block.units_area_from_m2) > 0
      )
      .map((block) =>
        Math.round(parseFloat(block.units_area_from_m2) * 10.764)
      ); // Convert m2 to sqft

    if (areas.length === 0) return [0, 0];
    return [Math.min(...areas), Math.max(...areas)];
  };
  const areas = getAreaRange();

  const bedrooms = [];
  detailedData.unit_blocks.forEach((block) => {
    const name = block?.name?.toLowerCase() || "";

    // Skip studios
    if (name.includes("studio")) return;

    // Match patterns like "1.5 bedroom", "2,5 bedrooms", or just "2.5"
    const match = name.match(/(\d+[.,]?\d*)\s*bedroom/);

    if (match) {
      // Replace comma with dot and parse as float
      const bedroomCount = parseFloat(match[1].replace(",", "."));
      bedrooms.push(bedroomCount);
    }
  });

  const uniqueBedrooms = [...new Set(bedrooms)].sort((a, b) => a - b);

  const featuresAmenitiesData = detailedData.facilities.map(
    (facility) => facility.name
  );

  const [lat, long] = normalData.coordinates
    .split(",")
    .map((coord) => parseFloat(coord.trim()));

  return {
    id: normalData.id,
    image: imageUrl || "/images/fallback.jpg", // fallback image
    location: normalData.area || "Unknown",
    title: normalData.name || "Untitled Property",
    developer:
      normalData.developer && normalData.developer != "Object 1"
        ? normalData.developer
        : "Unknown",
    post_handover: normalData.post_handover || false,
    city: normalData.area || "Unknown",
    bed: uniqueBedrooms[uniqueBedrooms.length - 1], ///max number of bedrooms
    bath: "0",
    sqft: normalData.area_unit === "sqft" ? 1200 : 0, // hardcoded or computed
    min_sqft: areas[0],
    max_sqft: areas[1],
    price:
      normalData.min_price_aed ?? normalData.min_price ?? normalData.max_price
        ? `$${
            normalData.min_price_aed ??
            normalData.min_price ??
            normalData.max_price
          }`
        : "$0",
    forRent: false,
    tags: ["presale", normalData.sale_status?.toLowerCase()],
    propertyTypes: [
      ...new Set(detailedData.unit_blocks.map((block) => block.unit_type)),
    ], // unit_types
    yearBuilding: normalData.completion_datetime
      ? new Date(normalData.completion_datetime).getFullYear()
      : "N/A",
    featured: false,
    sale_status: normalData.sale_status,
    status: normalData.status,
    lat,
    long,
    features: featuresAmenitiesData,
  };
}
