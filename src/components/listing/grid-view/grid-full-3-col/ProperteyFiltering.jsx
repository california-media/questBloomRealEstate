import React, { useState, useEffect, useCallback } from "react";
import ListingSidebar from "../../sidebar";
import AdvanceFilterModal from "@/components/common/advance-filter-two";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import api from "@/api/axios";
import usePropertyStore from "@/store/propertyStore";
import mapApiDataToTemplateSingle from "@/utilis/mapApiDataToTemplateSingle";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

// Function to create completion_date_ranges for a single year
const createCompletionDateRangesForYear = (year) => {
  // Use UTC to avoid timezone issues
  const fromDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0)); // January 1st 00:00:00 UTC
  const toDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59)); // December 31st 23:59:59 UTC

  const fromTimestamp = fromDate.getTime();
  const toTimestamp = toDate.getTime();

  return `${fromTimestamp}-${toTimestamp}`;
};

const hardcoded_facilities = ["Swimming Pool"];

export default function ProperteyFiltering({ region }) {
  // Get all data and actions from store

  const {
    selectedPropertyType,
    priceRange,
    location,
    categories,
    bedrooms,
    bathrooms,
    squirefeet,
    yearBuild,
    propertyId,
    listingStatus,
    locationOptions,
    propertyTypes,
    saleStatuses,
    setDataFetched,
    getActiveFilterCount,
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
    resetAllFilters,
    percentagePreHandover,
    handlePercentagePreHandover,
    searchTerm,
    handleSearchTerm,
  } = usePropertyStore();

  const [modalOpen, setModalOpen] = useState(false);
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
  // Local component states
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [posthandover, setPosthandover] = useState(false);
  const [colstyle, setColstyle] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");

  const routelocation = useLocation();
  const isOffPlan = routelocation.pathname.startsWith("/off-plan");
  const [listings, setListings] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1, // trigger when 10% of the loader is visible
  });
  const [filtersReset, setFiltersReset] = useState(false);
  const resetFilter = () => {
    resetAllFilters();
    setCurrentSortingOption("Newest");
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
    setFiltersReset(true); ////so that we can avoiding fetching initial data AGAIN because of the rerender caused by the above resetFilter() call
  }, []);

  // Filter functions object for components that need access to handlers
  const filterFunctions = {
    handlelistingStatus: handleListingStatus,
    handlepropertyType: handlePropertyType,
    handlepriceRange: handlePriceRange,
    handlebedrooms: handleBedrooms,
    handleBathrooms: handleBathrooms,
    handlelocation: handleLocation,
    handlesquirefeet: handleSquirefeet,
    handleYearBuild: handleYearBuild,
    handlecategories: handleCategories,
    handlePropertyId: handlePropertyId,
    handleSearchTerm: handleSearchTerm,
    handleSearchTerm: handleSearchTerm,
    handlePercentagePreHandover: handlePercentagePreHandover,
    priceRange,
    listingStatus,
    searchTerm,
    propertyId,
    propertyTypes,
    resetFilter,
    bedrooms,
    bathrooms,
    location,
    squirefeet,
    yearBuild,
    categories,
    selectedPropertyType,
    percentagePreHandover,
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
      ...(selectedPropertyType != "All Property Types" && {
        unit_types: selectedPropertyType,
      }),
      ...(priceRange[0] != 0 && {
        unit_price_from: priceRange[0],
      }),
      ...(priceRange[1] != 10000000 && {
        unit_price_to: priceRange[1],
      }),
      ...(propertyId != "" && { project_ids: propertyId }),
      ...(yearBuild != 50000 &&
        isOffPlan && {
          completion_date_ranges: createCompletionDateRangesForYear(yearBuild),
        }),
      ...(location !== "All Locations"
        ? {
            areas: [...selectedCities, location].join(","),
          }
        : {
            areas: selectedCities.join(","),
          }),
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
      ...(listingStatus != "All" && { sale_status: listingStatus }),
      ...(region && { region }),
      ...(searchTerm != "" && { search_query: searchTerm }),
      post_handover: posthandover,
    };
    console.log(params);
    return params;
  }

  // Initial data fetch
  useEffect(() => {
    async function fetchInitialData() {
      if (!filtersReset) return;
      setLoading(true);
      setListings([]); // Clear existing listings
      setInitialLoading(true);
      setHasMore(true); // Reset hasMore when filters change
      console.log("Fetching initial data");

      try {
        const { data } = await api.get("/properties", {
          params: getRequestParams(),
        });

        // Set listings in store
        const mappedNewListings = data.items.map((item) =>
          mapApiDataToTemplateSingle(item, "op")
        );
        setListings(mappedNewListings);
        setHasMore(data.items.length === 9); // If we got 9 items, there might be more

        const newSaleStatuses = await api.get("/sale-statuses");
        setSaleStatuses(newSaleStatuses.data);

        setFacilityOptions(hardcoded_facilities);

        const newPropertyTypes = await api.get("/unit-types");
        const propertyTypeArray = [
          { value: "All Property Types", label: "All Property Types" },
          ...newPropertyTypes.data.map((type) => ({
            value: type,
            label: type.charAt(0).toUpperCase() + type.slice(1),
          })),
        ];
        setPropertyTypes(propertyTypeArray);

        const newLocationOptions = await api.get("/areas");
        const locationArray = [
          { value: "All Locations", label: "All Locations" },
          ...newLocationOptions.data.map((area) => ({
            value: area.id,
            label: area.name,
          })),
        ];
        setLocationOptions(locationArray);
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    }
    //search bar back to current state
    setLocalSearchTerm(searchTerm);
    fetchInitialData();
  }, [
    searchTerm,
    listingStatus,
    selectedPropertyType,
    percentagePreHandover,
    bedrooms,
    bathrooms,
    location,
    squirefeet,
    yearBuild,
    categories,
    priceRange,
    propertyId,
    posthandover,
    selectedCities,
    filtersReset,
  ]);

  // Handle scroll events for infinite loading
  // Fetch more data when reaching bottom

  useEffect(() => {
    const fetchMoreData = async () => {
      if (inView) {
        if (loading || !hasMore || initialLoading) return;

        setLoading(true);
        try {
          const nextPage = Math.floor(listings.length / 9) + 1;

          const { data } = await api.get("/properties", {
            params: getRequestParams(nextPage),
          });

          const mappedNewListings = data.items.map((item) =>
            mapApiDataToTemplateSingle(item, "op")
          );

          setListings([...listings, ...mappedNewListings]);

          // Update hasMore based on returned data length
          setHasMore(mappedNewListings.length === 9);
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
          <div className="offcanvas-body p-0 d-block d-lg-none">
            <ListingSidebar
              locationOptions={locationOptions}
              propertyTypes={propertyTypes}
              filterFunctions={filterFunctions}
              saleStatuses={saleStatuses}
              setSearchTerm={setLocalSearchTerm}
              searchTerm={localSearchTerm}
              setModalOpen={setModalOpen}
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
            <AdvanceFilterModal
              filterFunctions={filterFunctions}
              modalOpen={modalOpen}
            />
          </div>
        </div>
        {/* <!-- Advance Feature Modal End --> */}

        <TopFilterBar
          activeFilterCount={getActiveFilterCount("off-plan")}
          setDataFetched={setDataFetched}
          colstyle={colstyle}
          setColstyle={setColstyle}
          filterFunctions={filterFunctions}
          setCurrentSortingOption={setCurrentSortingOption}
          setPosthandover={setPosthandover}
          posthandover={posthandover}
          locationOptions={locationOptions}
          saleStatuses={saleStatuses}
          propertyTypes={propertyTypes}
          selectedCities={selectedCities}
          setSelectedCities={setSelectedCities}
          searchTerm={localSearchTerm}
          setSearchTerm={setLocalSearchTerm}
          setModalOpen={setModalOpen}
        />

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
            <FeaturedListings colstyle={colstyle} data={listings} />
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
