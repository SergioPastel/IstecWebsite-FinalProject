<?php

namespace Database\Factories;

use App\Models\EventCategory;
use App\Models\Media;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    private static array $events = [
        [
            'title' => [
                'pt' => 'Workshop de Desenvolvimento Web no ISTEC',
                'en' => 'Web Development Workshop at ISTEC',
            ],
            'description' => [
                'pt' => 'Workshop prático dedicado ao desenvolvimento web moderno, abordando Laravel, React e boas práticas de programação.',
                'en' => 'Hands-on workshop focused on modern web development covering Laravel, React and programming best practices.',
            ],
            'location' => 'ISTEC Porto',
            'start_date' => '2026-05-10',
            'end_date' => '2026-05-10',
        ],
        [
            'title' => [
                'pt' => 'Conferência de Cibersegurança',
                'en' => 'Cybersecurity Conference',
            ],
            'description' => [
                'pt' => 'Especialistas da indústria apresentam tendências atuais em cibersegurança e proteção de dados.',
                'en' => 'Industry experts present current trends in cybersecurity and data protection.',
            ],
            'location' => 'Auditório ISTEC',
            'start_date' => '2026-05-18',
            'end_date' => '2026-05-19',
        ],
        [
            'title' => [
                'pt' => 'Hackathon Tecnológico ISTEC',
                'en' => 'ISTEC Technology Hackathon',
            ],
            'description' => [
                'pt' => 'Evento intensivo onde estudantes desenvolvem soluções tecnológicas inovadoras em equipas multidisciplinares.',
                'en' => 'Intensive event where students develop innovative technological solutions in multidisciplinary teams.',
            ],
            'location' => 'Laboratórios ISTEC',
            'start_date' => '2026-06-02',
            'end_date' => '2026-06-04',
        ],
        [
            'title' => [
                'pt' => 'Sessão de Apresentação de Projetos Finais',
                'en' => 'Final Project Presentation Session',
            ],
            'description' => [
                'pt' => 'Estudantes finalistas apresentam os seus projetos perante professores e empresas convidadas.',
                'en' => 'Final-year students present their projects to professors and invited companies.',
            ],
            'location' => 'Campus ISTEC',
            'start_date' => '2026-06-20',
            'end_date' => null,
        ],
    ];

    public function definition(): array
    {
        $event = fake()->randomElement(self::$events);

        return [
            'media_id' => Media::factory(), // ✅ correto
            'event_category_id' => EventCategory::inRandomOrder()->first()?->id,

            'start_date' => Carbon::parse($event['start_date']),
            'end_date' => $event['end_date']
                ? Carbon::parse($event['end_date'])
                : null,

            'location' => $event['location'],

            'title' => $event['title'],
            'description' => $event['description'],
        ];
    }
}
