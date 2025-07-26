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
              <Link
                to={`#`}
                dangerouslySetInnerHTML={{
                  __html:
                    sections.find(
                      (section) =>
                        section.section_name ===
                        `About Us Page Agent ${index + 1}`
                    )?.html_content ||
                    `
<div class="team-style1 rounded">
  <div class="team-img">
    <div
      style="
        overflow: hidden;
        position: relative;
        aspect-ratio: 1 / 1.15;
      "
      class="bdrs12 w-100 h-100"
    >
      <img
        src="${agent.image}"
        class="cover"
        alt="agents"
        style="
          width: 110%;
          object-fit: cover;
          transform: translateX(-3%);
        "
      />
    </div>
  </div>
  <div class="team-content p20">
    <h6 class="title mb-1 mt-2">
      <a href="#">${agent.name}</a>
    </h6>
    <p
      style="
        margin: 0;
        margin-top: 8px;
        margin-bottom: 8px;
      "
      class="text fz15 fw-light"
    >
      <span class="fw-normal">${agent.category}</span>
    </p>
    <p style="margin: 0" class="text fz15 mt0 fw-light">
      Properties:
      <span class="fw-semibold">${agent.properties}</span>
    </p>
    <p style="margin: 0" class="text fz15 fw-light">
      Language:
      <span class="fw-semibold">${agent.language}</span>
    </p>
    <div class="divider"></div>
    <div class="social-links">
      <a href="${agent.facebook}" class="social-link facebook" onclick="event.stopPropagation();">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="${agent.instagram}" class="social-link instagram" onclick="event.stopPropagation();">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="${agent.linkedin}" class="social-link linkedin" onclick="event.stopPropagation();">
        <i class="fab fa-linkedin-in"></i>
      </a>
    </div>
  </div>
</div>
`,
                }}
              >
                {/* <div className="team-style1  rounded ">
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
                    <div className="divider"></div>
                    <div className="social-links">
                      <a
                        href={agent.facebook}
                        className="social-link facebook"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a
                        href={agent.instagram}
                        className="social-link instagram"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a
                        href={agent.linkedin}
                        className="social-link linkedin"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                </div> */}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Agents;
