import React from "react";
import SearchBox from "./SearchBox";
import ListingStatus from "./ListingStatus";
import PropertyType from "./PropertyType";
import PriceSlider from "./PriceRange";
import Location from "./Location";
import SquareFeet from "./SquareFeet";
import YearBuilt from "./YearBuilt";
import OtherFeatures from "./OtherFeatures";

import Select from "react-select";
import PriceRange from "./PriceRange";
import Bedroom from "./Bedroom";
import Bathroom from "./Bathroom";

import { useEffect, useState } from "react";
import DropdownSelectYearBuild from "@/components/common/DropdownSelectYearBuild";
import PercentagePreHandover from "@/components/common/PercentagePreHandover";
import { Search, X } from "lucide-react";

const ListingSidebar = ({
  filterFunctions,
  propertyTypes,
  locationOptions,
  saleStatuses = [],
  searchTerm,
  setSearchTerm,
  setPosthandover,
  posthandover,
}) => {
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
  ///local state befrore actually applying filter

  const [propertyType, setPropertyType] = useState("All Property Types");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [propertyId, setPropertyId] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [listingStatus, setListingStatus] = useState("All");
  const [squareFeet, setSquareFeet] = useState([0, 0]);
  const [bedroomCount, setBedroomCount] = useState(0);
  const [bathroomCount, setBathroomCount] = useState(0);
  const [percentagePreHandover, setPercentagePreHandover] = useState(0);
  const [yearBuild, setYearBuild] = useState(50000);
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    if (!filterFunctions) return;

    if (filterFunctions.selectedPropertyType)
      setPropertyType(filterFunctions.selectedPropertyType);

    if (filterFunctions.priceRange) setPriceRange(filterFunctions.priceRange);
    if (filterFunctions.yearBuild) setYearBuild(filterFunctions.yearBuild);
    if (filterFunctions.percentagePreHandover)
      setPercentagePreHandover(filterFunctions.percentagePreHandover);
    if (filterFunctions.propertyId !== undefined)
      setPropertyId(filterFunctions.propertyId);

    if (filterFunctions.location) setLocation(filterFunctions.location);

    if (filterFunctions.listingStatus)
      setListingStatus(filterFunctions.listingStatus);

    if (Array.isArray(filterFunctions.squirefeet))
      setSquareFeet(
        filterFunctions.squirefeet.length === 0
          ? [0, 0]
          : filterFunctions.squirefeet
      );

    if (filterFunctions.bedrooms !== undefined)
      setBedroomCount(filterFunctions.bedrooms);

    if (filterFunctions.bathrooms !== undefined)
      setBathroomCount(filterFunctions.bathrooms);

    if (Array.isArray(filterFunctions.categories))
      setAmenities(filterFunctions.categories);
  }, [
    filterFunctions?.selectedPropertyType,
    filterFunctions?.priceRange,
    filterFunctions?.propertyId,
    filterFunctions?.location,
    filterFunctions?.listingStatus,
    filterFunctions?.squirefeet,
    filterFunctions?.bedrooms,
    filterFunctions?.bathrooms,
    filterFunctions?.categories,
    filterFunctions?.percentagePreHandover,
    filterFunctions?.yearBuild,
  ]);

  const handleSearch = () => {
    filterFunctions?.handlepropertyType(propertyType);
    filterFunctions?.handlePropertyId(propertyId);
    filterFunctions?.handlelistingStatus(listingStatus);
    filterFunctions?.handlelocation(location);
    filterFunctions?.handlesquirefeet(squareFeet);
    filterFunctions?.handlebedrooms(bedroomCount);
    filterFunctions?.handleBathrooms(bathroomCount);
    filterFunctions?.handlecategories(amenities);
    filterFunctions?.handlepriceRange(priceRange);
    filterFunctions?.handlePercentagePreHandover(percentagePreHandover);
    filterFunctions?.handleYearBuild(yearBuild);
  };

  const formattedStatuses = [
    { id: "flexRadioDefault0", label: "All", defaultChecked: true },
    ...saleStatuses.map((status, index) => ({
      id: `flexRadioDefault${index + 1}`,
      label: status,
    })),
  ];
  return (
    <div className="list-sidebar-style1 ">
      {/* End .widget-wrapper */}

      <div className="widget-wrapper bdrb1 pb25 mb20 mb0 ">
        <h6 className="list-title">Search</h6>
        <div className="d-flex align-items-center gap-2 mb20">
          <div className="form-style2 flex-grow-1 position-relative">
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
              placeholder="Project Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "10px 10px 10px 40px",
                backgroundColor: "white",
              }}
            />
            <X
              size={18}
              className="position-absolute "
              onClick={() => setSearchTerm("")}
              style={{
                cursor: "pointer",
                top: "50%",
                right: "14px",
                transform: "translateY(-50%)",
                color: "#888",
              }}
            />
          </div>

          <button
            type="button"
            data-bs-dismiss="offcanvas"
            className="open-btn  position-relative d-flex align-items-center border justify-content-center "
            style={{
              color: "#797631",
              width: "45px",
              height: "45px",
              maringBottom: 0,
              borderRadius: "50%",
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
        </div>
        <h6 className="list-title">Handover</h6>
        <div
          className=" justify-content-start d-flex  align-items-center form-check form-switch custom-switch "
          style={{
            margin: 0,
            paddingLeft: 0,
          }}
        >
          <input
            className="form-check-input ms-1 me-2 "
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            style={{
              border: "none",
            }}
            onChange={(e) => setPosthandover(e.target.checked ? true : false)}
          />
          <label className="form-check-label " htmlFor="flexSwitchCheckDefault">
            {posthandover ? "Post-handover" : "Pre-handover"}
          </label>
        </div>
      </div>

      <div className="widget-wrapper  pb25 mb0 ">
        <h6 className="list-title">Listing Status</h6>
        <div className="radio-element">
          {formattedStatuses.map((option) => (
            <div
              className="form-check d-flex align-items-center mb10"
              key={option.id}
            >
              <input
                className="form-check-input"
                type="radio"
                checked={listingStatus == option.label}
                onChange={() => {
                  setListingStatus(option.label);
                }}
              />
              <label className="form-check-label" htmlFor={option.id}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* End .widget-wrapper */}

      <div className="widget-wrapper ">
        <h6 className="list-title pt20">Property Type</h6>
        <div className="checkbox-style1 ">
          <PropertyType
            propertyTypes={propertyTypes}
            setPropertyType={setPropertyType}
            propertyType={propertyType}
          />
        </div>
      </div>

      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Price Range</h6>
        {/* Range Slider Desktop Version */}
        <div className="range-slider-style1">
          <PriceRange
            setPriceRange={setPriceRange}
            priceRange={priceRange}
            filterFunctions={filterFunctions}
          />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Bedrooms</h6>
        <div className="d-flex">
          <Bedroom
            setBedroomCount={setBedroomCount}
            bedroomCount={bedroomCount}
          />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Bathrooms</h6>
        <div className="d-flex">
          <Bathroom
            setBathroomCount={setBathroomCount}
            bathroomCount={bathroomCount}
          />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper advance-feature-modal">
        <h6 className="list-title">Location</h6>
        <div className="form-style2 input-group">
          <Select
            name="colors"
            styles={customStyles}
            options={locationOptions}
            className="select-custom filterSelect"
            value={{
              value: location,
              label: locationOptions.find((option) => option.value === location)
                ?.label,
            }}
            classNamePrefix="select"
            onChange={(e) => setLocation(e.value)}
            required
          />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Square Feet</h6>
        <div className="space-area">
          <div className="d-flex align-items-center justify-content-between">
            <div className="form-style1">
              <input
                type="number"
                className="form-control filterInput"
                onChange={(e) =>
                  setSquareFeet([Number(e.target.value), squareFeet[1]])
                }
                placeholder="Min."
                id="minFeet3"
              />
            </div>
            <span className="dark-color">-</span>
            <div className="form-style1">
              <input
                type="number"
                className="form-control filterInput"
                placeholder="Max"
                id="maxFeet3"
                onChange={(e) =>
                  setSquareFeet([squareFeet[0], Number(e.target.value)])
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="widget-wrapper">
        <h6 className="list-title">Payment Plan</h6>
        <div className="form-style2">
          <button
            type="button"
            className=" d-flex justify-content-between align-items-center border-none w-100 fw-light"
            style={{
              padding: "15px 13px",
              borderRadius: "12px",
            }}
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
          >
            Payment Plan <i className="fa fa-angle-down ms-2 text-gray" />
          </button>

          <div className="dropdown-menu dd3">
            <div className="widget-wrapper  pb25 mb0 pl20 pr20">
              <h5 className="mb30 mt20 fw-medium">Percentage pre-handover</h5>
              {/* Range Slider Desktop Version */}
              <div className="range-slider-style1 mb10 mt20">
                <PercentagePreHandover
                  percentagePreHandover={percentagePreHandover}
                  setPercentagePreHandover={setPercentagePreHandover}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="widget-wrapper  ">
        <h6 className="list-title">Handover Date</h6>
        <div className="form-style2  ">
          <button
            type="button"
            className=" border-none w-100  fw-light"
            style={{
              padding: "9px 0px",
              borderRadius: "12px",
              backgroundColor: "buttonface",
            }}
          >
            <DropdownSelectYearBuild
              options={Array.from({ length: 11 }, (_, i) =>
                (2023 + i).toString()
              )}
              value={
                yearBuild.toString() !== "50000" ? yearBuild.toString() : ""
              }
              onChange={(val) => setYearBuild(parseInt(val || 0))}
              placeholder="Handover"
            />
          </button>
        </div>
      </div>
      {/* End .widget-wrapper */}

      {/* <div className="widget-wrapper">
        <h6 className="list-title">Year Built</h6>
        <YearBuilt filterFunctions={filterFunctions} />
      </div> */}
      {/* End .widget-wrapper */}

      {/* End .widget-wrapper */}

      <div className="widget-wrapper mb20">
        <div className="btn-area d-grid align-items-center">
          <button
            className="ud-btn btn-thm"
            onClick={handleSearch}
            data-bs-dismiss="offcanvas"
          >
            <span className="flaticon-search align-text-top pr10" />
            Search
          </button>
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="reset-area d-flex align-items-center justify-content-between">
        <div
          className="reset-button cursor"
          onClick={() => {
            filterFunctions?.resetFilter();
            setBedroomCount(0);
            setBathroomCount(0);
            setListingStatus("All");
            setSquareFeet([0, 0]);
            setAmenities([]);
            setLocation("All Locations");
            setPropertyId("");
            setPropertyType("All Property Types");
            setPriceRange([0, 10000000]);
            setPercentagePreHandover(0);
            setYearBuild(50000);
          }}
          data-bs-dismiss="offcanvas"
        >
          <span className="flaticon-turn-back" />
          <u>Reset all filters</u>
        </div>
      </div>
    </div>
  );
};

export default ListingSidebar;
