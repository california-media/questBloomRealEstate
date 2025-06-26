import apartmentType from "@/data/apartmentType";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import { Link } from "react-router-dom";
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
  const fetchPropertyTypeData = async () => {
    setLoading(true);
    const newPropertyTypes = await api.get("/unit-types");

    const propertData = await Promise.all(
      newPropertyTypes.data
        .filter((pt) => pt !== "All Property Types")
        .map(async (pt, index) => {
          try {
            const { data } = await api.get("/properties", {
              params: { unit_types: encodeURIComponent(pt), per_page: 1 },
            });
            return {
              id: index + 1,
              icon: icons[index % icons.length],
              title: pt,
              count: data.pagination?.total || 0,
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
    return propertData;
  };
  useEffect(() => {
    fetchPropertyTypeData().then((data) => {
      setApartmentType(data);
    });
  }, []);
  return loading ? (
    <div className="row">
      <div className="spinner-border mx-auto m-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
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
    >
      {apartmentType.map((type) => (
        <SwiperSlide key={type.id}>
          <div className="item">
            <Link to="#">
              <div className="iconbox-style4">
                <span className={`icon ${type.icon}`} />
                <div className="iconbox-content">
                  <h6 className="title">{type.title}</h6>
                  <p className="text mb-0">{`${type.count} Properties`}</p>
                </div>
              </div>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ApartmentType;
