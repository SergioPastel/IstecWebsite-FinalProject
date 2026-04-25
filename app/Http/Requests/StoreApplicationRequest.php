<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules for our course applications.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Add fields later
        return [
            'course_id' => ['required', 'exists:courses,id'],
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'phone' => ['required', 'string', 'max:30'],
            'birth_date' => ['nullable', 'date'],
            'academic_level' => ['nullable', 'string', 'max:255'],
            'cv_file' => ['nullable', 'file', 'mimes:pdf', 'max:4096'],
            'id_file' => ['nullable', 'file', 'mimes:pdf', 'max:4096'],
            'certificate' => ['nullable', 'file', 'mimes:pdf', 'max:4096']
        ];
    }
}
