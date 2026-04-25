<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Application;
use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Support\Str;

class ApplicationSeeder extends Seeder
{
    public function run(): void
    {
        $course = Course::first();

        if (!$course) {
            $this->command->warn('No course found. Create courses first.');
            return;
        }

        // Recent application (should NOT be deleted)
        Application::create([
            'course_id'   => $course->id,
            'full_name'   => 'Daniel Monteiro',
            'email'       => 'dan@test.com',
            'phone'       => '912345678',
            'birth_date'  => '2000-01-01',
            'created_at'  => Carbon::now()->subDays(10),
            'updated_at'  => Carbon::now()->subDays(10),
        ]);

        // Around limit (still valid)
        Application::create([
            'course_id'   => $course->id,
            'full_name'   => 'Carla Silva',
            'email'       => 'carla@test.com',
            'phone'       => '912345679',
            'birth_date'  => '1999-05-10',
            'created_at'  => Carbon::now()->subMonths(2),
            'updated_at'  => Carbon::now()->subMonths(2),
        ]);

        // Old application (should be deleted)
        Application::create([
            'course_id'   => $course->id,
            'full_name'   => 'Old User',
            'email'       => 'old@test.com',
            'phone'       => '912345680',
            'birth_date'  => '1998-03-20',
            'created_at'  => Carbon::now()->subMonths(4),
            'updated_at'  => Carbon::now()->subMonths(4),
        ]);

        // Very old application (should be deleted)
        Application::create([
            'course_id'   => $course->id,
            'full_name'   => 'Very Old User',
            'email'       => 'very-old@test.com',
            'phone'       => '912345681',
            'birth_date'  => '1995-08-15',
            'created_at'  => Carbon::now()->subMonths(6),
            'updated_at'  => Carbon::now()->subMonths(6),
        ]);
    }
}
