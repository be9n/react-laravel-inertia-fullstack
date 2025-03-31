import Pagination from "@/Components/Pagination";
import SearchInput from "@/Components/SearchInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import { PROJECT_STATUS_CLASS_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useApiFiltersStore } from "@/store/useApiFiltersStore";
import { useQueryParamsStore } from "@/store/useQueryParamsStore";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

const tableColumns = [
  {
    sortName: "id",
    title: "ID",
    isSortable: true,
  },
  {
    title: "Image",
  },
  {
    sortName: "name",
    title: "Name",
    isSortable: true,
  },
  {
    sortName: "status",
    title: "Status",
    isSortable: true,
  },
  {
    sortName: "created_at",
    title: "Creation Date",
    isSortable: true,
  },
  {
    sortName: "due_date",
    title: "Due Date",
    isSortable: true,
  },
  {
    title: "Created By",
  },
  {
    title: "Actions",
  },
];

export default function Index({ projects, pagination, project_statuses }) {
  const { queryParams } = useQueryParamsStore();
  const { filters, setFilter, resetFilters, formatToQueryString } =
    useApiFiltersStore();
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    router.get(
      route("project.index"),
      { ...queryParams, filters: formatToQueryString() },
      {
        preserveState: true,
        preserveScroll: true,
      }
    );
  }, [queryParams, filters]);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Projects
        </h2>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="min-w-[1000px] w-full text-sm text-start text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3 text-start"></th>
                      <th className="px-3 py-3 text-start"></th>
                      <th className="px-3 py-3 text-start">
                        <SearchInput />
                      </th>
                      <th className="px-3 py-3 text-start">
                        <SelectInput
                          value={filters?.status || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            value === ""
                              ? resetFilters("status")
                              : setFilter("status", e.target.value);
                          }}
                          className="w-full cursor-pointer"
                        >
                          <option value="" className="cursor-pointer">
                            Select Status
                          </option>
                          {project_statuses.data.map((status) => (
                            <option
                              className="cursor-pointer"
                              key={status.key}
                              value={status.key}
                            >
                              {status.value}
                            </option>
                          ))}
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3 text-start"></th>
                      <th className="px-3 py-3 text-start"></th>
                      <th className="px-3 py-3 text-start"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      {tableColumns.map(({ title, sortName, isSortable }) => (
                        <TableHeading
                          key={title}
                          name={sortName}
                          isSortable={isSortable}
                        >
                          {title}
                        </TableHeading>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {projects.data.map((project) => (
                      <tr
                        key={project.id}
                        className="bg-white border-b last:border-none dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-3 py-2">{project.id}</td>
                        <td className="px-3 py-2">
                          <div className="size-12 rounded-xl overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src={project.image_path}
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="px-3 py-2 max-w-[150px]">
                          {project.name}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`px-2 py-1 rounded text-white ${
                              PROJECT_STATUS_CLASS_MAP[project.status.key]
                            }`}
                          >
                            {project.status.value}
                          </span>
                        </td>
                        <td className="px-3 py-2">{project.created_at}</td>
                        <td className="px-3 py-2">{project.due_date}</td>
                        <td className="px-3 py-2">{project.createdBy.name}</td>
                        <td className="px-3 py-2">
                          <Link
                            href={route("project.edit", project.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <Link
                            href={route("project.destroy", project.id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                pagination={pagination}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
