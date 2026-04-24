<?php

namespace App\Http\Controllers;

use App\Models\SiteInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingsController extends Controller
{
    private function publicDisk()
    {
        return Storage::build([
            'driver' => 'local',
            'root'   => public_path(),
            'url'    => config('app.url'),
        ]);
    }

    public function index()
    {
        $siteInfo = SiteInfo::first();

        return Inertia::render('back/pages/settings/Index', [
            'siteInfo' => $siteInfo ? [
                'phone_number' => $siteInfo->phone_number,
                'email'        => $siteInfo->email,
                'address'      => $siteInfo->address,
                'slogan'       => $siteInfo->getTranslations('slogan'),
                'mission'      => $siteInfo->getTranslations('mission'),
                'whoWeAre'     => $siteInfo->getTranslations('whoWeAre'),
            ] : null,
            'locales'    => config('app.supported_locales', ['pt', 'en']),
            'faviconUrl' => $this->publicDisk()->url('favicon.ico'),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'phone_number' => ['required', 'string', 'max:50'],
            'email'        => ['required', 'email', 'max:255'],
            'address'      => ['required', 'string', 'max:500'],
            'slogan'       => ['nullable', 'array'],
            'mission'      => ['nullable', 'array'],
            'whoWeAre'     => ['nullable', 'array'],
            'favicon'      => ['nullable', 'image', 'max:2048'],
        ]);

        $siteInfo = SiteInfo::firstOrNew(['id' => 1]);

        $siteInfo->phone_number = $request->phone_number;
        $siteInfo->email        = $request->email;
        $siteInfo->address      = $request->address;

        foreach (['slogan', 'mission', 'whoWeAre'] as $field) {
            if ($request->has($field)) {
                foreach ($request->input($field) as $locale => $value) {
                    $siteInfo->setTranslation($field, $locale, $value);
                }
            }
        }

        if ($request->hasFile('favicon')) {
            $this->publicDisk()->put(
                'favicon.ico',
                file_get_contents($request->file('favicon'))
            );
        }

        $siteInfo->save();

        return back()->with('success', 'Informações do site guardadas.');
    }
}
