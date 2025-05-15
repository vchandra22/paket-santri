import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast, Toaster } from 'sonner';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Paket',
        href: '/paket',
    },
    {
        title: 'Form Paket',
        href: '#',
    },
];

interface Santri {
    id: number;
    nama_santri: string;
    nis: string;
}

interface Kategori {
    id: number;
    nama_kategori: string;
}

interface Asrama {
    id: number;
    nama_asrama: string;
    gedung: string;
}

interface Paket {
    id?: number;
    nama_paket: string;
    tanggal_diterima: string;
    kategori_paket_id: number | null;
    penerima_paket_nis: string;
    asrama_id: number | null;
    pengirim_paket: string;
    isi_paket_disita: string;
    status_paket: string;
}

interface Props {
    paket?: Paket;
    santri: Santri[];
    kategori: Kategori[];
    asrama: Asrama[];
}

export default function PaketForm({ paket, santri, kategori, asrama }: Props) {
    const isEditMode = !!paket?.id;

    const { data, setData, post, put, processing, errors } = useForm<Paket>({
        nama_paket: paket?.nama_paket || '',
        tanggal_diterima: paket?.tanggal_diterima
            ? format(new Date(paket.tanggal_diterima), 'yyyy-MM-dd')
            : format(new Date(), 'yyyy-MM-dd'),
        kategori_paket_id: paket?.kategori_paket_id || null,
        penerima_paket_nis: paket?.penerima_paket_nis || '',
        asrama_id: paket?.asrama_id || null,
        pengirim_paket: paket?.pengirim_paket || '',
        isi_paket_disita: paket?.isi_paket_disita || '',
        status_paket: paket?.status_paket || 'belum diambil',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode) {
            put(route('paket.update', paket.id), {
                onSuccess: () => {
                    toast.success('Data paket berhasil diperbarui');
                },
                onError: () => {
                    toast.error('Gagal memperbarui data paket');
                }
            });
        } else {
            post(route('paket.store'), {
                onSuccess: () => {
                    toast.success('Data paket berhasil disimpan');
                },
                onError: () => {
                    toast.error('Gagal menyimpan data paket');
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? "Edit Paket" : "Tambah Paket"} />
            <Toaster position="top-right" richColors />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        {isEditMode ? 'Edit Paket' : 'Tambah Paket'}
                    </h1>
                </div>


                    <div>
                        <h4 className="text-lg">Form Paket</h4>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="nama_paket">Nama Paket</Label>
                                    <Input
                                        id="nama_paket"
                                        value={data.nama_paket}
                                        onChange={(e) => setData('nama_paket', e.target.value)}
                                        placeholder="Masukkan nama paket"
                                        className={errors.nama_paket ? 'border-red-500' : ''}
                                    />
                                    {errors.nama_paket && (
                                        <p className="text-sm text-red-500">
                                            {errors.nama_paket}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tanggal_diterima">Tanggal Diterima</Label>
                                    <Input
                                        id="tanggal_diterima"
                                        type="date"
                                        value={data.tanggal_diterima}
                                        onChange={(e) => setData('tanggal_diterima', e.target.value)}
                                        className={errors.tanggal_diterima ? 'border-red-500' : ''}
                                    />
                                    {errors.tanggal_diterima && (
                                        <p className="text-sm text-red-500">
                                            {errors.tanggal_diterima}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="kategori_paket_id">Kategori Paket</Label>
                                    <Select
                                        value={data.kategori_paket_id?.toString() || ''}
                                        onValueChange={(value) => setData('kategori_paket_id', parseInt(value))}
                                    >
                                        <SelectTrigger className={errors.kategori_paket_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih kategori paket" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {kategori.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.nama_kategori}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.kategori_paket_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.kategori_paket_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="penerima_paket_nis">Penerima Paket</Label>
                                    <Select
                                        value={data.penerima_paket_nis}
                                        onValueChange={(value) => setData('penerima_paket_nis', value)}
                                    >
                                        <SelectTrigger className={errors.penerima_paket_nis ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih penerima paket" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {santri.map((item) => (
                                                <SelectItem key={item.id} value={item.nis}>
                                                    {item.nama_santri} <span className="font-semibold">({item.nis})</span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.penerima_paket_nis && (
                                        <p className="text-sm text-red-500">
                                            {errors.penerima_paket_nis}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="asrama_id">Asrama</Label>
                                    <Select
                                        value={data.asrama_id?.toString() || ''}
                                        onValueChange={(value) => setData('asrama_id', parseInt(value))}
                                    >
                                        <SelectTrigger className={errors.asrama_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih asrama" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {asrama.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.nama_asrama} - {item.gedung}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.asrama_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.asrama_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="pengirim_paket">Pengirim Paket</Label>
                                    <Input
                                        id="pengirim_paket"
                                        value={data.pengirim_paket}
                                        onChange={(e) => setData('pengirim_paket', e.target.value)}
                                        placeholder="Masukkan nama pengirim"
                                        className={errors.pengirim_paket ? 'border-red-500' : ''}
                                    />
                                    {errors.pengirim_paket && (
                                        <p className="text-sm text-red-500">
                                            {errors.pengirim_paket}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status_paket">Status Paket</Label>
                                    <Select
                                        value={data.status_paket}
                                        onValueChange={(value) => setData('status_paket', value)}
                                    >
                                        <SelectTrigger className={errors.status_paket ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih status paket" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="belum diambil">Belum Diambil</SelectItem>
                                            <SelectItem value="diambil">Diambil</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status_paket && (
                                        <p className="text-sm text-red-500">
                                            {errors.status_paket}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="isi_paket_disita">Isi Paket Disita</Label>
                                    <Textarea
                                        id="isi_paket_disita"
                                        value={data.isi_paket_disita}
                                        onChange={(e) => setData('isi_paket_disita', e.target.value)}
                                        placeholder="Masukkan isi paket disita"
                                        className={errors.isi_paket_disita ? 'border-red-500' : ''}
                                    />
                                    {errors.isi_paket_disita && (
                                        <p className="text-sm text-red-500">
                                            {errors.isi_paket_disita}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-start space-x-2">
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
                    </div>
            </div>
        </AppLayout>
    );
}
