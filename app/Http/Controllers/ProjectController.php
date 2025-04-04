<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\Projects\ProjectResource;
use App\Models\Project;
use App\Services\ProjectService;
use App\Services\TaskService;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    protected TaskService $taskService;
    protected ProjectService $projectService;

    public function __construct(TaskService $taskService, ProjectService $projectService)
    {
        $this->taskService = $taskService;
        $this->projectService = $projectService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projectsData = $this->projectService->getPaginatedProjects();


        return inertia('Projects/Index', $projectsData);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projectStatusesList = $this->projectService->getProjectStatusesList();

        return inertia('Projects/Create', [
            'project_statuses_list' => $projectStatusesList
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;
        if ($image) {
            $data['image_path'] = $image->store('projects/', 'public');
        }

        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        Project::create($data);

        return to_route('project.index')->withAlert('Project created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        // Get paginated tasks for this project using the TaskService
        $taskData = $this->taskService->getPaginatedTasks($project->tasks());

        return inertia('Projects/Show', [
            ...$taskData,
            'project' => ProjectResource::make($project)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Projects/Edit', [
            'project' => ProjectResource::make($project),
            'project_statuses_list' => $this->projectService->getProjectStatusesList()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;
        if ($image) {
            if ($project->image_path) {
                Storage::disk('public')->delete($project->image_path);
            }

            $data['image_path'] = $image->store('projects/', 'public');
        }

        $data['updated_by'] = auth()->id();
        $project->update($data);

        return redirect()->back()->with('resetForm', true)->withAlert('Project updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {

        if ($project->image_path) {
            Storage::disk('public')->delete($project->image_path);
        }

        $project->delete();

        return redirect()->back()
            ->withAlert("The project $project->name was deleted successfully");
    }
}
