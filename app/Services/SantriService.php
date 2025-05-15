<?php
namespace App\Services;

use App\Exports\PaketExport;
use App\Exports\SantriExport;
use App\Repositories\Santri\SantriRepository;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

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

    /**
     * Update total paket diterima untuk semua santri
     */
    public function updateAllSantriTotalPaket()
    {
        DB::beginTransaction();
        try {
            // Mendapatkan semua santri
            $santriList = $this->santriRepository->all();

            foreach ($santriList as $santri) {
                $this->updateSantriTotalPaket($santri->nis);
            }

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Update total paket diterima untuk satu santri berdasarkan NIS
     */
    public function updateSantriTotalPaket($nis)
    {
        // Hitung jumlah paket yang diterima oleh santri
        $totalPaket = DB::table('paket')
            ->where('penerima_paket_nis', $nis)
            ->count();

        // Update total paket pada data santri
        return DB::table('santri')
            ->where('nis', $nis)
            ->update(['total_paket_diterima' => $totalPaket]);
    }

    /**
     * Export paket to Excel
     */
    public function exportToExcel($filename = 'santri-data')
    {
        return Excel::download(new SantriExport(), $filename . '.xlsx');
    }
}
