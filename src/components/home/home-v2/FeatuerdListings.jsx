import api from "@/api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const FeaturedListings = ({ params }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  // Generate unique ID for this component instance
  const uniqueId = useState(() => Math.random().toString(36).substr(2, 9))[0];

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const { data } = params
          ? await api.get("/properties", { params })
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
    <>
      {/* Add wrapper with padding for shadow overflow */}
      <div>
        <Swiper
          spaceBetween={0}
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: `.featured-next__active-${uniqueId}`,
            prevEl: `.featured-prev__active-${uniqueId}`,
          }}
          pagination={{
            el: `.featured-pagination__active-${uniqueId}`,
            clickable: true,
          }}
          slidesPerView={1}
          breakpoints={{
            300: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          // Add this to make slides equal height
          className="swiper-equal-height"
        >
          {loading ? (
            <div className="row">
              <div className="spinner-border mx-auto m-5" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            listings.slice(5, 13).map((listing) => (
              <SwiperSlide key={listing.id} style={{ height: "90%" }}>
                <Link to={`/off-plan/${listing.id}`} className="w-100">
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
                            (Number(listing.price.split("$")[1]) === 0
                              ? "Ask for price"
                              : Number(
                                  listing.price.split("$")[1]
                                ).toLocaleString())}
                        </div>
                      </div>

                      <div className="list-content flex-grow-1 d-flex justify-content-between flex-column">
                        <div>
                          <h6 className="list-title d-flex justify-content-start">
                            {listing.title}
                          </h6>
                          <p className="list-text d-flex justify-content-start">
                            {listing.location}
                          </p>
                        </div>

                        <div className="list-meta d-flex gap-0 align-items-center">
                          <a href="#" className="text-start">
                            <UserIcon size={16} color="gray" className="mb-1" />{" "}
                            {listing.developer}
                          </a>
                          <a href="#" className="text-start">
                            {listing.post_handover ? (
                              <Check size={16} color="gray" className="m-1" />
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
                          </a>
                          <a href="#" className="text-start">
                            <Clock size={16} color="gray" className="mb-1" />{" "}
                            {listing.yearBuilding}
                          </a>
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
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>

      <div
        style={{ height: "0.01px" }}
        className="rounded-arrow arrowY-center-position"
      >
        <button
          style={{ marginLeft: "-50px" }}
          className={`featured-prev__active-${uniqueId} swiper_button _prev`}
        >
          <i className="far fa-chevron-left" />
        </button>
        <button
          style={{ marginRight: "-50px" }}
          className={`featured-next__active-${uniqueId} swiper_button _next`}
        >
          <i className="far fa-chevron-right" />
        </button>
      </div>

      <style>{`
        .swiper-equal-height .swiper-slide {
        padding: 20px; !important;
          height: auto !important;
          display: flex;
        }
        
      
        /* Add hover shadow effect */
        .listing-style1:hover {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
          transform: translateY(-2px);
        }
        
      
      `}</style>
    </>
  );
};

export default FeaturedListings;
