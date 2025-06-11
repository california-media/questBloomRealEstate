import agents from "@/data/agents";

import { Link } from "react-router-dom";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const Agents = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".agent_next__active",
          prevEl: ".agent_prev__active",
        }}
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
            slidesPerView:3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        autoplay={{ delay: 3000 }} // Set the desired delay for autoplay
      >
        {agents.slice(0, 7).map((agent, index) => (
          <SwiperSlide key={index}>
            <div className="item " key={index}>
              <Link to={`/agent-single/${agent.id}`}>
                <div className="team-style1">
                  <div className="team-img">
                    <img
                    style={{ aspectRatio: "1/1" }}
                      className="w-100 h-100 cover"
                      src={agent.image}
                      alt="agent team"
                    />
                  </div>
                  <div className="team-content pt20">
                    <h6 className="title mb-1 mt-2">
                      <Link to={`#`}>{agent.name}</Link>
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
