<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@bancat.org',
            'role' => 'admin',
            'password' => bcrypt('password'),
            'is_active' => true,
        ]);
        
        $this->call([
            PageSeeder::class,
            TeamMemberSeeder::class,
            ProgramSeeder::class,
            // Add other seeders here
        ]);
    }
}
