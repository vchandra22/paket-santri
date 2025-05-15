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
import { useMemo, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Pencil, Search, Trash } from 'lucide-react';
import Can from '@/components/permission/Can';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Data Santri',
        href: '/santri',
    },
];

interface Santri {
    id: number;
    nama_santri: string;
    nis: string;
    total_paket_diterima: string;
    asrama: {
        nama_asrama: string;
    } | null;
}

interface Props {
    santris: Santri[];
    status?: string;
    success?: string;
    error?: string;
}

export default function SantriIndex({ santris, status, success, error }: Props) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [santriToDelete, setSantriToDelete] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSantris = useMemo(() => {
        if (!searchTerm) return santris;

        const term = searchTerm.toLowerCase();
        return santris.filter(santri =>
            santri.nama_santri.toLowerCase().includes(term) ||
            santri.nis.toLowerCase().includes(term) ||
            (santri.asrama?.nama_asrama || '').toLowerCase().includes(term)
        );
    }, [santris, searchTerm]);

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
        setSantriToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!santriToDelete) return;

        const toastId = toast.loading('Menghapus data santri...');

        router.delete(route('santri.destroy', santriToDelete), {
            onSuccess: () => {
                toast.success('Data santri berhasil dihapus', { id: toastId });
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
            <Head title="Data Santri" />
            <Toaster position="top-right" richColors />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Data Santri</h1>
                    <div className="flex justify-end gap-4">
                        <Can permission="santri_export">
                            <a
                                href={route('santri.export')}
                                className="bg-green-700 hover:bg-green-700/90 text-primary-foreground rounded-sm shadow-xs text-sm font-medium h-9 px-4 py-2 has-[>svg]:px-3"
                            >
                                Export to Excel
                            </a>
                        </Can>
                        <Can permission="santri_create">
                            <Button asChild>
                                <Link href={route('santri.create')}>Tambah Santri</Link>
                            </Button>
                        </Can>
                    </div>
                </div>

                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Cari santri (nama, NIS, atau asrama)..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                    <div>
                        <h4 className="mb-2 text-lg">Daftar Santri</h4>
                    </div>
                    <div>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">No</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>NIS</TableHead>
                                        <TableHead>Asrama</TableHead>
                                        <TableHead>Total Paket</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <Can permission="santri_view">
                                        {filteredSantris.map((santri, index) => (
                                            <TableRow key={santri.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{santri.nama_santri}</TableCell>
                                                <TableCell>{santri.nis}</TableCell>
                                                <TableCell>{santri.asrama?.nama_asrama || '-'}</TableCell>
                                                <TableCell>{santri.total_paket_diterima || '-'}</TableCell>
                                                <TableCell className="space-x-2 text-right">
                                                    <Can permission="santri_edit">
                                                        <Button variant="link" size="sm">
                                                            <Pencil/>
                                                            <Link href={route('santri.edit', { santri: santri.nis })}>Edit</Link>
                                                        </Button>
                                                    </Can>
                                                    <Can permission="santri_delete">
                                                        <Button variant="link" size="sm" className="text-red-500 cursor-pointer" onClick={() => handleDeleteClick(santri.nis)}>
                                                            <Trash /> Hapus
                                                        </Button>
                                                    </Can>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </Can>
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
                                Tindakan ini akan menghapus data santri secara permanen dan tidak dapat dikembalikan.
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
