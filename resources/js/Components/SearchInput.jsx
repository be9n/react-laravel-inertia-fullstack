import { useQueryParamsStore } from "@/store/useQueryParamsStore";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { useDebounce } from "use-debounce";

export default function SearchInput() {
  const { queryParams, setQueryParam } = useQueryParamsStore();
  const [searchTerm, setSearchTerm] = useState(queryParams.search || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  useEffect(() => {
    setQueryParam(
      "search",
      debouncedSearchTerm === "" ? undefined : debouncedSearchTerm
    );
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setSearchTerm(queryParams.search || "");
  }, [queryParams.search]);

  return (
    <TextInput
      className="w-full"
      placeholder="Project Name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
