<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Testimonial;

use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function index()
    {
        return response()->json(Testimonial::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'role' => 'required|string',
            'quote' => 'required|string',
            'image' => 'nullable|image|max:2048', // 2MB Max
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('testimonials', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $testimonial = Testimonial::create($validated);
        return response()->json($testimonial, 201);
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|string',
            'role' => 'sometimes|string',
            'quote' => 'sometimes|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($testimonial->image && str_starts_with($testimonial->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $testimonial->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('testimonials', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $testimonial->update($validated);
        return response()->json($testimonial);
    }

    public function destroy($id)
    {
        Testimonial::destroy($id);
        return response()->json(null, 204);
    }
}
