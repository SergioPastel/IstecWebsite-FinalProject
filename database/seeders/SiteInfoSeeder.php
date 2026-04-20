<?php

namespace Database\Seeders;

use App\Models\Media;
use App\Models\SiteInfo;
use Illuminate\Database\Seeder;

class SiteInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $logo = Media::create([
            'type' => 'image',
            'file_path' => '',
            'alt_text' => 'ISTEC Logo',
        ]);
        $icon = Media::create([
            'type' => 'image',
            'file_path' => '',
            'alt_text' => 'ISTEC Icon',
        ]);

        SiteInfo::create([
            'slogan' => [
                'pt' => 'Instituto Superior de Tecnologias Avançadas do Porto, com foco na inovação, formação prática e proximidade ao mercado.',
                'en' => 'Higher Institute of Advanced Technologies of Porto, focused on innovation, practical training and proximity to the market.',
            ],
            'mission' => [
                'pt' => [
                    [
                        'title' => ,
                        'description' => ,
                    ]
                ],
                'en' => [
                    [
                        'title' => ,
                        'description' => ,
                    ]
                ],

            ],
            'whoWeAre' => [
                'pt' => [
                    [
                        'title' => ,
                        'description' => ,
                    ]
                ],
                'en' => [
                    [
                        'title' => ,
                        'description' => ,
                    ]
                ],

            ],
            'site_name' => config('app.name'),
            // TODO: adding spaces between icon and text does nothing as of now
            'phone_number' =>   '📞+351 225 193 220',
            'email' =>          '📧secretaria-porto@istec.pt',
            'address' =>        '📍R. de Silva Tapada 1154200-501 Porto',

            'logo_media_id' => $logo->id,
            'favicon_media_id' => $icon->id,
        ]);
    }
}
