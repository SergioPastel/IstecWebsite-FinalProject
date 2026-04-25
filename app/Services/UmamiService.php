<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class UmamiService
{
    private $baseUrl;
    private $apiKey;
    private $websiteId;


    public function __construct()
    {
        $this->baseUrl = config('services.umami.url');
        $this->apiKey = config('services.umami.key');
        $this->websiteId = config('services.umami.website_id');
    }

    // The API get request
    private function request($endpoint, $params = [])
    {
        $response = Http::withToken($this->apiKey)
            ->withQueryParameters($params)
            ->get("{$this->baseUrl}{$endpoint}");

        return $response->json();
    }

    // Functions for the type of content we want to receive. Metrics returns grouped counts instead of the much longer raw logs

    // Get general stats like number of visits
    public function getStats()
    {
        return $this->request("/v1/websites/$this->websiteId/stats", $this->range());
    }

    // Get our custom events like specific button clicks
    public function getEventMetrics()
    {
        return $this->request("/v1/websites/$this->websiteId/metrics", [
            'type' => 'event',
            ...$this->range()
        ]);
    }

    // Our date range that is used everywhere
    private function range()
    {
        return [
            // Track for 1 month
            'startAt' => now()->subDays(30)->timestamp * 1000,
            'endAt'   => now()->timestamp * 1000,
        ];
    }
}
