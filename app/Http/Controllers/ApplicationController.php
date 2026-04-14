<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Course;
use App\Models\CourseCategory;
use App\Models\Event;
use App\Http\Resources\CourseCategoryResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\EventResource;
use App\Http\Requests\StoreApplicationRequest;
use Illuminate\Support\Facades\Mail;
use App\Mail\ApplicationReceived;
use App\Mail\ApplicationAutoReply;
use Illuminate\Http\Request;


class ApplicationController extends Controller
{
    /*
    FRONT
    */

    public function applyCourse(?Course $course = null) // Null by default so the same action can be shared regardless if the user has a pre-selected course
    {
        $courseCategories = CourseCategoryResource::collection(
            CourseCategory::with('courses')->get()
        )->resolve();

        return Inertia('front/pages/applications/ApplicationsCourse', [
            'course' => $course,
            'courseCategories' => $courseCategories,
        ]);
    }

    public function applyEvent(Event $event) // possibly nullable? Check later
    {
        $events = EventResource::collection(Event::all())->resolve();

        return Inertia('front/pages/applications/ApplicationsEvents', [
            'event' => $event,
            'events' => $events,
        ]);
    }

    public function storeCourse(Request $request)
    {
        $validated = $request->validated();

        $application = Application::create($validated);

        // Send notification to staff
        if ($request->hasFile('cv_file')) {
            $file = $request->file('cv_file');
            $content = file_get_contents($file->getRealPath());
            $mime = $file->getMimeType();
            $name = $file->getClientOriginalName();
            Mail::to(config('mail.admin_email', 'admin@istec.pt'))->send(new ApplicationReceived($application, $content, $mime, $name));
        } else {
            Mail::to(config('mail.admin_email', 'admin@istec.pt'))->send(new ApplicationReceived($application));
        }

        // Send auto-reply to applicant
        Mail::to($application->email)->send(new ApplicationAutoReply($application));

        $course = Course::findOrFail($validated['course_id']);
        Application::create($validated);

        $course = Course::findOrFail($validated['course_id']);

        return redirect()->route('courses.show', $course->slug) // Probably not correct
            ->with('success', 'Candidatura submetida com sucesso.');
    }

    public function storeEvent(Request $request){        
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