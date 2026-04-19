<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\NewsCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventNewsCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'title' => [
                    'pt' => 'Workshop',
                    'en' => 'Workshop'
                ],

            ],
            [
                'title' => [
                    'pt' => 'Open Day',
                    'en' => 'Open Day'
                ],

            ],
            [
                'title' => [

                    'pt' => 'Feira Empresarial',
                    'en' => 'Job Fair'
                ],
            ]
        ];
        $news = [
            [
                'title' => [
                    'pt' => 'Entrevista',
                    'en' => 'Interview'
                ],

            ],
            [
                'title' => [
                    'pt' => 'Parceria',
                    'en' => 'Partnership'
                ],

            ],
        ];

        foreach ($events as $item)
            EventCategory::create($item);
        foreach ($news as $item)
            NewsCategory::create($item);
    }
}
