<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Resources\NewsResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsController extends Controller
{
    /*
     FRONT
    */

    public function index()
    {
        return Inertia('front/pages/eventsandnews/News', [
            'news' => NewsResource::collection(News::latest()->get())
        ]);
    }

    public function show(News $news)
    {
        return Inertia('front/pages/eventsandnews/NewsDetail', [
            'news' => NewsResource::make($news)
        ]);
    }

    /*
     ADMIN
    */

    public function adminIndex()
    {
        return Inertia('back/pages/news/Index', [
            'news' => News::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia('back/pages/news/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'published_at' => 'nullable|date',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('news', 'public');
        }

        News::create($validated);

        return redirect()->route('backoffice.news')
            ->with('success', __('flashes.success.newsCreated'));
    }

    public function edit(News $news)
    {
        return Inertia('back/pages/news/Edit', [
            'news' => $news
        ]);
    }

    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'published_at' => 'nullable|date',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('news', 'public');
        }

        $news->update($validated);

        return redirect()->route('backoffice.news')
            ->with('success', __('flashes.success.newsUpdated'));
    }

    public function destroy(News $news)
    {
        $news->delete();

        return redirect()->route('backoffice.news')
            ->with('success', __('flashes.success.newsDeleted'));
    }
}