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
         * The table courses holds the minimum course details page information.
         * Some fields are missing, like ects. as they are obtainable as a sum
         * of all subjects' ects.
         */
        Schema::create('courses', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('course_category_id')->references('id')->on('course_categories');
            $table->mediumText('professional_outcomes');

            $table->string('title');
            $table->text('description');
            $table->unsignedTinyInteger('duration_years');
            $table->boolean('study_regime'); // 0 - working hours | 1 - after-working hours

            $table->unsignedSmallInteger('tuition_monthly_pay');
            $table->tinyInteger('tuition_months');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
