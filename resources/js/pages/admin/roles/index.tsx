import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import Can from '@/components/permission/Can';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permission: Permission[];
    created_at: string;
    updated_at: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    // Add other properties as needed
}

interface IndexProps {
    auth: {
        user: User;
    };
    roles: Role[];
}

export default function Index({ auth, roles }: IndexProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

    const openDeleteDialog = (role: Role) => {
        setRoleToDelete(role);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (!roleToDelete) return;

        post(route('admin.roles.destroy', roleToDelete.id), {
            method: 'delete',
            onSuccess: () => {
                toast.success('Role deleted successfully');
                setIsDeleteDialogOpen(false);
            },
        });
    };

    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight">Manage Roles</h2>}
        >
            <Head title="Manage Roles" />
            <Toaster position="top-right" richColors />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Roles</CardTitle>
                            <Can permission="role_create">
                                <Button asChild className="flex items-center gap-1">
                                    <Link href={route('admin.roles.create')}>
                                        <Plus className="h-4 w-4" />
                                        Add Role
                                    </Link>
                                </Button>
                            </Can>
                        </CardHeader>
                        <CardContent>
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
                                                    {role.permission.slice(0, 3).map((permission) => (
                                                        <Badge key={permission.id} variant="outline" className="mr-1">
                                                            {permission.name}
                                                        </Badge>
                                                    ))}
                                                    {role.permission.length > 3 && (
                                                        <Badge variant="outline">
                                                            +{role.permission.length - 3} more
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
                                                        asChild
                                                        variant="outline"
                                                        size="sm"
                                                        className="inline-flex items-center gap-1"
                                                    >
                                                        <Link href={route('admin.roles.edit', role.id)}>
                                                            <Edit className="h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                </Can>
                                                <Can permission="role_delete">
                                                    <Button
                                                        onClick={() => openDeleteDialog(role)}
                                                        variant="destructive"
                                                        size="sm"
                                                        className="inline-flex items-center gap-1"
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
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Delete Role Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Role</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete the role "{roleToDelete?.name}"? This action cannot be undone.
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
