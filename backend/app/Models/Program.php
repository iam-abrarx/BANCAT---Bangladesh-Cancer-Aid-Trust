<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name_en',
        'name_bn',
        'tagline_en',
        'tagline_bn',
        'description_en',
        'description_bn',
        'icon',
        'banner_image',
        'impact_metrics', // JSON
        'is_active',
        'order',
    ];

    protected $casts = [
        'impact_metrics' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
