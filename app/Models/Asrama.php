<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asrama extends Model
{
    protected $table = 'asrama';
    protected $primaryKey = 'id';

    protected $fillable = [
        'nama_asrama',
        'gedung'
    ];

    // relasi antar tabel
    public function santri()
    {
        return $this->hasMany(Santri::class);
    }

    public function paket()
    {
        return $this->hasMany(Paket::class);
    }
}
