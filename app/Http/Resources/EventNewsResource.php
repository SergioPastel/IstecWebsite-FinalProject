<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * This Resource class will be used for the News and Events
 * section in the homepage. Will hold shared data, as well as
 * the type
 */
class EventNewsResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'type' => $this->type, // needs to be manually fed in
            'id' => $this->id,
            'title' => $this->getTranslation('title', $locale) ?: $this->getTranslation('title', $locale),
            'description' => $this->getTranslation('description', $locale) ?: $this->getTranslation('description', $locale),
            'date' => $this->created_at->format('d M Y'), // unsure whether date will be useful for frontend
        ];
    }
}
