import api from "@/api/axios";
import mapApiDataToTemplate from "@/utilis/mapApiDataToTemplate";
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

const FeaturedListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const { data } = await api.get("/properties");
        const newListings = data.items.map(mapApiDataToTemplate);
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
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".featured-next__active",
          prevEl: ".featured-prev__active",
        }}
        pagination={{
          el: ".featured-pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          300: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {loading ? (
          <div className="row">
            <div className="spinner-border mx-auto m-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          listings.slice(5, 13).map((listing) => (
            <SwiperSlide key={listing.id}>
              <div className="">
                <div className="listing-style1">
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
                          ? "N/A"
                          : Number(
                              listing.price.split("$")[1]
                            ).toLocaleString())}
                    </div>
                  </div>

                  <div className="list-content">
                    <h6 className="list-title">
                      <Link to={`/single-v5/${listing.id}`}>
                        {listing.title}
                      </Link>
                    </h6>
                    <p className="list-text">{listing.location}</p>

                    <div className="list-meta d-flex align-items-center">
                      <a href="#">
                        <UserIcon size={16} color="gray" className="mb-1" />{" "}
                        {listing.developer}
                      </a>
                      <a href="#">
                        {listing.post_handover ? (
                          <Check size={16} color="gray" className="m-1" />
                        ) : (
                          <CircleDot size={16} color="gray" className="m-1" />
                        )}
                        {listing.post_handover
                          ? "Post Handover"
                          : "Pre Handover"}
                      </a>
                      <a href="#">
                        <Clock size={16} color="gray" className="mb-1" />{" "}
                        {listing.yearBuilding}
                      </a>
                    </div>

                    <hr className="mt-2 mb-2" />

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
            </SwiperSlide>
          ))
        )}
      </Swiper>

      <div className="rounded-arrow arrowY-center-position">
        <button className="featured-prev__active swiper_button _prev">
          <i className="far fa-chevron-left" />
        </button>
        <button className="featured-next__active swiper_button _next">
          <i className="far fa-chevron-right" />
        </button>
      </div>
    </>
  );
};

export default FeaturedListings;
