<?php

namespace App\Http\Resources;

use App\Http\Resources\CourseResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseCategoryResource extends JsonResource
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
            'title' => $this->getTranslation('title', $locale) ?: $this->getTranslation('title', 'pt'),
            'description' => $this->getTranslation('description', $locale) ?: $this->getTranslation('description', 'pt'),
            'courses' => $this->courses ? $this->courses->map(function ($course) use ($locale) {
                return [
                    'id' => $course->id,
                    'title' => $course->getTranslation('title', $locale) ?: $course->getTranslation('title', 'pt'),
                ];
            })->values()->toArray() : [],

        ];
    }
}
