import { adminBaseUrl } from "@/api/adminApi";

const Agents = ({ agents }) => {
  if (!agents || agents.length === 0) {
    return (
      <div className="text-center p-4">
        <i className="fas fa-users text-muted" style={{ fontSize: "3rem" }}></i>
        <h6 className="text-muted mt-2">No agents available</h6>
        <p className="text-muted">Check back later for available agents</p>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {agents.map((agent) => (
          <div key={agent.id} className="col-12 col-sm-6 col-lg-3 mb-4">
            <div className="item h-100">
              <a href="#" onClick={(e) => e.preventDefault()}>
                <div className="team-style1 rounded-4">
                  <div className="team-img">
                    <div
                      style={{
                        overflow: "hidden",
                        position: "relative",
                        aspectRatio: "1 / 1.15",
                      }}
                      className="w-100 h-100"
                    >
                      <img
                        src={adminBaseUrl + agent.image}
                        className="cover"
                        alt={agent.name}
                        style={{
                          width: "110%",
                          objectFit: "cover",
                          transform: "translateX(-3%)",
                        }}
                        onError={(e) => {
                          e.target.src = "/placeholder-agent.jpg";
                        }}
                      />
                    </div>
                  </div>

                  <div className="team-content p20 pb10">
                    <h6 className="title mb-1 mt-2">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        {agent.name}
                      </a>
                    </h6>

                    <p
                      style={{
                        margin: 0,
                        marginTop: "8px",
                        marginBottom: "8px",
                      }}
                      className="text fz15 fw-light"
                    >
                      <span className="fw-normal">{agent.category}</span>
                    </p>

                    <p style={{ margin: 0 }} className="text fz15 mt0 fw-light">
                      Properties:{" "}
                      <span className="fw-semibold">{agent.properties}</span>
                    </p>

                    <p style={{ margin: 0 }} className="text fz15 fw-light">
                      Language:{" "}
                      <span className="fw-semibold">{agent.language}</span>
                    </p>

                    <div className="divider"></div>

                    <div className="social-links">
                      {agent.facebook && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={agent.facebook}
                          className="social-link facebook"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      )}

                      {agent.instagram && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={agent.instagram}
                          className="social-link instagram"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="fab fa-instagram"></i>
                        </a>
                      )}

                      {agent.linkedin && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={agent.linkedin}
                          className="social-link linkedin"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      )}
                      {agent.youtube && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={agent.youtube}
                          className="social-link linkedin"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="fab fa-youtube"></i>
                        </a>
                      )}
                      {agent.tiktok && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={agent.tiktok}
                          className="social-link linkedin"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="fab fa-tiktok"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Agents;
