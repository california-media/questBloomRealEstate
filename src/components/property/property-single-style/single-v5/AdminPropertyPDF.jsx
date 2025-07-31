import { adminBaseUrl } from "@/api/adminApi";
import {
  Download,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Car,
  Phone,
  Mail,
  Star,
} from "lucide-react";
import { forwardRef } from "react";

const AdminPropertyPDF = forwardRef(({ property }, ref) => {
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
  // Style objects for reusability
  const styles = {
    pageBreak: {
      pageBreakAfter: "always",
    },
    gradientBackground: {
      background:
        "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #334155 100%)",
      minHeight: "700px",
      color: "white",
      padding: "32px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    container: {
      maxWidth: "1024px",
      margin: "0 auto",
    },
    card: {
      backgroundColor: "#f9fafb",
      padding: "24px",
      borderRadius: "8px",
      marginBottom: "16px",
    },
    blueCard: {
      backgroundColor: "#eff6ff",
      padding: "24px",
      borderRadius: "8px",
      marginBottom: "16px",
    },
    greenCard: {
      backgroundColor: "#f0fdf4",
      padding: "24px",
      borderRadius: "8px",
      marginBottom: "16px",
    },
    purpleCard: {
      backgroundColor: "#faf5ff",
      padding: "24px",
      borderRadius: "8px",
      marginBottom: "16px",
    },
    darkCard: {
      backgroundColor: "#eff6ff",
      color: "white",
      padding: "24px",
      borderRadius: "8px",
    },
    gradientCard: {
      background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
      color: "white",
      padding: "32px",
      borderRadius: "8px",
    },
    iconCircle: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: "50%",
      width: "64px",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px auto",
    },
    amenityCard: {
      backgroundColor: "white",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      padding: "24px",
      textAlign: "center",
      transition: "border-color 0.3s ease",
    },
    amenityIcon: {
      width: "64px",
      height: "64px",
      backgroundColor: "#dbeafe",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px auto",
      fontSize: "24px",
      color: "#2563eb",
    },
    photoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
      marginBottom: "32px",
    },
    photo: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "8px",
      border: "2px solid #e5e7eb",
    },
    mapContainer: {
      backgroundColor: "#e5e7eb",
      borderRadius: "8px",
      overflow: "hidden",
      height: "400px",
      marginBottom: "32px",
    },
    mapPlaceholder: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#6b7280",
      textAlign: "center",
    },
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }} ref={ref}>
      {/* Page 1 - Cover Page */}
      <div style={{ ...styles.gradientBackground, ...styles.pageBreak }}>
        <div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "14px", opacity: 0.75 }}>
              Property Code: {getPropertyCode()}
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                marginBottom: "16px",
                margin: 0,
                color: "white",
              }}
            >
              {property?.property_title}
            </h1>
            <p
              style={{
                fontSize: "24px",
                opacity: 0.9,
                margin: "16px 0",
                color: "white",
              }}
            >
              {property?.property_type?.name}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "16px",
                fontSize: "20px",
              }}
            >
              <MapPin size={24} />
              <span>{property?.location_area}</span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={styles.iconCircle}>
                <Bed size={32} />
              </div>
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                {property?.bedrooms}
              </div>
              <div style={{ opacity: 0.75 }}>Bedrooms</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={styles.iconCircle}>
                <Bath size={32} />
              </div>
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                {property?.bathrooms}
              </div>
              <div style={{ opacity: 0.75 }}>Bathrooms</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={styles.iconCircle}>
                <Square size={32} />
              </div>
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                {property?.area}
              </div>
              <div style={{ opacity: 0.75 }}>Sq Ft</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {formatPrice(property?.price)}
            {property?.rent_duration && (
              <span style={{ fontSize: "24px" }}>
                /{property.rent_duration}
              </span>
            )}
          </div>
          <div style={{ fontSize: "20px", opacity: 0.75 }}>
            {property?.rent_duration ? "Rental Price" : "Sale Price"}
          </div>
        </div>
      </div>

      {/* Page 2 - Property Photos */}
      <div
        style={{ minHeight: "1050px", padding: "32px", ...styles.pageBreak }}
      >
        <div style={styles.container}>
          {/* <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            Property Gallery
          </h2>

          {property?.photos && property.photos.length > 0 && (
            <div style={styles.photoGrid}>
              {property.photos.map((photo, index) => (
                <img
                  key={index}
                  src={`${adminBaseUrl}${photo}`}
                  alt={`Property photo ${index + 1}`}
                  style={styles.photo}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ))}
            </div>
          )} */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            <div style={{ ...styles.card, marginBottom: 0 }}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  color: "#111827",
                }}
              >
                Basic Information
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280" }}>Property Type:</span>
                  <span style={{ fontWeight: "500" }}>
                    {property?.property_type?.name}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280" }}>Usage:</span>
                  <span
                    style={{ fontWeight: "500", textTransform: "capitalize" }}
                  >
                    {property?.usage}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280" }}>Furnishing:</span>
                  <span
                    style={{ fontWeight: "500", textTransform: "capitalize" }}
                  >
                    {property?.furnishing}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280" }}>Ownership:</span>
                  <span
                    style={{ fontWeight: "500", textTransform: "capitalize" }}
                  >
                    {property?.ownership}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280" }}>Year Built:</span>
                  <span style={{ fontWeight: "500" }}>
                    {property?.year_built}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ ...styles.blueCard, marginBottom: 0 }}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  color: "#111827",
                }}
              >
                Space Details
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280" }}>Total Area:</span>
                  <span style={{ fontWeight: "500" }}>
                    {property?.area} sq ft
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280" }}>Balcony Size:</span>
                  <span style={{ fontWeight: "500" }}>
                    {property?.balcony_size} sq ft
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280" }}>Parking:</span>
                  <span style={{ fontWeight: "500" }}>
                    {property?.parking_available
                      ? "Available"
                      : "Not Available"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.darkCard}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "16px",
              }}
            >
              Description
            </h3>
            <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
              {property?.property_description}
            </p>
            <p style={{ marginTop: "16px", fontSize: "14px", opacity: 0.75 }}>
              {property?.property_type?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Page 3 - Amenities & Features */}
      <div style={{ padding: "32px", ...styles.pageBreak }}>
        <div style={styles.container}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            Amenities & Features
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
              marginBottom: "48px",
            }}
          >
            {property?.amenities?.map((amenity) => (
              <div key={amenity.id} style={styles.amenityCard}>
                <div style={styles.amenityIcon}>
                  <i
                    className={`fas ${amenity.icon}`}
                    style={{ fontSize: "24px", color: "#2563eb" }}
                  ></i>
                </div>
                <h3
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#111827",
                    margin: 0,
                  }}
                >
                  {amenity.title}
                </h3>
                {amenity.image_url && (
                  <img
                    src={`${adminBaseUrl}${amenity.image_url}`}
                    alt={amenity.title}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginTop: "12px",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div style={styles.gradientCard}>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "24px",
                textAlign: "center",
                color: "white",
              }}
            >
              Key Highlights
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "24px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Star color="#fbbf24" size={24} />
                <span>Prime {property?.location_area} Location</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Star color="#fbbf24" size={24} />
                <span>Modern {property?.property_type?.name}</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Star color="#fbbf24" size={24} />
                <span>{property?.furnishing} Property</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Star color="#fbbf24" size={24} />
                <span>{property?.ownership} Ownership</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Star color="#fbbf24" size={24} />
                <span>Built in {property?.year_built}</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Star color="#fbbf24" size={24} />
                <span>{property?.retail_centers} Nearby Retail Centers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 4 - Location Map & Final Details */}
      <div
        style={{
          minHeight: "842px",
          marginTop: "32px",
          padding: "32px",
          ...styles.pageBreak,
        }}
      >
        <div style={styles.container}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            Location & Contact
          </h2>

          {/* <div style={styles.mapContainer}>
            {property?.google_maps_link ? (
              <iframe
                src={property.google_maps_link}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Property Location"
              />
            ) : (
              <div style={styles.mapPlaceholder}>
                <div>
                  <MapPin size={48} style={{ margin: "0 auto 16px auto" }} />
                  <p>Map location will be displayed here</p>
                </div>
              </div>
            )}
          </div> */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
            }}
          >
            <div style={styles.card}>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "#111827",
                }}
              >
                Get In Touch
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <Phone color="#2563eb" size={24} />
                  <div>
                    <p
                      style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}
                    >
                      Phone
                    </p>
                    <p
                      style={{ fontWeight: "600", fontSize: "18px", margin: 0 }}
                    >
                      {property?.phone}
                    </p>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <Mail color="#2563eb" size={24} />
                  <div>
                    <p
                      style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}
                    >
                      Email
                    </p>
                    <p
                      style={{ fontWeight: "600", fontSize: "18px", margin: 0 }}
                    >
                      {property?.email}
                    </p>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <MapPin color="#2563eb" size={24} />
                  <div>
                    <p
                      style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}
                    >
                      Location
                    </p>
                    <p style={{ fontWeight: "600", margin: 0 }}>
                      {property?.location}
                    </p>
                    <p style={{ color: "#6b7280", margin: 0 }}>
                      {property?.location_area}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.blueCard}>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "#111827",
                }}
              >
                Property Summary
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#6b7280" }}>Property Code:</span>
                  <span style={{ fontWeight: "bold", color: "#2563eb" }}>
                    {getPropertyCode()}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#6b7280" }}>Price:</span>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "24px",
                      color: "#16a34a",
                    }}
                  >
                    {formatPrice(property?.price)}
                    {property?.rent_duration && (
                      <span style={{ fontSize: "14px" }}>
                        /{property.rent_duration}
                      </span>
                    )}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#6b7280" }}>Status:</span>
                  <span
                    style={{
                      fontWeight: "600",
                      color: property?.is_available ? "#16a34a" : "#dc2626",
                    }}
                  >
                    {property?.is_available ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>

              <div
                style={{
                  marginTop: "24px",
                  padding: "16px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  borderLeft: "4px solid #2563eb",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "8px",
                    margin: 0,
                  }}
                >
                  Don't miss this opportunity!
                </p>
                <p style={{ fontWeight: "600", margin: 0 }}>
                  Contact us today to schedule a viewing.
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "32px",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            <p>
              This brochure was generated on {new Date().toLocaleDateString()}.
            </p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media print {
            .page-break {
              page-break-after: always;
            }
            body {
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
            * {
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
          }
          @page {
            margin: 0.5in;
            size: A4;
          }
        `,
        }}
      />
    </div>
  );
});
export default AdminPropertyPDF;
