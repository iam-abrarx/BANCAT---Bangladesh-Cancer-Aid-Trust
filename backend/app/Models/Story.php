<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'type', // survivor, caregiver, volunteer, testimonial
        'title_en',
        'title_bn',
        'subject_name_en',
        'subject_name_bn',
        'excerpt_en',
        'excerpt_bn',
        'content_en',
        'content_bn',
        'featured_image',
        'video_url',
        'is_published',
        'view_count',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'views_count' => 'integer',
    ];


}
