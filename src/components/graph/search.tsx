import React, { useState } from "react";
import { useReactFlow } from "@xyflow/react";

const NodeSearchFocus = () => {
  const [query, setQuery] = useState("");
  const { getNodes, setCenter, setNodes } = useReactFlow();

  const handleSearch = () => {
    const nodes = getNodes();
    console.log(nodes);
    // Match by ID or by data.label (if your nodes use that)
    const node = nodes.find(
      (n) =>
        n.id.toLowerCase().includes(query.toLowerCase()) ||
        (n.data?.label &&
          n.data.label.toLowerCase().includes(query.toLowerCase()))
    );

    if (node) {
      const { x, y } = node.positionAbsolute || node.position;
      const width = node.width || 100;
      const height = node.height || 40;

      setCenter(x + width / 2, y + height / 2, {
        zoom: 1.5,
        duration: 800,
      });
      // Add highlight class
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id
            ? {
                ...n,
                className: "highlighted-node",
              }
            : n
        )
      );

      // Remove highlight class after 1 second
      setTimeout(() => {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === node.id
              ? {
                  ...n,
                  className: undefined,
                }
              : n
          )
        );
      }, 2000);
    } else {
      alert("Node not found!");
    }
  };

  return (
    <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
      <input
        type="text"
        placeholder="Search node by ID or label"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "5px", marginRight: "5px" }}
      />
      <button
        onClick={handleSearch}
        className=" text-blue-500  z-10 bg-white border border-blue-500 rounded-md p-2 m-2"
      >
        Go
      </button>
    </div>
  );
};

export default NodeSearchFocus;
