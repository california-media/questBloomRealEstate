import MobileMenu from "@/components/common/mobile-menu";
import Partner from "@/components/common/Partner";
import Agents from "@/components/home/home-v2/Agents";
import ApartmentType from "@/components/home/home-v2/ApartmentType";
import ExploreCities from "@/components/home/home-v2/ExploreCities";
import FeaturedListingsHome from "@/components/home/home-v2/FeatuerdListingsHome";
import Header from "@/components/home/home-v2/Header";
import Testimonial from "@/components/home/home-v2/Testimonial";
import React, { useEffect, useState } from "react";
import Footer from "@/components/common/default-footer";
import Cta from "@/components/home/home-v2/Cta";

import { Link } from "react-router-dom";

import MetaData from "@/components/common/MetaData";
import AutoCarouselHero from "@/components/home/home-v2/hero/AutoCarouselHero";
import Hero from "@/components/home/home-v3/hero";
import adminApi from "@/api/adminApi";
import AnimatedText from "@/components/home/home-v2/hero/AnimatedText";

const metaInformation = {
  title: "Home",
};

const beachAreaProperties = [
  {
    id: 139,
    name: "Al Raha Beach, Abu Dhabi",
  },

  {
    id: 119,
    name: "Emaar Beachfront",
  },
  {
    id: 63,
    name: "Jumeirah Beach Residence (JBR)",
  },
];

const sobhaDeveloper = {
  id: 56,
  name: "Sobha",
  website: "https://www.sobharealty.com/",
};

const sections = [
  {
    title: "Luxury Villas",
    paragraph: "Luxury villas with premium amenities and stunning views",
    params: {
      unit_types: "Villa,Villas",
    },
    seeAll: "See More Luxury Villas",
  },
  {
    title: "Apartments",
    paragraph: "Modern apartments in prime locations with excellent facilities",
    params: {
      unit_types: "Apartments",
    },
    seeAll: "See All Apartments",
  },

  {
    title: "Properties under 1 Million",
    paragraph: "Handpicked premium homes that offer great value",
    params: {
      unit_price_to: 1000000,
    },
    seeAll: "See All Properties under 1 Million",
  },
  {
    title: "Properties between 1 Million to 2 Million",
    paragraph: "Luxury properties priced between 1 Million and 2 Million",
    params: {
      unit_price_from: 1000000,
      unit_price_to: 2000000,
    },
    seeAll: "See All Properties between 1 Million to 2 Million",
  },
  {
    title: "Properties by Sobha",
    paragraph: "Premium Properties by Sobha with excellent facilities",
    params: {
      developer: String(sobhaDeveloper.id),
    },
    seeAll: "See All Properties by Sobha",
  },
  {
    title: "Beachfront Properties",
    paragraph: "Premium Beachfront Properties",
    params: {
      areas: beachAreaProperties.map((item) => item.id).join(","),
    },
    seeAll: "See All Beachfront Properties",
  },
  {
    title: "Featured Listings",
    paragraph: " Premium homes designed to match your lifestyle",
    seeAll: "See All Listings",
  },
];

