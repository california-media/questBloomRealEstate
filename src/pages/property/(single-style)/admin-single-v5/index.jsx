import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import { Heart, Loader2, MapPin } from "lucide-react";

import "/public/css/LuxuryHeading.css";
import PropertyNearby from "@/components/property/property-single-style/common/PropertyNearby";
import MasterPlan from "@/components/property/property-single-style/common/MasterPlan";

import AdminReviewBoxForm from "@/components/property/property-single-style/common/AdminReviewBoxForm";
import Lobby from "@/components/property/property-single-style/common/Lobby";
import AdminPropertyGallery from "@/components/property/property-single-style/single-v5/admin-property-gallery";

const isDev = import.meta.env.DEV;
import MetaData from "@/components/common/MetaData";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "@/api/axios";
import SingleAgentInfo from "@/components/property/property-single-style/common/more-info/SingleAgentInfo";
import FloorPlans from "@/components/property/property-single-style/common/FloorPlans";
import AdminInteriorImages from "@/components/property/property-single-style/common/AdminInteriorImages";
import BuildingDetails from "@/components/property/property-single-style/common/BuildingDetails";
import PaymentPlans from "@/components/property/property-single-style/common/PaymentPlans";
import FeaturedListings from "@/components/home/home-v2/FeatuerdListings";
import usePropertyStore from "@/store/propertyStore";
import adminApi from "@/api/adminApi";
import ExtraPropertyDetails from "@/components/property/property-single-style/common/ExtraPropertyDetails";
import AdminPropertyHeader from "@/components/property/property-single-style/single-v5/AdminPropertyHeader";
import AdminOverView from "@/components/property/property-single-style/common/AdminOverView";
import AdminProperytyDescriptions from "@/components/property/property-single-style/common/AdminProperytyDescriptions";
import AdminPropertyDetails from "@/components/property/property-single-style/single-v5/AdminPropertyDetails";
import AdminPropertyAddress from "@/components/property/property-single-style/single-v5/AdminPropertyAddress";
import AdminPropertyFeaturesAminites from "@/components/property/property-single-style/common/AdminPropertyFeaturesAminites";
import { PDFViewer } from "@react-pdf/renderer";
import AdminPropertyPDF from "@/components/property/property-single-style/single-v5/AdminPropertyPDF";
import { Sparkles } from "lucide-react";
import AdminImageTabs from "@/components/pages/about/AdminImageTabs";
import toast from "react-hot-toast";
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
};

