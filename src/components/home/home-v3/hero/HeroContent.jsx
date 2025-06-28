import DropdownSelect from "@/components/common/DropdownSelect";
import DropdownSelectLocation from "@/components/common/DropdownSelectLocation";
import React, { useState } from "react";
import "react-input-range/lib/css/index.css";
import { useNavigate } from "react-router-dom";
import SelectDropdown from "./SelectDropdown";
import PercentagePreHandover from "@/components/common/PercentagePreHandover";
import PriceRange from "@/components/common/advance-filter-two/PriceRange";

const HeroContent = ({
  propertyTypes,
  locationOptions,
  saleStatuses,
  filterFunctions,
  buyRent,
  allReadyOff,
  handleAllReadyOff,
  handleBuyRent,
  loading,
  setModalOpen,
  activeFilterCount,
}) => {
  let propertyTypesStrings = propertyTypes.map((item) => item.value);
  const navigate = useNavigate();

  // Reset filters when tabs change
  // useEffect(() => {
  //   filterFunctions.resetFilter();
  // }, [buyRent, allReadyOff]);

  const buyRentTabs = [
    { id: "buy", label: "Buy" },
    { id: "rent", label: "Rent" },
  ];

  const allReadyOffTabs = [
    { id: "all", label: "All" },
    { id: "ready", label: "Ready" },
    { id: "off", label: "Off-Plan" },
  ];

  const rentDurationOptions = ["Yearly", "Monthly", "Weekly", "Daily"];

  return (
    <div className="advance-style3 mb30 mx-auto animate-up-2 ">
      <div
        className="tab-content bg-white bg-opacity-50 backdrop-blur"
        id="backdrop-blur"
      >
        {buyRentTabs.map((tab) => (
          <div
            className={`${buyRent === tab.id ? "active" : ""} tab-pane `}
            key={tab.id}
          >
            <div className="advance-content-style3 ">
              <div className="row gy-3 gx-1 align-items-stretch">
                {/* Buy/Rent Toggle */}

                <div className="col-md-1 col-4 col-lg-2 ">
                  <div
                    className="mt-1  d-flex justify-content-center h-90 "
                    style={{ backgroundColor: "#f7f7f7", borderRadius: "12px" }}
                  >
                    {buyRentTabs.map((tab) => (
                      <li className="nav-item " key={tab.id}>
                        <button
                          className={`nav-link flex-1 ${
                            buyRent === tab.id ? "active" : ""
                          }`}
                          id="tab-element"
                          onClick={() => handleBuyRent(tab.id)}
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </div>
                </div>

                {/* Location Input */}
                <div className="col-md-5 col-lg-4 ">
                  <div className="mt-3 mt-md-0 bootselect-multiselect">
                    <DropdownSelectLocation
                      options={locationOptions}
                      value={filterFunctions?.location}
                      onChange={filterFunctions?.handlelocation}
                      placeholder="Enter Location"
                      loading={loading}
                    />
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="col-3">
                  <div className="mt-3 mt-md-0">
                    <div className="bootselect-multiselect">
                      <SelectDropdown
                        saleStatuses={saleStatuses}
                        filterFunctions={filterFunctions}
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Search Buttons */}

                <button
                  className="advance-search-btn col-2 ms-1 me-1 mt-3  d-none d-md-block"
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#f7f7f7",
                  }}
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#advanceSeachModal"
                >
                  <span className="flaticon-settings" /> Advanced
                  {activeFilterCount > 0 && (
                    <span
                      className=" badge rounded-pill ms-2"
                      style={{
                        backgroundColor: "#797631",
                        color: "white",
                        paddingTop: "0.4rem",
                        fontSize: "0.8rem",
                      }}
                    >
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <div className=" col-lg-auto ms-2 me  d-none d-md-block">
                  <button
                    style={{ paddingTop: "2px" }}
                    className="advance-search-icon ud-btn btn-thm "
                    type="button"
                    onClick={() => {
                      let path = "";

                      if (buyRent === "rent") {
                        path = "/rent";
                      } else if (buyRent === "buy") {
                        if (allReadyOff === "ready" || allReadyOff === "all") {
                          path = "/buy";
                        } else if (allReadyOff === "off") {
                          path = "/off-plan";
                        } else {
                          path = "/listings";
                        }
                      }

                      navigate(path);
                    }}
                  >
                    <span className="flaticon-search " />
                  </button>
                </div>

                <div className="col-md-3 col-7 col-lg-3 ">
                  <div className="mt-3 mt-md-0 h-100 bootselect-multiselect">
                    {buyRent === "buy" ? (
                      <div
                        className="mt-md-0  bootselect-multiselect h-100 justify-content-center d-flex"
                        style={{
                          backgroundColor: "#f7f7f7",
                          borderRadius: "12px",
                        }}
                      >
                        {allReadyOffTabs.map((tab) => (
                          <li className="nav-item " key={tab.id}>
                            <button
                              className={`nav-link  h-100 flex-1 ${
                                allReadyOff === tab.id ? "active" : ""
                              }`}
                              id="tab-element"
                              onClick={() => handleAllReadyOff(tab.id)}
                            >
                              {tab.label}
                            </button>
                          </li>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-md-0  bootselect-multiselect">
                        <DropdownSelect
                          options={rentDurationOptions}
                          value={filterFunctions?.rentDuration}
                          onChange={filterFunctions?.handleRentDuration}
                          placeholder="Rent Duration"
                          loading={loading}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Property Type Dropdown */}
                <div className="col-md-2 col-lg-3">
                  <div className="mt-3 mt-md-0 bootselect-multiselect">
                    <DropdownSelect
                      options={propertyTypesStrings}
                      value={filterFunctions?.selectedPropertyType}
                      onChange={filterFunctions?.handlepropertyType}
                      placeholder="Property Type"
                      loading={loading}
                    />
                  </div>
                </div>

                {/* Bedrooms Dropdown */}

                <div className="col">
                  <div className="mt-3 mt-md-0 bootselect-multiselect">
                    <DropdownSelect
                      options={["0", "1", "2", "3", "4", "5+"]}
                      value={filterFunctions?.bedrooms?.toString()}
                      onChange={(val) =>
                        filterFunctions?.handlebedrooms(parseInt(val || 0))
                      }
                      loading={loading}
                      placeholder="Bedrooms"
                    />
                  </div>
                </div>

                {/* Bathrooms Dropdown */}

                <div className="col">
                  <div className="mt-3 mt-md-0 bootselect-multiselect">
                    <DropdownSelect
                      options={["0", "1", "2", "3", "4", "5+"]}
                      value={filterFunctions?.bathrooms?.toString()}
                      onChange={(val) =>
                        filterFunctions?.handleBathrooms(parseInt(val || 0))
                      }
                      loading={loading}
                      placeholder="Bathrooms"
                    />
                  </div>
                </div>

                {/* Conditional Fields for Buy/Off-Plan */}

                {/* Price Range Dropdown */}
                <div className="col-md-3 col-lg-2  ">
                  <button
                    type="button"
                    className=" d-flex justify-content-between align-items-center border-none w-100 fw-light"
                    style={{
                      padding: "14px 13px",
                      borderRadius: "12px",
                      backgroundColor: "#f7f7f7",
                    }}
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    Price <i className="fa fa-angle-down ms-2 text-gray" />
                  </button>

                  <div className="dropdown-menu dd3">
                    <div className="widget-wrapper pb25 mb0 pl20 pr20">
                      <h6 className="list-title">Price Range</h6>
                      {/* Range Slider Desktop Version */}
                      <div className="range-slider-style1 mb10 mt30">
                        <PriceRange
                          priceRange={filterFunctions?.priceRange}
                          setPriceRange={filterFunctions?.handlePriceRange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="  row pe-0 d-block d-md-none">
                  <div className="col-12 d-flex align-items-center  justify-content-center justify-content-md-center mt-2 mt-md-0">
                    <button
                      className="advance-search-btn "
                      style={{
                        padding: "15px 13px",
                        borderRadius: "12px",
                        backgroundColor: "#f7f7f7",
                      }}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#advanceSeachModal"
                    >
                      <span className="flaticon-settings" /> Advanced
                    </button>
                    <button
                      style={{ paddingTop: "2px" }}
                      className="advance-search-icon ud-btn btn-thm ms-4"
                      type="button"
                      onClick={() => {
                        let path = "";

                        if (buyRent === "rent") {
                          path = "/rent";
                        } else if (buyRent === "buy") {
                          if (allReadyOff === "ready") {
                            path = "/buy";
                          } else if (allReadyOff === "off") {
                            path = "/off-plan";
                          } else {
                            path = "/listings";
                          }
                        }

                        navigate(path);
                      }}
                    >
                      <span className="flaticon-search " />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
      #tab-element.active {
          border-bottom: 2px solid #797631;
          color: #797631;
          border-color: #797631; /* Optional if you need to target another border */
        }
         #backdrop-blur {
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
      `}</style>
    </div>
  );
};

export default HeroContent;
