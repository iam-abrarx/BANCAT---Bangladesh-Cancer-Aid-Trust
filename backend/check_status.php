<?php
$url = 'http://127.0.0.1:8000/api/v1/stories/volunteering-for-a-cause';
$headers = @get_headers($url);
if ($headers) {
    echo "Status: " . $headers[0] . "\n";
} else {
    echo "Failed to fetch headers\n";
}
