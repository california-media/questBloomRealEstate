import React, { useState, useEffect, useCallback } from "react";
import ListingSidebar from "../../sidebar";
import AdvanceFilterModal from "@/components/common/advance-filter-two";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import api from "@/api/axios";
import mapApiDataToTemplate from "@/utilis/mapApiDataToTemplate";
import usePropertyStore from "@/store/propertyStore";
import mapApiDataToTemplateSingle from "@/utilis/mapApiDataToTemplateSingle";

const isDev = import.meta.env.DEV;

const hardcoded_facilities = ["Swimming Pool"];

export default function ProperteyFiltering({ region, search }) {
  // Get all data and actions from store
  const {
    listings,
    filteredData,
    sortedFilteredData,
    loading,
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
    facilityOptions,
    saleStatuses,
    setListings,
    setFilteredData,
    setSortedFilteredData,
    setLoading,
    setDataFetched,
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
    shouldFetchData,
  } = usePropertyStore();

  // Local component states
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [colstyle, setColstyle] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

  // Filter functions object for components that need access to handlers
  const filterFunctions = {
    handlelistingStatus: handleListingStatus,
    handlepropertyType: handlePropertyType,
    handlepriceRange: handlePriceRange,
    handlebedrooms: handleBedrooms,
    handlebathroms: handleBathrooms,
    handlelocation: handleLocation,
    handlesquirefeet: handleSquirefeet,
    handleyearBuild: handleYearBuild,
    handlecategories: handleCategories,
    handlePropertyId: handlePropertyId,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,
    bedrooms,
    bathrooms,
    location,
    squirefeet,
    yearBuild,
    categories,
    selectedPropertyType,
  };

  // Fetch more data when reaching bottom
  const fetchMoreData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = Math.floor(listings.length / 9) + 1;

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
        ...(location != "All Locations" && { areas: location }),
        ...(bedrooms != 0 && { unit_bedrooms: bedrooms }),
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
        ...(search && { search_query: search }),
      };

      const { data } = await api.get("/properties", { params });

      if (data.items.length === 0) {
        setHasMore(false);
        return;
      }

      const mappedNewListings = data.items.map((item) =>
        mapApiDataToTemplateSingle(item)
      );

      setListings([...listings, ...mappedNewListings]);
    } catch (error) {
      console.error("Failed to fetch more data", error);
    } finally {
      setLoading(false);
    }
  }, [
    listings,
    loading,
    hasMore,
    selectedPropertyType,
    priceRange,
    propertyId,
    location,
    bedrooms,
    squirefeet,
    listingStatus,
    region,
    search,
    setListings,
    setLoading,
  ]);

  // Initial data fetch
  useEffect(() => {
    async function fetchInitialData() {
      setLoading(true);
      setListings([]); // Clear existing listings
      setHasMore(true); // Reset hasMore when filters change

      try {
        const params = {
          page: 1,
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
          ...(location != "All Locations" && { areas: location }),
          ...(bedrooms != 0 && { unit_bedrooms: bedrooms }),
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
          ...(search && { search_query: search }),
        };

        const { data } = await api.get("/properties", { params });

        // Set listings in store
        const mappedNewListings = data.items.map((item) =>
          mapApiDataToTemplateSingle(item)
        );
        setListings(mappedNewListings);
        setHasMore(data.items.length === 9); // If we got 9 items, there might be more

        // Must refetch since the format in whcih they are fetched on home page is different
        const newSaleStatuses = await api.get("/sale-statuses");
        setSaleStatuses(newSaleStatuses.data);

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
              value: area.id,
              label: area.name,
            })),
          ];
          setLocationOptions(options);
        }

        setDataFetched(true);
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, [
    region,
    search,
    listingStatus,
    selectedPropertyType,
    bedrooms,
    location,
    squirefeet,
    yearBuild,
    categories,
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
            <ListingSidebar filterFunctions={filterFunctions} />
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
              setDataFetched={setDataFetched}
              locationOptions={locationOptions}
              propertyTypes={propertyTypes}
              facilityOptions={facilityOptions}
              filterFunctions={filterFunctions}
            />
          </div>
        </div>
        {/* <!-- Advance Feature Modal End --> */}

        <div className="row">
          <TopFilterBar
            setDataFetched={setDataFetched}
            colstyle={colstyle}
            setColstyle={setColstyle}
            filterFunctions={filterFunctions}
            setCurrentSortingOption={setCurrentSortingOption}
            locationOptions={locationOptions}
            saleStatuses={saleStatuses}
          />
        </div>
        {/* End TopFilterBar */}

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
              margin: "300px",
            }}
            className=" text-center"
          >
            No listings found.
          </h5>
        ) : (
          <div className="row">
            <FeaturedListings colstyle={colstyle} data={listings} />
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
