<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_en',
        'title_bn',
        'slug',
        'description_en',
        'description_bn',
        'featured_image',
        'date',
        'is_published',
        'view_count'
    ];

    protected $casts = [
        'date' => 'date',
        'is_published' => 'boolean',
        'view_count' => 'integer',
    ];

    public function images()
    {
        return $this->hasMany(GalleryImage::class)->orderBy('order');
    }
}
