<?php

namespace App\Http\Controllers;

use App\Http\Requests\Santri\SantriStoreRequest;
use App\Http\Requests\Santri\SantriUpdateRequest;
use App\Services\AsramaService;
use App\Services\SantriService;
use Inertia\Inertia;

class SantriController extends Controller
{
    protected $santriService;

    public function __construct(SantriService $santriService)
    {
        $this->santriService = $santriService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $santri = $this->santriService->getAllSantri();

        return Inertia::render('santri/index', [
            'santris' => $santri,
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(AsramaService $asramaService)
    {
        $asrama = $asramaService->getAllAsrama();

        return Inertia::render('santri/form', [
            'asrama' => $asrama,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SantriStoreRequest $request)
    {
        $this->santriService->createSantri($request->validated());

        return redirect()->route('santri.index')->with('status', 'Santri berhasil ditambahkan');
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
    public function edit(string $id, AsramaService $asramaService)
    {
        $santri = $this->santriService->getSantriById($id);
        $asrama = $asramaService->getAllAsrama();

        return Inertia::render('santri/form', [
            'santri' => $santri,
            'asrama' => $asrama,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SantriUpdateRequest $request, string $id)
    {
        $this->santriService->updateSantri($id, $request->validated());

        return redirect()->route('santri.index')->with('status', 'Data santri berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->santriService->deleteSantri($id);

        return redirect()->route('santri.index')->with('success', 'Data santri berhasil dihapus');
    }

    /**
     * Export to Excel
     */
    public function export()
    {
        return $this->santriService->exportToExcel('data-santri-' . date('Y-m-d'));
    }}
