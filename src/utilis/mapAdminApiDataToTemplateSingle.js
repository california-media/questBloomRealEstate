import { adminBaseUrl } from "@/api/adminApi";

export default function mapAdminApiDataToTemplateSingle(
  apiData,
  listing_prefix
) {
  let imageUrl = "";
  try {
    // Use first photo if available, otherwise empty string
    imageUrl = apiData.photos?.[0] || "";
  } catch {
    imageUrl = "";
  }
  return {
    id: apiData.id,
    listing_prefix,
    image: imageUrl ? adminBaseUrl + imageUrl : null, //1
    title: apiData.property_title || "Untitled Property", //2
    developer: "Unknown",
    post_handover: apiData.handover_date /// 3
      ? new Date(apiData.handover_date) > new Date()
      : false,
    city: apiData.location || "Unknown",
    location: apiData.location || "Unknown", //4
    bed: apiData.bedrooms?.toString() || "0", //10
    bath: apiData.bathrooms?.toString() || "0", //11
    sqft: parseFloat(apiData.area) || 0, //5
    price: apiData.price ? `$${apiData.price}` : "$0", //6
    forRent: true, //dummy
    tags: [
      apiData.project_status?.toLowerCase() || "presale",
      apiData.ownership?.toLowerCase() || "freehold",
    ],
    propertyType:
      formatEnumValue(apiData.property_type) ||
      apiData.property_type ||
      "Houses", //12
    yearBuilding: apiData.year_built || "N/A", //7
    featured: false,
    sale_status:
      listing_prefix === "qb" //8
        ? formatEnumValue(apiData.project_status) || apiData.project_status
        : apiData.is_available
        ? "Available"
        : "Unavailable",
    status: apiData.is_available ? "Available" : "Unavailable",
    lat: 0,
    long: 0,
    features: apiData.amenities?.map((amenity) => amenity.name) || [], // Map amenities to features
    // Additional properties from new API that might be useful
    furnishing: apiData.furnishing,
    ownership: apiData.ownership,
    description: apiData.property_description, //9
    service_charges: apiData.service_charges,
    parking_available: apiData.parking_available,
  };
}

function formatEnumValue(value) {
  if (!value) return "";

  // Replace underscores with spaces and hyphens with spaces
  let formatted = value.replace(/_/g, " ").replace(/-/g, " ");

  // Capitalize the first letter of each word
  formatted = formatted
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formatted;
}
