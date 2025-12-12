import DropdownSelect from "@/components/common/DropdownSelect";
import DropdownSelectLocation from "@/components/common/DropdownSelectLocation";
import React, { useState, useEffect, useRef } from "react";
import "react-input-range/lib/css/index.css";
import { useNavigate } from "react-router-dom";
import SelectDropdown from "./SelectDropdown";
import PercentagePreHandover from "@/components/common/PercentagePreHandover";
import PriceRange from "@/components/common/advance-filter-two/PriceRange";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import api from "@/api/axios";
const HeroContent = ({
  propertyTypes,
  locationOptions,
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

  // Search suggestions state
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const [heroSearchTerm, setHeroSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const searchDropdownRef = useRef(null);
  const debouncedSearchTerm = useDebounce(heroSearchTerm, 300);
  const ignoreNextFetch = useRef(false);

  // Fetch search suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      console.log("fetching suggestions for:", debouncedSearchTerm);
      if (!debouncedSearchTerm || debouncedSearchTerm.length < 1) {
        setSearchSuggestions([]);
        setLocationSuggestions([]);
        setShowSuggestions(false);
        return;
      }
      if (ignoreNextFetch.current) {
        console.log("ignoring fetch for:", debouncedSearchTerm);
        ignoreNextFetch.current = false;
        return;
      }
      setLoadingSuggestions(true);
      try {
        const { data: propertyData } = await api.get("/properties", {
          params: {
            search_query: debouncedSearchTerm,
            country: "United Arab Emirates",
            per_page: 4,
            page: 1,
          },
        });
        const nonUaeIds = [
          94, 124, 125, 127, 128, 129, 130, 131, 132, 133, 143, 148, 149, 150,
          151, 152, 153, 154, 158, 159, 160, 161, 162, 164, 167, 168, 170, 171,
          172, 173, 175, 178, 181, 182, 185, 186, 187, 188, 189, 190, 196, 197,
          203, 206, 207, 227, 231, 233, 236, 237, 239, 242, 244, 249, 253, 256,
          274, 275,
        ];
        const { data: locationData } = await api.get("/areas", {
          params: {
            search: debouncedSearchTerm,
            country: "United Arab Emirates",
          },
        });
        const filteredAreas = locationData.filter(
          (area) => !nonUaeIds.includes(Number(area.id))
        );
        const locationDataSuggestions =
          filteredAreas.slice(0, 4).map((area) => ({
            id: area.id,
            name: area.name || "N/A",
          })) || [];

        const propertyDataSuggestions =
          propertyData.items?.map((property) => ({
            id: property.id,
            name: property.name || "N/A",
          })) || [];
        setSearchSuggestions(propertyDataSuggestions);
        setLocationSuggestions(locationDataSuggestions);

        setShowSuggestions(
          propertyDataSuggestions.length > 0 ||
            locationDataSuggestions.length > 0
        );
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSearchSuggestions([]);
        setLocationSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchTerm]);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      filterFunctions?.handleSearchTerm(searchTerm);
      setShowSuggestions(false);
    } else if (!showSuggestions) setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    ignoreNextFetch.current = true;

    console.log(suggestion.name, "handleSuggestionClick");

    setHeroSearchTerm(suggestion.name);
    filterFunctions?.handleSearchTerm(suggestion.name);
    setShowSuggestions(false);
  };

  const handleLocationSuggestionClick = (suggestion) => {
    ignoreNextFetch.current = true;
    // setSearchTerm(suggestion.name);
    console.log("location suggestion clicked:", suggestion.name);
    filterFunctions?.handlelocation(suggestion.id);

    setShowSuggestions(false);
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
    <div className="advance-style3 mb30 mx-auto animate-up-2 ">
      <div
        className="tab-content px-2 px-md-3 pb-4 bg-white bg-opacity-50 backdrop-blur"
        id="backdrop-blur"
      >
        {buyRentTabs.map((tab) => (
          <div
            className={`${buyRent === tab.id ? "active" : ""} tab-pane `}
            key={tab.id}
          >
            <div className="advance-content-style3 ">
              {/* Desktop Layout - remains unchanged */}
              <div className="row gy-3 gx-1 align-items-stretch d-none d-md-flex">
                {/* Buy/Rent Toggle */}
                <div className="col-md-1 col-4 col-lg-2 ">
                  <div
                    className="  d-flex justify-content-center h-100 "
                    style={{ backgroundColor: "#f7f7f7", borderRadius: "12px" }}
                  >
                    {buyRentTabs.map((tab) => (
                      <li className="nav-item " key={tab.id}>
                        <button
                          className={`nav-link flex-1 h-100 ${
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
                {/* Status Dropdown */}
                {/* <div className="col-4">
                  <div className="mt-3 mt-md-0">
                    <div className="bootselect-multiselect">
                      <SelectDropdown
                        saleStatuses={saleStatuses}
                        filterFunctions={filterFunctions}
                      />
                    </div>
                  </div>
                </div> */}
                <div className="col-4" ref={searchDropdownRef}>
                  <div className="  d-flex  h-100 w-100 position-relative">
                    <div
                      style={{
                        backgroundColor: "#f7f7f7",
                        borderRadius: "12px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Search
                        size={18}
                        style={{
                          marginLeft: "20px",

                          color: "#888",
                          pointerEvents: "none",
                        }}
                      />
                      <input
                        id="home-page-hero-search"
                        type="text"
                        className=" w-100 border-none bg-transparent"
                        placeholder="Project Search"
                        value={heroSearchTerm}
                        autoComplete="off"
                        onChange={(e) => setHeroSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onInput={(e) =>
                          filterFunctions?.handleSearchTerm(e.target.value)
                        }
                        onFocus={() =>
                          searchSuggestions.length > 0 &&
                          setShowSuggestions(true)
                        }
                        style={{
                          padding: "13px 15px",
                          outline: "none",
                        }}
                      />
                    </div>
                    {/* Search Suggestions Dropdown */}
                    {showSuggestions && (
                      <div
                        className="position-absolute w-100 bg-white border rounded shadow-sm"
                        style={{
                          top: "calc(100% + 5px)",
                          left: 0,
                          maxHeight: "300px",
                          overflowY: "auto",
                          zIndex: 1000,
                        }}
                      >
                        {loadingSuggestions ? (
                          <div className="p-3 text-center">
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        ) : (
                          <>
                            {searchSuggestions.length > 0 && (
                              <>
                                <div
                                  className="px-3 py-2 fw-bold text-muted"
                                  style={{
                                    fontSize: "0.85rem",
                                    backgroundColor: "#f9f9f9",
                                  }}
                                >
                                  Projects
                                </div>
                                <ul
                                  className="list-unstyled m-0"
                                  style={{
                                    borderBottom: "1px solid #e0e0e0",
                                  }}
                                >
                                  {searchSuggestions.map((suggestion) => (
                                    <li
                                      key={suggestion.id}
                                      className="px-3 py-2 cursor-pointer d-flex align-items-center gap-2"
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                          "#f7f7f7";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                          "white";
                                      }}
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        console.log(
                                          "Suggestion clicked:",
                                          suggestion.name
                                        );
                                        handleSuggestionClick(suggestion);
                                      }}
                                    >
                                      <i
                                        className="fas fa-building"
                                        style={{
                                          fontSize: "14px",
                                          color: "#797631",
                                        }}
                                      />
                                      {suggestion.name}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                            {locationSuggestions.length > 0 && (
                              <>
                                <div
                                  className="px-3 py-2 fw-bold text-muted"
                                  style={{
                                    fontSize: "0.85rem",
                                    backgroundColor: "#f9f9f9",
                                  }}
                                >
                                  Districts
                                </div>
                                <ul className="list-unstyled m-0">
                                  {locationSuggestions.map((suggestion) => (
                                    <li
                                      key={suggestion.id}
                                      className="px-3 py-2 cursor-pointer d-flex align-items-center gap-2"
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                          "#f7f7f7";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                          "white";
                                      }}
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        console.log(
                                          "Suggestion clicked:",
                                          suggestion.name
                                        );
                                        handleLocationSuggestionClick(
                                          suggestion
                                        );
                                      }}
                                    >
                                      <i
                                        className="fas fa-map-pin"
                                        style={{
                                          fontSize: "14px",
                                          color: "#797631",
                                        }}
                                      />
                                      {suggestion.name}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* Location Input */}
                <div className="col-md-5 col-lg-3 ">
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

                {/* Advanced Search Buttons */}
                <button
                  className="advance-search-btn col-2 ms-1 me-1 mt-3"
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
                        if (allReadyOff === "ready") {
                          path = "/buy";
                        } else if (allReadyOff === "all") {
                          path = "/buy-off-plan";
                        } else if (allReadyOff === "off") {
                          path = "/off-plan";
                        } else {
                          path = "/listings";
                        }
                      }
                      navigate(path, {
                        state: {
                          hasFilters: true,
                        },
                      });
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
              </div>

              {/* Mobile Layout - new implementation */}
              <div className="row d-flex justify-content-center gy-2 gx-1 d-md-none">
                {/* Buy/Rent Toggle - full width on mobile */}
                <div className="col-8 col-md-12">
                  <div
                    className="mt-1 d-flex justify-content-center h-90"
                    style={{ backgroundColor: "#f7f7f7", borderRadius: "12px" }}
                  >
                    {buyRentTabs.map((tab) => (
                      <li className="nav-item" key={tab.id}>
                        <button
                          className={`nav-link flex-1 ${
                            buyRent === tab.id ? "active" : ""
                          }`}
                          id="tab-element"
                          style={{
                            fontSize: "0.8rem",
                          }}
                          onClick={() => handleBuyRent(tab.id)}
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </div>
                </div>

                {/* Search - full width on mobile */}
                <div className="col-12">
                  <div className="  d-flex  h-100 w-100 position-relative">
                    <div
                      style={{
                        backgroundColor: "#f7f7f7",
                        borderRadius: "12px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Search
                        size={18}
                        style={{
                          marginLeft: "20px",

                          color: "#888",
                          pointerEvents: "none",
                        }}
                      />
                      <input
                        id="home-page-hero-search-mobile"
                        type="text"
                        className=" w-100 border-none bg-transparent"
                        placeholder="Project Search"
                        value={heroSearchTerm}
                        onChange={(e) => setHeroSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onInput={(e) =>
                          filterFunctions?.handleSearchTerm(e.target.value)
                        }
                        onFocus={() =>
                          searchSuggestions.length > 0 &&
                          setShowSuggestions(true)
                        }
                        style={{
                          padding: "13px 15px",
                          outline: "none",
                        }}
                      />
                    </div>
                    {/* Search Suggestions Dropdown */}
                    {showSuggestions && (
                      <div
                        className="position-absolute w-100 bg-white border rounded shadow-sm"
                        style={{
                          top: "calc(100% + 5px)",
                          left: 0,
                          maxHeight: "300px",
                          overflowY: "auto",
                          zIndex: 1000,
                        }}
                      >
                        {loadingSuggestions ? (
                          <div className="p-3 text-center">
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        ) : (
                          <>
                            {searchSuggestions.length > 0 && (
                              <>
                                <div
                                  className="px-3 py-2 fw-bold text-muted"
                                  style={{
                                    fontSize: "0.85rem",
                                    backgroundColor: "#f9f9f9",
                                  }}
                                >
                                  Projects
                                </div>
                                <ul
                                  className="list-unstyled m-0"
                                  style={{
                                    borderBottom: "1px solid #e0e0e0",
                                  }}
                                >
                                  {searchSuggestions.map((suggestion) => (
                                    <li
                                      key={suggestion.id}
                                      className="px-3 py-2 cursor-pointer d-flex align-items-center gap-2"
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                          "#f7f7f7";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                          "white";
                                      }}
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        console.log(
                                          "Suggestion clicked:",
                                          suggestion.name
                                        );
                                        handleSuggestionClick(suggestion);
                                      }}
                                    >
                                      <i
                                        className="fas fa-building"
                                        style={{
                                          fontSize: "14px",
                                          color: "#797631",
                                        }}
                                      />
                                      {suggestion.name}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                            {locationSuggestions.length > 0 && (
                              <>
                                <div
                                  className="px-3 py-2 fw-bold text-muted"
                                  style={{
                                    fontSize: "0.85rem",
                                    backgroundColor: "#f9f9f9",
                                  }}
                                >
                                  Districts
                                </div>
                                <ul className="list-unstyled m-0">
                                  {locationSuggestions.map((suggestion) => (
                                    <li
                                      key={suggestion.id}
                                      className="px-3 py-2 cursor-pointer d-flex align-items-center gap-2"
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                          "#f7f7f7";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                          "white";
                                      }}
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        console.log(
                                          "Suggestion clicked:",
                                          suggestion.name
                                        );
                                        handleLocationSuggestionClick(
                                          suggestion
                                        );
                                      }}
                                    >
                                      <i
                                        className="fas fa-map-pin"
                                        style={{
                                          fontSize: "14px",
                                          color: "#797631",
                                        }}
                                      />
                                      {suggestion.name}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* Location Input - full width on mobile */}
                <div className="col-12">
                  <div className=" bootselect-multiselect">
                    <DropdownSelectLocation
                      options={locationOptions}
                      value={filterFunctions?.location}
                      onChange={filterFunctions?.handlelocation}
                      placeholder="Enter Location"
                      loading={loading}
                    />
                  </div>
                </div>

                {/* All/Ready/Off Tabs or Rent Duration - full width on mobile */}
                <div className={`col-12`}>
                  <div className=" h-80 bootselect-multiselect">
                    {buyRent === "buy" ? (
                      <div
                        className="bootselect-multiselect h-80 justify-content-center pl20  d-flex"
                        style={{
                          backgroundColor: "#f7f7f7",
                          borderRadius: "12px",
                        }}
                      >
                        {allReadyOffTabs.map((tab) => (
                          <li className="nav-item" key={tab.id}>
                            <button
                              className={`nav-link h-100 flex-1 ${
                                allReadyOff === tab.id ? "active" : ""
                              }`}
                              id="tab-element"
                              style={{
                                fontSize: "0.8rem",
                              }}
                              onClick={() => handleAllReadyOff(tab.id)}
                            >
                              {tab.label}
                            </button>
                          </li>
                        ))}
                      </div>
                    ) : (
                      <div className="bootselect-multiselect">
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
                {/* Property Type Dropdown - full width on mobile */}
                <div className="col-12">
                  <div className=" bootselect-multiselect">
                    <DropdownSelect
                      options={propertyTypesStrings}
                      value={filterFunctions?.selectedPropertyType}
                      onChange={filterFunctions?.handlepropertyType}
                      placeholder="Property Type"
                      loading={loading}
                    />
                  </div>
                </div>
                {/* Bedrooms and Bathrooms in one row on mobile */}
                <div className="col-6">
                  <div className=" bootselect-multiselect">
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
                <div className="col-6">
                  <div className=" bootselect-multiselect">
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
                {/* Price Range - full width on mobile */}
                <div className="col-12 ">
                  <button
                    type="button"
                    className="d-flex justify-content-between align-items-center border-none w-100 fw-light"
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

                  <div className="dropdown-menu dd3 w-100">
                    <div className="widget-wrapper pb25 mb0 pl20 pr20  ">
                      <h6 className="list-title text-center">Price Range</h6>
                      <div className="range-slider-style1 mb10 mt30 mx-auto ">
                        <PriceRange
                          priceRange={filterFunctions?.priceRange}
                          setPriceRange={filterFunctions?.handlePriceRange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Search and Advanced buttons - full width on mobile */}
                <div className="col-12 d-flex justify-content-between">
                  <button
                    className="advance-search-btn"
                    style={{
                      padding: "7px 7px",
                      borderRadius: "12px",
                      backgroundColor: "#f7f7f7",
                      width: "48%",
                      fontSize: "0.8rem",
                    }}
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#advanceSeachModal"
                    onClick={() => setModalOpen(true)}
                  >
                    <span className="flaticon-settings " /> Advanced
                    {activeFilterCount > 0 && (
                      <span
                        className="badge rounded-pill ms-2"
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
                  <button
                    style={{
                      paddingTop: "2px",
                      width: "48%",
                      fontSize: "0.8rem",
                    }}
                    className="advance-search-icon ud-btn btn-thm d-flex justify-content-center align-items-center"
                    type="button"
                    onClick={() => {
                      let path = "";

                      if (buyRent === "rent") {
                        path = "/rent";
                      } else if (buyRent === "buy") {
                        if (allReadyOff === "ready") {
                          path = "/buy";
                        } else if (allReadyOff === "all") {
                          path = "/buy-off-plan";
                        } else if (allReadyOff === "off") {
                          path = "/off-plan";
                        } else {
                          path = "/listings";
                        }
                      }
                      navigate(path, {
                        state: {
                          hasFilters: true,
                        },
                      });
                    }}
                  >
                    <span className="flaticon-search me-2 mt5" /> Search
                  </button>
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
          border-color: #797631;
        }
        #backdrop-blur {
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }
        @media (max-width: 767.98px) {
          .nav-item {
            padding: 0 10px;
          }
          .nav-link {
            padding: 10px 5px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroContent;
