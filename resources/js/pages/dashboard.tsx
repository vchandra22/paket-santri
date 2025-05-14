import { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Package, AlertCircle, MoreHorizontal, Filter, Inbox } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
interface ChartDataItem {
    date: string;
    total: number;
}

interface CategoryDataItem {
    name: string;
    value: number;
}

interface PackageItem {
    id: number;
    nama_paket: string;
    tanggal_diterima: string;
    status_paket: 'sudah_diambil' | 'belum_diambil';
    isi_paket_disita: boolean;
    santri?: {
        nama: string;
    };
    kategori?: {
        nama_kategori: string;
    };
}

interface Statistics {
    notPickedUp: number;
    confiscated: number;
}

interface DashboardProps {
    chartData: {
        daily: ChartDataItem[];
        weekly: ChartDataItem[];
        monthly: ChartDataItem[];
        yearly: ChartDataItem[];
    };
    categoryData: CategoryDataItem[];
    latestPackages: PackageItem[];
    statistics: Statistics;
}
export default function Dashboard({
                                      chartData,
                                      categoryData,
                                      latestPackages,
                                      statistics
                                  }: DashboardProps) {
    const [activeTimeframe, setActiveTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');

    // Time period data based on active tab
    const timeData = {
        daily: chartData.daily,
        weekly: chartData.weekly,
        monthly: chartData.monthly,
        yearly: chartData.yearly
    };

    const formatDate = (date: string) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };
    return (
        <AppLayout
            breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}
        >
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Statistics Cards */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Paket Belum Diambil</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statistics.notPickedUp}</div>
                            <p className="text-xs text-muted-foreground">
                                Paket yang menunggu untuk diambil
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Paket Disita</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statistics.confiscated}</div>
                            <p className="text-xs text-muted-foreground">
                                Paket dengan barang yang disita
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Paket Masuk</CardTitle>
                            <Inbox className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {chartData.daily.reduce((total, item) => total + item.total, 0)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Minggu ini
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kategori Terbanyak</CardTitle>
                            <Filter className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {categoryData.length > 0 ? categoryData[0].name : '-'}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {categoryData.length > 0 ? `${categoryData[0].value} paket` : 'Tidak ada data'}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Grafik Paket Masuk */}
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Statistik Paket Masuk</CardTitle>
                            <CardDescription>Tren paket yang diterima berdasarkan rentang waktu</CardDescription>
                            <Tabs value={activeTimeframe} onValueChange={(value) => setActiveTimeframe(value as 'daily' | 'weekly' | 'monthly' | 'yearly')}>
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="daily">Harian</TabsTrigger>
                                    <TabsTrigger value="weekly">Mingguan</TabsTrigger>
                                    <TabsTrigger value="monthly">Bulanan</TabsTrigger>
                                    <TabsTrigger value="yearly">Tahunan</TabsTrigger>
                                </TabsList>
                                <TabsContent value="daily">
                                    <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                data={timeData.daily}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" />
                                                <YAxis allowDecimals={false} />
                                                <Tooltip />
                                                <Legend />
                                                <Line
                                                    type="monotone"
                                                    dataKey="total"
                                                    name="Jumlah Paket"
                                                    stroke="#8884d8"
                                                    activeDot={{ r: 8 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </TabsContent>
                                <TabsContent value="weekly">
                                    <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                data={timeData.weekly}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" />
                                                <YAxis allowDecimals={false} />
                                                <Tooltip />
                                                <Legend />
                                                <Line
                                                    type="monotone"
                                                    dataKey="total"
                                                    name="Jumlah Paket"
                                                    stroke="#8884d8"
                                                    activeDot={{ r: 8 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </TabsContent>
                                <TabsContent value="monthly">
                                    <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                data={timeData.monthly}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" />
                                                <YAxis allowDecimals={false} />
                                                <Tooltip />
                                                <Legend />
                                                <Line
                                                    type="monotone"
                                                    dataKey="total"
                                                    name="Jumlah Paket"
                                                    stroke="#8884d8"
                                                    activeDot={{ r: 8 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </TabsContent>
                                <TabsContent value="yearly">
                                    <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                data={timeData.yearly}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" />
                                                <YAxis allowDecimals={false} />
                                                <Tooltip />
                                                <Legend />
                                                <Line
                                                    type="monotone"
                                                    dataKey="total"
                                                    name="Jumlah Paket"
                                                    stroke="#8884d8"
                                                    activeDot={{ r: 8 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardHeader>
                    </Card>

                    {/* Grafik Distribusi Kategori Paket */}
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Kategori Paket</CardTitle>
                            <CardDescription>Distribusi kategori paket yang diterima</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={true}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            nameKey="name"
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${value} Paket`, 'Jumlah']} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Daftar 5 Paket Terbaru */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Paket Terbaru</CardTitle>
                            <CardDescription>5 paket terakhir yang diterima</CardDescription>
                        </div>
                        <Link href="/packages">
                            <Button variant="outline" size="sm">
                                Lihat Semua
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {latestPackages.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nama Paket</TableHead>
                                            <TableHead>Penerima</TableHead>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead>Kategori</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="w-[100px]">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {latestPackages.map((paket) => (
                                            <TableRow key={paket.id}>
                                                <TableCell className="font-medium">{paket.nama_paket}</TableCell>
                                                <TableCell>{paket.santri?.nama || '-'}</TableCell>
                                                <TableCell>{formatDate(paket.tanggal_diterima)}</TableCell>
                                                <TableCell>{paket.kategori?.nama_kategori || '-'}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            paket.status_paket === 'sudah_diambil'
                                                                ? 'outline'
                                                                : paket.isi_paket_disita
                                                                    ? 'destructive'
                                                                    : 'secondary'
                                                        }
                                                    >
                                                        {paket.status_paket === 'sudah_diambil'
                                                            ? 'Sudah Diambil'
                                                            : paket.isi_paket_disita
                                                                ? 'Disita'
                                                                : 'Belum Diambil'
                                                        }
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                                            <DropdownMenuItem>Detail</DropdownMenuItem>
                                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <Package className="h-12 w-12 text-muted-foreground" />
                                    <p className="mt-2 text-sm text-muted-foreground">Tidak ada paket baru</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
