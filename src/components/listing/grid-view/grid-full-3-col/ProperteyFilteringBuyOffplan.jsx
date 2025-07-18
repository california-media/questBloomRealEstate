import React, { useState, useEffect, useCallback } from "react";
import ListingSidebar from "../../sidebar";
import AdvanceFilterModal from "@/components/common/advance-filter-two"; ////using off-plan's advance filter
import TopFilterBar from "./TopFilterBar"; ////using off-plan's topbar filter
import FeatuerdListingsBuyOffplan from "./FeatuerdListingsBuyOffplan";
import usePropertyStore from "@/store/propertyStore";
import { useLocation } from "react-router-dom";
import adminApi from "@/api/adminApi";
import mapAdminApiDataToTemplateSingle from "@/utilis/mapAdminApiDataToTemplateSingle";
import mapApiDataToTemplateSingle from "@/utilis/mapApiDataToTemplateSingle";
import { useInView } from "react-intersection-observer";
import api from "@/api/axios";

// Function to create completion_date_ranges for a single year
const createCompletionDateRangesForYear = (year) => {
  // Use UTC to avoid timezone issues
  const fromDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0)); // January 1st 00:00:00 UTC
  const toDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59)); // December 31st 23:59:59 UTC

  const fromTimestamp = fromDate.getTime();
  const toTimestamp = toDate.getTime();

  return `${fromTimestamp}-${toTimestamp}`;
};

