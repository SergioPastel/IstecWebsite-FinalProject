<?php

namespace App\Http\Controllers;

use App\Models\Search;
use App\Models\Course;
use App\Models\Event;
use App\Models\News;
use App\Http\Requests\StoreSearchRequest;
use App\Http\Requests\UpdateSearchRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->get('q', '');

        return Inertia('Search/Index', [
            'query' => $query,
            'results' => [
                 'courses' => $query ? Course::where('title', 'like', "%{$query}%")->get() : [],
                'events' => $query ? Event::where('title', 'like', "%{$query}%")->get() : [],
                'news' => $query ? News::where('title', 'like', "%{$query}%")->get() : [],
            ]
        ]);
    }
}
