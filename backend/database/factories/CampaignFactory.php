<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CampaignFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'slug' => fake()->slug(),
            'name_en' => fake()->sentence(),
            'name_bn' => 'প্রচারণা নাম',
            'description_en' => fake()->paragraph(),
            'description_bn' => 'বর্ণনা...',
            'banner_image' => fake()->imageUrl(),
            'goal_amount' => 100000,
            'raised_amount' => 0,
            'start_date' => now(),
            'end_date' => now()->addDays(30),
            'is_active' => true,
            'is_featured' => true,
        ];
    }
}