const AdminSingleV5 = () => {
  const params = useParams();
  const { id: prefixedId } = params;
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
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [metaInformation, setMetaInformation] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(
    typeof window !== "undefined" && localStorage.getItem("favourites")
      ? JSON.parse(localStorage.getItem("favourites")).includes(prefixedId)
      : false
  );
  const [isSticky, setIsSticky] = useState(false);
  const boxRef = useRef(null);
  const { adminDetailedListings, setAdminDetailedListings } =
    usePropertyStore();
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
    const handleScroll = () => {
      if (!boxRef.current) return;
      const { top } = boxRef.current.getBoundingClientRect();
      // when box reaches 100px from top -> stick it
      setIsSticky(window.scrollY > boxRef.current.offsetTop - 120);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  useEffect(() => {
    const fetchProperty = async () => {
      const existingProperty = adminDetailedListings.find(
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
        const response = await adminApi.get(
          `/${
            currentPathPrefix === "rent" ? "rental" : "resale"
          }-properties/${id}`
        );

        setProperty({ ...response.data, id });
        setAdminDetailedListings([
          ...adminDetailedListings,
          { ...response.data, id },
        ]);
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
  }, [id, adminDetailedListings]); // Add listings as dependency

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
  // Get price display

  const getPriceDisplay = () => {
    if (property?.price) {
      return formatPrice(property.price);
    }
    return "Ask for price";
  };

  // Helper function to get price per sqft display
  const getPricePerSqftDisplay = () => {
    if (!property?.price || !property?.area) return null;

    const priceAed = property.price;
    const areaM2 = parseFloat(property.area);

    if (areaM2 <= 0) return null;

    const areaSqft = areaM2 * 10.764; // Convert m2 to sqft
    const pricePerSqft = priceAed / areaSqft;

    return isFinite(pricePerSqft)
      ? Math.floor(pricePerSqft).toLocaleString()
      : null;
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
          <div className="row  flex-wrap-reverse justify-content-center ">
            {/* dummy */}
            <div className="col-lg-2"></div>
            <div className="col-lg-6 ">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2  mb30 overflow-hidden position-relative">
                <AdminPropertyGallery
                  loading={loading}
                  photos={property?.photos}
                  googleMapsLink={property?.google_maps_link}
                />
                <div
                  className={`row ${
                    property?.year_built
                      ? "sp-v5-property-details"
                      : "sp-v5-property-details-admin"
                  }`}
                >
                  <AdminPropertyHeader
                    property={property}
                    prefixedId={prefixedId}
                  />
                </div>
              </div>
              {/* {property && contactInfo && (
                <PDFViewer style={{ width: "100%", height: "100vh" }}>
                  <AdminPropertyPDF
                    property={property}
                    qbc_email={contactInfo?.email}
                    qbc_phone={contactInfo?.hotline}
                    qbc_copyright={contactInfo?.copyright}
                  />
                </PDFViewer>
              )} */}
              <div className="ps-widget    mb40 overflow-hidden position-relative">
                <h3 className="title  mb20">Visualisations</h3>
                <div className="row">
                  <AdminImageTabs photos={property?.photos} />
                </div>
              </div>
              {/* <div className="ps-widget    mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb20">Project Video</h4>
                <div className="row"></div>
              </div> */}

              <div className="ps-widget  mt40  mb40 overflow-hidden position-relative">
                <h3 className="title  mb15">Overview</h3>
                <div className="row">
                  {property?.property_description ? (
                    <p
                      className="mb30 text-secondary"
                      dangerouslySetInnerHTML={{
                        __html: property?.property_description,
                      }}
                    ></p>
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
                  <AdminPropertyAddress
                    property={property}
                    location={property?.location} // Now using the direct location string
                  />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget  p10 overflow-hidden position-relative">
                <h3 className="title  ">Facilities</h3>
                <div className="row  justify-content-center">
                  <AdminPropertyFeaturesAminites
                    amenities={property?.amenities}
                  />
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
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden ">
                <h4 className="title fz19 mb7">{property?.property_title}</h4>

                <div className=" mb20 d-md-flex align-items-center">
                  <p
                    className="text fz13 mb-0 pr10 d-none d-lg-block"
                    style={styles.textShadowDesktop}
                  >
                    {property?.location || "Location"}
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
                            <h5 className="modal-title">AI Presentation</h5>
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
              </div>
              <div
                ref={boxRef}
              ></div>
              <div
                className={`ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 `}
                style={{
                  position: isSticky ? "fixed" : "static",
                  top: isSticky ? "120px" : "auto",
                  width: isSticky ? "508.39px" : "auto", // prevent shrinking
                }}
              >
                <h4 className="title fz17 mb30">Submit an Enquiry</h4>
                <div className="row">
                  <AdminReviewBoxForm
                    property={property}
                    prefixedId={prefixedId}
                  />
                </div>
              </div>
            </div>

            {/* Mobile, non sticky */}
            {/* <div className="col-lg-4 d-block d-lg-none ">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz19 mb7">{property?.property_title}</h4>

                <div className=" mb20 d-md-flex align-items-center">
                  <p
                    className="text fz13 mb-0 pr10 d-none d-lg-block"
                    style={styles.textShadowDesktop}
                  >
                    {property?.location || "Location"}
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
                            <h5 className="modal-title">AI Presentation</h5>
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
              </div>

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Submit an Enquiry</h4>
                <div className="row">
                  <AdminReviewBoxForm
                    property={property}
                    prefixedId={prefixedId}
                  />
                </div>
              </div>
            </div> */}
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
      {showModal && (
        <div style={{ zIndex: 10 }} className="modal-backdrop fade show"></div>
      )}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>

      <div className="col-lg-3 ">
        <div className="column">
          {/* <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <h4 className="form-title mb5">Schedule a tour</h4>
                  <p className="text">Choose your preferred day</p>
                  <ScheduleTour />
                </div> */}
          {/* End .Schedule a tour */}

          <div className="ps-widget  bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Details</h4>
            {/* <InfoWithForm /> */}
            {/* <SingleAgentInfo developer_data={property?.developer_data} /> */}
            <ExtraPropertyDetails property={property} />
          </div>

          {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30 d-flex align-items-center">
                    <i className="fab fa-whatsapp text-success me-3 fs-4"></i>
                    WhatsApp Support
                  </h4>

                  <div className="contact-method">
                    <div className="d-flex align-items-center mb-3 p-3 bg-light rounded-3 hover-bg-success hover-text-white transition-300">
                      <i className="fas fa-phone-alt text-success me-3 fs-5"></i>
                      <a
                        href="https://wa.me/yournumber"
                        className="text-dark fs-6 hover-text-white text-decoration-none fw-medium"
                      >
                        +1 (234) 567-8900
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-top">
                    <p className="text-muted mb-0 ">
                      <i className="fas  fa-clock  me-2"></i>
                      Instant response within minutes
                    </p>
                  </div>
                </div> */}

          {/* Email */}
          {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30 d-flex align-items-center">
                    <i className="fas fa-envelope text-primary me-3 fs-4"></i>
                    Email Support
                  </h4>

                  <div className="contact-method">
                    <div className="d-flex align-items-center mb-3 p-3 bg-light rounded-3 hover-bg-primary hover-text-white transition-300">
                      <i className="fas fa-envelope-open-text text-primary me-3 fs-5"></i>
                      <a
                        href="mailto:contact@example.com"
                        className="text-dark  fs-6 hover-text-white text-decoration-none fw-medium"
                      >
                        {property?.developer_data?.email}
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-top">
                    <p className="text-muted">
                      <i className="fas fa-clock me-2"></i>
                      Response within 24 hours
                    </p>
                  </div>
                </div> */}
          {/* End Get More Information */}

          {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Mortgage Calculator</h4>
                  <div className="row">
                    <MortgageCalculator />
                  </div>
                </div> */}
          {/* End .Mortgage Calculator */}

          {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">What&apos;s Nearby?</h4>
                  <div className="row">
                    <PropertyNearby map_points={property?.map_points} />
                  </div>
                </div> */}
          {/* End What&apos;s Nearby? */}

          {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Payment Plans</h4>
                  <div className="row">
                    <div className="col-md-12">
                      <PaymentPlans payment_plans={property?.payment_plans} />
                    </div>
                  </div>
                </div> */}
          {/* End Walkscore */}

          {/* {property?.lobby?.[0]?.url && (
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Lobby</h4>
                    <div className="row">
                      <Lobby lobby={property?.lobby} />
                    </div>
                  </div>
                )} */}
          {/* End .360° Virtual Tour */}

          {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p20 pt30 mb30 overflow-hidden position-relative">
                  <div className="row">
                    <h4 className="title fz17 mb30 pl20">Building Details</h4>
                    <BuildingDetails buildings={property?.buildings} />
                  </div>
                </div> */}

          {/* End PropertyViews */}

          {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Home Value</h4>
                  <div className="row">
                    <HomeValueChart />
                  </div>
                </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminSingleV5;
