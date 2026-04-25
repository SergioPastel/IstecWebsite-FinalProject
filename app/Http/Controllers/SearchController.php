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
        $query = trim($request->input('q', ''));

        $courses = [];
        $events = [];
        $news = [];

        if ($query !== '') {
            $courses = Course::where(function ($q) use ($query) {
                $q->where('title->pt', 'like', "%{$query}%")
                  ->orWhere('title->en', 'like', "%{$query}%");
            })
            ->limit(6)
            ->get()
            ->map(function ($course) {
                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'description' => $course->description,
                ];
            });

            $events = Event::where(function ($q) use ($query) {
                $q->where('title->pt', 'like', "%{$query}%")
                  ->orWhere('title->en', 'like', "%{$query}%");
            })
            ->limit(6)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'description' => $event->description,
                ];
            });

            $news = News::where(function ($q) use ($query) {
                $q->where('title->pt', 'like', "%{$query}%")
                  ->orWhere('title->en', 'like', "%{$query}%");
            })
            ->limit(6)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'description' => $item->excerpt,
                ];
            });
        }

        return Inertia('front/pages/search/index', [
            'query' => $query,
            'results' => [
                'courses' => $courses,
                'events' => $events,
                'news' => $news,
            ],
        ]);
    }
}
