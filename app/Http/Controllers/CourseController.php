<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use Illuminate\Http\Request;
use App\Models\Course;
use Inertia\Inertia;

use function Termwind\render;

class CourseController extends Controller
{
    // GET /courses
    public function index()
    {
        $courses = Course::all();

        return Inertia('front/pages/courses/index', ['courses' => CourseResource::collection($courses)]);
    }
}
