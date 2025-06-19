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
  priceRange: [0, 10000000],
  location: "All Locations",
  categories: [],
  bedrooms: 0,
  bathrooms: 0,
  percentagePreHandover: 0,
  rentDuration: "Yearly",
  squirefeet: [],
  yearBuild: 50000,
  propertyId: "",
  listingStatus: "All",
  detailedListings: [],

  // Options arrays
  locationOptions: [],
  propertyTypes: [],
  facilityOptions: [],
  saleStatuses: [],

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

  // Filter actions for AdvanceFilterModal
  handlePropertyType: (propertyType) => {
    set({ selectedPropertyType: propertyType });
  },
  handleRentDuration: (rentDuration) => set({ rentDuration }),
  handlePriceRange: (range) => set({ priceRange: range }),

  handleLocation: (locationValue) => set({ location: locationValue }),
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
      categories: [],
      bedrooms: 0,
      bathrooms: 0,
      squirefeet: [],
      yearBuild: 50000,
      propertyId: "",
      listingStatus: "All",
    }),

  // Get current filter state
  getFilterState: () => {
    const state = get();
    return {
      selectedPropertyType: state.selectedPropertyType,
      priceRange: state.priceRange,
      location: state.location,
      categories: state.categories,
      bedrooms: state.bedrooms,
      bathrooms: state.bathrooms,
      squirefeet: state.squirefeet,
      yearBuild: state.yearBuild,
      propertyId: state.propertyId,
      listingStatus: state.listingStatus,
    };
  },

  // Check if data needs to be fetched
  shouldFetchData: () => {
    const state = get();
    return !state.dataFetched;
  },
}));

export default usePropertyStore;
