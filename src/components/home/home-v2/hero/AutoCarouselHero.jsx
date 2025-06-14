import React, { useEffect, useState } from "react";
import Hero from "@/components/home/home-v2/hero";
const AutoCarouselHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Replace these with your actual image paths
  const images = [
    "/images/background/carousel1.jpg",
    "/images/background/carousel2.jpg",
    "/images/background/carousel3.jpg",
    "/images/background/carousel4.jpg",

  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 10 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="home-banner-style2 p0">
      <div className="home-style2">
        <div className="container maxw1600">
          <div className="d-flex justify-content-center">
            <div className="home2-hero-banner mbdrs12">
              <div className="position-relative h-100 w-100">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`position-absolute h-100 w-100 transition-opacity ${
                      index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transition: "opacity .5s ease-in-out",
                    }}
                  >
                    <div
                      className="home2-hero-banner-image"
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        width: "80%",
                        height: "100%",
                        margin: "auto",
                        borderRadius: "50px",
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-10 mx-auto">
              <Hero />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .home2-hero-banner {
          margin: auto;
          height: 650px;
          max-width: 1600px;
          position: absolute;
          top: 190px;
          width: 140%;
          text-align: center;
        }

        .transition-opacity {
          transition: opacity 1s ease-in-out;
        }

        .opacity-100 {
          opacity: 1;
        }

        .opacity-0 {
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default AutoCarouselHero;
