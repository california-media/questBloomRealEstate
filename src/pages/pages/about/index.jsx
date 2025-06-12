import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Partner from "@/components/common/Partner";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Agents from "@/components/pages/about/Agents";
import Features from "@/components/pages/about/Features";
import FunFact from "@/components/pages/about/FunFact";

import { Link } from "react-router-dom";

import MetaData from "@/components/common/MetaData";
import WealthManagementTabs from "@/components/pages/about/WealthManagementTabs";

const metaInformation = {
  title: "About  || Homez - Real Estate ReactJS Template",
};

const About = () => {
  return (
    <>
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}
      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}
      {/* Breadcrumb Sections */}
      <section className="breadcumb-section2  p-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1 ml80 mt60">
                <h2
                  className="title text-white"
                  style={{
                    textShadow: "0px 0px 7px rgba(0, 0, 0, 0.7)",
                  }}
                >
                  About Us
                </h2>
                <div className="breadcumb-list">
                  <a
                    style={{
                      textShadow: "0px 0px 7px rgba(0, 0, 0, 0.7)",
                    }}
                    className="text-white"
                    href="#"
                  >
                    Home
                  </a>
                  <a
                    style={{
                      textShadow: "0px 0px 7px rgba(0, 0, 0, 0.7)",
                    }}
                    className="text-white"
                    href="#"
                  >
                    About
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Sections */}
      {/* Our About Area */}
      {/* <section style={{ marginTop: "-50px" }} className="our-about pb10 ">
        <div className="container">
          <div
            className="row mx-6 gy-5 gx-5"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="col-lg-12 ">
              <div style={{ width: "50%", margin: "auto" }}>
                <h2 className="text-center">Who We Are</h2>
                <p className="text-center">
                  Step into a world of luxury living redefined by Questbloom
                  Real Estate in the vibrant city of Dubai. Our passion for
                  exquisite properties and dedication to unparalleled service
                  sets us apart in the realm of real estate. From the glitz of
                  Dubai Marina’s waterfront to the prestige of Downtown Dubai’s
                  skyline, our portfolio showcases the epitome of
                  sophistication. At Questbloom Real Estate, we’re more than
                  just agents – we’re your partners in finding the perfect home
                  tailored to your lifestyle. With a keen eye for detail and a
                  commitment to excellence, we navigate the Dubai real estate
                  landscape to bring you exclusive opportunities that resonate
                  with your aspirations. Discover a new standard of luxury
                  living with Questbloom Real Estate, where every home tells a
                  story of opulence and elegance. Let us guide you on your
                  journey to finding the home of your dreams in the dynamic city
                  of Dubai.
                </p>
              </div>
            </div>
            <div className="col-lg-12 ">
              <section className="our-about pb40 pt-0">
                <div className="container">
                  <div className="row" data-aos="fade-up" data-aos-delay="300">
                    <div className="col-lg-12">
                      <div className="about-page-img d-flex justify-content-center">
                        <img
                          style={{ margin: "auto" }}
                          className="w-60  h-100 cover "
                          src="/images/background/team.webp"
                          alt="about banner"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="col-lg-6">
              <h2 className="text-center">Our Mission</h2>
              <p className="text-center">
                At Questbloom Real Estate, our mission is to guide you on your
                journey to finding the perfect home in Dubai. We prioritize
                unparalleled service, expertise, and personalized attention for
                every client. Our goal is to redefine the real estate experience
                by putting your needs first and foremost. With a commitment to
                excellence, we strive to be your trusted partner in navigating
                the dynamic Dubai real estate market. Whether you're in search
                of a luxurious waterfront villa, a chic urban apartment, or a
                serene beachfront retreat, we're here to make your dreams come
                true. Experience the difference with Questbloom Real Estate –
                where our mission is to guide you every step of the way towards
                your dream home in Dubai.
              </p>
            </div>
            <div className="col-lg-6">
              <h2 className="text-center">Our Vision</h2>
              <p className="text-center">
                At Questbloom Real Estate, our vision is to redefine the
                standard of excellence in Dubai's real estate market. We aim to
                be the premier choice for clients seeking unparalleled service,
                expertise, and personalized attention. Our vision encompasses
                creating lasting relationships built on trust, transparency, and
                integrity. We strive to exceed expectations by consistently
                delivering exceptional results and guiding clients towards their
                dream homes. With a forward-thinking approach and a commitment
                to innovation, we envision a future where every client's real
                estate journey is seamless, rewarding, and unforgettable.
                Experience our vision come to life at Questbloom Real Estate –
                where your dreams become reality.
              </p>
            </div>
          </div>
        </div>
      </section> */}
      {/* End Our About Area */}
      {/* About Banner */}
      <WealthManagementTabs />

      <section className="our-about pb40 ">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-12">
              <div className="about-page-img d-flex justify-content-center">
                <img
                  style={{ margin: "auto" }}
                  className="w-60  h-100 cover "
                  src="/images/background/team.webp"
                  alt="about banner"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End About Banner */}
      {/* Funfact */}
      {/* <section className="pt-0">
        <div className="container">
          <div
            className="row justify-content-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <FunFact />
          </div>
        </div>
      </section> */}
      {/* End Funfact */}
      {/* Exclusive Agents */}

      <section className="pb90">
        <div className="container">
          <div className="row  justify-content-center">
            <div className="col-auto">
              <div
                className="main-title"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h2 className="title">Our Exclusive Agents</h2>
                <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p>
              </div>
            </div>
            {/* End header */}
          </div>
          {/* End .row */}

          <div className="row">
            <div
              className="col-lg-12  "
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="property-city-slider ">
                {/* Add this wrapper to center content */}
                <Agents />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Exclusive Agents */}
      {/* Abut intro */}
      <section className="pt30 pb30">
        <div className="cta-banner3 bgc-thm-light mx-auto maxw1600 pt100 pt60-lg pb90 pb60-lg bdrs24 position-relative overflow-hidden mx20-lg">
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 col-lg-5 pl30-md pl15-xs"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <div className="mb30">
                  <h2 className="title text-capitalize">
                    Let’s redefine your real estate experience in Dubai
                  </h2>
                </div>
                <div className="why-chose-list style2">
                  <Features />
                </div>
                <Link to="/off-plan" className="ud-btn btn-dark">
                  Learn More
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Abut intro */}
      {/* Our Partners */}
      {/* <section className="our-partners">
        <div className="container">
          <div className="row">
            <div className="col-lg-12" data-aos="fade-up">
              <div className="main-title text-center">
                <h6>Trusted by the world’s best</h6>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <div
                className="dots_none nav_none"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <Partner />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* End Our Partners */}
      {/* Our CTA */}
      <CallToActions />
      {/* Our CTA */}
      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default About;
