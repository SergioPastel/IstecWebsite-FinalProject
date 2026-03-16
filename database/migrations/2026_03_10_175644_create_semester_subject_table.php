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
         * This is the pivot table for the many to many relationship
         * between semesters and subjects.
         */
        Schema::create('semester_subject', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('semester_id')->references('id')->on('semesters');
            $table->foreignUuid('subject_id')->references('id')->on('subjects');

            $table->timestamps();
            $table->softDeletes();

            $table->unique(['semester_id', 'subject_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('semester_subject');
    }
};
