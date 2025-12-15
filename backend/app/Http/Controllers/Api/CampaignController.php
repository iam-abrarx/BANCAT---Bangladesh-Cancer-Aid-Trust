<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use Illuminate\Http\Request;

use Illuminate\Support\Str;

class CampaignController extends Controller
{
    public function index(Request $request)
    {
        $query = Campaign::query();

        // Admin sees all, public sees active
        if (!$request->user() || $request->user()->role !== 'admin') {
            $query->where('is_active', true);
        }

        if ($request->has('featured')) {
            $query->where('is_featured', true);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    public function show($slug)
    {
         // Logic to allow admin to see by slug even if inactive could be added, 
         // but usually show is public. We'll stick to active for public show.
        return Campaign::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();
    }

    // Admin Methods

    public function store(Request $request)
    {
        $data = $request->validate([
            'name_en' => 'required|string',
            'name_bn' => 'nullable|string',
            'description_en' => 'required|string',
            'description_bn' => 'nullable|string',
            'banner_image' => 'nullable|string',
            'goal_amount' => 'required|numeric',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $data['slug'] = Str::slug($data['name_en']) . '-' . Str::random(6);
        $data['raised_amount'] = 0;
        $data['status'] = 'approved';

        $campaign = Campaign::create($data);

        return response()->json($campaign, 201);
    }

    /**
     * Submit a campaign for review (Public)
     */
    public function submit(Request $request)
    {
        $data = $request->validate([
            'name_en' => 'required|string',
            'name_bn' => 'nullable|string',
            'description_en' => 'required|string',
            'description_bn' => 'nullable|string',
            'banner_image' => 'nullable|string',
            'goal_amount' => 'required|numeric',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'submitter_name' => 'required|string',
            'submitter_email' => 'required|email',
            'submitter_phone' => 'required|string',
        ]);

        $data['slug'] = Str::slug($data['name_en']) . '-' . Str::random(6);
        $data['raised_amount'] = 0;
        $data['is_active'] = false; // Must be approved
        $data['is_featured'] = false;
        $data['status'] = 'pending';

        // fallback for required BN fields and banner_image if not provided
        $data['name_bn'] = $data['name_bn'] ?? $data['name_en'];
        $data['description_bn'] = $data['description_bn'] ?? $data['description_en'];
        $data['banner_image'] = $data['banner_image'] ?? 'https://placehold.co/600x400';
        $data['start_date'] = $data['start_date'] ?? now();

        $campaign = Campaign::create($data);

        return response()->json($campaign, 201);
    }

    public function update(Request $request, $id)
    {
        $campaign = Campaign::findOrFail($id);

        $data = $request->validate([
            'name_en' => 'sometimes|string',
            'name_bn' => 'nullable|string',
            'description_en' => 'sometimes|string',
            'description_bn' => 'nullable|string',
            'banner_image' => 'nullable|string',
            'goal_amount' => 'sometimes|numeric',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        if (isset($data['name_en']) && $data['name_en'] !== $campaign->name_en) {
             $data['slug'] = Str::slug($data['name_en']) . '-' . Str::random(6);
        }

        $campaign->update($data);

        return response()->json($campaign);
    }

    public function destroy($id)
    {
        $campaign = Campaign::findOrFail($id);
        $campaign->delete();

        return response()->json(['message' => 'Campaign deleted successfully']);
    }
}
