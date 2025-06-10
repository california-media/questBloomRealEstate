import DefaultHeader from "@/components/common/DefaultHeader";

import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import { useParams } from "react-router-dom";
// import Pagination from "@/components/listing/Pagination";
// import FeaturedListings from "@/components/listing/map-style/header-map-style/FeatuerdListings";
// import PropertyFilteringMap from "@/components/listing/map-style/header-map-style/PropertyFilteringMap";
// import TopFilterBar from "@/components/listing/map-style/header-map-style/TopFilterBar";
// import TopFilterBar2 from "@/components/listing/map-style/header-map-style/TopFilterBar2";
import React from "react";

import MetaData from "@/components/common/MetaData";
import ProperteyFiltering from "@/components/listing/grid-view/grid-full-3-col/ProperteyFiltering";

const metaInformation = {
  title: "Search Listings",
};

const SearchProperties = () => {
  const { search } = useParams();
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
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">
                  {search ? `Search Results for "${search}"` : 'Search Results'}
                </h2>
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
      <ProperteyFiltering search={search} />
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default SearchProperties;
