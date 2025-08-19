import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import EnergyClass from "@/components/property/property-single-style/common/EnergyClass";
import HomeValueChart from "@/components/property/property-single-style/common/HomeValueChart";
import InfoWithForm from "@/components/property/property-single-style/common/more-info";
import NearbySimilarProperty from "@/components/property/property-single-style/common/NearbySimilarProperty";
import OverView from "@/components/property/property-single-style/common/OverView";
import PropertyAddress from "@/components/property/property-single-style/single-v5/PropertyAddress";
import PropertyDetails from "@/components/property/property-single-style/single-v5/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/property-single-style/common/PropertyFeaturesAminites";
import PropertyHeader from "@/components/property/property-single-style/single-v5/PropertyHeader";
import PropertyNearby from "@/components/property/property-single-style/common/PropertyNearby";
import MasterPlan from "@/components/property/property-single-style/common/MasterPlan";
import PropertyViews from "@/components/property/property-single-style/common/property-view";
import ProperytyDescriptions from "@/components/property/property-single-style/common/ProperytyDescriptions";
import ReviewBoxForm from "@/components/property/property-single-style/common/ReviewBoxForm";
import Lobby from "@/components/property/property-single-style/common/Lobby";
import ScheduleTour from "@/components/property/property-single-style/sidebar/ScheduleTour";
import PropertyGallery from "@/components/property/property-single-style/single-v5/property-gallery";
import MortgageCalculator from "@/components/property/property-single-style/common/MortgageCalculator";
import WalkScore from "@/components/property/property-single-style/common/WalkScore";
const isDev = import.meta.env.DEV;
import MetaData from "@/components/common/MetaData";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import SingleAgentInfo from "@/components/property/property-single-style/common/more-info/SingleAgentInfo";
import FloorPlans from "@/components/property/property-single-style/common/FloorPlans";
import InteriorImages from "@/components/property/property-single-style/common/InteriorImages";
import BuildingDetails from "@/components/property/property-single-style/common/BuildingDetails";
import PaymentPlans from "@/components/property/property-single-style/common/PaymentPlans";
import FeaturedListings from "@/components/home/home-v2/FeatuerdListings";
import usePropertyStore from "@/store/propertyStore";
import adminApi from "@/api/adminApi";
import OffPlanPropertyPDF from "@/components/property/property-single-style/single-v5/OffPlanPropertyPDF";
import { PDFViewer } from "@react-pdf/renderer";
import ImageTabs from "@/components/pages/about/ImageTabs";
import { Heart, MapPin, Sparkles } from "lucide-react";
// import SingleReview from "@/components/property/property-single-style/common/reviews/SingleReview";
// import BuildingDetails from "@/components/property/property-single-style/common/BuildingDetails";

const metaInformation = {
  title: "Property Single V5 || Homez - Real Estate ReactJS Template",
};

const styles = {
  textShadowDesktop: {
    // Base style (no shadow by default)
    textShadow: "none",
    // Apply shadow only on desktop (≥ 992px)
    "@media (minWidth: 992px)": {
      textShadow: "0px 0px 7px rgba(0, 0, 0, 0.7)",
    },
  },
  description: {
    borderRadius: 8,
  },
  paragraph: {
    lineHeight: 1.5,
    textAlign: "justify",
    marginBottom: 20,

  },
  sectionHeading: {
    fontWeight: "bold",
    marginBottom: 12,
  },
};

