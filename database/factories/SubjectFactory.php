<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;

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
        // Generates a fake PDF of 100 kilobytes
        $file = UploadedFile::fake()->create('subject_details.pdf', 100, 'application/pdf');

        $path = $file->store('subjects', 'public');
        return [
            'name' => [
                'pt' => fake()->word(),
                'en' => fake()->word()
            ],
            'ects' => fake()->numberBetween(6, 90),
            'file_path' => $path,
        ];
    }
}
