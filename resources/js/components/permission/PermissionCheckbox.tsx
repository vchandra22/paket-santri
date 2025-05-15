import React, { useState, useEffect, JSX } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Permission {
    id: number;
    name: string;
}

interface PermissionCheckboxProps {
    permissions: Permission[];
    selectedPermissions?: (Permission | number)[];
    onChange: (selectedIds: number[]) => void;
}

export default function PermissionCheckbox({
                                               permissions,
                                               selectedPermissions,
                                               onChange
                                           }: PermissionCheckboxProps): JSX.Element {
    const [checkedPermissions, setCheckedPermissions] = useState<number[]>([]);

    useEffect(() => {
        if (selectedPermissions) {
            setCheckedPermissions(selectedPermissions.map(permission =>
                typeof permission === 'number' ? permission : permission.id
            ));
        }
    }, [selectedPermissions]);

    // Group permissions by prefix
    const groupedPermissions: Record<string, Permission[]> = permissions.reduce((groups, permission) => {
        const prefix = permission.name.split('_')[0];
        if (!groups[prefix]) {
            groups[prefix] = [];
        }
        groups[prefix].push(permission);
        return groups;
    }, {} as Record<string, Permission[]>);

    return (
        <div className="space-y-6">
            {Object.entries(groupedPermissions).map(([group, perms]) => (
                <div key={group} className="py-2 rounded-lg">
                    <div className="pb-3">
                        <h4 className="text-md font-medium capitalize">{group}</h4>
                    </div>
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {perms.map((permission) => (
                                <div key={permission.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`permission-${permission.id}`}
                                        value={permission.id.toString()}
                                        checked={checkedPermissions.includes(permission.id)}
                                        onCheckedChange={(checked) => {
                                            const permissionId = permission.id;
                                            let newCheckedPermissions: number[];

                                            if (checked) {
                                                newCheckedPermissions = [...checkedPermissions, permissionId];
                                            } else {
                                                newCheckedPermissions = checkedPermissions.filter(id => id !== permissionId);
                                            }

                                            setCheckedPermissions(newCheckedPermissions);
                                            onChange(newCheckedPermissions);
                                        }}
                                    />
                                    <Label
                                        htmlFor={`permission-${permission.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {permission.name.split('_')[1]}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
