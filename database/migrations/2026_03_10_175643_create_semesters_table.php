<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /**
         * Semesters will hold a collection of subjects, through a many to many
         * relationship in semester_subject.
         */
        Schema::create('semesters', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->foreignUuid('course_uuid')->references('uuid')->on('courses');
            $table->unsignedTinyInteger('semester_number');

            $table->timestamps();
            $table->softDeletes();

            // This will avoid duplicate semesters for the same course
            $table->unique(['course_uuid', 'semester_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('semesters');
    }
};
