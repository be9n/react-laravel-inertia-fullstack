<?php

namespace App\Http\Controllers;

use App\Enums\ProjectStatusEnum;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\Enums\EnumResource;
use App\Http\Resources\Projects\ProjectResource;
use App\Models\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sortBy = request('sort_by', 'id');
        $sortDir = request('sort_dir', 'asc');

        $projects = Project::with(['createdBy', 'updatedBy'])
            ->applySearch()
            ->filter()
            ->orderBy($sortBy, $sortDir)
            ->paginate(request('per_page', 10));

        $paginationData = [
            'current_page' => $projects->currentPage(),
            'last_page' => $projects->lastPage(),
            'per_page' => $projects->perPage(),
            'total' => $projects->total(),
            'has_more_pages' => $projects->hasMorePages(),
            'has_pages' => $projects->hasPages(),
            'path' => $projects->path(),
        ];

        return inertia('Projects/Index', [
            'projects' => ProjectResource::collection($projects->items()),
            'pagination' => $paginationData,
            'project_statuses' => EnumResource::collection(ProjectStatusEnum::cases())
        ]);
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
        //
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
