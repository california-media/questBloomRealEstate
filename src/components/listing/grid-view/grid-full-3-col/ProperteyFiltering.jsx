import React, { useState, useEffect } from "react";
import ListingSidebar from "../../sidebar";
import AdvanceFilterModal from "@/components/common/advance-filter-two";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import Pagination from "../../Pagination";
import PaginationTwo from "../../PaginationTwo";
import api from "@/api/axios";
import mapApiDataToTemplate from "@/utilis/mapApiDataToTemplate";
const isDev = import.meta.env.DEV;

export default function ProperteyFiltering({ region, search }) {
  const [filteredData, setFilteredData] = useState([]);
  const [listings, setListings] = useState([]);
  const [propertyId, setPropertyId] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [locationOptions, setLocationOptions] = useState([]);

  const [sortedFilteredData, setSortedFilteredData] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);
  const [saleStatuses, setSaleStatuses] = useState([]);
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

  const [listingStatus, setListingStatus] = useState("All");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] =
    useState("All Property Types");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroms, setBathroms] = useState(0);
  const [location, setLocation] = useState("All Locations");
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setyearBuild] = useState([]);
  const [categories, setCategories] = useState([]);
  const [facilityOptions, setFacilityOptions] = useState([]);

  const resetFilter = () => {
    setListingStatus("All");
    setPropertyId("");
    setSelectedPropertyType("All Property Types");
    setPriceRange([0, 10000000]);
    setBedrooms(0);
    setBathroms(0);
    setLocation("All Locations");
    setSquirefeet([]);
    setyearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption("Newest");
    document.querySelectorAll(".filterInput").forEach(function (element) {
      element.value = null;
    });

    document.querySelectorAll(".filterSelect").forEach(function (element) {
      element.value = "All Locations";
    });
  };

  const handlelistingStatus = (elm) => {
    setListingStatus((pre) => (pre == elm ? "All" : elm));
  };
  const handlePropertyId = (elm) => {
    setPropertyId(elm.trim());
  };
  const handlepropertyType = (elm) => {
    setSelectedPropertyType(elm);
  };
  const handlepriceRange = (elm) => {
    setPriceRange(elm);
  };
  const handlebedrooms = (elm) => {
    setBedrooms(elm);
  };
  const handlebathroms = (elm) => {
    setBathroms(elm);
  };
  const handlelocation = (elm) => {
    setLocation(elm);
  };
  const handlesquirefeet = (elm) => {
    setSquirefeet(elm);
  };
  const handleyearBuild = (elm) => {
    setyearBuild(elm);
  };
  const handlecategories = (elm) => {
    setCategories((pre) =>
      pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm]
    );
  };
  const filterFunctions = {
    handlelistingStatus,
    handlepropertyType,
    handlepriceRange,
    handlebedrooms,
    handlebathroms,
    handlelocation,
    handlesquirefeet,
    handleyearBuild,
    handlecategories,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,
    handlePropertyId,
    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
  };
  useEffect(() => {
    async function fetchListings() {
      setLoading(true);

      try {
        const { data } = region
          ? await api.get("/properties", { params: { region } })
          : search
          ? await api.get("/properties", { params: { search_query: search } })
          : await api.get("/properties");

        const detailedListings = await Promise.all(
          data.items.map(async (listing) => {
            const id = listing.id; // assuming each listing has an `id`
            const { data: detailedData } = isDev
              ? await api.get(`/properties/${id}`)
              : await api.get("/property", { params: { id } });

            return detailedData;
          })
        );

        // Set listings
        setListings(
          detailedListings.map((detailedData, index) =>
            mapApiDataToTemplate(data.items[index], detailedData)
          )
        );
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
          (d) => d.facilities?.map((f) => f.name) || []
        );
        const uniqueFacilities = [...new Set(allFacilities)];
        setFacilityOptions(uniqueFacilities); // <-- Add this state hook: const [facilityOptions, setFacilityOptions] = useState([])

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
        setPropertyTypes(options); // <-- Add this state hook: const [propertyTypeOptions, setPropertyTypeOptions] = useState([])

        console.log("all fetched");
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);
  useEffect(() => {
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
  }, [listings]);

  useEffect(() => {
    // Extract unique area values

    const refItems = listings.filter((elm) => {
      if (listingStatus === "All") {
        return true;
      }

      return elm.sale_status === listingStatus;
    });
    let filteredArrays = [];
    /// property type
    if (selectedPropertyType != "All Property Types") {
      const filtered = refItems.filter((elm) =>
        elm.propertyTypes.includes(selectedPropertyType)
      );
      filteredArrays = [...filteredArrays, filtered];
    } else {
      filteredArrays = [...filteredArrays, refItems];
    }

    ///beds
    filteredArrays = [
      ...filteredArrays,
      refItems.filter((el) => {
        return el.bed >= bedrooms;
      }),
    ];
    // filteredArrays = [
    //   ...filteredArrays,
    //   refItems.filter((el) => el.bath >= bathroms),
    // ];

    filteredArrays = [
      ...filteredArrays,
      !categories.length
        ? [...refItems]
        : refItems.filter((elm) =>
            categories.every((elem) => elm.features.includes(elem))
          ),
    ];

    if (location != "All Locations") {
      filteredArrays = [
        ...filteredArrays,
        refItems.filter((el) => el.city == location),
      ];
    }

    if (priceRange.length > 0) {
      const filtered = refItems.filter(
        (elm) =>
          Number(elm.price.split("$")[1].split(",").join("")) >=
            priceRange[0] &&
          Number(elm.price.split("$")[1].split(",").join("")) <= priceRange[1]
      );
      filteredArrays = [...filteredArrays, filtered];
    }

    if (
      squirefeet.length > 0 &&
      squirefeet[1] &&
      squirefeet[0] <= squirefeet[1] &&
      squirefeet[0] != 0 &&
      squirefeet[1] != 0
    ) {
      const filtered = refItems.filter((elm) => {
        const [rangeMin, rangeMax] = squirefeet;
        console.log(Number(rangeMin), Number(rangeMax));

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
    propertyTypes,
    priceRange,
    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    listings,
    facilityOptions,
    propertyId,
    selectedPropertyType,
  ]);

  useEffect(() => {
    setPageNumber(1);
    if (currentSortingOption == "Newest") {
      const sorted = [...filteredData].sort(
        (a, b) => a.yearBuilding - b.yearBuilding
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() == "Price Low") {
      const sorted = [...filteredData].sort(
        (a, b) =>
          a.price.split("$")[1].split(",").join("") -
          b.price.split("$")[1].split(",").join("")
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() == "Price High") {
      const sorted = [...filteredData].sort(
        (a, b) =>
          b.price.split("$")[1].split(",").join("") -
          a.price.split("$")[1].split(",").join("")
      );
      setSortedFilteredData(sorted);
    } else {
      setSortedFilteredData(filteredData);
    }
  }, [filteredData, currentSortingOption]);

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
