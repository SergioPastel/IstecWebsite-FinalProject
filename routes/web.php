<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

// Route::get('/', function () {
//     return view('welcome');
// });


/**
 * Locale setting route
 *
 * Session data is client-side state stored in the server.
 * Client-side will hold an id to said session data, thus
 * being able to retrieve it.
 *
 * This route is responsible for saving the current user's
 * locale state in the server.
 *
 * This happens because the server is stateless, it will
 * not hold on to memory whatever state the client has. Each
 * time a request is processed, the server 'forgets' about
 * locale, and resets to default value defined in config/app.php
 *
 * In order for the server to 'remember' locale state for
 * particular user, it fetches from session data and sets it
 * through app->setLocale() function
 *
 * This route will thus finaly set locale to request's value,
 * feeding content based on the setting.
 *
 * The persistence process is not yet over, as middleware is
 * required to maintain locale setting throughout further
 * requests.
 */
Route::post('/locale', function (Request $request) {
    /**
     * validates request's locale, looking for a match in config
     * defined array 'available_locales'
     */
    $validated = $request->validate([
        'locale' => 'required|string|in:' . implode(',', config('app.available_locales')),
    ]);

    session(['locale' => $validated['locale']]); // localy stores session's locale
    app()->setLocale($validated['locale']); // sets locale for redirect

    return back();
});

// Inertia routes, which will render our React components instead of Blade views.

// Fortify GET authentication routes (POST routes are defined fortify)

// Guest routes
Route::middleware('guest')->group(function () {
    Route::get('/login', function () { // No controller for get views, instead just return the inertia pages
        return Inertia('back/pages/auth/Login');
    })->name('login');
});

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about', [HomeController::class, 'about'])->name('about');

// Auth protected routes. Prefix allow for route separation
Route::middleware(['auth'])->prefix('backoffice')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Course Routes
    Route::get('/courses', [CourseController::class, 'adminIndex'])->name('backoffice.courses');
    Route::get('/courses/create', [CourseController::class, 'create'])->name('courses.create');
    Route::post('/courses', [CourseController::class, 'store'])->name('courses.store');
    Route::get('/courses/{course:id}/edit', [CourseController::class, 'edit'])->name('courses.edit');
    Route::patch('/courses/{course:id}', [CourseController::class, 'update'])->name('courses.update');
    Route::delete('/courses/{course:id}', [CourseController::class, 'destroy'])->name('courses.destroy');

    // Event routes
    Route::get('/events', [EventController::class, 'adminIndex'])->name('backoffice.events');
    Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
    Route::post('/events', [EventController::class, 'store'])->name('events.store');
    Route::get('/events/{event:id}/edit', [EventController::class, 'edit'])->name('events.edit');
    Route::patch('/events/{event:id}', [EventController::class, 'update'])->name('events.update');
    Route::delete('/events/{event:id}', [EventController::class, 'destroy'])->name('events.destroy');

    // News routes
    Route::get('/news', [NewsController::class, 'adminIndex'])->name('backoffice.news');
    Route::get('/news/create', [NewsController::class, 'create'])->name('news.create');
    Route::post('/news', [NewsController::class, 'store'])->name('news.store');
    Route::get('/news/{news:id}/edit', [NewsController::class, 'edit'])->name('news.edit');
    Route::patch('/news/{news:id}', [NewsController::class, 'update'])->name('news.update');
    Route::delete('/news/{news:id}', [NewsController::class, 'destroy'])->name('news.destroy');
});

// Public routes
Route::get('/courses', [CourseController::class, 'index'])->name('courses');
Route::get('/courses/{course:id}', [CourseController::class, 'show'])->name('courses.show');

route::get('/events', [EventController::class, 'index'])->name('events');
route::get('/events/{event:id}', [EventController::class, 'show'])->name('events.show');

route::get('/news', [NewsController::class, 'index'])->name('news');
route::get('/news/{news:id}', [NewsController::class, 'show'])->name('news.show');

Route::get('/search', [SearchController::class, 'index'])->name('search');

Route::get('/applications/create/{course:slug}', [ApplicationController::class, 'create'])->name('applications.create');
Route::post('/applications', [ApplicationController::class, 'store'])->name('applications.store');

Route::get('/contacts', [ContactController::class, 'create'])->name('contacts.create');
Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');


// MAIL TESTER

/* Route::get('/test-mail', function () {
    Mail::raw('Test email', function ($msg) {
        $msg->to('sergioclsantanna@gmail.com')->subject('Test');
    });

    return 'Sent';
}); */

// DYNAMIC TESTING
Route::get('/test-dynamic', [PageController::class, 'index'])->name('dynamic.index');
Route::get('/test-dynamic/{page:slug}', [PageController::class, 'show'])->name('dynamic.show');
