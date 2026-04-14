<?php

namespace Database\Factories;

use GuzzleHttp\Psr7\MimeType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Storage;
use Str;

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

            'file_disk' => 'public',

            'file_path' => function () {

                // create fake image
                $filename = Str::uuid() . '.jpg';

                Storage::disk('public')->put(
                    "media/$filename",
                    fake()->image(width: 1920, height: 1080, format: 'jpg')
                );

                return "media/$filename";
            },

            'thumbnail_disk' => 'public',

            'thumbnail_path' => function () {

                $filename = Str::uuid() . '.jpg';

                Storage::disk('public')->put(
                    "media/thumbs/$filename",
                    fake()->image(format: 'jpg')
                );

                return "media/thumbs/$filename";
            },

            'alt_text' => [
                'en' => fake()->sentence(),
                'pt' => fake()->sentence(),
            ],
        ];
    }
}
