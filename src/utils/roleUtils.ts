/**
 * roleUtils.ts
 * ------------
 * Utility functions for handling role-based access control (RBAC).
 */

/**
 * hasRole()
 * ---------
 * Checks if the user has a specific role.
 */
export const hasRole = (roles: string[], role: string): boolean => {
    return roles.includes(role);
  };
  
  /**
   * hasAnyRole()
   * ------------
   * Checks if the user has any role from a given list.
   */
  export const hasAnyRole = (roles: string[], allowedRoles: string[]): boolean => {
    return roles.some(role => allowedRoles.includes(role));
  };
  