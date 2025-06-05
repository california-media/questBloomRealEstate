import React from "react";

const SingleAgentInfo = ({ developer_data }) => {
  return (
    <div className="agent-single d-sm-flex align-items-start bdrb1 mb30 pb25">
      <div className="single-img mb30-sm">
        <img
          className="w90"
          src={developer_data?.logo_image[0]?.url}
          alt="agent"
        />
      </div>
      <div className="single-contant ml30 ml0-xs">
        <h6 className="title mb-1">
          {developer_data?.name == "Object 1"
            ? "Developer"
            : developer_data?.name}
        </h6>
        <div
          style={{ gap: "7px" }}
          className="agent-meta mb10 d-md-flex flex-column align-items-start mt-2"
        >
          {/* {developer_data?.phoneNumbers?.map((phoneNumber, index) => (
            <a key={index} className="text fz15 pe-2 bdrr1" href="#">
              <i className="flaticon-call pe-1 ps-1" />
              {phoneNumber}
            </a>
          ))} */}
          <a
            className="contact-item text fz15 ps-2 d-flex align-items-start "
            href={`mailto:${developer_data?.email}`}
          >
            <i className="flaticon-email pe-1  m-1" />
            {developer_data?.email}
          </a>

          <div className="contact-item text fz15 ps-2">
            <i className="flaticon-location pe-1  m-1" />
            {developer_data?.office_address}
          </div>

          <a
            className="contact-item text fz15 ps-2   mt-1"
            href={developer_data?.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="days fw-semibold">Website: </span>
            {developer_data?.website?.replace(/\/$/, "")}
          </a>

          {developer_data?.working_hours?.length > 0 && (
            <div className="working-hours-section mt-3">
              <h6 className="working-hours-title mb-2">
                <i className="flaticon-clock pe-1 m-1" />
                Working Hours
              </h6>
              <div className="working-hours-list">
                {developer_data.working_hours.map((item, index) => (
                  <div
                    key={index}
                    className="working-hours-item text fz14 ps-3 mb-1"
                  >
                    <span className="days fw-medium">{item.days}:</span>
                    <span className="time ms-2">{item.time_range}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="agent-social">
          {developer_data?.socialMedia?.map((social, index) => (
            <a key={index} className="mr20" href="#">
              <i className={`fab fa-${social}`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleAgentInfo;
