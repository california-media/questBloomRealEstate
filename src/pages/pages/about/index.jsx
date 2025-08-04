import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Partner from "@/components/common/Partner";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Agents from "@/components/pages/about/Agents";

import MetaData from "@/components/common/MetaData";
import WealthManagementTabs from "@/components/pages/about/WealthManagementTabs";
import adminApi from "@/api/adminApi";
import { useEffect, useState } from "react";
import "/public/css/about-us-sections.css";

const metaInformation = {
  title: "About | Quest Bloom Real Estate LLC",
};

const About = () => {
  const [sections, setSections] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  // Fetch menu items from API (same logic as MainMenu)
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await adminApi.get("/appearance/menus", {
          params: {
            type: "header",
          },
        });

        setMenuItems(response.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu items");
        // Fallback to default menu structure if API fails
        setMenuItems([
          { id: 1, name: "Home", page: "Home" },
          { id: 2, name: "Off-Plan", page: "Off-Plan" },
          { id: 3, name: "Buy", page: "Buy" },
          { id: 4, name: "Listings", page: "Listings" },
          { id: 5, name: "Rent", page: "Rent" },
          { id: 6, name: "Agents", page: "Agents" },
          { id: 7, name: "Who We Are", page: "Who we are" },
          { id: 8, name: "Contact Us", page: "Contact Us" },
        ]);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await adminApi.get("/pages/who-we-are/sections");
        setSections(response.data.data.sections || []);
      } catch (err) {
        console.error("Failed to fetch sections:", err);
      }
    };

    fetchSections();
  }, []);

  return (
    <>
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader menuItems={menuItems} error={error} />
      {/* End Main Header Nav */}
      {/* Mobile Nav  */}
      <MobileMenu menuItems={menuItems} error={error} />
      {/* End Mobile Nav  */}
      {/* Breadcrumb Sections */}
      <section
        className=" p-0"
        dangerouslySetInnerHTML={{
          __html:
            sections.find((section) => section.section_name === "Cover")
              ?.html_content ||
            `<div
  class="hover-scale-rotate"
  style="
    display: flex;
    align-items: center;
    height: 450px;
    position: relative;
  "
>
  <div
    style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1;
    "
  ></div>

  <div
    class="about-us-cover-image"
    style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(/images/background/aboutus-cover.jfif);
      background-size: cover;
      background-position: center;
      z-index: 0;
      transition: transform 0.3s ease;
      transform: scale(1) rotate(0deg);
    "
  ></div>

  <div
    class="container"
    style="
      position: relative;
      z-index: 2;
    "
  >
    <div class="row">
      <div class="col-lg-12">
        <div class="breadcumb-style1 mt60">
          <div class="breadcumb-style1 mt60">
            <h2 class="title text-white">About Us</h2>
            <div class="breadcumb-list">
              <a class="text-white" href="/">Home</a>
              <a class="text-white" href="#">About</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`,
        }}
      ></section>
      {/* End Breadcrumb Sections */}
      {/* Our About Area */}

      <section
        className="contact-info-section  mt-md-100 "
        dangerouslySetInnerHTML={{
          __html:
            sections.find(
              (section) => section.section_name === "About Us Main Section"
            )?.html_content ||
            `<div class="container " style="height: 500px;">
  
</div>
`,
        }}
      ></section>

      <section
        className=" pt0 pb0"
        dangerouslySetInnerHTML={{
          __html:
            sections.find((section) => section.section_name === "Meet the Team")
              ?.html_content ||
            `<div
  class="hero-parallax "
  style="background-image: url('/images/background/team.webp');"
>
  <div class="parallax-dark-overlay" id="parallaxBg"></div>
  <div class="about-us-hero-content">
    <div class="container">
      <div class="row align-items-center min-vh-90">
        <div
          class="col-lg-7 hero-text-container"
          data-aos="fade-bottom"
          data-aos-delay="300"
        >
          <h1 class="about-us-hero-title">Meet the Team</h1>
          <p class="about-us-hero-subtitle">
            Discover the passionate professionals behind our success
            story. Experience excellence in every interaction with our
            dedicated real estate experts.
          </p>
          <a href="/contact">
            <button class="btn-contact-us">
              Contact Us
              <i class="fas fa-arrow-right ms-2"></i>
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
`,
        }}
      ></section>

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
          <div
            className="row  justify-content-center mb30"
            dangerouslySetInnerHTML={{
              __html:
                sections.find(
                  (section) => section.section_name === "Agents Header"
                )?.html_content ||
                `<div class="col-auto">
  <div class="main-title " data-aos="fade-up" data-aos-delay="100">
    <h2 class="title text-center">Our Exclusive Agents</h2>
    <p class="paragraph text-center">
     Meet our dedicated team of professional agents committed to finding your perfect property with expertise and care.
    </p>
  </div>
</div>`,
            }}
          ></div>
          {/* End .row */}

          <div className="row">
            <div
              className="col-lg-10 mx-auto  "
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="property-city-slider ">
                {/* Add this wrapper to center content */}
                <Agents sections={sections} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Exclusive Agents */}
      {/* Abut intro */}
      <section
        className="pt30 pb30"
        dangerouslySetInnerHTML={{
          __html:
            sections.find((section) => section.section_name === "Learn More")
              ?.html_content ||
            `<div class="bgc-thm-light mx-auto maxw1600 pt100 pt60-lg pb90 pb60-lg bdrs24 position-relative overflow-hidden mx20-lg">
  <div class="container">
    <div class="row">
      <div
        class="col-md-6 col-lg-5 pl30-md pl15-xs"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <div>
          <div class="mb30">
            <h2 class="title text-capitalize">
              Let’s redefine your real estate experience in Dubai
            </h2>
          </div>
          <div class="why-chose-list style2">
            <div class="list-one d-flex align-items-start mb30">
              <span class="list-icon flex-shrink-0 flaticon-security"></span>
              <div class="list-content flex-grow-1 ml20">
                <h6 class="mb-1">Personalized Property Guidance</h6>
                <p class="text mb-0 fz15">
                  Tailored support to help you find a home that fits
                  your lifestyle and aspirations
                </p>
              </div>
            </div>
            <div class="list-one d-flex align-items-start mb30">
              <span class="list-icon flex-shrink-0 flaticon-keywording"></span>
              <div class="list-content flex-grow-1 ml20">
                <h6 class="mb-1">Unmatched Market Expertise</h6>
                <p class="text mb-0 fz15">
                  In-depth knowledge of Dubai's real estate ensures
                  smarter decisions and better opportunities
                </p>
              </div>
            </div>
            <div class="list-one d-flex align-items-start mb30">
              <span class="list-icon flex-shrink-0 flaticon-investment"></span>
              <div class="list-content flex-grow-1 ml20">
                <h6 class="mb-1">
                  Trust, Integrity &amp; Excellence
                </h6>
                <p class="text mb-0 fz15">
                  A service built on honesty, quality, and long-term
                  relationships.
                </p>
              </div>
            </div>
          </div>
        </div>

        <a href="/off-plan" class="ud-btn btn-dark">
          Learn More
          <i class="fal fa-arrow-right-long"></i>
        </a>
      </div>
    </div>
  </div>
  <div
    class="d-none d-md-block"
    style="
      height: 100%;
      width: 42%;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      overflow: hidden;
    "
  >
    <div
      class="d-none d-md-block about-cta-image "
      style="
        background-image: url('/images/background/about-dubai.jpg');
        background-size: cover;
        background-position: right;
        height: 100%;
        width: 100%;
        right: 0;
        top: 0;
        bottom: 0;
      "
    ></div>
  </div>
</div>
`,
        }}
      ></section>
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
      <section
        className="our-cta pt0"
        dangerouslySetInnerHTML={{
          __html:
            sections.find(
              (section) => section.section_name === "Call to Action"
            )?.html_content ||
            `<div class="cta-banner bgc-f7 mx-auto maxw1600 pt120 pt60-md pb120 pb60-md bdrs12 position-relative mx20-lg">
  <div class="img-box-5">
    <img
      class="img-1 spin-right"
      src="/images/about/element-1.png"
      alt="spinner"
    />
  </div>
  <div class="img-box-6">
    <img
      class="img-1 spin-left"
      src="/images/about/element-1.png"
      alt="spinner"
    />
  </div>

  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-7 col-xl-6" data-aos="fade-right">
        <div class="cta-style1">
          <h2 class="cta-title">PROMPT CONSULTATION</h2>
          <p class="cta-text mb-0">
            Fill in the form and our agent will contact you shortly.
          </p>
        </div>
      </div>

      <div class="col-lg-5 col-xl-6" data-aos="fade-left">
        <div class="cta-btns-style1 d-block d-sm-flex align-items-center justify-content-lg-end">
          <a
            href="/contact"
            class="ud-btn btn-transparent mr30 mr0-xs"
          >
            Enquire now
            <i class="fal fa-arrow-right-long"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

`,
        }}
      ></section>

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
