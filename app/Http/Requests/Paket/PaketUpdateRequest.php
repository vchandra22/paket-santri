<?php

namespace App\Http\Requests\Paket;

use Illuminate\Foundation\Http\FormRequest;

class PaketUpdateRequest extends FormRequest
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
            'nama_paket' => 'sometimes|required|string|max:100',
            'tanggal_diterima' => 'sometimes|required|date',
            'kategori_paket_id' => 'sometimes|required|exists:kategori_paket,id',
            'penerima_paket_nis' => 'sometimes|required|exists:santri,nis',
            'asrama_id' => 'sometimes|required|exists:asrama,id',
            'pengirim_paket' => 'sometimes|required|string|max:100',
            'isi_paket_disita' => 'nullable|string|max:200',
            'status_paket' => 'sometimes|required|in:diambil,belum diambil'
        ];
    }
}
