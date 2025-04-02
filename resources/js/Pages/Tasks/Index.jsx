import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Table from "./Table";
import useQueryParamsStore from "@/store/useQueryParamsStore";
import { useEffect } from "react";

export default function Index({ tasks, pagination, task_statuses }) {
  const { syncWithUrl } = useQueryParamsStore();

  useEffect(() => {
    syncWithUrl(route("task.index"));
  }, []);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Tasks
        </h2>
      }
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <Table
                tasks={tasks}
                pagination={pagination}
                task_statuses={task_statuses}
                route={route("task.index")}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
