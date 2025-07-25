import agents from "@/data/agents";

import { Link } from "react-router-dom";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const Agents = ({ sections }) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".agent_next__active",
          prevEl: ".agent_prev__active",
        }}
        className="overflow-visible"
        pagination={{
          el: ".agent_pagination__active",
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
        autoplay={{ delay: 50000 }} // Set the desired delay for autoplay
      >
        {agents.slice(0, 7).map((agent, index) => (
          <SwiperSlide key={index}>
            <div className="item  h-100 " key={index}>
              <Link to={`#`}>
                <div className="team-style1  rounded ">
                  <div className="team-img">
                    <div
                      style={{
                        overflow: "hidden",
                        position: "relative",
                        aspectRatio: "1 / 1.15",
                      }}
                      
                      className="bdrs12 w-100 h-100 "
                    >
                      <img
                        src={agent.image}
                        className="cover"
                        alt="agents"
                        style={{
                          width: "110%",
                  

                          objectFit: "cover",
                          transform: "translateX(-3%)",
                        }}
                      />
                    </div>
                  </div>
                  <div className="team-content p20 ">
                    <h6 className="title mb-1 mt-2 ">
                      <Link  to={`#`}>{agent.name}</Link>
                    </h6>
                    <p
                      style={{
                        margin: "0",
                        marginTop: "8px",
                        marginBottom: "8px",
                      }}
                      className="text fz15  fw-light"
                    >
                      <span className="fw-normal">{agent.category}</span>
                    </p>
                    <p
                      style={{ margin: "0" }}
                      className="text fz15 mt0 fw-light"
                    >
                      Properties:{" "}
                      <span className="fw-semibold">{agent.properties}</span>
                    </p>
                    <p style={{ margin: "0" }} className="text fz15 fw-light">
                      Language:{" "}
                      <span className="fw-semibold">{agent.language}</span>
                    </p>
                    <div className="divider"></div>
                    <div className="social-links">
                      <a href="#" className="social-link facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="social-link instagram">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#" className="social-link linkedin">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
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

export default Agents;
