"use client";

/**
 * TotalMembersPage.tsx
 * ----------------------
 * This component fetches the full downliner hierarchy for the logged-in user
 * using the memberId from AuthContext and displays it via a binary tree
 * using the TreeGraph component.
 */

import { useEffect, useMemo, useState } from "react";
import TreeGraph from "@/components/TreeGraph";
import { useAuth } from "@/context/AuthContext";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, Download, Filter, Search } from "lucide-react";
import { baseApiURL } from "@/utils/constants";
export default function TotalMembersPage() {
  const { memberId, isAuthReady } = useAuth();
  const authFetch = useAuthFetch();
  const [hierarchyData, setHierarchyData] = useState<any | null>(null);
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">(
    "vertical"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "complete" | "partial" | "not-filled"
  >("all");

  /**
   * Fetch the downliner hierarchy when memberId becomes available
   */
  useEffect(() => {
    if (!isAuthReady || !memberId) return;
    console.log("member id:", memberId);
    const fetchHierarchy = async () => {
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
    };

    fetchHierarchy();
  }, [isAuthReady, memberId]);
  // 🔍 Recursive filter logic for search & status
  const filterHierarchy = (node: any): any | null => {
    const matchesSearch =
      node.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.fullName.toLowerCase().includes(searchTerm.toLowerCase());

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

    const shouldInclude = matchesSearch && matchesStatus;

    if (shouldInclude || (filteredChildren && filteredChildren.length > 0)) {
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Total Members Hierarchy</h1>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          {/* Optional filters or search */}
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 h-9 rounded-md border bg-background px-3 py-1 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* 🎨 Status Filter */}
            <select
              className="border h-9 rounded px-3 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">All</option>
              <option value="complete">Complete</option>
              <option value="partial">Partial</option>
              <option value="not-filled">Not Filled</option>
            </select>

            {/* ↕️ Orientation */}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setOrientation((prev) =>
                  prev === "vertical" ? "horizontal" : "vertical"
                )
              }
            >
              {orientation === "vertical" ? "🔁 Horizontal" : "↕️ Vertical"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {hierarchyData ? (
            <TreeGraph data={filteredTree} orientation={orientation} />
          ) : (
            <p className="text-gray-500 text-sm">
              Loading hierarchy or no matching results......
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
