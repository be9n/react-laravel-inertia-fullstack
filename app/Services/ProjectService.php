<?php

namespace App\Services;

use App\Enums\ProjectStatusEnum;
use App\Http\Resources\Enums\EnumResource;
use App\Http\Resources\Projects\ProjectResource;
use App\Models\Project;
use Illuminate\Database\Eloquent\Builder;

class ProjectService
{
    protected PaginationService $paginationService;

    public function __construct(PaginationService $paginationService)
    {
        $this->paginationService = $paginationService;
    }

    /**
     * Get paginated projects with all necessary data for display
     *
     * @return array Structured array with projects, pagination and statuses
     */
    public function getPaginatedProjects(): array
    {
        $sortBy = request('sort_by', 'id');
        $sortDir = request('sort_dir', 'asc');

        $projects = Project::with(['createdBy', 'updatedBy'])
            ->applySearch()
            ->filter()
            ->orderBy($sortBy, $sortDir)
            ->paginate(request('per_page', 10));

        return [
            'projects' => ProjectResource::collection($projects->items()),
            'pagination' => $this->paginationService->getPaginationData($projects),
            'project_statuses' => EnumResource::collection(ProjectStatusEnum::cases())
        ];
    }
}