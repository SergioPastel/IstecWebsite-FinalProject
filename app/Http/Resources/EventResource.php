<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
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
            'media' => $this->media_id ? new MediaResource($this->media) : null,
            'title' => $this->getTranslation('title', $locale) ?: $this->getTranslation('title', 'pt'),
            'description' => $this->getTranslation('description', $locale) ?: $this->getTranslation('description', 'pt'),
            'location' => $this->location,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
        ];
    }
}
