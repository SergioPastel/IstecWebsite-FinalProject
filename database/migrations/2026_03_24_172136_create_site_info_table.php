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
