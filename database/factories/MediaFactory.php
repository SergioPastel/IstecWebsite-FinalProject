<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class MediaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'file_disk' => 'public',
            'file_path' => function () {
                $filename = Str::uuid() . '.jpg';
                // Using a stable provider directly
                $image = Http::get('https://picsum.photos/1920/1080')->body();

                Storage::disk('public')->put("media/$filename", $image);

                return "media/$filename";
            },

            'thumbnail_disk' => 'public',
            'thumbnail_path' => function () {
                $filename = Str::uuid() . '.jpg';
                // Smaller dimensions for the thumbnail
                $image = Http::get('https://picsum.photos/400/300')->body();

                Storage::disk('public')->put("media/thumbs/$filename", $image);

                return "media/thumbs/$filename";
            },

            'alt_text' => [
                'en' => fake()->sentence(),
                'pt' => fake()->sentence(),
            ],
        ];
    }
}
