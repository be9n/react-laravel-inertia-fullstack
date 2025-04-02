import useQueryParamsStore from "@/store/useQueryParamsStore";
import SortChevrons from "./SortChevrons";

export default function TableHeading2({ name, isSortable = false, children }) {
  const { queryParams, setQueryParams } = useQueryParamsStore();

  const sortChanged = (name) => {
    const isSameSort = queryParams.sort_by === name;
    const newSortDir = isSameSort
      ? queryParams.sort_dir === "asc"
        ? "desc"
        : queryParams.sort_dir
        ? undefined
        : "asc"
      : "asc";

    setQueryParams({
      sort_by: newSortDir ? name : undefined,
      sort_dir: newSortDir,
    });
  };

  return (
    <th
      onClick={() => isSortable && sortChanged(name)}
      className="px-3 py-4 text-start"
    >
      <div
        className={`group flex items-center gap-1 ${
          isSortable && "cursor-pointer"
        }`}
      >
        {children}
        {isSortable && (
          <SortChevrons
            isVisible={queryParams.sort_by === name}
            dir={queryParams.sort_dir}
          />
        )}
      </div>
    </th>
  );
}
