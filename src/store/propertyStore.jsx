import { create } from "zustand";

const usePropertyStore = create((set, get) => ({
  // Original properties data
  listings: [],
  filteredData: [],
  sortedFilteredData: [],

  // Loading state
  loading: false,
  dataFetched: false, // Track if data has been fetched

  // Filter states for AdvanceFilterModal and other filters
  selectedPropertyType: "All Property Types",
  adminPropertyType: "All Property Types",
  priceRange: [0, 10000000],
  location: "All Locations",
  rentalLocation: "All Locations",
  buyLocation: "All Locations",
  allLocation: "All Locations", ///for listings page
  offplanBuyLocation: "All Locations",
  categories: [],
  bedrooms: 0,
  bathrooms: 0,
  percentagePreHandover: 0,
  rentDuration: "Monthly",
  squirefeet: [0, 0],
  yearBuild: 50000, //handover date for off plan
  propertyId: "",
  searchTerm: "",
  listingStatus: "All",
  detailedListings: [],
  adminDetailedListings: [],

  // Options arrays
  locationOptions: [], ///off plan
  propertyTypes: [],
  facilityOptions: [],
  saleStatuses: [],
  rentalLocationOptions: [],
  buyLocationOptions: [],
  allLocationOptions: [], ///for listings page
  offplanBuyLocationOptions: [],

  // Actions for setting original data
  setListings: (listings) => set({ listings }),
  setFilteredData: (filteredData) => set({ filteredData }),
  setSortedFilteredData: (sortedFilteredData) => set({ sortedFilteredData }),
  setLoading: (loading) => set({ loading }),
  setDataFetched: (dataFetched) => set({ dataFetched }),

  // Actions for setting options
  setLocationOptions: (locationOptions) => set({ locationOptions }),
  setPropertyTypes: (propertyTypes) => set({ propertyTypes }),
  setFacilityOptions: (facilityOptions) => set({ facilityOptions }),
  setSaleStatuses: (saleStatuses) => set({ saleStatuses }),
  setDetailedListings: (detailedListings) => set({ detailedListings }),
  setAdminDetailedListings: (adminDetailedListings) =>
    set({ adminDetailedListings }),
  setRentalLocationOptions: (rentalLocationOptions) =>
    set({ rentalLocationOptions }),
  setBuyLocationOptions: (buyLocationOptions) => set({ buyLocationOptions }),
  setAllLocationOptions: (allLocationOptions) => set({ allLocationOptions }),
  setOffplanBuyLocationOptions: (offplanBuyLocationOptions) =>
    set({ offplanBuyLocationOptions }),

  // Filter actions for AdvanceFilterModal
  handlePropertyType: (propertyType) => {
    set({ selectedPropertyType: propertyType });
  },
  handleAdminPropertyType: (adminPropertyType) => {
    set({ adminPropertyType });
  },

  handleRentDuration: (rentDuration) => set({ rentDuration }),
  handlePriceRange: (range) => set({ priceRange: range }),

  handleLocation: (locationValue) => set({ location: locationValue }),
  handleRentalLocation: (rentalLocation) => set({ rentalLocation }),
  handleBuyLocation: (buyLocation) => set({ buyLocation }),
  handleAllLocation: (allLocation) => set({ allLocation }),
  handleOffplanBuyLocation: (offplanBuyLocation) =>
    set({ offplanBuyLocation }),
  handleSearchTerm: (searchTerm) => set({ searchTerm }),
  handlePercentagePreHandover: (percentage) =>
    set({ percentagePreHandover: percentage }),

  handleCategories: (categories) => set({ categories }),

  // New filter actions for previously local states
  handleBedrooms: (bedrooms) => set({ bedrooms }),

  handleBathrooms: (bathrooms) => set({ bathrooms }),

  handleSquirefeet: (squirefeet) => set({ squirefeet }),

  handleYearBuild: (yearBuild) => set({ yearBuild }),

  handlePropertyId: (propertyId) => set({ propertyId: propertyId.trim() }),

  handleListingStatus: (status) =>
    set((state) => ({
      listingStatus: state.listingStatus === status ? "All" : status,
    })),

  // Reset all filters function
  resetAllFilters: () =>
    set({
      selectedPropertyType: "All Property Types",
      priceRange: [0, 10000000],
      location: "All Locations",
      rentalLocation: "All Locations",
      buyLocation: "All Locations",
      allLocation: "All Locations",
      offplanBuyLocation: "All Locations",
      categories: [],
      bedrooms: 0,
      bathrooms: 0,
      percentagePreHandover: 0,
      rentDuration: "Monthly",
      squirefeet: [0, 0],
      yearBuild: 50000,
      propertyId: "",
      listingStatus: "All",
      detailedListings: [],
      adminDetailedListings: [],
      searchTerm: "",
      adminPropertyType: "All Property Types",
    }),

  // Check if data needs to be fetched
  shouldFetchData: () => {
    const state = get();
    return !state.dataFetched;
  },

  // Add this to your usePropertyStore actions
  getActiveFilterCount: (filterType) => {
    const state = get();
    // Default values for comparison
    const defaults = {
      priceRange: [0, 10000000],
      bedrooms: 0,
      bathrooms: 0,
      rentDuration: "Monthly",
      squirefeet: [0, 0],
      propertyId: "",
      yearBuild: 50000,
      percentagePreHandover: 0,
    };

    let count = 0;

    switch (filterType) {
      case "rent":
        if (
          JSON.stringify(state.priceRange) !==
          JSON.stringify(defaults.priceRange)
        )
          count++;
        if (state.bedrooms !== defaults.bedrooms) count++;
        if (state.bathrooms !== defaults.bathrooms) count++;
        if (state.rentDuration !== defaults.rentDuration) count++;
        if (
          JSON.stringify(state.squirefeet) !==
          JSON.stringify(defaults.squirefeet)
        )
          count++;
        if (state.propertyId !== defaults.propertyId) count++;
        break;

      case "all":
        if (
          JSON.stringify(state.priceRange) !==
          JSON.stringify(defaults.priceRange)
        )
          count++;
        if (state.bedrooms !== defaults.bedrooms) count++;
        if (state.bathrooms !== defaults.bathrooms) count++;
        if (state.rentDuration !== defaults.rentDuration) count++;
        if (
          JSON.stringify(state.squirefeet) !==
          JSON.stringify(defaults.squirefeet)
        )
          count++;
        if (state.propertyId !== defaults.propertyId) count++;
        break;

      case "off-plan":
        if (
          JSON.stringify(state.priceRange) !==
          JSON.stringify(defaults.priceRange)
        )
          count++;
        if (state.bedrooms !== defaults.bedrooms) count++;
        if (state.bathrooms !== defaults.bathrooms) count++;
        if (
          JSON.stringify(state.squirefeet) !==
          JSON.stringify(defaults.squirefeet)
        )
          count++;
        if (state.propertyId !== defaults.propertyId) count++;
        if (state.yearBuild !== defaults.yearBuild) count++;
        if (state.percentagePreHandover !== defaults.percentagePreHandover)
          count++;
        break;

      case "buy":
        if (
          JSON.stringify(state.priceRange) !==
          JSON.stringify(defaults.priceRange)
        )
          count++;
        if (state.bedrooms !== defaults.bedrooms) count++;
        if (state.bathrooms !== defaults.bathrooms) count++;
        if (
          JSON.stringify(state.squirefeet) !==
          JSON.stringify(defaults.squirefeet)
        )
          count++;
        if (state.propertyId !== defaults.propertyId) count++;
        break;

      default:
        return 0;
    }

    return count;
  },
  getHomeFilterCount: (filterType) => {
    const state = get();

    // Default values for comparison
    const defaults = {
      squirefeet: [0, 0],
      searchTerm: "",
      propertyId: "",
      yearBuild: 50000,
      percentagePreHandover: 0,
    };

    let count = 0;

    switch (filterType) {
      case "rent":
        if (
          JSON.stringify(state.squirefeet) !==
          JSON.stringify(defaults.squirefeet)
        )
          count++;
        if (state.searchTerm !== defaults.searchTerm) count++;
        if (state.propertyId !== defaults.propertyId) count++;
        break;

      case "off-plan":
        if (
          JSON.stringify(state.squirefeet) !==
          JSON.stringify(defaults.squirefeet)
        )
          count++;
        if (state.searchTerm !== defaults.searchTerm) count++;
        if (state.propertyId !== defaults.propertyId) count++;
        if (state.yearBuild !== defaults.yearBuild) count++;
        if (state.percentagePreHandover !== defaults.percentagePreHandover)
          count++;
        break;

      case "buy":
        if (
          JSON.stringify(state.squirefeet) !==
          JSON.stringify(defaults.squirefeet)
        )
          count++;
        if (state.searchTerm !== defaults.searchTerm) count++;
        if (state.propertyId !== defaults.propertyId) count++;
        break;

      default:
        return 0;
    }

    return count;
  },
}));

export default usePropertyStore;
