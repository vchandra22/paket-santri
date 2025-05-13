<?php

namespace App\Http\Requests\Santri;

use Illuminate\Foundation\Http\FormRequest;

class SantriStoreRequest extends FormRequest
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
            'nis' => 'required|string|unique:santri,nis',
            'nama_santri' => 'required|string|max:100',
            'alamat' => 'nullable|string|max:100',
            'asrama_id' => 'required|exists:asrama,id',
            'total_paket_diterima' => 'nullable|integer|min:0',
        ];
    }
}
