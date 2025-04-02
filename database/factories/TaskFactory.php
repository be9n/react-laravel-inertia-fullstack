<?php

namespace Database\Factories;

use App\Enums\TaskPriorityEnum;
use App\Enums\TaskStatusEnum;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()->randomElement(TaskStatusEnum::cases())->value,
            'priority' => fake()->randomElement(TaskPriorityEnum::cases())->value,
            'image_path' => "https://placehold.co/600x400?font=roboto&text=Placeholder",
            'assigned_user_id' => 1,
            'created_by' => 1,
            'updated_by' => 1,
            'project_id' => fake()->randomElement(Project::pluck('id')->toArray())
        ];
    }
}
