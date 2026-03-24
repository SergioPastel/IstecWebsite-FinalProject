<?php

namespace Database\Factories;

use App\Models\Media;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use League\CommonMark\Reference\Reference;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = Carbon::instance(fake()->dateTimeBetween('-1 month', "+1 month"));
        $duration = fake()->numberBetween(0, 7);
        $endDate = fake()->boolean(90)
            ? $startDate->copy()->addDays($duration)
            : null;

        return [
            'media_id' => Media::factory()->create(),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'location' => fake()->address(),
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