const Home_V2 = () => {
  // const [visibleSections, setVisibleSections] = useState(0);
  const [metaInformation, setMetaInformation] = useState({
    title: "Quest Bloom  Real Estate LLC",
    description: "Quest Bloom Real Estate LLC Home page",
  });
  const [pageSections, setPageSections] = useState([]);
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
        console.log("menu items", response.data);
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
        const response = await adminApi.get("/pages/home/sections");
        setPageSections(response.data.data.sections || []);
      } catch (err) {
        console.error("Failed to fetch sections:", err);
      }
    };

    fetchSections();
  }, []);

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        // Fetch only the needed fields using query params
        const response = await adminApi.get(
          "/theme-options/general?keys=site_title,seo_description"
        );

        if (response.data.success) {
          setMetaInformation({
            title:
              response.data.data.site_title || "Quest Bloom Real Estate LLC",
            description:
              response.data.data.seo_description ||
              "Quest Bloom Real Estate LLC",
          });
        }
      } catch (error) {
        console.error("Error fetching meta data:", error);
      }
    };

    fetchMetaData();
  }, []);
  return (
    <>
      {" "}
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <Header menuItems={menuItems} error={error} />
      {/* End Main Header Nav */}
      {/* Mobile Nav  */}
      <MobileMenu menuItems={menuItems} error={error} />
      {/* End Mobile Nav  */}
      {/* Home Banner Style V2 */}
      <AutoCarouselHero
        HeroTitle={
          pageSections.find((sec) => sec.section_name === "Hero Title")
            ?.html_content
        }
      />
      {/* End Home Banner Style V2 */}
      {/* Explore Apartment */}
      <section className="pb15 pb30-md z-1 ">
        <div className="container custom-max-width" id="custom-max-width">
          <div className="row justify-content-center" data-aos="fade">
            <div className="col-lg-12">
              <ApartmentType />
            </div>
          </div>
        </div>
      </section>
      {/* End Explore Apartment */}
      {/* Featured Listings */}
      <>
        {/* Additional Sections - Show all at once with fade animation */}
        {sections.map((section, index) => (
          <FeaturedListingsHome
            pageSections={pageSections}
            section={section}
            key={index}
            index={index}
          />
        ))}
        {/* Main Featured Listings Section */}

        {/* <FeaturedListingsHome
          pageSections={pageSections}
          section={{
            title: "Featured Listings",
            paragraph: " Premium homes designed to match your lifestyle",
            seeAll: "See All Listings",
          }}
        /> */}
      </>
      {/* Explore Featured Listings */}
      {/* Property Cities */}
      <section className="pt0 pb70 pt40 pb50-md">
        <div className="container">
          <div className="row  justify-content-between align-items-center">
            <div className="col-auto">
              <div
                className="main-title"
                data-aos="fade-up"
                data-aos-delay="100"
                dangerouslySetInnerHTML={{
                  __html:
                    pageSections.find(
                      (sec) => sec.section_name === "Section 8 Header"
                    )?.html_content ||
                    `<h2 className="title">

                  Explore Cities
                  </h2>
                <p className="paragraph mt10 ">
                  Browse prime real estate opportunities in the most
                  sought-after cities.
                </p>`,
                }}
              ></div>
            </div>
            {/* End header */}

            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="cities_prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                {/* End prev */}

                <div className="col-auto">
                  <div className="pagination swiper--pagination cities_pagination__active" />
                </div>
                {/* End pagination */}

                <div className="col-auto">
                  <button className="cities_next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
                {/* End Next */}
              </div>
            </div>
            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <div className="row mt20">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
              <div className="property-city-slider">
                <ExploreCities />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End property cities */}
      {/* Explore Apartment */}
      {/* <section className="p-0">
        <div className="how-we-help position-relative mx-auto bgc-thm-light maxw1600 pt120 pt60-md pb90 pb30-md bdrs12 mx20-lg">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-6 m-auto wow fadeInUp"
                data-wow-delay="300ms"
              >
                <div className="main-title text-center">
                  <h2 className="title">See How Realton Can Help</h2>
                  <p className="paragraph">
                    Aliquam lacinia diam quis lacus euismod
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <Explore />
            </div>
          </div>
        </div>
      </section> */}
      {/* End Explore Apartment */}
      {/* About Us */}
      {/* <section className="about-us">
        <div className="container">
          <About />
        </div>
      </section> */}
      {/* End About Us */}
      {/* Our Testimonials */}
      <section
        className="our-testimonial p-0"
        dangerouslySetInnerHTML={{
          __html:
            pageSections.find((sec) => sec.section_name === "Testimonials")
              ?.html_content ||
            `<div class="cta-banner2 bgc-f7 maxw1600 mx-auto pt60 pt60-md pb110 pb60-md bdrs12 position-relative">
  <div class="container">
    <div class="row">
      <div class="col-lg-6 mx-auto" data-aos="fade-up" data-aos-delay="100">
        <div class="main-title text-center">
           <h2 className="hero-title  animate-up-1">Testimonials</h2>
          <p class="paragraph">What our customers saying</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 m-auto" data-aos="fade-up" data-aos-delay="300">
        <div class="testimonial-style2">
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade" id="pills-1st" role="tabpanel" aria-labelledby="pills-1st-tab">
              <div class="testi-content text-center">
                <span class="icon fas fa-quote-left"></span>
                <h4 class="testi-text">Questbloom Real Estate exceeded expectations, finding us a dream home in Dubai's iconic Downtown.</h4>
                <h6 class="name">Ali Bin Saleh</h6>
                <p class="design">Customer</p>
              </div>
            </div>
            <div class="tab-pane fade show active" id="pills-2nd" role="tabpanel" aria-labelledby="pills-2nd-tab">
              <div class="testi-content text-center">
                <span class="icon fas fa-quote-left"></span>
                <h4 class="testi-text">Unmatched service and luxury properties – Questbloom made our Dubai home search effortless and enjoyable.</h4>
                <h6 class="name">Nour Mohamed</h6>
                <p class="design">Customer</p>
              </div>
            </div>
            <div class="tab-pane fade" id="pills-third" role="tabpanel" aria-labelledby="pills-third-tab">
              <div class="testi-content text-center">
                <span class="icon fas fa-quote-left"></span>
                <h4 class="testi-text">Questbloom Real Estate's expertise and dedication led us to the perfect home in Dubai Marina.</h4>
                <h6 class="name">Lina Kamal-Eddin</h6>
                <p class="design">Customer</p>
              </div>
            </div>
          </div>
          <div class="tab-list position-relative">
            <ul class="nav nav-pills justify-content-center" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link ps-0" id="pills-1st-tab" data-bs-toggle="pill" data-bs-target="#pills-1st" type="button" role="tab" aria-controls="pills-1st" aria-selected="false">
                  <img style="width: 70px; height: 71px;" src="/images/testimonials/testi-1.webp" alt="">
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pills-2nd-tab" data-bs-toggle="pill" data-bs-target="#pills-2nd" type="button" role="tab" aria-controls="pills-2nd" aria-selected="true">
                  <img style="width: 70px; height: 71px;" src="/images/testimonials/testi-2.webp" alt="">
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-third-tab" data-bs-toggle="pill" data-bs-target="#pills-third" type="button" role="tab" aria-controls="pills-third" aria-selected="false">
                  <img style="width: 70px; height: 71px;" src="/images/testimonials/testi-3.webp" alt="">
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
        }}
      ></section>
      {/* End Our Testimonials */}
      {/* Exclusive Agents */}
      {/* <section className="pb90">
        <div className="container">
          <div className="row  justify-content-between align-items-center">
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

            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="agent_prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>

                <div className="col-auto">
                  <div className="pagination swiper--pagination agent_pagination__active" />
                </div>

                <div className="col-auto">
                  <button className="agent_next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
              <div className="property-city-slider">
                <Agents />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Exclusive Agents */}
      {/* Our Partners */}
      {/* <section className="our-partners pt0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 wow fadeInUp" data-wow-delay="100">
              <div className="main-title text-center">
                <h6>Trusted by the world’s best</h6>
              </div>
            </div>

            <div
              className="col-lg-12 text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Partner />
            </div>
          </div>
        </div>
      </section> */}
      {/* End Our Partners */}
      {/* Our CTA */}
      <section
        className="our-cta2 p0 px20"
        dangerouslySetInnerHTML={{
          __html:
            pageSections.find(
              (section) => section.id === "Home Page Call to Action"
            )?.html_content ||
            `<div class="cta-banner2 bgc-thm maxw1600 mx-auto pt100 pt50-md pb85 pb50-md px30-md bdrs12 position-relative overflow-hidden">
  <div
    class="cta-style2 d-none d-lg-block"
    data-aos="fade-left"
    data-aos-delay="300"
  >
    <img
      style="width: 35%; border-radius: 30px;"
      src="/images/cta-image.jpg"
      alt="element"
    />
  </div>
  <div class="container">
    <div class="row">
      <div
        class="col-lg-7 col-xl-5"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div class="cta-style2">
          <h2 class="cta-title">
            Buying a Property With Questbloom
          </h2>
          <p class="cta-text">Browse through more properties.</p>
          <a href="/off-plan" class="ud-btn btn-dark mt10">
            Let's Get Started
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
      {/* End Our CTA */}
      {/* Start Our Footer */}
      <section className="footer-style1 at-home2 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Home_V2;
