<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SemesterResource extends JsonResource
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
        return [
            'id' => $this->id,
            'semester_number' => $this->semester_number ?? null,
            'subjects' => SubjectResource::collection($this->subjects) ?? null,
        ];
    }
}
