<?php

namespace App\Services\Payment;

use Illuminate\Support\Facades\Log;

class SslCommerzGateway implements PaymentGatewayInterface
{
    public function initiatePayment(array $data)
    {
        // TODO: Implement SSLCommerz API Call
        // $post_data = [...];
        // $direct_api_url = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

        Log::info("Initiating SSLCommerz Payment for Order: " . $data['transaction_id']);

        return [
            'success' => true,
            'gateway' => 'sslcommerz',
            'redirect_url' => route('api.donations.callback') . '?transaction_id=' . $data['transaction_id'],
            'transaction_id' => $data['transaction_id'],
        ];
    }

    public function verifyPayment($transactionId)
    {
        // TODO: Verify IPN or validation API
        return [
            'status' => 'completed',
            'amount' => 0,
            'currency' => 'BDT',
        ];
    }
}
