<?php

namespace App\Services\Payment;

use InvalidArgumentException;

class PaymentGatewayFactory
{
    public static function make(string $gatewayName): PaymentGatewayInterface
    {
        return match (strtolower($gatewayName)) {
            'bkash' => new BkashGateway(),
            'stripe' => new StripeGateway(),
            'sslcommerz' => new SslCommerzGateway(),
            // Add more gateways here
            default => throw new InvalidArgumentException("Unsupported payment gateway: {$gatewayName}")
        };
    }
}
