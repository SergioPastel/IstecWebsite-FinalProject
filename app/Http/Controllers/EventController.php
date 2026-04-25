<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResource;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EventController extends Controller
{
    /*
    ┌─────────────────────────────────────────────────────────────────────────┐
    │  FRONT                                                                  │
    └─────────────────────────────────────────────────────────────────────────┘
    */

    public function index()
    {
        return Inertia('front/pages/eventsandnews/EventsAndNews', [
            'events' => EventResource::collection(Event::latest()->get()),
        ]);
    }

    public function show(Event $event)
    {
        return Inertia('front/pages/eventsandnews/EventsDetail', [
            'event' => new EventResource($event),
        ]);
    }

    /*
    ┌─────────────────────────────────────────────────────────────────────────┐
    │  ADMIN                                                                  │
    └─────────────────────────────────────────────────────────────────────────┘
    */

    public function adminIndex()
    {
        return Inertia('back/pages/events/Index', [
            'events' => EventResource::collection(Event::latest()->get()),
        ]);
    }

    public function create()
    {
        return Inertia('back/pages/events/Create', [
            'eventCategories' => EventCategory::select('id', 'title')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'event_category_id' => ['required', 'uuid', 'exists:event_categories,id'],
            'title'             => ['required', 'array'],
            'title.pt'          => ['required', 'string', 'max:255'],
            'title.en'          => ['required', 'string', 'max:255'],
            'description'       => ['required', 'array'],
            'description.pt'    => ['required', 'string'],
            'description.en'    => ['required', 'string'],
            'location'          => ['nullable', 'string', 'max:255'],
            'start_date'        => ['required', 'date'],
            'end_date'          => ['nullable', 'date', 'after:start_date'],
            'image'             => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ]);

        $mediaId = null;

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file     = $request->file('image');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path     = 'media/' . $filename;
            Storage::disk('public')->put($path, file_get_contents($file));
            $media   = Media::create(['file_path' => $path, 'alt_text' => '']);
            $mediaId = $media->id;
        }

        $event = Event::create([
            'media_id'          => $mediaId,
            'event_category_id' => $request->event_category_id,
            'title'             => ['pt' => '', 'en' => ''],
            'description'       => ['pt' => '', 'en' => ''],
            'location'          => $request->input('location') ?? '',
            'start_date'        => $request->start_date,
            'end_date'          => $request->end_date,
        ]);

        foreach (['title', 'description'] as $field) {
            if ($request->has($field)) {
                foreach ($request->input($field) as $locale => $value) {
                    $event->setTranslation($field, $locale, $value ?? '');
                }
            }
        }

        $event->save();

        return redirect()->route('backoffice.events')
            ->with('success', __('flashes.success.eventCreated'));
    }

    public function edit(Event $event)
    {
        return Inertia('back/pages/events/Edit', [
            'event'           => new EventResource($event),
            'eventCategories' => EventCategory::select('id', 'title')->get(),
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $request->validate([
            'event_category_id' => ['required', 'uuid', 'exists:event_categories,id'],
            'title'             => ['required', 'array'],
            'title.pt'          => ['required', 'string', 'max:255'],
            'title.en'          => ['required', 'string', 'max:255'],
            'description'       => ['required', 'array'],
            'description.pt'    => ['required', 'string'],
            'description.en'    => ['required', 'string'],
            'location'          => ['nullable', 'string', 'max:255'],
            'start_date'        => ['required', 'date'],
            'end_date'          => ['nullable', 'date', 'after:start_date'],
            'image'             => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ]);

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file     = $request->file('image');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path     = 'media/' . $filename;
            Storage::disk('public')->put($path, file_get_contents($file));

            if ($event->media) {
                Storage::disk('public')->delete($event->media->file_path);
                $oldMedia        = $event->media;
                $event->media_id = null;
                $event->save();
                $oldMedia->delete();
            }

            $media           = Media::create(['file_path' => $path, 'alt_text' => '']);
            $event->media_id = $media->id;
        }

        $event->event_category_id = $request->event_category_id;
        $event->location          = $request->input('location') ?? '';
        $event->start_date        = $request->start_date;
        $event->end_date          = $request->end_date;

        foreach (['title', 'description'] as $field) {
            if ($request->has($field)) {
                foreach ($request->input($field) as $locale => $value) {
                    $event->setTranslation($field, $locale, $value ?? '');
                }
            }
        }

        $event->save();

        return redirect()->route('backoffice.events')
            ->with('success', __('flashes.success.eventUpdated'));
    }

    public function destroy(Event $event)
    {
        if ($event->media) {
            Storage::disk('public')->delete($event->media->file_path);
            $event->media->delete();
        }

        $event->delete();

        return redirect()->route('backoffice.events')
            ->with('success', __('flashes.success.eventDeleted'));
    }
}
