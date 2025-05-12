"use client";
// import { initialNodes, initialEdges } from "./initialElements.js";
import ELK from "elkjs/lib/elk.bundled.js";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MiniMap,
  Controls,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Expand, Shrink, MoveVertical, MoveHorizontal } from "lucide-react";
// import { datahardcoded, getData } from "./utils.js";

import NodeSearchFocus from "./search";

const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
};

const getLayoutedElements = (nodes, edges, options = {}) => {
  const isHorizontal = options?.["elk.direction"] === "RIGHT";
  const graph = {
    id: "root",
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

function LayoutFlow({ initialNodes, initialEdges }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();
  const [direction, setDirection] = useState("DOWN");
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      setDirection(direction);
      const opts = { "elk.direction": direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;

      getLayoutedElements(ns, es, opts).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);
          fitView();
        }
      );
    },
    [nodes, edges]
  );

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout({ direction: "DOWN", useInitialNodes: true });
  }, []);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const elementRef = useRef(null);

  const toggleFullScreen = useCallback(() => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      elementRef.current?.requestFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  return (
    <div ref={elementRef} className="relative w-[100%] h-[100vh]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        style={{ backgroundColor: "#F7F9FB", width: "100%" }}
      >
        <Panel position="top-right">
          <div className="flex relative top-[0px]">
            <button
              className=" text-blue-500  z-10 bg-white border border-blue-500 rounded-md p-2 m-2"
              onClick={toggleFullScreen}
            >
              {isFullscreen ? (
                <Shrink className="h-4 w-4" />
              ) : (
                <Expand className="h-4 w-4" />
              )}
            </button>
            <button
              className=" text-blue-500  z-10 bg-white border border-blue-500 rounded-md p-2 m-2"
              onClick={() =>
                onLayout({ direction: direction === "DOWN" ? "RIGHT" : "DOWN" })
              }
            >
              {direction !== "DOWN" ? (
                <MoveVertical className="h-4 w-4" />
              ) : (
                <MoveHorizontal className="h-4 w-4" />
              )}
            </button>
          </div>
        </Panel>
        <Background />
        <MiniMap nodeStrokeWidth={3} pannable={true} zoomable={true} />
        <Controls />
        <NodeSearchFocus />
      </ReactFlow>
    </div>
  );
}

// export default () => (

//     <LayoutFlow />
//   </ReactFlowProvider>
// );
export default function MainFlow({ data }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  useEffect(() => {
    // getData(initialNodes, null, null);
    // console.log(getData(datahardcoded, null, null));
    resetGraph();
    const { nodes, edges } = getData(data, null, null);
    console.log(nodes, edges);
    setNodes(nodes);
    setEdges(edges);
  }, []);
  return (
    <div className="w-[100%] h-[100vh] bg-gray-100 dark:bg-gray-700">
      {nodes.length > 0 && (
        <ReactFlowProvider>
          <LayoutFlow initialNodes={nodes} initialEdges={edges} />
        </ReactFlowProvider>
      )}
    </div>
  );
}

////////////////////////////////////
export const datahardcoded = {
  memberId: "SPLNO4AA4O0000005",
  fullName: "John Doe5",
  leftOverChildrenPosition: 1,
  children: [
    {
      memberId: "SPLNO4AA4O0000006",
      fullName: "John Doe6",
      leftOverChildrenPosition: 1,
      children: [
        {
          memberId: "SPLNO4AA4O0000007",
          fullName: "John Doe7",
          leftOverChildrenPosition: 1,
          children: [
            {
              memberId: "SPLNO4AA4O0000008",
              fullName: "John Doe8",
              leftOverChildrenPosition: 1,
              children: [
                {
                  memberId: "SPLNO4AA4O0000009",
                  fullName: "John Doe9",
                  leftOverChildrenPosition: 1,
                  children: [
                    {
                      memberId: "SPLNO4AA4O0000010",
                      fullName: "John Doe10",
                      leftOverChildrenPosition: 1,
                      children: [
                        {
                          memberId: "O4AA4O3998722",
                          fullName: "Ramu",
                          leftOverChildrenPosition: 0,
                          children: [
                            {
                              memberId: "O4AA4O5518741",
                              fullName: "Prudhvi",
                              leftOverChildrenPosition: 0,
                              children: [
                                {
                                  memberId: "O4AA4O1034720",
                                  fullName: "prabhavathi",
                                  leftOverChildrenPosition: 2,
                                  children: [],
                                },
                                {
                                  memberId: "O4AA4O6759435",
                                  fullName: "khanna",
                                  leftOverChildrenPosition: 2,
                                  children: [],
                                },
                              ],
                            },
                            {
                              memberId: "O4AA4O6532727",
                              fullName: "Jyo",
                              leftOverChildrenPosition: 1,
                              children: [
                                {
                                  memberId: "O4AA4O1761931",
                                  fullName: "sarada",
                                  leftOverChildrenPosition: 2,
                                  children: [],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
const colors = {
  admin: "yellow",
  full: "red",
  hasGap: "green",
};
const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

let nodes: any = [];
let edges: any = [];
let parentCount = 0;
function resetGraph() {
  nodes = [];
  edges = [];
  parentCount = 0;
}
function insertNode(data: any, output = false) {
  nodes.push({
    id: data.memberId,
    data: {
      label: data.fullName,
      noOfChilds: data.children.length,
      isAdmin: data.memberId.indexOf("SPLNO4AA4") > -1,
    },
    type: parentCount == 0 ? "input" : output ? "output" : "",
    position,
    style: {
      backgroundColor:
        data.children.length == 2
          ? colors.full
          : data.memberId.indexOf("SPLNO4AA4") > -1
          ? colors.admin
          : colors.hasGap,
      color: data.memberId.indexOf("SPLNO4AA4") > -1 ? "" : "#ffffff",
    },
  });
  parentCount++;
}

function getData(node: any, source: any, target: any) {
  if (source) {
    edges.push({
      id: node.memberId,
      source,
      target,
      type: edgeType,
      animated: true,
    });
  }
  if (node.memberId) {
    insertNode(node, node.children && node.children.length == 0);
    if (node.children) {
      node.children.forEach((child) => {
        getData(child, node.memberId, child.memberId);
      });
    }
  }
  return { nodes, edges };
}
