import React, { useState, useEffect, useCallback } from "react";
import ListingSidebarRent from "../../sidebar/ListingSidebarRent";
import AdvanceFilterModal from "@/components/common/advance-filter-two-rent";
import TopFilterBar from "./TopFilterBarRent";
import FeaturedListingsRent from "./FeatuerdListingsRent";
import usePropertyStore from "@/store/propertyStore";
import { useLocation } from "react-router-dom";
import adminApi from "@/api/adminApi";
import mapAdminApiDataToTemplateSingle from "@/utilis/mapAdminApiDataToTemplateSingle";
import { useInView } from "react-intersection-observer";

export default function ProperteyFiltering({ region }) {
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
    facilityOptions,
    setDataFetched,
    rentalLocationOptions,
    setRentalLocationOptions,
    rentalLocation,
    setPropertyTypes,
    getActiveFilterCount,
    handlePriceRange,
    handleRentalLocation,
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
    adminPropertyType,
    handleAdminPropertyType,
    rentDuration,
    handleRentDuration,
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
  const [colstyle, setColstyle] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedCities, setSelectedCities] = useState([]);

  const { ref, inView } = useInView({
    threshold: 0.1, // trigger when 10% of the loader is visible
  });

  const [filtersReset, setFiltersReset] = useState(false);

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
    setFiltersReset(true); ////so that we can avoiding fetching initial data AGAIN because of the rerender caused by the above resetFilter() call
  }, []);

  // Filter functions object for components that need access to handlers
  const filterFunctions = {
    handlelistingStatus: handleListingStatus,
    handlepropertyType: handleAdminPropertyType,
    handlepriceRange: handlePriceRange,
    handlebedrooms: handleBedrooms,
    handleBathrooms: handleBathrooms,
    handlelocation: handleRentalLocation,
    handlesquirefeet: handleSquirefeet,
    handleyearBuild: handleYearBuild,
    handlecategories: handleCategories,
    handlePropertyId: handlePropertyId,
    priceRange,
    propertyId,
    listingStatus,
    propertyTypes,
    searchTerm,
    handleSearchTerm: handleSearchTerm,
    resetFilter,
    bedrooms,
    bathrooms,
    location: rentalLocation,
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
      ...(rentalLocation != "All Locations" && { areas: rentalLocation }),
      ...(searchTerm != "" && { search_query: searchTerm }),
      ...(bedrooms != 0 && { unit_bedrooms: bedrooms }),
      ...(selectedCities.length !== 0 && {
        location_areas: selectedCities.join(","),
      }),
      ...(bathrooms != 0 && { unit_bathrooms: bathrooms }),
      ...{ rentDuration },
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

  // Initial data fetch
  useEffect(() => {
    async function fetchInitialData() {
      if (!filtersReset) return;

      setLoading(true);
      setListings([]); // Clear existing listings
      setHasMore(true); // Reset hasMore when filters change
      setInitialLoading(true);
      console.log("Fetching initial data");

      try {
        const { data: adminListings } = await adminApi.get(
          "/rental-properties",
          {
            params: getRequestParams(),
          }
        );

        // Set listings in store
        const mappedNewListings = adminListings.data.map((item) =>
          mapAdminApiDataToTemplateSingle(item, "qr")
        );
        setListings(mappedNewListings);
        setHasMore(adminListings.data.length === 9); // If we got 9 items, there might be more

        const newPropertyTypes = await adminApi.get("/rental-property-types");
        const propertyTypeArray = [
          { value: "All Property Types", label: "All Property Types" },
          ...newPropertyTypes.data.map((type) => ({
            value: type,
            label: type.charAt(0).toUpperCase() + type.slice(1),
          })),
        ];
        setPropertyTypes(propertyTypeArray);

        const newLocationOptions = await adminApi.get("/rental-locations");
        const locationArray = [
          { value: "All Locations", label: "All Locations" },
          ...newLocationOptions.data.map((area) => ({
            value: area,
            label: area,
          })),
        ];
        setRentalLocationOptions(locationArray);

        setDataFetched(true);
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    }
    ///reset search text
    fetchInitialData();
  }, [
    filtersReset,
    searchTerm,
    selectedCities,
    adminPropertyType,
    bathrooms,
    bedrooms,
    rentalLocation,
    squirefeet,
    yearBuild,
    rentDuration,
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
          const nextPage = Math.floor(listings.length / 9) + 1;

          const { data: adminListings } = await adminApi.get(
            "/rental-properties",
            {
              params: getRequestParams(nextPage),
            }
          );

          if (adminListings.data.length === 0) {
            setHasMore(false);
            return;
          }

          const mappedNewListings = adminListings.data.map((item) =>
            mapAdminApiDataToTemplateSingle(item, "qr")
          );
          const newListings = [...listings, ...mappedNewListings];
          setListings(newListings);

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
            <ListingSidebarRent
              locationOptions={rentalLocationOptions}
              propertyTypes={propertyTypes}
              filterFunctions={filterFunctions}
              setSearchTerm={setLocalSearchTerm}
              searchTerm={localSearchTerm}
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
          activeFilterCount={getActiveFilterCount("rent")}
          setDataFetched={setDataFetched}
          colstyle={colstyle}
          setColstyle={setColstyle}
          filterFunctions={filterFunctions}
          setCurrentSortingOption={setCurrentSortingOption}
          locationOptions={rentalLocationOptions}
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
            <FeaturedListingsRent colstyle={colstyle} data={listings} />
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
