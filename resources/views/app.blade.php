<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta charset="utf-8">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/png">

    <!-- FOR UMAMI ANALYTICS -->
    <script
        async 
        defer 
        src="http://cloud.umami.is/script.js" 
        data-website-id="149e98ea-974b-409e-b7a4-3fb43def4bbe">
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
