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
    private static array $news = [
        [
            'title' => [
                'pt' => 'ISTEC reforça aposta na formação em Engenharia Informática',
                'en' => 'ISTEC strengthens investment in Computer Engineering education',
            ],
            'description' => [
                'pt' => 'O ISTEC anunciou o reforço dos seus programas académicos na área de Engenharia Informática, com foco em desenvolvimento de software e tecnologias emergentes.',
                'en' => 'ISTEC announced the expansion of its academic programs in Computer Engineering, focusing on software development and emerging technologies.',
            ],
        ],
        [
            'title' => [
                'pt' => 'Estudantes do ISTEC participam em projeto tecnológico internacional',
                'en' => 'ISTEC students participate in international technology project',
            ],
            'description' => [
                'pt' => 'Alunos do ISTEC colaboraram num projeto internacional dedicado ao desenvolvimento de soluções digitais inovadoras.',
                'en' => 'ISTEC students collaborated in an international project focused on developing innovative digital solutions.',
            ],
        ],
        [
            'title' => [
                'pt' => 'ISTEC promove evento dedicado à inovação tecnológica',
                'en' => 'ISTEC hosts event dedicated to technological innovation',
            ],
            'description' => [
                'pt' => 'O instituto organizou um evento aberto à comunidade para debater tendências tecnológicas e transformação digital.',
                'en' => 'The institute organized an event to discuss technology trends and digital transformation.',
            ],
        ],
        [
            'title' => [
                'pt' => 'Novos laboratórios tecnológicos inaugurados no ISTEC',
                'en' => 'New technology laboratories inaugurated at ISTEC',
            ],
            'description' => [
                'pt' => 'O ISTEC inaugurou novos laboratórios equipados com tecnologia moderna para apoiar o ensino prático.',
                'en' => 'ISTEC inaugurated new laboratories equipped with modern technology to support practical learning.',
            ],
        ],
    ];

    public function definition(): array
    {
        $news = fake()->randomElement(self::$news);

        return [
            'media_id' => Media::factory(), // ⚠️ não usar ->create()
            'news_category_id' => NewsCategory::inRandomOrder()->first()->id,

            'title' => $news['title'],
            'description' => $news['description'],
        ];
    }
}
