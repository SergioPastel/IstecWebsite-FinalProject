<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\Section;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Page::factory()
            ->count(5)
            ->sequence(fn($sequence) => [
                'slug' => 'page-' . ($sequence->index + 1),
                'title' => 'Sample Page ' . ($sequence->index + 1),
            ])
            ->has(
                Section::factory()
                    ->count(fake()->numberBetween(3, 7))->sequence(fn($sequence) => [
                        'order' => $sequence->index
                    ])
            )
            ->create();
    }
}
