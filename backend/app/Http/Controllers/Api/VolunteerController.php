<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Volunteer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\VolunteerWelcome;

class VolunteerController extends Controller
{
    /**
     * Submit a volunteer application (Public).
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'bio' => 'nullable|string',
            'skills' => 'nullable|array',
            'availability' => 'nullable|string',
        ]);

        $data['status'] = 'pending';
        // Admin notes are null by default

        $volunteer = Volunteer::create($data);

        try {
            Mail::to($volunteer->email)->send(new VolunteerWelcome($volunteer));
        } catch (\Exception $e) {
            // Log but don't fail the request
            \Log::error('Failed to send volunteer welcome email: ' . $e->getMessage());
        }

        return response()->json($volunteer, 201);
    }

    /**
     * List all applications (Admin).
     */
    public function index(Request $request)
    {
        $query = Volunteer::query()->orderBy('created_at', 'desc');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $volunteers = $query->paginate(15);

        return response()->json($volunteers);
    }

    /**
     * Show details (Admin).
     */
    public function show($id)
    {
        $volunteer = Volunteer::findOrFail($id);
        return response()->json($volunteer);
    }

    /**
     * Update status or notes (Admin).
     */
    public function update(Request $request, $id)
    {
        $volunteer = Volunteer::findOrFail($id);

        $data = $request->validate([
            'status' => 'sometimes|in:pending,approved,rejected',
            'admin_notes' => 'nullable|string',
        ]);

        $volunteer->update($data);

        return response()->json($volunteer);
    }

    /**
     * Delete application (Admin).
     */
    public function destroy($id)
    {
        $volunteer = Volunteer::findOrFail($id);
        $volunteer->delete();

        return response()->json(['message' => 'Application deleted successfully']);
    }
}
