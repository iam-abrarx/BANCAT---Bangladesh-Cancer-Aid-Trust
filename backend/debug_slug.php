<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$story = \App\Models\Story::where('title_en', 'LIKE', '%Volunteering%')->first();
if ($story) {
    echo "Slug: [" . $story->slug . "]\n";
    echo "Published: [" . ($story->is_published ? 'YES' : 'NO') . "]\n";
} else {
    echo "Story not found in DB";
}
