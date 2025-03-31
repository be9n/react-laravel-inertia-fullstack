import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useQueryParamsStore } from "@/store/useQueryParamsStore";

export default function Index() {
  const { queryParams } = useQueryParamsStore();
  console.log(queryParams);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Tasks
        </h2>
      }
    ></AuthenticatedLayout>
  );
}
