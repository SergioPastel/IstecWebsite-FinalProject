<?php

namespace Database\Seeders;

use App\Models\Media;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('media')->insert([
            Media::factory()->count(10)->create()
        ]);
    }
}
