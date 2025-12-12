<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Campaign;

class CampaignTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_campaigns()
    {
        Campaign::factory()->count(3)->create(['is_active' => true]);

        $response = $this->getJson('/api/v1/campaigns');

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    public function test_can_view_single_campaign()
    {
        $campaign = Campaign::factory()->create();

        $response = $this->getJson("/api/v1/campaigns/{$campaign->slug}");

        $response->assertStatus(200)
                 ->assertJson(['slug' => $campaign->slug]); // Adjusted expectation
    }
}
