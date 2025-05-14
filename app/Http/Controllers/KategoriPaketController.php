<?php

namespace App\Http\Controllers;

use App\Http\Requests\Paket\KategoriPaketStoreRequest;
use App\Http\Requests\Paket\KategoriPaketUpdateRequest;
use App\Services\KategoriPaketService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriPaketController extends Controller
{
    protected $kategoriPaketService;

    public function __construct(KategoriPaketService $kategoriPaketService)
    {
        $this->kategoriPaketService = $kategoriPaketService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kategori = $this->kategoriPaketService->getAllKategoriPaket();

        return Inertia::render('kategori_paket/index', [
            'kategori' => $kategori,
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('kategori_paket/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(KategoriPaketStoreRequest $request)
    {
        $this->kategoriPaketService->createKategoriPaket($request->validated());

        return redirect()->route('kategori_paket.index')->with('status', 'Kategori paket berhasil ditambahkan');
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
    public function edit(string $id)
    {
        $kategori = $this->kategoriPaketService->getKategoriPaketById($id);

        return Inertia::render('kategori_paket/form', [
            'kategori' => $kategori,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(KategoriPaketUpdateRequest $request, string $id)
    {
        $this->kategoriPaketService->updateKategoriPaket($id, $request->validated());

        return redirect()->route('kategori_paket.index')->with('status', 'Data kategori paket berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->kategoriPaketService->deleteKategoriPaket($id);

        return redirect()->route('kategori_paket.index')->with('success', 'Data kategori paket berhasil dihapus');
    }
}
