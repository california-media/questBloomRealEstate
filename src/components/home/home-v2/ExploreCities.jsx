import api from "@/api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const preset_cities = [
  { name: "Abu Dhabi", src: "/images/listings/abudhabi.jpg" },
  { name: "Ajman", src: "/images/listings/ajman.png" },
  { name: "Al Ain", src: "/images/listings/alain.jfif" },
  { name: "Al Dhaid", src: "/images/listings/aldhaid.jfif" },
  { name: "Al Fujairah", src: "/images/listings/alfujairah.jpg" },
  {
    name: "Al Jazirah Al Hamra",
    src: "/images/listings/aljazeeraalhamrah.jpg",
  },
  { name: "Al Madam", src: "/images/listings/almadam.jpg" },
  { name: "Al Mirfa", src: "/images/listings/almirfa.jfif" },
  { name: "Al Sila", src: "/images/listings/alsila.jpg" },
  { name: "Ar Ruways", src: "/images/listings/arruways.webp" },
  { name: "Ar-Rams", src: "/images/listings/arrams.jpg" },
  { name: "Dubai", src: "/images/listings/dubai.jpg" },
  { name: "Dibba Al-Fujairah", src: "/images/listings/dibbaalfujeirah.jpg" },
  { name: "Dibba Al-Hisn", src: "/images/listings/dibbaalhisan.jpg" },
  { name: "Ghayathi", src: "/images/listings/ghayathi.jpg" },
  { name: "Hatta", src: "/images/listings/Hatta.jfif" },
  { name: "Jebel Ali", src: "/images/listings/jebelali.jfif" },
  { name: "Kalba", src: "/images/listings/kalba.jpg" },
  { name: "Khor Fakkan", src: "/images/listings/khor fakkan.jpg" },
  { name: "Liwa Oasis", src: "/images/listings/liwaoasis.jpg" },
  { name: "Madinat Zayed", src: "/images/listings/madinatzaid.jpg" },
  { name: "Masafi", src: "/images/listings/masafi.jpg" },
  { name: "Masfut", src: "/images/listings/masfat UAE.jpg" },
  { name: "Ras Al Khaimah", src: "/images/listings/rasalkhaimah.jpg" },
  { name: "Sharjah", src: "/images/listings/sharjah.avif" },
  { name: "Umm Al Quwain", src: "/images/listings/ummulquwain.webp" },
];

const ExploreCities = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        // Step 1: Fetch regions
        const regionRes = await api.get("/regions");
        const matchedCities = regionRes.data.filter((region) =>
          preset_cities.some((city) => city.name === region.name)
        );

        // Step 2: For each city, fetch area count instead of property count
        const cityData = await Promise.all(
          matchedCities.map(async (city) => {
            const areaRes = await api.get("/areas", {
              params: { search: city.name },
            });

            return {
              name: city.name,
              image: preset_cities.find((c) => c.name === city.name)?.src || "",
              number: Array.isArray(areaRes.data) ? areaRes.data.length : 0,
            };
          })
        );

        setCities(cityData);
      } catch (error) {
        console.error("Failed to fetch city listings", error);
      }
    };

    fetchCities();
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".cities_next__active",
          prevEl: ".cities_prev__active",
        }}
        pagination={{
          el: ".cities_pagination__active",
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {cities.map((city, index) => (
          <SwiperSlide key={index}>
            <div className="item">
              <Link to={`/header-map-style/${city.name}`}>
                <div className="feature-style2 mb30">
                  <div className="feature-img " style={{ height: "180px" }}>
                    <img
                      className="w-100 h-100 cover"
                      src={city.image}
                      alt="city listings"
                    />
                  </div>
                  <div className="feature-content pt20">
                    <h6 className="title mb-1">{city.name}</h6>
                    <p className="text fz15">{city.number} Areas</p>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ExploreCities;
