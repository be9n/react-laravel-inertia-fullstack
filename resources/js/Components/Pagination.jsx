import { Link } from "@inertiajs/react";
import SelectInput from "./SelectInput";
import useQueryParamsStore from "@/store/useQueryParamsStore";

export default function Pagination2({ pagination }) {
  const { queryParams, setQueryParams } = useQueryParamsStore();
  const { current_page, last_page, path, has_pages } = pagination;

  if (!has_pages) {
    return null;
  }

  // Function to create a URL with the current filters and a specific page
  const createPageUrl = (pageNumber) => {
    const params = new URLSearchParams(location.search);
    params.set("page", pageNumber);

    return `${path}?${params.toString()}`;
  };

  // Generate an array of page numbers to display
  const getPageRange = () => {
    const range = [];
    const maxVisiblePages = 5; // Show at most 5 page links

    // Calculate the visible range
    let startPage = Math.max(1, current_page - 2);
    let endPage = Math.min(last_page, startPage + maxVisiblePages - 1);

    // Adjust start if needed
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Create the range
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <div className="flex-1 text-center space-x-2 space-y-2">
        {/* Previous page link */}
        <Link
          preserveState
          preserveScroll
          className={`inline-block py-2 px-4 rounded-lg text-gray-200 text-xs select-none
          ${
            current_page === 1
              ? "!text-gray-500 cursor-not-allowed pointer-events-none"
              : "hover:bg-gray-950"
          }`}
          href={current_page > 1 ? createPageUrl(current_page - 1) : undefined}
        >
          &laquo; Previous
        </Link>

        {/* First page link if not in range */}
        {getPageRange()[0] > 1 && (
          <>
            <Link
              preserveState
              preserveScroll
              className="inline-block py-2 px-4 rounded-lg text-gray-200 text-xs select-none hover:bg-gray-950"
              href={createPageUrl(1)}
            >
              1
            </Link>
            <span className="inline-block py-2 px-4 text-gray-500 text-xs">
              ...
            </span>
          </>
        )}

        {/* Page number links */}
        {getPageRange().map((page) => (
          <Link
            key={page}
            preserveState
            preserveScroll
            className={`inline-block py-2 px-4 rounded-lg text-gray-200 text-xs select-none
            ${current_page === page ? "bg-gray-950" : "hover:bg-gray-950"}`}
            href={createPageUrl(page)}
          >
            {page}
          </Link>
        ))}

        {/* Last page link if not in range */}
        {getPageRange()[getPageRange().length - 1] < last_page && (
          <>
            {getPageRange()[getPageRange().length - 1] < last_page - 1 && (
              <span className="inline-block py-2 px-4 text-gray-500 text-xs">
                ...
              </span>
            )}
            <Link
              preserveState
              preserveScroll
              className="inline-block py-2 px-4 rounded-lg text-gray-200 text-xs select-none hover:bg-gray-950"
              href={createPageUrl(last_page)}
            >
              {last_page}
            </Link>
          </>
        )}

        {/* Next page link */}
        <Link
          preserveState
          preserveScroll
          className={`inline-block py-2 px-4 rounded-lg text-gray-200 text-xs select-none
          ${
            current_page === last_page
              ? "!text-gray-500 cursor-not-allowed pointer-events-none"
              : "hover:bg-gray-950"
          }`}
          href={
            current_page < last_page
              ? createPageUrl(current_page + 1)
              : undefined
          }
        >
          Next &raquo;
        </Link>
      </div>
      <div className="ms-auto">
        <SelectInput
          className="w-full text-xs cursor-pointer"
          value={queryParams.per_page}
          onChange={(e) =>
            setQueryParams({
              per_page: e.target.value == "" ? undefined : e.target.value,
            })
          }
        >
          <option value="" className="cursor-pointer">
            Default
          </option>
          <option value="15" className="cursor-pointer">
            15
          </option>
          <option value={20} className="cursor-pointer">
            20
          </option>
          <option value={25} className="cursor-pointer">
            25
          </option>
          <option value={30} className="cursor-pointer">
            30
          </option>
        </SelectInput>
      </div>
    </div>
  );
}
