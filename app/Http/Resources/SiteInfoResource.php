<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SiteInfoResource extends JsonResource
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
            'slogan' => $this->getTranslation('slogan', $locale) ?: $this->getTranslation('slogan', 'pt'),
            'mission' => $this->getTranslation('mission', $locale) ?: $this->getTranslation('mission', 'pt'),
            'whoWeAre' => $this->getTranslation('whoWeAre', $locale) ?: $this->getTranslation('whoWeAre', 'pt'),
            'site_name' => $this->site_name,
            'phone_number'=> $this->phone_number,
            'email' => $this->email,
            'address' => $this->address,
            'logoMedia' => new MediaResource($this->logo),
            'faviconMedia' => new MediaResource($this->favicon),
        ];
    }
}
