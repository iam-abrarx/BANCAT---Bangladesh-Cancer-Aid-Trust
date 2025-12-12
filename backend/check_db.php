<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

config(['database.default' => 'mysql']);
config(['database.connections.mysql.database' => 'bancat']);
config(['database.connections.mysql.username' => 'root']);
config(['database.connections.mysql.password' => '']);
config(['database.connections.mysql.host' => '127.0.0.1']);

try {
    $count = \DB::table('users')->count();
    echo "SUCCESS: Users count: " . $count . "\n";
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
