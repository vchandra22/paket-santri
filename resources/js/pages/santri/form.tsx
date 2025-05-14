import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast, Toaster } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Data Santri', href: '/santri' },
    { title: 'Form Santri', href: '#' },
];

interface Santri {
    id?: number;
    nis: string;
    nama_santri: string;
    alamat: string;
    asrama_id?: number;
    total_paket_diterima: number;
}

interface Props {
    santri?: Santri;
    asrama: Array<{ id: number; nama_asrama: string }>;
}

export default function SantriForm({ santri, asrama }: Props) {
    const isEditMode = !!santri?.nis;

    const { data, setData, post, put, processing, errors } = useForm<Santri>({
        nis: santri?.nis || '',
        nama_santri: santri?.nama_santri || '',
        alamat: santri?.alamat || '',
        asrama_id: santri?.asrama_id || undefined,
        total_paket_diterima: santri?.total_paket_diterima ?? 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                toast.success(`Data santri berhasil ${isEditMode ? 'diperbarui' : 'disimpan'}`);
            },
            onError: () => {
                toast.error(`Gagal ${isEditMode ? 'memperbarui' : 'menyimpan'} data santri`);
            }
        };

        if (isEditMode) {
            put(route('santri.update', santri.nis), options);
        } else {
            post(route('santri.store'), options);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? 'Edit Santri' : 'Tambah Santri'} />
            <Toaster position="top-right" richColors />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        {isEditMode ? 'Edit Data Santri' : 'Tambah Data Santri'}
                    </h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Data Santri</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="nis">NIS</Label>
                                    <Input
                                        id="nis"
                                        value={data.nis}
                                        onChange={(e) => setData('nis', e.target.value)}
                                        placeholder="Masukkan NIS santri"
                                        className={errors.nis ? 'border-red-500' : ''}
                                    />
                                    {errors.nis && <p className="text-sm text-red-500">{errors.nis}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nama_santri">Nama Santri</Label>
                                    <Input
                                        id="nama_santri"
                                        value={data.nama_santri}
                                        onChange={(e) => setData('nama_santri', e.target.value)}
                                        placeholder="Masukkan nama santri"
                                        className={errors.nama_santri ? 'border-red-500' : ''}
                                    />
                                    {errors.nama_santri && <p className="text-sm text-red-500">{errors.nama_santri}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="alamat">Alamat</Label>
                                    <Input
                                        id="alamat"
                                        value={data.alamat}
                                        onChange={(e) => setData('alamat', e.target.value)}
                                        placeholder="Masukkan alamat santri"
                                        className={errors.alamat ? 'border-red-500' : ''}
                                    />
                                    {errors.alamat && <p className="text-sm text-red-500">{errors.alamat}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="asrama_id">Asrama</Label>
                                    <Select
                                        value={data.asrama_id?.toString() || ''}
                                        onValueChange={(value) => setData('asrama_id', value ? parseInt(value) : undefined)}
                                    >
                                        <SelectTrigger className={errors.asrama_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih asrama" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {asrama.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.nama_asrama}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.asrama_id && <p className="text-sm text-red-500">{errors.asrama_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="total_paket_diterima">Total Paket Diterima</Label>
                                    <Input
                                        id="total_paket_diterima"
                                        type="number"
                                        value={data.total_paket_diterima}
                                        onChange={(e) => setData('total_paket_diterima', parseInt(e.target.value) || 0)}
                                        placeholder="0"
                                        className={errors.total_paket_diterima ? 'border-red-500' : ''}
                                    />
                                    {errors.total_paket_diterima && (
                                        <p className="text-sm text-red-500">{errors.total_paket_diterima}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Batal
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Menyimpan...' : isEditMode ? 'Perbarui' : 'Simpan'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
