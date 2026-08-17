"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ListOrdered,
  Network,
  Pause,
  Play,
  RotateCcw,
  StepForward,
} from "lucide-react";
import {
  GRAPH_EDGES,
  GRAPH_NODES,
  advanceTraversal,
  initialTraversal,
  type Strategy,
  type TraversalState,
} from "./algorithm-model";

export default function TraversalLab() {
  const [strategy, setStrategy] = useState<Strategy>("bfs");
  const [start, setStart] = useState("A");
  const [state, setState] = useState<TraversalState>(() => initialTraversal("A"));
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setState(initialTraversal(start));
    setRunning(false);
  }, [start, strategy]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setState((current) => {
        const next = advanceTraversal(current, strategy);
        if (next.done) setRunning(false);
        return next;
      });
    }, 720);
    return () => window.clearInterval(timer);
  }, [running, strategy]);

  function reset() {
    setRunning(false);
    setState(initialTraversal(start));
  }

  return (
    <section className="relative overflow-hidden rounded-[32px_12px_32px_12px] border border-cyan-100/[0.14] bg-black/[0.26] shadow-[0_24px_90px_rgba(0,0,0,0.22)] backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_54%,rgba(34,211,238,0.055),transparent_28%),linear-gradient(90deg,rgba(1,11,15,0.16),transparent_58%)]" />
      <div className="relative grid border-b border-cyan-100/[0.09] lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/72">
            <Network size={14} /> Widget 01 · graph traversal
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,3rem)] font-semibold tracking-[-0.045em] text-white">
            The graph stays fixed. The frontier rule changes the route.
          </h2>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/72">
            Breadth-first search removes the oldest discovered node from a queue. Depth-first search removes the newest discovered node from a stack. Both avoid cycles by recording discovery before expansion.
          </p>
        </div>
        <div className="border-t border-cyan-100/[0.08] bg-black/[0.20] p-5 lg:border-l lg:border-t-0">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-emerald-200/65">
            Traversal invariant
          </div>
          <p className="mt-3 text-[13px] leading-6 text-slate-300/72">
            Every node enters the frontier at most once. The frontier contains discovered work that has not yet been expanded.
          </p>
        </div>
      </div>

      <div className="relative grid lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="border-b border-cyan-100/[0.08] p-4 lg:border-b-0 lg:border-r sm:p-5">
          <div className="relative min-h-[300px] overflow-hidden rounded-[22px_8px_22px_8px] border border-cyan-100/[0.10] bg-[#02090d]/58">
            <TraversalGraph state={state} />
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <Readout label="Frontier" value={state.frontier.join(" → ") || "empty"} rgb="34,211,238" />
            <Readout label="Visited order" value={state.visited.join(" → ") || "none"} rgb="52,211,153" />
            <Readout label="Graph cost" value="O(V + E)" rgb="167,139,250" />
          </div>
        </div>

        <div className="bg-black/[0.25] p-4 sm:p-5">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/68">
            <ListOrdered size={14} /> Frontier controls
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {(["bfs", "dfs"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setStrategy(option)}
                className={`min-h-[46px] rounded-[13px] border text-[13px] font-semibold uppercase tracking-[0.08em] transition ${
                  strategy === option
                    ? "border-cyan-200/[0.34] bg-cyan-300/[0.09] text-cyan-100"
                    : "border-white/[0.08] bg-black/[0.18] text-slate-500 hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <label className="mt-3 block rounded-[14px] border border-white/[0.08] bg-black/[0.18] p-3">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
              Start node
            </span>
            <select
              value={start}
              onChange={(event) => setStart(event.target.value)}
              className="mt-2 w-full rounded-[10px] border border-white/[0.08] bg-[#071014] px-3 py-2.5 text-[13px] text-white"
            >
              {GRAPH_NODES.map((node) => (
                <option key={node.id}>{node.id}</option>
              ))}
            </select>
          </label>

          <PlaybackControls
            running={running}
            done={state.done}
            onRun={() => setRunning((value) => !value)}
            onStep={() => setState((current) => advanceTraversal(current, strategy))}
            onReset={reset}
          />

          <div className="mt-4 border-l border-cyan-200/[0.20] pl-3">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
              Current discipline
            </div>
            <p className="mt-2 text-[13px] leading-5 text-slate-300/74">
              {strategy === "bfs"
                ? "Queue: expand the earliest discovered node first. This finds minimum-edge paths in an unweighted graph."
                : "Stack: expand the most recently discovered node first. This follows one branch deeply before backtracking."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TraversalGraph({ state }: { state: TraversalState }) {
  const byId = useMemo(
    () => new Map(GRAPH_NODES.map((node) => [node.id, node])),
    [],
  );

  return (
    <svg
      viewBox="0 0 620 300"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Graph traversal state"
    >
      <defs>
        <radialGradient id="traversal-glow">
          <stop offset="0" stopColor="rgba(34,211,238,0.18)" />
          <stop offset="1" stopColor="rgba(34,211,238,0)" />
        </radialGradient>
      </defs>
      <circle cx="420" cy="135" r="210" fill="url(#traversal-glow)" />
      {GRAPH_EDGES.map(([from, to]) => {
        const a = byId.get(from);
        const b = byId.get(to);
        if (!a || !b) return null;
        const explored = state.visited.includes(from) && state.visited.includes(to);
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={explored ? "rgba(52,211,153,0.50)" : "rgba(148,163,184,0.18)"}
            strokeWidth={explored ? 3 : 2}
          />
        );
      })}
      {GRAPH_NODES.map((node) => {
        const visited = state.visited.includes(node.id);
        const frontier = state.frontier.includes(node.id);
        const current = state.current === node.id;
        return (
          <g key={node.id}>
            {frontier || current ? (
              <circle
                cx={node.x}
                cy={node.y}
                r={current ? 31 : 27}
                fill="none"
                stroke={current ? "rgba(250,204,21,0.50)" : "rgba(34,211,238,0.42)"}
                strokeWidth="2"
              />
            ) : null}
            <circle
              cx={node.x}
              cy={node.y}
              r="19"
              fill={
                current
                  ? "rgba(250,204,21,0.24)"
                  : visited
                    ? "rgba(52,211,153,0.21)"
                    : frontier
                      ? "rgba(34,211,238,0.19)"
                      : "rgba(15,23,42,0.82)"
              }
              stroke={
                current
                  ? "rgb(250,204,21)"
                  : visited
                    ? "rgb(52,211,153)"
                    : frontier
                      ? "rgb(34,211,238)"
                      : "rgba(148,163,184,0.34)"
              }
              strokeWidth="2"
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill="#f8fafc"
              fontSize="14"
              fontWeight="700"
            >
              {node.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function PlaybackControls({
  running,
  done,
  onRun,
  onStep,
  onReset,
}: {
  running: boolean;
  done: boolean;
  onRun: () => void;
  onStep: () => void;
  onReset: () => void;
}) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      <button
        type="button"
        onClick={onRun}
        disabled={done}
        className="flex min-h-[44px] items-center justify-center gap-2 rounded-[12px] border border-cyan-200/[0.18] bg-cyan-300/[0.05] text-[12px] font-semibold text-cyan-100 disabled:opacity-35"
      >
        {running ? <Pause size={14} /> : <Play size={14} />}
        {running ? "Pause" : "Run"}
      </button>
      <button
        type="button"
        onClick={onStep}
        disabled={done || running}
        className="flex min-h-[44px] items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-black/[0.18] text-[12px] font-semibold text-slate-300 disabled:opacity-35"
      >
        <StepForward size={14} /> Step
      </button>
      <button
        type="button"
        onClick={onReset}
        className="flex min-h-[44px] items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-black/[0.18] text-[12px] font-semibold text-slate-300"
      >
        <RotateCcw size={14} /> Reset
      </button>
    </div>
  );
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return (
    <div className="min-w-0 border-l border-white/[0.10] bg-black/[0.12] px-3 py-2.5">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">
        {label}
      </div>
      <div
        className="mt-1.5 truncate text-[13px] font-semibold"
        style={{ color: `rgb(${rgb})` }}
      >
        {value}
      </div>
    </div>
  );
}
