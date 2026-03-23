<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            ]
        );

        User::factory()->create(
            [
                'name'=> 'Admin',
                'email'=> 'admin@mail.com',
                'password'=> bcrypt('Secret')
            ]
        );

        $this->call(CourseCategorySeeder::class);
        $this->call(CourseSeeder::class);


    }
}
