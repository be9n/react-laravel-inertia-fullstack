import { create } from "zustand";

export const useApiFiltersStore = create((set, get) => {
  const filtersFromUrl = () => {
    const filtersString = new URLSearchParams(location.search).get("filters");

    return filtersString
      ? filtersString.split(";").reduce((acc, filter) => {
          const [key, value] = filter.split(":");
          return key && value ? { ...acc, [key]: value } : acc;
        }, {})
      : undefined;
  };

  return {
    filters: filtersFromUrl(),

    setFilter: (key, value) =>
      set((state) => ({
        filters: {
          ...state.filters,
          [key]: value,
        },
      })),

    removeFilter: (key) =>
      set((state) => {
        const { [key]: _, ...newFilters } = state.filters;

        return {
          filters: Object.keys(newFilters).length > 0 ? newFilters : undefined,
        };
      }),

    resetFilters: (key = null) =>
      set((state) => {
        if (!key) return { filters: undefined };

        const { [key]: _, ...newFilters } = state.filters;

        return {
          filters: Object.keys(newFilters).length > 0 ? newFilters : undefined,
        };
      }),

    formatToQueryString: () => {
      const filters = get().filters;

      return (
        filters &&
        Object.entries(filters)
          .map(([key, value]) => `${key}:${value}`)
          .join(";")
      );
    },
  };
});
