import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
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
import { toast, Toaster } from 'sonner';
import { Edit, Plus, Trash } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Permission {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface IndexProps {
    auth: {
        user: User;
    };
    permissions: Permission[];
}

export default function Index({ auth, permissions }: IndexProps) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [permissionToEdit, setPermissionToEdit] = useState<Permission | null>(null);
    const [permissionToDelete, setPermissionToDelete] = useState<Permission | null>(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
    });

    const openCreateDialog = () => {
        reset();
        setIsCreateDialogOpen(true);
    };

    const openEditDialog = (permission: Permission) => {
        setData('name', permission.name);
        setPermissionToEdit(permission);
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (permission: Permission) => {
        setPermissionToDelete(permission);
        setIsDeleteDialogOpen(true);
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.permissions.store'), {
            onSuccess: () => {
                toast.success('Permission created successfully');
                setIsCreateDialogOpen(false);
                reset();
            },
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!permissionToEdit) return;

        put(route('admin.permissions.update', permissionToEdit.id), {
            onSuccess: () => {
                toast.success('Permission updated successfully');
                setIsEditDialogOpen(false);
                reset();
            },
        });
    };

    const handleDelete = () => {
        if (!permissionToDelete) return;

        post(route('admin.permissions.destroy', permissionToDelete.id), {
            method: 'delete',
            onSuccess: () => {
                toast.success('Permission deleted successfully');
                setIsDeleteDialogOpen(false);
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Hak Akses',
            href: '/admin/permissions',
        },
    ];

    return (
        <AppLayout user={auth.user} breadcrumbs={breadcrumbs}>
            <Head title="Hak Akses" />
            <Toaster position="top-right" richColors />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="border border-slate-200 rounded-lg p-4 w-full">
                        <div className="flex flex-row items-center justify-between">
                            <h4 className="text-lg mb-2">Hak Akses</h4>
                            <Button onClick={openCreateDialog} className="flex items-center gap-1">
                                <Plus className="h-4 w-4" />
                                Tambahkan hak Akses
                            </Button>
                        </div>
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {permissions.map((permission) => (
                                        <TableRow key={permission.id}>
                                            <TableCell>{permission.id}</TableCell>
                                            <TableCell>{permission.name}</TableCell>
                                            <TableCell>
                                                {new Date(permission.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button
                                                    onClick={() => openEditDialog(permission)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="inline-flex items-center gap-1"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() => openDeleteDialog(permission)}
                                                    variant="destructive"
                                                    size="sm"
                                                    className="inline-flex items-center gap-1"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Permission Dialog */}
            <AlertDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Create New Permission</AlertDialogTitle>
                        <AlertDialogDescription>
                            Enter the name for the new permission.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <form onSubmit={handleCreate}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium">
                                Permission Name
                            </label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'border-red-500' : ''}
                                placeholder="Enter permission name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create'}
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>

            {/* Edit Permission Dialog */}
            <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Edit Permission</AlertDialogTitle>
                        <AlertDialogDescription>
                            Update the permission details.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="edit-name" className="block text-sm font-medium">
                                Permission Name
                            </label>
                            <Input
                                id="edit-name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'border-red-500' : ''}
                                placeholder="Enter permission name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update'}
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Permission Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Permission</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this permission? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
