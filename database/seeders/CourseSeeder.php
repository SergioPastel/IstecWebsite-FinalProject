<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Semester;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the Course seeds.
     * This class is responsible for creating:
     *  - 30 Courses;
     *  - 60 Subjects;
     *  - 60 to 300 semesters (2 per each course year);
     *  - 5 to 8 subjects per semester which results in
     *    300 to 2400 semester_subject rows;
     */
    public function run(): void
    {
        $courses = Course::factory()->count(30)->create();
        $subjects = Subject::factory()->count(60)->create();

        foreach ($courses as $course) {
            $semesterCount = 2 * $course->duration_years;

            $semesters = Semester::factory()
                ->count($semesterCount)
                ->state(['course_id' => $course->id])
                ->sequence(
                    fn($sequence) =>
                    ['semester_number' => $sequence->index + 1]
                )->create();

            foreach ($semesters as $semester) {
                $subjectCount = fake()->numberBetween(5, 8);

                $semester->subjects()->attach(
                    $subjects->random($subjectCount)->pluck('id')
                );
            }
        }
    }
}
