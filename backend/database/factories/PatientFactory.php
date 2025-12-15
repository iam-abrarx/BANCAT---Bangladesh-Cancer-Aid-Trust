<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name_en' => fake()->name(),
            'name_bn' => 'বাংলা নাম',
            'code' => Str::random(8),
            'age' => fake()->numberBetween(1, 80),
            'gender' => fake()->randomElement(['male', 'female']),
            'cancer_type' => fake()->randomElement(['Leukemia', 'Lung Cancer']),
            'location' => fake()->city(), // Was district
            'medical_summary_en' => fake()->paragraph(),
            'medical_summary_bn' => 'বিস্তারিত বর্ণনা...',
            'treatment_cost_required' => 500000,
            'treatment_cost_raised' => 0,
            'is_featured' => false,
            'status' => 'active',
            'is_active' => true,
        ];
    }
}
