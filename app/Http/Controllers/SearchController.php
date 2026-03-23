<?php

namespace App\Http\Controllers;

use App\Models\Search;
use App\Http\Requests\StoreSearchRequest;
use App\Http\Requests\UpdateSearchRequest;
use Inertia\Inertia;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->get('q', '');

        return Inertia::render('Search/Index', [
            'query' => $query,
            'results' => [
                 'courses' => $query ? Course::where('title', 'like', "%{$query}%")->get() : [],
                'events' => $query ? Event::where('title', 'like', "%{$query}%")->get() : [],
                'news' => $query ? News::where('title', 'like', "%{$query}%")->get() : [],
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSearchRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Search $search)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Search $search)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSearchRequest $request, Search $search)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Search $search)
    {
        //
    }
}
