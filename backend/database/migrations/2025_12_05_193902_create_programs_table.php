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
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name_en');
            $table->string('name_bn');
            $table->string('tagline_en')->nullable();
            $table->string('tagline_bn')->nullable();
            $table->text('description_en');
            $table->text('description_bn');
            $table->string('icon')->nullable();
            $table->string('banner_image')->nullable();
            $table->jsonb('impact_metrics')->nullable(); // {"lives_touched": 5000}
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
