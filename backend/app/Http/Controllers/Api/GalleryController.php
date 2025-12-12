<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class GalleryController extends Controller
{
    // Public Methods
    public function index(Request $request)
    {
        $query = Gallery::query();

        // Admin sees all, public sees published
        if (!$request->user() || $request->user()->role !== 'admin') {
            $query->where('is_published', true);
        }

        $query->orderBy('date', 'desc')->orderBy('created_at', 'desc');

        return response()->json($query->paginate(12));
    }

    public function show($slug)
    {
        $gallery = Gallery::with('images')->where('slug', $slug);

        if (!request()->user() || request()->user()->role !== 'admin') {
            $gallery->where('is_published', true);
        }

        $gallery = $gallery->firstOrFail();
        $gallery->increment('view_count');

        return response()->json($gallery);
    }

    // Admin Methods
    public function store(Request $request)
    {
        Log::info('Gallery store hit', $request->all());

        $data = $request->validate([
            'title_en' => 'required|string',
            'title_bn' => 'nullable|string',
            'description_en' => 'nullable|string',
            'description_bn' => 'nullable|string',
            'featured_image' => 'nullable|image|max:2048', // Allow file upload
            'date' => 'nullable|date',
            'is_published' => 'boolean',
            'images.*' => 'nullable|image|max:2048' // Allow multiple image files
        ]);

        $data['slug'] = Str::slug($data['title_en']) . '-' . Str::random(6);
        
        // Handle Featured Image Upload
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('galleries/featured', 'public');
            $data['featured_image'] = '/storage/' . $path;
        }

        $gallery = Gallery::create($data);

        // Handle Gallery Images Upload
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $file) {
                 $path = $file->store('galleries/images', 'public');
                 $url = '/storage/' . $path;
                 
                 $gallery->images()->create([
                    'image_url' => $url,
                    'order' => $index // Simple ordering order
                ]);
            }
        }

        return response()->json($gallery->load('images'), 201);
    }

    public function update(Request $request, $id)
    {
        $gallery = Gallery::findOrFail($id);

        $data = $request->validate([
            'title_en' => 'sometimes|string',
            'title_bn' => 'nullable|string',
            'description_en' => 'nullable|string',
            'description_bn' => 'nullable|string',
            'featured_image' => 'nullable', // Can be file or string
            'date' => 'nullable|date',
            'is_published' => 'filter:boolean',
        ]);

        if (isset($data['title_en']) && $data['title_en'] !== $gallery->title_en) {
             $data['slug'] = Str::slug($data['title_en']) . '-' . Str::random(6);
        }

        // Handle Featured Image Upload
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('galleries/featured', 'public');
            $data['featured_image'] = '/storage/' . $path;
        }

        // Remove images from data to likely avoid overwriting if handled separately
        if (isset($data['images'])) {
            unset($data['images']);
        }

        $gallery->update($data);

        return response()->json($gallery->load('images'));
    }

    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->delete();
        return response()->json(['message' => 'Gallery deleted successfully']);
    }

    // Image Management
    public function addImages(Request $request, $id)
    {
        $gallery = Gallery::findOrFail($id);
        $request->validate([
            'images' => 'required',
            'images.*' => 'image|max:2048',
        ]);

        $uploadedImages = [];
        if ($request->hasFile('images')) {
            $currentOrder = $gallery->images()->max('order') ?? 0;
            foreach ($request->file('images') as $file) {
                $currentOrder++;
                $path = $file->store('galleries/images', 'public');
                $url = '/storage/' . $path;
                
                $img = $gallery->images()->create([
                    'image_url' => $url,
                    'order' => $currentOrder
                ]);
                $uploadedImages[] = $img;
            }
        }

        return response()->json($gallery->load('images'));
    }

    public function removeImage($id, $imageId)
    {
        $image = GalleryImage::where('gallery_id', $id)->where('id', $imageId)->firstOrFail();
        // Ideally delete file from storage too
        $image->delete();
        return response()->json(['message' => 'Image removed']);
    }
    
    public function reorderImages(Request $request, $id)
    {
        $gallery = Gallery::findOrFail($id);
        $request->validate(['orders' => 'required|array']); // [imageId => order, ...]

        foreach ($request->orders as $imageId => $order) {
            GalleryImage::where('gallery_id', $id)->where('id', $imageId)->update(['order' => $order]);
        }

        return response()->json(['message' => 'Images reordered']);
    }
}
