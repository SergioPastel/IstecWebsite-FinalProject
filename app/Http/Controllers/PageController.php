<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    // Fetch pages for admin view
    public function index(string $slug)
    {
        $page = Page::all();
        return Inertia('');
    }

    // Fetch page for admin or front-end
    public function show(string $slug)
    {
        $page = Page::where('slug', $slug)->firstOrFail();
        return Inertia('');
    }

    // Save or update a page from admin
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages,slug',
            'content' => 'required|json',
        ]);

        $page = Page::create($request->only('title', 'slug', 'content'));

        return Inertia('');
    }

    public function update(Request $request, Page $page)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages,slug',
            'content' => 'required|json',
        ]);

        $page->update($request->only(['title', 'slug', 'content']));

        return Inertia('');
    }

    public function destroy(Page $page)
    {
        $page->delete();
        return Inertia('');
    }
}
