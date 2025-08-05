import React, { useCallback, useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Link,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { adminBaseUrl } from "@/api/adminApi";

// Register fonts (optional - you can use system fonts too)
// Font.register({
//   family: 'Roboto',
//   src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
// });

const AdminPropertyPDF = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  const getPropertyCode = () => {
    const prefix = property?.rent_duration ? "qr" : "qb";
    return `${prefix}-${property?.id}`;
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

  //if we were using google maps API with API key
  // const getStaticMapUrl = useCallback(() => {
  //   const iframeSrc = property?.google_maps_link;
  //   console.log("iframeSrc", iframeSrc);
  //   if (!iframeSrc) return null;

  //   // Try to extract lat/lng from embed URL
  //   const match = iframeSrc.match(/2d([-.\d]+)!3d([-.\d]+)/);

  //   if (match) {
  //     const longitude = match[1];
  //     const latitude = match[2];

  //     return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`;
  //   }

  //   return null;
  // }, [property]);

  const styles = StyleSheet.create({
    // Page setup - Brochure size (similar to PPT slide: 10" x 7.5")
    page: {
      flexDirection: "column",
      backgroundColor: "#ffffff",
      padding: 20,
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
      marginBottom: 30,
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
      marginBottom: 30,
    },

    statItem: {
      alignItems: "center",
      flex: 1,
    },

    statCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
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
      marginTop: 3,
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
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 20,
    },

    photo: {
      width: "30%",
      height: 120,
      borderRadius: 8,
      border: "1px solid #e5e7eb",
    },

    // Amenities styles
    amenitiesGrid: {
      flexDirection: "row",
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
      width: "20%",
      minHeight: 40,
    },

    amenityText: {
      fontSize: 10,
      fontWeight: "bold",
      color: "#111827",
      textAlign: "center",
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
      marginBottom: 15,
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
      marginLeft: 10,
    },

    contactLabel: {
      fontSize: 10,
      marginBottom: 3,
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

    footer: {
      textAlign: "center",
      color: "#6b7280",
      fontSize: 10,
      marginTop: 20,
    },
    coverPage: {
      padding: 40,
      position: "relative",
    },
    logoContainer: {
      position: "absolute",
      top: 40,
      left: 40,
      width: 150, // adjust as needed
      height: 40, // adjust as needed
    },
  });

  // Helper component for icons (using text symbols as react-pdf doesn't support icon libraries)
  const Icon = ({ type, size = 14, color = "#fff", ...props }) => {
    const iconMap = {
      bed: "M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9",
      bath: "M10 4 8 6M17 19v2M2 12h20M7 19v2M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",
      area: "M3 3h18v18H3z M5 5v14h14V5z M8 8h8v8H8z",
      location:
        "M12 2c3.866 0 7 3.134 7 7 0 5-7 13-7 13S5 14 5 9c0-3.866 3.134-7 7-7z M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
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
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    );
  };

  return (
    <Document>
      {/* Page 1 - Cover Page */}
      <Page size={[720, 540]} style={styles.coverPage}>
        <View style={styles.logoContainer}>
          <Image src="/images/Questrealstatewhite.svg" />
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
              <Icon type="bed" size={20} />
            </View>
            <Text style={styles.statNumber}>{property?.bedrooms}</Text>
            <Text style={styles.statLabel}>Bedrooms</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statCircle}>
              <Icon type="bath" size={20} />
            </View>
            <Text style={styles.statNumber}>{property?.bathrooms}</Text>
            <Text style={styles.statLabel}>Bathrooms</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statCircle}>
              <Icon type="area" size={20} />
            </View>
            <Text style={styles.statNumber}>{property?.area}</Text>
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
      </Page>

      {/* Page 2 - Property Photos & Details */}
      <Page size={[720, 540]} style={styles.contentPage}>
        {/* <Text style={styles.pageTitle}>Property Gallery & Details</Text>

        {property?.photos && property.photos.length > 0 && (
          <View style={styles.photoGrid}>
            {property.photos.slice(0, 6).map((photo, index) => (
              <Image
                key={index}
                src={`${adminBaseUrl}${photo}`}
                style={styles.photo}
              />
            ))}
          </View>
        )} */}

        {/* Property Details */}
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
              <Text style={styles.infoValue}>{property?.furnishing}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ownership:</Text>
              <Text style={styles.infoValue}>{property?.ownership}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Year Built:</Text>
              <Text style={styles.infoValue}>{property?.year_built}</Text>
            </View>
          </View>

          <View style={styles.blueCard}>
            <Text style={styles.cardTitle}>Space Details</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Total Area:</Text>
              <Text style={styles.infoValue}>{property?.area} sq ft</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Balcony Size:</Text>
              <Text style={styles.infoValue}>
                {property?.balcony_size} sq ft
              </Text>
            </View>
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
          {renderHtmlToPdf(property?.property_description)}
        </View>
      </Page>

      {/* Page 3 - Amenities & Features */}
      <Page size={[720, 540]} style={styles.contentPage}>
        <Text style={styles.pageTitle}>Amenities & Features</Text>

        <View style={styles.amenitiesGrid}>
          {property?.amenities?.map((amenity) => (
            <View key={amenity.id} style={styles.amenityCard}>
              <Text style={styles.amenityText}>{amenity.title}</Text>
            </View>
          ))}
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
                {property?.furnishing} Property
              </Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon type="star" color="yellow" />
              <Text style={styles.highlightText}>
                {property?.ownership} Ownership
              </Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon type="star" color="yellow" />

              <Text style={styles.highlightText}>
                Built in {property?.year_built}
              </Text>
            </View>
            <View style={styles.highlightItem}>
              <Icon type="star" color="yellow" />

              <Text style={styles.highlightText}>
                {property?.retail_centers} Nearby Retail Centers
              </Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Page 4 - Location & Contact */}
      <Page size={[720, 540]} style={styles.contentPage}>
        <Text style={styles.pageTitle}>Location & Contact</Text>

        {/* if we were using google maps API with API key */}
        {/* Map Section */}
        {/* <View style={styles.mapContainer}>
          {getStaticMapUrl() ? (
            <Image src={getStaticMapUrl()} style={styles.mapImage} />
          ) : (
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapText}>📍 Property Location Map</Text>
              {property?.google_maps_link && (
                <Link src={property.google_maps_link} style={styles.mapLink}>
                  View on Google Maps
                </Link>
              )}
            </View>
          )}
        </View> */}
        <View style={styles.coverHeader}>
          {/* Add the map image */}
          <Image
            // style={styles.mapImage}
            src={getStaticOpenStreetMapUrl(property?.google_maps_link)}
          />
        </View>
      </Page>

      <Page size={[720, 540]} style={styles.contentPage}>
        <View style={styles.twoColumnGrid}>
          <View style={styles.contactCard}>
            <Text style={styles.cardTitle}>Get In Touch</Text>

            <View style={styles.contactItem}>
              <Icon type="phone" color="black" />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>
                  {" "}
                  {property?.phone && property?.phone != "0"
                    ? property?.phone
                    : "N/A"}
                </Text>
              </View>
            </View>

            <View style={styles.contactItem}>
              <Icon type="email" color="black" />
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{property?.email}</Text>
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

                <Link
                  src={getGoogleMapsRedirectUrl(property?.google_maps_link)}
                  style={styles.mapLink}
                >
                  View on Google Maps
                </Link>
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
        <Text style={styles.footer}>
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
      </Page>
    </Document>
  );
};

export default AdminPropertyPDF;
