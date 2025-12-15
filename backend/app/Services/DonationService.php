<?php

namespace App\Services;

use App\Models\Donation;
use App\Models\Patient;
use App\Models\Campaign;
use App\Services\Payment\PaymentGatewayInterface;
use App\Services\Payment\BkashGateway; // Direct binding for now, better in ServiceProvider
use App\Services\Payment\PaymentGatewayFactory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DonationService
{
    // protected $gateway; // Removed hard dependency

    public function __construct()
    {
        // No default gateway
    }

    public function initiateDonation(array $data)
    {
        return DB::transaction(function () use ($data) {
            $transactionId = 'TRX-' . strtoupper(Str::random(10));

            // Factory: Select Gateway based on user input
            $gateway = PaymentGatewayFactory::make($data['payment_method'] ?? 'bkash');

            $donation = Donation::create([
                'transaction_id' => $transactionId,
                'user_id' => $data['donor_id'] ?? null,
                'patient_id' => $data['patient_id'] ?? null,
                'campaign_id' => $data['campaign_id'] ?? null,
                'program_id' => $data['program_id'] ?? null,
                'donor_name' => $data['donor_name'] ?? 'Anonymous',
                'donor_email' => $data['donor_email'] ?? 'no-email@example.com',
                'amount' => $data['amount'],
                'currency' => 'BDT',
                'payment_method' => $data['payment_method'],
                'donation_type' => $data['donation_type'] ?? 'one_time',
                'category' => $data['category'] ?? 'general',
                'payment_status' => 'pending',
                'status' => 'pending', // Pending Admin Approval
                'message' => $data['message'] ?? null,
            ]);

            // Call Gateway
            $paymentResponse = $gateway->initiatePayment([
                'amount' => $data['amount'],
                'transaction_id' => $transactionId,
                'redirect_url' => route('api.donations.callback'),
            ]);

            $donation->update(['gateway_response' => $paymentResponse]);

            return [
                'donation' => $donation,
                'payment_url' => $paymentResponse['redirect_url'],
            ];
        });
    }

    public function verifyAndComplete($transactionId)
    {
        $donation = Donation::where('transaction_id', $transactionId)->firstOrFail();

        if ($donation->payment_status === 'completed') {
            return $donation;
        }

        // Verify with Gateway
        $gateway = PaymentGatewayFactory::make($donation->payment_method ?? 'bkash');
        $verification = $gateway->verifyPayment($transactionId);

        if ($verification['status'] === 'completed') {
            DB::transaction(function () use ($donation, $verification) {
                // Determine initial status based on payment
                // For now, ALL donations require Admin Approval, so status remains 'pending'
                $donation->update([
                    'payment_status' => 'completed',
                    // 'status' => 'pending' // Default is pending
                ]);

                Log::info("Donation {$donation->id} Payment Verified. Waiting for Admin Approval.");
            });
        }

        return $donation;
    }

    public function approveDonation($id)
    {
        $donation = Donation::findOrFail($id);

        if ($donation->status === 'approved') {
            return $donation;
        }

        if ($donation->payment_status !== 'completed') {
            throw new \Exception("Cannot approve donation with incomplete payment.");
        }

        DB::transaction(function () use ($donation) {
            $donation->update(['status' => 'approved']);

            // Update Raised Amount (Milestones) - ONLY triggered upon approval
            if ($donation->patient_id) {
                $patient = Patient::lockForUpdate()->find($donation->patient_id);
                if ($patient) {
                    $totalOnline = $patient->donations()
                        ->where('payment_status', 'completed')
                        ->where('status', 'approved') // Only count approved donations
                        ->sum('amount');
                    $patient->treatment_cost_raised = $totalOnline + ($patient->fund_raised ?? 0);
                    $patient->save();
                }
            } elseif ($donation->campaign_id) {
                $campaign = Campaign::lockForUpdate()->find($donation->campaign_id);
                if ($campaign) {
                    $campaign->increment('raised_amount', $donation->amount);
                    // Or recalculate if consistent with Patient logic
                }
            } elseif ($donation->program_id) {
                // Logic for Program milestones if they exist
                // $program = Program::lockForUpdate()->find($donation->program_id);
                // $program->increment('raised_amount', $donation->amount);
            }
        });

        return $donation;
    }
}
