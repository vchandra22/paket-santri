import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Role {
    id: number;
    name: string;
}

interface RoleCheckboxProps {
    roles: Role[];
    selectedRoles?: (Role | number)[];
    onChange: (selectedIds: number[]) => void;
}

export default function RoleCheckbox({
                                         roles,
                                         selectedRoles,
                                         onChange
                                     }: RoleCheckboxProps) {
    const [checkedRoles, setCheckedRoles] = useState<number[]>([]);

    useEffect(() => {
        if (selectedRoles) {
            setCheckedRoles(selectedRoles.map(role =>
                typeof role === 'number' ? role : role.id
            ));
        }
    }, [selectedRoles]);

    const handleRoleChange = (roleId: number, checked: boolean) => {
        let newCheckedRoles: number[];

        if (checked) {
            newCheckedRoles = [...checkedRoles, roleId];
        } else {
            newCheckedRoles = checkedRoles.filter(id => id !== roleId);
        }

        setCheckedRoles(newCheckedRoles);
        onChange(newCheckedRoles);
    };

    return (
        <div className="space-y-4">
            <div>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {roles.map((role) => (
                            <div key={role.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`role-${role.id}`}
                                    checked={checkedRoles.includes(role.id)}
                                    onCheckedChange={(checked) =>
                                        handleRoleChange(role.id, checked as boolean)
                                    }
                                />
                                <Label
                                    htmlFor={`role-${role.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {role.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
