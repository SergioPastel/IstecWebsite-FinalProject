<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
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
            'id' => $this->id,
            'media' => $this->media_id ? new MediaResource($this->media) : null,
            'category' => $this->category()->getTranslation('title', $locale) ?: $this->getTranslation('title', 'pt'),
            'title' => $this->getTranslation('title', $locale) ?: $this->getTranslation('title', $locale),
            'description' => $this->getTranslation('description', $locale) ?: $this->getTranslation('description', $locale),
        ];
    }
}
