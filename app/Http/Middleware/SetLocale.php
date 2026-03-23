<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * As explained in routes/web.php, locale setting must happen before any request.
     * This middleware is thus responsible for this effect. On each request, middleware
     * will fetch locale from session data and insert it into app's locale setting.
     *
     * This way, next($request) will run with appropriate locale setting
     * 'locale' and 'languages' are shared to frontend server through HandleInertiaRequests
     * middleware
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // either use session's locale or config's default value
        $locale = session('locale', config('app.locale'));

        // revalidates sessions locale against config
        if (in_array($locale, config('app.available_locales'))){
            app()->setLocale($locale);
        }

        return $next($request);
    }
}
