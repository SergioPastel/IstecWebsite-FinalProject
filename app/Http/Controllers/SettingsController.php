<?php

namespace App\Http\Controllers;

use App\Models\BannerImage;
use App\Models\Media;
use App\Models\SiteInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SettingsController extends Controller
{
    const PAGE_BANNER_RELATIONS = [
        'ctesp'             => 'ctespBannerMedia',
        'licenciatura'      => 'licenciaturaBannerMedia',
        'pos_graduacao'     => 'posGraduacaoBannerMedia',
        'eventos_noticias'  => 'eventosNoticiasBannerMedia',
        'erasmus'           => 'erasmusBannerMedia',
        'pedagogia'         => 'pedagogiaBannerMedia',
    ];

    private function publicDisk()
    {
        return Storage::build([
            'driver' => 'local',
            'root'   => public_path(),
            'url'    => config('app.url'),
        ]);
    }

    private function pageBannerData(SiteInfo $siteInfo): array
    {
        $data = [];
        foreach (self::PAGE_BANNER_RELATIONS as $key => $relation) {
            $media = $siteInfo->$relation;
            $data[$key] = [
                'url' => $media ? Media::getUrl('public', $media->file_path) : null,
            ];
        }
        return $data;
    }

    public function index()
    {
        $siteInfo = SiteInfo::with(array_values(self::PAGE_BANNER_RELATIONS))->first();

        $bannerImages = BannerImage::with('media')
            ->orderBy('order')
            ->get()
            ->map(fn($b) => [
                'id'       => $b->id,
                'url'      => Media::getUrl('public', $b->media->file_path),
                'order'    => $b->order,
                'title'    => $b->getTranslations('title'),
                'subtitle' => $b->getTranslations('subtitle'),
            ]);

        return Inertia::render('back/pages/settings/Index', [
            'siteInfo' => $siteInfo ? [
                'phone_number' => $siteInfo->phone_number,
                'email'        => $siteInfo->email,
                'address'      => $siteInfo->address,
                'slogan'       => $siteInfo->getTranslations('slogan'),
                'mission'      => $siteInfo->getTranslations('mission'),
                'whoWeAre'     => $siteInfo->getTranslations('whoWeAre'),
            ] : null,
            'locales'      => config('app.supported_locales', ['pt', 'en']),
            'faviconUrl'   => $this->publicDisk()->url('favicon.ico'),
            'bannerImages' => $bannerImages,
            'pageBanners'  => $siteInfo ? $this->pageBannerData($siteInfo) : [],
        ]);
    }

    public function update(Request $request)
    {
        $pageBannerRules = [];
        foreach (array_keys(self::PAGE_BANNER_RELATIONS) as $key) {
            $pageBannerRules["page_banners.{$key}.image"] = ['nullable', 'image', 'max:4096'];
        }

        $request->validate(array_merge([
            'phone_number'                => ['required', 'string', 'max:50'],
            'email'                       => ['required', 'email', 'max:255'],
            'address'                     => ['required', 'string', 'max:500'],
            'slogan'                      => ['nullable', 'array'],
            'mission'                     => ['nullable', 'array'],
            'whoWeAre'                    => ['nullable', 'array'],
            'favicon'                     => ['nullable', 'image', 'max:2048'],
            'banner_images'               => ['nullable', 'array'],
            'banner_images.*'             => ['image', 'max:4096'],
            'banner_deleted'              => ['nullable', 'array'],
            'banner_deleted.*'            => ['uuid'],
            'banner_order'                => ['nullable', 'array'],
            'banner_order.*'              => ['uuid'],
            'banner_texts'                => ['nullable', 'array'],
            'banner_texts.*.id'           => ['required', 'uuid'],
            'banner_texts.*.title'        => ['nullable', 'array'],
            'banner_texts.*.subtitle'     => ['nullable', 'array'],
            'banner_new_texts'            => ['nullable', 'array'],
            'banner_new_texts.*.title'    => ['nullable', 'array'],
            'banner_new_texts.*.subtitle' => ['nullable', 'array'],
        ], $pageBannerRules));

        try {
            // ── SiteInfo ───────────────────────────────────────────────────
            $siteInfo = SiteInfo::firstOrNew(['id' => 1]);

            $siteInfo->phone_number = $request->phone_number;
            $siteInfo->email        = $request->email;
            $siteInfo->address      = $request->address;

            foreach (['slogan', 'mission', 'whoWeAre'] as $field) {
                if ($request->has($field)) {
                    foreach ($request->input($field) as $locale => $value) {
                        $siteInfo->setTranslation($field, $locale, $value ?? '');
                    }
                }
            }

            if ($request->hasFile('favicon')) {
                $this->publicDisk()->put(
                    'favicon.ico',
                    file_get_contents($request->file('favicon'))
                );
            }

            // ── Page banners ───────────────────────────────────────────────
            foreach (self::PAGE_BANNER_RELATIONS as $key => $relation) {
                if ($request->hasFile("page_banners.{$key}.image")) {
                    $file = $request->file("page_banners.{$key}.image");
                    $path = 'media/' . Str::uuid() . '.' . $file->getClientOriginalExtension();
                    Storage::disk('public')->put($path, file_get_contents($file));

                    // Delete old media using the correct relation name
                    $oldMedia = $siteInfo->$relation;
                    if ($oldMedia) {
                        Storage::disk('public')->delete($oldMedia->file_path);
                        $siteInfo->{$key . '_banner'} = null;
                        $oldMedia->delete();
                    }

                    $media = Media::create(['file_path' => $path, 'alt_text' => null]);
                    $siteInfo->{$key . '_banner'} = $media->id;
                }

            }

            $siteInfo->save();

            // ── Banner: delete removed slides ──────────────────────────────
            foreach ($request->input('banner_deleted', []) as $id) {
                $banner = BannerImage::find($id);
                if ($banner?->media) {
                    $media = $banner->media;
                    $banner->delete();
                    Storage::disk('public')->delete($media->file_path);
                    $media->delete();
                }
            }

            // ── Banner: save titles/subtitles for existing slides ──────────
            foreach ($request->input('banner_texts', []) as $item) {
                $banner = BannerImage::find($item['id']);
                if (!$banner) continue;

                foreach ($item['title'] ?? [] as $locale => $value) {
                    $banner->setTranslation('title', $locale, $value ?? '');
                }
                foreach ($item['subtitle'] ?? [] as $locale => $value) {
                    $banner->setTranslation('subtitle', $locale, $value ?? '');
                }
                $banner->save();
            }

            // ── Banner: upload new slides (with text) ──────────────────────
            $nextOrder = (BannerImage::max('order') ?? -1) + 1;
            $newTexts  = $request->input('banner_new_texts', []);

            foreach ($request->file('banner_images', []) as $index => $file) {
                $path = 'media/' . Str::uuid() . '.' . $file->getClientOriginalExtension();
                Storage::disk('public')->put($path, file_get_contents($file));

                $media = Media::create(['file_path' => $path, 'alt_text' => null]);

                $banner = BannerImage::create([
                    'media_id' => $media->id,
                    'order'    => $nextOrder++,
                ]);

                if (isset($newTexts[$index])) {
                    foreach ($newTexts[$index]['title'] ?? [] as $locale => $value) {
                        $banner->setTranslation('title', $locale, $value ?? '');
                    }
                    foreach ($newTexts[$index]['subtitle'] ?? [] as $locale => $value) {
                        $banner->setTranslation('subtitle', $locale, $value ?? '');
                    }
                    $banner->save();
                }
            }

            // ── Banner: persist reordering ─────────────────────────────────
            foreach ($request->input('banner_order', []) as $position => $id) {
                BannerImage::find($id)?->update(['order' => $position]);
            }

            return redirect()->route('backoffice.settings')
                ->with('success', __('flashes.success.siteInfoSaved'));

        } catch (\Throwable $e) {
            \Log::error('SettingsController@update failed', [
                'message' => $e->getMessage(),
                'file'    => $e->getFile(),
                'line'    => $e->getLine(),
            ]);

            return back()->withErrors(['general' => 'Erro ao guardar: ' . $e->getMessage()]);
        }
    }
}
