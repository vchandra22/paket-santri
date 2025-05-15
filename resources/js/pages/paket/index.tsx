import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast, Toaster } from 'sonner';
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
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Paket',
        href: '/paket',
    },
];

interface Santri {
    id: number;
    nama: string;
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
    id: number;
    nama_paket: string;
    tanggal_diterima: string;
    kategori_paket_id: number;
    penerima_paket_nis: string;
    asrama_id: number;
    pengirim_paket: string;
    isi_paket_disita: boolean;
    status_paket: string;
    santri?: Santri;
    kategori?: Kategori;
    asrama?: Asrama;
}

interface Props {
    paket: Paket[];
    status?: string;
    success?: string;
    error?: string;
}

export default function PaketIndex({ paket, status, success, error }: Props) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [paketToDelete, setPaketToDelete] = useState<number | null>(null);

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
        setPaketToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!paketToDelete) return;

        const toastId = toast.loading('Menghapus data paket...');

        router.delete(route('paket.destroy', paketToDelete), {
            onSuccess: () => {
                toast.success('Data paket berhasil dihapus', { id: toastId });
                setDeleteDialogOpen(false);
            },
            onError: (error) => {
                toast.error(`Gagal menghapus: ${error.message}`, { id: toastId });
                setDeleteDialogOpen(false);
            },
        });
    };

    const renderStatus = (status: string) => {
        switch (status.toLowerCase()) {
            case 'diterima':
                return <Badge className="bg-green-500">Diterima</Badge>;
            case 'menunggu':
                return <Badge className="bg-yellow-500">Menunggu</Badge>;
            case 'diambil':
                return <Badge className="bg-blue-500">Diambil</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Paket" />
            <Toaster position="top-right" richColors />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Data Paket</h1>
                    <div className="flex justify-end gap-4">
                        <a
                            href={route('paket.export')}
                            className="bg-green-700 hover:bg-green-700/90 text-primary-foreground rounded-sm shadow-xs text-sm font-medium h-9 px-4 py-2 has-[>svg]:px-3"
                        >
                            Export to Excel
                        </a>
                        <Button asChild>
                            <Link href={route('paket.create')}>Tambah Paket</Link>
                        </Button>
                    </div>
                </div>

            <div className="border border-slate-200 rounded-xl p-4">
                    <div>
                        <h4 className="text-lg mb-2">Daftar Paket</h4>
                    </div>
                    <div>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">No</TableHead>
                                        <TableHead>Nama Paket</TableHead>
                                        <TableHead>Penerima</TableHead>
                                        <TableHead>Kategori</TableHead>
                                        <TableHead>Asrama</TableHead>
                                        <TableHead>Tanggal Diterima</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paket.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.nama_paket}</TableCell>
                                            <TableCell>{item.santri?.nama_santri || '-'}</TableCell>
                                            <TableCell>{item.kategori?.nama_kategori || '-'}</TableCell>
                                            <TableCell>{item.asrama?.nama_asrama || '-'}</TableCell>
                                            <TableCell>{new Date(item.tanggal_diterima).toLocaleDateString('id-ID')}</TableCell>
                                            <TableCell>{renderStatus(item.status_paket)}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button variant="link" size="sm">
                                                    <Pencil/>
                                                    <Link href={route('paket.edit', item.id)}>
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="text-red-500 cursor-pointer"
                                                    onClick={() => handleDeleteClick(item.id)}
                                                >
                                                    <Trash/>
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
                                Tindakan ini akan menghapus data paket secara permanen dan tidak dapat dikembalikan.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteConfirm}
                                className="bg-destructive text-white hover:bg-destructive/70"
                            >
                                Hapus
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
