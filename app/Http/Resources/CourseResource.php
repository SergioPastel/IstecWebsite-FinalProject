<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * $wrap by default enables resource wrapping inside of
     * "data" key. By nulling it we make resource easier to
     * access in the frontend
     */
    public static $wrap = null;
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
            'category' => new CourseCategoryResource($this->category),
            'title' => $this->getTranslation('title', $locale) ?: $this->getTranslation('title', 'pt'),
            'description' => $this->getTranslation('description', $locale) ?: $this->getTranslation('description', 'pt'),
            'duration_years' => $this->duration_years,
            'study_regime' => $this->study_regime,
            'tuition_monthly_pay' => $this->tuition_monthly_pay,
            'tuition_months' => $this->tuition_months,
            'semesters' => SemesterResource::collection($this->semesters),
        ];
    }
}
