<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$story = \App\Models\Story::where('title_en', 'LIKE', '%Volunteering%')->first();
if ($story) {
    echo "Old Slug: [" . $story->slug . "]\n";
    $story->slug = 'volunteering-for-a-cause';
    $story->save();
    echo "New Slug: [" . $story->slug . "]\n";
} else {
    echo "Story not found";
}
