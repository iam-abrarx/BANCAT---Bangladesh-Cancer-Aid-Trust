<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$story = \App\Models\Story::where('title_en', 'LIKE', '%Volunteering%')->first();
if ($story) {
    echo json_encode($story->toArray(), JSON_PRETTY_PRINT);
} else {
    echo "Story not found in DB";
}
