<?php

namespace App\Services\Payment;

use Illuminate\Support\Facades\Log;

class StripeGateway implements PaymentGatewayInterface
{
    protected $apiKey;

    public function __construct()
    {
        // Load API key from .env
        $this->apiKey = env('STRIPE_SECRET');
    }

    public function initiatePayment(array $data)
    {
        // TODO: Implement Stripe Checkout Session creation
        // $stripe = new \Stripe\StripeClient($this->apiKey);
        // $session = $stripe->checkout->sessions->create([...]);

        Log::info("Initiating Stripe Payment for Order: " . $data['transaction_id']);

        // Mock Response for now
        return [
            'success' => true,
            'gateway' => 'stripe',
            'redirect_url' => route('api.donations.callback') . '?transaction_id=' . $data['transaction_id'], // Mock Redirect
            'transaction_id' => $data['transaction_id'],
        ];
    }

    public function verifyPayment($transactionId)
    {
        // TODO: Verify session with Stripe API
        return [
            'status' => 'completed',
            'amount' => 0, // Should be fetched from API
            'currency' => 'USD',
        ];
    }
}
