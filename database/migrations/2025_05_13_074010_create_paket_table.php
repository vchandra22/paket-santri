<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('paket', function (Blueprint $table) {
            $table->id();
            $table->string('nama_paket', 100);
            $table->date('tanggal_diterima');
            $table->foreignId('kategori_paket_id')->constrained('kategori_paket');
            $table->string('penerima_paket_nis', 100);
            $table->foreignId('asrama_id')->constrained('asrama');
            $table->string('pengirim_paket', 100);
            $table->string('isi_paket_disita', 200)->nullable();
            $table->enum('status_paket', ['diambil', 'belum diambil'])->default('belum diambil');

            $table->foreign('penerima_paket_nis')->references('nis')->on('santri');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paket');
    }
};
