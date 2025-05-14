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
import { Pen, Pencil, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Asrama',
        href: '/asrama',
    },
];

interface Asrama {
    id: number;
    nama_asrama: string;
    gedung: string;
}

interface Props {
    asrama: Asrama[];
    success?: string;
    error?: string;
}

export default function AsramaIndex({ asrama, success, error }: Props) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [asramaToDelete, setAsramaToDelete] = useState<number | null>(null);

    if (success) {
        toast.success(success);
    }
    if (error) {
        toast.error(error);
    }

    const handleDeleteClick = (id: number) => {
        setAsramaToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!asramaToDelete) return;

        const toastId = toast.loading('Menghapus asrama...');

        router.delete(route('asrama.destroy', asramaToDelete), {
            onSuccess: () => {
                toast.success('Asrama berhasil dihapus', { id: toastId });
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
            <Head title="Asrama" />
            <Toaster position="top-right" richColors />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Data Asrama</h1>
                    <Button asChild>
                        <Link href={route('asrama.create')}>Tambah Asrama</Link>
                    </Button>
                </div>

                <div className="border border-slate-200 rounded-xl p-4">
                    <div>
                        <h4 className="text-lg mb-2">Daftar Asrama</h4>
                    </div>
                    <div>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">No</TableHead>
                                        <TableHead>Nama Asrama</TableHead>
                                        <TableHead>Gedung</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {asrama.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.nama_asrama}</TableCell>
                                            <TableCell>{item.gedung}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button variant="link" size="sm">
                                                    <Pencil/>
                                                    <Link href={route('asrama.edit', item.id)}>
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
                                Tindakan ini akan menghapus data asrama secara permanen dan tidak dapat dikembalikan.
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
