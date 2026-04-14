<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    /*
    FRONT
    */

    public function index()
    {
        // dd(EventResource::collection(Event::latest()->get()));
        return Inertia('front/pages/events/Events', [
            'events' => EventResource::collection(Event::latest()->get())
        ]);
    }

    public function show(Event $event)
    {
        return Inertia('front/pages/events/EventsDetail', [
            'event' => new EventResource($event)
        ]);
    }

    /*
    ADMIN
    */

    public function adminIndex()
    {
        return Inertia('back/pages/events/Index', [
            'events' => EventResource::collection(Event::latest()->get())
        ]);
    }

    public function create()
    {
        return Inertia('back/pages/events/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'location' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // Fix later to use images properly
        /*if ($request->hasFile('image')) {
            $media = Media::create([
                'path' => $request->file('image')->store('courses', 'public')
            ]);

            $validated['media_id'] = $media->id;
        }*/

        Event::create($validated);

        return redirect()->route('backoffice.events')
            ->with('success', 'Evento criado com sucesso.');
    }

    public function edit(Event $event)
    {
        return Inertia('back/pages/events/Edit', [
            'event' => new EventResource($event)
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'location' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // Fix later to use images properly
        /*if ($request->hasFile('image')) {
            $media = Media::create([
                'path' => $request->file('image')->store('courses', 'public')
            ]);

            $validated['media_id'] = $media->id;
        }*/

        $event->update($validated);

        return redirect()->route('backoffice.events')
            ->with('success', 'Evento atualizado com sucesso.');
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return redirect()->route('backoffice.events')
            ->with('success', 'Evento eliminado com sucesso.');
    }
}
