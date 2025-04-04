<?php

namespace App\Models;

use App\Enums\ProjectStatusEnum;
use App\Traits\Filterable;
use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory, Searchable, Filterable;

    protected $searchable = [
        'columns' => [
            'name' => 10,
        ]
    ];

    protected $filterColumns = [
        'status' => []
    ];

    protected $fillable = [
        'name',
        'description',
        'image_path',
        'due_date',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'status' => ProjectStatusEnum::class
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
