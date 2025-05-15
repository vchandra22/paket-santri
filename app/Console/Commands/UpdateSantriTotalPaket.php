<?php

namespace App\Console\Commands;

use App\Services\SantriService;
use Illuminate\Console\Command;

class UpdateSantriTotalPaket extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'santri:update-total-paket';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update total paket diterima untuk semua santri';

    /**
     * Execute the console command.
     */
    public function handle(SantriService $santriService)
    {
        $this->info('Mulai memperbarui total paket diterima...');

        try {
            $santriService->updateAllSantriTotalPaket();
            $this->info('Berhasil memperbarui total paket diterima untuk semua santri!');
            return 0;
        } catch (\Exception $e) {
            $this->error('Terjadi kesalahan: ' . $e->getMessage());
            return 1;
        }
    }
}
