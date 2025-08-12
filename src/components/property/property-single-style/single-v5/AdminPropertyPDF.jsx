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
    padding: 20,
    paddingTop: 25,
    paddingBottom: 30,
    size: [720, 540], // 10" x 7.5" in points (72 points per inch)
  },

  // Cover page styles
  coverPage: {
    backgroundColor: "#0f172a",

    padding: 30,
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
    padding: 25,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
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
    backgroundColor: "#eff6ff",
    padding: 15,
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
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },

  photo: {
    width: "30%",
    height: 150,
    objectFit: "cover",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
  },

  // Amenities styles
  amenitiesGrid: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },

  amenityCard: {
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    width: "30%",
    minHeight: 40,
  },

  amenityText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },

  amenityPhoto: {
    marginTop: 9,
    marginBottom: 3,
    objectFit: "cover",
    height: 100,
    borderRadius: 8,
    border: "1px solid #e5e7eb",
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
  height = 300
) => {
  const match = embedUrl?.match(/!2d([-.\d]+)!3d([-.\d]+)/);
  if (match) {
    const lon = match[1];
    const lat = match[2];
    return `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=${width}&height=${height}&center=lonlat:${lon},${lat}&zoom=${zoom}&scale=3&format=png&marker=lonlat:${lon},${lat};type:material;color:%23ff0000;size:large&apiKey=c43591606adf464db4c5dc378424a6a0`;
  }
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

const AdminPropertyPDF = ({ property, qbc_phone, qbc_email }) => {
  const getPropertyCode = () => {
    const prefix = property?.rent_duration ? "qr" : "qb";
    return `${prefix}-${property?.id}`;
  };

  const ContactFooter = () => (
    <View style={styles.footer} fixed>
      <View style={styles.contactItem}>
        <Icon type="email" color={"#6b7280"} />
        <View style={styles.contactText}>
          <Text style={styles.footerItem}>{qbc_email || "N/A"}</Text>
        </View>
      </View>
      <View style={styles.contactItem}>
        <Icon type="phone" color={"#6b7280"} />
        <View style={styles.contactText}>
          <Text style={styles.footerItem}>
            {qbc_phone && qbc_phone != "0" ? qbc_phone : "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <Document>
      {/* Page 1 - Cover Page */}
      <Page size={[720, 540]} style={styles.coverPage}>
        <View style={styles.logoContainer}>
          <Image src="/images/QMC-logo.png" />
        </View>

        <View style={styles.coverHeader}>
          <Text style={styles.propertyCode}>
            Property Code: {getPropertyCode()}
          </Text>
        </View>

        <View style={styles.coverTitle}>
          <Text style={styles.mainTitle}>{property?.property_title}</Text>
          <Text style={styles.propertyType}>
            {property?.property_type?.name}
          </Text>
          <View style={styles.locationRow}>
            <Icon type="location" />
            <Text style={styles.locationText}>{property?.location_area}</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <View style={styles.statCircle}>
              <Icon type="bed" size={30} />
            </View>
            <Text style={styles.statNumber}>{property?.bedrooms}</Text>
            <Text style={styles.statLabel}>Bedrooms</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statCircle}>
              <Icon type="bath" size={30} />
            </View>
            <Text style={styles.statNumber}>{property?.bathrooms}</Text>
            <Text style={styles.statLabel}>Bathrooms</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statCircle}>
              <Icon type="area" size={30} />
            </View>
            <Text style={styles.statNumber}>
              {Math.round(parseFloat(property?.area))}
            </Text>
            <Text style={styles.statLabel}>Sq Ft</Text>
          </View>
        </View>

        <View style={styles.priceSection}>
          <Text style={styles.priceText}>
            {formatPrice(property?.price)}
            {property?.rent_duration && `/${property.rent_duration}`}
          </Text>
          <Text style={styles.priceLabel}>
            {property?.rent_duration ? "Rental Price" : "Sale Price"}
          </Text>
        </View>
        <ContactFooter />
      </Page>

      {/* Page 2 - Property Photos & Details */}
      <Page size={[720, 540]} style={styles.contentPage}>
        {/* Property Details */}
        <Text style={styles.pageTitle}>Property Gallery</Text>

        {/* Photo Grid */}
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
      </Page>
      <Page size={[720, 540]} style={styles.contentPage}>
        {/* Property Details */}
        <Text style={styles.pageTitle}>Property Details</Text>

        <View style={styles.twoColumnGrid}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Basic Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Property Type:</Text>
              <Text style={styles.infoValue}>
                {property?.property_type?.name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Usage:</Text>
              <Text style={styles.infoValue}>{property?.usage}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Furnishing:</Text>
              <Text style={styles.infoValue}>
                {capitalizeFirstLetter(property?.furnishing || "N/A")}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ownership:</Text>
              <Text style={styles.infoValue}>
                {capitalizeFirstLetter(property?.ownership || "N/A")}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Year Built:</Text>
              <Text style={styles.infoValue}>
                {property?.year_built || "N/A"}
              </Text>
            </View>
          </View>

          <View style={styles.blueCard}>
            <Text style={styles.cardTitle}>Space Details</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Total Area:</Text>
              <Text style={styles.infoValue}>
                {property?.area || "N/A"} sq ft
              </Text>
            </View>
            {property?.balcony_size && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Balcony Size:</Text>
                <Text style={styles.infoValue}>
                  {property?.balcony_size || "N/A"} sq ft
                </Text>
              </View>
            )}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Parking:</Text>
              <Text style={styles.infoValue}>
                {property?.parking_available ? "Available" : "Not Available"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.description}>
          <Text style={styles.cardTitle}>Description</Text>
          {renderHtmlToPdf(property?.property_description) || "N/A"}
        </View>
        <ContactFooter />
      </Page>

      {/* Page 3 - Amenities & Features */}
      {property?.amenities && property?.amenities.length > 0 && (
        <Page size={[720, 540]} style={styles.contentPage}>
          <Text style={styles.pageTitle}>Amenities & Features</Text>

          <View style={styles.amenitiesGrid}>
            {property?.amenities?.map((amenity) => (
              <View key={amenity.id} style={styles.amenityCard}>
                <Text style={styles.amenityText}>{amenity.title}</Text>
                {amenity?.image_url && (
                  <Image src={amenity.image_url} style={styles.amenityPhoto} />
                )}
              </View>
            ))}
          </View>

          <ContactFooter />
        </Page>
      )}

      {/* Page 4 - Location & Contact */}
      <Page size={[720, 540]} style={styles.contentPage}>
        <Text style={styles.pageTitle}>Location & Contact</Text>
        <View>
          {property?.google_maps_link ? (
            <>
              <Image
                // style={styles.mapImage}
                src={getStaticOpenStreetMapUrl(property?.google_maps_link)}
              />

              <Link
                src={getGoogleMapsRedirectUrl(property?.google_maps_link)}
                style={styles.mapLink}
              >
                View on Google Maps
              </Link>
            </>
          ) : (
            <Text style={styles.descriptionText}>No Map Data Available</Text>
          )}
        </View>

        <ContactFooter />
      </Page>

      <Page size={[720, 540]} style={styles.contentPage}>
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
                <Text style={styles.contactValue}>{property?.location}</Text>
                <Text style={styles.contactLabel}>
                  {property?.location_area}
                </Text>
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
              <Text style={styles.infoLabel}>Price:</Text>
              <Text style={styles.priceHighlight}>
                {formatPrice(property?.price)}
                {property?.rent_duration && `/${property.rent_duration}`}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status:</Text>
              <Text
                style={[
                  styles.statusText,
                  property?.is_available
                    ? styles.availableStatus
                    : styles.unavailableStatus,
                ]}
              >
                {property?.is_available ? "Available" : "Not Available"}
              </Text>
            </View>

            <View style={styles.callToAction}>
              <Text style={styles.contactLabel}>
                Don't miss this opportunity!
              </Text>
              <Text style={styles.ctaText}>
                Contact us today to schedule a viewing.
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
                Prime {property?.location_area} Location
              </Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon type="star" color="yellow" />

              <Text style={styles.highlightText}>
                Modern {property?.property_type?.name}
              </Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon type="star" color="yellow" />

              <Text style={styles.highlightText}>
                {capitalizeFirstLetter(property?.furnishing)} Property
              </Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon type="star" color="yellow" />
              <Text style={styles.highlightText}>
                {capitalizeFirstLetter(property?.ownership)} Ownership
              </Text>
            </View>
            {property?.year_built && (
              <View style={styles.highlightItem}>
                <Icon type="star" color="yellow" />

                <Text style={styles.highlightText}>
                  Built in {property?.year_built}
                </Text>
              </View>
            )}
            {property?.retail_centers && (
              <View style={styles.highlightItem}>
                <Icon type="star" color="yellow" />

                <Text style={styles.highlightText}>
                  {property?.retail_centers} Nearby Retail Centers
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
        <ContactFooter />
      </Page>
    </Document>
  );
};

export default AdminPropertyPDF;
