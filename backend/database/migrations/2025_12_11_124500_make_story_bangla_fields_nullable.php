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
        Schema::table('stories', function (Blueprint $table) {
            $table->string('subject_name_bn')->nullable()->change();
            $table->string('title_bn')->nullable()->change();
            $table->text('content_bn')->nullable()->change();
            $table->text('excerpt_en')->nullable()->change();
            $table->text('excerpt_bn')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverting not strictly required for this patch unless rolling back specific step
    }
};
