<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use Illuminate\Http\Request;
use App\Models\Course;
use Inertia\Inertia;

use function Termwind\render;

class CourseController extends Controller
{
    /*
    FRONT
    */

    public function index()
    {
        return Inertia('front/pages/courses/index', [
            'courses' => CourseResource::collection(Course::latest()->get())
        ]);
    }

    public function show(Course $course)
    {
        return Inertia::render('Courses/Show', [
            'course' => $course
        ]);
    }

    /*
    ADMIN
    */

    public function adminIndex()
    {
        return Inertia::render('Admin/Courses/Index', [
            'courses' => Course::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Courses/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'nullable|string|max:100',
            'category' => 'nullable|string|max:100',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('courses', 'public');
        }

        Course::create($validated);

        return redirect()->route('admin.courses.index')
            ->with('success', 'Curso criado com sucesso.');
    }

    public function edit(Course $course)
    {
        return Inertia::render('Admin/Courses/Edit', [
            'course' => $course
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'nullable|string|max:100',
            'category' => 'nullable|string|max:100',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('courses', 'public');
        }

        $course->update($validated);

        return redirect()->route('admin.courses.index')
            ->with('success', 'Curso atualizado com sucesso.');
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('admin.courses.index')
            ->with('success', 'Curso eliminado com sucesso.');
    }
}
