<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

config(['database.default' => 'pgsql']);
config(['database.connections.pgsql.driver' => 'pgsql']);
config(['database.connections.pgsql.host' => '127.0.0.1']);
config(['database.connections.pgsql.port' => '5432']);
config(['database.connections.pgsql.database' => 'bancat']);
config(['database.connections.pgsql.username' => 'bancat']);
config(['database.connections.pgsql.password' => 'password']);
config(['database.connections.pgsql.charset' => 'utf8']);
config(['database.connections.pgsql.prefix' => '']);
config(['database.connections.pgsql.schema' => 'public']);

try {
    $count = \DB::table('users')->count();
    echo "SUCCESS: Users count: " . $count . "\n";
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
