import React, { JSX } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PermissionCheckbox from '@/components/permission/PermissionCheckbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import AppLayout from '@/layouts/app-layout';

interface Permission {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    // Add other properties as needed
}

interface CreateProps {
    auth: {
        user: User;
    };
    permissions: Permission[];
}

interface FormData {
    name: string;
    permissions: number[];
}

export default function Create({ auth, permissions }: CreateProps): JSX.Element {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        name: '',
        permissions: [],
    });

    const handlePermissionsChange = (selectedPermissions: number[]) => {
        setData('permissions', selectedPermissions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.roles.store'));
    };

    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight">Create Role</h2>}
        >
            <Head title="Create Role" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Role</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <FormField
                                    name="name"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Role Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="Enter role name"
                                                    required
                                                />
                                            </FormControl>
                                            {errors.name && <FormMessage>{errors.name}</FormMessage>}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="permissions"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Permissions</FormLabel>
                                            <FormControl>
                                                <PermissionCheckbox
                                                    permissions={permissions}
                                                    selectedPermissions={data.permissions}
                                                    onChange={handlePermissionsChange}
                                                />
                                            </FormControl>
                                            {errors.permissions && <FormMessage>{errors.permissions}</FormMessage>}
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={processing}>
                                        Create Role
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
