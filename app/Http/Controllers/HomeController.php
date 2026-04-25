<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\EventNewsResource;
use App\Models\BannerImage;
use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Event;
use App\Models\News;
use App\Services\UmamiService;
use Illuminate\Support\Facades\Cache;
use Storage;

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
        $locale = app()->getLocale();

        $bannerImages = BannerImage::with('media')
            ->orderBy('order')
            ->get()
            ->map(fn($b) => [
                'id' => $b->id,
                'url' => Media::getUrl('public', $b->media->file_path),
                'alt' => $b->media->getTranslation('alt_text', $locale, false),
                'title' => $b->getTranslation('title', $locale, false),
                'subtitle' => $b->getTranslation('subtitle', $locale, false),
            ]);




        return Inertia('front/pages/home/Home', [
            'courses' => CourseResource::collection(Course::latest()->take(3)->get()),
            'latestActivity' => EventNewsResource::collection($latestActivity),
            'bannerImages' => $bannerImages,
        ]);

    }

    /** GET /about
     * Render About us page
     * @return \Inertia\Response
     */
    public function about()
    {
        return Inertia("front/pages/about/About");
    }

}
