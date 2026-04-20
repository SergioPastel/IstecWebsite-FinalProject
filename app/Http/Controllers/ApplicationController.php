<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\EventApplication;
use App\Models\Course;
use App\Models\CourseCategory;
use App\Models\Event;
use App\Http\Resources\CourseCategoryResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\EventResource;
use App\Models\EventCategory;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\StoreEventApplicationRequest;
use App\Http\Resources\EventCategoryResource;
use Illuminate\Support\Facades\Mail;
use App\Mail\ApplicationReceived;
use App\Mail\ApplicationAutoReply;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ApplicationController extends Controller
{
    /*
    FRONT
    */

    public function applyCourse(?Course $course = null) // Null by default so the same action can be shared regardless if the user has a pre-selected course
    {
        if ($course) {
            $course->load('category');
        }

        $courseCategories = CourseCategoryResource::collection(
            CourseCategory::with('courses')->get()
        )->resolve();

        return Inertia('front/pages/applications/ApplicationsCourse', [
            'course' => $course,
            'courseCategories' => $courseCategories,
        ]);
    }

    public function applyEvent(?Event $event = null)
    {
        if ($event) {
            $event->load('category');
        }

        $eventCategories = EventCategoryResource::collection(
            EventCategory::with('events')->get()
        )->resolve();


        return Inertia('front/pages/applications/ApplicationsEvents', [
            'event' => $event,
            'eventCategories' => $eventCategories
        ]);
    }

    public function storeCourse(StoreApplicationRequest $request)
    {
        $validated = $request->validated();

        $application = Application::create($validated);

        // Handle file attachments
        $attachments = [];

        // Handle CV, ID, and Certificate files if they exist in the request
        if ($request->hasFile('cv_file')) {
            $attachments[] = $request->file('cv_file');
        }

        if ($request->hasFile('identification_file')) {
            $attachments[] = $request->file('identification_file');
        }

        if ($request->hasFile('certificate_file')) {
            $attachments[] = $request->file('certificate_file');
        }

        // The emails are queued as to not delay the user's experience while the email is sent
        // Send notification to staff
        Mail::to(config('mail.admin_email', 'admin@istec.pt'))->send(new ApplicationReceived($application, $attachments));

        // Send auto-reply to applicant
        Mail::to($application->email)->send(new ApplicationAutoReply($application));

        // Redirect back with success message
        return redirect()->back()->with('success', 'Application submitted successfully!');
    }

    public function storeEvent(StoreEventApplicationRequest $request){        
        $validated = $request->validated();

        $application = EventApplication::create($validated);

        // Send notification to staff
        Mail::to(config('mail.admin_email', 'admin@istec.pt'))->send(new ApplicationReceived($application));

        // Send auto-reply to applicant
        Mail::to($application->email)->send(new ApplicationAutoReply($application));

        $event = Event::findOrFail($validated['event_id']);

        return redirect()->route('events.show', $event->slug)
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
