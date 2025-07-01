import React, { useState, useEffect, useCallback } from "react";
import ListingSidebarBuy from "../../sidebar/ListingSidebarBuy";
import AdvanceFilterModal from "@/components/common/advance-filter-two-buy";
import TopFilterBar from "./TopFilterBarBuy";
import FeaturedListingsBuy from "./FeatuerdListingsBuy";
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
    buyLocationOptions,
    setBuyLocationOptions,
    buyLocation,
    setPropertyTypes,
    setFacilityOptions,
    setSaleStatuses,
    adminPropertyType,
    handleAdminPropertyType,
    getActiveFilterCount,
    handlePriceRange,
    handleBuyLocation,
    handleCategories,
    handleBedrooms,
    handleBathrooms,
    handleSquirefeet,
    handleYearBuild,
    handlePropertyId,
    handleListingStatus,
    resetAllFilters,
    percentagePreHandover,
    handlePercentagePreHandover,
    searchTerm,
    handleSearchTerm,
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
    handlelocation: handleBuyLocation,
    handlesquirefeet: handleSquirefeet,
    handleyearBuild: handleYearBuild,
    handlecategories: handleCategories,
    handlePropertyId: handlePropertyId,
    handleSearchTerm: handleSearchTerm,
    searchTerm,
    propertyId,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,
    bedrooms,
    bathrooms,
    location: buyLocation,
    squirefeet,
    yearBuild,
    categories,
    selectedPropertyType: adminPropertyType,
    percentagePreHandover,
    handlePercentagePreHandover,
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

  // Handle sorting changes - only re-sort when sorting option changes
  useEffect(() => {
    if (listings.length > 0) {
      setListings((prevListings) => sortListings(prevListings));
    }
  }, [currentSortingOption]);

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
        unit_price_to: priceRange[1],
      }),
      ...(propertyId != "" && { project_ids: propertyId }),
      ...(searchTerm != "" && { search_query: searchTerm }),
      ...(buyLocation != "All Locations" && { areas: buyLocation }),
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

      const { data: adminListings } = await adminApi.get("/resale-properties", {
        params: getRequestParams(nextPage),
      });

      if (adminListings.data.length === 0) {
        setHasMore(false);
        return;
      }

      const mappedNewListings = adminListings.data.map((item) =>
        mapAdminApiDataToTemplateSingle(item, "qb")
      );

      const newListings = [...listings, ...mappedNewListings];
      setListings(sortListings(newListings));

      // Update hasMore based on returned data length
      setHasMore(mappedNewListings.length === 9);
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
    buyLocation,
    bedrooms,
    bathrooms,
    squirefeet,
    searchTerm,
   
  ]);
  // Initial data fetch
  useEffect(() => {
    async function fetchInitialData() {
      console.log("Fetching initial data");
      setLoading(true);
      setListings([]);
      setHasMore(true);

      try {
        // Fire all requests in parallel
        const [listingsRes, propertyTypesRes, locationsRes] = await Promise.all(
          [
            adminApi.get("/resale-properties", { params: getRequestParams() }),
            adminApi.get("/rental-property-types"),
            adminApi.get("/resale-locations"),
          ]
        );

        // Process all responses together
        const mappedNewListings = listingsRes.data.data.map((item) =>
          mapAdminApiDataToTemplateSingle(item, "qb")
        );

        const propertyTypeArray = [
          { value: "All Property Types", label: "All Property Types" },
          ...propertyTypesRes.data.map((type) => ({
            value: type,
            label: type.charAt(0).toUpperCase() + type.slice(1),
          })),
        ];

        const locationArray = [
          { value: "All Locations", label: "All Locations" },
          ...locationsRes.data.map((area) => ({
            value: area,
            label: area,
          })),
        ];

        // Single state update for all data
        setListings(sortListings(mappedNewListings));
        setHasMore(listingsRes.data.data.length === 9);
        setPropertyTypes(propertyTypeArray);
        setBuyLocationOptions(locationArray);
        setCurrentSortingOption(currentSortingOption);
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, [
    region,
    searchTerm,
    adminPropertyType,
    bathrooms,
    bedrooms,
    buyLocation,
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
            <ListingSidebarBuy
              locationOptions={buyLocationOptions}
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
            activeFilterCount={getActiveFilterCount("buy")}
            setDataFetched={setDataFetched}
            colstyle={colstyle}
            setColstyle={setColstyle}
            filterFunctions={filterFunctions}
            setCurrentSortingOption={setCurrentSortingOption}
            locationOptions={buyLocationOptions}
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
            <FeaturedListingsBuy colstyle={colstyle} data={listings} />
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
