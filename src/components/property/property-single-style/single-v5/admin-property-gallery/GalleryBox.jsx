import { adminBaseUrl } from "@/api/adminApi";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { ImageOff } from "lucide-react"; // Import the no-image icon from Lucide

const GalleryBox = ({
  photos = ["/images/listings/listing-single-slide4.jpg"],
  loading = true,
}) => {
  const isEmpty = photos.length === 0;

  return (
    <>
      <Swiper
        spaceBetween={0}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".single-pro-slide-next__active",
          prevEl: ".single-pro-slide-prev__active",
        }}
        slidesPerView={1}
        loop={!isEmpty} // Disable loop if empty to prevent infinite empty slides
        speed={1000}
      >
        {isEmpty ? (
          <SwiperSlide>
            <div
              style={{
                aspectRatio: "3.2",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "gray",
              }}
              className="item"
            >
              <div className="text-center p-4">
                <ImageOff color="white" size={48} className="text-gray-400 mx-auto mb-3" />
                <p className="text-white">No images available</p>
              </div>
            </div>
          </SwiperSlide>
        ) : (
          photos.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  aspectRatio: "3.2",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="item"
              >
                {loading ? (
                  <div className="spinner-border mx-auto m-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <img
                    className="w-100 h-100 cover"
                    src={adminBaseUrl + imageUrl}
                    alt={`Image ${index + 1}`}
                  />
                )}
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>

      <div className="rounded-arrow arrowY-center-position">
        <button className="single-pro-slide-prev__active swiper_button _prev">
          <i className="far fa-arrow-left-long" />
        </button>
        {/* End prev */}

        <button className="single-pro-slide-next__active swiper_button _next">
          <i className="far fa-arrow-right-long" />
        </button>
        {/* End Next */}
      </div>
      {/* End .col for navigation  */}
    </>
  );
};

export default GalleryBox;
