import AdvanceFilterModal from "@/components/common/advance-filter-two";
import HeroContent from "./HeroContent";
import usePropertyStore from "@/store/propertyStore";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import mapApiDataToTemplate from "@/utilis/mapApiDataToTemplate";
const isDev = import.meta.env.DEV;
const Hero = () => {
  const {
    listings,
    filteredData,
    sortedFilteredData,
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
    handleBathroms,
    handleSquirefeet,
    handleYearBuild,
    handlePropertyId,
    handleListingStatus,
    resetAllFilters,
    shouldFetchData,
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
    handlebathroms: handleBathroms,
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
    categories,
    selectedPropertyType,
  };
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    async function fetchListings() {
      const region = undefined;
      const search = undefined;
      // Only fetch if data hasn't been fetched or if data is empty
      if (!shouldFetchData()) {
        return;
      }

      setLoading(true);

      try {
        const { data } = region
          ? await api.get("/properties", { params: { region } })
          : search
          ? await api.get("/properties", { params: { search_query: search } })
          : await api.get("/properties");

        const detailedListings = await Promise.all(
          data.items.map(async (listing) => {
            const id = listing.id;
            const { data: detailedData } = isDev
              ? await api.get(`/properties/${id}`)
              : await api.get("/property", { params: { id } });

            return detailedData;
          })
        );

        // Set listings in store
        const mappedListings = detailedListings.map((detailedData, index) =>
          mapApiDataToTemplate(data.items[index], detailedData)
        );
        setListings(mappedListings);

        // 1️⃣ Extract unique sale_status values
        const rawStatuses = [
          ...new Set(
            data.items.map((item) => item.sale_status).filter(Boolean)
          ),
        ];
        const formattedStatuses = [
          { id: "flexRadioDefault0", label: "All", defaultChecked: true },
          ...rawStatuses.map((status, index) => ({
            id: `flexRadioDefault${index + 1}`,
            label: status,
          })),
        ];
        setSaleStatuses(formattedStatuses);

        // 2️⃣ Extract unique facility (amenity) names
        const allFacilities = detailedListings.flatMap(
          (d) => d.facilities?.map((f) => f.name.trim()) || []
        );
        const uniqueFacilities = [...new Set(allFacilities)];
        setFacilityOptions(uniqueFacilities);

        // 3️⃣ Extract unique unit types from unit_blocks
        const allPropertyTypes = detailedListings.flatMap(
          (d) => d.unit_blocks?.map((u) => u.unit_type) || []
        );
        const uniquePropertyTypes = [...new Set(allPropertyTypes)];
        const options = [
          { value: "All Property Types", label: "All Property Types" },
          ...uniquePropertyTypes.map((type) => ({
            value: type,
            label: type,
          })),
        ];
        setPropertyTypes(options);

        // Mark data as fetched
        setDataFetched(true);
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [
    shouldFetchData,
    setListings,
    setFacilityOptions,
    setPropertyTypes,
    setSaleStatuses,
    setLoading,
    setDataFetched,
  ]);

  useEffect(() => {
    if (listings.length > 0) {
      const uniqueAreas = Array.from(
        new Set(listings.map((item) => item.location).filter(Boolean))
      );
      const options = [
        { value: "All Locations", label: "All Locations" },
        ...uniqueAreas.map((area) => ({
          value: area,
          label: area,
        })),
      ];
      setLocationOptions(options);
    }
  }, [listings, setLocationOptions]);

  return (
    <>
      <div className="inner-banner-style2 text-center position-relative">
        <HeroContent
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
          />
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}
    </>
  );
};

export default Hero;
