<?php

namespace Database\Factories;

use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

class SectionFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $sectionType = $this->faker->randomElement(['hero', 'card_grid', 'text']);
        $content = [];

        // Using match keeps the definition() method concise
        match ($sectionType) {
            'hero'      => $this->generateHero($content),
            'card_grid' => $this->generateCardGrid($content),
            'text'      => $this->generateText($content),
        };

        return [
            'type'    => $sectionType,
            'content' => $content,
        ];
    }

    /**
     * Helper Methods
     *
     *
     */
    private function generateHero(array &$content): void
    {
        $slides = [];
        $slideCount = $this->faker->numberBetween(3, 5);

        for ($i = 0; $i < $slideCount; $i++) {
            $slides[] = [
                'eyebrow'     => $this->faker->words(2, true),
                'title'       => $this->faker->sentence(),
                'description' => $this->faker->paragraph(),
            ];
        }

        $content = ['slides' => $slides];
    }

    private function generateCardGrid(array &$content): void
    {
        $items = [];
        $cardCount = $this->faker->numberBetween(3, 6);
        $categories = $this->faker->words(3);

        for ($i = 0; $i < $cardCount; $i++) {
            $items[] = [
                'title'       => $this->faker->words(3, true),
                'subtitle'    => $this->faker->sentence(6),
                'description' => $this->faker->sentence(12),
                'badge'       => $this->faker->randomElement($categories),
                'linkText'    => 'Saber Mais',
                'href'        => '#',
                'badgeClass'  => "bg-gray-100 text-gray-600",
            ];
        }

        $content = ['items' => $items];
    }

    /**
     * generateText inserts a more complex data structure which may vary with diferent
     * text blocks
     */
    private function generateText(array &$content): void
    {
        $blocks = [];
        $blockCount = $this->faker->numberBetween(3, 6);

        for ($i = 0; $i < $blockCount; $i++) {
            $blockType = $this->faker->randomElement(['heading', 'paragraph', 'list']);

            $blocks[] = match ($blockType) {
                'heading'   => [
                    'type' => 'heading',
                    'text' => $this->faker->sentence(),
                ],
                'paragraph' => [
                    'type' => 'paragraph',
                    'text' => $this->faker->paragraph(),
                ],
                'list'      => [
                    'type'  => 'list',
                    'items' => $this->faker->words($this->faker->numberBetween(3, 5)),
                ],
            };
        }

        $content = ['blocks' => $blocks];
    }
}
