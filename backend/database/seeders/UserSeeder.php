<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Super Admin
        User::updateOrCreate(
            ['email' => 'super_admin@bancat.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'role' => 'super_admin',
            ]
        );

        // Admin
        User::updateOrCreate(
            ['email' => 'admin@bancat.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Moderator
        User::updateOrCreate(
            ['email' => 'moderator@bancat.com'],
            [
                'name' => 'Moderator User',
                'password' => Hash::make('password'),
                'role' => 'moderator',
            ]
        );

        // Editor
        User::updateOrCreate(
            ['email' => 'editor@bancat.com'],
            [
                'name' => 'Editor User',
                'password' => Hash::make('password'),
                'role' => 'editor',
            ]
        );

        // Publisher
        User::updateOrCreate(
            ['email' => 'publisher@bancat.com'],
            [
                'name' => 'Publisher User',
                'password' => Hash::make('password'),
                'role' => 'publisher',
            ]
        );

        // Regular User
        User::updateOrCreate(
            ['email' => 'user@bancat.com'],
            [
                'name' => 'Regular User',
                'password' => Hash::make('password'),
                'role' => 'user',
            ]
        );
    }
}
