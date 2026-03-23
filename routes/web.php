<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;

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
        return Inertia::render('back/pages/auth/Login');
    })->name('login');
});

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/courses', [CourseController::class, 'index'])->name('courses');

// Auth protected routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [HomeController::class, 'dashboard'])->name('dashboard');
});
