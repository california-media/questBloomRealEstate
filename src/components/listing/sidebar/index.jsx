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

const ListingSidebar = ({
  filterFunctions,
  propertyTypes,
  locationOptions,
  facilityOptions,
  searchTerm,
  loading,
  saleStatuses = [],
  setDataFetched,
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
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    if (!filterFunctions) return;

    if (filterFunctions.selectedPropertyType)
      setPropertyType(filterFunctions.selectedPropertyType);

    if (filterFunctions.priceRange) setPriceRange(filterFunctions.priceRange);

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
  ]);

  const handleSearch = () => {
    setDataFetched(false); ////
    filterFunctions?.handlepropertyType(propertyType);
    filterFunctions?.handlePropertyId(propertyId);
    filterFunctions?.handlelistingStatus(listingStatus);
    filterFunctions?.handlelocation(location);
    filterFunctions?.handlesquirefeet(squareFeet);
    filterFunctions?.handlebedrooms(bedroomCount);
    filterFunctions?.handleBathrooms(bathroomCount);
    filterFunctions?.handlecategories(amenities);
    filterFunctions?.handlepriceRange(priceRange);
  };

  const formattedStatuses = [
    { id: "flexRadioDefault0", label: "All", defaultChecked: true },
    ...saleStatuses.map((status, index) => ({
      id: `flexRadioDefault${index + 1}`,
      label: status,
    })),
  ];
  return (
    <div className="list-sidebar-style1">
      {/* End .widget-wrapper */}

      <div className="widget-wrapper bdrb1 pb25 mb0 ">
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
                  setDataFetched(false);
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
            setDataFetched(false);
            setPriceRange([0, 10000000]);
            setSquareFeet([0, 0]);
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
