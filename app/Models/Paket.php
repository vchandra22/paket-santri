<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paket extends Model
{
    protected $table = 'paket';
    protected $primaryKey = 'id';

    protected $fillable = [
        'nama_paket',
        'tanggal_diterima',
        'kategori_paket_id',
        'penerima_paket_nis',
        'asrama_id',
        'pengirim_paket',
        'isi_paket_disita',
        'status_paket'
    ];

    // relasi antar tabel
    public function santri()
    {
        return $this->belongsTo(Santri::class, 'penerima_paket_nis', 'nis');
    }

    public function kategori()
    {
        return $this->belongsTo(KategoriPaket::class, 'kategori_paket_id');
    }

    public function asrama()
    {
        return $this->belongsTo(Asrama::class);
    }
}