const SingleV5 = () => {
  const params = useParams();
  const { id: prefixedId } = params;
  const [showModal, setShowModal] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        // Fetch all needed configuration at once
        const response = await adminApi.get(
          "/theme-options/general?keys=hotline,email,copyright"
        );
        setContactInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };

    fetchContactInfo();
  }, []);
  // Fetch menu items from API (same logic as MainMenu)
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await adminApi.get("/appearance/menus", {
          params: {
            type: "header",
          },
        });

        setMenuItems(response.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu items");
        // Fallback to default menu structure if API fails
        setMenuItems([
          { id: 1, name: "Home", page: "Home" },
          { id: 2, name: "Off-Plan", page: "Off-Plan" },
          { id: 3, name: "Buy", page: "Buy" },
          { id: 4, name: "Listings", page: "Listings" },
          { id: 5, name: "Rent", page: "Rent" },
          { id: 6, name: "Agents", page: "Agents" },
          { id: 7, name: "Who We Are", page: "Who we are" },
          { id: 8, name: "Contact Us", page: "Contact Us" },
        ]);
      }
    };

    fetchMenuItems();
  }, []);
  // Function to extract the numeric ID
  const extractId = (prefixedId, pathPrefix) => {
    switch (pathPrefix) {
      case "rent":
        return prefixedId.replace("qr-", "");
      case "off-plan":
        return prefixedId.replace("op-", "");
      case "buy":
        return prefixedId.replace("qb-", "");
      case "listings":
        return prefixedId; // no prefix to remove
      default:
        return prefixedId.replace("op-", ""); // default to off-plan
    }
  };
  const location = useLocation();
  // Get the current path prefix
  const currentPathPrefix = location.pathname.split("/")[1];

  // Get the actual ID
  const id = extractId(prefixedId, currentPathPrefix);

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [metaInformation, setMetaInformation] = useState({});
  const [isFavorite, setIsFavorite] = useState(
    typeof window !== "undefined" && localStorage.getItem("favourites")
      ? JSON.parse(localStorage.getItem("favourites")).includes(prefixedId)
      : false
  );
  const {
    detailedListings,
    setDetailedListings,
    loading: storePropertiesLoading,
  } = usePropertyStore();
  console.log(property)
  useEffect(() => {
    const fetchProperty = async () => {
      // First, check if the property already exists in the store
      if (storePropertiesLoading) {
        return;
      }
      const existingProperty = detailedListings.find(
        (listing) => listing.id == id
      );

      if (existingProperty) {
        // Use cached data from store
        console.log("Using cached property data from store");
        setProperty({ ...existingProperty, id });
        setLoading(false);
        return;
      }

      // If not found in store, fetch from API
      try {
        console.log("Fetching property data from API");
        const response = isDev
          ? await api.get(`/properties/${id}`)
          : await api.get("/property", {
              params: {
                id,
              },
            });
        setProperty({ ...response.data, id });
        setDetailedListings([...detailedListings, { ...response.data, id }]);
      } catch (error) {
        console.error("Failed to fetch property:", error);
        // Handle error appropriately
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id, detailedListings, storePropertiesLoading]); // Add listings as dependency

  useEffect(() => {
    if (property) {
      setMetaInformation({
        title: property?.name || "Property",
      });
    }
  }, [property]);

  // Helper function to format price
  const formatPrice = (price) => {
    if (!price) return "Ask for price";
    return `${Math.round(price).toLocaleString()}`;
  };

  // Helper function to get price per sqft display
  const getPricePerSqftDisplay = () => {
    if (!property?.unit_blocks || property.unit_blocks.length === 0)
      return null;

    const validBlocks = property.unit_blocks.filter(
      (block) =>
        block.units_price_from_aed &&
        block.units_area_from_m2 &&
        parseFloat(block.units_area_from_m2) > 0
    );
    if (validBlocks.length === 0) return null;

    const minPricePerSqft = Math.min(
      ...validBlocks.map((block) => {
        const priceAed = block.units_price_from_aed;
        const areaM2 = parseFloat(block.units_area_from_m2);
        const areaSqft = areaM2 * 10.764; // Convert m2 to sqft
        return priceAed / areaSqft;
      })
    );

    return isFinite(minPricePerSqft)
      ? Math.floor(minPricePerSqft).toLocaleString()
      : null;
  };

  // Get price range for display
  const getPriceDisplay = () => {
    if (property?.unit_blocks && property?.unit_blocks.length > 0) {
      const prices = property?.unit_blocks
        .filter((block) => block.units_price_from_aed)
        .map((block) => block.units_price_from_aed);

      if (prices.length > 0) {
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        if (minPrice === maxPrice) {
          return formatPrice(minPrice);
        } else {
          return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
        }
      }
    }
    return "Ask for price";
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!", {
      position: "bottom-right",
      duration: 3000,
    });
  };
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    let favorites = [];
    if (typeof window !== "undefined") {
      favorites = localStorage.getItem("favourites")
        ? JSON.parse(localStorage.getItem("favourites"))
        : [];
    }

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((id) => id !== prefixedId);
      toast(
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="red">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>Removed from favorites!</span>
        </div>,
        {
          position: "bottom-right",
          duration: 2000,
        }
      );
    } else {
      // Add to favorites
      favorites.push(prefixedId);
      toast(
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="red">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>Added to favorites!</span>
        </div>,
        {
          position: "bottom-right",
          duration: 2000,
        }
      );
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("favourites", JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  const DescriptionRenderer = ({ text }) => {
    // First remove any leading/trailing whitespace
    const trimmedText = text.trim();

    // Split the text into sections, handling the initial heading
    const sections = trimmedText
      .split(/(?:^|\n)#####\s+/)
      .filter((section) => section.trim());

    return (
      <div style={styles.description} >
        {sections.map((section, index) => {
          // For the very first section if it's not a heading (unlikely in this case)
          if (index === 0 && !trimmedText.startsWith("#####")) {
            return (
              <p key={index} style={styles.paragraph}>
                {section.trim()}
              </p>
            );
          }

          // Find the first newline to separate heading from content
          const firstNewline = section.indexOf("\n");
          const heading =
            firstNewline === -1 ? section : section.substring(0, firstNewline);
          const content =
            firstNewline === -1
              ? ""
              : section.substring(firstNewline + 1).trim();

          return (
            <div key={index}>
              <p style={styles.sectionHeading} className="text-muted">{heading}</p>
              {content ? <p className="text-secondary" style={styles.paragraph}>{content}</p> : null}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <>
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader menuItems={menuItems} error={error} />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu menuItems={menuItems} error={error} />
      {/* End Mobile Nav  */}

      {/* Property All Single V4 */}
      <section className="pt30  pb90 bgc-f7 ">
        <div
          className="container-fluid  mx-auto"
          style={{ maxWidth: "1600px" }}
        >
          <div className="row  justify-content-center ">
            {/* dummy */}
            <div className="col-lg-2"></div>
            <div className="col-lg-6">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2  mb30 overflow-hidden position-relative">
                <PropertyGallery
                  loading={loading}
                  architecture={property?.architecture}
                  coordinates={property?.coordinates}
                />
                <div className="row sp-v5-property-details ">
                  <PropertyHeader property={property} prefixedId={prefixedId} />
                </div>
              </div>

              <div className="ps-widget    mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb20">Visualisations</h4>
                <div className="row">
                  <ImageTabs
                    architecture={property?.architecture}
                    lobby={property?.lobby}
                  />
                </div>
              </div>
              {/* <div className="ps-widget    mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb20">Project Video</h4>
                <div className="row"></div>
              </div> */}

              <div className="ps-widget  mt40  mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb15">Overview</h4>
                <div className="row">
                  {property?.overview ? (
                    <DescriptionRenderer text={property?.overview} />
                  ) : (
                    <p className="mb30 text-secondary">No Description</p>
                  )}
                </div>
              </div>
              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Overview</h4>
                <div className="row">
                  <AdminOverView property={property} prefixedId={prefixedId} />
                  <div className="row">
                    <button
                      type="button"
                      className="ud-btn btn-white2"
                      onClick={() => setShowModal(true)}
                    >
                      Download PDF
                      <i className="fal fa-arrow-right-long" />
                    </button>
                  </div>
                  {showModal && (
                    <div
                      style={{ display: "block" }}
                      tabIndex="-1"
                      className=" modal fade show "
                      onClick={() => setShowModal(false)}
                    >
                      <div
                        className="modal-dialog  modal-dialog-centered modal-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Download PDF</h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={() => setShowModal(false)}
                            ></button>
                          </div>
                          <div className="modal-body  pb50 px-4">
                            <div className="row">
                              <AdminReviewBoxForm
                                property={property}
                                prefixedId={prefixedId}
                                downloadPDF={true}
                                contactInfo={contactInfo}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Property Description</h4>
                <AdminProperytyDescriptions property={property} />

                <h4 className="title fz17 mb30 mt50">Property Details</h4>
                <div className="row">
                  <AdminPropertyDetails
                    property={property}
                    prefixedId={prefixedId}
                  />
                </div>
              </div> */}
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt30  mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb25 pl15">
                  <span className="mr15 aspect-square p10 bg-danger rounded">
                    <MapPin size={22} color="white" />
                  </span>
                  Location
                </h4>
                <div className="row">
                  <PropertyAddress
                    property={property}
                    coordinates={property?.coordinates}
                  />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget  p10 overflow-hidden position-relative">
                <h4 className="title  fz17">Facilities</h4>
                <div className="row  justify-content-center">
                  <PropertyFeaturesAminites facilities={property?.facilities} />
                </div>
              </div>
              {/* End .ps-widget */}

              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Energy Class</h4>
                <div className="row">
                  <EnergyClass />
                </div>
              </div> */}
              {/* End .ps-widget */}
              {/* 
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Unit Plans</h4>
                <div className="row">
                  <div className="col-md-12">
                    <div className="accordion-style1 style2">
                      <FloorPlans property={property} />
                    </div>
                  </div>
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 ">
                <h4 className="title fz17 mb30">Master Plan</h4>
                <div className="row">
                  <MasterPlan master_plan={property?.master_plan} />
                </div>
              </div> */}

              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="row">
                  <div className="product_single_content mb50">
                    <div className="mbp_pagination_comments">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="total_review d-flex align-items-center justify-content-between mb20">
                            <h6 className="fz17 mb15">Property Images</h6>
                          </div>
                        </div>

                        <AdminInteriorImages interior={property?.photos} />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            {/* End .col-8 */}

            <div className="col-lg-4 ">
              <div className="col-lg-4"></div>
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz19 mb7">{property?.name}</h4>

                <div className=" mb25 d-md-flex align-items-center">
                  <p
                    className="text fz13 mb-0 pr10 d-none d-lg-block"
                    style={styles.textShadowDesktop}
                  >
                    {property?.area}, {property?.country}
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <h4
                    className="price mb-0 d-none d-lg-block"
                    style={styles.textShadowDesktop}
                  >
                    {getPriceDisplay() === "Ask for price"
                      ? "Ask for price"
                      : "AED " + getPriceDisplay()}
                  </h4>
                  <h3 className="price mb-0 d-lg-none">
                    {getPriceDisplay() === "Ask for price"
                      ? "Ask for price"
                      : "AED " + getPriceDisplay()}
                  </h3>
                  <div className="single-property-content">
                    <div className="property-action text-lg-end">
                      <div className="d-flex  align-items-center justify-content-lg-end">
                        <a
                          className="icon mr10 d-none d-lg-block"
                          href="#"
                          onClick={handleFavoriteClick}
                          style={styles.textShadowDesktop}
                        >
                          <Heart
                            fill={isFavorite ? "red" : "none"}
                            color={isFavorite ? "red" : "currentColor"}
                            size={20}
                            className="pb5"
                          />
                        </a>

                        <a
                          className="icon mr10 d-lg-none"
                          href="#"
                          onClick={handleFavoriteClick}
                        >
                          <Heart
                            fill={isFavorite ? "red" : "none"}
                            color={isFavorite ? "red" : "currentColor"}
                            size={20}
                          />
                        </a>

                        <a
                          className="icon mr10 d-none d-lg-block"
                          href="#"
                          onClick={handleShareClick}
                          style={styles.textShadowDesktop}
                        >
                          <span className="flaticon-share-1" />
                        </a>
                        <a
                          className="icon mr10 d-lg-none"
                          href="#"
                          onClick={handleShareClick}
                        >
                          <span className="flaticon-share-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {(() => {
                  const pricePerSqft = getPricePerSqftDisplay();
                  return pricePerSqft ? (
                    <>
                      <p
                        className="text space fz13 d-none d-lg-block"
                        style={styles.textShadowDesktop}
                      >
                        Starting from AED {pricePerSqft} per sqft
                      </p>
                      <p className="text space fz13 d-lg-none">
                        Starting from AED {pricePerSqft} per sqft
                      </p>
                    </>
                  ) : null;
                })()}
                <div className="row mt20">
                  <div className="row">
                    <button
                      type="button"
                      className="ud-btn btn-white2 luxury-heading w-100"
                      onClick={() => setShowModal(true)}
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        border: "none",
                        fontFamily: "Poppins",
                      }}
                    >
                      <Sparkles
                        strokeWidth={1.5}
                        fill="white"
                        className="mr10"
                      />
                      AI Presentation
                      <i className="fal fa-arrow-right-long" />
                    </button>
                  </div>
                  {showModal && (
                    <div
                      style={{ display: "block" }}
                      tabIndex="-1"
                      className=" modal fade show "
                      onClick={() => setShowModal(false)}
                    >
                      <div
                        className="modal-dialog  modal-dialog-centered modal-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Download PDF</h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={() => setShowModal(false)}
                            ></button>
                          </div>
                          <div className="modal-body  pb50 px-4">
                            <div className="row">
                              <ReviewBoxForm
                                property={property}
                                prefixedId={prefixedId}
                                downloadPDF={true}
                                contactInfo={contactInfo}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Submit an Enquiry</h4>
                <div className="row">
                  <ReviewBoxForm
                    property={property}
                    prefixedId={prefixedId}
                    downloadPDF={true}
                    contactInfo={contactInfo}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* End .row */}
        </div>

        {/* End .container */}
      </section>
      {/* End Property All Single V4  */}

      {/* Property Slider Gallery */}

      {/* End Property Slider Gallery */}

      {/* Property All Single V4 */}
      <section className="pt30 pb90 bgc-f7">
        <div className="container">
          {/* End .row */}
          {property && contactInfo && (
            <PDFViewer style={{ width: "100%", height: "100vh" }}>
              <OffPlanPropertyPDF
                property={property}
                qbc_email={contactInfo?.email}
                qbc_phone={contactInfo?.hotline}
                qbc_copyright={contactInfo?.copyright}
              />
            </PDFViewer>
          )}
          <div className="row mt50 mt30-lg">
            <div className="col-lg-6">
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Unit Plans</h4>
                <div className="row">
                  <div className="col-md-12">
                    <div className="accordion-style1 style2">
                      <FloorPlans property={property} />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 ">
                <h4 className="title fz17 mb30">Master Plan</h4>
                <div className="row">
                  <MasterPlan master_plan={property?.master_plan} />
                </div>
              </div>
            </div>
            {/* End .col-8 */}

            <div className="col-lg-6">
              <div className="column">
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">What&apos;s Nearby?</h4>
                  <div className="row">
                    <PropertyNearby map_points={property?.map_points} />
                  </div>
                </div>
                {/* End What&apos;s Nearby? */}

                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Payment Plans</h4>
                  <div className="row">
                    <div className="col-md-12">
                      {/* <WalkScore /> */}
                      <PaymentPlans payment_plans={property?.payment_plans} />
                    </div>
                  </div>
                </div>
                {/* End Walkscore */}

                {/* End .360° Virtual Tour */}

                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p20 pt30 mb30 overflow-hidden position-relative">
                  <div className="row">
                    <h4 className="title fz17 mb30 pl20">Building Details</h4>
                    <BuildingDetails buildings={property?.buildings} />
                  </div>
                </div>

                {/* End PropertyViews */}

                {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Home Value</h4>
                  <div className="row">
                    <HomeValueChart />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Property All Single V4  */}

      {/* Start similar-items  */}
      <section className="similar-items pt80 pb90">
        <div className="container">
          <div className="row mt30 align-items-center justify-content-between">
            <div className="col-auto">
              <div className="main-title">
                <h2 className="title">Nearby Similar Homes</h2>
                <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p>
              </div>
            </div>
            {/* End header */}

            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          {/* <div className="row">
            <div className="col-lg-12">
              <div className="property-city-slider">
                <NearbySimilarProperty />
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-listing-slider">
                <FeaturedListings />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End similar-items  */}
      {/* Modal backdrop */}
      {showModal && (
        <div style={{ zIndex: 10 }} className="modal-backdrop fade show"></div>
      )}
      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default SingleV5;
