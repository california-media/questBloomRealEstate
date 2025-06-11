import agents from "@/data/agents";

import { Link } from "react-router-dom";
import React from "react";

const AllAgents = ({ data }) => {
  return (
    <>
      {data.map((agent) => (
        <div className="col" key={agent.id}>
          <div className="feature-style2 mb30">
            <div className="feature-img">
              <Link to={`/agent-single/${agent.id}`}>
                <img
                  style={{ aspectRatio: "1/1" }}
                  className="bdrs12 w-100 h-100 cover"
                  src={agent.image}
                  alt="agents"
                />
              </Link>
            </div>
            <div className="feature-content pt20">
              <h6 className="title mb-1 mt-2">
                <Link to={`#`}>{agent.name}</Link>
              </h6>
              <p
                style={{ margin: "0", marginTop: "8px", marginBottom: "8px" }}
                className="text fz15  fw-light"
              >
                <span className="fw-normal">{agent.category}</span>
              </p>
              <p style={{ margin: "0" }} className="text fz15 mt0 fw-light">
                Properties:{" "}
                <span className="fw-semibold">{agent.properties}</span>
              </p>
              <p style={{ margin: "0" }} className="text fz15 fw-light">
                Language: <span className="fw-semibold">{agent.language}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllAgents;
