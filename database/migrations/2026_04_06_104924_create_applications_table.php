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
                    ->nullable() // allow null in case of hard delete, but it's still a required field
                    ->constrained('courses')
                    ->nullOnDelete(); // courses should never be hard deleted, but if it somehow happens this will fire to keep the records

            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->date('birth_date')->nullable();

            $table->foreignUuid('course_category_id')
                    ->nullable()
                    ->constrained('course_categories')
                    ->nullOnDelete();

            $table->timestamps();

            $table->softDeletes();
        });
    }

    // /**
    //  * Reverse the migrations.
    //  */
    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropForeign(['course_id']);
            $table->dropColumn('course_id');
        });
    }
};
