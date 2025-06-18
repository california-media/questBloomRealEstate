export default function mapApiDataToTemplateSingle(apiData) {
  let imageUrl = "";
  try {
    const parsedImage = JSON.parse(apiData.cover_image_url);
    imageUrl = parsedImage.url || "";
  } catch {
    imageUrl = "";
  }

  const [lat, long] = apiData.coordinates
    .split(",")
    .map((coord) => parseFloat(coord.trim()));

  return {
    id: apiData.id,
    image: imageUrl || "/images/fallback.jpg", // fallback image
    title: apiData.name || "Untitled Property",
    developer: apiData.developer ? apiData.developer : "Unknown",
    post_handover: apiData.post_handover || false,
    city: apiData.area || "Unknown",
    location: apiData.area || "Unknown", // you can enhance this with more context if needed
    bed: "0", // Not available in API
    bath: "0", // Not available in API
    sqft: apiData.area_unit === "sqft" ? 1200 : 0, // hardcoded or computed
    price:
      apiData.min_price_aed ?? apiData.min_price ?? apiData.max_price
        ? `$${apiData.min_price_aed ?? apiData.min_price ?? apiData.max_price}`
        : "$0",
    forRent: false, // You could infer this based on `status` if needed
    tags: ["presale", apiData.sale_status?.toLowerCase()],
    propertyType: "Houses", // or infer from developer/sale_status
    yearBuilding: apiData.completion_datetime
      ? new Date(apiData.completion_datetime).getFullYear()
      : "N/A",
    featured: false, //apiData.is_partner_project || false,
    sale_status: apiData.sale_status,
    status: apiData.status,
    lat,
    long,
    features: [], // You may fill this manually or enhance the API if possible
  };
}
