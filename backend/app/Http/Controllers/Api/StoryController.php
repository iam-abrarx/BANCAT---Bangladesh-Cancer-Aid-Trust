<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Story;
use Illuminate\Http\Request;

use Illuminate\Support\Str;

class StoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Story::query();
        
        // Admin sees all, public sees published
        if (!$request->user() || $request->user()->role !== 'admin') {
             $query->where('is_published', true);
        }

        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title_en', 'like', "%{$search}%")
                  ->orWhere('title_bn', 'like', "%{$search}%")
                  ->orWhere('subject_name_en', 'like', "%{$search}%")
                  ->orWhere('content_en', 'like', "%{$search}%");
            });
        }

        $sort = $request->get('sort', 'newest');
        if ($sort === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $stories = $query->paginate(9);

        return response()->json($stories);
    }

    public function show($slug)
    {
        // Admins can see unpublished via ID or slug if we implement that, 
        // but typically show is public. For admin edit, we might use ID.
        // Let's keep strict for public show.
        $story = Story::where('slug', $slug)->where('is_published', true)->firstOrFail();
        
        // Simple view increment
        $story->increment('view_count');

        return response()->json($story);
    }

    // Admin Methods

    public function showAdmin($id)
    {
        $story = Story::findOrFail($id);
        return response()->json($story);
    }


    public function store(Request $request)
    {
        // Log request data for debugging
        \Illuminate\Support\Facades\Log::info('Store Story Request:', $request->all());

        $data = $request->validate([
            'title_en' => 'required|string',
            'title_bn' => 'nullable|string',
            'subject_name_en' => 'required|string',
            'subject_name_bn' => 'nullable|string',
            'type' => 'required|in:survivor,caregiver,volunteer,testimonial',
            'excerpt_en' => 'nullable|string',
            'excerpt_bn' => 'nullable|string',
            'content_en' => 'required|string',
            'content_bn' => 'nullable|string',
            'featured_image' => 'nullable', // Allow file or string
            'video_url' => 'nullable|string',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('stories', 'public');
            $data['featured_image'] = '/storage/' . $path;
        } else {
             // If manual URL provided or empty
             if (!isset($data['featured_image']) || $request->has('featured_image') && !$request->featured_image) {
                 $data['featured_image'] = null;
             }
        }

        // Handle boolean conversion
        $data['is_published'] = filter_var($request->input('is_published', true), FILTER_VALIDATE_BOOLEAN);
        $data['is_featured'] = filter_var($request->input('is_featured', false), FILTER_VALIDATE_BOOLEAN);

        if ($data['is_published'] && !isset($data['published_at'])) {
             $data['published_at'] = now();
        }

        $data['slug'] = Str::slug($data['title_en']) . '-' . Str::random(6);
        $data['view_count'] = 0;

        $story = Story::create($data);

        return response()->json($story, 201);
    }

    public function update(Request $request, $id)
    {
        $story = Story::findOrFail($id);

        \Illuminate\Support\Facades\Log::info('Update Story Request:', $request->all());

        $data = $request->validate([
            'title_en' => 'sometimes|string',
            'title_bn' => 'nullable|string',
            'subject_name_en' => 'sometimes|string',
            'subject_name_bn' => 'nullable|string',
            'type' => 'sometimes|in:survivor,caregiver,volunteer,testimonial',
            'excerpt_en' => 'nullable|string',
            'excerpt_bn' => 'nullable|string',
            'content_en' => 'sometimes|string',
            'content_bn' => 'nullable|string',
            'featured_image' => 'nullable',
            'video_url' => 'nullable|string',
            'is_published' => 'sometimes',
            'is_featured' => 'sometimes',
        ]);

        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('stories', 'public');
            $data['featured_image'] = '/storage/' . $path;
        } else {
            // Keep old image if not provided
            if (array_key_exists('featured_image', $data) && $data['featured_image'] === null) {
                 unset($data['featured_image']);
            }
             if (isset($data['featured_image']) && !is_string($data['featured_image'])) {
                unset($data['featured_image']);
            }
        }

        // Handle boolean
        if ($request->has('is_published')) {
            $data['is_published'] = filter_var($request->input('is_published'), FILTER_VALIDATE_BOOLEAN);
        }
        if ($request->has('is_featured')) {
            $data['is_featured'] = filter_var($request->input('is_featured'), FILTER_VALIDATE_BOOLEAN);
        }

        if (isset($data['title_en']) && $data['title_en'] !== $story->title_en) {
             $data['slug'] = Str::slug($data['title_en']) . '-' . Str::random(6);
        }

        if (isset($data['is_published']) && $data['is_published'] && is_null($story->published_at)) {
             $data['published_at'] = now();
        }

        $story->update($data);

        return response()->json($story);
    }

    public function destroy($id)
    {
        $story = Story::findOrFail($id);
        $story->delete();

        return response()->json(['message' => 'Story deleted successfully']);
    }
}
