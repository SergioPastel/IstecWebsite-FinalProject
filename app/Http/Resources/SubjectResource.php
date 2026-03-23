<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * Using resources, we control the resource information to
     * be passed into the frontend.
     * Because model class holds both translated versions of a
     * given text, 'pt' and 'en', we can specify here using the
     * app's locale version to be passed into the
     * frontend.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();
        return [
            'id' => $this->id,
            'name' => $this->name[$locale] ?? $this->name['pt'] ?? null,
            'ects' => $this->ects ?? null,
            'file_path' => $this->file_path ?? '',
        ];
    }
}
