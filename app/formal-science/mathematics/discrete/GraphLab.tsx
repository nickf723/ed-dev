"use client";

import { useState } from "react";
import { CirclePlus, GitBranch, Link2, RotateCcw, Trash2 } from "lucide-react";

type GraphNode = {
  id: number;
  x: number;
  y: number;
};

type GraphEdge = {
  source: number;
  target: number;
};

type GraphPreset = {
  id: "triangle" | "path" | "star";
  label: string;
  note: string;
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
};

const PRESETS: readonly GraphPreset[] = [
  {
    id: "triangle",
    label: "Triangle",
    note: "Every vertex has degree 2.",
    nodes: [
      { id: 1, x: 26, y: 25 },
      { id: 2, x: 74, y: 25 },
      { id: 3, x: 50, y: 74 },
    ],
    edges: [
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 1 },
    ],
  },
  {
    id: "path",
    label: "Path",
    note: "The two endpoints have degree 1.",
    nodes: [
      { id: 1, x: 14, y: 50 },
      { id: 2, x: 38, y: 28 },
      { id: 3, x: 62, y: 70 },
      { id: 4, x: 86, y: 46 },
    ],
    edges: [
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 4 },
    ],
  },
  {
    id: "star",
    label: "Star",
    note: "One hub has degree 4.",
    nodes: [
      { id: 1, x: 50, y: 50 },
      { id: 2, x: 50, y: 14 },
      { id: 3, x: 84, y: 50 },
      { id: 4, x: 50, y: 86 },
      { id: 5, x: 16, y: 50 },
    ],
    edges: [
      { source: 1, target: 2 },
      { source: 1, target: 3 },
      { source: 1, target: 4 },
      { source: 1, target: 5 },
    ],
  },
] as const;

const ADDITION_POINTS = [
  { x: 18, y: 20 },
  { x: 50, y: 18 },
  { x: 82, y: 22 },
  { x: 22, y: 52 },
  { x: 50, y: 50 },
  { x: 78, y: 54 },
  { x: 18, y: 82 },
  { x: 50, y: 80 },
  { x: 82, y: 80 },
] as const;

function clonePreset(preset: GraphPreset) {
  return {
    nodes: preset.nodes.map((node) => ({ ...node })),
    edges: preset.edges.map((edge) => ({ ...edge })),
  };
}

function graphIsConnected(
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[]
) {
  if (nodes.length === 0) return false;
  if (nodes.length === 1) return true;

  const adjacency = new Map<number, number[]>();
  for (const node of nodes) adjacency.set(node.id, []);
  for (const edge of edges) {
    adjacency.get(edge.source)?.push(edge.target);
    adjacency.get(edge.target)?.push(edge.source);
  }

  const visited = new Set<number>();
  const queue = [nodes[0].id];

  while (queue.length > 0) {
    const current = queue.shift();
    if (current === undefined || visited.has(current)) continue;
    visited.add(current);
    for (const neighbor of adjacency.get(current) ?? []) {
      if (!visited.has(neighbor)) queue.push(neighbor);
    }
  }

  return visited.size === nodes.length;
}

