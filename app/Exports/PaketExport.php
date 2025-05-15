<?php
namespace App\Exports;

use App\Models\Paket;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class PaketExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Paket::with(['santri', 'kategori', 'asrama'])->get();
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'NIS',
            'Nama Paket',
            'Tanggal Diterima',
            'Kategori Paket',
            'Penerima Paket',
            'Asrama',
            'Pengirim Paket',
            'Isi Paket Disita',
            'Status Paket',
            'Dibuat Pada',
            'Diupdate Pada'
        ];
    }

    /**
     * @param mixed $row
     *
     * @return array
     */
    public function map($row): array
    {
        return [
            $row->santri ? $row->santri->nis : '',
            $row->nama_paket,
            $row->tanggal_diterima,
            $row->kategori ? $row->kategori->nama_kategori : '',
            $row->santri ? $row->santri->nama_santri : '',
            $row->asrama ? $row->asrama->nama_asrama : '',
            $row->pengirim_paket,
            $row->isi_paket_disita,
            $row->status_paket,
            $row->created_at,
            $row->updated_at,
        ];
    }

    /**
     * @param Worksheet $sheet
     */
    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text
            1 => ['font' => ['bold' => true]],
        ];
    }
}
