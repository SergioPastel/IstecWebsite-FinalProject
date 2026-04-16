<?php

namespace Database\Seeders;

use App\Models\DepartmentInfo;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'title' => 'Serviços Académicos',
                'phone' => '+351 210 000 000',
                'phone_alt' => '+351 210 000 001',
                'email' => 'academicos@istec.pt',
            ],
            [
                'title' => 'Gabinete de Relações Internacionais (GRI)',
                'phone' => '+351 210 000 002',
                'phone_alt' => '+351 210 000 003',
                'email' => 'gri@istec.pt',
            ],
            [
                'title' => 'Suporte Técnico e Informática',
                'phone' => '+351 210 000 004',
                'phone_alt' => '+351 210 000 005',
                'email' => 'suporte@istec.pt',
            ],
            [
                'title' => 'Secretaria de Direção',
                'phone' => '+351 210 000 006',
                'phone_alt' => '+351 210 000 007',
                'email' => 'direcao@istec.pt',
            ],
        ];

        foreach ($departments as $department) {
            DepartmentInfo::create($department);
        }
    }
}
