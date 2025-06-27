import api from "@/api/axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

import {
  UserIcon,
  Check,
  CircleDot,
  Clock,
  ChartNoAxesCombined,
} from "lucide-react";
import mapApiDataToTemplateSingle from "@/utilis/mapApiDataToTemplateSingle";
import AnimatedText from "./hero/AnimatedText";
import LuxuryHeading from "./hero/LuxuryHeading";
import usePropertyStore from "@/store/propertyStore";

const FeaturedListingsHome = ({ index, section }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    handleSearchTerm,
    handlePropertyType,
    handlePriceRange,
    priceRange,
    resetAllFilters,
  } = usePropertyStore();
  const navigate = useNavigate();
  // Generate unique ID for this component instance
  const uniqueId = useState(() => Math.random().toString(36).substr(2, 9))[0];

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const { data } = section.params
          ? await api.get("/properties", { params: section.params })
          : await api.get("/properties");
        const newListings = data.items.map(mapApiDataToTemplateSingle);
        setListings(newListings);
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  return (
    listings.length > 0 && (
      <div
        key={index}
        style={{
          maxHeight: "900px",
          marginBottom: "220px",
          opacity: 1,
        }}
      >
        <section className="pt10 pb0 pb0  bgc-white">
          <div className="container ">
            <div
              style={{ position: "relative" }}
              className="row  mb20 "
              data-aos="fade-up"
            >
              <div className="col-lg-12 ">
                <div className="main-title2  text-center">
                  <LuxuryHeading>{section.title}</LuxuryHeading>
                  <p className="paragraph  ">{section.paragraph}</p>
                </div>
              </div>
              <div style={{ top: "125px", position: "absolute" }}>
                <div className="text-start text-lg-end mb-3 cursor-pointer">
                  <Link
                    to="/off-plan"
                    className="ud-btn2 "
                    onClick={(e) => {
                      e.preventDefault();
                      resetAllFilters();
                      ///search term
                      section?.params?.areas
                        ? handleSearchTerm("Dubai Beach")
                        : section?.params?.developer
                        ? handleSearchTerm("Sobha Dubai")
                        : handleSearchTerm("Dubai");
                      ///property types
                      section?.params?.unit_types &&
                        handlePropertyType(
                          section.params.unit_types.split(",")[0].trim()
                        );

                      ///price range
                      section?.params?.unit_price_from &&
                        handlePriceRange([
                          section.params.unit_price_from,
                          priceRange[1],
                        ]);
                      section?.params?.unit_price_to &&
                        handlePriceRange([
                          priceRange[0],
                          section.params.unit_price_to,
                        ]);
                      navigate("/off-plan");
                    }}
                  >
                    {section.seeAll}
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="" style={{ marginTop: "-30px" }}>
              <div
                className="col-lg-12"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="feature-listing-slider">
                  <div className="text-center">
                    {loading ? (
                      <div className="row">
                        <div
                          className="spinner-border mx-auto m-5"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="row">
                        {/* First row with 3 properties */}
                        <div className="row mb-2">
                          {listings.slice(0, 3).map((listing, index) => (
                            <div className="col-md-4" key={listing.id || index}>
                              <Link
                                to={`/off-plan/${listing.id}`}
                                className="w-100"
                              >
                                <div className="h-100 w-100">
                                  <div
                                    className="listing-style1 w-100 d-flex flex-column"
                                    style={{
                                      height: "90%",
                                      transition: "all 0.3s ease",
                                      borderRadius: "8px",
                                    }}
                                  >
                                    <div className="list-thumb">
                                      <img
                                        className="w-100 cover"
                                        style={{ height: "230px" }}
                                        src={listing.image}
                                        alt="listing"
                                      />
                                      {
                                        <div className="sale-sticker-wrap">
                                          <div className="list-tag fz12">
                                            <span className="flaticon-electricity me-2" />
                                            FEATURED
                                          </div>
                                        </div>
                                      }
                                      <div className="list-price">
                                        {"AED " +
                                          (Number(
                                            listing.price.split("$")[1]
                                          ) === 0
                                            ? "Ask for price"
                                            : Number(
                                                listing.price.split("$")[1]
                                              ).toLocaleString())}
                                      </div>
                                    </div>

                                    <div className="list-content flex-grow-1 d-flex justify-content-between flex-column">
                                      <div>
                                        <h6 className="list-title d-flex justify-self-start justify-content-start">
                                          {listing.title}
                                        </h6>
                                        <p className="list-text d-flex justify-content-start">
                                          {listing.location}
                                        </p>
                                      </div>

                                      <div className="list-meta d-flex gap-0 align-items-center">
                                        <span className="text-start">
                                          <UserIcon
                                            size={16}
                                            color="gray"
                                            className="mb-1"
                                          />{" "}
                                          {listing.developer}
                                        </span>
                                        <span className="text-start">
                                          {listing.post_handover ? (
                                            <Check
                                              size={16}
                                              color="gray"
                                              className="m-1"
                                            />
                                          ) : (
                                            <CircleDot
                                              size={16}
                                              color="gray"
                                              className="m-1"
                                            />
                                          )}
                                          {listing.post_handover
                                            ? "Post Handover"
                                            : "Pre Handover"}
                                        </span>
                                        <span className="text-start">
                                          <Clock
                                            size={16}
                                            color="gray"
                                            className="mb-1"
                                          />{" "}
                                          {listing.yearBuilding}
                                        </span>
                                      </div>

                                      <div className="list-meta2 d-flex justify-content-between align-items-center">
                                        <div>
                                          <ChartNoAxesCombined
                                            className="mb-1"
                                            size={16}
                                            color="gray"
                                          />{" "}
                                          {listing.sale_status}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>

                        {/* Second row with next 3 properties */}
                        <div className="row">
                          {listings.slice(3, 6).map((listing, index) => (
                            <div
                              className="col-md-4"
                              key={listing.id || index + 3}
                            >
                              <Link
                                to={`/off-plan/${listing.id}`}
                                className="w-100"
                              >
                                <div className="h-100 w-100">
                                  <div
                                    className="listing-style1 w-100 d-flex flex-column"
                                    style={{
                                      height: "90%",
                                      transition: "all 0.3s ease",
                                      borderRadius: "8px",
                                    }}
                                  >
                                    <div className="list-thumb">
                                      <img
                                        className="w-100 cover"
                                        style={{ height: "230px" }}
                                        src={listing.image}
                                        alt="listing"
                                      />
                                      {
                                        <div className="sale-sticker-wrap">
                                          <div className="list-tag fz12">
                                            <span className="flaticon-electricity me-2" />
                                            FEATURED
                                          </div>
                                        </div>
                                      }
                                      <div className="list-price">
                                        {"AED " +
                                          (Number(
                                            listing.price.split("$")[1]
                                          ) === 0
                                            ? "Ask for price"
                                            : Number(
                                                listing.price.split("$")[1]
                                              ).toLocaleString())}
                                      </div>
                                    </div>

                                    <div className="list-content flex-grow-1 d-flex justify-content-between flex-column">
                                      <div>
                                        <h6 className="list-title d-flex justify-self-start justify-content-start">
                                          {listing.title}
                                        </h6>
                                        <p className="list-text d-flex justify-content-start">
                                          {listing.location}
                                        </p>
                                      </div>

                                      <div className="list-meta d-flex gap-0 align-items-center">
                                        <span className="text-start">
                                          <UserIcon
                                            size={16}
                                            color="gray"
                                            className="mb-1"
                                          />{" "}
                                          {listing.developer}
                                        </span>
                                        <span className="text-start">
                                          {listing.post_handover ? (
                                            <Check
                                              size={16}
                                              color="gray"
                                              className="m-1"
                                            />
                                          ) : (
                                            <CircleDot
                                              size={16}
                                              color="gray"
                                              className="m-1"
                                            />
                                          )}
                                          {listing.post_handover
                                            ? "Post Handover"
                                            : "Pre Handover"}
                                        </span>
                                        <span className="text-start">
                                          <Clock
                                            size={16}
                                            color="gray"
                                            className="mb-1"
                                          />{" "}
                                          {listing.yearBuilding}
                                        </span>
                                      </div>

                                      <div className="list-meta2 d-flex justify-content-between align-items-center">
                                        <div>
                                          <ChartNoAxesCombined
                                            className="mb-1"
                                            size={16}
                                            color="gray"
                                          />{" "}
                                          {listing.sale_status}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style>{`
        .listing-style1:hover {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
          transform: translateY(-2px);
        }
      `}</style>
      </div>
    )
  );
};

export default FeaturedListingsHome;
