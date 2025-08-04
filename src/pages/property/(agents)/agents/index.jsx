import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import FilteringAgent from "@/components/property/FilteringAgent";

import React, { useEffect, useState } from "react";

import MetaData from "@/components/common/MetaData";
import adminApi from "@/api/adminApi";

const metaInformation = {
  title: "Agents | Quest Bloom Real Bloom Estate LLC",
};

const Agents = () => {
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
        const response = await adminApi.get("/pages/agents/sections");
        setPageSections(response.data.data.sections || []);
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
      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="breadcumb-style1"
                dangerouslySetInnerHTML={{
                  __html:
                    pageSections.find(
                      (section) => section.section_name === "Agents Page Header"
                    )?.html_content ||
                    `<h2 class="title">Agents</h2>
<div class="text">
  <a href="#">Our Exclusive Agents</a>
</div>`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}

      {/* Agent Section Area */}
      <FilteringAgent pageSections={pageSections} />

      {/* End Agent Section Area */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Agents;
