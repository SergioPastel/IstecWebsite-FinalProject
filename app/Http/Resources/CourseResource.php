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
            'media' => $this->media_id ? new MediaResource($this->media) : null,
            'category' =>
                $this->category->getTranslation('title', $locale)
                ?: $this->category->getTranslation('title', 'pt'),
            'title' =>
                $this->getTranslation('title', $locale)
                ?: $this->getTranslation('title', 'pt'),
            'description' =>
                $this->getTranslation('description', $locale)
                ?: $this->getTranslation('description', 'pt'),
            'duration_years' => $this->duration_years,
            'modality' =>
                $this->getTranslation('modality', $locale)
                ?: $this->getTranslation('modality', 'pt'),
            'study_regime' => $this->study_regime,
            'tuition_monthly_pay' => $this->tuition_monthly_pay,
            'tuition_months' => $this->tuition_months,
            'semesters' => SemesterResource::collection($this->semesters),

            'professional_outcomes' =>
                $this->getTranslation('professional_outcomes', $locale)
                ?: $this->getTranslation('professional_outcomes', 'pt'),
        ];
    }
}
