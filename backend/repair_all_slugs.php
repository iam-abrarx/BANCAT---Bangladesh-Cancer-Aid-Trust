<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$stories = \App\Models\Story::all();
foreach ($stories as $story) {
    if ($story->title_en) {
        $oldSlug = $story->slug;
        // Generate clean slug from title
        $newSlug = \Illuminate\Support\Str::slug($story->title_en);
        
        // Ensure uniqueness if needed (simple check for now)
        if (\App\Models\Story::where('slug', $newSlug)->where('id', '!=', $story->id)->exists()) {
            $newSlug .= '-' . \Illuminate\Support\Str::random(4);
        }

        if ($oldSlug !== $newSlug) {
            $story->slug = $newSlug;
            $story->save();
            echo "Fixed slug for [{$story->title_en}]: $oldSlug -> $newSlug\n";
        }
    }
}
echo "Slug repair complete.\n";
