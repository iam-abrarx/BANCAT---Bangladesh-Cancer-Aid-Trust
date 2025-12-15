<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;

use Illuminate\Support\Str;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $query = Program::query();

        if (!$request->user() || $request->user()->role !== 'admin') {
            $query->where('is_active', true);
        }

        return $query->orderBy('order', 'asc')->get();
    }

    public function show($slug)
    {
        return Program::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();
    }

    public function showAdmin($id)
    {
        return Program::findOrFail($id);
    }

    // Admin Methods

    public function store(Request $request)
    {
        $data = $request->validate([
            'name_en' => 'required|string',
            'name_bn' => 'nullable|string',
            'tagline_en' => 'nullable|string',
            'tagline_bn' => 'nullable|string',
            'description_en' => 'required|string',
            'description_bn' => 'nullable|string',
            'icon' => 'nullable|string',
            'banner_image' => 'nullable', // Allow string or file
            'impact_metrics' => 'nullable|array',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        $data['slug'] = Str::slug($data['name_en']);
        
        if ($request->hasFile('banner_image')) {
            $path = $request->file('banner_image')->store('programs', 'public');
            $data['banner_image'] = '/storage/' . $path;
        }

        // Handle boolean conversion if coming from FormData (often strings "true"/"false")
        $data['is_active'] = filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN);

        $program = Program::create($data);

        return response()->json($program, 201);
    }

    public function update(Request $request, $id)
    {
        $program = Program::findOrFail($id);

        $data = $request->validate([
            'name_en' => 'sometimes|string',
            'name_bn' => 'nullable|string',
            'tagline_en' => 'nullable|string',
            'tagline_bn' => 'nullable|string',
            'description_en' => 'sometimes|string',
            'description_bn' => 'nullable|string',
            'icon' => 'nullable|string',
            'banner_image' => 'nullable',
            'impact_metrics' => 'nullable|array',
            'is_active' => 'sometimes',
            'order' => 'integer',
        ]);

        if (isset($data['name_en']) && $data['name_en'] !== $program->name_en) {
             $data['slug'] = Str::slug($data['name_en']);
        }

        if ($request->hasFile('banner_image')) {
            $path = $request->file('banner_image')->store('programs', 'public');
            $data['banner_image'] = '/storage/' . $path;
        }

        // Handle boolean conversion for FormData
        if ($request->has('is_active')) {
            $data['is_active'] = filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN);
        }

        $program->update($data);

        return response()->json($program);
    }

    public function destroy($id)
    {
        $program = Program::findOrFail($id);
        $program->delete();

        return response()->json(['message' => 'Program deleted successfully']);
    }
}
