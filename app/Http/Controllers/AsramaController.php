<?php

namespace App\Http\Controllers;

use App\Http\Requests\Asrama\AsramaStoreRequest;
use App\Http\Requests\Asrama\AsramaUpdateRequest;
use App\Services\AsramaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AsramaController extends Controller
{
    protected $asramaService;

    public function __construct(AsramaService $asramaService)
    {
        $this->asramaService = $asramaService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $asrama = $this->asramaService->getAllAsrama();

        return Inertia::render('asrama/index', [
            'asrama' => $asrama,
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('asrama/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AsramaStoreRequest $request)
    {
        $this->asramaService->createAsrama($request->validated());

        return redirect()->route('asrama.index')->with('status', 'Asrama berhasil ditambahkan');
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
        $asrama = $this->asramaService->getAsramaById($id);

        return Inertia::render('asrama/form', [
            'asrama' => $asrama,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AsramaUpdateRequest $request, string $id)
    {
        $this->asramaService->updateAsrama($id, $request->validated());

        return redirect()->route('asrama.index')->with('status', 'Data asrama berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->asramaService->deleteAsrama($id);

        return redirect()->route('asrama.index')->with('success', 'Data asrama berhasil dihapus');
    }
}
