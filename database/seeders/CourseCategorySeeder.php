<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Str;

class CourseCategorySeeder extends Seeder
{
    /**
     * Run the CourseCategory seeds.
     * Creates 4 categories following traditional
     * Portuguese academic certificates
     */
    public function run(): void
    {
        DB::table('course_categories')->insert([
            [
                'id' => Str::uuid()->toString(),
                'title' => 'CTeSP (Cursos Técnicos Superiores Profissionais)',
                'description' => 'Cursos de curta duração e orientados para a prática profissional, focados em competências técnicas e aplicadas em diversas áreas.'
            ],
            [
                'id' => Str::uuid()->toString(),
                'title' => 'Licenciatura',
                'description' => 'Cursos de 1º ciclo do ensino superior, com duração média de 3 a 4 anos, que fornecem uma formação académica sólida e preparação para o mercado de trabalho ou estudos avançados.'
            ],
            [
                'id' => Str::uuid()->toString(),
                'title' => 'Mestrado',
                'description' => 'Cursos de 2º ciclo do ensino superior, geralmente de 1 a 2 anos, destinados ao aprofundamento de conhecimentos numa área específica e à preparação para investigação ou funções especializadas.'
            ],
            [
                'id' => Str::uuid()->toString(),
                'title' => 'Doutoramento',
                'description' => 'Cursos de 3º ciclo do ensino superior, focados na investigação avançada e desenvolvimento de competências académicas e científicas de alto nível.'
            ],
        ]);
    }
}
