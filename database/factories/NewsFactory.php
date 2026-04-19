<?php

namespace Database\Factories;

use App\Models\Media;
use App\Models\NewsCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'media_id' => Media::factory()->create(),
            'news_category_id' => NewsCategory::inRandomOrder()->first(),
            'title' => [
                'pt' => fake()->word(),
                'en' => fake()->word(),
            ],
            'description' => [
                'pt' => fake()->sentence(),
                'en' => fake()->sentence(),
            ]
        ];
    }
}
