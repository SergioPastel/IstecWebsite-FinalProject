<?php

namespace App\Http\Controllers;

use App\Models\Dashboard;
use App\Models\Course;
use App\Models\Event;
use App\Models\News;
use App\Models\Application;
use App\Models\Contact;
use App\Http\Requests\StoreDashboardRequest;
use App\Http\Requests\UpdateDashboardRequest;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia('back/pages/Dashboard', [
            'stats' =>[
                'courses' => Course::count(),
                'events' => Event::count(),
                'news' => News::count(),
                'applications' => Application::count(),
                'contacts' => Contact::count(),
            ]
        ]);
    }

}
