<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$pages = \App\Models\Page::all(['id', 'title_en', 'slug']);
echo json_encode($pages, JSON_PRETTY_PRINT);
