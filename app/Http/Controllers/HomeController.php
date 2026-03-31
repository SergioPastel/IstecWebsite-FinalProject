<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\EventNewsResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Event;
use App\Models\News;

class HomeController extends Controller
{

    /**
     * Summary of getLatestActivity
     * @param int $number
     * @return \Illuminate\Database\Eloquent\Collection<int, Event>
     */
    private function getLatestActivity(int $number)
    {
        $events = Event::orderBy('created_at', 'desc')  // latest first
                ->take($number)                         // get top N
            ->get()
            ->map(function ($item) {                    // insert type
                $item->type = 'Event';
                return $item;
            });

        $news = News::orderBy('created_at', 'desc')  // latest first
            ->take($number)                          // get top N
            ->get()
            ->map(function ($item) {                 // insert type
                $item->type = 'News';
                return $item;
            });

        return $events->merge($news)           // merge collections
            ->sortByDesc('created_at')         // sort merged list by date
            ->values()                         // reset keys
            ->take($number);                   // get top N

    }
    /** GET
     * Render the home page
     * @return \Inertia\Response
     */
    public function index()
    {
        $latestActivity = $this->getLatestActivity(3);

        // new homepage, should before pull request change file paths to appropriate place
        // will change from:
        //      'front/pages/Home' -> 'front/pages/home/Home'
        //      for testing purposes, we leave as is to easily switch between either of them

        return Inertia('front/pages/home/Home', [
            'courses' => CourseResource::collection(Course::latest()->take(3)->get()),
            'latestActivity' => EventNewsResource::collection($latestActivity),
        ]);

        // old homepage
        // return Inertia('front/pages/Home', [
        //     'courses' => Course::latest()->take(6)->get(),
        // ]);
    }

    /** GET /about
     * Render About us page
     * @return \Inertia\Response
     */
    public function about()
    {
        return Inertia("front/pages/About");
    }

    /*
    ADMIN
    */

    // GET /dashboard - Our admin dashboard, move this to another controller!
    public function dashboard()
    {
        $user = Auth::user();

        return Inertia("back/pages/Dashboard", ['user' => $user]);
    }
}
