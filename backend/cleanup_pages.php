<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$keepers = ['privacy-policy', 'terms-of-use', 'refund-policy'];

// 1. Delete unwanted pages
$deleted = \App\Models\Page::whereNotIn('slug', $keepers)->delete();
echo "Deleted $deleted pages.\n";

// 2. Ensure keepers exist
foreach ($keepers as $slug) {
    if (!\App\Models\Page::where('slug', $slug)->exists()) {
        $title = ucwords(str_replace('-', ' ', $slug));
        \App\Models\Page::create([
            'title_en' => $title,
            'title_bn' => $title, // Placeholder
            'slug' => $slug,
            'content_en' => "<h2>$title</h2><p>Content for $title goes here.</p>",
            'content_bn' => "<h2>$title</h2><p>Content for $title goes here (Bangla).</p>",
            'is_published' => true
        ]);
        echo "Created page: $slug\n";
    } else {
        echo "Page exists: $slug\n";
    }
}

// 3. List final pages
$pages = \App\Models\Page::all();
foreach ($pages as $page) {
    echo "FINAL: ID: " . $page->id . " | Slug: " . $page->slug . "\n";
}
