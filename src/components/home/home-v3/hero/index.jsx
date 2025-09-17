import AdvanceFilterModal from "@/components/common/advance-filter-home";
import HeroContent from "./HeroContent";
import usePropertyStore from "@/store/propertyStore";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import adminApi from "@/api/adminApi";
import AnimatedText from "../../home-v2/hero/AnimatedText";
const hardcoded_facilities = ["Swimming Pool"];

const Hero = ({ HeroTitle }) => {
  const [modalOpen, setModalOpen] = useState(false);
  ///ONLY for home page advance filter to reset local state
  useEffect(() => {
    const modal = document.getElementById("advanceSeachModal");
    const handleModalClose = () => {
      // Your function to run when modal closes
      setModalOpen(false);
    };

    modal.addEventListener("hidden.bs.modal", handleModalClose);

    // Cleanup
    return () => {
      modal.removeEventListener("hidden.bs.modal", handleModalClose);
    };
  }, []);

  const {
    propertyId,
    selectedPropertyType,
    priceRange,
    facilityOptions,
    location,
    categories,
    bedrooms,
    squirefeet,
    propertyTypes,
    setListings,
    setDataFetched,
    locationOptions,
    setLocationOptions,
    setPropertyTypes,
    setFacilityOptions,
    setSaleStatuses,
    handlePropertyType,
    handlePriceRange,
    handleLocation,
    handleCategories,
    handleBedrooms,
    handleBathrooms,
    handleSquirefeet,
    handleYearBuild,
    handlePropertyId,
    handleListingStatus,
    listingStatus,
    resetAllFilters,
    shouldFetchData,
    saleStatuses,
    handlePercentagePreHandover,
    bathrooms,
    offplanBuyLocationOptions,
    setOffplanBuyLocationOptions,
    offplanBuyLocation,
    handleOffplanBuyLocation,
    percentagePreHandover,
    handleRentDuration,
    rentDuration,
    yearBuild,
    rentalLocationOptions,
    setRentalLocationOptions,
    rentalLocation,
    handleRentalLocation,
    searchTerm,
    handleSearchTerm,
    buyLocationOptions,
    setBuyLocationOptions,
    handleAdminPropertyType,
    adminPropertyType,
    buyLocation,
    handleBuyLocation,
    getHomeFilterCount,
  } = usePropertyStore();
  const [buyRent, setBuyRent] = useState("buy");
  const [loading, setLoading] = useState(true);
  const [allReadyOff, setAllReadyOff] = useState("all");
  const [adminPropertyTypeOptions, setAdminPropertyTypeOptions] = useState([]);
  const [offPlanPropertyTypeOptions, setOffPlanPropertyTypeOptions] = useState(
    []
  );

  const handleAllReadyOff = (tab) => {
    // handlePropertyType("All Property Types");
    setAllReadyOff(tab);
  };

  const handleBuyRent = (tab) => {
    // handlePropertyType("All Property Types");
    setBuyRent(tab);
  };
  const resetFilter = () => {
    // Reset all store filters
    resetAllFilters();
    document.querySelectorAll(".filterInput").forEach(function (element) {
      element.value = null;
    });

    document.querySelectorAll(".filterInput").forEach(function (element) {
      element.value = null;
    });

    document.querySelectorAll(".property-id-reset").forEach(function (element) {
      element.value = "";
    });
  };
  useEffect(() => {
    resetFilter();
  }, []);

  // Filter functions object for components that need access to handlers
  const filterFunctions = {
    handlelistingStatus: handleListingStatus,
    handlepropertyType:
      allReadyOff === "off" && buyRent === "buy"
        ? handlePropertyType
        : handleAdminPropertyType,
    handlepriceRange: handlePriceRange,
    handlebedrooms: handleBedrooms,
    handleBathrooms: handleBathrooms,
    handlelocation:
      buyRent === "rent"
        ? handleRentalLocation
        : buyRent === "buy" && allReadyOff === "all"
        ? handleOffplanBuyLocation
        : buyRent === "buy" && allReadyOff === "ready"
        ? handleBuyLocation
        : handleLocation,
    handlesquirefeet: handleSquirefeet,
    handleYearBuild: handleYearBuild,
    handlecategories: handleCategories,
    handlePropertyId: handlePropertyId,
    handlePercentagePreHandover: handlePercentagePreHandover,
    handleRentDuration: handleRentDuration,
    handlePriceRange: handlePriceRange,
    handleSearchTerm: handleSearchTerm,
    rentDuration,
    priceRange,
    propertyTypes,
    percentagePreHandover,
    resetFilter,
    bedrooms,
    bathrooms,
    location:
      buyRent === "rent"
        ? rentalLocation
        : buyRent === "buy" && allReadyOff == "all"
        ? offplanBuyLocation
        : buyRent === "buy" && allReadyOff == "ready"
        ? buyLocation
        : location,
    yearBuild,
    propertyId,
    squirefeet,
    listingStatus,
    searchTerm,
    categories,
    selectedPropertyType:
      allReadyOff === "off" && buyRent === "buy"
        ? selectedPropertyType
        : adminPropertyType,
    setDataFetched,
    setSaleStatuses,
  };
  useEffect(() => {
    async function fetchOptions() {
      // Must refetch this since the format in which they are fetched on home page is different

      try {
        setLoading(true);
        setFacilityOptions(hardcoded_facilities);
        console.log("fetching options");

        // Create an array of promises with error handling for each one
        const nonUaeIds = [
          94, 124, 125, 127, 128, 129, 130, 131, 132, 133, 143, 148, 149, 150, 151,
          152, 153, 154, 158, 159, 160, 161, 162, 164, 167, 168, 170, 171, 172, 173,
          175, 178, 181, 182, 185, 186, 187, 188, 189, 190, 196, 197, 203, 206, 207,
          227, 231, 233, 236, 237, 239, 242, 244, 249, 253, 256, 274, 275
        ];

        const promises = [
          api.get("/sale-statuses").catch((e) => {
            console.error("Failed to fetch sale statuses", e);
            return null;
          }),
          api.get("/unit-types").catch((e) => {
            console.error("Failed to fetch unit types", e);
            return null;
          }),
          adminApi.get("/rental-property-types").catch((e) => {
            console.error("Failed to fetch rental types", e);
            return null;
          }),
          // Filter out non-UAE areas right after fetching
          api
            .get("/areas")
            .then((res) => {
              if (res && Array.isArray(res.data)) {
          res.data = res.data.filter((area) => !nonUaeIds.includes(area.id));
              }
              return res;
            })
            .catch((e) => {
              console.error("Failed to fetch areas", e);
              return null;
            }),
          adminApi.get("/rental-locations").catch((e) => {
            console.error("Failed to fetch rental locations", e);
            return null;
          }),
        ];

        // Wait for all promises to settle (either resolve or reject)
        const [
          saleStatusesResponse,
          unitTypes,
          rentalTypes,
          newLocationOptions,
          newAdminLocationOptions,
        ] = await Promise.all(promises);

        // Only set state for successful responses
        if (saleStatusesResponse) {
          setSaleStatuses(saleStatusesResponse.data);
        }

        if (rentalTypes) {
          setAdminPropertyTypeOptions([
            { value: "All Property Types", label: "All Property Types" },
            ...rentalTypes.data.map((type) => ({ value: type, label: type })),
          ]);
        }

        if (unitTypes) {
          setOffPlanPropertyTypeOptions([
            { value: "All Property Types", label: "All Property Types" },
            ...unitTypes.data.map((type) => ({ value: type, label: type })),
          ]);
        }

        if (newLocationOptions) {
          setLocationOptions([
            { value: "All Locations", label: "All Locations" },
            ...newLocationOptions.data.map((area) => ({
              value: area.id,
              label: area.name,
            })),
          ]);

          setOffplanBuyLocationOptions([
            { value: "All Locations", label: "All Locations" },
            ...newLocationOptions.data.map((area) => ({
              value: area.id,
              label: area.name,
            })),
            ...(newAdminLocationOptions
              ? newAdminLocationOptions.data.map((area) => ({
                  value: area,
                  label: area,
                }))
              : []),
          ]);
        }

        if (newAdminLocationOptions) {
          setRentalLocationOptions([
            { value: "All Locations", label: "All Locations" },
            ...newAdminLocationOptions.data.map((area) => ({
              value: area,
              label: area,
            })),
          ]);

          setBuyLocationOptions([
            { value: "All Locations", label: "All Locations" },
            ...newAdminLocationOptions.data.map((area) => ({
              value: area,
              label: area,
            })),
          ]);
        }
      } catch (error) {
        // This will only catch errors not handled by individual catch() above
        console.error("Unexpected error", error);
      } finally {
        console.log("Finished fetching options");
        setLoading(false);
      }
    }

    fetchOptions();
  }, [
    shouldFetchData,
    setListings,
    setFacilityOptions,
    setPropertyTypes,
    setSaleStatuses,
    setLoading,
    setDataFetched,
  ]);
  return (
    <>
      <div className="inner-banner-style3 " style={{marginBottom: "-8px"}}>
        <div className=" d-flex justify-content-center">
          <h2
            className="mb30 hero-title  animate-up-1"
            style={{
              textShadow: "0px 0px 7px rgba(0, 0, 0, 0.5)",
              color: "#ffffff",
            }}
            dangerouslySetInnerHTML={{
              __html: HeroTitle || "Find Your Property",
            }}
          ></h2>
        </div>

        <HeroContent
          activeFilterCount={getHomeFilterCount(
            buyRent === "rent"
              ? "rent"
              : allReadyOff === "ready"
              ? "buy"
              : "off-plan"
          )}
          setModalOpen={setModalOpen}
          buyRent={buyRent}
          allReadyOff={allReadyOff}
          handleAllReadyOff={handleAllReadyOff}
          handleBuyRent={handleBuyRent}
          loading={loading}
          locationOptions={
            buyRent === "rent"
              ? rentalLocationOptions
              : buyRent === "buy" && allReadyOff == "all"
              ? offplanBuyLocationOptions
              : buyRent === "buy" && allReadyOff == "ready"
              ? buyLocationOptions
              : locationOptions
          }
          propertyTypes={
            buyRent === "buy" && allReadyOff == "off"
              ? offPlanPropertyTypeOptions
              : buyRent === "buy" && allReadyOff == "all"
              ? [
                  ...adminPropertyTypeOptions,
                  ...offPlanPropertyTypeOptions,
                ].filter(
                  (obj, index, self) =>
                    index === self.findIndex((o) => o.value === obj.value)
                )
              : adminPropertyTypeOptions
          }
          facility
          filterFunctions={filterFunctions}
        />
      </div>
      {/* End Hero content */}

      {/* <!-- Advance Feature Modal Start --> */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal
            modalOpen={modalOpen}
            saleStatuses={saleStatuses}
            buyRent={buyRent}
            allReadyOff={allReadyOff}
            handleAllReadyOff={handleAllReadyOff}
            handleBuyRent={handleBuyRent}
            locationOptions={
              buyRent === "rent"
                ? rentalLocationOptions
                : buyRent === "buy" && allReadyOff == "all"
                ? offplanBuyLocationOptions
                : buyRent === "buy" && allReadyOff == "ready"
                ? buyLocationOptions
                : locationOptions
            }
            propertyTypes={
              buyRent === "buy" && allReadyOff == "off"
                ? offPlanPropertyTypeOptions
                : buyRent === "buy" && allReadyOff == "all"
                ? [
                    ...adminPropertyTypeOptions,
                    ...offPlanPropertyTypeOptions,
                  ].filter(
                    (obj, index, self) =>
                      index === self.findIndex((o) => o.value === obj.value)
                  )
                : adminPropertyTypeOptions
            }
            facilityOptions={facilityOptions}
            filterFunctions={filterFunctions}
            loading={loading}
            setDataFetched={setDataFetched}
          />
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}
    </>
  );
};

export default Hero;
