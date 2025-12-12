<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Patient;

class DonationTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_initiate_donation()
    {
        $patient = Patient::factory()->create();

        $data = [
            'amount' => 500,
            'payment_method' => 'bkash',
            'patient_id' => $patient->id,
            'donor_name' => 'Test Donor',
            'donor_email' => 'test@example.com',
            'donation_type' => 'one_time', // Required
            'category' => 'patient' // Required
        ];

        $this->withoutExceptionHandling();
        $response = $this->postJson('/api/v1/donations/initiate', $data);
        
        // Assuming mocked gateway response
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'donation' => ['transaction_id'],
                     'payment_url'
                 ]);
                 
        $this->assertDatabaseHas('donations', [
            'amount' => 500,
            'payment_status' => 'pending'
        ]);
    }
}
