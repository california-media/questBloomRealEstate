import React, { useState } from "react";

const SingleAgentInfo = ({ developer_data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const description = developer_data?.description || "";
  const previewText = description.slice(0, 100);

  return (
    <div className="agent-single bdrb1 mb30 pb25">
      {/* Header Section with Logo and Title */}
      <div className="d-sm-flex align-items-start mb20">
        <div className="single-img mb30-sm">
          <img
            className="w90"
            src={developer_data?.logo_image?.[0]?.url}
            alt="developer logo"
          />
        </div>
        <div className="single-contant ml30 ml0-xs">
          <h6 className="title mb-2">
            {developer_data?.name === "Object 1"
              ? "Developer"
              : developer_data?.name}
          </h6>

          {/* Description Section */}
          {description && (
            <div className="developer-description mb20">
              <p className="text fz14 mb-0 text-muted line-height-1_5">
                {isExpanded ? description : `${previewText}...`}
              </p>
              {description.length > 100 && (
                <button
                  className="btn btn-link p-0 mt-1 text-primary text-decoration-underline"
                  onClick={() => setIsExpanded((prev) => !prev)}
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="contact-section mb20">
        <h6 className="section-title mb15 fz16 fw-medium">
          Contact Information
        </h6>
        <div className="contact-details" style={{ gap: "10px" }}>
          {developer_data?.email && (
            <a
              className="contact-item text fz15 d-flex align-items-start mb10"
              href={`mailto:${developer_data.email}`}
            >
              <i className="flaticon-email pe-2 mt-1 text-primary" />
              <span>{developer_data.email}</span>
            </a>
          )}
          {developer_data?.office_address && (
            <div className="contact-item text fz15 d-flex align-items-start mb10">
              <i className="flaticon-location pe-2 mt-1 text-primary" />
              <span>{developer_data.office_address}</span>
            </div>
          )}
          {developer_data?.website && (
            <a
              className="contact-item text fz15 d-flex align-items-start mb10"
              href={developer_data.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-globe-americas pe-2 mt-1 text-primary" />
              <span>{developer_data.website.replace(/\/$/, "")}</span>
            </a>
          )}
        </div>
      </div>

      {/* Working Hours Section */}
      {developer_data?.working_hours?.length > 0 && (
        <div className="working-hours-section mb20">
          <h6 className="section-title mb15 fz16 fw-medium">
            <i className="flaticon-clock pe-2 text-primary" />
            Working Hours
          </h6>
          <div className="working-hours-list">
            {developer_data.working_hours.map((item, index) => (
              <div
                key={index}
                className="working-hours-item d-flex justify-content-between text fz14 mb8 ps-3"
              >
                <span className="days fw-medium text-dark">{item.days}</span>
                <span className="time text-muted">{item.time_range}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Media Section */}
      {developer_data?.socialMedia?.length > 0 && (
        <div className="social-media-section">
          <h6 className="section-title mb15 fz16 fw-medium">Follow Us</h6>
          <div className="agent-social">
            {developer_data.socialMedia.map((social, index) => (
              <a key={index} className="mr20 text-primary" href="#">
                <i className={`fab fa-${social} fz18`} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleAgentInfo;
