import { Link } from "react-router-dom";
import React from "react";

const Cta = () => {
  return (
    <section className="our-cta2 p0 px20">
      <div className="cta-banner2 bgc-thm maxw1600 mx-auto pt100 pt50-md pb85 pb50-md px30-md bdrs12 position-relative overflow-hidden">
        {/* <div className="img-box-5 border">
          <img
            className="img-1 spin-right"
            src="/images/about/element-1.png"
            alt="element"
          />
        </div>
        <div className="img-box-6 bg-danger">
          <img
            className="img-1 spin-left"
            src="/images/about/element-2.png"
            alt="element"
          />
        </div> */}
        <div
          className="cta-style2  d-none d-lg-block "
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <img
            style={{ width: "35%", borderRadius: "30px" }}
            src="/images/cta-image.jpg"
            alt="element"
          />
        </div>
        <div className="container">
          <div className="row">
            <div
              className="col-lg-7 col-xl-5"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="cta-style2">
                <h2 className="cta-title">Buying a Property With Questbloom</h2>
                <p className="cta-text">Browse through more properties.</p>
                <Link to="/off-plan" className="ud-btn btn-dark mt10">
                  Let's Get Started
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
