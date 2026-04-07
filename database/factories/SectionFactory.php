<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Section>
 */
class SectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $availableSections = ['hero', 'card_grid'];
        $sectionType = $this->faker->randomElement($availableSections);

        $content = [];

        switch ($sectionType) {
            case 'hero':
                $slides = [];
                $slideCount = $this->faker->numberBetween(3, 5);

                for ($i = 0; $i < $slideCount; $i++) {
                    $slides[] = [
                        'eyebrow' => $this->faker->words(2, true),
                        'title' => $this->faker->sentence(),
                        'description' => $this->faker->paragraph(),
                    ];
                }

                // Match the React prop HeroSwiper expects { slides: [...] }
                $content = [
                    'slides' => $slides
                ];
                break;
            case 'card_grid':
                $items = [];
                $cardCount = fake()->numberBetween(3, 6);

                // Define some categories for variety in badges/colors
                $categories = fake()->words(3);

                for ($i = 0; $i < $cardCount; $i++) {
                    $cat = fake()->randomElement($categories);

                    // These keys match your React Card props exactly
                    $items[] = [
                        'title' => fake()->words(3, true),
                        'subtitle' => fake()->sentence(6),
                        'description' => fake()->sentence(12),
                        'badge' => $cat,
                        'linkText' => 'Saber Mais',
                        'href' => '#',
                        'badgeClass' => "bg-gray-100 text-gray-600",
                    ];
                }

                $content = [
                    'items' => $items
                ];
                break;
        }

        return [
            'type' => $sectionType,
            'content' => $content,
        ];
    }
}
