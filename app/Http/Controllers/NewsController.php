<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\News;
use App\Models\NewsCategory;
use App\Http\Resources\NewsResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsController extends Controller
{
    /*
    ┌─────────────────────────────────────────────────────────────────────────┐
    │  FRONT                                                                  │
    └─────────────────────────────────────────────────────────────────────────┘
    */

    public function index()
    {
        return Inertia('front/pages/eventsandnews/News', [
            'news' => NewsResource::collection(News::latest()->get()),
        ]);
    }

    public function show(News $news)
    {
        return Inertia('front/pages/eventsandnews/NewsDetail', [
            'news' => NewsResource::make($news),
        ]);
    }

    /*
    ┌─────────────────────────────────────────────────────────────────────────┐
    │  ADMIN                                                                  │
    └─────────────────────────────────────────────────────────────────────────┘
    */

    public function adminIndex()
    {
        return Inertia('back/pages/news/Index', [
            'news' => News::with('media', 'category')->latest()->get(),
        ]);
    }

    private function categories(): array
    {
        return NewsCategory::get()->map(fn($c) => [
            'id'    => $c->id,
            'title' => $c->getTranslations('title'),
        ])->toArray();
    }

    public function create()
    {
        return Inertia('back/pages/news/Create', [
            'categories' => $this->categories(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'            => ['required', 'array'],
            'title.pt'         => ['required', 'string', 'max:255'],
            'title.en'         => ['required', 'string', 'max:255'],
            'excerpt'          => ['nullable', 'array'],
            'excerpt.pt'       => ['nullable', 'string', 'max:500'],
            'excerpt.en'       => ['nullable', 'string', 'max:500'],
            'content'          => ['required', 'array'],
            'content.pt'       => ['required', 'string'],
            'content.en'       => ['required', 'string'],
            'news_category_id' => ['nullable', 'uuid', 'exists:news_categories,id'],
            'image'            => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ]);

        $mediaId = null;

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file     = $request->file('image');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path     = 'media/' . $filename;
            Storage::disk('public')->put($path, file_get_contents($file));
            $media   = Media::create(['file_path' => $path, 'alt_text' => '']);
            $mediaId = $media->id;
        }

        $news = News::create([
            'media_id'        => $mediaId,
            'news_category_id' => $request->news_category_id ?: null,
            'title'           => ['pt' => '', 'en' => ''],
            'excerpt'         => ['pt' => '', 'en' => ''],
            'content'         => ['pt' => '', 'en' => ''],
        ]);

        foreach (['title', 'excerpt', 'content'] as $field) {
            if ($request->has($field)) {
                foreach ($request->input($field) as $locale => $value) {
                    $news->setTranslation($field, $locale, $value ?? '');
                }
            }
        }

        $news->save();

        return redirect()->route('backoffice.news')
            ->with('success', __('flashes.success.newsCreated'));
    }

    public function edit(News $news)
    {
        return Inertia('back/pages/news/Edit', [
            'news' => [
                'id'               => $news->id,
                'title'            => $news->getTranslations('title'),
                'excerpt'          => $news->getTranslations('excerpt'),
                'content'          => $news->getTranslations('content'),
                'news_category_id' => $news->news_category_id,
                'media'            => $news->media ? ['url' => Media::getUrl('public', $news->media->file_path)] : null,
            ],
            'categories' => $this->categories(),
        ]);
    }

    public function update(Request $request, News $news)
    {
        $request->validate([
            'title'            => ['required', 'array'],
            'title.pt'         => ['required', 'string', 'max:255'],
            'title.en'         => ['required', 'string', 'max:255'],
            'excerpt'          => ['nullable', 'array'],
            'excerpt.pt'       => ['nullable', 'string', 'max:500'],
            'excerpt.en'       => ['nullable', 'string', 'max:500'],
            'content'          => ['required', 'array'],
            'content.pt'       => ['required', 'string'],
            'content.en'       => ['required', 'string'],
            'news_category_id' => ['nullable', 'uuid', 'exists:news_categories,id'],
            'image'            => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ]);

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file     = $request->file('image');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path     = 'media/' . $filename;
            Storage::disk('public')->put($path, file_get_contents($file));

            if ($news->media) {
                Storage::disk('public')->delete($news->media->file_path);
                $oldMedia       = $news->media;
                $news->media_id = null;
                $news->save();
                $oldMedia->delete();
            }

            $media          = Media::create(['file_path' => $path, 'alt_text' => '']);
            $news->media_id = $media->id;
        }

        $news->news_category_id = $request->news_category_id ?: null;

        foreach (['title', 'excerpt', 'content'] as $field) {
            if ($request->has($field)) {
                foreach ($request->input($field) as $locale => $value) {
                    $news->setTranslation($field, $locale, $value ?? '');
                }
            }
        }

        $news->save();

        return redirect()->route('backoffice.news')
            ->with('success', __('flashes.success.newsUpdated'));
    }

    public function destroy(News $news)
    {
        if ($news->media) {
            Storage::disk('public')->delete($news->media->file_path);
            $news->media->delete();
        }

        $news->delete();

        return redirect()->route('backoffice.news')
            ->with('success', __('flashes.success.newsDeleted'));
    }
}
