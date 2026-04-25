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
        schema::create('event_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('event_id')
                    ->nullable() // allow null in case of hard delete, but it's still a required field
                    ->constrained('events')
                    ->nullOnDelete();

            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->string('identification_number')->nullable();

            $table->foreignUuid('event_category_id')
                    ->nullable()
                    ->constrained('event_categories')
                    ->nullOnDelete();

            $table->timestamps();

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_applications', function (Blueprint $table) {
            $table->dropForeign(['event_id']);
            $table->dropColumn('event_id');
        });
    }
};
