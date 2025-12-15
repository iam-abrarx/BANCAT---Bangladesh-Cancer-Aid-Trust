<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends Controller
{
    // Public: Get page by slug
    public function show($slug)
    {
        $page = Page::where('slug', $slug)->firstOrFail();

        // If not admin/authed, check if published
        // For simplicity, public endpoint only returns published
        // But if I use this for Admin Edit, I need all. 
        // Admin usually uses a specific ID-based get or I can add a check.
        
        // Actually, typical pattern:
        // Public API: GET /api/v1/pages/{slug} -> returns published only.
        // Admin API: GET /api/v1/admin/pages/{id} -> returns any.

        if (!$page->is_published && !auth('sanctum')->check()) { // Basic check, better to check role
             return response()->json(['message' => 'Page not found'], 404);
        }

        return $page;
    }

    // Admin: List all
    public function index()
    {
        return Page::orderBy('title_en')->get();
    }

    // Admin: Create
    public function store(Request $request)
    {
        $data = $request->validate([
            'title_en' => 'required|string',
            'title_bn' => 'required|string',
            'content_en' => 'required|string',
            'content_bn' => 'required|string',
            'slug' => 'nullable|string|unique:pages,slug',
            'is_published' => 'boolean',
            'meta_title_en' => 'nullable|string',
            'meta_title_bn' => 'nullable|string',
            'meta_description_en' => 'nullable|string',
            'meta_description_bn' => 'nullable|string',
        ]);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title_en']);
             // ensure uniqueness
            $count = Page::where('slug', $data['slug'])->count();
            if ($count > 0) {
                 $data['slug'] .= '-' . Str::random(4);
            }
        }

        $page = Page::create($data);

        return response()->json($page, 201);
    }

    // Admin: Update
    public function update(Request $request, $id)
    {
        $page = Page::findOrFail($id);

        $data = $request->validate([
            'title_en' => 'sometimes|string',
            'title_bn' => 'sometimes|string',
            'content_en' => 'sometimes|string',
            'content_bn' => 'sometimes|string',
            'slug' => 'nullable|string|unique:pages,slug,' . $id,
            'is_published' => 'boolean',
            'meta_title_en' => 'nullable|string',
            'meta_title_bn' => 'nullable|string',
            'meta_description_en' => 'nullable|string',
            'meta_description_bn' => 'nullable|string',
        ]);

        if (isset($data['slug']) && empty($data['slug'])) {
             $data['slug'] = Str::slug($data['title_en'] ?? $page->title_en);
        }

        $page->update($data);

        return response()->json($page);
    }

    // Admin: Delete
    public function destroy($id)
    {
        $page = Page::findOrFail($id);
        $page->delete();

        return response()->json(['message' => 'Page deleted successfully']);
    }

    // Admin: Get by ID (for editing) - separating from public slug show
    public function showAdmin($id)
    {
        return Page::findOrFail($id);
    }
}
