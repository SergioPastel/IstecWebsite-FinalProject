<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta charset="utf-8">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/png">

    <!-- FOR UMAMI ANALYTICS. It tracks the website's visits -->
    <script
        async
        defer
        src="http://cloud.umami.is/script.js"
        data-website-id={{ config('services.umami.website_id') }}>
    </script>

    @routes
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>

<body>
    @inertia
</body>

</html>
