<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$pages = \App\Models\Page::all();
foreach ($pages as $page) {
    echo "ID: " . $page->id . " | Slug: " . $page->slug . " | Title: " . $page->title_en . "\n";
}
