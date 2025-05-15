import React, { ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import { hasPermission, hasRole } from '@/helpers/permissions';

interface CanProps {
    permission?: string;
    role?: string;
    not?: boolean;
    fallback?: ReactNode;
    children: ReactNode;
}

interface User {
    id: number;
    permissions?: Array<{ id: number; name: string }>;
    roles?: Array<{ id: number; name: string }>;
    // Add other user properties as needed
}

interface PageProps {
    auth: {
        user: User | null;
    };
}

/**
 * Component to conditionally render children based on user permissions
 *
 * @param permission - The permission to check
 * @param role - The role to check
 * @param not - Invert the condition check
 * @param fallback - Content to render if condition fails
 * @param children - Content to render if condition passes
 */
export default function Can({
                                permission,
                                role,
                                not = false,
                                fallback = null,
                                children
                            }: CanProps): ReactNode {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    // Not logged in
    if (!user) {
        return not ? children : fallback;
    }

    // Check permission
    if (permission) {
        const hasRequiredPermission = hasPermission(user, permission);
        return (not ? !hasRequiredPermission : hasRequiredPermission) ? children : fallback;
    }

    // Check role
    if (role) {
        const hasRequiredRole = hasRole(user, role);
        return (not ? !hasRequiredRole : hasRequiredRole) ? children : fallback;
    }

    // Default: no condition specified
    return children;
}
