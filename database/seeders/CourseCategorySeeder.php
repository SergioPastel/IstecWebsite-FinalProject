<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\CourseCategory;

class CourseCategorySeeder extends Seeder
{
    /**
     * Run the CourseCategory seeds. Creates 4 categories following traditional
     * Portuguese academic certificates
     */
    public function run(): void
    {
        $categories = [
            [
                'title' => [
                    'pt' => 'CTeSP (Cursos Técnicos Superiores Profissionais)',
                    'en' => 'CTeSP (Higher Technical Professional Course)'
                    ],
                'description' => [
                    'pt' => 'Cursos de curta duração e orientados para a prática profissional, focados em competências técnicas e aplicadas em diversas áreas.',
                    'en' => 'Short-term, practical courses focused on technical and applied skills in various fields.'
                ]
            ],
            [
                'title' => [
                    'pt' => 'Licenciatura',
                    'en' => 'Bachelors'
                    ],
                'description' => [
                    'pt' => 'Cursos de 1º ciclo do ensino superior, com duração média de 3 a 4 anos, que fornecem uma formação académica sólida e preparação para o mercado de trabalho ou estudos avançados.',
                    'en' => "Bachelor's degree programs, which typically last 3 to 4 years, provide a solid academic foundation and prepare students for the workforce or further studies."
                    ]
            ],
            [
                'title' => [
                    'pt' => 'Pós-Graduação',
                    'en' => 'Post-Graduate'
                    ],
                'description' => [
                    'pt' => 'Cursos de 2º ciclo do ensino superior, geralmente de 1 a 2 anos, destinados ao aprofundamento de conhecimentos numa área específica e à preparação para investigação ou funções specializadas.',
                    'en' => 'Post-Graduate degree programs, typically lasting 1 to 2 years, designed to deepen knowledge in a specific field and prepare students for research or specialized roles.'
                    ]
            ],        
        ];

        // Use Eloquent create() so Spatie can cast arrays to JSON
        foreach ($categories as $category) {
            CourseCategory::create($category);
        }
    }
}
