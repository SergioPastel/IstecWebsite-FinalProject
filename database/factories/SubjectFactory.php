<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => [
                'pt' => fake()->word(),
                'en' => fake()->word()
            ],
            'ects' => fake()->numberBetween(6, 90),
            'file_path' => 'factory/mock/file/path',
        ];
    }
}
