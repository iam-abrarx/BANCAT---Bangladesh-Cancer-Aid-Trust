<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartnerApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'org_name',
        'contact_person',
        'email',
        'phone',
        'type',
        'message',
        'status'
    ];
}
