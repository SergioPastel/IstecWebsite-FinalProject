<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Validation rules for mails sent from our contact form.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'], // Arbitrary, names shouldn't be too long
            'email' => ['required', 'email'],
            'subject' => ['required', 'string', 'max:100'], // Arbitrary, subjects shouldn't be too long
            'message' => ['required', 'string'],
        ];
    }
}
