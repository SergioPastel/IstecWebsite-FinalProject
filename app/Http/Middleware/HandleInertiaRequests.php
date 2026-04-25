<?php

namespace App\Http\Middleware;

use App\Http\Resources\SiteInfoResource;
use App\Models\SiteInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $siteInfo = null;

        if (Schema::hasTable('site_infos')) {
            $record = SiteInfo::with([
                'ctespBannerMedia',
                'licenciaturaBannerMedia',
                'posGraduacaoBannerMedia',
                'eventosNoticiasBannerMedia',
                'erasmusBannerMedia',
                'pedagogiaBannerMedia',
            ])->first();

            if ($record) {
                $siteInfo = new SiteInfoResource($record);
            }
        }

        return [
            ...parent::share($request),

            // these key:value pairs are shared in pages' props
            'user' => Auth::user(),
            'locale' => app()->getLocale(),
            'languages' => config('app.available_locales'),
            'siteInfo' => $siteInfo,

            // For the toast notifs
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
        ];
    }
}
