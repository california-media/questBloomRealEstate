import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
const isDev = import.meta.env.DEV;
const GalleryBox = ({
  imageUrls = ["/images/listings/listing-single-slide4.jpg"],
  loading = true,
}) => {
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
        loop={true}
        speed={1000}
      >
        {imageUrls.map((imageUrl, index) => (
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
                <div class="spinner-border mx-auto m-5" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <img
                  className=" w-100 h-100 cover"
                  src={
                    isDev ////in development normally fetch the URL, but in production use the serverless proxy
                      ? imageUrl.url
                      : `/api/image-proxy/${fullUrl.split("/vault/")[1]}`
                  }
                  alt={`Image ${index + 1}`}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
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
