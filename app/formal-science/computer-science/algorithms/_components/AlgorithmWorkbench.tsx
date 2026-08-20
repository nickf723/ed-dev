"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Gauge,
  ListOrdered,
  Network,
  Pause,
  Play,
  RotateCcw,
  Shuffle,
  StepForward,
} from "lucide-react";
import { Surface, useWorldDirector } from "@/app/_page-system/scene";

type AlgorithmScene = "traversal" | "sorting" | "growth";
type Strategy = "bfs" | "dfs";
type TraversalState = {
  frontier: string[];
  discovered: string[];
  visited: string[];
  current: string | null;
  done: boolean;
};
type SortState = {
  values: number[];
  pass: number;
  index: number;
  comparisons: number;
  swaps: number;
  active: [number, number] | null;
  done: boolean;
};
type GrowthKind = "constant" | "log" | "linear" | "nlogn" | "quadratic";

type GraphNode = {
  id: string;
  x: number;
  y: number;
};

const GRAPH_NODES: GraphNode[] = [
  { id: "A", x: 82, y: 154 },
  { id: "B", x: 224, y: 76 },
  { id: "C", x: 224, y: 232 },
  { id: "D", x: 374, y: 46 },
  { id: "E", x: 374, y: 132 },
  { id: "F", x: 374, y: 246 },
  { id: "G", x: 536, y: 178 },
];

const GRAPH_EDGES: Array<[string, string]> = [
  ["A", "B"],
  ["A", "C"],
  ["B", "D"],
  ["B", "E"],
  ["C", "F"],
  ["E", "G"],
  ["F", "G"],
];

const ADJACENCY: Record<string, string[]> = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "G"],
  F: ["C", "G"],
  G: ["E", "F"],
};

const DEFAULT_VALUES = [7, 2, 9, 4, 1, 8, 3, 6];

const GROWTH_OPTIONS: Array<{
  id: GrowthKind;
  label: string;
  notation: string;
  rgb: string;
  count: (n: number) => number;
}> = [
  { id: "constant", label: "Constant", notation: "O(1)", rgb: "52,211,153", count: () => 1 },
  { id: "log", label: "Logarithmic", notation: "O(log n)", rgb: "34,211,238", count: (n) => Math.ceil(Math.log2(Math.max(2, n))) },
  { id: "linear", label: "Linear", notation: "O(n)", rgb: "96,165,250", count: (n) => n },
  { id: "nlogn", label: "Linearithmic", notation: "O(n log n)", rgb: "167,139,250", count: (n) => Math.ceil(n * Math.log2(Math.max(2, n))) },
  { id: "quadratic", label: "Quadratic", notation: "O(n²)", rgb: "244,114,182", count: (n) => n * n },
];

export default function AlgorithmWorkbench() {
  const director = useWorldDirector();
  const scene = resolveScene(director.scene);

  return (
    <div className="grid h-full gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
      {scene === "traversal" ? <TraversalLab /> : null}
      {scene === "sorting" ? <SortingLab /> : null}
      {scene === "growth" ? <GrowthLab /> : null}
    </div>
  );
}

