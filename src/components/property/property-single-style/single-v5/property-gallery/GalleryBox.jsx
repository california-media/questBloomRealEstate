import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { ImageOff } from "lucide-react";

const GalleryBox = ({ imageUrls = [], loading = true }) => {
  const isEmpty = imageUrls.length === 0;

  return (
    <div className="position-relative">
      <Swiper
        spaceBetween={0}
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={!isEmpty && !loading}
        speed={1000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {loading ? (
          <SwiperSlide>
            <div
              style={{
                aspectRatio: "2",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#6c757d",
              }}
              className="item"
            >
              <div
                className="spinner-border mx-auto m-5 text-light"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </SwiperSlide>
        ) : isEmpty ? (
          <SwiperSlide>
            <div
              style={{
                aspectRatio: "2",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#6c757d",
              }}
              className="item"
            >
              <div className="text-center p-4">
                <ImageOff
                  color="white"
                  size={48}
                  className="text-secondary mx-auto mb-3"
                />
                <p className="text-white">No images available</p>
              </div>
            </div>
          </SwiperSlide>
        ) : (
          imageUrls.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  aspectRatio: "2",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
                className="item"
              >
                {/* Semi-transparent dark overlay */}
                <div
                  className="d-none d-md-block"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    zIndex: 10,
                  }}
                ></div>

                <img
                  className="w-100 h-100 position-absolute top-0 start-0 object-fit-cover"
                  src={imageUrl.url}
                  alt={`Image ${index + 1}`}
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default GalleryBox;
