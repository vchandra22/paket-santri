import { useState, useEffect } from 'react';
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
        title: 'Asrama',
        href: '/asrama',
    },
    {
        title: 'Form Asrama',
        href: '#',
    },
];

interface Asrama {
    id?: number;
    nama_asrama: string;
    gedung: string;
}

interface Props {
    asrama?: Asrama;
}

export default function AsramaForm({ asrama }: Props) {
    const isEditMode = !!asrama?.id;

    const { data, setData, post, put, processing, errors } = useForm<Asrama>({
        nama_asrama: asrama?.nama_asrama || '',
        gedung: asrama?.gedung || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode) {
            put(route('asrama.update', asrama.id), {
                onSuccess: () => {
                    toast.success('Data asrama berhasil diperbarui');
                },
                onError: () => {
                    toast.error('Gagal memperbarui data asrama');
                }
            });
        } else {
            post(route('asrama.store'), {
                onSuccess: () => {
                    toast.success('Data asrama berhasil disimpan');
                },
                onError: () => {
                    toast.error('Gagal menyimpan data asrama');
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? "Edit Asrama" : "Tambah Asrama"} />
            <Toaster position="top-right" richColors />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        {isEditMode ? 'Edit Data Asrama' : 'Tambah Data Asrama'}
                    </h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Asrama</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nama_asrama">Nama Asrama</Label>
                                    <Input
                                        id="nama_asrama"
                                        value={data.nama_asrama}
                                        onChange={(e) => setData('nama_asrama', e.target.value)}
                                        placeholder="Masukkan nama asrama"
                                        className={errors.nama_asrama ? 'border-red-500' : ''}
                                    />
                                    {errors.nama_asrama && (
                                        <p className="text-sm text-red-500">
                                            {errors.nama_asrama}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gedung">Gedung</Label>
                                    <Input
                                        id="gedung"
                                        value={data.gedung}
                                        onChange={(e) => setData('gedung', e.target.value)}
                                        placeholder="Masukkan nama gedung"
                                        className={errors.gedung ? 'border-red-500' : ''}
                                    />
                                    {errors.gedung && (
                                        <p className="text-sm text-red-500">
                                            {errors.gedung}
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
