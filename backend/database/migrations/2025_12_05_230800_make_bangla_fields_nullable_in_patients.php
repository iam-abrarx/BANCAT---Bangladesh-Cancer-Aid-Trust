<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // SQLite doesn't support ALTER COLUMN easily, so we use raw SQL
       DB::statement('PRAGMA foreign_keys=off');
        
        // Create new table with nullable fields
        DB::statement('
            CREATE TABLE patients_new (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                code VARCHAR NOT NULL,
                name_en VARCHAR NOT NULL,
                name_bn VARCHAR,
                photo VARCHAR,
                age INTEGER,
                gender VARCHAR,
                cancer_type VARCHAR,
                diagnosis_date DATE,
                location VARCHAR,
                phone VARCHAR,
                email VARCHAR,
                donor_name VARCHAR,
                medical_summary_en TEXT,
                medical_summary_bn TEXT,
                treatment_cost_required NUMERIC(10, 2) DEFAULT 0,
                treatment_cost_raised NUMERIC(10, 2) DEFAULT 0,
                fund_raised NUMERIC(10, 2) DEFAULT 0,
                prescriptions TEXT,
                is_active INTEGER DEFAULT 1,
                is_featured INTEGER DEFAULT 0,
                status VARCHAR,
                created_at DATETIME,
                updated_at DATETIME
            )
        ');
        
        // Copy data from old table to new table
        DB::statement('
            INSERT INTO patients_new SELECT * FROM patients
        ');
        
        // Drop old table
        DB::statement('DROP TABLE patients');
        
        // Rename new table to old name
        DB::statement('ALTER TABLE patients_new RENAME TO patients');
        
        DB::statement('PRAGMA foreign_keys=on');
    }

    public function down(): void
    {
        // Not reversible easily
    }
};
