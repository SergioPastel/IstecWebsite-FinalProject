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
use App\Http\Controllers\EventsandnewsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;
use Illuminate\Support\Facades\Mail;
use Laravel\Fortify\Http\Controllers\PasswordResetLinkController;
use Illuminate\Http\Request;


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

Route::middleware('guest')->group(function () {
    Route::get('/login', function () { // No controller for get views, instead just return the inertia pages
        return Inertia('back/pages/auth/Login');
    })->name('login');

    Route::get('/forgot-password', function () {
        return Inertia('back/pages/auth/PasswordRecovery');
    })->name('password.request'); // Returns the password recovery form

Route::get('/reset-password/{token}', function (Request $request, $token) {
    return Inertia('back/pages/auth/ResetPassword', [
        'token' => $token,
        'email' => $request->email,
    ]);
    })->name('password.reset'); // Returns the password reset form, with token and email as props
});

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.recover');

// Guest routes

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
    Route::put('/courses/{course:id}', [CourseController::class, 'update'])->name('courses.update');
    Route::delete('/courses/{course:id}', [CourseController::class, 'destroy'])->name('courses.destroy');

    // Event routes
    Route::get('/events', [EventController::class, 'adminIndex'])->name('backoffice.events');
    Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
    Route::post('/events', [EventController::class, 'store'])->name('events.store');
    Route::get('/events/{event:id}/edit', [EventController::class, 'edit'])->name('events.edit');
    Route::put('/events/{event:id}', [EventController::class, 'update'])->name('events.update');
    Route::delete('/events/{event:id}', [EventController::class, 'destroy'])->name('events.destroy');

    // News routes
    Route::get('/news', [NewsController::class, 'adminIndex'])->name('backoffice.news');
    Route::get('/news/create', [NewsController::class, 'create'])->name('news.create');
    Route::post('/news', [NewsController::class, 'store'])->name('news.store');
    Route::get('/news/{news:id}/edit', [NewsController::class, 'edit'])->name('news.edit');
    Route::put('/news/{news:id}', [NewsController::class, 'update'])->name('news.update');
    Route::delete('/news/{news:id}', [NewsController::class, 'destroy'])->name('news.destroy');

    // Application routes
    Route::get('/applications', [ApplicationController::class, 'adminIndex'])->name('backoffice.applications');

    // User management routes
    Route::get('/users/create', [DashboardController::class, 'createUser'])->name('backoffice.users.create');
    Route::post('/users', [DashboardController::class, 'storeUser'])->name('backoffice.users.store');

    // Contact routes
    Route::get('/contacts', [ContactController::class, 'adminIndex'])->name('backoffice.contacts');

    // Users and settings base pages
    Route::get('/users', [DashboardController::class, 'users'])->name('backoffice.users');
    Route::delete('/users/{user:id}', [DashboardController::class, 'destroyUser'])->name('backoffice.users.destroy');

    Route::get('/settings', function () {
        return Inertia('back/pages/settings/Index', [
            'settingsGroups' => [
                [
                    'id' => 'notifications',
                    'title' => 'Notificacoes',
                    'description' => 'Preferencias base para alertas operacionais e fluxos editoriais.',
                    'items' => [
                        [
                            'label' => 'Alertas de candidaturas',
                            'helpText' => 'Receber aviso sempre que entrar uma nova candidatura.',
                            'value' => 'Ativo',
                            'enabled' => true,
                        ],
                        [
                            'label' => 'Resumo diario',
                            'helpText' => 'Compilar atividade editorial e operacional num unico envio.',
                            'value' => 'Ativo',
                            'enabled' => true,
                        ],
                    ],
                ],
                [
                    'id' => 'experience',
                    'title' => 'Experiencia interna',
                    'description' => 'Parametros iniciais para ajustar a experiencia do backoffice.',
                    'items' => [
                        [
                            'label' => 'Pesquisa global',
                            'helpText' => 'Ativar pesquisa transversal a cursos, noticias e eventos.',
                            'value' => 'Beta',
                            'enabled' => false,
                        ],
                        [
                            'label' => 'Modo de aprovacao',
                            'helpText' => 'Fluxo manual para validacao editorial antes da publicacao.',
                            'value' => 'Manual',
                            'enabled' => true,
                        ],
                    ],
                ],
            ],
        ]);
    })->name('backoffice.settings');
});

// Public routes
Route::get('/courses/ctesp', [CourseController::class, 'ctesp'])->name('courses.ctesp');
Route::get('/courses/licenciatura', [CourseController::class, 'licenciatura'])->name('courses.licenciatura');
Route::get('/courses/pos-graduacao', [CourseController::class, 'posGraduacao'])->name('courses.posGraduacao');
Route::get('/courses/{course:id}', [CourseController::class, 'show'])->name('courses.show');

route::get('/events', [EventController::class, 'index'])->name('events');
route::get('/events/{event:id}', [EventController::class, 'show'])->name('events.show');

route::get('/news', [NewsController::class, 'index'])->name('news');
route::get('/news/{news:id}', [NewsController::class, 'show'])->name('news.show');

// Events and news shared
route::get('/events-and-news', [EventsandnewsController::class, 'index'])->name('eventsandnews');

// Events by type
Route::get('/eventos/proximos', [EventController::class, 'upcoming'])->name('events.upcoming');
Route::get('/eventos/workshops', [EventController::class, 'workshops'])->name('events.workshops');
Route::get('/eventos/open-days', [EventController::class, 'openDays'])->name('events.openDays');

// News by type
Route::get('/noticias/entrevistas', [NewsController::class, 'interviews'])->name('news.interviews');
Route::get('/noticias/comunicados', [NewsController::class, 'statements'])->name('news.statements');

Route::get('/search', [SearchController::class, 'index'])->name('search');

// Application routes, course and event are nullable
Route::get('/applications/applyCourse/{course?}', [ApplicationController::class, 'applyCourse'])->name('applications.courses.apply'); // Has no course id or slug, because the page is shared and thus the user may not have any course or may change mid-form
Route::post('/applications/courses', [ApplicationController::class, 'storeCourse'])->name('applications.courses.store');
Route::get('/applications/applyEvent{event?}', [ApplicationController::class, 'applyEvent'])->name('applications.events.apply');
Route::post('/applications/events', [ApplicationController::class, 'storeEvent'])->name('applications.events.store');

Route::get('/contacts', [ContactController::class, 'create'])->name('contacts');
Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');

//Terms and privacy routes
Route::get('/terms', function () {
    return Inertia('front/pages/termsandprivacy/Terms');
})->name('terms');

Route::get('/privacy', function () {
    return Inertia('front/pages/termsandprivacy/Privacy');
})->name('privacy');



// Erasmus and pedagogy pages
Route::get('/erasmus', function () {return Inertia::render('front/pages/mobilityprogram/Erasmus');})->name('erasmus');

Route::get('/pedagogia-xxi', function () {return Inertia::render('front/pages/pedagogy/Pedagogy');})->name('pedagogia');
