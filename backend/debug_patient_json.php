<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Patient;
use App\Models\Donation;

$p = Patient::first();
echo "--- PATIENT DATA ---\n";
echo "ID: " . $p->id . "\n";
echo "Fund Raised (Offline): " . $p->fund_raised . "\n";
echo "Treatment Cost Raised (Cached): " . $p->treatment_cost_raised . "\n";
echo "Raised Amount (Accessor): " . $p->raised_amount . "\n"; // This triggers the calculation

echo "\n--- DONATIONS QUERY ---\n";
$donations = Donation::where('patient_id', $p->id)->get();
echo "Total Donations found: " . $donations->count() . "\n";

foreach ($donations as $d) {
    echo "ID: {$d->id} | Amount: {$d->amount} | Payment Status: {$d->payment_status} | Status: {$d->status}\n";
}

$sum = $p->donations()
    ->where('payment_status', 'completed')
    ->where('status', 'approved')
    ->sum('amount');
echo "\nCalculated Sum (Online Approved): " . $sum . "\n";
