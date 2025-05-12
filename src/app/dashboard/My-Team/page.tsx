"use client";

/**
 * TotalMembersPage.tsx
 * ----------------------
 * Displays the total downliner hierarchy for a logged-in user
 * with search, filter, and role-based access control.
 */

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
// import TreeGraph from "@/components/TreeGraph";
import Flow from "@/components/graph/view";
import { useAuth } from "@/context/AuthContext";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { hasAnyRole } from "@/utils/roleUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, Search } from "lucide-react";
import { baseApiURL } from "@/utils/constants";
import { ROLES } from "@/utils/roles";

export default function MyTeamsPage() {
  const { memberId, isAuthReady, roles, logout } = useAuth();
  const router = useRouter();
  const authFetch = useAuthFetch();

  const [hierarchyData, setHierarchyData] = useState<any | null>(null);
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">(
    "vertical"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "complete" | "partial" | "not-filled"
  >("all");
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);

  /**
   * Fetch hierarchy data from backend.
   */
  const fetchHierarchy = useCallback(async () => {
    if (!memberId) return;
    try {
      const res = await authFetch(
        `${baseApiURL}/${memberId}/downlinerHierarchy`,
        {},
        true
      );
      const data = await res.json();
      setHierarchyData(data);
    } catch (err) {
      console.error("❌ Failed to fetch hierarchy:", err);
    }
  }, [memberId]);

  /**
   * Check user authorization.
   */
  useEffect(() => {
    if (isAuthReady && !hasAnyRole(roles, [ROLES.ADMIN_RW, ROLES.USER_RO])) {
      setShowUnauthorizedModal(true);
    }
  }, [isAuthReady, roles]);

  /**
   * Fetch hierarchy after authentication is ready.
   */
  useEffect(() => {
    if (isAuthReady && memberId) {
      fetchHierarchy();
    }
  }, [isAuthReady, memberId, fetchHierarchy]);

  /**
   * Handle user logout.
   */
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  /**
   * Apply search and status filters recursively.
   */
  const filterHierarchy = (node: any): any | null => {
    const matchesSearch =
      node.memberId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      node.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;

    const status =
      node.leftOverChildrenPosition === 0
        ? "complete"
        : node.leftOverChildrenPosition === 2
        ? "not-filled"
        : "partial";

    const matchesStatus = statusFilter === "all" || statusFilter === status;

    const filteredChildren = node.children
      ?.map(filterHierarchy)
      .filter((child: any) => child !== null);

    if (
      (matchesSearch && matchesStatus) ||
      (filteredChildren && filteredChildren.length > 0)
    ) {
      return { ...node, children: filteredChildren || [] };
    }

    return null;
  };

  const filteredTree = useMemo(() => {
    if (!hierarchyData) return null;
    return filterHierarchy(hierarchyData);
  }, [hierarchyData, searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Unauthorized Modal */}
      {showUnauthorizedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Unauthorized Access</h2>
            <p className="mb-4">You are not authorized to view this page.</p>
            <div className="flex justify-center space-x-4">
              <Button variant="destructive" onClick={handleLogout}>
                Yes, Logout
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowUnauthorizedModal(false)}
              >
                No, Stay
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Team Hierarchy</h1>
        {/* <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button> */}
      </div>

      {/* Tree Graph */}
      <Card>
        <CardContent style={{ backgroundColor: "#F7F9FB" }}>
          {hierarchyData ? (
            // <TreeGraph
            //   data={filteredTree}
            //   orientation={orientation}
            //   onHierarchyRefresh={fetchHierarchy}
            // />
            <Flow data={hierarchyData} />
          ) : (
            <p className="text-gray-500 text-sm">
              Loading hierarchy or no matching results...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
