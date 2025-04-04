import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Form({ project, projectStatusesList }) {
  const { data, setData, post, errors, processing, reset } = useForm({
    image: "",
    name: project?.name || "",
    status: project?.status.key || "",
    description: project?.description || "",
    due_date: project?.due_date || "",
    _method: project ? "PUT" : undefined,
  });
  const [imageSrc, setImageSrc] = useState(project?.image_path);

  const onSubmit = (e) => {
    e.preventDefault();

    const actionRoute = project
      ? route("project.update", project.id)
      : route("project.store");

    post(actionRoute, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="min-w-[300px] max-w-[500px] p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
      >
        <div>
          {imageSrc && (
            <img
              className="size-40 object-cover mx-auto rounded-lg mb-4"
              src={imageSrc}
            />
          )}
          <InputLabel htmlFor="project_image_path" value="Project Image" />
          <TextInput
            id="project_image_path"
            type="file"
            name="image"
            className="mt-1 block w-full"
            onChange={(e) => {
              const file = e.target.files[0];

              setImageSrc(URL.createObjectURL(file));
              setData("image", file);
            }}
          />
          <InputError message={errors.image} className="mt-2" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="project_name" value="Project Name" />
          <TextInput
            id="project_name"
            type="text"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            isFocused={true}
            onChange={(e) => setData("name", e.target.value)}
          />
          <InputError message={errors.name} className="mt-2" />
        </div>
        <div className="mt-4">
          <InputLabel
            htmlFor="project_description"
            value="Project Description"
          />
          <TextAreaInput
            id="project_description"
            name="description"
            value={data.description}
            className="mt-1 block w-full resize-none"
            onChange={(e) => setData("description", e.target.value)}
          />
          <InputError message={errors.description} className="mt-2" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="project_due_date" value="Project Deadline" />
          <TextInput
            id="project_due_date"
            type="date"
            name="due_date"
            value={data.due_date}
            className="mt-1 block w-full cursor-pointer"
            onChange={(e) => setData("due_date", e.target.value)}
          />
          <InputError message={errors.due_date} className="mt-2" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="project_status" value="Project Status" />
          <SelectInput
            id="project_status"
            name="status"
            className="mt-1 block w-full"
            value={data.status}
            onChange={(e) => setData("status", e.target.value)}
          >
            <option value="">Select A Status</option>
            {projectStatusesList.data.map((status) => (
              <option key={status.key} value={status.key}>
                {status.value}
              </option>
            ))}
          </SelectInput>
          <InputError message={errors.status} className="mt-2" />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Link href={route("project.index")} className="">
            <button className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-colors hover:bg-gray-200">
              Cancel
            </button>
          </Link>
          <button
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-colors hover:bg-emerald-600"
            disabled={processing}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
