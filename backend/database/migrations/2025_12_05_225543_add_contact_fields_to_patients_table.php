<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('location');
            $table->string('email')->nullable()->after('phone');
            $table->string('donor_name')->nullable()->after('email');
            $table->decimal('fund_raised', 10, 2)->default(0)->after('treatment_cost_raised');
            $table->json('prescriptions')->nullable()->after('medical_summary_bn');
        });
    }

    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropColumn(['phone', 'email', 'donor_name', 'fund_raised', 'prescriptions']);
        });
    }
};
