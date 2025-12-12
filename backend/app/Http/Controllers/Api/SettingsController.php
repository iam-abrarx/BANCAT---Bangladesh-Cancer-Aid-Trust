<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SeoSetting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SettingsController extends Controller
{
    /**
     * Get all SEO settings (public endpoint for frontend).
     */
    public function getSeoSettings(): JsonResponse
    {
        $settings = SeoSetting::getAllSettings();
        
        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    /**
     * Update SEO settings (admin only).
     */
    public function updateSeoSettings(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'site_title' => 'nullable|string|max:255',
            'site_description' => 'nullable|string|max:500',
            'site_keywords' => 'nullable|string|max:500',
            'og_image' => 'nullable|string|max:500',
            'twitter_handle' => 'nullable|string|max:100',
            'google_site_verification' => 'nullable|string|max:255',
            'bing_site_verification' => 'nullable|string|max:255',
            'google_analytics_id' => 'nullable|string|max:50',
            'google_tag_manager_id' => 'nullable|string|max:50',
            'facebook_pixel_id' => 'nullable|string|max:50',
            'robots_txt_content' => 'nullable|string|max:2000',
            'structured_data_org' => 'nullable|array',
            'structured_data_org.name' => 'nullable|string|max:255',
            'structured_data_org.url' => 'nullable|string|max:500',
            'structured_data_org.logo' => 'nullable|string|max:500',
            'structured_data_org.sameAs' => 'nullable|array',
            'canonical_url_base' => 'nullable|string|max:255',
            'locale' => 'nullable|string|max:10',
            'allow_indexing' => 'nullable|boolean',
        ]);

        SeoSetting::updateSettings($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'SEO settings updated successfully',
            'data' => SeoSetting::getAllSettings(),
        ]);
    }

    /**
     * Get company settings (public endpoint for frontend).
     */
    public function getCompanySettings(): JsonResponse
    {
        $allSettings = SeoSetting::getAllSettings();
        
        // Extract company-specific settings
        $companySettings = [
            'city' => $allSettings['company_city'] ?? '',
            'country' => $allSettings['company_country'] ?? 'Bangladesh',
            'state' => $allSettings['company_state'] ?? '',
            'zip' => $allSettings['company_zip'] ?? '',
            'street' => $allSettings['company_street'] ?? '',
            'phone' => $allSettings['company_phone'] ?? '',
            'website' => $allSettings['company_website'] ?? '',
            'email' => $allSettings['company_email'] ?? '',
            'social_profiles' => $allSettings['company_social_profiles'] ?? [],
            'footer_site_link' => $allSettings['footer_site_link'] ?? '',
            'footer_copyright' => $allSettings['footer_copyright'] ?? '',
            'footer_external_text' => $allSettings['footer_external_text'] ?? '',
            'footer_external_link' => $allSettings['footer_external_link'] ?? '',
        ];
        
        return response()->json([
            'success' => true,
            'data' => $companySettings,
        ]);
    }

    /**
     * Update company settings (admin only).
     */
    public function updateCompanySettings(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip' => 'nullable|string|max:20',
            'street' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:50',
            'website' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'social_profiles' => 'nullable|array',
            'social_profiles.*.platform' => 'required_with:social_profiles|string',
            'social_profiles.*.url' => 'required_with:social_profiles|string',
            'footer_site_link' => 'nullable|string|max:255',
            'footer_copyright' => 'nullable|string|max:500',
            'footer_external_text' => 'nullable|string|max:100',
            'footer_external_link' => 'nullable|string|max:255',
        ]);

        // Map to prefixed keys for storage
        $mappedData = [];
        $fieldMap = [
            'city' => 'company_city',
            'country' => 'company_country',
            'state' => 'company_state',
            'zip' => 'company_zip',
            'street' => 'company_street',
            'phone' => 'company_phone',
            'website' => 'company_website',
            'email' => 'company_email',
            'social_profiles' => 'company_social_profiles',
        ];

        foreach ($validatedData as $key => $value) {
            $storageKey = $fieldMap[$key] ?? $key;
            $mappedData[$storageKey] = $value;
        }

        SeoSetting::updateSettings($mappedData);

        return response()->json([
            'success' => true,
            'message' => 'Company settings updated successfully',
        ]);
    }
}
