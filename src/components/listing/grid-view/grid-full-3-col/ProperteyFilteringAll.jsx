import React, { useState, useEffect, useCallback } from "react";
import ListingSidebarAll from "../../sidebar/ListingSidebarAll";
import AdvanceFilterModal from "@/components/common/advance-filter-two-all";
import TopFilterBar from "./TopFilterBarAll";
import FeaturedListingsAll from "./FeatuerdListingsAll";
import usePropertyStore from "@/store/propertyStore";
import { useLocation } from "react-router-dom";
import adminApi from "@/api/adminApi";
import mapAdminApiDataToTemplateSingle from "@/utilis/mapAdminApiDataToTemplateSingle";

export default function ProperteyFiltering({ region }) {
  // Get all data and actions from store
  const {
    filteredData,
    sortedFilteredData,

    priceRange,
    categories,
    bedrooms,
    bathrooms,
    squirefeet,
    yearBuild,
    propertyId,
    listingStatus,
    propertyTypes,
    facilityOptions,
    saleStatuses,
    setFilteredData,
    setSortedFilteredData,
    setDataFetched,
    allLocation,
    setAllLocationOptions,
    allLocationOptions,
    getActiveFilterCount,
    setPropertyTypes,
    setFacilityOptions,
    setSaleStatuses,
    rentDuration,
    handleRentDuration,
    handlePriceRange,

    handleCategories,
    handleBedrooms,
    handleBathrooms,
    handleSquirefeet,
    handleYearBuild,
    handleAllLocation,
    handlePropertyId,
    handleListingStatus,
    resetAllFilters,
    percentagePreHandover,
    handlePercentagePreHandover,
    searchTerm,
    handleSearchTerm,
    adminPropertyType,
    handleAdminPropertyType,
  } = usePropertyStore();

  // Local component states
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [colstyle, setColstyle] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const routelocation = useLocation();
  const isOffPlan = routelocation.pathname.startsWith("/off-plan");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetFilter = () => {
    setCurrentSortingOption("Newest");
    resetAllFilters();
    setListings([]); // Clear existing listings
    setHasMore(true); // Reset hasMore when filters change

    document.querySelectorAll(".filterInput").forEach(function (element) {
      element.value = null;
    });

    document.querySelectorAll(".filterSelect").forEach(function (element) {
      element.value = "All Locations";
    });

    document.querySelectorAll(".property-id-reset").forEach(function (element) {
      element.value = "";
    });
  };
  const navLocation = useLocation();
  const hasFilters = navLocation.state?.hasFilters || false;
  useEffect(() => {
    if (!hasFilters) {
      resetFilter();
    }
  }, [hasFilters]);
  // Filter functions object for components that need access to handlers
  const filterFunctions = {
    handlelistingStatus: handleListingStatus,
    handlepropertyType: handleAdminPropertyType,
    handlepriceRange: handlePriceRange,
    handlebedrooms: handleBedrooms,
    handleBathrooms: handleBathrooms,
    handlelocation: handleAllLocation,
    handlesquirefeet: handleSquirefeet,
    handleyearBuild: handleYearBuild,
    handlecategories: handleCategories,
    handlePropertyId: handlePropertyId,
    handleSearchTerm: handleSearchTerm,
    propertyId,
    searchTerm,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,
    bedrooms,
    bathrooms,
    location: allLocation,
    squirefeet,
    yearBuild,
    categories,
    selectedPropertyType: adminPropertyType,
    percentagePreHandover,
    handlePercentagePreHandover,
    rentDuration,
    handleRentDuration,
  };
  function sortListings(unsorted) {
    let sorted = [];
    if (currentSortingOption === "Newest") {
      sorted = [...unsorted].sort((a, b) => b.yearBuilding - a.yearBuilding);
    } else if (currentSortingOption.trim() === "Price Low") {
      sorted = [...unsorted].sort(
        (a, b) =>
          a.price.split("$")[1].split(",").join("") -
          b.price.split("$")[1].split(",").join("")
      );
    } else if (currentSortingOption.trim() === "Price High") {
      sorted = [...unsorted].sort(
        (a, b) =>
          b.price.split("$")[1].split(",").join("") -
          a.price.split("$")[1].split(",").join("")
      );
    }
    return sorted;
  }
  function getRequestParams(nextPage = 1) {
    const params = {
      page: nextPage,
      per_page: 9,
      ...(adminPropertyType != "All Property Types" && {
        unit_types: adminPropertyType,
      }),
      ...(priceRange[0] != 0 && {
        unit_price_from: priceRange[0],
      }),
      ...(priceRange[1] != 10000000 && {
        ///if 10000000 then that means no cap
        unit_price_to: priceRange[1],
      }),
      ...(propertyId != "" && { project_ids: propertyId }),
      ...(searchTerm != "" && { search_query: searchTerm }),
      ...(allLocation != "All Locations" && { areas: allLocation }),
      ...{ rentDuration },
      ...(bedrooms != 0 && { unit_bedrooms: bedrooms }),
      ...(bathrooms != 0 && { unit_bathrooms: bathrooms }),
      ...(squirefeet.length !== 0 &&
        squirefeet[0] !== 0 && {
          unit_area_from: squirefeet[0],
        }),
      ...(squirefeet.length !== 0 &&
        squirefeet[1] !== 0 && {
          unit_area_to: squirefeet[1],
        }),
    };
    console.log(params);
    return params;
  }

  // Fetch more data when reaching bottom
  const fetchMoreData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = Math.floor(listings.length / 9) + 1;

      const combinedResponse = await adminApi.get("/all-properties", {
        params: getRequestParams(nextPage),
      });

      if (combinedResponse.data.data.length === 0) {
        setHasMore(false);
        return;
      }
      // Combine and map both sets of listings
      const combinedListings = combinedResponse.data.data.map((item) => {
        // Determine the type prefix based on property_source
        const typePrefix = item.property_source === "rental" ? "qr" : "qb";
        return mapAdminApiDataToTemplateSingle(item, typePrefix);
      });

      setListings(sortListings([...listings, ...mappedNewListings]));
    } catch (error) {
      console.error("Failed to fetch more data", error);
    } finally {
      setLoading(false);
    }
  }, [
    listings,
    loading,
    hasMore,
    adminPropertyType,
    priceRange,
    propertyId,
    allLocation,
    bedrooms,
    bathrooms,
    squirefeet,
    rentDuration,
    searchTerm,
    setListings,
    setLoading,
  ]);
  // Initial data fetch
  useEffect(() => {
    async function fetchInitialData() {
      console.log("Fetching initial data");
      setLoading(true);
      setListings([]); // Clear existing listings
      setHasMore(true); // Reset hasMore when filters change
      try {
        // Fetch both resale and rental properties in parallel
        const combinedResponse = await adminApi.get("/all-properties", {
          params: getRequestParams(),
        });

        // Combine and map both sets of listings
        const combinedListings = combinedResponse.data.data.map((item) => {
          // Determine the type prefix based on property_source
          const typePrefix = item.property_source === "rental" ? "qr" : "qb";
          return mapAdminApiDataToTemplateSingle(item, typePrefix);
        });
        setListings(sortListings(combinedListings));
        setHasMore(combinedListings.length === 9);

        // Fetch both location types in parallel
        const [{ data: resaleLocations }, { data: rentalLocations }] =
          await Promise.all([
            adminApi.get("/resale-locations"),
            adminApi.get("/rental-locations"),
          ]);
        // Merge and deduplicate all locations
        const uniqueLocations = [
          { value: "All Locations", label: "All Locations" },
          ...Array.from(new Set([...resaleLocations, ...rentalLocations])).map(
            (area) => ({
              value: area,
              label: area,
            })
          ),
        ];
        setAllLocationOptions(uniqueLocations);

        const newPropertyTypes = await adminApi.get("/rental-property-types"); ///same as resale
        const propertyTypeArray = [
          { value: "All Property Types", label: "All Property Types" },
          ...newPropertyTypes.data.map((type) => ({
            value: type,
            label: type.charAt(0).toUpperCase() + type.slice(1),
          })),
        ];
        setPropertyTypes(propertyTypeArray);

        setDataFetched(true);
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, [
    searchTerm,
    adminPropertyType,
    bathrooms,
    bedrooms,
    rentDuration,
    allLocation,
    squirefeet,
    yearBuild,
    priceRange,
    propertyId,
  ]);

  // Handle scroll events for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500
      ) {
        fetchMoreData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMoreData]);

  // Sorting effect remains the same
  useEffect(() => {
    if (currentSortingOption === "Newest") {
      const sorted = [...listings].sort(
        (a, b) => a.yearBuilding - b.yearBuilding
      );
      setListings(sorted);
    } else if (currentSortingOption.trim() === "Price Low") {
      const sorted = [...listings].sort(
        (a, b) =>
          a.price.split("$")[1].split(",").join("") -
          b.price.split("$")[1].split(",").join("")
      );
      setListings(sorted);
    } else if (currentSortingOption.trim() === "Price High") {
      const sorted = [...listings].sort(
        (a, b) =>
          b.price.split("$")[1].split(",").join("") -
          a.price.split("$")[1].split(",").join("")
      );
      setListings(sorted);
    } else {
      setListings(listings);
    }
  }, [currentSortingOption]);

  return (
    <section className="pt0 pb90 bgc-f7">
      <div className="container">
        {/* start mobile filter sidebar */}
        <div
          className="offcanvas offcanvas-start p-0"
          tabIndex="-1"
          id="listingSidebarFilter"
          aria-labelledby="listingSidebarFilterLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="listingSidebarFilterLabel">
              Listing Filter
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <ListingSidebarAll
              locationOptions={allLocationOptions}
              propertyTypes={propertyTypes}
              filterFunctions={filterFunctions}
            />
          </div>
        </div>
        {/* End mobile filter sidebar */}

        {/* <!-- Advance Feature Modal Start --> */}
        <div className="advance-feature-modal">
          <div
            className="modal fade"
            id="advanceSeachModal"
            tabIndex={-1}
            aria-labelledby="advanceSeachModalLabel"
            aria-hidden="true"
          >
            <AdvanceFilterModal filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* <!-- Advance Feature Modal End --> */}

        <div className="row">
          <TopFilterBar
            activeFilterCount={getActiveFilterCount("all")}
            setDataFetched={setDataFetched}
            colstyle={colstyle}
            setColstyle={setColstyle}
            filterFunctions={filterFunctions}
            setCurrentSortingOption={setCurrentSortingOption}
            locationOptions={allLocationOptions}
            propertyTypes={propertyTypes}
          />
        </div>
        {/* End TopFilterBar */}
        {searchTerm && (
          <p className="mb30">
            Search Results for:{" "}
            <span className="fw-semibold">"{searchTerm}"</span>
          </p>
        )}
        {loading && listings.length === 0 ? (
          <div className="row">
            <div
              style={{
                margin: "300px",
              }}
              className="spinner-border mx-auto "
              role="status"
            >
              <span className="visually-hidden">{"Loading..."}</span>
            </div>
          </div>
        ) : listings.length === 0 ? (
          <h5
            style={{
              marginTop: "300px",
              marginBottom: "300px",
            }}
            className=" text-center"
          >
            No listings found.
          </h5>
        ) : (
          <div className="row">
            <FeaturedListingsAll colstyle={colstyle} data={listings} />
            {loading && (
              <div className="text-center my-3">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading more...</span>
                </div>
              </div>
            )}
            {!hasMore && listings.length > 0 && (
              <div className="text-center my-3">
                <p>No more listings to show</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
