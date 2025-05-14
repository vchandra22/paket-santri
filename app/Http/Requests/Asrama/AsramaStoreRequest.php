<?php

namespace App\Http\Requests\Asrama;

use Illuminate\Foundation\Http\FormRequest;

class AsramaStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_asrama' => 'required|string|max:100',
            'gedung' => 'required|string|max:100',
        ];
    }
}
