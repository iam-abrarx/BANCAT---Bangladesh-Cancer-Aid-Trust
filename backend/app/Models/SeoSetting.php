<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoSetting extends Model
{
    protected $fillable = [
        'key',
        'value',
        'type',
    ];

    // No casts needed - value is stored as text and handled explicitly

    /**
     * Get all SEO settings as a key-value array.
     */
    public static function getAllSettings(): array
    {
        $settings = self::all()->pluck('value', 'key')->toArray();
        
        // Decode JSON values where needed
        foreach ($settings as $key => $value) {
            if (is_string($value)) {
                $decoded = json_decode($value, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                    $settings[$key] = $decoded;
                }
            }
        }
        
        return $settings;
    }

    /**
     * Update multiple SEO settings at once.
     */
    public static function updateSettings(array $data): void
    {
        foreach ($data as $key => $value) {
            self::updateOrCreate(
                ['key' => $key],
                [
                    'value' => is_array($value) ? json_encode($value) : $value,
                    'type' => is_array($value) ? 'json' : (is_bool($value) ? 'boolean' : 'string'),
                ]
            );
        }
    }

    /**
     * Get a single setting by key.
     */
    public static function getSetting(string $key, $default = null)
    {
        $setting = self::where('key', $key)->first();
        
        if (!$setting) {
            return $default;
        }
        
        if ($setting->type === 'json' && is_string($setting->value)) {
            return json_decode($setting->value, true) ?? $default;
        }
        
        if ($setting->type === 'boolean') {
            return filter_var($setting->value, FILTER_VALIDATE_BOOLEAN);
        }
        
        return $setting->value;
    }
}
