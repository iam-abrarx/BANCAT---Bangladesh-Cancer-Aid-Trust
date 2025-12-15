<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    public function index(Request $request)
    {
        $query = TeamMember::query();

        // Admin sees all, public sees active
        if (!$request->user() || $request->user()->role !== 'admin') {
            $query->where('is_active', true);
        }

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        return $query->orderBy('order', 'asc')->get();
    }

    public function show($id)
    {
        return TeamMember::findOrFail($id);
    }

    // Admin Methods

    public function store(Request $request)
    {
        $data = $request->validate([
            'name_en' => 'required|string',
            'name_bn' => 'nullable|string',
            'role_en' => 'required|string',
            'role_bn' => 'nullable|string',
            'category' => 'required|in:leadership,medical_advisor,coordinator,trustee,ambassador',
            'photo' => 'nullable', 
            'bio_en' => 'nullable|string',
            'bio_bn' => 'nullable|string',
            'email' => 'nullable|email',
            'linkedin' => 'nullable|string',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        // Explicitly handle photo to ensure it is a string path, not a File object/array
        $photoPath = '/images/default-avatar.png'; // Default

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('team-members', 'public');
            $photoPath = '/storage/' . $path;
        }
        
        $data['photo'] = $photoPath;

        $teamMember = TeamMember::create($data);

        return response()->json($teamMember, 201);
    }

    public function update(Request $request, $id)
    {
        $teamMember = TeamMember::findOrFail($id);

        $data = $request->validate([
            'name_en' => 'sometimes|string',
            'name_bn' => 'nullable|string',
            'role_en' => 'sometimes|string',
            'role_bn' => 'nullable|string',
            'category' => 'sometimes|in:leadership,medical_advisor,coordinator,trustee,ambassador',
            'photo' => 'nullable', // Allow file or string
            'bio_en' => 'nullable|string',
            'bio_bn' => 'nullable|string',
            'email' => 'nullable|email',
            'linkedin' => 'nullable|string',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('photo')) {
            // Delete old photo if it exists and is local
            if ($teamMember->photo && str_starts_with($teamMember->photo, '/storage/')) {
                 // Storage::disk('public')->delete(str_replace('/storage/', '', $teamMember->photo));
                 // (Skipping deletion logic for safety for now, or add import Storage)
            }
            $path = $request->file('photo')->store('team-members', 'public');
            $data['photo'] = '/storage/' . $path;
        }

        $teamMember->update($data);

        return response()->json($teamMember);
    }

    public function destroy($id)
    {
        $teamMember = TeamMember::findOrFail($id);
        $teamMember->delete();

        return response()->json(['message' => 'Team member deleted successfully']);
    }
}
