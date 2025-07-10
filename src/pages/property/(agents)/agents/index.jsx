import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import FilteringAgent from "@/components/property/FilteringAgent";

import React, { useEffect, useState } from "react";

import MetaData from "@/components/common/MetaData";
import adminApi from "@/api/adminApi";

const metaInformation = {
  title: "Agents | QMC",
};

const Agents = () => {
  const [pageSections, setPageSections] = useState([]);

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
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
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
