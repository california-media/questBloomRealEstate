import DefaultHeader from "@/components/common/DefaultHeader";

import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

import ProperteyFiltering from "@/components/listing/grid-view/grid-full-3-col/ProperteyFilteringBuy";

import React, { useEffect, useState } from "react";

import MetaData from "@/components/common/MetaData";
import { Link, useParams } from "react-router-dom";
import adminApi from "@/api/adminApi";

const metaInformation = {
  title: "Resale Listings",
};

const BuyFull3Col = () => {
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
      <DefaultHeader menuItems={menuItems} error={error} />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu menuItems={menuItems} error={error} />
      {/* End Mobile Nav  */}

      {/* Breadcumb Sections */}
      <section
        className="breadcumb-section bgc-f7"
        dangerouslySetInnerHTML={{
          __html:
            sections.find((section) => section.section_name === "Buy Header")
              ?.html_content ||
            `<div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcumb-style1">
                <h2 class="title">UAE Homes for Sale</h2>
                <div class="breadcumb-list">
                  <a href="/">Home</a>
                  <a href="#">For Buying</a>
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

export default BuyFull3Col;
