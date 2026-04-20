<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventCategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();
        return [
            'id' => $this->id,
            'title' => $this->getTranslation('title', $locale) ?: $this->getTranslation('title', 'pt'),
            'events' => $this->events ? $this->events->map(function ($event) use ($locale) {
                return [
                    'id' => $event->id,
                    'title' => $event->getTranslation('title', $locale) ?: $event->getTranslation('title', 'pt'),
                ];
            })->values()->toArray() : [],

        ];
    }
}
