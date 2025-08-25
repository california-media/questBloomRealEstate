import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { adminBaseUrl } from "@/api/adminApi";

const styles = StyleSheet.create({
  // Page setup - Brochure size (similar to PPT slide: 10" x 7.5")
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",

    position: "relative",
    size: [920, 540], // 10" x 7.5" in points (72 points per inch)
  },

  coverBackgroundImage: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    display: "block",
    height: "auto",
    width: "auto",
  },
  coverForeground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: "-110px",
    width: "100%",
    height: "100%",
  },

  // Cover page styles
  coverPage: {
    height: "100%",
    color: "white",
    justifyContent: "space-between",
  },

  coverHeader: {
    alignItems: "flex-end",
    marginBottom: 20,
  },

  propertyCode: {
    fontSize: 10,
    opacity: 0.75,
    color: "white",
    position: "absolute",
    top: 30,
    left: 40,
  },

  coverTitle: {
    textAlign: "center",
    marginBottom: 20,
  },

  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  propertyType: {
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 10,
    textAlign: "center",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  locationText: {
    fontSize: 14,
    marginLeft: 5,
  },

  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },

  statItem: {
    alignItems: "center",
    flex: 1,
  },

  statCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },

  statLabel: {
    fontSize: 12,
    opacity: 0.75,
    marginTop: 2,
  },

  priceSection: {
    alignItems: "center",
    marginBottom: 20,
  },

  priceText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 5,
  },

  priceLabel: {
    fontSize: 14,
    opacity: 0.75,
  },
  mapLink: {
    color: "blue",
    textDecoration: "underline",
    fontSize: 12,
    marginTop: 5,
  },

  // Content page styles
  contentPage: {
    padding: 40,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
    textAlign: "start",
  },

  twoColumnGrid: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },

  threeColumnGrid: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
    flexWrap: "wrap",
  },

  card: {
    backgroundColor: "#f9fafb",
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },

  blueCard: {
    backgroundColor: "#eff6ff",
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },

  greenCard: {
    backgroundColor: "#f0fdf4",
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  infoLabel: {
    color: "#6b7280",
    fontSize: 12,
  },

  infoValue: {
    fontWeight: "bold",
    fontSize: 12,
  },

  description: {
    borderRadius: 8,
    marginTop: 15,
  },

  descriptionText: {
    fontSize: 14,
    lineHeight: 1.4,
    color: "#374151",
  },

  // Gallery styles
  photoGrid: {
    flexDirection: "row",
    justifyContent: "start",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },

  photo: {
    width: "30%",
    objectFit: "cover",
    height: 150,
    borderRadius: 5,
    border: "1px solid #e5e7eb",
  },

  // Amenities styles
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7, // spacing between cards (both directions)
  },

  amenityCard: {
    backgroundColor: "white",
    borderRadius: 5,
    width: "24%", // ~4 per row with gap
    boxSizing: "border-box",
    marginBottom: 25,
  },

  amenityPhoto: {
    objectFit: "cover",
    height: 120,
    borderRadius: 5,
    border: "1px solid #e5e7eb",
    marginBottom: 8, // space between photo & text
  },

  amenityText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "left",
    marginBottom: 4,
  },

  amenitySubText: {
    fontSize: 9,
    color: "#6b7280", // gray-500
    textAlign: "left",
  },

  highlightsCard: {
    backgroundColor: "#2563eb",
    padding: 20,
    borderRadius: 8,
    marginTop: 15,
  },

  highlightsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 25,
  },

  highlightsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  highlightItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: 8,
  },

  highlightText: {
    color: "white",
    fontSize: 12,
    marginLeft: 8,
  },

  // Contact page styles
  mapPlaceholder: {
    backgroundColor: "#e5e7eb",
    height: 200,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  mapText: {
    color: "#6b7280",
    fontSize: 14,
  },

  contactCard: {
    backgroundColor: "#f9fafb",
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },

  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  contactText: {
    marginLeft: 5,
  },

  contactLabel: {
    fontSize: 10,
    marginBottom: 3,
    marginTop: 3,
    color: "#6b7280",
  },

  contactValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
  },

  summaryCard: {
    backgroundColor: "#eff6ff",
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },

  priceHighlight: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#16a34a",
  },

  statusText: {
    fontWeight: "bold",
    fontSize: 13,
  },

  availableStatus: {
    color: "#16a34a",
  },

  unavailableStatus: {
    color: "#dc2626",
  },

  callToAction: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderLeft: "4px solid #2563eb",
    marginTop: 15,
  },

  ctaText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  footerDateTime: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 10,
    marginTop: 20,
  },
  logoContainer: {
    position: "absolute",
    top: 30,
    left: 30,
    width: 150, // adjust as needed
    height: 40, // adjust as needed
  },
  footer: {
    position: "absolute",
    bottom: 5,
    left: 15,
    right: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerItem: {
    fontSize: 10,
    color: "#6b7280",
  },
  // New styles for additional sections
  buildingSection: {
    marginBottom: 25,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 15,
  },
  buildingHeader: {
    marginBottom: 15,
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: 10,
  },
  buildingName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 5,
  },
  buildingCompletion: {
    fontSize: 12,
    color: "#6b7280",
    fontStyle: "italic",
  },
  buildingContent: {
    flexDirection: "row",
    gap: 15,
  },
  buildingImageContainer: {
    flex: 1,
  },
  buildingImage: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    borderRadius: 6,
  },
  buildingInfo: {
    flex: 1,
    justifyContent: "center",
  },
  buildingDescription: {
    fontSize: 12,
    color: "#374151",
    lineHeight: 1.4,
  },
  imageGallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  galleryImageContainer: {
    width: "48%",
    height: 160,
  },
  galleryImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },

  lobbyImage: {
    width: "80%",
    objectFit: "cover",
  },
  masterPlanContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  masterPlanImage: {
    width: "100%",
    objectFit: "contain",
  },
  paymentPlansContainer: {
    gap: 20,
    marginBottom: 20,
  },
  paymentPlanCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    border: "1px solid #e2e8f0",
  },
  paymentPlanTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 15,
    textAlign: "center",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: 8,
    borderRadius: 6,
  },
  paymentSteps: {
    gap: 12,
  },
  paymentStep: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #e2e8f0",
  },
  paymentStepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  stepNumberText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
  paymentStepDetails: {
    flex: 1,
  },
  paymentPercent: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 2,
  },
  paymentTime: {
    fontSize: 12,
    color: "#64748b",
  },
  postHandoverNote: {
    fontSize: 10,
    color: "#64748b",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
    backgroundColor: "#fef9c3",
    padding: 8,
    borderRadius: 6,
  },
  // Unit Plans styles
  unitPlansContainer: {
    gap: 20,
    marginBottom: 20,
  },
  unitPlanCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    border: "1px solid #e2e8f0",
  },
  unitPlanHeader: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: "1px solid #e2e8f0",
  },
  unitPlanName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 3,
  },
  unitPlanType: {
    fontSize: 12,
    color: "#64748b",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  unitPlanContent: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  unitPlanImageContainer: {
    width: "50%",
  },
  unitPlanImage: {
    width: "100%",
    height: 320,
    objectFit: "contain",
    borderRadius: 8,
  },
  unitPlanDetails: {
    width: "50%",
    justifyContent: "start",
  },
  unitPlanInfoGrid: {
    gap: 12,
  },
  unitPlanInfoItem: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 6,
    border: "1px solid #e2e8f0",
  },
  unitPlanInfoLabel: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "bold",
    marginBottom: 4,
  },
  unitPlanInfoValue: {
    fontSize: 13,
    color: "#1e293b",
    fontWeight: "bold",
  },
  unitPlanPriceHighlight: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  unitPlanStartingPrice: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: "justify",
    marginBottom: 20,
  },
});
const Icon = ({ type, size = 14, color = "#fff", ...props }) => {
  const iconMap = {
    bed: "M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9",
    bath: "M10 4 8 6M17 19v2M2 12h20M7 19v2M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",
    area: "M3 3h18v18H3z M5 5v14h14V5z M8 8h8v8H8z",
    location:
      "M12 2C8.134 2 5 5.134 5 9c0 5 7 13 7 13s7-8 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    phone:
      "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
    email:
      "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
    copyright:
      "M12 21.82C17.1086 21.82 21.25 17.6786 21.25 12.57C21.25 7.46137 17.1086 3.32001 12 3.32001C6.89137 3.32001 2.75 7.46137 2.75 12.57C2.75 17.6786 6.89137 21.82 12 21.82Z M15.5291 9.03003C14.5937 8.09167 13.3241 7.56293 11.9991 7.56C11.1771 7.55982 10.3677 7.76234 9.6426 8.1496C8.9175 8.53685 8.29908 9.09687 7.84206 9.78015C7.38504 10.4634 7.10349 11.2489 7.02242 12.0669C6.94135 12.8849 7.06326 13.7103 7.37728 14.47C7.69129 15.2297 8.18779 15.9003 8.82277 16.4223C9.45776 16.9443 10.2116 17.3018 11.0177 17.463C11.8238 17.6241 12.6571 17.584 13.444 17.3463C14.231 17.1086 14.9471 16.6805 15.5291 16.1",
    clock:
      "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2",
    tick: "M20 6L9 17l-5-5",
    building:
      "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8 M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",

    status:
      "M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9Z",

    area: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
    all: "M7 2h10 M5 6h14 M3 10h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z",
    units: "M3 3h18v18H3V3zM9 9v6M15 9v6M9 9h6M9 15h6",
    parking: "M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20M9 17V7h4a3 3 0 0 1 0 6H9",
    "no-image": `
      M2 2 L22 22
      M10.41 10.41 a2 2 0 1 1 -2.83 -2.83
      M13.5 13.5 L6 21
      M18 12 L21 15
      M3.59 3.59 A1.99 1.99 0 0 0 3 5 v14 a2 2 0 0 0 2 2 h14 c.55 0 1.052 -.22 1.41 -.59
      M21 15 V5 a2 2 0 0 0 -2 -2 H9
    `,
    money: `
      M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20
      M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8
      M12 18V6
    `,
    user: `
      M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2
      M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8
    `,
    balcony: `
      M12 3v18
      M3 12h18
      M3 3h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2
    `,
  };

  if (!iconMap[type]) return <Text>•</Text>;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <Path
        d={iconMap[type]}
        fill={type === "star" ? color : "none"}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const getGoogleMapsRedirectUrl = (embedUrl) => {
  const match = embedUrl?.match(/!2d([-.\d]+)!3d([-.\d]+)/);
  if (match) {
    const longitude = match[1];
    const latitude = match[2];
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }
  return embedUrl; // fallback if pattern doesn't match
};
const renderHtmlToPdf = (htmlString) => {
  if (!htmlString) return null;

  // Simple tag replacements
  const withLineBreaks = htmlString
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<p>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n");

  // Remove remaining HTML tags
  const plainText = withLineBreaks.replace(/<[^>]+>/g, "");

  return <Text style={styles.descriptionText}>{plainText}</Text>;
};

// For static image (using staticmap service)
const getStaticOpenStreetMapUrl = (
  embedUrl,
  zoom = 14,
  width = 600,
  height = 300,
  mapType = "roadmap"
) => {
  let lat, lon;

  // Try multiple patterns to extract coordinates

  // Pattern 1: !3d{lat}!4d{lng} or !2d{lng}!3d{lat} - most reliable for Google Maps embed URLs
  let match = embedUrl?.match(/!3d([-\d.]+)!4d([-\d.]+)/);
  if (match) {
    lat = match[1];
    lon = match[2];
  } else {
    // Pattern 2: !2d{lng}!3d{lat} (alternative order)
    match = embedUrl?.match(/!2d([-\d.]+)!3d([-\d.]+)/);
    if (match) {
      lon = match[1];
      lat = match[2];
    } else {
      // Pattern 3: @{lat},{lng},{zoom}z (direct coordinate format)
      match = embedUrl?.match(/@([-\d.]+),([-\d.]+),(\d+z)/);
      if (match) {
        lat = match[1];
        lon = match[2];
      } else {
        // Pattern 4: Extract from the coordinate string like "24°28'09.4"N 54°21'00.5"E"
        const coordMatch = embedUrl?.match(
          /2z([-\d.]+)%C2%B0([-\d.]+)'([-\d.]+)\.?\d*"N%20([-\d.]+)%C2%B0([-\d.]+)'([-\d.]+)\.?\d*"E/
        );
        if (coordMatch) {
          // Convert degrees, minutes, seconds to decimal
          const latDeg = parseFloat(coordMatch[1]);
          const latMin = parseFloat(coordMatch[2]);
          const latSec = parseFloat(coordMatch[3]);
          const lonDeg = parseFloat(coordMatch[4]);
          const lonMin = parseFloat(coordMatch[5]);
          const lonSec = parseFloat(coordMatch[6]);

          lat = latDeg + latMin / 60 + latSec / 3600;
          lon = lonDeg + lonMin / 60 + lonSec / 3600;
        }
      }
    }
  }

  if (lat && lon) {
    console.log("Extracted coordinates:", lat, lon);

    // Validate coordinates are reasonable
    if (Math.abs(lat) > 90 || Math.abs(lon) > 180) {
      console.log("Invalid coordinates detected:", lat, lon);
      return null;
    }

    // Google Maps API key (replace with your own)
    const apiKey = "AIzaSyDI7fHV-ZQ0zqsNNBohTDRruAhGTZH3tks";

    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=${zoom}&scale=2&size=${width}x${height}&maptype=${mapType}&markers=color:red%7C${lat},${lon}&key=${apiKey}`;
  }

  console.log("Could not extract coordinates from URL:", embedUrl);
  return null;
};

const capitalizeFirstLetter = (str) => {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const formatPrice = (price, rentDuration) => {
  if (!price) return "No info";

  // Format the number as AED without decimals
  const formattedPrice = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 0,
  }).format(price);

  // If rentDuration is provided, append it
  if (rentDuration) {
    switch (rentDuration) {
      case "Monthly":
        return `${formattedPrice} / month`;
      case "Weekly":
        return `${formattedPrice} / week`;
      case "Yearly":
        return `${formattedPrice} / year`;
      case "Daily":
        return `${formattedPrice} / day`;
      default:
        return formattedPrice; // fallback
    }
  }

  return formattedPrice;
};

const AdminPropertyPDF = ({
  property,
  qbc_phone,
  qbc_email,
  qbc_copyright,
}) => {
  const getPropertyCode = () => {
    const prefix = property?.rent_duration ? "qr" : "qb";
    return `${prefix}-${property?.id}`;
  };
  const ContactFooter = () => (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 30,
        backgroundColor: "#1f2937",
        paddingHorizontal: 20,
      }}
      fixed
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon type="email" color={"#fff"} size={12} />
          <Text style={{ color: "#fff", fontSize: 10, marginLeft: 5 }}>
            {qbc_email || "N/A"}
          </Text>
        </View>

        <View
          style={{
            width: 1,
            height: 15,
            backgroundColor: "#6b7280",
          }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#fff", fontSize: 10, marginLeft: 5 }}>
            {qbc_copyright || " N/A"}
          </Text>
        </View>
        <View
          style={{
            width: 1,
            height: 15,
            backgroundColor: "#6b7280",
          }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon type="phone" color={"#fff"} size={12} />
          <Text style={{ color: "#fff", fontSize: 10, marginLeft: 5 }}>
            {qbc_phone && qbc_phone != "0" ? qbc_phone : "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );
  const HeroBackgroundImage =
    property?.photos && property?.photos?.length > 0
      ? `${adminBaseUrl}/api/images${property.photos[0]}?format=jpeg`
      : "";
  return (
    <Document>
      {/* Page 1 - Cover Page */}
      <Page size={[920, 540]}>
        <Image src={HeroBackgroundImage} style={styles.coverBackgroundImage} />
        <Image
          src="/images/ltr-black-to-transparent.png"
          style={styles.gradientOverlay}
        />
        <View style={styles.coverForeground}>
          {/* Main content container */}
          <View
            style={{
              flexDirection: "row",
              height: "100%",
              padding: 40,
            }}
          >
            {/* Left Column - Property Information */}
            <View
              style={{
                flex: 1,
                paddingRight: 40,
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Top section with completion */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    borderRadius: 5,
                    backgroundColor: "rgba(107, 114, 128, 0.3)",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    alignSelf: "flex-start",
                    flexGrow: 0,
                  }}
                >
                  <Icon type="clock" style={{ marginRight: 5 }} />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      opacity: 0.9,
                    }}
                  >
                    Completion - {property?.year_built || "N/A"}
                  </Text>
                </View>

                {/* Property name */}
                <Text
                  style={{
                    color: "white",
                    fontSize: 40,
                    fontWeight: "bold",
                    lineHeight: 1.2,
                    marginBottom: 10,
                  }}
                >
                  {property?.property_title || "No info"}
                </Text>

                {/* Location */}
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    opacity: 0.8,
                  }}
                >
                  {property?.location_area || "No info"}
                </Text>
              </View>

              {/* Bottom section with logo */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifySelf: "end",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                }}
              >
                <Image
                  src="/images/Questrealstatewhite.png"
                  style={{
                    width: 180,
                    height: 50,
                    marginRight: 10,
                  }}
                />
              </View>
            </View>

            {/* Right Column - Contact Form */}
            <View
              style={{
                width: 300,
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  width: 300,
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                {/* Profile section */}
                <View
                  style={{
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: "#e5e7eb",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Image
                      src="/images/questBloomTransparentSmall.png"
                      style={{ borderRadius: 30 }}
                    ></Image>
                  </View>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#1f2937",
                      marginBottom: 4,
                    }}
                  >
                    Quest Real Estate LLC
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                      marginBottom: 13,
                    }}
                  >
                    United Arab Emirates
                  </Text>

                  {/* Verified badge */}
                  <View
                    style={{
                      backgroundColor: "#dbeafe",
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 20,
                        backgroundColor: "#3b82f6",
                        marginRight: 6,
                      }}
                    >
                      <Icon type={"tick"} />
                    </View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#3b82f6",
                        fontWeight: "500",
                      }}
                    >
                      Verified
                    </Text>
                  </View>
                </View>

                {/* Contact details */}
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "#6b7280" }}>
                      Phone
                    </Text>
                    <Link
                      src={`tel:${qbc_phone}`}
                      style={{
                        fontSize: 12,
                        color: "#1f2937",
                        fontWeight: "500",
                        textDecoration: "none",
                      }}
                    >
                      {qbc_phone}
                    </Link>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "#6b7280" }}>
                      Email
                    </Text>
                    <Link
                      src={`mailto:${qbc_email}`}
                      style={{
                        fontSize: 12,
                        color: "#1f2937",
                        fontWeight: "500",
                        textDecoration: "none",
                      }}
                    >
                      {qbc_email}
                    </Link>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "#6b7280" }}>
                      Website
                    </Text>
                    <Link
                      src="https://questrealestate.ae"
                      style={{
                        fontSize: 12,
                        color: "#1f2937",
                        fontWeight: "500",
                        textDecoration: "none",
                      }}
                    >
                      questrealestate.ae
                    </Link>
                  </View>
                </View>
              </View>
              {/* Action buttons */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  gap: 8,
                }}
              >
                {/* WhatsApp */}
                <Link
                  src={`https://wa.me/${"+971 52 246 0540".replace(/\D/g, "")}`}
                  style={{
                    flex: 1,
                    backgroundColor: "#aee636",
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    textDecoration: "none",
                  }}
                >
                  <Image
                    src="/images/whatsapp-icon.png"
                    style={{
                      width: 21,
                      height: 21,
                      marginRight: 6,
                      padding: 3,
                    }}
                  />
                  <Text
                    style={{ color: "black", fontSize: 12, fontWeight: "500" }}
                  >
                    WhatsApp
                  </Text>
                </Link>

                {/* Email */}
                <Link
                  src={`mailto:${qbc_email}`}
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 9,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    textDecoration: "none",
                  }}
                >
                  <Icon
                    type={"email"}
                    style={{ marginRight: 6 }}
                    color="black"
                  />
                  <Text
                    style={{ color: "black", fontSize: 12, fontWeight: "500" }}
                  >
                    Email
                  </Text>
                </Link>

                {/* Phone */}
                <Link
                  src={`tel:${qbc_phone}`}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 40,
                    textDecoration: "none",
                  }}
                >
                  <Icon type={"phone"} color="black" />
                </Link>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.propertyCode}>
          Property Code: {getPropertyCode()}
        </Text>
      </Page>

      {/* Page 2 - Property Photos & Details */}
      {/* <Page size={[720, 540]} style={styles.contentPage}>
        <Text style={styles.pageTitle}>Property Gallery</Text>

        {property?.photos && property.photos.length > 0 && (
          <View style={styles.photoGrid}>
            {property.photos.map((photo, index) => (
              <Image
                key={index}
                src={`${adminBaseUrl}/api/images${photo}?format=jpeg`}
                style={styles.photo}
              />
            ))}
          </View>
        )}

        <ContactFooter />
      </Page> */}

      <Page size={[920, 540]} style={styles.contentPage}>
        {/* Property Details */}
        <Text style={styles.pageTitle}>
          {property?.property_title || "No info"}
        </Text>

        {/* Basic Information Cards */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 8,
          }}
        >
          {/* Price Card */}
          <View
            style={{
              backgroundColor: "#f3f4f6",
              borderRadius: 8,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              minWidth: 200,
            }}
          >
            <Icon type="money" color="black" size={20} />
            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Price
              </Text>
              <Text
                style={{
                  color: "#4b5563",
                  fontSize: 12,
                }}
              >
                {formatPrice(property?.price, property?.rent_duration)}
              </Text>
            </View>
          </View>

          {/* Furnishing Card */}
          <View
            style={{
              backgroundColor: "#f3f4f6",
              borderRadius: 8,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              minWidth: 200,
            }}
          >
            <Icon type="bed" color="black" size={20} />
            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Furnishing
              </Text>
              <Text
                style={{
                  color: "#4b5563",
                  fontSize: 12,
                }}
              >
                {capitalizeFirstLetter(property?.furnishing || "No info")}
              </Text>
            </View>
          </View>

          {/* Property Type Card */}
          <View
            style={{
              backgroundColor: "#f3f4f6",
              borderRadius: 8,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              minWidth: 200,
            }}
          >
            <Icon type="building" color="black" size={20} />
            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Property Type
              </Text>
              <Text
                style={{
                  color: "#4b5563",
                  fontSize: 12,
                }}
              >
                {property?.property_type?.name || "No info"}
              </Text>
            </View>
          </View>

          {/* Starting Area Card */}
          <View
            style={{
              backgroundColor: "#f3f4f6",
              borderRadius: 8,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              minWidth: 200,
            }}
          >
            <Icon type="area" color="black" size={20} />
            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Area
              </Text>
              <Text
                style={{
                  color: "#4b5563",
                  fontSize: 12,
                }}
              >
                {property?.area ? `${property.area} sq ft` : "No info"}
              </Text>
            </View>
          </View>
          {/* Balcony Area Card */}
          {property?.balcony_size && (
            <View
              style={{
                backgroundColor: "#f3f4f6",
                borderRadius: 8,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                minWidth: 200,
              }}
            >
              <Icon type="balcony" color="black" size={20} />
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 14,
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Balcony
                </Text>
                <Text
                  style={{
                    color: "#4b5563",
                    fontSize: 12,
                  }}
                >
                  {property?.balcony_size
                    ? `${property.balcony_size} sq ft`
                    : "No info"}
                </Text>
              </View>
            </View>
          )}
          {/* Parking card */}
          <View
            style={{
              backgroundColor: "#f3f4f6",
              borderRadius: 8,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              minWidth: 200,
            }}
          >
            <Icon type="parking" color="black" size={20} />
            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Parking
              </Text>
              <Text
                style={{
                  color: "#4b5563",
                  fontSize: 12,
                }}
              >
                {property?.parking_available ? "Available" : "Not Available"}
              </Text>
            </View>
          </View>

          {/* Unit Types Card - Not available in old structure */}
          <View
            style={{
              backgroundColor: "#f3f4f6",
              borderRadius: 8,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              minWidth: 200,
            }}
          >
            <Icon type="units" color="black" size={20} />
            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Usage
              </Text>
              <Text
                style={{
                  color: "#4b5563",
                  fontSize: 12,
                }}
              >
                {capitalizeFirstLetter(property?.usage) || "No info"}
              </Text>
            </View>
          </View>

          {/* Total Units Card - Not available in old structure */}
          <View
            style={{
              backgroundColor: "#f3f4f6",
              borderRadius: 8,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              minWidth: 200,
            }}
          >
            <Icon type="user" color="black" size={20} />
            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Ownership
              </Text>
              <Text
                style={{
                  color: "#4b5563",
                  fontSize: 12,
                }}
              >
                {capitalizeFirstLetter(property?.ownership || "No info")}
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <Text style={{ ...styles.sectionHeading, marginTop: 10 }}>
          Property Description
        </Text>
        {renderHtmlToPdf(property?.property_description) || "No info"}

        <ContactFooter />
      </Page>
      {/* Interior Images */}
      {property?.photos?.length > 0 && (
        <Page size={[920, 540]}>
          {/* Image grid - 2 columns */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "stretch",
              height: "100%",
              gap: 2,
            }}
          >
            {/* Left column - single image */}
            <View
              style={{
                flex: 1,
                height: "100%",
                backgroundColor: "#f3f4f6",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {property.photos[0] ? (
                <Image
                  src={`${adminBaseUrl}/api/images${property.photos[0]}?format=jpeg`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Icon type="no-image" size={48} color="#9ca3af" />
              )}
            </View>

            {/* Right column - two stacked images */}
            <View style={{ flex: 1, height: "100%" }}>
              <View
                style={{
                  height: "50%",
                  marginBottom: 2,
                  backgroundColor: "#f3f4f6",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {property.photos[1] ? (
                  <Image
                    src={`${adminBaseUrl}/api/images${property.photos[1]}?format=jpeg`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Icon type="no-image" size={32} color="#9ca3af" />
                )}
              </View>

              <View
                style={{
                  height: "50%",
                  backgroundColor: "#f3f4f6",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {property.photos[2] ? (
                  <Image
                    src={`${adminBaseUrl}/api/images${property.photos[2]}?format=jpeg`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Icon type="no-image" size={32} color="#9ca3af" />
                )}
              </View>
            </View>
          </View>

          {/* Title on the page */}
          <Text
            style={{
              ...styles.pageTitle,
              position: "absolute",
              top: 30,
              left: 30,
              color: "white",
            }}
          >
            Interior Images
          </Text>

          {/* Footer */}
          <ContactFooter />
        </Page>
      )}

      {/* Page 4 - Location  */}
      <Page size={[920, 540]}>
        <View style={{ height: "100%", marginBottom: 0 }}>
          {/* Map rendering with old property structure */}
          {property?.google_maps_link ? (
            <>
              <Image
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={getStaticOpenStreetMapUrl(property?.google_maps_link)}
              />
              <Link
                src={getGoogleMapsRedirectUrl(property?.google_maps_link)}
                style={{
                  ...styles.mapLink,
                  position: "absolute",
                  bottom: 60,
                  left: 40,
                }}
              >
                View on Google Maps
              </Link>
            </>
          ) : (
            <Text
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: 16,
              }}
            >
              No Map Data Available
            </Text>
          )}
        </View>

        {/* Title positioned absolutely like in new template */}
        <Text
          style={{
            ...styles.pageTitle,
            position: "absolute",
            top: 40,
            left: 40,
            color: "white",
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: 4,
            borderRadius: 2,
          }}
        >
          Location
        </Text>

        <ContactFooter />
      </Page>

      {/* Amenities & Features */}
      {property?.amenities && property?.amenities.length > 0 && (
        <Page size={[920, 540]} style={styles.contentPage}>
          <Text style={styles.pageTitle}>Amenities & Features</Text>

          <View style={styles.amenitiesGrid}>
            {property.amenities.slice(0, 8).map((amenity, index) => (
              <View key={index} style={styles.amenityCard}>
                {amenity?.image_url ? (
                  <Image
                    src={`${adminBaseUrl}/api/images${amenity.image_url}?format=jpeg`}
                    style={styles.amenityPhoto}
                  />
                ) : (
                  <View
                    style={[
                      styles.amenityPhoto,
                      {
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f3f4f6",
                      },
                    ]}
                  >
                    <Icon type="no-image" size={24} color="#9ca3af" />
                  </View>
                )}
                <Text style={styles.amenityText}>
                  {amenity.title || "No info"}
                </Text>
              </View>
            ))}
          </View>

          <ContactFooter />
        </Page>
      )}

      <Page size={[920, 540]}>
        <View style={{ height: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#f3f4f6",
              marginBottom: "30px",
            }}
          >
            {/* Left Column - Two stacked sections (EXACTLY as in new template) */}
            <View
              style={{
                flex: 1,
                padding: 40,
                paddingRight: 15,
              }}
            >
              {/* Top Section - Call to Action (unchanged) */}
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 16,
                  padding: 32,
                  marginBottom: 22,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    color: "#1f2937",
                    lineHeight: 1.2,
                    marginBottom: 8,
                  }}
                >
                  Do you have any questions? Contact me.
                </Text>
              </View>

              {/* Bottom Section - Contact Information (unchanged) */}
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 16,
                  padding: 26,
                  flex: 1,
                }}
              >
                {/* Contact Profile (unchanged) */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <Image
                    src="/images/questBloomTransparentSmall.png"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 80,
                    }}
                  />

                  {/* Contact Details (unchanged) */}
                  <View style={{ flex: 1, marginLeft: 5 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#1f2937",
                        marginBottom: 8,
                      }}
                    >
                      Quest Real Estate LLC
                    </Text>

                    <View
                      style={{
                        marginBottom: 6,
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#6b7280",
                          marginBottom: 2,
                        }}
                      >
                        Phone
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#1f2937",
                          fontWeight: "500",
                        }}
                      >
                        {qbc_phone || "N/A"}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginBottom: 6,
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#6b7280",
                          marginBottom: 2,
                        }}
                      >
                        Email
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#1f2937",
                          fontWeight: "500",
                        }}
                      >
                        {qbc_email || "N/A"}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Action buttons (unchanged) */}
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    gap: 8,
                  }}
                >
                  {/* WhatsApp (unchanged) */}
                  <Link
                    src={`https://wa.me/${qbc_phone.replace(/\D/g, "")}`}
                    style={{
                      flex: 1,
                      backgroundColor: "black",
                      borderRadius: 8,
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      textDecoration: "none",
                    }}
                  >
                    <Image
                      src="/images/whatsapp-icon-white.png"
                      style={{
                        width: 21,
                        height: 21,
                        marginRight: 6,
                        padding: 3,
                      }}
                    />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "500",
                      }}
                    >
                      WhatsApp
                    </Text>
                  </Link>

                  {/* Email (unchanged) */}
                  <Link
                    src={`mailto:${qbc_email}`}
                    style={{
                      flex: 1,
                      backgroundColor: "black",
                      borderRadius: 8,
                      paddingVertical: 10,
                      paddingHorizontal: 9,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      textDecoration: "none",
                    }}
                  >
                    <Icon
                      type={"email"}
                      style={{ marginRight: 6 }}
                      color="white"
                    />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "500",
                      }}
                    >
                      Email
                    </Text>
                  </Link>

                  {/* Phone (unchanged) */}
                  <Link
                    src={`tel:${qbc_phone}`}
                    style={{
                      backgroundColor: "black",
                      borderRadius: 8,
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 40,
                      textDecoration: "none",
                    }}
                  >
                    <Icon type={"phone"} color="white" fill={true} />
                  </Link>
                </View>
              </View>
            </View>

            {/* Right Column - Property Image (unchanged) */}
            <View
              style={{
                flex: 1,
                padding: 40,
                paddingLeft: 0,
              }}
            >
              <View
                style={{
                  height: "100%",
                  borderRadius: 8,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src={HeroBackgroundImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center", // This centers the cropped area
                  }}
                />
              </View>
            </View>
          </View>

          {/* Footer with timestamp (unchanged) */}
          <View
            style={{
              position: "absolute",
              bottom: 28,
              left: 40,
              right: 40,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: "#6b7280",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              This brochure was generated on{" "}
              {new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              .
            </Text>
          </View>
          <ContactFooter />
        </View>
      </Page>
    </Document>
  );
};

export default AdminPropertyPDF;
