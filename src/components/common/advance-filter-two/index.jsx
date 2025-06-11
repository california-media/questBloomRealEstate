import Select from "react-select";
import PriceRange from "./PriceRange";
import Bedroom from "./Bedroom";
import Bathroom from "./Bathroom";
import Amenities from "./Amenities";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdvanceFilterModal = ({
  filterFunctions,
  propertyTypes,
  locationOptions,
  facilityOptions,
  searchTerm,
  setPageNumber,
  loading,
  setDataFetched,
}) => {
  const navigate = useNavigate();
  // console.log(filterFunctions?.location, locationOptions)
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
  const [propertyType, setPropertyType] = useState(
    filterFunctions?.selectedPropertyType || "All Property Types"
  );
  const [priceRange, setPriceRange] = useState(
    filterFunctions?.priceRange || [0, 10000000]
  );
  const [propertyId, setPropertyId] = useState(
    filterFunctions?.propertyId || ""
  );
  const [location, setLocation] = useState(
    filterFunctions?.location || "All Locations"
  );
  const [squareFeet, setSquareFeet] = useState(
    filterFunctions?.squirefeet.length === 0
      ? [0, 0]
      : filterFunctions?.squirefeet
  );
  const [bedroomCount, setBedroomCount] = useState(
    filterFunctions?.bedrooms || 0
  );
  const [amenities, setAmenities] = useState(filterFunctions?.categories || []);

  const handleSearch = () => {
    setDataFetched(false); ////
    console.log("requesting", propertyType, propertyId, location, squareFeet);
    filterFunctions?.handlepropertyType(propertyType);
    filterFunctions?.handlePropertyId(propertyId);
    filterFunctions?.handlelocation(location);
    filterFunctions?.handlesquirefeet(squareFeet);
    filterFunctions?.handlebedrooms(bedroomCount);
    filterFunctions?.handlecategories(amenities);
    filterFunctions?.handlepriceRange(priceRange);
    if (setPageNumber) setPageNumber(1);
    searchTerm
      ? navigate("/search-properties/" + searchTerm)
      : navigate("/search-properties/");
  };

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
            More Filter
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        {/* End modal-header */}

        <div className="modal-body pb-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper">
                <h6 className="list-title mb20">Price Range</h6>
                <div className="range-slider-style modal-version">
                  <PriceRange
                    setPriceRange={setPriceRange}
                    priceRange={priceRange}
                    filterFunctions={filterFunctions}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Type</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={propertyTypes[0] || null}
                    name="colors"
                    options={propertyTypes}
                    styles={customStyles}
                    value={{
                      value: propertyType,
                      label: propertyType,
                    }}
                    onChange={(e) => setPropertyType(e.value)}
                    className="select-custom"
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div>
            {/* End .col-6 */}

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Property ID</h6>
                <div className="form-style2">
                  <input
                    type="text"
                    className="form-control property-id-reset"
                    placeholder="RT04949213"
                    onChange={(e) => setPropertyId(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* End .col-6 */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bedrooms</h6>
                <div className="d-flex">
                  <Bedroom
                    setBedroomCount={setBedroomCount}
                    bedroomCount={bedroomCount}
                  />
                </div>
              </div>
            </div>
            {/* End .col-md-6 */}

            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bathrooms</h6>
                <div className="d-flex">
                  <Bathroom filterFunctions={filterFunctions} />
                </div>
              </div>
            </div> */}
            {/* End .col-md-6 */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Location</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={locationOptions[0] || null}
                    name="colors"
                    styles={customStyles}
                    options={locationOptions}
                    className="select-custom filterSelect"
                    value={{
                      value: location,
                      label: locationOptions.find(
                        (option) => option.value === location
                      )?.label,
                    }}
                    classNamePrefix="select"
                    onChange={(e) => setLocation(e.value)}
                    required
                  />
                </div>
              </div>
            </div>
            {/* End .col-md-6 */}

            <div className="col-sm-6">
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
            </div>
            {/* End .col-md-6 */}
          </div>
          {/* End .row */}

          {/* <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper mb0">
                <h6 className="list-title mb10">Amenities</h6>
              </div>
            </div>

            {loading ? (
              <div
                className="row"
                style={{ marginTop: "100px", marginBottom: "100px" }}
              >
                <div className="spinner-border mx-auto " role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : facilityOptions.length === 0 ? (
              <h5
                style={{ marginTop: "100px", marginBottom: "100px" }}
                className=" text-center "
              >
                No Amenities found.
              </h5>
            ) : (
              <Amenities
                facilityOptions={facilityOptions}
                amenities={amenities}
                setAmenities={setAmenities}
              />
            )}
          </div> */}
        </div>
        {/* End modal body */}

        <div className="modal-footer justify-content-between">
          <button
            className="reset-button"
            data-bs-dismiss="modal"
            onClick={() => {
              filterFunctions?.resetFilter();
              setBedroomCount(0);
              setSquareFeet([0, 0]);
              setAmenities([]);
              setLocation("All Locations");
              setPropertyId("");
              setPropertyType("All Property Types");
              setDataFetched(false);
              setPageNumber(1);
              setPriceRange([0, 10000000]);
              setSquareFeet([0, 0]);
            }}
          >
            <span className="flaticon-turn-back" />
            <u>Reset all filters</u>
          </button>
          <div className="btn-area">
            <button
              type="button"
              className="ud-btn btn-thm"
              data-bs-dismiss="modal"
              onClick={handleSearch}
            >
              <span className="flaticon-search align-text-top pr10" />
              Search
            </button>
          </div>
        </div>
        {/* End modal-footer */}
      </div>
    </div>
  );
};

export default AdvanceFilterModal;
