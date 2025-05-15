<?php

use App\Http\Controllers\AsramaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KategoriPaketController;
use App\Http\Controllers\PaketController;
use App\Http\Controllers\SantriController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // route santri
    Route::prefix('santri')->group(function () {
        Route::get('/', [SantriController::class, 'index'])->name('santri.index');
        Route::get('/create', [SantriController::class, 'create'])->name('santri.create');
        Route::post('/store', [SantriController::class, 'store'])->name('santri.store');
        Route::get('/{santri}/edit', [SantriController::class, 'edit'])->name('santri.edit');
        Route::put('/{santri}/update', [SantriController::class, 'update'])->name('santri.update');
        Route::delete('/{santri}/destroy', [SantriController::class, 'destroy'])->name('santri.destroy');
    });

    // route paket
    Route::prefix('paket')->group(function () {
        Route::get('/', [PaketController::class, 'index'])->name('paket.index');
        Route::get('/create', [PaketController::class, 'create'])->name('paket.create');
        Route::post('/store', [PaketController::class, 'store'])->name('paket.store');
        Route::get('/{paket}/edit', [PaketController::class, 'edit'])->name('paket.edit');
        Route::put('/{paket}/update', [PaketController::class, 'update'])->name('paket.update');
        Route::delete('/{paket}/destroy', [PaketController::class, 'destroy'])->name('paket.destroy');
    });

    // route asrama
    Route::prefix('asrama')->group(function () {
        Route::get('/', [AsramaController::class, 'index'])->name('asrama.index');
        Route::get('/create', [AsramaController::class, 'create'])->name('asrama.create');
        Route::post('/store', [AsramaController::class, 'store'])->name('asrama.store');
        Route::get('/{asrama}/edit', [AsramaController::class, 'edit'])->name('asrama.edit');
        Route::put('/{asrama}/update', [AsramaController::class, 'update'])->name('asrama.update');
        Route::delete('/{asrama}/destroy', [AsramaController::class, 'destroy'])->name('asrama.destroy');
    });

    // route kategori paket
    Route::prefix('kategori-paket')->group(function () {
        Route::get('/', [KategoriPaketController::class, 'index'])->name('kategori_paket.index');
        Route::get('/create', [KategoriPaketController::class, 'create'])->name('kategori_paket.create');
        Route::post('/store', [KategoriPaketController::class, 'store'])->name('kategori_paket.store');
        Route::get('/{kategori_paket}/edit', [KategoriPaketController::class, 'edit'])->name('kategori_paket.edit');
        Route::put('/{kategori_paket}/update', [KategoriPaketController::class, 'update'])->name('kategori_paket.update');
        Route::delete('/{kategori_paket}/destroy', [KategoriPaketController::class, 'destroy'])->name('kategori_paket.destroy');
    });

    // route untuk export excel
    Route::get('/paket/export', [PaketController::class, 'export'])->name('paket.export');
});

// Rute dengan role admin
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/users', function () {
        return Inertia::render('admin/users/index');
    })->name('admin.users.index');

    Route::get('/roles', function () {
        return Inertia::render('admin/roles/index');
    })->name('admin.roles.index');

    Route::get('/permission', function () {
        return Inertia::render('admin/permission/index');
    })->name('admin.permission.index');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
