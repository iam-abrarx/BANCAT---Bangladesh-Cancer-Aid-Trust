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
        Schema::create('seo_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('string'); // string, boolean, json
            $table->timestamps();
        });

        // Insert default SEO settings
        $defaults = [
            ['key' => 'site_title', 'value' => 'BANCAT - Bangladesh Cancer Aid & Trust', 'type' => 'string'],
            ['key' => 'site_description', 'value' => 'Supporting cancer patients in Bangladesh through medical aid, awareness, and community support.', 'type' => 'string'],
            ['key' => 'site_keywords', 'value' => 'cancer, bangladesh, charity, donation, healthcare, patients, support', 'type' => 'string'],
            ['key' => 'og_image', 'value' => '', 'type' => 'string'],
            ['key' => 'twitter_handle', 'value' => '', 'type' => 'string'],
            ['key' => 'google_site_verification', 'value' => '', 'type' => 'string'],
            ['key' => 'bing_site_verification', 'value' => '', 'type' => 'string'],
            ['key' => 'google_analytics_id', 'value' => '', 'type' => 'string'],
            ['key' => 'google_tag_manager_id', 'value' => '', 'type' => 'string'],
            ['key' => 'facebook_pixel_id', 'value' => '', 'type' => 'string'],
            ['key' => 'robots_txt_content', 'value' => "User-agent: *\nAllow: /", 'type' => 'string'],
            ['key' => 'structured_data_org', 'value' => json_encode([
                'name' => 'BANCAT',
                'url' => 'https://bancat.org',
                'logo' => '',
                'sameAs' => []
            ]), 'type' => 'json'],
            ['key' => 'canonical_url_base', 'value' => '', 'type' => 'string'],
            ['key' => 'locale', 'value' => 'en_US', 'type' => 'string'],
            ['key' => 'allow_indexing', 'value' => '1', 'type' => 'boolean'],
        ];

        foreach ($defaults as $setting) {
            DB::table('seo_settings')->insert(array_merge($setting, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seo_settings');
    }
};
