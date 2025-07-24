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

const metaInformation = {
  title: "About | QMC",
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
      <section className=" p-0">
        <div
          className="hover-scale-rotate"
          style={{
            display: "flex",
            alignItems: "center",
            height: "450px",
            position: "relative",
        
          }}
        >
          {/* Hover overlay - moved inside the image container */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 1,
            }}
          ></div>

          {/* Image container with hover effect */}
          <div
          className="about-us-cover-image"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: "url(/images/background/aboutus-cover.jfif)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
              transition: "transform 0.3s ease", // Smooth transition
              transform: "scale(1) rotate(0deg)", // Initial state
            }}
            // Added class for hover effect
          ></div>

          <div
            className="container"
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcumb-style1 mt60">
                  <div className="breadcumb-style1 mt60">
                    <h2 className="title text-white">About Us</h2>
                    <div className="breadcumb-list">
                      <a className="text-white" href="/">
                        Home
                      </a>
                      <a className="text-white" href="#">
                        About
                      </a>
                    </div>
                  </div>
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
      <WealthManagementTabs sections={sections} />

      <section className="our-about pb40 ">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-12">
              <div
                className="about-page-img d-flex justify-content-center"
                dangerouslySetInnerHTML={{
                  __html:
                    sections.find(
                      (section) => section.section_name === "Team Image"
                    )?.html_content ||
                    `<img
                      style="margin: auto;"
                      class="w-60 h-100 cover"
                      src="/images/background/team.webp"
                      alt="about banner"
                    />`,
                }}
              ></div>
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
          <div
            className="row  justify-content-center mb30"
            dangerouslySetInnerHTML={{
              __html:
                sections.find(
                  (section) => section.section_name === "Agents Header"
                )?.html_content ||
                `<div class="col-auto">
  <div class="main-title" data-aos="fade-up" data-aos-delay="100">
    <h2 class="title">Our Exclusive Agents</h2>
    <p class="paragraph text-center">
      Aliquam lacinia diam quis lacus euismod
    </p>
  </div>
</div>`,
            }}
          ></div>
          {/* End .row */}

          <div className="row">
            <div
              className="col-lg-8 mx-auto  "
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
            sections.find((section) => section.section_name === "Learn more")
              ?.html_content ||
            `<div class="bgc-thm-light mx-auto maxw1600 pt100 pt60-lg pb90 pb60-lg bdrs24 position-relative overflow-hidden mx20-lg">
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-lg-5 pl30-md pl15-xs" data-aos="fade-left" data-aos-delay="300">
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
                  Tailored support to help you find a home that fits your lifestyle and aspirations
                </p>
              </div>
            </div>
            <div class="list-one d-flex align-items-start mb30">
              <span class="list-icon flex-shrink-0 flaticon-keywording"></span>
              <div class="list-content flex-grow-1 ml20">
                <h6 class="mb-1">Unmatched Market Expertise</h6>
                <p class="text mb-0 fz15">
                  In-depth knowledge of Dubai's real estate ensures smarter decisions and better opportunities
                </p>
              </div>
            </div>
            <div class="list-one d-flex align-items-start mb30">
              <span class="list-icon flex-shrink-0 flaticon-investment"></span>
              <div class="list-content flex-grow-1 ml20">
                <h6 class="mb-1">Trust, Integrity &amp; Excellence</h6>
                <p class="text mb-0 fz15">
                  A service built on honesty, quality, and long-term relationships.
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
      background-image: url('/images/background/about-dubai.jpg');
      background-size: cover;
      background-position: right;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      width: 42%;
    "
  ></div>
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
