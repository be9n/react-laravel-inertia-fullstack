import { create } from "zustand";

export const useQueryParamsStore = create((set) => {
  const existingQueryParams = new URLSearchParams(location.search);

  return {
    queryParams: {
      search: existingQueryParams.get("search") || undefined,
      sort_by: existingQueryParams.get("sort_by") || undefined,
      sort_dir: existingQueryParams.get("sort_dir") || undefined,
      per_page: existingQueryParams.get("per_page") || undefined,
    },

    setQueryParam: (key, value) =>
      set((state) => ({
        queryParams: {
          ...state.queryParams,
          [key]: value || undefined,
        },
      })),

    setQueryParams: (updateFn) =>
      set((state) => {
        const updatedParams =
          typeof updateFn === "function"
            ? updateFn(state.queryParams)
            : updateFn;

        return {
          queryParams: {
            ...state.queryParams,
            ...updatedParams,
          },
        };
      }),

    resetQueryParams: (key = null) =>
      set((state) => {
        if (key) {
          return {
            queryParams: {
              ...state.queryParams,
              [key]: undefined,
            },
          };
        }

        return {
          queryParams: {
            search: undefined,
            sort_by: undefined,
            sort_dir: undefined,
            per_page: undefined,
          },
        };
      }),
  };
});
