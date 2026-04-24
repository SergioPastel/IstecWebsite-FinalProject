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
use App\Actions\Fortify\CreateNewUser;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Services\UmamiService;
use Illuminate\Support\Facades\Cache;

// Controller used for dashboard information

class DashboardController extends Controller
{
    // GET /dashboard - Our admin dashboard
    public function index(UmamiService $umami)
    {
        // The analytics information is cached and refreshed so it doesn't do too many requests to the API
        // Our general stats
        $stats = Cache::remember('umami_stats', 300, function () use ($umami) {
            return $umami->getStats();
        });

        // Custom events
        $eventMetrics = Cache::remember('umami_events', 300, function () use ($umami) {
            return $umami->getEventMetrics();
        });

        // If we want to keep count of a specific event, query it like this (saves the trouble of having to check on the parameter)
        $courseCheckCount = collect($eventMetrics)
            ->firstWhere('x', 'course_check_click')['y'] ?? 0;


        return Inertia('back/pages/Dashboard', [
            'analytics' => [ // Analytics will have all our frontend statistics
                // data_get is a "nicer" way to get specific data from an array
                'visitors' => data_get($stats, 'visitors'),
                'pageviews' => data_get($stats, 'pageviews'),
                // The information is already stored, so you don't need to check the array
                'course_check' => $courseCheckCount
            ]
        ]);
    }

    public function createUser()
    {
        return Inertia::render('back/pages/users/Create');
    }

    public function storeUser(Request $request, CreateNewUser $creator)
    {
        $creator->create($request->all());

        return redirect()->route('backoffice.users')
            ->with('success', 'Utilizador criado com sucesso.');
    }


    // GET /users - List of admin users
    public function users()
    {
        $users = User::withTrashed()->get(); // Get all users, including soft-deleted ones

        return Inertia('back/pages/users/Index', [
            'users' => $users
        ]);
    }

    // DELETE /users/{user} - Delete a user
    public function destroyUser(User $user)
    {
        // Prevents self deletion
        if ($user->id === Auth::id()) {
            return back()->with('error', 'Administradores não eliminar a si mesmos.');
        }

        $user->delete();

        return back()->with('success', 'Gestor eliminado com sucesso.');
    }

}
