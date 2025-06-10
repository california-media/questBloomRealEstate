import React, { useState, useEffect } from "react";
import ListingSidebar from "../../sidebar";
import AdvanceFilterModal from "@/components/common/advance-filter-two";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import PaginationTwo from "../../PaginationTwo";
import api from "@/api/axios";
import mapApiDataToTemplate from "@/utilis/mapApiDataToTemplate";
import usePropertyStore from "@/store/propertyStore"; // Import the store

const isDev = import.meta.env.DEV;

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
    setDetailedListings,
  } = usePropertyStore();

  // Local component states (only UI-related states that don't need global access)
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);

  useEffect(() => {
    setPageItems(
      sortedFilteredData.slice((pageNumber - 1) * 9, pageNumber * 9)
    );
    setPageContentTrac([
      (pageNumber - 1) * 9 + 1,
      pageNumber * 9,
      sortedFilteredData.length,
    ]);
  }, [pageNumber, sortedFilteredData]);

  const resetFilter = () => {
    setCurrentSortingOption("Newest");

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

  useEffect(() => {
    async function fetchListings() {
      // Only fetch if data hasn't been fetched or if data is empty
      if (!shouldFetchData(region, search)) {
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
        setDetailedListings(detailedListings);
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
    region,
    search,
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

  // Filtering logic using all store values
  useEffect(() => {
    if (listings.length === 0) return;

    const refItems = listings.filter((elm) => {
      if (listingStatus === "All") {
        return true;
      }
      return elm.sale_status === listingStatus;
    });

    let filteredArrays = [];

    // Property type filter
    if (selectedPropertyType !== "All Property Types") {
      const filtered = refItems.filter((elm) =>
        elm.propertyTypes.includes(selectedPropertyType)
      );
      filteredArrays = [...filteredArrays, filtered];
    } else {
      filteredArrays = [...filteredArrays, refItems];
    }

    // Beds filter
    filteredArrays = [
      ...filteredArrays,
      refItems.filter((el) => {
        return el.bed >= bedrooms;
      }),
    ];

    // Bathrooms filter
    filteredArrays = [
      ...filteredArrays,
      refItems.filter((el) => {
        return el.bath >= bathroms;
      }),
    ];

    // Categories filter
    filteredArrays = [
      ...filteredArrays,
      !categories.length
        ? [...refItems]
        : refItems.filter((elm) =>
            categories.every((elem) =>
              elm.features.some((feature) => feature.trim() === elem.trim())
            )
          ),
    ];

    // Location filter
    if (location !== "All Locations") {
      filteredArrays = [
        ...filteredArrays,
        refItems.filter((el) => el.city === location),
      ];
    }

    // Price range filter
    if (priceRange.length > 0) {
      const filtered = refItems.filter(
        (elm) =>
          Number(elm.price.split("$")[1].split(",").join("")) >=
            priceRange[0] &&
          Number(elm.price.split("$")[1].split(",").join("")) <= priceRange[1]
      );
      filteredArrays = [...filteredArrays, filtered];
    }

    // Square feet filter
    if (
      squirefeet.length > 0 &&
      squirefeet[1] &&
      squirefeet[0] <= squirefeet[1] &&
      squirefeet[0] !== 0 &&
      squirefeet[1] !== 0
    ) {
      const filtered = refItems.filter((elm) => {
        const [rangeMin, rangeMax] = squirefeet;

        const minInRange =
          elm.min_sqft >= Number(rangeMin) && elm.min_sqft <= Number(rangeMax);
        const maxInRange =
          elm.max_sqft >= Number(rangeMin) && elm.max_sqft <= Number(rangeMax);
        const rangeWithinElm =
          Number(rangeMin) >= elm.min_sqft && Number(rangeMax) <= elm.max_sqft;

        return minInRange || maxInRange || rangeWithinElm;
      });
      filteredArrays = [...filteredArrays, filtered];
    }

    // Year built filter
    if (yearBuild.length > 0) {
      const filtered = refItems.filter(
        (elm) =>
          elm.yearBuilding >= yearBuild[0] && elm.yearBuilding <= yearBuild[1]
      );
      filteredArrays = [...filteredArrays, filtered];
    }

    const commonItems = refItems
      .filter((item) => filteredArrays.every((array) => array.includes(item)))
      .filter((item) => (propertyId !== "" ? item.id == propertyId : true));

    setFilteredData(commonItems);
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
    listings,
    propertyId,
    setFilteredData,
  ]);

  useEffect(() => {
    setPageNumber(1);
    if (currentSortingOption === "Newest") {
      const sorted = [...filteredData].sort(
        (a, b) => a.yearBuilding - b.yearBuilding
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() === "Price Low") {
      const sorted = [...filteredData].sort(
        (a, b) =>
          a.price.split("$")[1].split(",").join("") -
          b.price.split("$")[1].split(",").join("")
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() === "Price High") {
      const sorted = [...filteredData].sort(
        (a, b) =>
          b.price.split("$")[1].split(",").join("") -
          a.price.split("$")[1].split(",").join("")
      );
      setSortedFilteredData(sorted);
    } else {
      setSortedFilteredData(filteredData);
    }
  }, [filteredData, currentSortingOption, setSortedFilteredData]);

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
              <span className="visually-hidden">Loading...</span>
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
            data={sortedFilteredData}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
