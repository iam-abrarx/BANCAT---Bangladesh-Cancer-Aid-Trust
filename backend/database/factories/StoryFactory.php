<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title_en' => fake()->sentence(),
            'title_bn' => 'একটি গল্প',
            'slug' => fake()->unique()->slug(),
            'subject_name_en' => fake()->name(),
            'subject_name_bn' => 'বাংলা নাম',
            'excerpt_en' => fake()->paragraph(),
            'excerpt_bn' => 'সংক্ষিপ্ত বিবরণ...',
            'content_en' => fake()->paragraph(),
            'content_bn' => 'গল্পের বিষয়বস্তু...',
            'featured_image' => 'default.jpg',
            'type' => 'survivor',
            'is_published' => true,
            'published_at' => now(),
        ];
    }
}
