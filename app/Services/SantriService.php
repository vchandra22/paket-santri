<?php
namespace App\Services;

use App\Repositories\Santri\SantriRepository;
use Illuminate\Support\Facades\DB;

class SantriService
{
    protected $santriRepository;

    public function __construct(SantriRepository $santriRepository)
    {
        $this->santriRepository = $santriRepository;
    }

    public function getAllSantri()
    {
        return $this->santriRepository->all();
    }

    public function getSantriById($id)
    {
        return $this->santriRepository->find($id);
    }

    public function createSantri(array $data)
    {
        DB::beginTransaction();
        try {
            $santri = $this->santriRepository->create($data);
            DB::commit();
            return $santri;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function updateSantri($id, array $data)
    {
        DB::beginTransaction();
        try {
            $santri = $this->santriRepository->update($id, $data);
            DB::commit();
            return $santri;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function deleteSantri($id)
    {
        DB::beginTransaction();
        try {
            $result = $this->santriRepository->delete($id);
            DB::commit();
            return $result;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
