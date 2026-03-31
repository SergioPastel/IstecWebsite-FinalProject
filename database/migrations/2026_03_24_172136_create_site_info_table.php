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

            $table->foreignUuid('logo_media_id')->constrained('media');
            $table->foreignUuid('favicon_media_id')->constrained('media');

            $table->json('slogan');
            $table->string('site_name');
            $table->string('phone_number');
            $table->string('email');
            $table->string('address');
            
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
