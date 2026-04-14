<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResource;
use App\Http\Resources\NewsResource;
use App\Models\Event;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;


class EventsandnewsController extends Controller
{
    public function index()
    {
        // dd(EventResource::collection(Event::latest()->get()));
        return Inertia('front/pages/eventsandnews/EventsandNews', [
            'events' => EventResource::collection(Event::latest()->get()), 
            'news'   => NewsResource::collection(News::latest()->get())
        ]);
    }

}
