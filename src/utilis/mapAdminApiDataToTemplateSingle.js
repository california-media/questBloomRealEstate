export default function mapAdminApiDataToTemplateSingle(apiData) {
    console.log(apiData);
  let imageUrl = "";
  try {
    // Use first photo if available, otherwise empty string
    imageUrl = apiData.photos?.[0] || "";
  } catch {
    imageUrl = "";
  }

  return {
    id: apiData.id,
    image: imageUrl || "/images/fallback.jpg", // fallback image
    title: apiData.property_title || "Untitled Property",
    developer: "Unknown", // Not available in new API
    post_handover: apiData.handover_date
      ? new Date(apiData.handover_date) > new Date()
      : false,
    city: apiData.location || "Unknown",
    location: apiData.location || "Unknown",
    bed: apiData.bedrooms?.toString() || "0",
    bath: apiData.bathrooms?.toString() || "0",
    sqft: parseFloat(apiData.area) || 0,
    price: apiData.price ? `$${apiData.price}` : "$0",
    forRent: apiData.usage === "rental", // Infer from usage if needed
    tags: [
      apiData.project_status?.toLowerCase() || "presale",
      apiData.ownership?.toLowerCase() || "freehold",
    ],
    propertyType: apiData.property_type || "Houses",
    yearBuilding: apiData.year_built || "N/A",
    featured: false,
    sale_status: apiData.project_status,
    status: apiData.is_available ? "available" : "unavailable",
    lat: 0,
    long: 0,
    features: apiData.amenities?.map((amenity) => amenity.name) || [], // Map amenities to features
    // Additional properties from new API that might be useful
    furnishing: apiData.furnishing,
    ownership: apiData.ownership,
    description: apiData.property_description,
    service_charges: apiData.service_charges,
    parking_available: apiData.parking_available,
  };
}
