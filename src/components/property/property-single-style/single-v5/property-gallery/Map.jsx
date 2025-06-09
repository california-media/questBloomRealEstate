const GoogleMapEmbed = ({ location }) => {
  const isCoords =
    typeof location === "object" &&
    location !== null &&
    "lat" in location &&
    "lng" in location;

  const mapSrc = isCoords
    ? `https://www.google.com/maps?q=${location.lat},${location.lng}&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(
        location
      )}&output=embed`;

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
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      />
    </div>
  );
};
export default GoogleMapEmbed;
