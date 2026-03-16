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
                'title' => ['pt' => 'CTeSP (Cursos Técnicos Superiores Profissionais)'],
                'description' => ['pt' => 'Cursos de curta duração e orientados para a prática profissional, focados em competências técnicas e aplicadas em diversas áreas.']
            ],
            [
                'title' => ['pt' => 'Licenciatura'],
                'description' => ['pt' => 'Cursos de 1º ciclo do ensino superior, com duração média de 3 a 4 anos, que fornecem uma formação académica sólida e preparação para o mercado de trabalho ou estudos avançados.']
            ],
            [
                'title' => ['pt' => 'Mestrado'],
                'description' => ['pt' => 'Cursos de 2º ciclo do ensino superior, geralmente de 1 a 2 anos, destinados ao aprofundamento de conhecimentos numa área específica e à preparação para investigação ou funções especializadas.']
            ],
            [
                'title' => ['pt' => 'Doutoramento'],
                'description' => ['pt' => 'Cursos de 3º ciclo do ensino superior, focados na investigação avançada e desenvolvimento de competências académicas e científicas de alto nível.']
            ],
        ];

        // Use Eloquent create() so Spatie can cast arrays to JSON
        foreach ($categories as $category) {
            CourseCategory::create($category);
        }
    }
}
