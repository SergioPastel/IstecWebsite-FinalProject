<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
    private static array $subjects = [
        // Informatics / Engineering
        ['pt' => 'Programação I',                      'en' => 'Programming I',                       'ects' => 6],
        ['pt' => 'Programação II',                     'en' => 'Programming II',                      'ects' => 6],
        ['pt' => 'Algoritmos e Estruturas de Dados',   'en' => 'Algorithms and Data Structures',      'ects' => 6],
        ['pt' => 'Bases de Dados',                     'en' => 'Databases',                           'ects' => 6],
        ['pt' => 'Sistemas Operativos',                'en' => 'Operating Systems',                   'ects' => 6],
        ['pt' => 'Redes de Computadores',              'en' => 'Computer Networks',                   'ects' => 6],
        ['pt' => 'Engenharia de Software',             'en' => 'Software Engineering',                'ects' => 6],
        ['pt' => 'Desenvolvimento Web',                'en' => 'Web Development',                     'ects' => 6],
        ['pt' => 'Desenvolvimento Mobile',             'en' => 'Mobile Development',                  'ects' => 6],
        ['pt' => 'Arquitetura de Computadores',        'en' => 'Computer Architecture',               'ects' => 6],
        ['pt' => 'Inteligência Artificial',            'en' => 'Artificial Intelligence',             'ects' => 6],
        ['pt' => 'Aprendizagem Automática',            'en' => 'Machine Learning',                    'ects' => 6],
        ['pt' => 'Segurança Informática',              'en' => 'Cybersecurity',                       'ects' => 6],
        ['pt' => 'Cloud Computing',                    'en' => 'Cloud Computing',                     'ects' => 6],
        ['pt' => 'DevOps e Integração Contínua',       'en' => 'DevOps and Continuous Integration',   'ects' => 6],
        ['pt' => 'Computação Gráfica',                 'en' => 'Computer Graphics',                   'ects' => 6],
        ['pt' => 'Programação Orientada a Objetos',    'en' => 'Object-Oriented Programming',         'ects' => 6],
        ['pt' => 'Sistemas Distribuídos',              'en' => 'Distributed Systems',                 'ects' => 6],
        ['pt' => 'Projeto de Software',                'en' => 'Software Project',                    'ects' => 9],
        ['pt' => 'Estágio Curricular',                 'en' => 'Curricular Internship',               'ects' => 18],

        // Mathematics / Sciences
        ['pt' => 'Matemática Discreta',                'en' => 'Discrete Mathematics',                'ects' => 6],
        ['pt' => 'Álgebra Linear',                     'en' => 'Linear Algebra',                      'ects' => 6],
        ['pt' => 'Cálculo',                            'en' => 'Calculus',                            'ects' => 6],
        ['pt' => 'Probabilidades e Estatística',       'en' => 'Probability and Statistics',          'ects' => 6],
        ['pt' => 'Investigação Operacional',           'en' => 'Operations Research',                 'ects' => 6],

        // Management / General
        ['pt' => 'Gestão de Projetos',                 'en' => 'Project Management',                  'ects' => 6],
        ['pt' => 'Empreendedorismo e Inovação',        'en' => 'Entrepreneurship and Innovation',     'ects' => 6],
        ['pt' => 'Ética e Deontologia Profissional',   'en' => 'Ethics and Professional Conduct',     'ects' => 3],
        ['pt' => 'Inglês Técnico',                     'en' => 'Technical English',                   'ects' => 3],
        ['pt' => 'Comunicação e Apresentação',         'en' => 'Communication and Presentation',      'ects' => 3],
    ];

    // Track used indices per factory run to avoid duplicates in the same seeder call
    private static array $usedIndices = [];

    public function definition(): array
    {
        $available = array_diff(array_keys(self::$subjects), self::$usedIndices);

        // Reset if all used
        if (empty($available)) {
            self::$usedIndices = [];
            $available = array_keys(self::$subjects);
        }

        $index = $this->faker->randomElement($available);
        self::$usedIndices[] = $index;
        $subject = self::$subjects[$index];

        $file = UploadedFile::fake()->create('subject_details.pdf', 100, 'application/pdf');
        $path = $file->store('subjects', 'public');

        return [
            'name' => [
                'pt' => $subject['pt'],
                'en' => $subject['en'],
            ],
            'ects'      => $subject['ects'],
            'file_path' => $path,
        ];
    }
}
