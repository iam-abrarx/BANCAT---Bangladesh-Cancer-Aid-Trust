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
        Schema::table('campaigns', function (Blueprint $table) {
            $table->string('submitter_name')->nullable()->after('is_featured');
            $table->string('submitter_email')->nullable()->after('submitter_name');
            $table->string('submitter_phone')->nullable()->after('submitter_email');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending')->after('submitter_phone');
            $table->text('admin_notes')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('campaigns', function (Blueprint $table) {
            $table->dropColumn(['submitter_name', 'submitter_email', 'submitter_phone', 'status', 'admin_notes']);
        });
    }
};
