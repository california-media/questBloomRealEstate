import React from "react";
import agents from "@/data/agents";

const AllAgents = ({ pageSections }) => {
  return (
    <>
      {agents.slice(0, 5).map((agent, index) => (
        <div
          className="col"
          key={agent.id}
          dangerouslySetInnerHTML={{
            __html:
              pageSections.find(
                (section) => section.section_name === `Agent ${index + 1}`
              )?.html_content ||
              `
  <div class="feature-style2 mb30">
    <div class="feature-img">
      <a href="#">
        <div
          class="bdrs12 w-100 h-100"
          style="
            aspect-ratio: 1 / 1;
            overflow: hidden;
            position: relative;
          "
        >
          <img
            src="${agent.image}"
            class="cover"
            alt="agents"
            style="
              width: 110%;
              height: 100%;
              object-fit: cover;
              transform: translateX(-3%);
            "
          />
        </div>
      </a>
    </div>
    <div class="feature-content pt20">
      <h6 class="title mb-1 mt-2">
        <a href="#">${agent.name}</a>
      </h6>
      <p
        class="text fz15 fw-light"
        style="margin: 0; margin-top: 8px; margin-bottom: 8px;"
      >
        <span class="fw-normal">${agent.category}</span>
      </p>
      <p class="text fz15 mt0 fw-light" style="margin: 0;">
        Properties: <span class="fw-semibold">${agent.properties}</span>
      </p>
      <p class="text fz15 fw-light" style="margin: 0;">
        Language: <span class="fw-semibold">${agent.language}</span>
      </p>
    </div>
  </div>
`,
          }}
        ></div>
      ))}
    </>
  );
};

export default AllAgents;
