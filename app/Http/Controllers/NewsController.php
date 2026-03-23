<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use Inertia\Inertia;

class NewsController extends Controller
{
    /*
     FRONT
    */

    public function index()
    {
        return Inertia::render('News/Index', [
            'news' => News::latest()->get()
        ]);
    }

    public function show(News $news)
    {
        return Inertia::render('News/Show', [
            'newsItem' => $news
        ]);
    }

    /*
     ADMIN
    */

    public function adminIndex()
    {
        return Inertia::render('Admin/News/Index', [
            'news' => News::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/News/Create');
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

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('news', 'public');
        }

        News::create($validated);

        return redirect()->route('admin.news.index')
            ->with('success', 'Notícia criada com sucesso.');
    }

    public function edit(News $news)
    {
        return Inertia::render('Admin/News/Edit', [
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

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('news', 'public');
        }

        $news->update($validated);

        return redirect()->route('admin.news.index')
            ->with('success', 'Notícia atualizada com sucesso.');
    }

    public function destroy(News $news)
    {
        $news->delete();

        return redirect()->route('admin.news.index')
            ->with('success', 'Notícia eliminada com sucesso.');
    }
}