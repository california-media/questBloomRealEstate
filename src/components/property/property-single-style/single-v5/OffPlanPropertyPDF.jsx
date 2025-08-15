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
    fontSize: 10,
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
const DescriptionRenderer = ({ text }) => {
  // First remove any leading/trailing whitespace
  const trimmedText = text.trim();

  // Split the text into sections, handling the initial heading
  const sections = trimmedText
    .split(/(?:^|\n)#####\s+/)
    .filter((section) => section.trim());

  return (
    <View style={styles.description}>
      {sections.map((section, index) => {
        // For the very first section if it's not a heading (unlikely in this case)
        if (index === 0 && !trimmedText.startsWith("#####")) {
          return (
            <Text key={index} style={styles.paragraph}>
              {section.trim()}
            </Text>
          );
        }

        // Find the first newline to separate heading from content
        const firstNewline = section.indexOf("\n");
        const heading =
          firstNewline === -1 ? section : section.substring(0, firstNewline);
        const content =
          firstNewline === -1 ? "" : section.substring(firstNewline + 1).trim();

        return (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionHeading}>{heading}</Text>
            {content ? <Text style={styles.paragraph}>{content}</Text> : null}
          </View>
        );
      })}
    </View>
  );
};

const getGoogleMapsRedirectUrl = (coordinates) => {
  if (coordinates) {
    const [latitude, longitude] = coordinates.split(", ");
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }
  return null;
};

// For static image (using staticmap service)
const getStaticOpenStreetMapUrl = (
  coordinates,
  zoom = 14,
  width = 1200,
  height = 600
) => {
  if (coordinates) {
    const [latitude, longitude] = coordinates.split(", ");
    return `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=${width}&height=${height}&center=lonlat:${longitude},${latitude}&zoom=${zoom}&scale=3&format=png&marker=lonlat:${longitude},${latitude};type:material;color:%23ff0000;size:large&apiKey=c43591606adf464db4c5dc378424a6a0`;
  }
  return null;
};


const capitalizeFirstLetter = (str) => {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatPrice = (price) => {
  if (!price) return "N/A";
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 0,
  }).format(price || 0);
};

