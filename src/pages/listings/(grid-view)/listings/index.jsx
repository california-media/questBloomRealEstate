import DefaultHeader from "@/components/common/DefaultHeader";

import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

import ProperteyFiltering from "@/components/listing/grid-view/grid-full-3-col/ProperteyFilteringAll";

import React, { useEffect, useState } from "react";
import adminApi from "@/api/adminApi";

import MetaData from "@/components/common/MetaData";
import { Link, useParams } from "react-router-dom";

const metaInformation = {
  title: "Off-Plan Listings",
};

const ListingsFull3Col = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await adminApi.get("/pages/listings/sections");
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
              (section) => section.section_name === "Listings Header"
            )?.html_content ||
            `<div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcumb-style1">
                <h2 class="title">UAE Homes for Rent and Sale</h2>
                <div class="breadcumb-list">
                  <a href="/">Home</a>
                  <a href="#">For Buying and Renting</a>
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
      <ProperteyFiltering />
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default ListingsFull3Col;
