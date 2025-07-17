import Select from "react-select";
import PriceRange from "./PriceRange";
import Bedroom from "./Bedroom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bathroom from "./Bathroom";
import DropdownSelect from "../DropdownSelect";
import PercentagePreHandover from "../PercentagePreHandover";
import DropdownSelectYearBuild from "../DropdownSelectYearBuild";

const AdvanceFilterModal = ({
  filterFunctions,
  propertyTypes,
  locationOptions,
  facilityOptions,
  loading,
  setDataFetched,
  buyRent,
  allReadyOff,
  modalOpen,
  handleAllReadyOff,
  handleBuyRent,
}) => {
  const navigate = useNavigate();

  ///local state befrore actually applying filter

  const [propertyType, setPropertyType] = useState("All Property Types");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [propertyId, setPropertyId] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [squareFeet, setSquareFeet] = useState([0, 0]);
  const [bedroomCount, setBedroomCount] = useState(0);
  const [bathroomCount, setBathroomCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [yearBuild, setYearBuild] = useState(50000);

  function setFromStore() {
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
    if (filterFunctions.yearBuild) setYearBuild(filterFunctions.yearBuild);

    if (filterFunctions.bedrooms !== undefined)
      setBedroomCount(filterFunctions.bedrooms);
    if (filterFunctions.searchTerm !== undefined) {
      setSearchTerm(filterFunctions.searchTerm);
    }

    if (filterFunctions.bathrooms !== undefined)
      setBathroomCount(filterFunctions.bathrooms);

    if (Array.isArray(filterFunctions.categories))
      setAmenities(filterFunctions.categories);
  }

  useEffect(() => {
    if (!modalOpen) {
      setFromStore();
    }
  }, [modalOpen]);

  useEffect(() => {
    setFromStore();
  }, [
    filterFunctions?.selectedPropertyType,
    filterFunctions?.priceRange,
    filterFunctions?.propertyId,
    filterFunctions?.location,
    filterFunctions?.squirefeet,
    filterFunctions?.bedrooms,
    filterFunctions?.bathrooms,
    filterFunctions?.categories,
    filterFunctions?.searchTerm,
    filterFunctions?.yearBuild,
  ]);

  ///ONLY for home page advance filter to reset local state
  // useEffect(() => {
  //   const modal = document.getElementById("advanceSeachModal");
  //   console.log("modal closed");
  //   const handleModalClose = () => {
  //     // Your function to run when modal closes
  //     setFromStore();
  //   };

  //   modal.addEventListener("hidden.bs.modal", handleModalClose);

  //   // Cleanup
  //   return () => {
  //     modal.removeEventListener("hidden.bs.modal", handleModalClose);
  //   };
  // }, []);

  const handleSearch = () => {
    filterFunctions?.handlepropertyType(propertyType);
    filterFunctions?.handlePropertyId(propertyId);
    filterFunctions?.handlelocation(location);
    filterFunctions?.handlesquirefeet(squareFeet);
    filterFunctions?.handlebedrooms(bedroomCount);
    filterFunctions?.handleBathrooms(bathroomCount);
    filterFunctions?.handlecategories(amenities);
    filterFunctions?.handlepriceRange(priceRange);
    filterFunctions?.handleSearchTerm(searchTerm);
    filterFunctions?.handleYearBuild(yearBuild);

    // let path = "";

    // if (buyRent === "rent") {
    //   path = "/rent";
    // } else if (buyRent === "buy") {
    //   if (allReadyOff === "ready") {
    //     path = "/buy";
    //   } else if (allReadyOff === "off") {
    //     path = "/off-plan";
    //   } else {
    //     path = "/listings";
    //   }
    // }

    // navigate(path);
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
            <div className="col-sm-12">
              <div className="widget-wrapper">
                <h6 className="list-title">Search Property</h6>
                <div className="form-style2">
                  <input
                    type="text"
                    className="form-control border-none"
                    placeholder="Search"
                    value={searchTerm}
                    onInput={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: "13px 15px",
                      backgroundColor: "ButtonFace",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
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
                        type="text"
                        value={squareFeet[0]}
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
                        type="text"
                        value={squareFeet[1]}
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

          <div className="row ">
            {buyRent === "buy" && allReadyOff !== "ready" && (
              <>
                <div className="col-sm-6">
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
                            yearBuild.toString() !== "50000"
                              ? yearBuild.toString()
                              : ""
                          }
                          onChange={(val) => setYearBuild(parseInt(val || 0))}
                          placeholder="Handover"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
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
                        Payment Plan{" "}
                        <i className="fa fa-angle-down ms-2 text-gray" />
                      </button>

                      <div className="dropdown-menu dd3">
                        <div className="widget-wrapper  pb25 mb0 pl20 pr20">
                          <h5 className="mb30 mt20 fw-medium">
                            Percentage pre-handover
                          </h5>
                          {/* Range Slider Desktop Version */}
                          <div className="range-slider-style1 mb10 mt20">
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
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* <div className="row">
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
              setSearchTerm("");
              setYearBuild(50000);
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
              Apply
            </button>
          </div>
        </div>
        {/* End modal-footer */}
      </div>
    </div>
  );
};

export default AdvanceFilterModal;
