import React, { useState, useEffect } from "react";
import ListingSidebar from "../../sidebar";
import AdvanceFilterModal from "@/components/common/advance-filter-two";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import PaginationTwo from "../../PaginationTwo";
import api from "@/api/axios";
import mapApiDataToTemplate from "@/utilis/mapApiDataToTemplate";
import usePropertyStore from "@/store/propertyStore"; // Import the store
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
    bathroms,
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
    handleBathroms,
    handleSquirefeet,
    handleYearBuild,
    handlePropertyId,
    handleListingStatus,
    resetAllFilters,
    shouldFetchData,
  } = usePropertyStore();

  // Local component states
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);

  // Pagination states
  const [paginationInfo, setPaginationInfo] = useState({
    has_next: false,
    has_prev: false,
    page: 1,
    pages: 1,
    per_page: 9,
    total: 0,
  });

  const [fetchedPages, setFetchedPages] = useState(new Set([1])); // Track which pages have been fetched

  // Update page items based on current page and available data
  useEffect(() => {
    const startIndex = (pageNumber - 1) * 9;
    const endIndex = pageNumber * 9;
    const currentPageItems = listings.slice(startIndex, startIndex + 9);
    setPageItems(currentPageItems);
    setPageContentTrac([
      startIndex + 1,
      Math.min(endIndex, listings.length),
      paginationInfo.total,
    ]);
  }, [pageNumber, listings, paginationInfo.total]);

  // Handle page change - fetch new data if needed
  const handlePageChange = async (newPageNumber) => {
    setPageNumber(newPageNumber);
    // If we haven't fetched this page yet and we're going forward
    if (
      !fetchedPages.has(newPageNumber) &&
      newPageNumber > Math.max(...fetchedPages)
    ) {
      await fetchPageData(newPageNumber);
    }
  };

  // Fetch data for a specific page
  const fetchPageData = async (page) => {
    setLoading(true);
    try {
      const params = {
        page,
        per_page: 9,
        ...(region && { region }),
        ...(search && { search_query: search }),
      };

      const { data } = await api.get("/properties", { params });

      // Get detailed data for new items
      // const newDetailedListings = await Promise.all(
      //   data.items.map(async (listing) => {
      //     const id = listing.id;
      //     const { data: detailedData } = isDev
      //       ? await api.get(`/properties/${id}`)
      //       : await api.get("/property", { params: { id } });
      //     return detailedData;
      //   })
      // );

      // Map new listings
      const mappedNewListings = data.items.map((item) =>
        mapApiDataToTemplateSingle(item)
      );

      // Update store with merged data
      // setDetailedListings([...detailedListings, ...newDetailedListings]);
      setListings([...listings, ...mappedNewListings]);

      // Update pagination info
      setPaginationInfo(data.pagination);

      // Mark this page as fetched
      setFetchedPages((prev) => new Set([...prev, page]));
    } catch (error) {
      console.error("Failed to fetch page data", error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilter = () => {
    setCurrentSortingOption("Newest");
    setPageNumber(1);

    // Reset all store filters
    resetAllFilters();

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
    handlebathroms: handleBathroms,
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
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    selectedPropertyType,
  };

  // Initial data fetch
  useEffect(() => {
    async function fetchInitialData() {
      // if (!shouldFetchData()) {
      //   console.log("blocked by shouldFetchData");
      //   return;
      // }
      // if (detailedListings.length > 0 || listings.length > 0) return;

      setLoading(true);

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
        // Logging all variables used in `params`

        console.log("Constructed params:", params);
        const { data } = await api.get("/properties", { params });

        // const detailedListings = await Promise.all(
        //   data.items.map(async (listing) => {
        //     const id = listing.id;
        //     const { data: detailedData } = isDev
        //       ? await api.get(`/properties/${id}`)
        //       : await api.get("/property", { params: { id } });
        //     return detailedData;
        //   })
        // );
        // setDetailedListings(detailedListings);

        // Set listings in store
        const mappedNewListings = data.items.map((item) =>
          mapApiDataToTemplateSingle(item)
        );
        setListings(mappedNewListings);

        // Set pagination info
        setPaginationInfo(data.pagination);
        setFetchedPages(new Set([1]));

        // Must refetch since the format in whcih they are fetched on home page is different
        const newSaleStatuses = await api.get("/sale-statuses");
        const formattedStatuses = [
          { id: "flexRadioDefault0", label: "All", defaultChecked: true },
          ...newSaleStatuses.data.map((status, index) => ({
            id: `flexRadioDefault${index + 1}`,
            label: status,
          })),
        ];
        console.log("saleStatuses", formattedStatuses);
        setSaleStatuses(formattedStatuses);

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
        setPageNumber(1);
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

  // Client-side filtering logic (now works on paginated data)
  // useEffect(() => {
  //   if (listings.length === 0) return;

  //   const refItems = listings.filter((elm) => {
  //     if (listingStatus === "All") {
  //       return true;
  //     }
  //     return elm.sale_status === listingStatus;
  //   });

  //   let filteredArrays = [];

  //   // Property type filter
  //   if (selectedPropertyType !== "All Property Types") {
  //     const filtered = refItems.filter((elm) =>
  //       elm.propertyTypes.includes(selectedPropertyType)
  //     );
  //     filteredArrays = [...filteredArrays, filtered];
  //   } else {
  //     filteredArrays = [...filteredArrays, refItems];
  //   }

  //   // Beds filter
  //   filteredArrays = [
  //     ...filteredArrays,
  //     refItems.filter((el) => {
  //       return el.bed >= bedrooms;
  //     }),
  //   ];

  //   // Bathrooms filter
  //   filteredArrays = [
  //     ...filteredArrays,
  //     refItems.filter((el) => {
  //       return el.bath >= bathroms;
  //     }),
  //   ];

  //   // Categories filter
  //   filteredArrays = [
  //     ...filteredArrays,
  //     !categories.length
  //       ? [...refItems]
  //       : refItems.filter((elm) =>
  //           categories.every((elem) =>
  //             elm.features.some((feature) => feature.trim() === elem.trim())
  //           )
  //         ),
  //   ];

  //   // Location filter
  //   if (location !== "All Locations") {
  //     filteredArrays = [
  //       ...filteredArrays,
  //       refItems.filter((el) => el.city === location),
  //     ];
  //   }

  //   // Price range filter
  //   if (priceRange.length > 0) {
  //     const filtered = refItems.filter(
  //       (elm) =>
  //         Number(elm.price.split("$")[1].split(",").join("")) >=
  //           priceRange[0] &&
  //         Number(elm.price.split("$")[1].split(",").join("")) <= priceRange[1]
  //     );
  //     filteredArrays = [...filteredArrays, filtered];
  //   }

  //   // Square feet filter
  //   if (
  //     squirefeet.length > 0 &&
  //     squirefeet[1] &&
  //     squirefeet[0] <= squirefeet[1] &&
  //     squirefeet[0] !== 0 &&
  //     squirefeet[1] !== 0
  //   ) {
  //     const filtered = refItems.filter((elm) => {
  //       const [rangeMin, rangeMax] = squirefeet;

  //       const minInRange =
  //         elm.min_sqft >= Number(rangeMin) && elm.min_sqft <= Number(rangeMax);
  //       const maxInRange =
  //         elm.max_sqft >= Number(rangeMin) && elm.max_sqft <= Number(rangeMax);
  //       const rangeWithinElm =
  //         Number(rangeMin) >= elm.min_sqft && Number(rangeMax) <= elm.max_sqft;

  //       return minInRange || maxInRange || rangeWithinElm;
  //     });
  //     filteredArrays = [...filteredArrays, filtered];
  //   }

  //   // Year built filter
  //   if (yearBuild.length > 0) {
  //     const filtered = refItems.filter(
  //       (elm) =>
  //         elm.yearBuilding >= yearBuild[0] && elm.yearBuilding <= yearBuild[1]
  //     );
  //     filteredArrays = [...filteredArrays, filtered];
  //   }

  //   const commonItems = refItems
  //     .filter((item) => filteredArrays.every((array) => array.includes(item)))
  //     .filter((item) => (propertyId !== "" ? item.id == propertyId : true));

  //   setFilteredData(commonItems);
  // }, [
  //   listingStatus,
  //   selectedPropertyType,
  //   priceRange,
  //   bedrooms,
  //   bathroms,
  //   location,
  //   squirefeet,
  //   categories,
  //   listings,
  //   propertyId,
  //   setFilteredData,
  // ]);

  // Sorting logic
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

  // Reset to page 1 when filters change
  useEffect(() => {
    setPageNumber(1);
  }, [
    listingStatus,
    selectedPropertyType,
    priceRange,
    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    propertyId,
  ]);

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
              setPageNumber={setPageNumber}
            />
          </div>
        </div>
        {/* <!-- Advance Feature Modal End --> */}

        <div className="row">
          <TopFilterBar
            setDataFetched={setDataFetched}
            pageContentTrac={pageContentTrac}
            colstyle={colstyle}
            setColstyle={setColstyle}
            filterFunctions={filterFunctions}
            setCurrentSortingOption={setCurrentSortingOption}
            locationOptions={locationOptions}
            saleStatuses={saleStatuses}
          />
        </div>
        {/* End TopFilterBar */}

        {loading ? (
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
        ) : pageItems.length === 0 ? (
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
            <FeaturedListings colstyle={colstyle} data={pageItems} />
          </div>
        )}

        {/* End .row */}

        <div className="row">
          <PaginationTwo
            pageCapacity={9}
            pageNumber={pageNumber}
            setPageNumber={handlePageChange}
            paginationInfo={paginationInfo}
            isLoading={loading}
          />
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
