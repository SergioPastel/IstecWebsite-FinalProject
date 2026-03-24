<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use Illuminate\Http\Request;
use App\Models\Course;
use Inertia\Inertia;
use Str;

use function Termwind\render;

class CourseController extends Controller
{
    /*
    FRONT
    */

    public function index()
    {
        return Inertia('front/pages/courses/Index', [
            // Wraps the data as a Laravel data resource, applying to all items with collection
            'courses' => CourseResource::collection(Course::latest()->get())
        ]);
    }

    // Admin doesn't need show
    public function show(Course $course)
    {
        return Inertia::render('front/pages/courses/Show', [
            'course' => new CourseResource($course)
        ]);
    }

    /*
    ADMIN
    */

    public function adminIndex()
    {
        return Inertia('back/pages/courses/Index', [
            'courses' => CourseResource::collection(Course::latest()->get())
        ]);
    }

    public function create()
    {
        return Inertia('back/pages/courses/Create');
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
        return Inertia('back/pages/courses/Edit', [
            'course' => new CourseResource($course)
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

        return redirect()->route('adminCourses')
            ->with('success', 'Curso eliminado com sucesso.');
    }
}
