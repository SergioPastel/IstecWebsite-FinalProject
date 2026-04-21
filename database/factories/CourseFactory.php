<?php

namespace Database\Factories;

use App\Models\CourseCategory;
use App\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    private static array $courses = [
        [
            'title' => [
                'pt' => 'Engenharia Informática',
                'en' => 'Computer Engineering',
            ],
            'description' => [
                'pt' => 'Curso focado no desenvolvimento de software, sistemas distribuídos, bases de dados e engenharia de aplicações modernas.',
                'en' => 'Program focused on software development, distributed systems, databases and modern application engineering.',
            ],
            'professional_outcomes' => [
                'pt' => 'Programador, Software Developer, Engenheiro de Software, DevOps.',
                'en' => 'Programmer, Software Developer, Software Engineer, DevOps Engineer.',
            ],
            'duration_years' => 3,
            'study_regime' => true,
            'tuition_monthly_pay' => 350,
            'modality' => 'in-person'
        ],
        [
            'title' => [
                'pt' => 'Cibersegurança',
                'en' => 'Cybersecurity',
            ],
            'description' => [
                'pt' => 'Formação especializada em segurança informática, redes seguras, ethical hacking e proteção de dados.',
                'en' => 'Specialized education in cybersecurity, secure networks, ethical hacking and data protection.',
            ],
            'professional_outcomes' => [
                'pt' => 'Analista de Segurança, Pentester, Administrador de Sistemas.',
                'en' => 'Security Analyst, Pentester, Systems Administrator.',
            ],
            'duration_years' => 3,
            'study_regime' => true,
            'tuition_monthly_pay' => 375,
            'modality' => 'in-person'
        ],
        [
            'title' => [
                'pt' => 'Redes e Sistemas Informáticos',
                'en' => 'Computer Networks and Systems',
            ],
            'description' => [
                'pt' => 'Curso dedicado à administração de redes, infraestruturas tecnológicas e computação em cloud.',
                'en' => 'Program dedicated to network administration, IT infrastructure and cloud computing.',
            ],
            'professional_outcomes' => [
                'pt' => 'Administrador de Redes, Técnico de Sistemas, Cloud Engineer.',
                'en' => 'Network Administrator, Systems Technician, Cloud Engineer.',
            ],
            'duration_years' => 3,
            'study_regime' => false,
            'tuition_monthly_pay' => 320,
            'modality' => 'online'
        ],
        [
            'title' => [
                'pt' => 'Desenvolvimento Web e Multimédia',
                'en' => 'Web Development and Multimedia',
            ],
            'description' => [
                'pt' => 'Curso focado em desenvolvimento web full-stack, UX/UI e tecnologias multimédia interativas.',
                'en' => 'Program focused on full-stack web development, UX/UI and interactive multimedia technologies.',
            ],
            'professional_outcomes' => [
                'pt' => 'Web Developer, Frontend Developer, UX/UI Designer.',
                'en' => 'Web Developer, Frontend Developer, UX/UI Designer.',
            ],
            'duration_years' => 3,
            'study_regime' => true,
            'tuition_monthly_pay' => 340,
            'modality' => 'hybrid'
        ],
    ];

    public function definition(): array
    {
        $course = fake()->randomElement(self::$courses);

        return [
            'course_category_id' => CourseCategory::inRandomOrder()->first()->id,
            'media_id' => Media::factory(),

            'title' => $course['title'],
            'description' => $course['description'],
            'professional_outcomes' => $course['professional_outcomes'],

            'duration_years' => $course['duration_years'],
            'study_regime' => $course['study_regime'],
            'tuition_monthly_pay' => $course['tuition_monthly_pay'],
            'tuition_months' => $course['duration_years'] * 12,
            'modality' => $course['modality']
        ];
    }
}
