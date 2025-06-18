import DropdownSelect from "@/components/common/DropdownSelect ";
import React, { useState, useEffect } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { useNavigate } from "react-router-dom";
import SelectDropdown from "./SelectDropdown";
import PriceRange from "@/components/common/advance-filter-two/PriceRange";
import PercentagePreHandover from "@/components/common/PercentagePreHandover";

const HeroContent = ({
  propertyTypes,
  saleStatuses,
  filterFunctions,
  searchTerm,
  setSearchTerm,
}) => {
  let propertyTypesStrings = propertyTypes.map((item) => item.value);
  const navigate = useNavigate();
  const [buyRent, setBuyRent] = useState("buy");
  const [allReadyOff, setAllReadyOff] = useState("all");

  // Reset filters when tabs change
  useEffect(() => {
    filterFunctions.resetFilter();
  }, [buyRent, allReadyOff]);

  const handleAllReadyOff = (tab) => {
    setAllReadyOff(tab);
  };

  const handleBuyRent = (tab) => {
    setBuyRent(tab);
  };

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
    <div className="advance-style3 mb30 mx-auto animate-up-2">
      <div className="tab-content">
        {buyRentTabs.map((tab) => (
          <div
            className={`${buyRent === tab.id ? "active" : ""} tab-pane`}
            key={tab.id}
          >
            <div className="advance-content-style3">
              <div className="row gy-3 gx-1">
                {/* Buy/Rent Toggle */}

                <div className="col-md-1 col-lg-2">
                  <div className="mt-md-0 d-flex  bootselect-multiselect">
                    {buyRentTabs.map((tab) => (
                      <li className="nav-item" key={tab.id}>
                        <button
                          className={`nav-link flex-1 ${
                            buyRent === tab.id ? "active" : ""
                          }`}
                          onClick={() => handleBuyRent(tab.id)}
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </div>
                </div>

                {/* Search Input */}
                <div className="col-md-5 col-lg-4">
                  <div className="advance-search-field position-relative text-start">
                    <form
                      className="form-search position-relative"
                      onSubmit={(e) => {
                        e.preventDefault();
                        searchTerm
                          ? navigate("/search-properties/" + searchTerm)
                          : navigate("/search-properties");
                      }}
                    >
                      <div className="box-search">
                        <span className="icon flaticon-home-1" />
                        <input
                          className="form-control bgc-f7"
                          type="text"
                          name="search"
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                          }}
                          placeholder={`Enter Keyword for ${tab.label}`}
                        />
                      </div>
                    </form>
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="col-md-1 col-lg-2">
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
                <div className="col-md-4 pe-0">
                  <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-2 mt-md-0">
                    <button
                      className="advance-search-btn"
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
                      onClick={() =>
                        searchTerm
                          ? navigate("/search-properties/" + searchTerm)
                          : navigate("/search-properties")
                      }
                    >
                      <span className="flaticon-search " />
                    </button>
                  </div>
                </div>

                {/* Conditional Toggles/Dropdowns */}
                <div className="col-md-3 col-lg-4">
                  {buyRent === "buy" ? (
                    <div className="mt-md-0 d-flex  bootselect-multiselect">
                      {allReadyOffTabs.map((tab) => (
                        <li className="nav-item" key={tab.id}>
                          <button
                            className={`nav-link flex-1 ${
                              allReadyOff === tab.id ? "active" : ""
                            }`}
                            onClick={() => handleAllReadyOff(tab.id)}
                          >
                            {tab.label}
                          </button>
                        </li>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-md-0 bootselect-multiselect">
                      <DropdownSelect
                        options={rentDurationOptions}
                        value={filterFunctions?.rentDuration}
                        onChange={filterFunctions?.handleRentDuration}
                        placeholder="Rent Duration"
                      />
                    </div>
                  )}
                </div>

                {/* Property Type Dropdown */}
                <div className="col-md-3 col-lg-4">
                  <div className="mt-3 mt-md-0 bootselect-multiselect">
                    <DropdownSelect
                      options={propertyTypesStrings}
                      value={filterFunctions?.selectedPropertyType}
                      onChange={filterFunctions?.handlePropertyType}
                      placeholder="Property Type"
                    />
                  </div>
                </div>

                {/* Bedrooms Dropdown */}
                <div className="col-md-3 col-lg-2">
                  <div className="mt-3 mt-md-0 bootselect-multiselect">
                    <DropdownSelect
                      options={["0", "1", "2", "3", "4", "5+"]}
                      value={filterFunctions?.bedrooms?.toString()}
                      onChange={(val) =>
                        filterFunctions?.handlebedrooms(parseInt(val || 0))
                      }
                      placeholder="Bedrooms"
                    />
                  </div>
                </div>

                {/* Bathrooms Dropdown */}
                <div className="col-md-3 col-lg-2">
                  <div className="mt-3 mt-md-0 bootselect-multiselect">
                    <DropdownSelect
                      options={["0", "1", "2", "3", "4", "5+"]}
                      value={filterFunctions?.bathrooms?.toString()}
                      onChange={(val) =>
                        filterFunctions?.handleBathrooms(parseInt(val || 0))
                      }
                      placeholder="Bathrooms"
                    />
                  </div>
                </div>

                {/* Conditional Fields for Buy/Off-Plan */}
                {buyRent === "buy" && allReadyOff === "off" && (
                  <>
                    <div className="col-md-3 col-lg-3">
                      <div className="mt-3 mt-md-0 bootselect-multiselect">
                        <DropdownSelect
                          options={Array.from({ length: 11 }, (_, i) =>
                            (2023 + i).toString()
                          )}
                          value={filterFunctions?.yearBuild?.toString()}
                          onChange={(val) =>
                            filterFunctions?.handleYearBuild(parseInt(val || 0))
                          }
                          placeholder="Handover"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6 mt30 mx-auto">
                      <div className="range-slider-style1">
                        <h5 className="mb30">Payment Plan (% pre-handover)</h5>
                        <PercentagePreHandover
                          percentagePreHandover={
                            filterFunctions?.percentagePreHandover
                          }
                          setPercentagePreHandover={
                            filterFunctions?.handlePercentagePreHandover
                          }
                        />
                      </div>
                    </div>
                  </>
                )}


                

                {/* Price Range Dropdown */}
                {(buyRent === "rent" || allReadyOff !== "off") && (
                  <div className="col-md-6 col-lg-6 mt30 mx-auto">
                    <div className="range-slider-style1">
                      <h5 className="mb30">Price Range</h5>
                      <PriceRange
                        priceRange={filterFunctions?.priceRange}
                        setPriceRange={filterFunctions?.handlepriceRange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroContent;
