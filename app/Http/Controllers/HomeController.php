<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    // GET / - This method will render the home page of our application.
    public function index()
    {
        return Inertia("front/pages/Home");
    }

    // GET /dashboard - Our admin dashboard, move this to another controller!
    public function dashboard()
    {
        $user = Auth::user();

        return Inertia("back/pages/Dashboard", ['user' => $user]);
    }
}