function TraversalLab() {
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
    }, 680);
    return () => window.clearInterval(timer);
  }, [running, strategy]);

  useEffect(() => {
    dispatchWorld({
      scene: "traversal",
      strategy,
      frontier: state.frontier,
      visited: state.visited,
      current: state.current,
    });
  }, [state.current, state.frontier, state.visited, strategy]);

  function step() {
    setState((current) => advanceTraversal(current, strategy));
  }

  function reset() {
    setRunning(false);
    setState(initialTraversal(start));
  }

  return (
    <>
      <Surface variant="ghost" className="overflow-hidden rounded-[24px]">
        <LabHeader
          icon={Network}
          eyebrow="Live graph traversal"
          title={strategy === "bfs" ? "Breadth-first search" : "Depth-first search"}
          badge={`${state.visited.length} / ${GRAPH_NODES.length} visited`}
        />
        <div className="grid min-h-[330px] place-items-center border-b border-white/[0.08] bg-[#030b0d]/72 p-3">
          <TraversalGraph state={state} />
        </div>
        <div className="grid gap-2 p-3 sm:grid-cols-3">
          <Readout label="Frontier" value={state.frontier.join(" → ") || "empty"} rgb="34,211,238" />
          <Readout label="Visited order" value={state.visited.join(" → ") || "none"} rgb="52,211,153" />
          <Readout label="Cost" value="O(V + E)" rgb="167,139,250" />
        </div>
      </Surface>

      <Surface variant="glass" className="rounded-[24px] p-4">
        <ControlTitle icon={ListOrdered} label="Traversal controls" />
        <p className="mt-2 text-[12px] leading-5 text-slate-300/68">
          BFS removes from the front of a queue. DFS removes from the top of a stack. The graph is unchanged; the frontier discipline changes the route.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {(["bfs", "dfs"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStrategy(option)}
              className={`min-h-[44px] rounded-[12px] border text-[13px] font-semibold uppercase tracking-[0.08em] transition ${
                strategy === option
                  ? "border-cyan-200/[0.30] bg-cyan-300/[0.08] text-cyan-100"
                  : "border-white/[0.08] bg-black/[0.16] text-slate-500 hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <label className="mt-3 block rounded-[14px] border border-white/[0.08] bg-black/[0.16] p-3">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Start node</span>
          <select
            value={start}
            onChange={(event) => setStart(event.target.value)}
            className="mt-2 w-full rounded-[10px] border border-white/[0.08] bg-[#071014] px-3 py-2.5 text-[13px] text-white"
          >
            {GRAPH_NODES.map((node) => <option key={node.id}>{node.id}</option>)}
          </select>
        </label>

        <PlaybackControls
          running={running}
          done={state.done}
          onRun={() => setRunning((value) => !value)}
          onStep={step}
          onReset={reset}
        />

        <div className="mt-4 rounded-[15px] border border-emerald-200/[0.11] bg-emerald-300/[0.035] p-3">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-200/66">Invariant</div>
          <p className="mt-2 text-[13px] leading-5 text-slate-200/74">
            Every discovered node enters the frontier at most once. That prevents cycles from producing endless revisits.
          </p>
        </div>
      </Surface>
    </>
  );
}

function SortingLab() {
  const [state, setState] = useState<SortState>(() => initialSort(DEFAULT_VALUES));
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setState((current) => {
        const next = advanceBubbleSort(current);
        if (next.done) setRunning(false);
        return next;
      });
    }, 430);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    dispatchWorld({
      scene: "sorting",
      values: state.values,
      active: state.active,
      pass: state.pass,
    });
  }, [state.active, state.pass, state.values]);

  function randomize() {
    setRunning(false);
    const values = shuffleValues(DEFAULT_VALUES);
    setState(initialSort(values));
  }

  return (
    <>
      <Surface variant="ghost" className="overflow-hidden rounded-[24px]">
        <LabHeader
          icon={Shuffle}
          eyebrow="Adjacent-exchange theater"
          title="Bubble sort, one comparison at a time"
          badge={state.done ? "sorted" : `pass ${state.pass + 1}`}
        />
        <div className="flex min-h-[330px] items-end justify-center gap-3 border-b border-white/[0.08] bg-[#071009]/72 px-5 pb-6 pt-5">
          {state.values.map((value, index) => {
            const active = state.active?.includes(index) ?? false;
            const sorted = state.done || index >= state.values.length - state.pass;
            return (
              <div key={`${index}-${value}`} className="flex h-[270px] min-w-0 flex-1 flex-col justify-end">
                <div
                  className="relative mx-auto w-full max-w-[58px] rounded-t-[12px] border transition-all duration-300"
                  style={{
                    height: `${34 + value * 22}px`,
                    borderColor: active
                      ? "rgba(250,204,21,0.52)"
                      : sorted
                        ? "rgba(52,211,153,0.34)"
                        : "rgba(34,211,238,0.18)",
                    background: active
                      ? "linear-gradient(180deg,rgba(250,204,21,0.32),rgba(40,25,4,0.78))"
                      : sorted
                        ? "linear-gradient(180deg,rgba(52,211,153,0.22),rgba(4,28,18,0.82))"
                        : "linear-gradient(180deg,rgba(34,211,238,0.18),rgba(3,18,25,0.84))",
                    boxShadow: active ? "0 0 34px rgba(250,204,21,0.14)" : undefined,
                  }}
                >
                  <span className="absolute inset-x-0 top-2 text-center font-mono text-[13px] font-semibold text-white/82">{value}</span>
                </div>
                <span className="mt-2 text-center font-mono text-[11px] text-slate-600">{index}</span>
              </div>
            );
          })}
        </div>
        <div className="grid gap-2 p-3 sm:grid-cols-3">
          <Readout label="Comparisons" value={String(state.comparisons)} rgb="250,204,21" />
          <Readout label="Swaps" value={String(state.swaps)} rgb="244,114,182" />
          <Readout label="Worst-case cost" value="O(n²)" rgb="167,139,250" />
        </div>
      </Surface>

      <Surface variant="glass" className="rounded-[24px] p-4">
        <ControlTitle icon={Gauge} label="Sorting controls" />
        <p className="mt-2 text-[12px] leading-5 text-slate-300/68">
          Each pass pushes the largest remaining value toward the right edge. The sorted suffix grows one position at a time.
        </p>

        <PlaybackControls
          running={running}
          done={state.done}
          onRun={() => setRunning((value) => !value)}
          onStep={() => setState((current) => advanceBubbleSort(current))}
          onReset={() => {
            setRunning(false);
            setState(initialSort(DEFAULT_VALUES));
          }}
        />

        <button
          type="button"
          onClick={randomize}
          className="mt-2 flex min-h-[42px] w-full items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-black/[0.16] text-[12px] font-semibold text-slate-300 transition hover:bg-white/[0.04]"
        >
          <Shuffle size={14} /> Randomize input
        </button>

        <div className="mt-4 rounded-[15px] border border-amber-200/[0.11] bg-amber-300/[0.03] p-3">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-200/66">Correctness idea</div>
          <p className="mt-2 text-[13px] leading-5 text-slate-200/74">
            After pass k, the k largest values occupy their final positions. That loop invariant explains why the algorithm eventually finishes sorted.
          </p>
        </div>
      </Surface>
    </>
  );
}

function GrowthLab() {
  const [n, setN] = useState(24);
  const [selected, setSelected] = useState<GrowthKind>("nlogn");
  const option = GROWTH_OPTIONS.find((item) => item.id === selected) ?? GROWTH_OPTIONS[3];
  const operations = option.count(n);

  useEffect(() => {
    dispatchWorld({ scene: "growth", n, selected, operations });
  }, [n, operations, selected]);

  return (
    <>
      <Surface variant="ghost" className="overflow-hidden rounded-[24px]">
        <LabHeader
          icon={Gauge}
          eyebrow="Growth-rate observatory"
          title="Input size changes algorithms at different speeds"
          badge={`n = ${n}`}
        />
        <div className="min-h-[330px] border-b border-white/[0.08] bg-[#090710]/76 p-4">
          <GrowthChart n={n} selected={selected} />
        </div>
        <div className="grid gap-2 p-3 sm:grid-cols-3">
          <Readout label="Selected family" value={option.notation} rgb={option.rgb} />
          <Readout label="Toy operation count" value={formatCount(operations)} rgb="250,204,21" />
          <Readout label="Input size" value={String(n)} rgb="34,211,238" />
        </div>
      </Surface>

      <Surface variant="glass" className="rounded-[24px] p-4">
        <ControlTitle icon={Gauge} label="Growth controls" />
        <p className="mt-2 text-[12px] leading-5 text-slate-300/68">
          Big O compares how resource use scales, not the exact runtime of one machine. Constants and lower-order terms matter in practice, but growth dominates as n becomes large.
        </p>

        <label className="mt-4 block rounded-[14px] border border-white/[0.08] bg-black/[0.16] p-3">
          <span className="flex items-center justify-between gap-3 text-[12px] text-slate-300">
            <span>Input size</span>
            <strong className="font-mono text-cyan-100">n = {n}</strong>
          </span>
          <input
            type="range"
            min="2"
            max="64"
            value={n}
            onChange={(event) => setN(Number(event.target.value))}
            className="mt-3 w-full accent-cyan-400"
          />
        </label>

        <div className="mt-3 grid gap-2">
          {GROWTH_OPTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item.id)}
              className="flex min-h-[42px] items-center justify-between rounded-[12px] border px-3 text-left transition"
              style={{
                borderColor: selected === item.id ? `rgba(${item.rgb},0.32)` : "rgba(255,255,255,0.07)",
                background: selected === item.id ? `rgba(${item.rgb},0.06)` : "rgba(0,0,0,0.14)",
              }}
            >
              <span className="text-[12px] font-medium text-slate-300">{item.label}</span>
              <strong className="font-mono text-[12px]" style={{ color: `rgb(${item.rgb})` }}>{item.notation}</strong>
            </button>
          ))}
        </div>
      </Surface>
    </>
  );
}

function TraversalGraph({ state }: { state: TraversalState }) {
  const byId = new Map(GRAPH_NODES.map((node) => [node.id, node]));
  return (
    <svg viewBox="0 0 620 300" className="h-full max-h-[330px] w-full" role="img" aria-label="Graph traversal state">
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
            stroke={explored ? "rgba(52,211,153,0.48)" : "rgba(148,163,184,0.16)"}
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
                r={current ? 30 : 26}
                fill="none"
                stroke={current ? "rgba(250,204,21,0.48)" : "rgba(34,211,238,0.38)"}
                strokeWidth="2"
              />
            ) : null}
            <circle
              cx={node.x}
              cy={node.y}
              r="19"
              fill={current ? "rgba(250,204,21,0.22)" : visited ? "rgba(52,211,153,0.20)" : frontier ? "rgba(34,211,238,0.18)" : "rgba(15,23,42,0.92)"}
              stroke={current ? "rgb(250,204,21)" : visited ? "rgb(52,211,153)" : frontier ? "rgb(34,211,238)" : "rgba(148,163,184,0.32)"}
              strokeWidth="2"
            />
            <text x={node.x} y={node.y + 5} textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700">{node.id}</text>
          </g>
        );
      })}
    </svg>
  );
}

function GrowthChart({ n, selected }: { n: number; selected: GrowthKind }) {
  const width = 660;
  const height = 285;
  const padding = 34;
  const maxLog = Math.log10(64 * 64 + 1);
  const x = (value: number) => padding + ((value - 2) / 62) * (width - padding * 2);
  const y = (value: number) => height - padding - (Math.log10(value + 1) / maxLog) * (height - padding * 2);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" role="img" aria-label="Comparison of algorithm growth rates">
      {Array.from({ length: 6 }, (_, index) => (
        <line key={index} x1={padding} y1={padding + index * 42} x2={width - padding} y2={padding + index * 42} stroke="rgba(148,163,184,0.08)" />
      ))}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(148,163,184,0.30)" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(148,163,184,0.30)" />
      {GROWTH_OPTIONS.map((option) => {
        const points = Array.from({ length: 32 }, (_, index) => {
          const input = 2 + index * 2;
          return `${x(input)},${y(option.count(input))}`;
        }).join(" ");
        const active = option.id === selected;
        return (
          <polyline
            key={option.id}
            points={points}
            fill="none"
            stroke={`rgb(${option.rgb})`}
            strokeWidth={active ? 4 : 1.6}
            opacity={active ? 0.96 : 0.30}
          />
        );
      })}
      <line x1={x(n)} y1={padding} x2={x(n)} y2={height - padding} stroke="rgba(250,204,21,0.42)" strokeDasharray="5 6" />
      {GROWTH_OPTIONS.map((option) => {
        const active = option.id === selected;
        return <circle key={option.id} cx={x(n)} cy={y(option.count(n))} r={active ? 6 : 3} fill={`rgb(${option.rgb})`} opacity={active ? 1 : 0.42} />;
      })}
      <text x={width - padding} y={height - 10} textAnchor="end" fill="#64748b" fontSize="11">input size n</text>
      <text x={padding + 6} y={padding - 10} fill="#64748b" fontSize="11">operations, log scale</text>
    </svg>
  );
}

function LabHeader({
  icon: Icon,
  eyebrow,
  title,
  badge,
}: {
  icon: typeof Network;
  eyebrow: string;
  title: string;
  badge: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-white/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-200/68"><Icon size={14} /> {eyebrow}</div>
        <h3 className="mt-1 text-[21px] font-semibold tracking-[-0.035em] text-white">{title}</h3>
      </div>
      <span className="rounded-full border border-white/[0.08] bg-black/[0.20] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-300/66">{badge}</span>
    </div>
  );
}

function ControlTitle({ icon: Icon, label }: { icon: typeof Gauge; label: string }) {
  return <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/68"><Icon size={14} /> {label}</div>;
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
      <button type="button" onClick={onRun} disabled={done} className="flex min-h-[42px] items-center justify-center gap-2 rounded-[12px] border border-cyan-200/[0.18] bg-cyan-300/[0.045] text-[12px] font-semibold text-cyan-100 disabled:opacity-35">
        {running ? <Pause size={14} /> : <Play size={14} />} {running ? "Pause" : "Run"}
      </button>
      <button type="button" onClick={onStep} disabled={done || running} className="flex min-h-[42px] items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-black/[0.16] text-[12px] font-semibold text-slate-300 disabled:opacity-35">
        <StepForward size={14} /> Step
      </button>
      <button type="button" onClick={onReset} className="flex min-h-[42px] items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-black/[0.16] text-[12px] font-semibold text-slate-300">
        <RotateCcw size={14} /> Reset
      </button>
    </div>
  );
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return (
    <div className="min-w-0 rounded-[13px] border border-white/[0.08] bg-black/[0.16] p-3">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">{label}</div>
      <div className="mt-1.5 truncate text-[13px] font-semibold" style={{ color: `rgb(${rgb})` }}>{value}</div>
    </div>
  );
}

function initialTraversal(start: string): TraversalState {
  return { frontier: [start], discovered: [start], visited: [], current: null, done: false };
}

function advanceTraversal(state: TraversalState, strategy: Strategy): TraversalState {
  if (state.done || state.frontier.length === 0) return { ...state, current: null, done: true };
  const frontier = [...state.frontier];
  const current = strategy === "bfs" ? frontier.shift() : frontier.pop();
  if (!current) return { ...state, current: null, done: true };

  const discovered = new Set(state.discovered);
  const neighbors = (ADJACENCY[current] ?? []).filter((neighbor) => !discovered.has(neighbor));
  const additions = strategy === "dfs" ? [...neighbors].reverse() : neighbors;
  additions.forEach((neighbor) => discovered.add(neighbor));
  frontier.push(...additions);
  const visited = [...state.visited, current];

  return {
    frontier,
    discovered: [...discovered],
    visited,
    current,
    done: frontier.length === 0 && visited.length === GRAPH_NODES.length,
  };
}

function initialSort(values: number[]): SortState {
  return { values: [...values], pass: 0, index: 0, comparisons: 0, swaps: 0, active: null, done: false };
}

function advanceBubbleSort(state: SortState): SortState {
  if (state.done) return state;
  const values = [...state.values];
  const left = state.index;
  const right = left + 1;
  let swaps = state.swaps;

  if (values[left] > values[right]) {
    [values[left], values[right]] = [values[right], values[left]];
    swaps += 1;
  }

  let pass = state.pass;
  let index = state.index + 1;
  if (index >= values.length - 1 - pass) {
    pass += 1;
    index = 0;
  }
  const done = pass >= values.length - 1;

  return {
    values,
    pass,
    index,
    comparisons: state.comparisons + 1,
    swaps,
    active: done ? null : [index, index + 1],
    done,
  };
}

function shuffleValues(values: number[]) {
  const next = [...values];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

function resolveScene(scene: string | null): AlgorithmScene {
  return scene === "sorting" || scene === "growth" ? scene : "traversal";
}

function dispatchWorld(detail: Record<string, unknown>) {
  window.dispatchEvent(new CustomEvent("algorithm-world:update", { detail }));
}

function formatCount(value: number) {
  return value >= 1000 ? value.toLocaleString() : String(value);
}
