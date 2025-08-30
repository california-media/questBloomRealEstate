import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Partner from "@/components/common/Partner";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Agents from "@/components/pages/about/Agents";

import MetaData from "@/components/common/MetaData";
import adminApi from "@/api/adminApi";
import { useEffect, useRef, useState } from "react";
import "/public/css/about-us-sections.css";
import { motion, useMotionValue, useTransform } from "framer-motion";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import ScrollRevealSectionMobile from "@/components/ScrollRevealSectionMobile";
import SocialLinksNavbar from "@/pages/homes/home-v2/SocialLinksNavbar";

const metaInformation = {
  title: "About | Quest Bloom Real Estate LLC",
};

const About = () => {
  const [sections, setSections] = useState([]);
  const [agents, setAgents] = useState([]);
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
    const fetchSections = async () => {
      try {
        const response = await adminApi.get("/pages/who-we-are/sections");
        setSections(response.data.data.sections || []);
      } catch (err) {
        console.error("Failed to fetch sections:", err);
      }
    };

    const fetchAgents = async () => {
      try {
        const response = await adminApi.get("/agents", {
          // You can add limit parameter if needed: params: { limit: 10 }
        });

        if (response.data.success) {
          setAgents(response.data.data);
        } else {
          console.error("Error fetching agents");
        }
      } catch (err) {
        console.error("Error fetching agents:", err);
      }
    };

    fetchAgents();

    fetchSections();
    fetchMenuItems();
  }, []);

  ////accordian
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const accordionItems = [
    {
      title: "Who we are",
      content: `Step into a world of luxury living redefined by Questbloom Real Estate in the vibrant city of Dubai. Our passion for exquisite properties and dedication to unparalleled service sets us apart in the realm of real estate. From the glitz of Dubai Marina’s waterfront to the prestige of Downtown Dubai’s skyline, our portfolio showcases the epitome of sophistication.

At Questbloom Real Estate, we’re more than just agents – we’re your partners in finding the perfect home tailored to your lifestyle. With a keen eye for detail and a commitment to excellence, we navigate the Dubai real estate landscape to bring you exclusive opportunities that resonate with your aspirations.

Discover a new standard of luxury living with Questbloom Real Estate, where every home tells a story of opulence and elegance. Let us guide you on your journey to finding the home of your dreams in the dynamic city of Dubai.`,
      hasImage: "/images/background/team.webp",
      isIcon: false,
    },
    {
      title: "Our Vision",
      content:
        "At Questbloom Real Estate, our vision is to redefine the standard of excellence in Dubai's real estate market. We aim to be the premier choice for clients seeking unparalleled service, expertise, and personalized attention. Our vision encompasses creating lasting relationships built on trust, transparency, and integrity. We strive to exceed expectations by consistently delivering exceptional results and guiding clients towards their dream homes. With a forward-thinking approach and a commitment to innovation, we envision a future where every client's real estate journey is seamless, rewarding, and unforgettable. Experience our vision come to life at Questbloom Real Estate – where your dreams become reality.",
      hasImage: "/images/vision-icon.svg",
      isIcon: true,
    },
    {
      title: "Our Mission",
      content:
        "At Questbloom Real Estate, our mission is to guide you on your journey to finding the perfect home in Dubai. We prioritize unparalleled service, expertise, and personalized attention for every client. Our goal is to redefine the real estate experience by putting your needs first and foremost. With a commitment to excellence, we strive to be your trusted partner in navigating the dynamic Dubai real estate market. Whether you're in search of a luxurious waterfront villa, a chic urban apartment, or a serene beachfront retreat, we're here to make your dreams come true. Experience the difference with Questbloom Real Estate – where our mission is to guide you every step of the way towards your dream home in Dubai.",
      hasImage: "/images/mission-icon.svg",
      isIcon: true,
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader menuItems={menuItems} error={error} />
      {/* End Main Header Nav */}
      {/* Mobile Nav  */}
      <MobileMenu menuItems={menuItems} error={error} />

      <SocialLinksNavbar />

      {/* End Mobile Nav  */}
      {/* Breadcrumb Sections */}
      <section
        className="p-0"
        dangerouslySetInnerHTML={{
          __html:
            sections.find((section) => section.section_name === `Cover`)
              ?.html_content ||
            `<div
  class="about-us-video"
  style="
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  "
>
  <div
    style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 1;
    "
  ></div>

  <div
    style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 0;
    "
  >
    <iframe
      src="https://www.youtube.com/embed/Sp_HFUgpKmQ?autoplay=1&mute=1&loop=1&playlist=Sp_HFUgpKmQ&controls=0&rel=0&playsinline=1&modestbranding=1&vq=hd1080"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
      style="
        width: 1905px;
        height: 1071.56px;
        object-fit: cover;
        pointer-events: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    ></iframe>
  </div>

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
          <h2
            class="about-us-video-text title text-white text-center"
            style="
              font-family: 'Raleway', Sans-serif;
              text-transform: uppercase;
              color: #ffffff;
              padding-bottom: 30px;
            "
          >
            WHO WE ARE
          </h2>
        </div>
      </div>
    </div>
  </div>
</div>`,
        }}
      ></section>

      {/* End Breadcrumb Sections */}
      {/* Our About Area */}

      <ScrollRevealSection sections={sections} />
      <ScrollRevealSectionMobile sections={sections} />
      <section className="contact-info-section mt30-md pt-0 pb30 pb60-md">
        <div className="accordion-section">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="accordion-container mx-auto">
                  {accordionItems.map((item, index) => (
                    <div key={index} className="accordion-item">
                      <div
                        className={`accordion-header ${
                          hoveredIndex === index ? "hovered " : ""
                        }
                        
                        ${activeIndex === index ? "expanded" : ""}
                        `}
                        onClick={() => toggleAccordion(index)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <div
                          className={`accordion-icon mobile-visible ${
                            hoveredIndex === index || activeIndex === index
                              ? "visible"
                              : ""
                          } ${activeIndex === index ? "minus" : ""}`}
                        >
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              className="plus-line-horizontal"
                              d="M5 12h14"
                              stroke="#797631"
                              strokeWidth="1"
                              strokeLinecap="round"
                            />
                            <path
                              className="plus-line-vertical"
                              d="M12 5v14"
                              stroke="#797631"
                              strokeWidth="1"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>

                        <h2
                          className="accordion-title "
                          style={{ fontFamily: '"Raleway", Sans-serif' }}
                          dangerouslySetInnerHTML={{
                            __html:
                              sections.find(
                                (section) =>
                                  section.section_name ===
                                  `About Us Accordion ${index + 1} Title`
                              )?.html_content || `${item.title}`,
                          }}
                        ></h2>
                      </div>

                      <div
                        className={`accordion-content  ${
                          activeIndex === index ? "expanded" : ""
                        }`}
                      >
                        <div className="content-wrapper">
                          <div className="icon-container ">
                            <img
                              src={
                                sections.find(
                                  (section) =>
                                    section.section_name ===
                                    `About Us Accordion ${index + 1} Image`
                                )?.html_content || `${item.hasImage}`
                              }
                              className={`icon-placeholder ${
                                item.isIcon ? "is-icon" : ""
                              }`}
                            ></img>
                          </div>

                          <p
                            className="content-text"
                            dangerouslySetInnerHTML={{
                              __html:
                                sections.find(
                                  (section) =>
                                    section.section_name ===
                                    `About Us Accordion ${index + 1} Text`
                                )?.html_content || `${item.content}`,
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="pt0 pb0"
        dangerouslySetInnerHTML={{
          __html:
            sections.find(
              (section) => section.section_name === `Parallax Section`
            )?.html_content ||
            `<div
  class="hero-parallax"
  style="background-image: url('/images/about/Aquarise-Exterior-4.jpg');"
>
  <div class="parallax-dark-overlay" id="parallaxBg"></div>
  <div class="about-us-hero-content">
    <div class="container">
      <div class="row align-items-center min-vh-90 ">
        <div
          class="col-lg-7 hero-text-container "
          data-aos="fade-bottom"
          data-aos-delay="300"
        >
          <h1 class="about-us-hero-title ">Our Strengths</h1>
          <p class="about-us-hero-subtitle">
            At Questbloom Real Estate, we combine market expertise,
            personalized service, and a commitment to excellence. Guided
            by trust and transparency, we help you achieve your real
            estate goals – from luxury waterfront living to city
            apartments.
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

      <section className="pb10-md pb70  pt50-md pt80">
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
              className="col-lg-11 mx-auto px0-md "
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="property-city-slider ">
                {/* Add this wrapper to center content */}
                <Agents agents={agents} />
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
            sections.find(
              (section) => section.section_name === "Learn Mored awd"
            )?.html_content ||
            `<div class="bgc-thm-light mx-auto maxw1600 pt60 pb90 pb60-lg bdrs24 position-relative overflow-hidden mx20-lg">
  <div class="container">
    <div class="row">
      <div
        class="col-md-6 col-lg-5 px-md-0 px-3"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <div>
          <div class="mb20">
            <h2 class="title text-capitalize">Why Choose Us?</h2>
          </div>

          <div class="why-chose-list style2">
            <div class="list-one d-flex align-items-start mb30">
              <div class="list-content flex-grow-1">
                <p class="text mb-0 fz15">
                  Choosing a real estate partner in Dubai is a big
                  decision, and here’s why Questbloom Real Estate should
                  be your top choice. We don’t just sell properties; we
                  offer unmatched expertise, personalized service, and
                  genuine care for your needs. Our team knows Dubai’s
                  real estate inside out, so you can trust us to provide
                  valuable insights and guidance every step of the way.
                  <br /><br />
                  But it’s not just about expertise – it’s about
                  integrity. We believe in transparency and honesty,
                  building relationships based on trust and respect.
                  Plus, our diverse portfolio ensures there’s something
                  for everyone, whether you’re looking for a luxury
                  waterfront villa or a cozy urban apartment.
                  <br /><br />
                  At Questbloom Real Estate, your satisfaction is our
                  priority. We go above and beyond to exceed your
                  expectations and make your real estate journey in
                  Dubai as smooth and enjoyable as possible. Choose
                  Questbloom Real Estate and let us help you find your
                  dream home in the dazzling city of Dubai.
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
      class="d-none d-md-block about-cta-image"
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
  class="d-block d-md-none" 
  style="background-color: transparent; border: 1px solid black; cursor: pointer; border-radius: 12px; padding: 12px 25px; text-align: center; font-weight: 600; font-size: 15px; font-style: normal; outline: none;"
>
  Enquire now 
 <i 
  class="fal ms-2 fa-arrow-right-long" 
  style="transform: rotate(-45deg);"
></i>

</a>
         <a 
  href="/contact" 
  class="d-none d-md-block" 
  style="background-color: transparent; border: 1px solid black; cursor: pointer; border-radius: 12px; padding: 12px 25px; text-align: center; font-weight: 600; font-size: 15px; font-style: normal; outline: none;"
>
  Enquire now 
 <i 
  class="fal ms-2 fa-arrow-right-long" 
  style="transform: rotate(-45deg);"
></i>

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
