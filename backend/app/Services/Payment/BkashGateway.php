<?php

namespace App\Services\Payment;

class BkashGateway implements PaymentGatewayInterface
{
    public function initiatePayment(array $data)
    {
        // Mock implementation for development
        // Instead of external payment, directly redirect to our callback
        $transactionId = $data['transaction_id'];
        $callbackUrl = route('api.donations.callback') . '?transaction_id=' . $transactionId;
        
        return [
            'success' => true,
            'gateway' => 'bkash',
            'redirect_url' => $callbackUrl,
            'transaction_id' => $transactionId,
        ];
    }

    public function verifyPayment($transactionId)
    {
        // Mock implementation
        return [
            'status' => 'completed',
            'amount' => 1000,
            'currency' => 'BDT',
        ];
    }
}
