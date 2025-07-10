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
            slidesPerView: 4,
          },
        }}
        autoplay={{ delay: 50000 }} // Set the desired delay for autoplay
      >
        {agents.slice(0, 7).map((agent, index) => (
          <SwiperSlide key={index}>
            <div className="item " key={index}>
              <Link to={`#`}>
                <div
                  className="team-style1"
                  dangerouslySetInnerHTML={{
                    __html:
                      sections.find(
                        (section) =>
                          section.section_name === `Home Page Agent ${index + 1}`
                      )?.html_content ||
                      `
  <div class="team-img">
    <div
      style="aspect-ratio: 1 / 1; overflow: hidden; position: relative;"
      class="bdrs12 w-100 h-100"
    >
      <img
        src="${agent.image}"
        class="cover"
        alt="agents"
        style="width: 110%; height: 100%; object-fit: cover; transform: translateX(-3%);"
      />
    </div>
  </div>
  <div class="team-content pt20">
    <h6 class="title mb-1 mt-2">
      <a href="#">${agent.name}</a>
    </h6>
    <p
      style="margin: 0; margin-top: 8px; margin-bottom: 8px;"
      class="text fz15 fw-light"
    >
      <span class="fw-normal">${agent.category}</span>
    </p>
    <p style="margin: 0;" class="text fz15 mt0 fw-light">
      Properties:
      <span class="fw-semibold">${agent.properties}</span>
    </p>
    <p style="margin: 0;" class="text fz15 fw-light">
      Language:
      <span class="fw-semibold">${agent.language}</span>
    </p>
  </div>
`,
                  }}
                ></div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Agents;
