<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Volunteer extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'bio',
        'skills',
        'availability',
        'status',
        'admin_notes'
    ];

    protected $casts = [
        'skills' => 'array',
    ];}
