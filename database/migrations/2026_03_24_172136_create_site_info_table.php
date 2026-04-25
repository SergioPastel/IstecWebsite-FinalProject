<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /**
         * The idea for this table is that it will be single-rowed.
         */
        Schema::create('site_infos', function (Blueprint $table) {
            $table->id(); // id: 1

            $table->json('slogan');
            $table->json('mission');
            $table->json('whoWeAre');
            $table->string('site_name');
            $table->string('phone_number');
            $table->string('email');
            $table->string('address');


            $table->foreignUuid('ctesp_banner')->nullable()->constrained('media')->nullOnDelete();
            $table->json('ctesp_banner_title')->nullable();
            $table->json('ctesp_banner_subtitle')->nullable();

            $table->foreignUuid('licenciatura_banner')->nullable()->constrained('media')->nullOnDelete();
            $table->json('licenciatura_banner_title')->nullable();
            $table->json('licenciatura_banner_subtitle')->nullable();

            $table->foreignUuid('pos_graduacao_banner')->nullable()->constrained('media')->nullOnDelete();
            $table->json('pos_graduacao_banner_title')->nullable();
            $table->json('pos_graduacao_banner_subtitle')->nullable();

            $table->foreignUuid('eventos_noticias_banner')->nullable()->constrained('media')->nullOnDelete();
            $table->json('eventos_noticias_banner_title')->nullable();
            $table->json('eventos_noticias_banner_subtitle')->nullable();

            $table->foreignUuid('erasmus_banner')->nullable()->constrained('media')->nullOnDelete();
            $table->json('erasmus_banner_title')->nullable();
            $table->json('erasmus_banner_subtitle')->nullable();

            $table->foreignUuid('pedagogia_banner')->nullable()->constrained('media')->nullOnDelete();
            $table->json('pedagogia_banner_title')->nullable();
            $table->json('pedagogia_banner_subtitle')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_infos');
    }
};
