const GoogleMapEmbed = ({ googleMapsLink }) => {
  // Extract embed URL if a full Google Maps URL is provided
  const getEmbedUrl = (url) => {
    if (!url) return "";

    // If it's already an embed URL, return as-is
    if (url.includes("/embed")) return url;

    // Convert regular Google Maps URL to embed format
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("google.com")) {
        const placeId = urlObj.pathname.split("/place/")[1]?.split("/")[0];
        if (placeId) {
          return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=place_id:${placeId}`;
        }
        // Fallback to basic embed if no place ID found
        return `https://www.google.com/maps/embed?pb=${
          urlObj.searchParams.get("pb") || ""
        }`;
      }
    } catch (e) {
      console.error("Invalid Google Maps URL", e);
    }

    // Default fallback
    return `https://www.google.com/maps/embed?q=${encodeURIComponent(url)}`;
  };

  const embedUrl = getEmbedUrl(googleMapsLink);

  return (
    <div
      style={{
        aspectRatio: "3.2",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {embedUrl ? (
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        />
      ) : (
        <div>No valid Google Maps link provided</div>
      )}
    </div>
  );
};

export default GoogleMapEmbed;
