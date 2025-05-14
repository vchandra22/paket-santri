<?php
namespace App\Services;

use App\Repositories\Paket\KategoriPaketRepository;
use Illuminate\Support\Facades\DB;

class KategoriPaketService
{
    protected $kategoriPaketRepository;

    public function __construct(KategoriPaketRepository $kategoriPaketRepository)
    {
        $this->kategoriPaketRepository = $kategoriPaketRepository;
    }

    public function getAllKategoriPaket()
    {
        return $this->kategoriPaketRepository->all();
    }

    public function getKategoriPaketById($id)
    {
        return $this->kategoriPaketRepository->find($id);
    }

    public function createKategoriPaket(array $data)
    {
        DB::beginTransaction();
        try {
            $kategori = $this->kategoriPaketRepository->create($data);
            DB::commit();
            return $kategori;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function updateKategoriPaket($id, array $data)
    {
        DB::beginTransaction();
        try {
            $kategori = $this->kategoriPaketRepository->update($id, $data);
            DB::commit();
            return $kategori;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function deleteKategoriPaket($id)
    {
        DB::beginTransaction();
        try {
            $result = $this->kategoriPaketRepository->delete($id);
            DB::commit();
            return $result;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