export default function ProperteyFilteringBuy({ region }) {
  // Get all data and actions from store
  const {
    priceRange,
    categories,
    bedrooms,
    bathrooms,
    squirefeet,
    yearBuild,
    propertyId,
    listingStatus,
    propertyTypes,
    setDataFetched,
    offplanBuyLocationOptions,
    setOffplanBuyLocationOptions,
    offplanBuyLocation,
    setPropertyTypes,
    adminPropertyType,
    handleAdminPropertyType,
    getActiveFilterCount,
    handlePriceRange,
    handleOffplanBuyLocation,
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
    setSaleStatuses,
    saleStatuses,
  } = usePropertyStore();

  // Local component states
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [colstyle, setColstyle] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Pagination state for both APIs
  const [paginationState, setPaginationState] = useState({
    adminApiPage: 1,
    regularApiPage: 1,
    adminApiHasMore: true,
    regularApiHasMore: true,
  });

  const { ref, inView } = useInView({
    threshold: 0.1, // trigger when 10% of the loader is visible
  });

  const resetFilter = () => {
    setCurrentSortingOption("Newest");
    resetAllFilters();
    setListings([]); // Clear existing listings
    setHasMore(true); // Reset hasMore when filters change
    setPaginationState({
      adminApiPage: 1,
      regularApiPage: 1,
      adminApiHasMore: true,
      regularApiHasMore: true,
    });

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
    handlelocation: handleOffplanBuyLocation,
    handlesquirefeet: handleSquirefeet,
    handleYearBuild: handleYearBuild,
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
    location: offplanBuyLocation,
    squirefeet,
    yearBuild,
    categories,
    selectedPropertyType: adminPropertyType,
    percentagePreHandover,
    handlePercentagePreHandover: handlePercentagePreHandover,

    listingStatus,
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

  function getRequestParams(page = 1, isOffPlan) {
    const params = {
      page: page,
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
      ...(offplanBuyLocation != "All Locations" && {
        areas: offplanBuyLocation,
      }),
      ...(yearBuild != 50000 &&
        isOffPlan && {
          completion_date_ranges: createCompletionDateRangesForYear(yearBuild),
        }),
      ...(bedrooms != 0 && { unit_bedrooms: bedrooms }),
      ...(bathrooms != 0 && { unit_bathrooms: bathrooms }),
      ...(squirefeet.length !== 0 &&
        squirefeet[0] !== 0 && {
          unit_area_from: squirefeet[0],
        }),
      ...(listingStatus != "All" && { sale_status: listingStatus }),
      ...(squirefeet.length !== 0 &&
        squirefeet[1] !== 0 && {
          unit_area_to: squirefeet[1],
        }),
    };
    console.log(params);
    return params;
  }

  // Function to fetch combined data from both APIs
  const fetchCombinedData = async (
    adminPage = 1,
    regularPage = 1,
    filtersReset = false
  ) => {
    try {
      // Calculate how many items to fetch from each API to get total of 9
      const itemsPerApiCall = 9; // You can adjust this based on your needs

      const promises = [];
      const currentPaginationState = filtersReset
        ? {
            adminApiPage: 1,
            regularApiPage: 1,
            adminApiHasMore: true,
            regularApiHasMore: true,
          }
        : paginationState;

      // Only fetch from adminApi if it has more data
      if (currentPaginationState.adminApiHasMore) {
        promises.push(
          adminApi.get("/resale-properties", {
            params: getRequestParams(adminPage, false),
          })
        );
      }

      // Only fetch from regular api if it has more data
      if (currentPaginationState.regularApiHasMore) {
        promises.push(
          api.get("/properties", {
            params: getRequestParams(regularPage, true),
          })
        );
      }

      const responses = await Promise.all(promises);

      let adminListings = [];
      let regularListings = [];
      let newAdminHasMore = currentPaginationState.adminApiHasMore;
      let newRegularHasMore = currentPaginationState.regularApiHasMore;

      // Process admin API response
      if (responses.length > 0 && currentPaginationState.adminApiHasMore) {
        const adminResponse = responses[0];

        adminListings = adminResponse.data.data.map((item) =>
          mapAdminApiDataToTemplateSingle(item, "qb")
        );
        newAdminHasMore = adminResponse.data.data.length === itemsPerApiCall;
      }

      // Process regular API response
      if (
        responses.length > 1 ||
        (responses.length === 1 && !currentPaginationState.adminApiHasMore)
      ) {
        const regularResponse = responses[responses.length - 1];
        regularListings = regularResponse.data.items.map((item) =>
          mapApiDataToTemplateSingle(item, "op")
        );
        newRegularHasMore =
          regularResponse.data.items.length === itemsPerApiCall;
      }

      // Combine and limit to 9 items
      const combinedListings = [...adminListings, ...regularListings];
      const limitedListings = combinedListings.slice(0, 9);

      // Update pagination state
      setPaginationState((prev) => ({
        ...prev,
        adminApiHasMore: newAdminHasMore,
        regularApiHasMore: newRegularHasMore,
        ...(adminListings.length > 0 && { adminApiPage: adminPage }),
        ...(regularListings.length > 0 && { regularApiPage: regularPage }),
      }));

      // Update global hasMore state
      const globalHasMore = newAdminHasMore || newRegularHasMore;
      setHasMore(globalHasMore);

      return limitedListings;
    } catch (error) {
      console.error("Failed to fetch combined data", error);
      return [];
    }
  };

  // Initial data fetch
  useEffect(() => {
    async function fetchInitialData() {
      console.log("Fetching initial data");
      setLoading(true);
      setListings([]);
      setHasMore(true);
      setInitialLoading(true);

      // Reset pagination state
      setPaginationState({
        adminApiPage: 1,
        regularApiPage: 1,
        adminApiHasMore: true,
        regularApiHasMore: true,
      });

      try {
        // Fire all requests in parallel
        const [
          combinedListings,
          adminPropertyTypesRes,
          propertyTypesRes,
          locationsRes,
          areasRes,
          saleStatusesResponse,
        ] = await Promise.all([
          fetchCombinedData(1, 1, true),
          api.get("/unit-types"),
          adminApi.get("/rental-property-types"), ///same as admin and off-plan
          adminApi.get("/resale-locations"),
          api.get("/areas"),
          api.get("/sale-statuses"),
        ]);

        // Set all states (unchanged logic)
        setSaleStatuses(saleStatusesResponse.data);
        const propertyTypeArray = [
          { value: "All Property Types", label: "All Property Types" },
          ...propertyTypesRes.data.map((type) => ({
            value: type,
            label: type,
          })),
          ...adminPropertyTypesRes.data.map((type) => ({
            value: type,
            label: type,
          })),
        ].filter(   ///remove duplicates
          (obj, index, self) =>
            index === self.findIndex((o) => o.value === obj.value)
        );

        const locationArray = [
          { value: "All Locations", label: "All Locations" },
          ...locationsRes.data.map((area) => ({
            value: area,
            label: area,
          })),
          ...areasRes.data.map((area) => ({
            value: area.id,
            label: area.name,
          })),
        ];

        // Single state update for all data
        setListings(combinedListings);
        setPropertyTypes(propertyTypeArray);
        setOffplanBuyLocationOptions(locationArray);
        setCurrentSortingOption(currentSortingOption);
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    }

    fetchInitialData();
  }, [
    region,
    searchTerm,
    adminPropertyType,
    bathrooms,
    bedrooms,
    offplanBuyLocation,
    percentagePreHandover,
    squirefeet,
    yearBuild,
    listingStatus,
    priceRange,
    propertyId,
  ]);

  // Handle scroll events for infinite loading
  useEffect(() => {
    const fetchMoreData = async () => {
      if (inView) {
        if (loading || !hasMore || initialLoading) return;
        console.log("Fetching more data");

        setLoading(true);
        try {
          // Determine which API pages to fetch next
          let nextAdminPage = paginationState.adminApiPage;
          let nextRegularPage = paginationState.regularApiPage;

          // Increment page numbers for APIs that still have data
          if (paginationState.adminApiHasMore) {
            nextAdminPage += 1;
          }
          if (paginationState.regularApiHasMore) {
            nextRegularPage += 1;
          }

          const newListings = await fetchCombinedData(
            nextAdminPage,
            nextRegularPage
          );

          if (newListings.length > 0) {
            setListings((prevListings) => [...prevListings, ...newListings]);
          }
        } catch (error) {
          console.error("Failed to fetch more data", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMoreData();
  }, [inView, initialLoading]);

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
            <ListingSidebar
              locationOptions={offplanBuyLocationOptions}
              propertyTypes={propertyTypes}
              saleStatuses={saleStatuses}
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
            activeFilterCount={getActiveFilterCount("off-plan")}
            setDataFetched={setDataFetched}
            colstyle={colstyle}
            setColstyle={setColstyle}
            filterFunctions={filterFunctions}
            setCurrentSortingOption={setCurrentSortingOption}
            locationOptions={offplanBuyLocationOptions}
            saleStatuses={saleStatuses}
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
            <FeatuerdListingsBuyOffplan colstyle={colstyle} data={listings} />
            <div ref={ref} style={{ height: "1px" }} />
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
