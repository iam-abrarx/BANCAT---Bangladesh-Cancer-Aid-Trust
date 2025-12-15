<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Patient;

class PatientTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_patients()
    {
        Patient::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/patients');

        $response->assertStatus(200)
                 ->assertJsonCount(3, 'data');
    }

    public function test_can_search_patients()
    {
        Patient::factory()->create(['name_en' => 'John Doe']);
        Patient::factory()->create(['name_en' => 'Jane Smith']);

        $response = $this->getJson('/api/v1/patients?search=John');

        $response->assertStatus(200)
                 ->assertJsonCount(1, 'data')
                 ->assertJsonFragment(['name_en' => 'John Doe']);
    }

    public function test_can_view_single_patient()
    {
        $this->withoutExceptionHandling();
        $patient = Patient::factory()->create();

        $response = $this->getJson("/api/v1/patients/{$patient->code}");

        $response->assertStatus(200)
                 ->assertJson(['id' => $patient->id]);
    }
}
