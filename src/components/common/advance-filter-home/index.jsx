import Select from "react-select";
import PriceRange from "./PriceRange";
import Bedroom from "./Bedroom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bathroom from "./Bathroom";

const AdvanceFilterModal = ({
  filterFunctions,
  propertyTypes,
  locationOptions,
  facilityOptions,
  searchTerm,
  loading,
  setDataFetched,
  buyRent,
  allReadyOff,
  handleAllReadyOff,
  handleBuyRent,
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

  const [propertyType, setPropertyType] = useState("All Property Types");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [propertyId, setPropertyId] = useState("");
  const [location, setLocation] = useState("All Locations");
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
    filterFunctions?.squirefeet,
    filterFunctions?.bedrooms,
    filterFunctions?.bathrooms,
    filterFunctions?.categories,
  ]);

  const handleSearch = () => {
    setDataFetched(false); ////
    console.log("requesting", propertyType, propertyId, location, squareFeet);
    filterFunctions?.handlepropertyType(propertyType);
    filterFunctions?.handlePropertyId(propertyId);
    filterFunctions?.handlelocation(location);
    filterFunctions?.handlesquirefeet(squareFeet);
    filterFunctions?.handlebedrooms(bedroomCount);
    filterFunctions?.handleBathrooms(bathroomCount);
    filterFunctions?.handlecategories(amenities);
    filterFunctions?.handlepriceRange(priceRange);
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
          {/* <div className="row">
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
          </div> */}
          {/* End .row */}

          <div className="row">
            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Type</h6>
                <div className="form-style2 input-group">
                  <Select
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
            </div> */}
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
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bathrooms</h6>
                <div className="d-flex">
                  <Bathroom
                    setBathroomCount={setBathroomCount}
                    bathroomCount={bathroomCount}
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
            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Location</h6>
                <div className="form-style2 input-group">
                  <Select
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
            </div> */}
            {/* End .col-md-6 */}

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
              setBathroomCount(0);
              setSquareFeet([0, 0]);
              setAmenities([]);
              setLocation("All Locations");
              setPropertyId("");
              setPropertyType("All Property Types");
              setDataFetched(false);
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
