import AdvanceFilterModal from "@/components/common/advance-filter-home";
import HeroContent from "./HeroContent";
import usePropertyStore from "@/store/propertyStore";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import adminApi from "@/api/adminApi";
import AnimatedText from "../../home-v2/hero/AnimatedText";
const hardcoded_facilities = ["Swimming Pool"];

const Hero = () => {
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
        : buyRent === "buy" && allReadyOff !== "off"
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
        : buyRent === "buy" && allReadyOff !== "off"
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
      // Must refetch this since the format in whcih they are fetched on home page is different

      try {
        setLoading(true);
        setFacilityOptions(hardcoded_facilities);
        console.log("fetching options");

        // Fetch all data in parallel
        const [
          saleStatusesResponse,
          unitTypes,
          rentalTypes,
          newLocationOptions,
          newRentLocationOptions,
          newResaleLocationOptions,
        ] = await Promise.all([
          api.get("/sale-statuses"),
          api.get("/unit-types"),
          adminApi.get("/rental-property-types"),
          api.get("/areas"),
          adminApi.get("/rental-locations"),
          adminApi.get("/resale-locations"),
        ]);

        // Set all states (unchanged logic)
        setSaleStatuses(saleStatusesResponse.data);

        setAdminPropertyTypeOptions([
          { value: "All Property Types", label: "All Property Types" },
          ...rentalTypes.data.map((type) => ({ value: type, label: type })),
        ]);

        setOffPlanPropertyTypeOptions([
          { value: "All Property Types", label: "All Property Types" },
          ...unitTypes.data.map((type) => ({ value: type, label: type })),
        ]);

        setLocationOptions([
          { value: "All Locations", label: "All Locations" },
          ...newLocationOptions.data.map((area) => ({
            value: area.id,
            label: area.name,
          })),
        ]);

        setRentalLocationOptions([
          { value: "All Locations", label: "All Locations" },
          ...newRentLocationOptions.data.map((area) => ({
            value: area,
            label: area,
          })),
        ]);

        setBuyLocationOptions([
          { value: "All Locations", label: "All Locations" },
          ...newResaleLocationOptions.data.map((area) => ({
            value: area,
            label: area,
          })),
        ]);
      } catch (error) {
        console.error("Failed to fetch listings", error);
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
      <div className="inner-banner-style3 ">
        <div className=" d-flex justify-content-center">
          <AnimatedText>Find Your Property</AnimatedText>
        </div>

        <HeroContent
          activeFilterCount={getHomeFilterCount(
            buyRent === "rent"
              ? "rent"
              : allReadyOff === "off"
              ? "off-plan"
              : "buy"
          )}
          setModalOpen={setModalOpen}
          buyRent={buyRent}
          allReadyOff={allReadyOff}
          handleAllReadyOff={handleAllReadyOff}
          handleBuyRent={handleBuyRent}
          loading={loading}
          saleStatuses={saleStatuses}
          locationOptions={
            buyRent === "rent"
              ? rentalLocationOptions
              : buyRent === "buy" && allReadyOff !== "off"
              ? buyLocationOptions
              : locationOptions
          }
          propertyTypes={
            buyRent === "rent"
              ? adminPropertyTypeOptions
              : buyRent === "buy" && allReadyOff !== "off"
              ? adminPropertyTypeOptions
              : offPlanPropertyTypeOptions
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
            buyRent={buyRent}
            allReadyOff={allReadyOff}
            handleAllReadyOff={handleAllReadyOff}
            handleBuyRent={handleBuyRent}
            locationOptions={
              buyRent === "rent"
                ? rentalLocationOptions
                : buyRent === "buy" && allReadyOff === "off"
                ? locationOptions
                : buyLocationOptions
            }
            propertyTypes={
              buyRent === "rent"
                ? adminPropertyTypeOptions
                : buyRent === "buy" && allReadyOff === "off"
                ? offPlanPropertyTypeOptions
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
