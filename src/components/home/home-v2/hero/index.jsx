import AdvanceFilterModal from "@/components/common/advance-filter-two";
import HeroContent from "./HeroContent";
import usePropertyStore from "@/store/propertyStore";
import { useEffect, useState } from "react";
import api from "@/api/axios";
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
  } = usePropertyStore();

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
    handlelocation: handleLocation,
    handlesquirefeet: handleSquirefeet,
    handleyearBuild: handleYearBuild,
    handlecategories: handleCategories,
    handlePropertyId: handlePropertyId,
    priceRange,
    propertyTypes,
    resetFilter,
    bedrooms,
    location,
    propertyId,
    squirefeet,
    listingStatus,
    categories,
    selectedPropertyType,
    setDataFetched,
    setSaleStatuses,
  };
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    async function fetchOptions() {
      // Must refetch this since the format in whcih they are fetched on home page is different
      const { data: newSaleStatuses } = await api.get("/sale-statuses");

      setSaleStatuses(newSaleStatuses);
      try {
        setLoading(true);
        setFacilityOptions(hardcoded_facilities);

        if (propertyTypes?.length === 0) {
          const newPropertyTypes = await api.get("/unit-types");
          const options = [
            { value: "All Property Types", label: "All Property Types" },
            ...newPropertyTypes.data.map((type) => ({
              value: type,
              label: type,
            })),
          ];
          setPropertyTypes(options);
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
      <div className="inner-banner-style2 text-center position-relative">
        <HeroContent
          saleStatuses={saleStatuses}
          propertyTypes={propertyTypes}
          filterFunctions={filterFunctions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <h2
          style={{
            textShadow: "0px 0px 7px rgba(0, 0, 0, 0.5)",
          }}
          className="hero-title "
          data-aos="fade-up"
          data-aos-delay="150"
        >
          Find Your Dream Home
        </h2>
        <p
          style={{
            marginTop: "-15px",
            textShadow: "0px 0px 7px rgba(0, 0, 0, 0.9)",
          }}
          className="hero-text fz15"
          data-aos="fade-up"
          data-aos-delay="250"
        >
          Let’s find a home that’s perfect for you
        </p>
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
            locationOptions={locationOptions}
            propertyTypes={propertyTypes}
            facilityOptions={facilityOptions}
            filterFunctions={filterFunctions}
            searchTerm={searchTerm}
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
