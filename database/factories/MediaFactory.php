<?php

namespace Database\Factories;

use GuzzleHttp\Psr7\MimeType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Media>
 */
class MediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => 'image',
            'file_path' => fake()->imageUrl(),
            'thumbnail_path' => null,
            'alt_text' => [
                'pt' => fake()->word(),
                'en' => fake()->word(),
            ]
        ];
    }
}
