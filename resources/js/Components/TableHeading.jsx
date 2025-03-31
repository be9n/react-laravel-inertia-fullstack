import { useQueryParamsStore } from "@/store/useQueryParamsStore";
import SortChevrons from "./SortChevrons";

export default function TableHeading({
  name,
  isSortable = false,
  children,
}) {
  const { queryParams, setQueryParams } = useQueryParamsStore();

  const sortChanged = (name) => {
    setQueryParams(({ sort_by, sort_dir, ...rest }) => {
      const isSameSort = sort_by === name;
      const newSortDir = isSameSort
        ? sort_dir === "asc"
          ? "desc"
          : sort_dir
          ? undefined
          : "asc"
        : "asc";

      return {
        ...rest,
        sort_by: newSortDir ? name : undefined,
        sort_dir: newSortDir,
      };
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
          <SortChevrons isVisible={queryParams.sort_by === name} dir={queryParams.sort_dir} />
        )}
      </div>
    </th>
  );
}
