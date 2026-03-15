<?php

namespace Database\Factories;

use App\Models\CourseCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $duration = fake()->numberBetween(1, 5);
        return [
            'course_category_id' => CourseCategory::inRandomOrder()->first()->id,
            'title' => fake()->jobTitle(),
            'description' => fake()->paragraph(),
            'professional_outcomes' => fake()->paragraph(),
            'duration_years' => $duration,
            'study_regime' => fake()->boolean(),
            'tuition_monthly_pay' => fake()->randomFloat(2, 200, 700),
            'tuition_months' => $duration * 12,
        ];
    }
}
