import apartmentType from "@/data/apartmentType";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import { Link, useNavigate } from "react-router-dom";
import usePropertyStore from "@/store/propertyStore";
import appertments from "@/data/apartmentTypes2";
import appertmentsTypes from "@/data/apartmentType";
import api from "@/api/axios";
SwiperCore.use([Autoplay]);
const icons = [
  "flaticon-home",
  "flaticon-corporation",
  "flaticon-network",
  "flaticon-garden",
  "flaticon-chat",
  "flaticon-window",
  "flaticon-bird-house",
  "flaticon-map",
  "flaticon-home",
  "flaticon-corporation",
  "flaticon-network",
  "flaticon-garden",
  "flaticon-chat",
];

const ApartmentType = () => {
  const [apartmentType, setApartmentType] = useState([]);
  const [loading, setLoading] = useState(true);
  // Function to fetch counts for each property type
  const navigate = useNavigate();

  const { handlePropertyType } = usePropertyStore();
  const fetchPropertyTypeData = async () => {
    setLoading(true);
    const newPropertyTypes = await api.get("/unit-types");

    // Normalize Chalet/Chalets -> Chalets
    const normalizedTypes = newPropertyTypes.data
      .filter((pt) => pt !== "All Property Types" && pt !== "Cabins")
      .map((pt) => (pt === "Chalet" || pt === "Chalets" ? "Chalets" : pt));

    // Remove duplicates caused by normalization (so "Chalets" only once)
    const uniqueTypes = [...new Set(normalizedTypes)];

    const propertyData = await Promise.all(
      uniqueTypes.map(async (pt, index) => {
        try {
          // collect counts for this type (handles "Chalets" merged case)
          const relevantTypes = newPropertyTypes.data.filter(
            (t) =>
              (pt === "Chalets" && (t === "Chalet" || t === "Chalets")) ||
              t === pt
          );

          let totalCount = 0;
          for (const type of relevantTypes) {
            try {
              const { data } = await api.get("/properties", {
                params: { unit_types: type, per_page: 1 },
              });
              totalCount += data.pagination?.total || 0;
            } catch (err) {
              console.error(`Failed to fetch count for ${type}:`, err);
            }
          }

          return {
            id: index + 1,
            icon: icons[index % icons.length],
            title: pt,
            count: totalCount,
          };
        } catch (error) {
          console.error(`Failed to fetch count for ${pt}:`, error);
          return {
            id: index + 1,
            icon: icons[index % icons.length],
            title: pt,
            count: 0,
          };
        }
      })
    );

    setLoading(false);
    return propertyData;
  };

  useEffect(() => {
    fetchPropertyTypeData().then((data) => {
      setApartmentType(data);
    });
  }, []);
  return loading ? (
    <div className="row">
      <div className="spinner-border mx-auto m-5 mb70" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <>
      <Swiper
        spaceBetween={30}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        autoplay={{ delay: 3000 }} // Set the desired delay for autoplay
        className="swiper-same-height"
      >
        {apartmentType
          .filter((type) => type.count > 0)
          .map((type) => (
            <SwiperSlide key={type.id}>
              <div className="item">
                <Link
                  to="/off-plan"
                  onClick={(e) => {
                    e.preventDefault();

                    type.title && handlePropertyType(type.title);

                    navigate("/off-plan", {
                      state: {
                        hasFilters: true,
                      },
                    });
                  }}
                >
                  <div className="iconbox-style4">
                    <span className={`icon ${type.icon}`} />
                    <div className="iconbox-content">
                      <h6 className="title ">{type.title}</h6>
                      <p className="text mb-0">{`${type.count} Properties`}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <style>{`
      @media (max-width: 576px) {
  .swiper-same-height .iconbox-style4 {
    height: 220px !important;
  }
}
       
        
     
      
      `}</style>
    </>
  );
};

export default ApartmentType;
