// resources/js/Stores/useQueryParamsStore.js
import { create } from "zustand";
import { router } from "@inertiajs/react";

/**
 * Parses filters from the URL query string.
 * Format: ?filters=status:active;priority:high
 */
const parseFiltersFromUrl = () => {
  const filtersString = new URLSearchParams(window.location.search).get(
    "filters"
  );
  if (!filtersString) return undefined;

  return filtersString.split(";").reduce((acc, filter) => {
    const [key, value] = filter.split(":");
    if (key && value) acc[key] = value;
    return acc;
  }, {});
};

/**
 * Parses query parameters from the URL.
 */
const parseQueryParamsFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    sort_by: params.get("sort_by") || undefined,
    sort_dir: params.get("sort_dir") || undefined,
    search: params.get("search") || undefined,
    per_page: params.get("per_page") || undefined,
    page: params.get("page") || undefined,
  };
};

/**
 * Formats filters into a query string for navigation.
 */
const formatFiltersToQueryString = (filters) => {
  return filters
    ? Object.entries(filters)
        .map(([key, value]) => `${key}:${value}`)
        .join(";")
    : undefined;
};

/**
 * Navigates to a given route with the current query params and filters.
 */
const navigate = () => {
  const { queryParams, filters, currentRoute } =
    useQueryParamsStore.getState();
  router.get(
    currentRoute,
    { ...queryParams, filters: formatFiltersToQueryString(filters) },
    { preserveState: true, preserveScroll: true, replace: true }
  );
};

const useQueryParamsStore = create((set, get) => ({
  queryParams: parseQueryParamsFromUrl(),
  filters: parseFiltersFromUrl(),
  currentRoute: null,

  syncWithUrl: (route) => {
    if (!route) throw new Error("No route specified");

    set(() => ({
      queryParams: parseQueryParamsFromUrl(),
      filters: parseFiltersFromUrl(),
      currentRoute: route,
    }));
  },

  setQueryParams: (params) => {
    set((state) => ({
      queryParams: { ...state.queryParams, ...params },
    }));

    navigate();
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));

    navigate();
  },

  resetFilters: (filterKeys = null) => {
    set((state) => {
      if (!filterKeys || filterKeys.length == 0) return { filters: undefined };

      const keysToReset = Array.isArray(filterKeys) ? filterKeys : [filterKeys];
      const updatedFilters = { ...state.filters };

      keysToReset.forEach((key) => delete updatedFilters[key]);

      return {
        filters: Object.keys(updatedFilters).length
          ? updatedFilters
          : undefined,
      };
    });

    navigate();
  },

  resetAll: () => {
    set(() => ({
      queryParams: {
        sort_by: undefined,
        sort_dir: undefined,
        search: undefined,
        per_page: undefined,
        page: undefined,
      },
      filters: undefined,
    }));

    navigate();
  },
}));

export default useQueryParamsStore;
