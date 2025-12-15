<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class TempUserSeeder extends Seeder
{
    public function run()
    {
        // Disable foreign key checks to avoid issues if needed, strictly not needed for updateOrCreate unless id conflict
        User::updateOrCreate(
            ['email' => 'uploader@bancat.org'],
            [
                'name' => 'Uploader',
                'role' => 'admin',
                'password' => Hash::make('password123'),
                'is_active' => true
            ]
        );
    }
}
