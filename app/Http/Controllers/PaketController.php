<?php

namespace App\Http\Controllers;

use App\Http\Requests\Paket\PaketStoreRequest;
use App\Http\Requests\Paket\PaketUpdateRequest;
use App\Services\AsramaService;
use App\Services\KategoriPaketService;
use App\Services\PaketService;
use App\Services\SantriService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaketController extends Controller
{
    protected $paketService;

    public function __construct(PaketService $paketService)
    {
        $this->paketService = $paketService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paket = $this->paketService->getAllPaket();

        return Inertia::render('paket/index', [
            'paket' => $paket,
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(SantriService $santriService, KategoriPaketService $kategoriPaketService, AsramaService $asramaService)
    {
        $santri = $santriService->getAllSantri();
        $kategori = $kategoriPaketService->getAllKategoriPaket();
        $asrama = $asramaService->getAllAsrama();

        return Inertia::render('paket/form', [
            'santri' => $santri,
            'kategori' => $kategori,
            'asrama' => $asrama,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PaketStoreRequest $request)
    {
        $this->paketService->createPaket($request->validated());

        return redirect()->route('paket.index')->with('status', 'Paket berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id, SantriService $santriService, KategoriPaketService $kategoriPaketService, AsramaService $asramaService)
    {
        $paket = $this->paketService->getPaketById($id);
        $santri = $santriService->getAllSantri();
        $kategori = $kategoriPaketService->getAllKategoriPaket();
        $asrama = $asramaService->getAllAsrama();

        return Inertia::render('paket/form', [
            'paket' => $paket,
            'santri' => $santri,
            'kategori' => $kategori,
            'asrama' => $asrama,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PaketUpdateRequest $request, string $id)
    {
        $this->paketService->updatePaket($id, $request->validated());

        return redirect()->route('paket.index')->with('status', 'Data paket berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->paketService->deletePaket($id);

        return redirect()->route('paket.index')->with('success', 'Data paket berhasil dihapus');
    }

    /**
     * Export to Excel
     */
    public function export()
    {
        return $this->paketService->exportToExcel('data-paket-' . date('Y-m-d'));
    }
}
