<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$stories = \App\Models\Story::all(['id', 'title_en', 'slug', 'is_published']);
echo json_encode($stories, JSON_PRETTY_PRINT);
