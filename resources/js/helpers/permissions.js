/**
 * Check if the user has the required permission
 *
 * @param {Object} user - The authenticated user
 * @param {String} permission - The permission to check
 * @returns {Boolean}
 */
export function hasPermission(user, permission) {
    if (!user) return false;

    // If user has roles with permissions
    if (user.roles && user.roles.length > 0) {
        return user.roles.some(role =>
            role.permissions && role.permissions.some(p => p.name === permission)
        );
    }

    // If user has permissions directly
    if (user.permissions && user.permissions.length > 0) {
        return user.permissions.some(p => p.name === permission);
    }

    return false;
}

/**
 * Check if the user has any of the required permissions
 *
 * @param {Object} user - The authenticated user
 * @param {Array} permissions - Array of permissions to check
 * @returns {Boolean}
 */
export function hasAnyPermission(user, permissions = []) {
    return permissions.some(permission => hasPermission(user, permission));
}

/**
 * Check if the user has the required role
 *
 * @param {Object} user - The authenticated user
 * @param {String} role - The role to check
 * @returns {Boolean}
 */
export function hasRole(user, role) {
    if (!user || !user.roles) return false;

    return user.roles.some(r => r.name === role);
}

/**
 * Check if the user has any of the required roles
 *
 * @param {Object} user - The authenticated user
 * @param {Array} roles - Array of roles to check
 * @returns {Boolean}
 */
export function hasAnyRole(user, roles = []) {
    return roles.some(role => hasRole(user, role));
}
