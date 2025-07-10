import React, { useEffect, useState } from "react";
import TopFilter from "./TopFilter";

import AllAgents from "./agents/AllAgents";
// import PaginationTwo from '../listing/PaginationTwo';
export default function FilteringAgent({pageSections}) {
  
  return (
    <section className="our-agents pt-0" style={{ minHeight: "70vh" }}>
      <div className="container">
        {/* <div className="row align-items-center mb20">
            <TopFilter  filterFunctions={filterFunctions} />
          </div> */}
        {/* End .row */}

        <div
          className="row row-cols-4 gx4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <AllAgents  pageSections={pageSections}/>
        </div>
        {/* End .row */}

        <div className="row justify-content-center mt20">
          {/* <PaginationTwo pageNumber={pageNumber} setPageNumber={setPageNumber} data={sortedFilteredData} pageCapacity={15}/> */}
        </div>
      </div>
    </section>
  );
}
