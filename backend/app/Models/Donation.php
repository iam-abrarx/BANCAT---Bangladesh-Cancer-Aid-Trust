<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'user_id',
        'donor_name',
        'donor_email',
        'donor_phone',
        'patient_id',
        'campaign_id',
        'program_id',
        'amount',
        'currency',
        'payment_method',
        'payment_status',
        'status',
        'donation_type',
        'category',
        'is_anonymous',
        'message',
        'payment_gateway_response',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'payment_gateway_response' => 'array',
        'is_anonymous' => 'boolean',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function donor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
