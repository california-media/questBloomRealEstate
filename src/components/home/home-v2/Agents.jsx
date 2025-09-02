import api from "@/api/axios";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await api.get("/developers");
        setAgents(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);
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
        autoplay={{ delay: 50000 }} // Set the desired delay for autoplay
      >
        {loading ? (
          <div className="row">
            <div className="spinner-border mx-auto m-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          agents.slice(0, 7).map((agent, index) => (
            <SwiperSlide key={index}>
              <div className="item" key={index}>
                <Link to={`#`}>
                  <div className="team-style1 mb30">
                    <div className="team-img">
                      <img
                        width={217}
                        height={248}
                        className="w-100 h-100 cover"
                        src={"/images/home/agent-placeholder.jpg"}
                        alt="agent team"
                      />
                    </div>
                    <div className="team-content pt20">
                      <h6 className="name mb-1">
                        {agent.name === "Object 1"
                          ? `Developer ${agent.id}`
                          : agent.name}
                      </h6>

                      <p className="text fz15 mb-0">
                        <i className="fas fa-globe-americas pe-2 mt-1 text-secondary" />
                        <a target="_blank" href={agent.website}>
                          {agent.website.replace(/\/$/, "")}
                        </a>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
};

export default Agents;
