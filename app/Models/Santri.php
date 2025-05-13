<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Santri extends Model
{
    protected $table = 'santri';
    protected $primaryKey = 'nis';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'nis',
        'nama_santri',
        'alamat',
        'asrama_id',
        'total_paket_diterima'
    ];

    // relasi antar tabel
    public function asrama()
    {
        return $this->belongsTo(Asrama::class);
    }

    public function paket()
    {
        return $this->hasMany(Paket::class, 'penerima_paket_nis', 'nis');
    }
}
