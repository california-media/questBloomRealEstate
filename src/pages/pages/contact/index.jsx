import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Form from "@/components/pages/contact/Form";
import Office from "@/components/pages/contact/Office";

import MetaData from "@/components/common/MetaData";
import adminApi from "@/api/adminApi";
import { useEffect, useState } from "react";
import SocialLinksNavbar from "@/pages/homes/home-v2/SocialLinksNavbar";

const metaInformation = {
  title: "Contact | Quest Bloom Real Estate LLC",
};

const Contact = () => {
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
        const response = await adminApi.get("/pages/contact-us/sections");
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
      <SocialLinksNavbar />

      {/* Our Contact With Map */}
      <section
        className="p-0"
        dangerouslySetInnerHTML={{
          __html:
            sections.find((section) => section.section_name === "Map")
              ?.html_content ||
            `<iframe
    class="home8-map contact-page"
    loading="lazy"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27827.558743958227!2d55.254044120755644!3d25.20114252330665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682d79f79769%3A0x775f469534962029!2sLake%20Central%20Tower!5e1!3m2!1sen!2s!4v1749813037589!5m2!1sen!2s"
    title="London Eye, London, United Kingdom"
    aria-label="London Eye, London, United Kingdom"
  ></iframe>`,
        }}
      ></section>
      {/* End Our Contact With Map */}

      {/* Start Our Contact Form */}
      <section className="pt-0 pb0 pb-md-50">
        <div className="container mt150  contact-us-form-section ">
          <div className="row d-flex align-items-end">
            <div className="col-lg-5 position-relative">
              <div className="home8-contact-form default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white">
                <h4 className="form-title mb25">
                  Have questions? Get in touch!
                </h4>
                <Form />
              </div>
            </div>
            {/* End .col */}

            <div
              className="col-lg-5 offset-lg-2 text-center text-md-start mt100  "
              style={{ height: "250px" }}
              dangerouslySetInnerHTML={{
                __html:
                  sections.find(
                    (section) =>
                      section.section_name === "Contact Right Section"
                  )?.html_content ||
                  `<h2 class="mb30 text-capitalize">
  We’d love to hear <br class="d-none d-lg-block" />
  from you.
</h2>
<p class="text mb-0">
  Let us know how we can help! Fill out our contact form and we
  will get back to you as soon as possible.
</p>
`,
              }}
            ></div>

            {/* End .col */}
          </div>
        </div>
      </section>
      {/* End Our Contact Form */}

      {/* Visit our Office */}
      <section
        className="pt0 pb90  "
        dangerouslySetInnerHTML={{
          __html:
            sections.find((section) => section.section_name === "Office")
              ?.html_content ||
            `<div class="container">
  <div class="row align-items-center flex-wrap-reverse gx-5">
    <div
      class="col-lg-7"
      data-aos="fade-bottom"
      data-aos-delay="300"
    >
      <div class="container">
        <div class="row">
          <div
            class="col-lg-12 m-auto mt0 mt100-md"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div class="main-title text-center text-md-start">
              <h2 class="title">Visit Our Office</h2>
              <p class="paragraph mt25">
                Office 1702, 17th Floor,
                <br />
                Lake Central Tower, Marasi Drive,
                <br />
                Business Bay, Dubai, UAE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-5" data-aos="fade-left" data-aos-delay="300">
      <div class="contact-card">
        <div class="card-header">
          <img
            src="https://admin.questrealestate.ae/storage/media/uploaded_images/img_688383f964e0b.svg"
            alt="Quest Real Estate"
            class="logo"
          />
        </div>

        <div class="card-body">
          <h4 class="text-start text-white">Contact Us</h4>

          <div class="contact-item">
            <i class="fas fa-phone"></i>
            <span>+971 4 529 9247</span>
          </div>

          <a
            href="https://wa.me/971522460540"
            class="whatsapp-btn"
            target="_blank"
          >
            <i class="fab fa-whatsapp"></i>
            WhatsApp
          </a>

          <div class="divider"></div>

          <p class="follow-text text-white">Follow us on:</p>
          <div class="social-links">
            <a
              href="https://www.facebook.com/questbloomrealestate"
              target="_blank"
              class="social-link facebook"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/questbloomrealestate"
              target="_blank"
              class="social-link instagram"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/questbloom-real-estate/?originalSubdomain=ae"
              target="_blank"
              class="social-link linkedin"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://www.tiktok.com/@questbloomrealestate"
              target="_blank"
              class="social-link youtube"
            >
              <i class="fab fa-tiktok"></i>
            </a>
          </div>

          <div class="divider"></div>

          <p class="valuation-text">
            Do you need a property valuation?
          </p>
          <a href="tel:+97145299247" class="speak-btn">
            <i class="fas fa-phone"></i>
            Speak with us
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
`,
        }}
      ></section>
      {/* End Visit our Office */}

      {/* Our CTA */}
      <section
        className="our-cta pt0"
        dangerouslySetInnerHTML={{
          __html:
            sections.find(
              (section) => section.section_name === "Contact Call to Action"
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

export default Contact;
