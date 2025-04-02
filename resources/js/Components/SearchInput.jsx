import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { useDebounce } from "use-debounce";
import useQueryParamsStore from "@/store/useQueryParamsStore";

export default function SearchInput2({ placeholder }) {
  const { queryParams, setQueryParams } = useQueryParamsStore();
  const [searchTerm, setSearchTerm] = useState(queryParams.search || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    setQueryParams({
      search: debouncedSearchTerm === "" ? undefined : debouncedSearchTerm,
    });
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setSearchTerm(queryParams.search || "");
  }, [queryParams.search]);

  return (
    <TextInput
      className="w-full"
      placeholder={placeholder ?? "Search here"}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
