<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Allow all staff roles to view users
        if (!in_array(auth()->user()->role, ['super_admin', 'admin', 'moderator', 'editor', 'publisher'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return response()->json(User::all());
    }

    public function store(Request $request)
    {
        // Only Super Admin and Admin can create users
        if (!in_array(auth()->user()->role, ['super_admin', 'admin'])) {
            return response()->json(['message' => 'Unauthorized. Only Admins can create users.'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string',
        ]);

        // Prevent creating a Super Admin if not Super Admin
        if ($request->role === 'super_admin' && auth()->user()->role !== 'super_admin') {
            return response()->json(['message' => 'Unauthorized. You cannot create a Super Admin.'], 403);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => \Illuminate\Support\Facades\Hash::make($request->password),
            'role' => $request->role,
        ]);

        return response()->json($user, 201);
    }

    public function updateRole(Request $request, $id)
    {
        // Only Super Admin and Admin can update roles
        if (!in_array(auth()->user()->role, ['super_admin', 'admin'])) {
            return response()->json(['message' => 'Unauthorized. Only Admins can update roles.'], 403);
        }

        $request->validate([
            'role' => 'required|string',
        ]);

        $user = User::findOrFail($id);
        $currentUser = auth()->user();

        // Prevent modifying a Super Admin unless you are one
        if ($user->role === 'super_admin' && $currentUser->role !== 'super_admin') {
            return response()->json(['message' => 'Unauthorized. You cannot modify a Super Admin.'], 403);
        }

        // Prevent assigning Super Admin role unless you are one
        if ($request->role === 'super_admin' && $currentUser->role !== 'super_admin') {
            return response()->json(['message' => 'Unauthorized. You cannot assign the Super Admin role.'], 403);
        }

        $user->update(['role' => $request->role]);

        return response()->json([
            'message' => 'User role updated successfully',
            'user' => $user
        ]);
    }
}
