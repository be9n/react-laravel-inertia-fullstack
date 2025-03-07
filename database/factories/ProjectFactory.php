<?php

namespace Database\Factories;

use App\Enums\ProjectStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
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
            'status' => fake()->randomElement(ProjectStatusEnum::cases())->value,
            'image_path' => 'https://placehold.co/600x400?font=roboto&text=Placeholder',
            'created_by' => 1,
            'updated_by' => 1,
        ];
    }
}
