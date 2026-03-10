<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return view('welcome');
// });

// Inertia routes, which will render our React components instead of Blade views.

Route::get('/', function () {
    return Inertia::render('Home');
});