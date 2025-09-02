import DefaultHeader from "@/components/common/DefaultHeader";

import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import { useParams } from "react-router-dom";
// import Pagination from "@/components/listing/Pagination";
// import FeaturedListings from "@/components/listing/map-style/header-map-style/FeatuerdListings";
// import PropertyFilteringMap from "@/components/listing/map-style/header-map-style/PropertyFilteringMap";
// import TopFilterBar from "@/components/listing/map-style/header-map-style/TopFilterBar";
// import TopFilterBar2 from "@/components/listing/map-style/header-map-style/TopFilterBar2";
import React, { useEffect, useState } from "react";

import MetaData from "@/components/common/MetaData";
import ProperteyFiltering from "@/components/listing/grid-view/grid-full-3-col/ProperteyFiltering";
import adminApi from "@/api/adminApi";

const metaInformation = {
  title: "City Listings",
};

const HeaderMapStyle = () => {
  const { region } = useParams();
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
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">{region || "UAE"} Homes for Sale</h2>
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  <a href="#">For Sale</a>
                </div>
                <a
                  className="filter-btn-left mobile-filter-btn d-block d-lg-none"
                  data-bs-toggle="offcanvas"
                  href="#listingSidebarFilter"
                  role="button"
                  aria-controls="listingSidebarFilter"
                >
                  <span className="flaticon-settings" /> Filter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}
      <ProperteyFiltering region={region} />
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default HeaderMapStyle;
