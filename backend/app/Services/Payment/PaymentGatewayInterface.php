<?php

namespace App\Services\Payment;

interface PaymentGatewayInterface
{
    public function initiatePayment(array $data);
    public function verifyPayment($transactionId);
}
