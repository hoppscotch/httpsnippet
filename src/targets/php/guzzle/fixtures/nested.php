<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'http://mockbin.com/har?foo[bar]=baz,zap&fiz=buz&key=value');

echo $response->getBody();