<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory()
        //     ->create([
        //         'name' => 'Apo Nas',
        //         'email' => 'apo@gmail.com',
        //         'password' => '123123',
        //         'email_verified_at' => now()
        //     ]);

        Task::factory(250)
        ->create();

        // Project::factory()
        //     ->count(100)
        //     ->hasTasks(30)
        //     ->create();
    }
}
