<?php
$port = 8080;

$http = new swoole_http_server("0.0.0.0", $port);

$http->on('request', function ($request, $response) {
    $response->end("<h1>This Service PHP</h1>");
});

echo "start listening on port {$port}\n";
$http->start();