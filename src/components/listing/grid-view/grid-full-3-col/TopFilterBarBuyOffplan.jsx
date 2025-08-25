import React, { useEffect, useState } from "react";
import ListingStatus from "../../sidebar/ListingStatus";
// import PropertyType from "../../sidebar/PropertyType";
// import PriceRange from "../../sidebar/PriceRange";
// import Bedroom from "../../sidebar/Bedroom";
// import Bathroom from "../../sidebar/Bathroom";
import Select from "react-select";
import { Search } from "lucide-react";

const customStyles = {
  option: (styles, { isFocused, isSelected, isHovered }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "#797631"
        : isHovered
        ? "#DDE5C2"
        : isFocused
        ? "#DDE5C2"
        : undefined,
    };
  },
};

// const locationOptions = [
//   { value: "All Cities", label: "All Cities" },
//   { value: "California", label: "California" },
//   { value: "Los Angeles", label: "Los Angeles" },
//   { value: "New Jersey", label: "New Jersey" },
//   { value: "New York", label: "New York" },
//   { value: "San Diego", label: "San Diego" },
//   { value: "San Francisco", label: "San Francisco" },
//   { value: "Texas", label: "Texas" },
// ];

const TopFilterBar = ({
  filterFunctions,
  setDataFetched,
  setCurrentSortingOption,
  colstyle,
  setColstyle,
  locationOptions = [],
  saleStatuses,
  propertyTypes,
  setPosthandover,
  posthandover,
  selectedCities,
  setSelectedCities,
  activeFilterCount,
}) => {
  // Local state with default from filterFunctions
  const [searchTerm, setSearchTerm] = useState(
    filterFunctions?.searchTerm || ""
  );

  // Sync local state when filterFunctions.searchTerm changes
  useEffect(() => {
    if (filterFunctions?.searchTerm !== undefined) {
      setSearchTerm(filterFunctions.searchTerm);
    }
  }, [filterFunctions?.searchTerm]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      filterFunctions?.handleSearchTerm(searchTerm);
    }
  };

  const handleCityChange = (city) => {
    setSelectedCities((prev) => {
      // Check if city with this value already exists
      const exists = prev.some((item) => item.value === city.value);

      if (exists) {
        // Remove the city if it exists
        return prev.filter((item) => item.value !== city.value);
      } else {
        // Add the new city if it doesn't exist
        return [...prev, city];
      }
    });
  };

  const requiredNames = [
    "Palm Jumeirah",
    "Dubai Marina",
    "Dubai Islands",
    "Meydan City",
    "Dubai Creek Harbour",
    "Dubai Maritime City",
  ];

  return (
    <>
      <div className="row">
        <div className="col-xl-9 d-none d-lg-block">
          <div className="dropdown-lists">
            <ul className="p-0 text-center  text-xl-start ">
              {/* End li Listing Status */}

              {/* <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Property Type <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <h6 className="list-title">Property Type</h6>
                  <div className="checkbox-style1">
                    <PropertyType filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm dropdown-toggle"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li> */}
              {/* End li Property Type */}

              {/* <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Price <i className="fa fa-angle-down ms-2" />
              </button>

              <div className="dropdown-menu dd3">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  <h6 className="list-title">Price Range</h6>
                  <div className="range-slider-style1">
                    <PriceRange filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn3"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li> */}
              {/* End li Price */}
              <li
                className="list-inline-item position-relative font-bold "
                style={{ width: "160px" }}
              >
                <Select
                  name="colors"
                  styles={customStyles}
                  options={locationOptions}
                  className="select-custom filterSelect"
                  classNamePrefix="select"
                  value={{
                    value: filterFunctions?.location,
                    label:
                      locationOptions.find(
                        (option) => option.value === filterFunctions?.location
                      )?.label || "All Locations",
                  }}
                  onChange={(e) => {
                    setDataFetched(false);
                    console.log(e.value);
                    filterFunctions?.handlelocation(e.value);
                  }}
                  required
                />
              </li>

              <li
                className="list-inline-item position-relative font-bold"
                style={{ width: "190px" }}
              >
                <Select
                  name="colors"
                  styles={customStyles}
                  options={propertyTypes}
                  className="select-custom filterSelect"
                  classNamePrefix="select"
                  value={{
                    value: filterFunctions?.selectedPropertyType,
                    label:
                      propertyTypes.find(
                        (option) =>
                          option.value === filterFunctions?.selectedPropertyType
                      )?.label || "All Property Types",
                  }}
                  onChange={(e) => {
                    setDataFetched(false);
                    console.log(e.value);
                    filterFunctions?.handlepropertyType(e.value);
                  }}
                  required
                />
              </li>
              <li
                className="list-inline-item position-relative font-bold"
                style={{ width: "190px" }}
              >
                <div className="form-style2 position-relative">
                  <Search
                    size={18}
                    className="position-absolute"
                    style={{
                      top: "50%",
                      left: "14px",
                      transform: "translateY(-50%)",
                      color: "#888",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    type="text"
                    className="form-control border-none"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                      padding: "10px 10px 10px 40px",
                      backgroundColor: "white",
                    }}
                  />
                </div>
              </li>

              <li className="list-inline-item position-relative pt-1 ">
                <button
                  type="button"
                  className="open-btn mb10 position-relative d-flex align-items-center border justify-content-center "
                  style={{
                    color: "#797631",
                    width: "45px",
                    height: "45px",
                    maringBottom: 0,
                  }}
                  onClick={() => filterFunctions?.handleSearchTerm(searchTerm)}
                >
                  <i
                    className="flaticon-search mt-1 "
                    style={{
                      color: "#797631",
                    }}
                  />
                </button>
              </li>

              {/* <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Beds / Baths <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu dd4 pb20">
                <div className="widget-wrapper pl20 pr20">
                  <h6 className="list-title">Bedrooms</h6>
                  <div className="d-flex">
                    <Bedroom filterFunctions={filterFunctions}/>
                  </div>
                </div>

                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  <h6 className="list-title">Bathrooms</h6>
                  <div className="d-flex">
                    <Bathroom filterFunctions={filterFunctions}/>
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn4"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li> */}
              {/* End bed and bathroom check */}
              <li className="list-inline-item position-relative">
                <button
                  type="button"
                  className="open-btn mb15 dropdown-toggle "
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  {" "}
                  {filterFunctions?.listingStatus === "All"
                    ? "All Status"
                    : filterFunctions?.listingStatus}{" "}
                  <i className="fa fa-angle-down ms-2" />
                </button>
                <div className="dropdown-menu">
                  <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                    <h6 className="list-title">Listing Status</h6>
                    <div className="radio-element">
                      <ListingStatus
                        setDataFetched={setDataFetched}
                        filterFunctions={filterFunctions}
                        saleStatuses={saleStatuses}
                      />
                    </div>
                  </div>
                  <div className="text-end mt10 pr10">
                    <button
                      type="button"
                      className="done-btn ud-btn btn-thm drop_btn"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </li>
              <li
                className="list-inline-item position-relative "
                style={{ width: "135px" }}
              >
                <button
                  type="button"
                  className="open-btn mb15 position-relative d-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#advanceSeachModal"
                >
                  <i className="flaticon-settings me-2 mt-1" /> Advanced
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
              </li>
            </ul>
          </div>
        </div>
        {/* End .col-9 */}

        <div className="col-xl-3 mb-md-0 mb-3 mt-md-2 ">
          <div className="page_control_shorting   d-flex align-items-center justify-content-center justify-content-sm-end">
            <div className="pcs_dropdown pr10 d-flex align-items-center">
              <span style={{ minWidth: "60px" }}>Sort by</span>
              <select
                className="form-select"
                onChange={(e) =>
                  setCurrentSortingOption &&
                  setCurrentSortingOption(e.target.value)
                }
              >
                <option>Newest</option>
                <option>Price Low</option>
                <option>Price High</option>
              </select>
            </div>
            <div
              className={`pl15 pr15  bdrr1 d-none d-md-block  cursor ${
                !colstyle ? "menuActive" : "#"
              } `}
              onClick={() => setColstyle(false)}
            >
              Grid
            </div>
            <div
              className={`pl15 d-none d-md-block  cursor ${
                colstyle ? "menuActive" : "#"
              }`}
              onClick={() => setColstyle(true)}
            >
              List
            </div>
          </div>
        </div>

        <div className="col-xl-12 d-none d-lg-block">
          <div className="dropdown-lists">
            <ul className="p-0 text-center d-flex align-items-center text-xl-start ">
              <li
                className="list-inline-item position-relative "
                style={{ paddingBottom: "0.75rem" }}
              >
                <div
                  type="button"
                  className="open-btn  position-relative d-flex gap-1  align-items-center form-check form-switch custom-switch "
                  style={{
                    paddingTop: "0.4rem",
                    paddingBottom: "0.4rem",
                  }}
                >
                  <input
                    className="form-check-input ms-1 me-2 "
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    style={{
                      maringBottom: "0px",
                      border: "none",
                    }}
                    onChange={(e) =>
                      setPosthandover(e.target.checked ? true : false)
                    }
                  />
                  <label
                    className="form-check-label "
                    htmlFor="flexSwitchCheckDefault"
                  >
                    {posthandover ? "Post-handover" : "Pre-handover"}
                  </label>
                </div>
              </li>
              {locationOptions
                .filter((location) => requiredNames.includes(location.label))
                .map((city) => (
                  <li
                    key={city.value}
                    className="list-inline-item position-relative m-0 text-center "
                    style={{ paddingLeft: "5px", paddingRight: "5px" }}
                  >
                    <input
                      type="checkbox"
                      id={"check-" + city.value} // Added id attribute
                      className="city-checkbox"
                      name={"check-" + city.value}
                      checked={
                        selectedCities.find((c) => c.label === city.label) ||
                        false
                      }
                      onChange={() => {
                        handleCityChange(city);
                      }}
                    />
                    <label
                      htmlFor={"check-" + city.value}
                      className="city-checkbox-label"
                    >
                      <div
                        className={`open-btn open-btn-city mb-3 d-flex align-items-center justify-content-center ${
                          selectedCities.find((c) => c.label === city.label)
                            ? "selected"
                            : ""
                        }`}
                        style={{ width: "100%" }}
                      >
                        {city.label}
                      </div>
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        {/* End .col-3 */}
      </div>
    </>
  );
};

export default TopFilterBar;
