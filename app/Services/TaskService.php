<?php

namespace App\Services;

use App\Enums\TaskStatusEnum;
use App\Http\Resources\Enums\EnumResource;
use App\Http\Resources\Tasks\TaskResource;
use App\Models\Task;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;

class TaskService
{
    protected PaginationService $paginationService;

    public function __construct(PaginationService $paginationService)
    {
        $this->paginationService = $paginationService;
    }

    /**
     * Get paginated tasks with all necessary data for display
     *
     * @param Builder|Relation|null $query Custom query builder for tasks (e.g., for project-specific tasks)
     * @return array Structured array with tasks, pagination and statuses
     */
    public function getPaginatedTasks(Builder|Relation|null $query = null): array
    {
        $sortBy = request('sort_by', 'id');
        $sortDir = request('sort_dir', 'asc');

        // Start with base query or use the provided one (for project tasks)
        $taskQuery = $query ?? Task::query();

        $tasks = $taskQuery->with(['createdBy', 'updatedBy'])
            ->applySearch()
            ->filter()
            ->orderBy($sortBy, $sortDir)
            ->paginate(request('per_page', 10));

        return [
            'tasks' => TaskResource::collection($tasks->items()),
            'pagination' => $this->paginationService->getPaginationData($tasks),
            'task_statuses' => EnumResource::collection(TaskStatusEnum::cases())
        ];
    }
}