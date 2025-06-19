import React, { useEffect, useState } from "react";
import Hero from "@/components/home/home-v3/hero";
import { useLocation } from "react-router-dom";

const AutoCarouselHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/background/carousel1.jpg",
    "/images/background/carousel2.jpg",
    "/images/background/carousel3.jpg",
    "/images/background/carousel4.jpg",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="home-banner-style3 p0">
      <div className="home-style3">
        {/* Carousel Background */}
        <div className="carousel-container">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentIndex ? "active" : ""
              }`}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
        </div>

        {/* Content - Maintained exactly as original */}
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <Hero />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .home-banner-style3 {
          position: relative;
          margin-bottom: -50px;
          z-index:2;
        }
        .home-banner-style3 .home-style3 {
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 760px;
          position: relative;
        }
        @media (max-width: 991.98px) {
          .home-banner-style3 .home-style3 {
            height: 1250px;
          }
        }

        .carousel-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
          z-index: 0;
        }

        .carousel-slide.active {
          opacity: 1;
          z-index: 1;
        }

        /* Ensure Hero content is always on top */
        .container {
          position: relative;
          z-index: 10;
        }
      `}</style>
    </section>
  );
};

export default AutoCarouselHero;
