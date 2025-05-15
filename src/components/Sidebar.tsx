"use client";

import { useAuth } from "@/context/AuthContext";
import { roleBasedRoutes } from "@/utils/rolesConfig";
import Link from "next/link";

export function Sidebar() {
  const { getRoles, isAuthReady } = useAuth();

  // Wait until AuthContext is ready
  if (!isAuthReady) {
    return <div>Loading...</div>;
  }

  // Get roles directly using the helper function
  const userRoles = getRoles?.() ?? [];

  // Filter routes based on user roles
  const accessibleRoutes = Object.entries(roleBasedRoutes).filter(
    ([, allowedRoles]) => allowedRoles.some((role) => userRoles.includes(role))
  );
  return (
    <aside className="w-64 bg-gray-800 text-white h-full">
      <nav className="p-4">
        <ul className="space-y-2">
          {accessibleRoutes.map(([path]) => (
            <li key={path}>
              <Link href={path} className="block p-2 rounded hover:bg-gray-700">
                {path.replace("/dashboard/", "").toUpperCase().replace("/", "")}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
