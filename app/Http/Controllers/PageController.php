<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function show(Page $page)
    {
        $page->load('sections');
        return Inertia('front/pages/dynamic/Template', ['page' => $page]);
    }

    // Fetch pages for admin view
    public function index()
    {
        $pages = Page::withCount('sections')->get();
        return Inertia('front/pages/dynamic/Index', ['pages' => $pages]);
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
