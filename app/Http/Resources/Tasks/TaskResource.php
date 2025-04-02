<?php

namespace App\Http\Resources\Tasks;

use App\Http\Resources\Enums\EnumResource;
use App\Http\Resources\Projects\ProjectResource;
use App\Http\Resources\Users\UserResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'status' => EnumResource::make($this->status),
            'priority' => EnumResource::make($this->priority),
            'image_path' => $this->image_path,
            'project' => ProjectResource::make($this->project),
            'assigned_user' => $this->assignedUser ? UserResource::make($this->assignedUser) : null,
            'created_by' => UserResource::make($this->createdBy),
            'updated_by' => UserResource::make($this->updatedBy),
        ];
    }
}
