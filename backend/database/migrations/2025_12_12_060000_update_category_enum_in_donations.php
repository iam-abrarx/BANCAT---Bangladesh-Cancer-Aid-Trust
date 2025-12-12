<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('donations', function (Blueprint $table) {
            // Attempting to update enum. If this fails on SQLite, we might need to cast to string first or use raw SQL workaround.
            // But strict mode might prevent it. Let's try changing to string which is safer for SQLite enum expansion.
            $table->string('category')->change(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('donations', function (Blueprint $table) {
             // Revert logic is complex for SQLite, we can leave it as string or try to revert to enum
            // $table->enum('category', ['general', 'campaign', 'patient', 'emergency'])->change();
        });
    }
};
