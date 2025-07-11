import DefaultHeader from "@/components/common/DefaultHeader";

import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

import ProperteyFilteringRent from "@/components/listing/grid-view/grid-full-3-col/ProperteyFilteringRent";

import React, { useEffect, useState } from "react";

import MetaData from "@/components/common/MetaData";
import { Link, useParams } from "react-router-dom";
import adminApi from "@/api/adminApi";

const metaInformation = {
  title: "Off-Plan Listings",
};

const Rent3Col = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await adminApi.get("/pages/buy/sections");
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
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcumb Sections */}
      <section
        className="breadcumb-section bgc-f7"
        dangerouslySetInnerHTML={{
          __html:
            sections.find(
              (section) => section.section_name === "Rent Header"
            )?.html_content ||
            `<div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcumb-style1">
                <h2 class="title">UAE Homes for Rent</h2>
                <div class="breadcumb-list">
                  <a href="/">Home</a>
                  <a href="#">For Renting</a>
                </div>
                <a
                  class="filter-btn-left mobile-filter-btn d-block d-lg-none"
                  data-bs-toggle="offcanvas"
                  href="#listingSidebarFilter"
                  role="button"
                  aria-controls="listingSidebarFilter"
                >
                  <span class="flaticon-settings"></span> Filter
                </a>
              </div>
            </div>
          </div>
        </div>`,
        }}
      ></section>
      {/* End Breadcumb Sections */}

      {/* Property Filtering */}
      <ProperteyFilteringRent />
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Rent3Col;
