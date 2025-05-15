import React, { useMemo, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
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
import { Edit, Pencil, Plus, Search, Trash } from 'lucide-react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Badge } from '@/components/ui/badge';
import Can from '@/components/permission/Can';
import RoleCheckbox from '@/components/permission/RoleCheckbox';
import type { BreadcrumbItem } from '@/types';

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
    created_at: string;
}

interface IndexProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    users: User[];
    roles: Role[];
}

export default function Index({ auth, users, roles }: IndexProps) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        if (!searchTerm) return users;

        const term = searchTerm.toLowerCase();
        return users.filter(user =>
            user.name.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term)
        );
    }, [users, searchTerm]);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [] as number[],
    });

    const openCreateDialog = () => {
        reset();
        setIsCreateDialogOpen(true);
    };

    const openEditDialog = (user: User) => {
        setData({
            name: user.name,
            email: user.email,
            password: '',
            password_confirmation: '',
            roles: user.roles.map(r => r.id),
        });
        setUserToEdit(user);
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (user: User) => {
        setUserToDelete(user);
        setIsDeleteDialogOpen(true);
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => {
                toast.success('User created successfully');
                setIsCreateDialogOpen(false);
                reset();
            },
            onError: () => {
                toast.error('Failed to create user');
            }
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userToEdit) return;

        put(route('admin.users.update', userToEdit.id), {
            onSuccess: () => {
                toast.success('User updated successfully');
                setIsEditDialogOpen(false);
                reset();
            },
            onError: () => {
                toast.error('Failed to update user');
            }
        });
    };

    const handleDelete = () => {
        if (!userToDelete) return;

        post(route('admin.users.destroy', userToDelete.id), {
            method: 'delete',
            onSuccess: () => {
                toast.success('User deleted successfully');
                setIsDeleteDialogOpen(false);
            },
            onError: () => {
                toast.error('Failed to delete user');
            }
        });
    };

    const handleRoleChange = (selectedIds: number[]) => {
        setData('roles', selectedIds);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'User Management',
            href: '/admin/users',
        },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs} user={auth.user}>
            <Head title="Data User" />
            <Toaster position="top-right" richColors />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Data User</h1>
                    <Can permission="user_create">
                        <Button onClick={openCreateDialog} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Tambahkan User Baru
                        </Button>
                    </Can>
                </div>

                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Cari nama user ..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="border border-slate-200 rounded-lg p-4 w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Roles</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {user.roles.map((role) => (
                                                <Badge key={role.id} variant="outline">
                                                    {role.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Can permission="user_edit">
                                            <Button
                                                onClick={() => openEditDialog(user)}
                                                variant="link"
                                                size="sm"
                                                className="cursor-pointer"
                                                disabled={user.id === auth.user.id}
                                            >
                                                <Pencil className="mr-1 h-4 w-4" />
                                                Edit
                                            </Button>
                                        </Can>
                                        <Can permission="user_delete">
                                            <Button
                                                onClick={() => openDeleteDialog(user)}
                                                variant="link"
                                                size="sm"
                                                className="text-red-500"
                                                disabled={user.id === auth.user.id}
                                            >
                                                <Trash className="h-4 w-4" />
                                                Delete
                                            </Button>
                                        </Can>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {users.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6">
                                        No users found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <AlertDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <AlertDialogContent className="max-w-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Buat User Baru</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form onSubmit={handleCreate}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    Nama Lengkap
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={errors.name ? 'border-red-500' : ''}
                                    placeholder="Masukkan nama lengkap"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={errors.email ? 'border-red-500' : ''}
                                    placeholder="Masukkan alamat email"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-1">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={errors.password ? 'border-red-500' : ''}
                                    placeholder="Enter password"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium mb-1">
                                    Konfirmasi Password
                                </label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className={errors.password_confirmation ? 'border-red-500' : ''}
                                    placeholder="Konfirmasi password"
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-1 text-sm text-red-500">{errors.password_confirmation}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Roles
                                </label>
                                <div className="overflow-y-auto p-2">
                                    <RoleCheckbox
                                        roles={roles}
                                        selectedRoles={data.roles}
                                        onChange={handleRoleChange}
                                    />
                                </div>
                                {errors.roles && (
                                    <p className="mt-1 text-sm text-red-500">{errors.roles}</p>
                                )}
                            </div>
                        </div>

                        <AlertDialogFooter className="mt-6">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create User'}
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <AlertDialogContent className="max-w-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Edit User</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form onSubmit={handleUpdate}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="edit-name" className="block text-sm font-medium mb-1">
                                    Nama Lengkap
                                </label>
                                <Input
                                    id="edit-name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={errors.name ? 'border-red-500' : ''}
                                    placeholder="Masukkan nama lengkap"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="edit-email" className="block text-sm font-medium mb-1">
                                    Email
                                </label>
                                <Input
                                    id="edit-email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={errors.email ? 'border-red-500' : ''}
                                    placeholder="Masukkan alamat email"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="edit-password" className="block text-sm font-medium mb-1">
                                    Password Baru (Kosongkan jika tidak ingin mengubah password)
                                </label>
                                <Input
                                    id="edit-password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={errors.password ? 'border-red-500' : ''}
                                    placeholder="Enter new password"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="edit-password_confirmation" className="block text-sm font-medium mb-1">
                                    Konfirmasi Password Baru
                                </label>
                                <Input
                                    id="edit-password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className={errors.password_confirmation ? 'border-red-500' : ''}
                                    placeholder="Konfirmasi password baru"
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-1 text-sm text-red-500">{errors.password_confirmation}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Roles
                                </label>
                                <div className="overflow-y-auto p-2">
                                    <RoleCheckbox
                                        roles={roles}
                                        selectedRoles={data.roles}
                                        onChange={handleRoleChange}
                                    />
                                </div>
                                {errors.roles && (
                                    <p className="mt-1 text-sm text-red-500">{errors.roles}</p>
                                )}
                            </div>
                        </div>

                        <AlertDialogFooter className="mt-6">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update User'}
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete User</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete the user "{userToDelete?.name}"? This action cannot be undone.
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
        </AppSidebarLayout>
    );
}
