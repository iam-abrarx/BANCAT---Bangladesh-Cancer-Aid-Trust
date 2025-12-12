<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title_en',
        'title_bn',
        'content_en',
        'content_bn',
        'meta_title_en',
        'meta_title_bn',
        'meta_description_en',
        'meta_description_bn',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    // Use slug for route binding if desired, but we handle it manually in controller usually for flexibility
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
