import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast, Toaster } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Kategori Paket',
        href: '/kategori_paket',
    },
    {
        title: 'Form Kategori Paket',
        href: '#',
    },
];

interface KategoriPaket {
    id?: number;
    nama_kategori: string;
}

interface Props {
    kategori?: KategoriPaket;
}

export default function KategoriPaketForm({ kategori }: Props) {
    const isEditMode = !!kategori?.id;

    const { data, setData, post, put, processing, errors } = useForm<KategoriPaket>({
        nama_kategori: kategori?.nama_kategori || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode) {
            put(route('kategori_paket.update', kategori.id), {
                onSuccess: () => {
                    toast.success('Data kategori paket berhasil diperbarui');
                },
                onError: () => {
                    toast.error('Gagal memperbarui data kategori paket');
                }
            });
        } else {
            post(route('kategori_paket.store'), {
                onSuccess: () => {
                    toast.success('Data kategori paket berhasil disimpan');
                },
                onError: () => {
                    toast.error('Gagal menyimpan data kategori paket');
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? "Edit Kategori Paket" : "Tambah Kategori Paket"} />
            <Toaster position="top-right" richColors />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        {isEditMode ? 'Edit Kategori Paket' : 'Tambah Kategori Paket'}
                    </h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Kategori Paket</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nama_kategori">Nama Kategori</Label>
                                    <Input
                                        id="nama_kategori"
                                        value={data.nama_kategori}
                                        onChange={(e) => setData('nama_kategori', e.target.value)}
                                        placeholder="Masukkan nama kategori paket"
                                        className={errors.nama_kategori ? 'border-red-500' : ''}
                                    />
                                    {errors.nama_kategori && (
                                        <p className="text-sm text-red-500">
                                            {errors.nama_kategori}
                                        </p>
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
