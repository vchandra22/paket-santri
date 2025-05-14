import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Pencil, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Kategori Paket',
        href: '/kategori-paket',
    },
];

interface KategoriPaket {
    id: number;
    nama_kategori: string;
}

interface Props {
    kategori: KategoriPaket[];
    status?: string;
    success?: string;
    error?: string;
}

export default function KategoriPaketIndex({ kategori, status, success, error }: Props) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [kategoriToDelete, setKategoriToDelete] = useState<number | null>(null);

    if (status) {
        toast.success(status);
    }
    if (success) {
        toast.success(success);
    }
    if (error) {
        toast.error(error);
    }

    const handleDeleteClick = (id: number) => {
        setKategoriToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!kategoriToDelete) return;

        const toastId = toast.loading('Menghapus kategori paket...');

        router.delete(route('kategori_paket.destroy', kategoriToDelete), {
            onSuccess: () => {
                toast.success('Kategori paket berhasil dihapus', { id: toastId });
                setDeleteDialogOpen(false);
            },
            onError: (error) => {
                toast.error(`Gagal menghapus: ${error.message}`, { id: toastId });
                setDeleteDialogOpen(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kategori Paket" />
            <Toaster position="top-right" richColors />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Data Kategori Paket</h1>
                    <Button asChild>
                        <Link href={route('kategori_paket.create')}>Tambah Kategori</Link>
                    </Button>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                    <div>
                        <h4 className="mb-2 text-lg">Daftar Kategori Paket</h4>
                    </div>
                    <div>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">No</TableHead>
                                        <TableHead>Nama Kategori</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {kategori.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.nama_kategori}</TableCell>
                                            <TableCell className="space-x-2 text-right">
                                                <Button variant="link" size="sm">
                                                    <Pencil />
                                                    <Link href={route('kategori_paket.edit', item.id)}>Edit</Link>
                                                </Button>
                                                <Button variant="link" className="text-red-500 cursor-pointer" size="sm" onClick={() => handleDeleteClick(item.id)}>
                                                    <Trash />
                                                    Hapus
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>

                {/* Modal konfirmasi hapus */}
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Tindakan ini akan menghapus data kategori paket secara permanen dan tidak dapat dikembalikan.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/70 text-white">
                                Hapus
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
