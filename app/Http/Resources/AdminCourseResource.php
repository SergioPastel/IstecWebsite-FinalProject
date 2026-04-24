<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AdminCourseResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id'                    => $this->id,
            'media_id'              => $this->media_id,
            'course_category_id'    => $this->course_category_id,
            'title'                 => $this->getTranslations('title'),
            'description'           => $this->getTranslations('description'),
            'professional_outcomes' => $this->getTranslations('professional_outcomes'),
            'duration_years'        => $this->duration_years,
            'study_regime'          => $this->study_regime,
            'tuition_monthly_pay'   => $this->tuition_monthly_pay,
            'tuition_months'        => $this->tuition_months,
            'modality'              => $this->modality,

            // Media with resolved public URL
            'media' => $this->media ? [
                'url' => Storage::disk($this->media->file_disk)->url($this->media->file_path),
            ] : null,

            // Semesters with their subjects
            'semesters' => $this->whenLoaded('semesters', function () {
                return $this->semesters->map(fn ($semester) => [
                    'id'              => $semester->id,
                    'semester_number' => $semester->semester_number,
                    'subjects'        => $semester->subjects->map(fn ($subject) => [
                        'id'        => $subject->id,
                        'name'      => $subject->getTranslations('name'),
                        'ects'      => $subject->ects,
                        'file_path' => $subject->file_path,
                        '_type'     => 'existing',
                    ])->values()->all(),
                ])->values()->all();
            }),
        ];
    }
}
