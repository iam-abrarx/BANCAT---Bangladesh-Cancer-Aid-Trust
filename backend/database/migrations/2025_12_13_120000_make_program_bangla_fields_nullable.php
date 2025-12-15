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
        Schema::table('programs', function (Blueprint $table) {
            $table->string('name_bn')->nullable()->change();
            $table->text('description_bn')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('programs', function (Blueprint $table) {
            // Reverting nullable is risky if data exists, but technically:
            $table->string('name_bn')->nullable(false)->change();
            $table->text('description_bn')->nullable(false)->change();
        });
    }
};
