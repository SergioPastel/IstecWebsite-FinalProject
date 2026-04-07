<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Course;
use App\Http\Requests\StoreApplicationRequest;
use Illuminate\Support\Facades\Mail;
use App\Mail\ApplicationReceived;
use App\Mail\ApplicationAutoReply;

class ApplicationController extends Controller
{
    /*
    FRONT
    */

    public function create(Course $course)
    {
        return Inertia('front/pages/applications/create', [
            'course' => $course
        ]);
    }

    public function store(StoreApplicationRequest $request)
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