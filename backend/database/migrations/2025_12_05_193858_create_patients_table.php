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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique();
            $table->string('name_en');
            $table->string('name_bn');
            $table->string('photo')->nullable();
            $table->integer('age');
            $table->enum('gender', ['male', 'female', 'other']);
            $table->string('cancer_type', 100);
            $table->date('diagnosis_date')->nullable();
            $table->string('location');
            $table->text('medical_summary_en')->nullable();
            $table->text('medical_summary_bn')->nullable();
            $table->decimal('treatment_cost_required', 12, 2);
            $table->decimal('treatment_cost_raised', 12, 2)->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['active', 'completed', 'archived'])->default('active');
            $table->timestamps();
            
            // Indexes
            $table->index(['status', 'is_active']);
            $table->index('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
