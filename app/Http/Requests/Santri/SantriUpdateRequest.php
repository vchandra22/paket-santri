<?php

namespace App\Http\Requests\Santri;

use Illuminate\Foundation\Http\FormRequest;

class SantriUpdateRequest extends FormRequest
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
            'nama_santri' => 'required|string|max:255',
            'alamat' => 'nullable|string|max:500',
            'asrama_id' => 'required|exists:asrama,id',
            'total_paket_diterima' => 'nullable|integer|min:0',
        ];
    }
}
