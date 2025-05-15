<?php
namespace App\Services;

use App\Exports\PaketExport;
use App\Repositories\Paket\PaketRepository;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class PaketService
{
    protected $paketRepository;

    public function __construct(PaketRepository $paketRepository)
    {
        $this->paketRepository = $paketRepository;
    }

    public function getAllPaket()
    {
        return $this->paketRepository->all();
    }

    public function getPaketById($id)
    {
        return $this->paketRepository->find($id);
    }

    public function createPaket(array $data)
    {
        DB::beginTransaction();
        try {
            $paket = $this->paketRepository->create($data);
            DB::commit();
            return $paket;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function updatePaket($id, array $data)
    {
        DB::beginTransaction();
        try {
            $paket = $this->paketRepository->update($id, $data);
            DB::commit();
            return $paket;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function deletePaket($id)
    {
        DB::beginTransaction();
        try {
            $result = $this->paketRepository->delete($id);
            DB::commit();
            return $result;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Export paket to Excel
     */
    public function exportToExcel($filename = 'paket-data')
    {
        return Excel::download(new PaketExport(), $filename . '.xlsx');
    }
}
