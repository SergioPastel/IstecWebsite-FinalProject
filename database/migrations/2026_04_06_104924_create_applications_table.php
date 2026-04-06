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
        // For the course applications
        // Statuses are not kept as per client request (the website is not supposed to "manage" emails/applications)
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('course_id')
                  ->constrained()
                  ->references('id')
                  ->on('course')
                  ->nullOnDelete(); // courses should never be hard deleted, but if it somehow happens this will fire to keep the records

            $table->string('name');
            $table->string('email');            
            $table->string('cv_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
