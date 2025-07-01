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
// import SingleReview from "@/components/property/property-single-style/common/reviews/SingleReview";
// import BuildingDetails from "@/components/property/property-single-style/common/BuildingDetails";

const metaInformation = {
  title: "Property Single V5 || Homez - Real Estate ReactJS Template",
};

const SingleV5 = () => {
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
  const [loading, setLoading] = useState(true);
  const [metaInformation, setMetaInformation] = useState({});

  const {
    detailedListings,
    setDetailedListings,
    loading: storePropertiesLoading,
  } = usePropertyStore();
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
  return (
    <>
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Property Slider Gallery */}
      <section className="p-0 bgc-white">
        <PropertyGallery
          loading={loading}
          architecture={property?.architecture}
          coordinates={property?.coordinates}
        />
      </section>
      {/* End Property Slider Gallery */}

      {/* Property All Single V4 */}
      <section className="pt30 pb90 bgc-f7">
        <div className="container">
          <div className="row sp-v5-property-details">
            <PropertyHeader property={property} />
          </div>
          {/* End .row */}

          <div className="row mt50 mt30-lg">
            <div className="col-lg-6">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Overview</h4>
                <div className="row">
                  <OverView property={property} prefixedId={prefixedId} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Property Description</h4>
                <ProperytyDescriptions property={property} />
                {/* End property description */}

                <h4 className="title fz17 mb30 mt50">Property Details</h4>
                <div className="row">
                  <PropertyDetails
                    property={property}
                    prefixedId={prefixedId}
                  />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30 mt30">Address</h4>
                <div className="row">
                  <PropertyAddress
                    property={property}
                    coordinates={property?.coordinates}
                  />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Features &amp; Amenities</h4>
                <div className="row">
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

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="row">
                  {/* <AllComments /> */}
                  <div className="product_single_content mb50">
                    <div className="mbp_pagination_comments">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="total_review d-flex align-items-center justify-content-between mb20">
                            <h6 className="fz17 mb15">
                              <i className="fas fa-couch fz18 pe-2" />
                              Interior Images
                            </h6>
                          </div>
                        </div>
                        {/* End review filter */}

                        <InteriorImages interior={property?.interior} />
                        {/* End reviews */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End .col-8 */}

            <div className="col-lg-6">
              <div className="column">
                {/* <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <h4 className="form-title mb5">Schedule a tour</h4>
                  <p className="text">Choose your preferred day</p>
                  <ScheduleTour />
                </div> */}
                {/* End .Schedule a tour */}

                <div className="ps-widget  bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Get More Information</h4>
                  {/* <InfoWithForm /> */}
                  <SingleAgentInfo developer_data={property?.developer_data} />
                </div>
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Submit an Enquiry</h4>
                  <div className="row">
                    <ReviewBoxForm property={property} />
                  </div>
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

                {property?.lobby?.[0]?.url && (
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Lobby</h4>
                    <div className="row">
                      <Lobby lobby={property?.lobby} />
                    </div>
                  </div>
                )}
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

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default SingleV5;
