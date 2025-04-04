import Pagination2 from "@/Components/Pagination";
import SearchInput2 from "@/Components/SearchInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading2 from "@/Components/TableHeading";
import { TASK_STATUS_CLASS_MAP } from "@/constants";
import useQueryParamsStore from "@/store/useQueryParamsStore";
import { Link } from "@inertiajs/react";

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
    title: "Project Name",
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

export default function Table({ tasks, pagination, task_statuses }) {
  const { filters, setFilters, resetFilters } = useQueryParamsStore();

  return (
    <>
      <div className="overflow-auto">
        <div className="min-w-full flex gap-5 p-2 border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700">
          <SearchInput2 placeholder="Search for tasks" />

          <SelectInput
            value={filters?.status || ""}
            onChange={(e) => {
              const value = e.target.value;
              value === ""
                ? resetFilters("status")
                : setFilters({
                    status: e.target.value == "" ? undefined : e.target.value,
                  });
            }}
            className="w-[200px] cursor-pointer"
          >
            <option value="" className="cursor-pointer">
              Select Status
            </option>
            {task_statuses.data.map((status) => (
              <option
                className="cursor-pointer"
                key={status.key}
                value={status.key}
              >
                {status.value}
              </option>
            ))}
          </SelectInput>
        </div>
        <table className="min-w-[1000px] w-full text-sm text-start text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              {tableColumns.map(({ title, sortName, isSortable }) => (
                <TableHeading2
                  key={title}
                  name={sortName}
                  isSortable={isSortable}
                >
                  {title}
                </TableHeading2>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.data.map((task) => (
              <tr
                key={task.id}
                className="bg-white border-b last:border-none dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-3 py-2">{task.id}</td>
                <td className="px-3 py-2">
                  <div className="size-12 rounded-xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={task.image_path}
                      alt=""
                    />
                  </div>
                </td>
                <td className="px-3 py-2 max-w-[150px]">{task.name}</td>
                <td className="px-3 py-2 max-w-[150px] truncate">
                  {task.project?.name}
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      TASK_STATUS_CLASS_MAP[task.status.key]
                    }`}
                  >
                    {task.status.value}
                  </span>
                </td>
                <td className="px-3 py-2">{task.created_at}</td>
                <td className="px-3 py-2">{task.due_date}</td>
                <td className="px-3 py-2">{task.created_by?.name}</td>
                <td className="px-3 py-2">
                  <Link
                    href={route("task.edit", task.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                  >
                    Edit
                  </Link>
                  <Link
                    href={route("task.destroy", task.id)}
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
      <Pagination2 pagination={pagination} />
    </>
  );
}
