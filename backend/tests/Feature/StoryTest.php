<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Story;

class StoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_stories()
    {
        Story::factory()->count(5)->create(['is_published' => true]);

        $response = $this->getJson('/api/v1/stories');

        $response->assertStatus(200)
                 ->assertJsonCount(5, 'data');
    }

    public function test_can_filter_stories_by_type()
    {
        Story::factory()->create(['type' => 'survivor', 'is_published' => true]);
        Story::factory()->create(['type' => 'volunteer', 'is_published' => true]);

        $response = $this->getJson('/api/v1/stories?type=survivor');

        $response->assertStatus(200)
                 ->assertJsonCount(1, 'data')
                 ->assertJsonFragment(['type' => 'survivor']);
    }
}
