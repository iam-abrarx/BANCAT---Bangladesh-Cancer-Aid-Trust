<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientUpdate extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'title_en',
        'title_bn',
        'content_en',
        'content_bn',
        'photo',
        'update_date',
    ];

    protected $casts = [
        'update_date' => 'date',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
