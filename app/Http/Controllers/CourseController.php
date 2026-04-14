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
        $courses = Course::latest()->paginate(10)->onEachSide(1);
        return Inertia('front/pages/courses/Index', [ // Will be replaced
            // Wraps the data as a Laravel data resource, applying to all items with collection
            'courses' => CourseResource::collection($courses)
        ]);
    }

    public function ctesp()
    {
        $courses = Course::latest()->paginate(10)->onEachSide(1);
        return Inertia('front/pages/courses/CtespIndex', [ 
            'courses' => CourseResource::collection($courses)
        ]);
    }

    public function licenciatura()
    {
        $courses = Course::latest()->paginate(10)->onEachSide(1);
        return Inertia('front/pages/courses/LicenciaturasIndex', [ 
            'courses' => CourseResource::collection($courses)
        ]);
    }

    // Admin doesn't need show
    public function show(Course $course)
    {
        return Inertia('front/pages/courses/Show', [
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
            'title' => 'required|array', // for translations
            'title.en' => 'required|string|max:255',
            'title.pt' => 'required|string|max:255',

            'description' => 'required|array',
            'description.en' => 'required|string',
            'description.pt' => 'required|string',

            'course_category_id' => 'nullable|uuid|exists:course_categories,id',
            'duration_years' => 'nullable|integer',
        ]);

        // Fix later to use images properly
        /*if ($request->hasFile('image')) {
            $media = Media::create([
                'path' => $request->file('image')->store('courses', 'public')
            ]);

            $validated['media_id'] = $media->id;
        }*/

        Course::create($validated);

        return redirect()->route('backoffice.courses')
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
            'title' => 'required|array',
            'title.en' => 'required|string|max:255',
            'title.pt' => 'required|string|max:255',

            'description' => 'required|array',
            'description.en' => 'required|string',
            'description.pt' => 'required|string',

            'course_category_id' => 'nullable|uuid|exists:course_categories,id',
            'duration_years' => 'nullable|integer',
        ]);

        // Fix later to use images properly
        /*if ($request->hasFile('image')) {
            $media = Media::create([
                'path' => $request->file('image')->store('courses', 'public')
            ]);

            $validated['media_id'] = $media->id;
        }*/

        $course->update($validated);

        return redirect()->route('backoffice.courses')
            ->with('success', 'Curso atualizado com sucesso.');
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('backoffice.courses')
            ->with('success', 'Curso eliminado com sucesso.');
    }
}
