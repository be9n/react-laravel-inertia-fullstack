<?php

namespace App\Http\Controllers;

use App\Enums\ProjectStatusEnum;
use App\Enums\TaskStatusEnum;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\Enums\EnumResource;
use App\Http\Resources\Projects\ProjectResource;
use App\Http\Resources\Tasks\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Services\ProjectService;
use App\Services\TaskService;

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
        $projectData = $this->projectService->getPaginatedProjects();

        return inertia('Projects/Index', $projectData);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        // Get paginated tasks for this project using the TaskService
        $taskData = $this->taskService->getPaginatedTasks($project->tasks());

        return inertia('Projects/Show', array_merge(
            ['project' => ProjectResource::make($project)],
            $taskData
        ));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        dd("destroy $project->id");
    }
}
