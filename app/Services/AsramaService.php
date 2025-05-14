<?php
namespace App\Services;

use App\Repositories\Asrama\AsramaRepository;
use Illuminate\Support\Facades\DB;

class AsramaService
{
    protected $asramaRepository;

    public function __construct(AsramaRepository $asramaRepository)
    {
        $this->asramaRepository = $asramaRepository;
    }

    public function getAllAsrama()
    {
        return $this->asramaRepository->all();
    }

    public function getAsramaById($id)
    {
        return $this->asramaRepository->find($id);
    }

    public function createAsrama(array $data)
    {
        DB::beginTransaction();
        try {
            $asrama = $this->asramaRepository->create($data);
            DB::commit();
            return $asrama;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function updateAsrama($id, array $data)
    {
        DB::beginTransaction();
        try {
            $asrama = $this->asramaRepository->update($id, $data);
            DB::commit();
            return $asrama;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function deleteAsrama($id)
    {
        DB::beginTransaction();
        try {
            $result = $this->asramaRepository->delete($id);
            DB::commit();
            return $result;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
