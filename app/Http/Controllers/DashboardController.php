<?php

namespace App\Http\Controllers;

use App\Models\Paket;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Data untuk grafik paket masuk (harian, mingguan, bulanan, tahunan)
        $daily = $this->getDailyPackages();
        $weekly = $this->getWeeklyPackages();
        $monthly = $this->getMonthlyPackages();
        $yearly = $this->getYearlyPackages();

        // Data untuk grafik kategori paket
        $packageCategories = $this->getPackageCategories();

        // 5 Daftar paket terbaru
        $latestPackages = Paket::with(['santri', 'kategori', 'asrama'])
            ->latest('tanggal_diterima')
            ->take(5)
            ->get();

        // Jumlah paket yang belum diambil
        $notPickedUp = Paket::where('status_paket', 'belum diambil')->count();

        // Jumlah paket yang disita
        $confiscated = Paket::whereNotNull('isi_paket_disita')
            ->where('isi_paket_disita', '!=', null)
            ->count();

        return Inertia::render('dashboard', [
            'chartData' => [
                'daily' => $daily,
                'weekly' => $weekly,
                'monthly' => $monthly,
                'yearly' => $yearly,
            ],
            'categoryData' => $packageCategories,
            'latestPackages' => $latestPackages,
            'statistics' => [
                'notPickedUp' => $notPickedUp,
                'confiscated' => $confiscated,
            ],
        ]);
    }

    private function getDailyPackages()
    {
        $startDate = Carbon::now()->subDays(6);
        $endDate = Carbon::now();

        $packages = Paket::select(DB::raw('DATE(tanggal_diterima) as date'), DB::raw('count(*) as total'))
            ->whereBetween('tanggal_diterima', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $result = [];
        $currentDate = $startDate->copy();

        while ($currentDate <= $endDate) {
            $dateString = $currentDate->format('Y-m-d');
            $found = false;

            foreach ($packages as $package) {
                if ($package->date === $dateString) {
                    $result[] = [
                        'date' => $currentDate->format('d M'),
                        'total' => $package->total
                    ];
                    $found = true;
                    break;
                }
            }

            if (!$found) {
                $result[] = [
                    'date' => $currentDate->format('d M'),
                    'total' => 0
                ];
            }

            $currentDate->addDay();
        }

        return $result;
    }

    private function getWeeklyPackages()
    {
        $startDate = Carbon::now()->subWeeks(4)->startOfWeek();
        $endDate = Carbon::now()->endOfWeek();

        $packages = Paket::select(
            DB::raw('YEARWEEK(tanggal_diterima, 1) as yearweek'),
            DB::raw('count(*) as total'),
            DB::raw('MIN(tanggal_diterima) as start_date')
        )
            ->whereBetween('tanggal_diterima', [$startDate, $endDate])
            ->groupBy('yearweek')
            ->orderBy('yearweek')
            ->get();

        $result = [];
        foreach ($packages as $package) {
            $weekStartDate = Carbon::parse($package->start_date)->startOfWeek();
            $result[] = [
                'date' => $weekStartDate->format('d M') . ' - ' . $weekStartDate->endOfWeek()->format('d M'),
                'total' => $package->total
            ];
        }

        return $result;
    }

    private function getMonthlyPackages()
    {
        $startDate = Carbon::now()->subMonths(5)->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();

        $packages = Paket::select(
            DB::raw('YEAR(tanggal_diterima) as year'),
            DB::raw('MONTH(tanggal_diterima) as month'),
            DB::raw('count(*) as total')
        )
            ->whereBetween('tanggal_diterima', [$startDate, $endDate])
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        $result = [];
        $currentDate = $startDate->copy();

        while ($currentDate <= $endDate) {
            $year = $currentDate->year;
            $month = $currentDate->month;
            $found = false;

            foreach ($packages as $package) {
                if ($package->year == $year && $package->month == $month) {
                    $result[] = [
                        'date' => $currentDate->format('M Y'),
                        'total' => $package->total
                    ];
                    $found = true;
                    break;
                }
            }

            if (!$found) {
                $result[] = [
                    'date' => $currentDate->format('M Y'),
                    'total' => 0
                ];
            }

            $currentDate->addMonth();
        }

        return $result;
    }

    private function getYearlyPackages()
    {
        $startYear = Carbon::now()->subYears(4)->year;
        $endYear = Carbon::now()->year;

        $packages = Paket::select(
            DB::raw('YEAR(tanggal_diterima) as year'),
            DB::raw('count(*) as total')
        )
            ->whereYear('tanggal_diterima', '>=', $startYear)
            ->whereYear('tanggal_diterima', '<=', $endYear)
            ->groupBy('year')
            ->orderBy('year')
            ->get();

        $result = [];
        $currentYear = $startYear;

        while ($currentYear <= $endYear) {
            $found = false;

            foreach ($packages as $package) {
                if ($package->year == $currentYear) {
                    $result[] = [
                        'date' => (string) $currentYear,
                        'total' => $package->total
                    ];
                    $found = true;
                    break;
                }
            }

            if (!$found) {
                $result[] = [
                    'date' => (string) $currentYear,
                    'total' => 0
                ];
            }

            $currentYear++;
        }

        return $result;
    }

    private function getPackageCategories()
    {
        return Paket::select('kategori_paket.nama_kategori', DB::raw('count(*) as total'))
            ->join('kategori_paket', 'paket.kategori_paket_id', '=', 'kategori_paket.id')
            ->groupBy('kategori_paket.nama_kategori')
            ->orderBy('total', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->nama_kategori,
                    'value' => $item->total
                ];
            });
    }
}
