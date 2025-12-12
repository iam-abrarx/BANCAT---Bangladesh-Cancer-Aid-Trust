<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name_en',
        'name_bn',
        'photo',
        'age',
        'gender',
        'cancer_type',
        'diagnosis_date',
        'location',
        'phone',
        'email',
        'donor_name',
        'medical_summary_en',
        'medical_summary_bn',
        'treatment_cost_required',
        'treatment_cost_raised',
        'fund_raised',
        'prescriptions',
        'is_active',
        'is_featured',
        'status',
    ];

    protected $casts = [
        'diagnosis_date' => 'date',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'treatment_cost_required' => 'decimal:2',
        'treatment_cost_raised' => 'decimal:2',
    ];

    protected $appends = ['raised_amount'];

    public function getRaisedAmountAttribute()
    {
        return $this->donations()
            ->where('payment_status', 'completed')
            ->where('status', 'approved')
            ->sum('amount') + ($this->fund_raised ?? 0);
    }

    public function updates()
    {
        return $this->hasMany(PatientUpdate::class);
    }

    public function donations()
    {
        return $this->hasMany(Donation::class);
    }
}