const OffPlanPropertyPDF = ({
  property,
  qbc_phone,
  qbc_email,
  qbc_copyright,
}) => {
  const getPropertyCode = () => {
    return `op-${property?.id}`;
  };

  const getPropertyType = () => {
    return property?.unit_blocks?.[0]?.unit_type || "Apartments";
  };

  const getBedroomOptions = () => {
    if (!property?.unit_blocks) return "N/A";
    const bedrooms = property.unit_blocks
      .filter((block) => block?.name)
      .map((block) => block.name.split(" ")[0])
      .join(", ");
    return bedrooms;
  };

  const getMinArea = () => {
    if (!property?.unit_blocks?.[0]) return "N/A";
    const minAreaM2 = property.unit_blocks[0].units_area_from_m2;
    return minAreaM2 ? Math.round(parseFloat(minAreaM2) * 10.764) : "N/A"; // Convert m2 to sqft
  };

  const getCompletionYear = () => {
    if (!property?.completion_datetime) return "N/A";
    return new Date(property.completion_datetime).getFullYear();
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
    property?.architecture && property.architecture.length > 0
      ? property.architecture[0].url
      : "";
  console.log("HeroBackgroundImage", HeroBackgroundImage);
  return (
    <Document>
      {/* Page 1 - Cover Page */}
      <Page size={[920, 540]}>
        <Image
          src={HeroBackgroundImage + "awd"}
          style={styles.coverBackgroundImage}
        />
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
                    alignSelf: "flex-start", // shrink to content width
                    flexGrow: 0, // prevent stretching
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
                    Completion - {getCompletionYear()}
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
                  {property?.name}
                </Text>

                {/* Location */}
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    opacity: 0.8,
                  }}
                >
                  {property?.area}
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
                  src="/images/QMC-logo.png"
                  style={{
                    width: 110,
                    height: 30,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    opacity: 0.8,
                  }}
                >
                  Quest Real Estate LLC
                </Text>
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
                        textDecoration: "none", // optional, remove underline
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
                  src={`https://wa.me/${qbc_phone.replace(/\D/g, "")}`} // removes spaces, +, etc.
                  style={{
                    flex: 1,
                    backgroundColor: "#a3e635", // Tailwind's lime-400
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
      </Page>

      {/* Page 2 - Property Photos & Details */}
      <Page size={[920, 540]} style={styles.contentPage}>
        {/* Property Details */}
        <Text style={styles.pageTitle}>Property Gallery </Text>

        {/* Photo Grid */}
        {/* Photo Grid */}
        {property?.architecture && property.architecture.length > 0 ? (
          <View style={styles.photoGrid}>
            {property.architecture.map((photo, index) => (
              <Image key={index} src={photo.url} style={styles.photo} />
            ))}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 40,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280", // grey
                fontStyle: "italic",
              }}
            >
              No photos available
            </Text>
          </View>
        )}

        <ContactFooter
          qbc_copyright={qbc_copyright}
          qbc_email={qbc_email}
          qbc_phone={qbc_phone}
        />
      </Page>

      <Page size={[920, 540]} style={styles.contentPage}>
        {/* Property Details */}
        <Text style={styles.pageTitle}>{property?.name}</Text>

        {/* Basic Information Cards */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 8,
          }}
        >
          {/* Furnishing Card */}
          <View
            style={{
              backgroundColor: "#f3f4f6", // Very light gray
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
                  color: "#4b5563", // Darker gray for secondary text
                  fontSize: 12,
                }}
              >
                {property?.furnishing}
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
                {getPropertyType()}
              </Text>
            </View>
          </View>

          {/* Status Card */}
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
            <Icon type="status" color="black" size={20} />
            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Status
              </Text>
              <Text
                style={{
                  color: "#4b5563",
                  fontSize: 12,
                }}
              >
                {property?.status}
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
                Starting Area
              </Text>
              <Text
                style={{
                  color: "#4b5563",
                  fontSize: 12,
                }}
              >
                {getMinArea()} sq ft
              </Text>
            </View>
          </View>

          {/* Unit Types Card */}
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
                Unit Types
              </Text>
              <Text
                style={{
                  color: "#4b5563",
                  fontSize: 12,
                }}
              >
                {property?.unit_blocks?.length || 0} Options
              </Text>
            </View>
          </View>

          {/* Total Units Card */}
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
            <Icon type="all" color="gray" size={20} />
            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Total Units
              </Text>
              <Text
                style={{
                  color: "#4b5563",
                  fontSize: 12,
                }}
              >
                {property?.buildings?.[0]?.[0]?.Description || "Multiple Units"}
              </Text>
            </View>
          </View>
        </View>

        <DescriptionRenderer text={property?.overview} />
        <ContactFooter
          qbc_copyright={qbc_copyright}
          qbc_email={qbc_email}
          qbc_phone={qbc_phone}
        />
      </Page>

      {/* Interior images */}

      {property?.interior?.length > 0 &&
        Array.from(
          ///this chunks images into groups of three
          { length: Math.ceil(property.interior.length / 3) },
          (_, i) => property.interior.slice(i * 3, i * 3 + 3)
        ).map((chunk, pageIndex) => (
          <Page key={`interior-page-${pageIndex}`} size={[920, 540]}>
            {/* Image grid - 2 columns */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "stretch",
                height: "100%",
              }}
            >
              {/* Left column - single image */}
              <View style={{ width: "49.5%", height: "100%" }}>
                {chunk[0] && (
                  <Image
                    src={chunk[0].url}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </View>

              {/* Right column - two stacked images */}
              <View
                style={{
                  width: "49.95%",
                  height: "100%",
                }}
              >
                {chunk[1] && (
                  <Image
                    src={chunk[1].url}
                    style={{
                      width: "100%",
                      height: "50%",
                      objectFit: "cover",
                      marginBottom: 5,
                    }}
                  />
                )}
                {chunk[2] && (
                  <Image
                    src={chunk[2].url}
                    style={{
                      width: "100%",
                      height: "50%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </View>
            </View>
            {/* Title on each page */}
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
            <ContactFooter
              qbc_copyright={qbc_copyright}
              qbc_email={qbc_email}
              qbc_phone={qbc_phone}
            />
          </Page>
        ))}

      {/* Page 3 - Amenities & Features */}

      {property?.facilities?.length > 0 &&
        Array.from(
          ///this chunks images into groups of three
          { length: Math.ceil(property.facilities.length / 8) },
          (_, i) => property.facilities.slice(i * 8, i * 8 + 8)
        ).map((facilities, pageIndex) => (
          <Page
            key={`facilities-page-${pageIndex}`}
            size={[920, 540]}
            style={styles.contentPage}
          >
            <Text style={styles.pageTitle}>Facilities</Text>

            <View style={styles.amenitiesGrid}>
              {facilities?.map((facility, index) => (
                <View key={index} style={styles.amenityCard}>
                  <Image src={facility.image.url} style={styles.amenityPhoto} />
                  <Text style={styles.amenityText}>{facility.name}</Text>
                  <Text style={styles.amenitySubText}>
                    {facility.image_source}
                  </Text>
                </View>
              ))}
            </View>
            {/* Footer */}
            <ContactFooter
              qbc_copyright={qbc_copyright}
              qbc_email={qbc_email}
              qbc_phone={qbc_phone}
            />
          </Page>
        ))}

      {/* Unit Plans Pages - 3 per page layout */}
      {property?.unit_blocks && property.unit_blocks.length > 0 && (
        <>
          {/* Calculate number of pages needed (3 units per page) */}
          {Array.from(
            { length: Math.ceil(property.unit_blocks.length / 3) },
            (_, pageIndex) => (
              <Page
                key={pageIndex}
                size={[920, 540]}
                style={{
                  padding: 40,
                  backgroundColor: "#f5f5f5",
                }}
              >
                {/* Page Title */}
                <Text style={styles.pageTitle}>Typical units and prices</Text>

                {/* Units Container - 3 columns */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "10px",
                    flex: 1,
                  }}
                >
                  {property.unit_blocks
                    .slice(pageIndex * 3, pageIndex * 3 + 3)
                    .map((unit, unitIndex) => (
                      <View
                        key={unitIndex}
                        style={{
                          borderRadius: "12px",
                          padding: "5px",
                          flex: 1,
                          maxWidth: "280px",
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.1,
                          shadowRadius: 8,
                          elevation: 3,
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        {/* Unit Plan Image */}
                        {unit.typical_unit_image_url &&
                          JSON.parse(unit.typical_unit_image_url)?.[0]?.url && (
                            <View
                              style={{
                                marginBottom: "15px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                position: "relative",
                              }}
                            >
                              <Image
                                src={
                                  JSON.parse(unit.typical_unit_image_url)[0].url
                                }
                                style={{
                                  width: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </View>
                          )}

                        {/* Unit Details */}
                        <View
                          style={{
                            flexDirection: "row",
                            gap: "8px",
                            marginBottom: "12px",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: "white",
                              paddingVertical: "4px",
                              paddingHorizontal: "8px",
                              borderRadius: "4px",
                              flex: 1,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                textAlign: "center",

                                color: "#666",
                              }}
                            >
                              {unit.unit_type || "Apartments"}
                            </Text>
                          </View>
                          <View
                            style={{
                              backgroundColor: "white",
                              paddingVertical: "4px",
                              paddingHorizontal: "8px",
                              borderRadius: "4px",
                              flex: 1,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: "10px",
                                color: "#666",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {unit?.name?.split(" - ")[0] || "Unit"}
                            </Text>
                          </View>
                        </View>

                        {/* Price Section */}

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            marginBottom: "5px",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "10px",
                              color: "#999",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            FROM
                          </Text>
                          <Text
                            style={{
                              fontSize: "10px",
                              color: "#999",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              textAlign: "left",
                              width: "45%",
                            }}
                          >
                            TO
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            marginBottom: "10px",
                            gap: 3,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: "16px",
                              color: "#1a1a1a",
                              fontWeight: "bold",
                            }}
                          >
                            {formatPrice(unit.units_price_from) || "AED 0"}
                          </Text>
                          <Text
                            style={{
                              fontSize: "16px",
                              color: "#1a1a1a",
                              width: "45%",

                              textAlign: "left",

                              fontWeight: "bold",
                            }}
                          >
                            {formatPrice(unit.units_price_to) || "No info"}
                          </Text>
                        </View>

                        {/* Area Section */}
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "start",
                          }}
                        >
                          {/* Area From */}
                          <Text
                            style={{
                              fontSize: "11px",
                              color: "#333",
                              fontWeight: "bold",
                            }}
                          >
                            {unit.units_area_from_m2
                              ? `${Math.round(
                                  parseFloat(unit.units_area_from_m2) * 10.764
                                )} sqft / ${Math.round(
                                  parseFloat(unit.units_area_from_m2)
                                )} m²`
                              : "N/A"}
                          </Text>

                          {/* Area To */}
                          <Text
                            style={{
                              fontSize: "11px",
                              color: "#333",
                              fontWeight: "bold",
                              width: "45%",

                              textAlign: "left",
                            }}
                          >
                            {unit.units_area_to_m2
                              ? `${Math.round(
                                  parseFloat(unit.units_area_to_m2) * 10.764
                                )} sqft / ${Math.round(
                                  parseFloat(unit.units_area_to_m2)
                                )} m²`
                              : "No info"}
                          </Text>
                        </View>
                      </View>
                    ))}

                  {/* Fill empty spaces if less than 3 units on the last page */}
                  {property.unit_blocks.slice(pageIndex * 3, pageIndex * 3 + 3)
                    .length < 3 &&
                    Array.from(
                      {
                        length:
                          3 -
                          property.unit_blocks.slice(
                            pageIndex * 3,
                            pageIndex * 3 + 3
                          ).length,
                      },
                      (_, emptyIndex) => (
                        <View
                          key={`empty-${emptyIndex}`}
                          style={{
                            flex: 1,
                            maxWidth: "280px",
                          }}
                        />
                      )
                    )}
                </View>

                {/* Contact Footer */}
                <ContactFooter
                  qbc_copyright={qbc_copyright}
                  qbc_email={qbc_email}
                  qbc_phone={qbc_phone}
                />
              </Page>
            )
          )}
        </>
      )}
      {/* Page 5 - Building Details */}
      {/* <Page size={[920, 540]} style={styles.contentPage}>
        <Text style={styles.pageTitle}>Building Details</Text>

        {property?.buildings?.[0]?.map((building, index) => (
          <View key={index} style={styles.buildingSection}>
            <View style={styles.buildingHeader}>
              <Text style={styles.buildingName}>{building?.Name}</Text>
              <Text style={styles.buildingCompletion}>
                {building?.Completion_date
                  ? `Completion: ${new Date(
                      building.Completion_date
                    ).toLocaleDateString()}`
                  : "Completion: TBA"}
              </Text>
            </View>

            <View style={styles.buildingContent}>
              {building?.Building_image?.[0]?.url && (
                <View style={styles.buildingImageContainer}>
                  <Image
                    src={building.Building_image[0].url}
                    style={styles.buildingImage}
                  />
                </View>
              )}

              <View style={styles.buildingInfo}>
                <Text style={styles.buildingDescription}>
                  {building?.Description}
                </Text>
              </View>
            </View>
          </View>
        ))}

        <ContactFooter
          qbc_copyright={qbc_copyright}
          qbc_email={qbc_email}
          qbc_phone={qbc_phone}
        />
      </Page> */}

      {/* Page 6 - Interior Images */}
      {/* {property?.interior && property.interior.length > 0 && (
        <Page size={[920, 540]} style={styles.contentPage}>
          <Text style={styles.pageTitle}>Interior Design</Text>

          <View style={styles.imageGallery}>
            {property.interior.slice(0, 4).map((image, index) => (
              <View key={index} style={styles.galleryImageContainer}>
                <Image src={image.url} style={styles.galleryImage} />
              </View>
            ))}
          </View>

          <ContactFooter
            qbc_copyright={qbc_copyright}
            qbc_email={qbc_email}
            qbc_phone={qbc_phone}
          />
        </Page>
      )} */}

      {/* Page 7 - Lobby Images */}
      {/* {property?.lobby && property.lobby.length > 0 && (
        <Page size={[920, 540]} style={styles.contentPage}>
          <Text style={styles.pageTitle}>Lobby</Text>

          {property.lobby.map((image, index) => (
            <Image src={image.url} style={styles.lobbyImage} />
          ))}

          <ContactFooter
            qbc_copyright={qbc_copyright}
            qbc_email={qbc_email}
            qbc_phone={qbc_phone}
          />
        </Page>
      )} */}

      {/* Page 8 - Master Plan */}
      {property?.master_plan &&
        property.master_plan.length > 0 &&
        property.master_plan.map((image, index) => (
          <Page key={index} size={[920, 540]} style={styles.contentPage}>
            <Image src={image.url} style={styles.masterPlanImage} />
            <ContactFooter
              qbc_copyright={qbc_copyright}
              qbc_email={qbc_email}
              qbc_phone={qbc_phone}
            />
          </Page>
        ))}

      {/* Page 9 - Payment Plans */}
      {/* Payment Plans Pages - 4 per page (2x2 grid) */}
      {property?.payment_plans && property.payment_plans.length > 0 && (
        <>
          {/* Calculate number of pages needed (4 plans per page) */}
          {Array.from(
            { length: Math.ceil(property.payment_plans.length / 4) },
            (_, pageIndex) => (
              <Page
                key={`payment-plans-${pageIndex}`}
                size={[920, 540]}
                style={{
                  padding: "40px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                {/* Page Title */}
                <Text
                  style={{
                    fontSize: "22px",
                    color: "#1a1a1a",
                    marginBottom: "30px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Payment plan
                </Text>

                {/* Payment Plans Grid - 2x2 layout */}
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {/* First Row - 2 columns */}
                  <View
                    style={{
                      flexDirection: "row",
                      gap: "20px",
                      height: "45%",
                    }}
                  >
                    {property.payment_plans
                      .slice(pageIndex * 4, pageIndex * 4 + 2)
                      .map((plan, planIndex) => (
                        <View
                          key={planIndex}
                          style={{
                            flex: 1,
                            backgroundColor: "white",
                            borderRadius: "8px",
                            padding: "20px",
                          }}
                        >
                          {/* Payment Plan Header */}
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginBottom: "15px",
                            }}
                          >
                            {/* Yellow icon circle */}

                            <Image
                              src={"/images/pie-chart.png"}
                              style={{
                                width: "24px",
                                height: "24px",
                                marginRight: "8px",
                                padding: 2,
                              }}
                            ></Image>

                            <Text
                              style={{
                                fontSize: "14px",
                                color: "#1a1a1a",
                              }}
                            >
                              {plan.Plan_name || "Payment Plan"}
                            </Text>
                          </View>

                          {/* Payment Steps */}
                          <View
                            style={{
                              marginBottom: "15px",
                            }}
                          >
                            {plan.Payments?.map((payment, paymentIndex) => (
                              <View
                                key={paymentIndex}
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  paddingVertical: "6px",
                                  borderBottom:
                                    paymentIndex < plan.Payments.length - 1
                                      ? "1px solid #e0e0e0"
                                      : "none",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    color: "#1a1a1a",
                                  }}
                                >
                                  {payment[0]?.Percent_of_payment}%{" "}
                                  <Text style={{ color: "#999" }}>payment</Text>
                                </Text>
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    textAlign: "right",
                                  }}
                                >
                                  {payment[0]?.Payment_time}
                                </Text>
                              </View>
                            ))}
                          </View>

                          {/* Condition for unit resale */}
                          <View
                            style={{
                              paddingTop: "10px",
                              borderTop: "1px solid #e0e0e0",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: "11px",
                                  color: "#999",
                                }}
                              >
                                Condition for the unit resale
                              </Text>
                              <Text
                                style={{
                                  fontSize: "11px",
                                  color: "#1a1a1a",
                                }}
                              >
                                Not specified
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))}

                    {/* Fill empty space if only 1 plan in first row */}
                    {property.payment_plans.slice(
                      pageIndex * 4,
                      pageIndex * 4 + 2
                    ).length < 2 && <View style={{ flex: 1 }} />}
                  </View>

                  {/* Second Row - 2 columns */}
                  <View
                    style={{
                      flexDirection: "row",
                      gap: "20px",
                      height: "45%",
                    }}
                  >
                    {property.payment_plans
                      .slice(pageIndex * 4 + 2, pageIndex * 4 + 4)
                      .map((plan, planIndex) => (
                        <View
                          key={planIndex + 2}
                          style={{
                            flex: 1,
                            backgroundColor: "white",
                            borderRadius: "8px",
                            padding: "20px",
                          }}
                        >
                          {/* Payment Plan Header */}
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginBottom: "15px",
                            }}
                          >
                            {/* Yellow icon circle */}
                            <View
                              style={{
                                width: "24px",
                                height: "24px",
                                backgroundColor: "#ffd700",
                                borderRadius: "12px",
                                marginRight: "8px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: "12px",
                                  color: "white",
                                }}
                              >
                                ✓
                              </Text>
                            </View>
                            <Text
                              style={{
                                fontSize: "14px",
                                color: "#1a1a1a",
                              }}
                            >
                              {plan.Plan_name || "Payment Plan"}
                            </Text>
                          </View>

                          {/* Payment Steps */}
                          <View
                            style={{
                              marginBottom: "15px",
                            }}
                          >
                            {plan.Payments?.map((payment, paymentIndex) => (
                              <View
                                key={paymentIndex}
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  paddingVertical: "6px",
                                  borderBottom:
                                    paymentIndex < plan.Payments.length - 1
                                      ? "1px solid #e0e0e0"
                                      : "none",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    color: "#1a1a1a",
                                  }}
                                >
                                  {payment[0]?.Percent_of_payment}%{" "}
                                  <Text style={{ color: "#999" }}>payment</Text>
                                </Text>
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    textAlign: "right",
                                  }}
                                >
                                  {payment[0]?.Payment_time}
                                </Text>
                              </View>
                            ))}
                          </View>

                          {/* Condition for unit resale */}
                          <View
                            style={{
                              paddingTop: "10px",
                              borderTop: "1px solid #e0e0e0",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: "11px",
                                  color: "#999",
                                }}
                              >
                                Condition for the unit resale
                              </Text>
                              <Text
                                style={{
                                  fontSize: "11px",
                                  color: "#1a1a1a",
                                }}
                              >
                                Not specified
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))}

                    {/* Fill empty spaces for remaining slots */}
                    {Array.from(
                      {
                        length:
                          2 -
                          property.payment_plans.slice(
                            pageIndex * 4 + 2,
                            pageIndex * 4 + 4
                          ).length,
                      },
                      (_, emptyIndex) => (
                        <View key={`empty-${emptyIndex}`} style={{ flex: 1 }} />
                      )
                    )}
                  </View>
                </View>

                {/* Contact Footer */}
                <ContactFooter
                  qbc_copyright={qbc_copyright}
                  qbc_email={qbc_email}
                  qbc_phone={qbc_phone}
                />
              </Page>
            )
          )}
        </>
      )}

      {/* Page 4 - Location & Contact */}
      <Page size={[920, 540]}>
        <View>
          {/* Add the map image */}
          {property?.coordinates && (
            <>
              <Image
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={getStaticOpenStreetMapUrl(property?.coordinates)}
              />
              <Link
                src={getGoogleMapsRedirectUrl(property?.coordinates)}
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
          )}
        </View>
        <Text
          style={{
            ...styles.pageTitle,
            position: "absolute",
            top: 40,
            left: 40,
            color: "white",
          }}
        >
          Location
        </Text>
        <ContactFooter
          qbc_copyright={qbc_copyright}
          qbc_email={qbc_email}
          qbc_phone={qbc_phone}
        />
      </Page>

      {/* Final Page - Contact & Summary */}
      <Page size={[920, 540]} style={styles.contentPage}>
        <View style={styles.twoColumnGrid}>
          <View style={styles.contactCard}>
            <Text style={styles.cardTitle}>Get In Touch</Text>

            <View style={styles.contactItem}>
              <Icon type="phone" color="black" />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{qbc_phone || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <Icon type="email" color="black" />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{qbc_email || "N/A"}</Text>
              </View>
            </View>

            <View style={styles.contactItem}>
              <Icon type="location" color="black" />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Location</Text>
                <Text style={styles.contactValue}>{property?.area}</Text>
                <Text style={styles.contactLabel}>{property?.country}</Text>
              </View>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.cardTitle}>Property Summary</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Property Code:</Text>
              <Text style={[styles.infoValue, { color: "#2563eb" }]}>
                {getPropertyCode()}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Starting Price:</Text>
              <Text style={styles.priceHighlight}>
                {formatPrice(property?.min_price)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status:</Text>
              <Text
                style={[
                  styles.statusText,
                  property?.status === "Presale"
                    ? styles.availableStatus
                    : styles.unavailableStatus,
                ]}
              >
                {property?.status}
              </Text>
            </View>

            <View style={styles.callToAction}>
              <Text style={styles.contactLabel}>
                Don't miss this opportunity!
              </Text>
              <Text style={styles.ctaText}>
                Contact us today to learn more about this project.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.highlightsCard}>
          <Text style={styles.highlightsTitle}>Key Highlights</Text>
          <View style={styles.highlightsGrid}>
            <View style={styles.highlightItem}>
              <Icon type="star" color="yellow" />
              <Text style={styles.highlightText}>
                Prime {property?.area} Location
              </Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon type="star" color="yellow" />
              <Text style={styles.highlightText}>
                Modern {getPropertyType()}
              </Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon type="star" color="yellow" />
              <Text style={styles.highlightText}>
                {capitalizeFirstLetter(
                  property?.furnishing === "No"
                    ? "Unfurnished"
                    : property?.furnishing
                )}{" "}
                Property
              </Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon type="star" color="yellow" />
              <Text style={styles.highlightText}>
                By {property?.developer} Developer
              </Text>
            </View>
            {getCompletionYear() !== "N/A" && (
              <View style={styles.highlightItem}>
                <Icon type="star" color="yellow" />
                <Text style={styles.highlightText}>
                  Completion in {getCompletionYear()}
                </Text>
              </View>
            )}
            {property?.payment_plans?.length > 0 && (
              <View style={styles.highlightItem}>
                <Icon type="star" color="yellow" />
                <Text style={styles.highlightText}>
                  Flexible Payment Plans Available
                </Text>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.footerDateTime}>
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
        <ContactFooter
          qbc_copyright={qbc_copyright}
          qbc_email={qbc_email}
          qbc_phone={qbc_phone}
        />
      </Page>
    </Document>
  );
};

export default OffPlanPropertyPDF;
