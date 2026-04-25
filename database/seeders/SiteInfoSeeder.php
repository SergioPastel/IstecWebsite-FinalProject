<?php

namespace Database\Seeders;

use App\Models\Media;
use App\Models\SiteInfo;
use Illuminate\Database\Seeder;

class SiteInfoSeeder extends Seeder
{
    public function run(): void
    {
        SiteInfo::updateOrCreate(
            ['id' => 1],
            [
                'slogan' => [
                    'pt' => 'Instituto Superior de Tecnologias Avançadas do Porto, com foco na inovação, formação prática e proximidade ao mercado.',
                    'en' => 'Higher Institute of Advanced Technologies of Porto, focused on innovation, practical training and proximity to the market.',
                ],
                'mission' => [
                    'pt' => 'Promover uma formação de excelência baseada na inovação, proximidade ao estudante e ligação ao tecido empresarial. Valorizamos o rigor académico, a responsabilidade social e o desenvolvimento contínuo de competências.',
                    'en' => 'Promote excellent education based on innovation, student closeness, and strong connections with the business community. We value academic rigor, social responsibility, and the continuous development of skills.',
                ],
                'whoWeAre' => [
                    'pt' => 'O ISTEC Porto integra uma rede de ensino superior orientada para a tecnologia, inovação e desenvolvimento de competências práticas. A nossa missão passa por preparar profissionais qualificados, promovendo o contacto direto com o mercado e experiências reais ao longo do percurso académico.',
                    'en' => 'ISTEC Porto is part of a higher education network focused on technology, innovation, and the development of practical skills. Our mission is to prepare qualified professionals by promoting direct contact with the job market and real-world experiences throughout the academic journey.',
                ],
                'site_name'        => config('app.name'),
                'phone_number'     => '📞+351 225 193 220',
                'email'            => '📧secretaria-porto@istec.pt',
                'address'          => '📍R. de Silva Tapada 115, 4200-501 Porto',
            ]
        );
    }
}
