<?php

namespace App\Http\Resources;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaResource extends JsonResource
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
            'type' => $this->type,
            'url' => Media::getUrl($this->file_disk, $this->file_path),
            'thumbnail_url' => $this->thumbnail_disk && $this->thumbnail_path ? Media::getUrl($this->thumbnail_disk, $this->thumbnail_path) : null,
            'alt_text' => $this->getTranslation('alt_text', $locale) ?: $this->getTranslation('alt_text', 'pt'),
        ];
    }
}