export default function GraphLab() {
  const [nodes, setNodes] = useState<GraphNode[]>(() =>
    PRESETS[0].nodes.map((node) => ({ ...node }))
  );
  const [edges, setEdges] = useState<GraphEdge[]>(() =>
    PRESETS[0].edges.map((edge) => ({ ...edge }))
  );
  const [mode, setMode] = useState<"node" | "edge">("edge");
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [activePreset, setActivePreset] = useState<
    GraphPreset["id"] | "custom"
  >("triangle");

  const degrees = new Map(nodes.map((node) => [node.id, 0]));
  for (const edge of edges) {
    degrees.set(edge.source, (degrees.get(edge.source) ?? 0) + 1);
    degrees.set(edge.target, (degrees.get(edge.target) ?? 0) + 1);
  }

  const degreeSum = Array.from(degrees.values()).reduce(
    (total, degree) => total + degree,
    0
  );
  const maxDegree = Math.max(0, ...degrees.values());
  const connected = graphIsConnected(nodes, edges);

  const addNode = (x: number, y: number) => {
    const tooClose = nodes.some(
      (node) => Math.hypot(node.x - x, node.y - y) < 9
    );
    if (tooClose) return;

    const nextId =
      nodes.length > 0 ? Math.max(...nodes.map((node) => node.id)) + 1 : 1;
    setNodes((current) => [...current, { id: nextId, x, y }]);
    setActivePreset("custom");
  };

  const addNextAvailableNode = () => {
    const point = ADDITION_POINTS.find(
      (candidate) =>
        !nodes.some(
          (node) => Math.hypot(node.x - candidate.x, node.y - candidate.y) < 9
        )
    );
    if (point) addNode(point.x, point.y);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (mode !== "node") return;
    if (event.detail === 0) {
      addNextAvailableNode();
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(
      95,
      Math.max(5, ((event.clientX - rect.left) / rect.width) * 100)
    );
    const y = Math.min(
      92,
      Math.max(8, ((event.clientY - rect.top) / rect.height) * 100)
    );
    addNode(x, y);
  };

  const handleNodeClick = (id: number) => {
    if (mode !== "edge") return;

    if (selectedNode === null) {
      setSelectedNode(id);
      return;
    }

    if (selectedNode !== id) {
      setEdges((current) => {
        const exists = current.some(
          (edge) =>
            (edge.source === selectedNode && edge.target === id) ||
            (edge.source === id && edge.target === selectedNode)
        );
        return exists
          ? current
          : [...current, { source: selectedNode, target: id }];
      });
      setActivePreset("custom");
    }

    setSelectedNode(null);
  };

  const loadPreset = (preset: GraphPreset) => {
    const graph = clonePreset(preset);
    setNodes(graph.nodes);
    setEdges(graph.edges);
    setSelectedNode(null);
    setActivePreset(preset.id);
  };

  const clearGraph = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setActivePreset("custom");
  };

  return (
    <div className="bg-[#061119]/74 grid overflow-hidden border border-emerald-200/[0.16] shadow-[0_34px_100px_rgba(0,0,0,0.25)] backdrop-blur-2xl xl:grid-cols-[340px_minmax(0,1fr)]">
      <div className="border-b border-white/[0.08] p-5 sm:p-7 xl:border-b-0 xl:border-r">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-emerald-200/62 text-[11px] font-semibold uppercase tracking-[0.16em]">
              Graph builder
            </div>
            <h3 className="mt-2 text-[28px] font-semibold tracking-[-0.045em] text-white">
              Vertices + edges
            </h3>
          </div>
          <GitBranch size={24} className="text-emerald-300/72 mt-1" />
        </div>

        <p className="mt-3 text-[13px] leading-6 text-slate-400">
          Start with a known shape, then change its connections. The number
          inside each vertex is its degree.
        </p>

        <fieldset className="mt-6">
          <legend className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Curated cases
          </legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {PRESETS.map((preset) => {
              const active = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => loadPreset(preset)}
                  aria-pressed={active}
                  className={`min-h-11 border px-2 py-2 text-[12px] font-semibold transition-colors ${
                    active
                      ? "bg-emerald-300/12 border-emerald-300/50 text-emerald-100"
                      : "border-white/[0.09] bg-white/[0.025] text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                  title={preset.note}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 min-h-10 text-[12px] leading-5 text-slate-500">
            {PRESETS.find((preset) => preset.id === activePreset)?.note ??
              "Custom graph: compare its degree pattern and connectivity."}
          </p>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Editing action
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setMode("node");
                setSelectedNode(null);
              }}
              aria-pressed={mode === "node"}
              className={`min-h-[58px] border px-3 py-2 text-[12px] font-semibold transition-colors ${
                mode === "node"
                  ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100"
                  : "border-white/[0.09] bg-white/[0.025] text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              <CirclePlus size={17} className="mx-auto mb-1" />
              Place vertex
            </button>
            <button
              type="button"
              onClick={() => setMode("edge")}
              aria-pressed={mode === "edge"}
              className={`min-h-[58px] border px-3 py-2 text-[12px] font-semibold transition-colors ${
                mode === "edge"
                  ? "border-emerald-300/50 bg-emerald-300/10 text-emerald-100"
                  : "border-white/[0.09] bg-white/[0.025] text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              <Link2 size={17} className="mx-auto mb-1" />
              Link vertices
            </button>
          </div>
        </fieldset>

        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08]">
          <GraphMetric label="Vertices |V|" value={nodes.length} />
          <GraphMetric label="Edges |E|" value={edges.length} />
          <GraphMetric label="Maximum degree" value={maxDegree} />
          <GraphMetric
            label="Connected"
            value={nodes.length === 0 ? "—" : connected ? "Yes" : "No"}
          />
        </div>

        <div className="border-amber-200/24 mt-5 border-l pl-4 text-[12px] leading-6 text-slate-400">
          <strong className="block text-[13px] text-amber-100/90">
            Handshake check
          </strong>
          ∑ degree = {degreeSum}, while 2|E| = {2 * edges.length}. Every edge
          contributes one degree to each endpoint.
        </div>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => loadPreset(PRESETS[0])}
            className="flex min-h-11 flex-1 items-center justify-center gap-2 border border-white/[0.09] bg-white/[0.025] px-3 text-[12px] font-semibold text-slate-400 transition-colors hover:border-white/20 hover:text-white"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            type="button"
            onClick={clearGraph}
            className="text-rose-200/76 flex min-h-11 flex-1 items-center justify-center gap-2 border border-rose-300/20 bg-rose-300/[0.04] px-3 text-[12px] font-semibold transition-colors hover:border-rose-300/40 hover:text-rose-100"
          >
            <Trash2 size={14} /> Clear
          </button>
        </div>
      </div>

      <div className="flex min-w-0 flex-col p-4 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-[12px] text-slate-500">
          <span aria-live="polite">
            {mode === "node"
              ? "Place a vertex on an open part of the board."
              : selectedNode === null
                ? "Choose the first endpoint of a new edge."
                : `Vertex ${selectedNode} selected. Choose the second endpoint.`}
          </span>
          {mode === "node" ? (
            <button
              type="button"
              onClick={addNextAvailableNode}
              className="text-cyan-100/76 min-h-11 border border-cyan-200/20 bg-cyan-200/[0.04] px-3 font-semibold transition-colors hover:border-cyan-200/40 hover:text-cyan-50"
            >
              Add at next open position
            </button>
          ) : null}
        </div>

        <div className="bg-[#02070b]/72 relative min-h-[390px] flex-1 overflow-hidden border border-white/[0.1] shadow-inner sm:min-h-[460px]">
          <div
            className="pointer-events-none absolute inset-0 opacity-45"
            style={{
              backgroundImage:
                "linear-gradient(rgba(103,232,249,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,0.055) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <button
            type="button"
            onClick={handleCanvasClick}
            disabled={mode !== "node"}
            aria-label="Place a new vertex on the graph board"
            className={`absolute inset-0 h-full w-full ${
              mode === "node" ? "cursor-crosshair" : "cursor-default"
            }`}
          />

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {edges.map((edge) => {
              const source = nodes.find((node) => node.id === edge.source);
              const target = nodes.find((node) => node.id === edge.target);
              if (!source || !target) return null;
              const key = [edge.source, edge.target]
                .sort((a, b) => a - b)
                .join("-");
              return (
                <line
                  key={key}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="#34d399"
                  strokeOpacity="0.72"
                  strokeWidth="0.55"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {nodes.map((node) => {
            const degree = degrees.get(node.id) ?? 0;
            const selected = selectedNode === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => handleNodeClick(node.id)}
                aria-label={`Vertex ${node.id}, degree ${degree}${
                  selected ? ", selected as first endpoint" : ""
                }`}
                className={`absolute z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 font-mono text-[14px] font-semibold shadow-[0_0_28px_rgba(52,211,153,0.14)] transition-colors ${
                  selected
                    ? "border-white bg-emerald-300 text-emerald-950"
                    : "border-emerald-300/72 bg-[#07131a] text-emerald-100 hover:border-white"
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                {degree}
              </button>
            );
          })}

          {nodes.length === 0 ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-8 text-center text-[14px] leading-7 text-slate-500">
              The board is empty. Choose “Place vertex,” then add the first
              object.
            </div>
          ) : null}
        </div>

        <p className="mt-3 text-[12px] leading-6 text-slate-500">
          Positions are only for drawing. Move from the picture to the invariant
          data: vertex count, edge count, degree, and connectivity.
        </p>
      </div>
    </div>
  );
}

function GraphMetric({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="bg-[#061019] p-3">
      <div className="text-[11px] text-slate-500">{label}</div>
      <div className="mt-1 font-mono text-[17px] text-white">{value}</div>
    </div>
  );
}
