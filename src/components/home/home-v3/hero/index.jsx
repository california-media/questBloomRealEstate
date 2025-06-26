import AdvanceFilterModal from "@/components/common/advance-filter-home";
import HeroContent from "./HeroContent";
import usePropertyStore from "@/store/propertyStore";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import adminApi from "@/api/adminApi";
import AnimatedText from "../../home-v2/hero/AnimatedText ";
const hardcoded_facilities = ["Swimming Pool"];

const Hero = () => {
  const {
    loading,
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
    setLoading,
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
    buyLocation,
    handleBuyLocation,
  } = usePropertyStore();
  const [buyRent, setBuyRent] = useState("buy");
  const [allReadyOff, setAllReadyOff] = useState("all");
  const [adminPropertyTypeOptions, setAdminPropertyTypeOptions] = useState([]);
  const [offPlanPropertyTypeOptions, setOffPlanPropertyTypeOptions] = useState(
    []
  );
  const handleAllReadyOff = (tab) => {
    handlePropertyType("All Property Types");
    setAllReadyOff(tab);
  };

  const handleBuyRent = (tab) => {
    handlePropertyType("All Property Types");
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

  // Filter functions object for components that need access to handlers
  const filterFunctions = {
    handlelistingStatus: handleListingStatus,
    handlepropertyType: handlePropertyType,
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
    handleyearBuild: handleYearBuild,
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
    selectedPropertyType,
    setDataFetched,
    setSaleStatuses,
  };
  useEffect(() => {
    async function fetchOptions() {
      // Must refetch this since the format in whcih they are fetched on home page is different
      const { data: newSaleStatuses } = await api.get("/sale-statuses");

      setSaleStatuses(newSaleStatuses);
      try {
        setLoading(true);
        setFacilityOptions(hardcoded_facilities);

        if (propertyTypes?.length === 0) {
          // Fetch all data in parallel
          const [unitTypes, rentalTypes] = await Promise.all([
            api.get("/unit-types"),
            adminApi.get("/rental-property-types"), ///same as resale
          ]);
          setAdminPropertyTypeOptions([
            { value: "All Property Types", label: "All Property Types" },
            ...rentalTypes.data.map((type) => ({ value: type, label: type })),
          ]);
          setOffPlanPropertyTypeOptions([
            { value: "All Property Types", label: "All Property Types" },
            ...unitTypes.data.map((type) => ({ value: type, label: type })),
          ]);
        }

        if (locationOptions?.length === 0) {
          const newLocationOptions = await api.get("/areas");
          const options = [
            { value: "All Locations", label: "All Locations" },
            ...newLocationOptions.data.map((area) => ({
              value: area.name,
              label: area.name,
            })),
          ];

          setLocationOptions(options);
        }
        if (rentalLocationOptions?.length === 0) {
          const newLocationOptions = await adminApi.get("/rental-locations");
          const options = [
            { value: "All Locations", label: "All Locations" },
            ...newLocationOptions.data.map((area) => ({
              value: area,
              label: area,
            })),
          ];
          setRentalLocationOptions(options);
        }

        if (buyLocationOptions?.length === 0) {
          const newLocationOptions = await adminApi.get("/rental-locations");
          const options = [
            { value: "All Locations", label: "All Locations" },
            ...newLocationOptions.data.map((area) => ({
              value: area,
              label: area,
            })),
          ];
          setBuyLocationOptions(options);
        }
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
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
          buyRent={buyRent}
          allReadyOff={allReadyOff}
          handleAllReadyOff={handleAllReadyOff}
          handleBuyRent={handleBuyRent}
          saleStatuses={saleStatuses}
          locationOptions={
            buyRent === "rent"
              ? rentalLocationOptions
              : buyRent === "buy" && allReadyOff !== "off"
              ? buyLocationOptions
              : locationOptions
          }
          propertyTypes={
            allReadyOff === "off"
              ? offPlanPropertyTypeOptions
              : adminPropertyTypeOptions
          }
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
            buyRent={buyRent}
            allReadyOff={allReadyOff}
            handleAllReadyOff={handleAllReadyOff}
            handleBuyRent={handleBuyRent}
            locationOptions={
              buyRent === "rent"
                ? rentalLocationOptions
                : buyRent === "buy" && allReadyOff !== "off"
                ? buyLocationOptions
                : locationOptions
            }
            propertyTypes={
              allReadyOff === "off"
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
