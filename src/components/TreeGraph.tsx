"use client";

/**
 * TreeGraph.tsx
 * ------------------------
 * Displays a binary tree using ReactFlow.
 * Features:
 *  - Add referral modal with role check
 *  - Coloring nodes based on slot status
 *  - Proper refresh control after referral
 *  - Preserve node drag and zoom smoothly
 */

import React, { useEffect, useMemo, useState, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { baseApiURL } from "@/utils/constants";
import { ROLES } from "@/utils/roles";
import { hasRole } from "@/utils/roleUtils";

type Orientation = "vertical" | "horizontal";

interface TreeGraphProps {
  data: any;
  orientation?: Orientation;
  onHierarchyRefresh?: () => Promise<void>;
}

// 🔵 Node color logic
const getNodeColor = (leftOver: number) => {
  if (leftOver === 0) return "#22c55e";
  if (leftOver === 1) return "#facc15";
  return "#f87171";
};

/**
 * buildTreeLayout()
 * -----------------
 * Recursively builds nodes and edges.
 */
const buildTreeLayout = (
  node: any,
  x = 0,
  y = 0,
  depth = 0,
  spacing = 200,
  orientation: Orientation = "vertical"
): [Node[], Edge[]] => {
  const id = node.memberId;
  const color = getNodeColor(node.leftOverChildrenPosition);

  const position = orientation === "vertical" ? { x, y } : { x: y, y: x };

  const currentNode: Node = {
    id,
    type: "default",
    data: {
      label: (
        <div className="text-xs text-white text-center">
          <strong>{node.fullName}</strong>
          <br />
          <span className="text-[10px]">{node.memberId}</span>
        </div>
      ),
      ...node,
    },
    position,
    style: {
      padding: 10,
      borderRadius: 8,
      border: "2px solid #000",
      backgroundColor: color,
      fontSize: "0.75rem",
      minWidth: 150,
    },
    sourcePosition: orientation === "vertical" ? Position.Bottom : Position.Right,
    targetPosition: orientation === "vertical" ? Position.Top : Position.Left,
  };

  let allNodes: Node[] = [currentNode];
  let allEdges: Edge[] = [];

  node.children?.forEach((child: any, index: number) => {
    const offset = (index - (node.children.length - 1) / 2) * spacing;
    const childX = orientation === "vertical" ? x + offset : x + spacing;
    const childY = orientation === "vertical" ? y + spacing : y + offset;

    const [childNodes, childEdges] = buildTreeLayout(
      child,
      childX,
      childY,
      depth + 1,
      spacing * 0.8,
      orientation
    );

    allNodes = [...allNodes, ...childNodes];
    allEdges.push({
      id: `${id}->${child.memberId}`,
      source: id,
      target: child.memberId,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
    });
    allEdges = [...allEdges, ...childEdges];
  });

  return [allNodes, allEdges];
};

const TreeGraph: React.FC<TreeGraphProps> = ({
  data,
  orientation = "vertical",
  onHierarchyRefresh,
}) => {
  const { roles, isAuthReady } = useAuth();
  const authFetch = useAuthFetch();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [referralLevel, setReferralLevel] = useState("");
  const [newMemberId, setNewMemberId] = useState("");

  const previousData = useRef<any>(null); // 🧠 Save last hierarchy data

  /**
   * useEffect: Update nodes and edges ONLY if incoming data changed.
   */
  useEffect(() => {
    if (data && JSON.stringify(data) !== JSON.stringify(previousData.current)) {
      // 🔥 Only rebuild layout if data changed
      const [newNodes, newEdges] = buildTreeLayout(data, 0, 0, 0, 200, orientation);
      setNodes(newNodes);
      setEdges(newEdges);
      previousData.current = data;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, orientation]); // Only re-run if data OR orientation changes

  /**
   * handleNodeClick()
   * -----------------
   * Opens Add Referral modal if eligible.
   */
  const handleNodeClick = (_: any, node: Node) => {
    if (!isAuthReady) {
      alert("❗ Please wait, authentication still loading...");
      return;
    }
    if (node.data.leftOverChildrenPosition > 0) {
      if (hasRole(roles, ROLES.ADMIN_RW)) {
        setSelectedNode(node);
      } else {
        alert("❌ You are not authorized to add referrals.");
      }
    }
  };

  /**
   * handleSubmit()
   * --------------
   * Adds a new referral and triggers hierarchy refresh.
   */
  const handleSubmit = async () => {
    if (!referralLevel.trim() || !newMemberId.trim()) {
      alert("❌ Please enter referral level and new member ID.");
      return;
    }

    try {
      const res = await authFetch(`${baseApiURL}/addreferer`, {
        method: "POST",
        body: JSON.stringify({
          referrerId: selectedNode?.id,
          referralLevel,
          memberId: newMemberId,
        }),
      }, true);

      if (!res.ok) throw new Error("❌ Failed to add referer");

      alert("✅ Referral added successfully!");

      setSelectedNode(null);
      setReferralLevel("");
      setNewMemberId("");

      if (onHierarchyRefresh) {
        await onHierarchyRefresh();
      }
    } catch (err) {
      console.error("Add referer failed:", err);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <CardContent className="h-[600px] w-full relative">
      {/* 🧩 Tree Graph */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.5 }}
        className="bg-slate-50 border rounded-md"
      >
        <MiniMap zoomable pannable className="bg-white" />
        <Controls />
        <Background variant={"dots" as any} gap={12} size={1} />
      </ReactFlow>

      {/* 🟢 Legend */}
      <div className="absolute top-2 right-2 bg-white p-2 rounded shadow text-xs z-50">
        <p><span className="inline-block w-3 h-3 bg-red-400 mr-2 rounded-full"></span> 2 slots open</p>
        <p><span className="inline-block w-3 h-3 bg-yellow-300 mr-2 rounded-full"></span> 1 slot open</p>
        <p><span className="inline-block w-3 h-3 bg-green-500 mr-2 rounded-full"></span> Fully occupied</p>
      </div>

      {/* 🟠 Add Referral Modal */}
      {selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add Referral for {selectedNode.id}</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={selectedNode.id || ""}
                readOnly
                className="w-full border rounded p-2 bg-gray-100"
              />
              <input
                type="text"
                placeholder="Referral Level"
                value={referralLevel}
                onChange={(e) => setReferralLevel(e.target.value)}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                placeholder="New Member ID"
                value={newMemberId}
                onChange={(e) => setNewMemberId(e.target.value)}
                className="w-full border rounded p-2"
              />
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </CardContent>
  );
};

export default TreeGraph;
