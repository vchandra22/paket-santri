<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KategoriPaket extends Model
{
    protected $table = 'kategori_paket';
    protected $primaryKey = 'id';

    protected $fillable = [
        'nama_kategori'
    ];

    //relasi antar tabel
    public function paket()
    {
        return $this->hasMany(Paket::class, 'kategori_paket_id');
    }
}
