import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
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
import { Badge } from '@/components/ui/badge';
import Can from '@/components/permission/Can';
import PermissionCheckbox from '@/components/permission/PermissionCheckbox';
import type { BreadcrumbItem } from '@/types';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
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
    roles: Role[];
    permissions: Permission[];
}

export default function Index({ auth, roles, permissions }: IndexProps) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
    const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        permissions: [] as number[],
    });

    const openCreateDialog = () => {
        reset();
        setIsCreateDialogOpen(true);
    };

    const openEditDialog = (role: Role) => {
        setData({
            name: role.name,
            permissions: role.permissions.map(p => p.id), // Changed from 'permission' to 'permissions'
        });
        setRoleToEdit(role);
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (role: Role) => {
        setRoleToDelete(role);
        setIsDeleteDialogOpen(true);
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.roles.store'), {
            onSuccess: () => {
                toast.success('Role created successfully');
                setIsCreateDialogOpen(false);
                reset();
            },
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!roleToEdit) return;

        put(route('admin.roles.update', roleToEdit.id), {
            onSuccess: () => {
                toast.success('Role updated successfully');
                setIsEditDialogOpen(false);
                reset();
            },
        });
    };

    const handleDelete = () => {
        if (!roleToDelete) return;

        router.delete(route('admin.roles.destroy', roleToDelete.id), {
            onSuccess: () => {
                toast.success('Role deleted successfully');
                setIsDeleteDialogOpen(false);
            },
        });
    };

    const handlePermissionChange = (selectedIds: number[]) => {
        setData('permissions', selectedIds);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Roles',
            href: '/admin/roles',
        },
    ];

    return (
        <AppLayout user={auth.user} breadcrumbs={breadcrumbs}>
            <Head title="Manage Roles" />
            <Toaster position="top-right" richColors />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="border border-slate-200 rounded-lg p-4 w-full">
                        <div className="flex flex-row items-center justify-between">
                            <h4 className="text-lg mb-2">Roles</h4>
                            <Can permission="role_create">
                                <Button onClick={openCreateDialog} className="flex items-center gap-1">
                                    <Plus className="h-4 w-4" />
                                    Add Role
                                </Button>
                            </Can>
                        </div>
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Permissions</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {roles.map((role) => (
                                        <TableRow key={role.id}>
                                            <TableCell>{role.id}</TableCell>
                                            <TableCell>{role.name}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {role.permissions.slice(0, 3).map((permission) => (
                                                        <Badge key={permission.id} variant="outline" className="mr-1">
                                                            {permission.name}
                                                        </Badge>
                                                    ))}
                                                    {role.permissions.length > 3 && (
                                                        <Badge variant="outline">
                                                            +{role.permissions.length - 3} more
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(role.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Can permission="role_edit">
                                                    <Button
                                                        onClick={() => openEditDialog(role)}
                                                        variant="link"
                                                        size="sm"
                                                        className="cursor-pointer"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                        Edit
                                                    </Button>
                                                </Can>
                                                <Can permission="role_delete">
                                                    <Button
                                                        onClick={() => openDeleteDialog(role)}
                                                        variant="link"
                                                        size="sm"
                                                        className="text-red-500 cursor-pointer"
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                        Delete
                                                    </Button>
                                                </Can>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Role Dialog */}
            <AlertDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <AlertDialogContent className="max-h-[52rem] overflow-y-auto max-w-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Buat Role Baru</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form onSubmit={handleCreate}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium">
                                Nama Role
                            </label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'border-red-500' : ''}
                                placeholder="Masukkan nama role baru"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Hak Akses
                            </label>
                            <div className="overflow-y-auto">
                                <PermissionCheckbox
                                    permissions={permissions}
                                    selectedPermissions={data.permissions}
                                    onChange={handlePermissionChange}
                                />
                            </div>
                            {errors.permissions && (
                                <p className="mt-1 text-sm text-red-500">{errors.permissions}</p>
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

            {/* Edit Role Dialog */}
            <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <AlertDialogContent className="max-h-[52rem] max-w-2xl overflow-y-auto">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Edit Role</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="edit-name" className="block text-sm font-medium">
                                Nama Role
                            </label>
                            <Input
                                id="edit-name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'border-red-500' : ''}
                                placeholder="Masukkan nama role baru"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Hak Akses
                            </label>
                            <div className="max-h-[300px] overflow-y-auto">
                                <PermissionCheckbox
                                    permissions={permissions}
                                    selectedPermissions={data.permissions}
                                    onChange={handlePermissionChange}
                                />
                            </div>
                            {errors.permissions && (
                                <p className="mt-1 text-sm text-red-500">{errors.permissions}</p>
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

            {/* Delete Role Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Role</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah anda yakin ingin menghapus role ini? Tindakan ini tidak dapat dibatalkan.
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
