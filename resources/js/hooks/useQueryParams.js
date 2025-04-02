import { useState } from "react";

const useQueryParams = () => {
  const existingQueryParams = new URLSearchParams(location.search);

  const [queryParams, setQueryParams] = useState({
    search: existingQueryParams.get("search") || undefined,
    sort_by: existingQueryParams.get("sort_by") || undefined,
    sort_dir: existingQueryParams.get("sort_dir") || undefined,
    per_page: existingQueryParams.get("per_page") || undefined,
  });

  const setQueryParam = (key, value) =>
    setQueryParams((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));

  const setMultiple = (updateFn) =>
    setQueryParams((prev) => {
      const updatedParams =
        typeof updateFn === "function" ? updateFn(prev) : updateFn;

      return {
        ...prev,
        ...updatedParams,
      };
    });

  const resetQueryParams = (key = null) =>
    setQueryParams((prev) => {
      if (key) {
        return {
          ...prev,
          [key]: undefined,
        };
      }

      return {
        search: undefined,
        sort_by: undefined,
        sort_dir: undefined,
        per_page: undefined,
      };
    });

  return { queryParams, setQueryParam, setMultiple, resetQueryParams };
};

export default useQueryParams;
