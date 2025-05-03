import { ROLES } from './roles';

/**
 * Centralized role-based route configuration.
 * This configuration maps routes to the roles that can access them.
 */
export const roleBasedRoutes: Record<string, string[]> = {
  '/dashboard': [ROLES.ADMIN_RW, ROLES.ADMIN_RO], // Admins can access the entire dashboard
  '/dashboard/my-account': [ ROLES.USER_RO,ROLES.ADMIN_RW,],
  '/dashboard/receive-help': [ ROLES.USER_RO,ROLES.ADMIN_RW,],
  '/dashboard/give-help': [ ROLES.USER_RO,ROLES.ADMIN_RW,],
  '/dashboard/total-members': [ROLES.ADMIN_RW, ROLES.ADMIN_RO],
  '/dashboard/change-password': [ ROLES.USER_RO,ROLES.ADMIN_RW,],
  '/dashboard/give-help-history': [ ROLES.USER_RO,ROLES.ADMIN_RW,],
  '/dashboard/receive-help-history': [ ROLES.USER_RO,ROLES.ADMIN_RW,],
  '/dashboard/recent-help': [ ROLES.USER_RO,ROLES.ADMIN_RW,],
  '/dashboard/terms': [ ROLES.USER_RO,ROLES.ADMIN_RW,],
};