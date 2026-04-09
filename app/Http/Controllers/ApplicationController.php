<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Course;
use App\Models\Event;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    /*
    FRONT
    */

    public function applyCourse(Course $course)
    {
        return Inertia('front/pages/applications/ApplicationsCourses', [
            'course' => $course
        ]);
    }

    public function applyEvent(Event $event)
    {
        return Inertia('front/pages/applications/ApplicationsEvents', [
            'event' => $event
        ]);
    }

    public function storeCourse(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:30',
            'birth_date' => 'nullable|date',
            'academic_level' => 'nullable|string|max:255',
            'motivation' => 'nullable|string',
            'cv_file' => 'nullable|file|mimes:pdf,doc,docx|max:4096',
        ]);

        if ($request->hasFile('cv_file')) {
            $validated['cv_file'] = $request->file('cv_file')->store('applications/cvs', 'public');
        }

        Application::create($validated);

        $course = Course::findOrFail($validated['course_id']);

        return redirect()->route('courses.show', $course->slug) // Probably not correct
            ->with('success', 'Candidatura submetida com sucesso.');
    }

    public function storeEvent(Request $request)
    {
        $validated = $request->validate([
            'event_id' => 'required|exists:events,id',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:30'
        ]);

        Application::create($validated); // different application type ?

        $event = Event::findOrFail($validated['event_id']);

        return redirect()->route('events.show', $event->slug) // Probably not correct
            ->with('success', 'Candidatura submetida com sucesso.');
    }

    /*
    ADMIN
    */

    public function adminIndex()
    {
        return Inertia('back/pages/applications/Index', [
            'applications' => Application::with('course')->latest()->get()
        ]);
    }

    public function adminShow(Application $application)
    {
        $application->load('course');

        return Inertia('back/pages/applications/Show', [
            'application' => $application
        ]);
    }

    public function updateStatus(Request $request, Application $application)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,approved,rejected'
        ]);

        $application->update([
            'status' => $validated['status']
        ]);

        return redirect()->route('admin.applications.index')
            ->with('success', 'Estado da candidatura atualizado.');
    }

    public function destroy(Application $application)
    {
        $application->delete();

        return redirect()->route('admin.applications.index')
            ->with('success', 'Candidatura eliminada com sucesso.');
    }
}