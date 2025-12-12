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
        // Insert company settings into seo_settings table (reusing for all settings)
        $defaults = [
            // Address
            ['key' => 'company_city', 'value' => '', 'type' => 'string'],
            ['key' => 'company_country', 'value' => 'Bangladesh', 'type' => 'string'],
            ['key' => 'company_state', 'value' => '', 'type' => 'string'],
            ['key' => 'company_zip', 'value' => '', 'type' => 'string'],
            ['key' => 'company_street', 'value' => '', 'type' => 'string'],
            
            // Contact
            ['key' => 'company_phone', 'value' => '', 'type' => 'string'],
            ['key' => 'company_website', 'value' => 'https://bancat.org', 'type' => 'string'],
            ['key' => 'company_email', 'value' => '', 'type' => 'string'],
            
            // Social Profiles (stored as JSON array)
            ['key' => 'company_social_profiles', 'value' => json_encode([]), 'type' => 'json'],
            
            // Footer
            ['key' => 'footer_site_link', 'value' => 'https://bancat.org', 'type' => 'string'],
            ['key' => 'footer_copyright', 'value' => 'Copyright © BANCAT. All rights reserved.', 'type' => 'string'],
            ['key' => 'footer_external_text', 'value' => 'BANCAT', 'type' => 'string'],
            ['key' => 'footer_external_link', 'value' => 'https://bancat.org', 'type' => 'string'],
        ];

        foreach ($defaults as $setting) {
            // Only insert if key doesn't exist
            $exists = DB::table('seo_settings')->where('key', $setting['key'])->exists();
            if (!$exists) {
                DB::table('seo_settings')->insert(array_merge($setting, [
                    'created_at' => now(),
                    'updated_at' => now(),
                ]));
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $keys = [
            'company_city', 'company_country', 'company_state', 'company_zip', 'company_street',
            'company_phone', 'company_website', 'company_email', 'company_social_profiles',
            'footer_site_link', 'footer_copyright', 'footer_external_text', 'footer_external_link',
        ];
        
        DB::table('seo_settings')->whereIn('key', $keys)->delete();
    }
};
