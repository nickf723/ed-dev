"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import CampusGraphDiagram from "./CampusGraphDiagram";
import {
  CAMPUS_VERTEX_BY_ID,
  CAMPUS_VERTICES,
  campusTraversal,
  vertexRoster,
  type GraphVertexId,
  type TraversalAlgorithm,
} from "./graphTheoryNetwork";

const SPEEDS = [1100, 700, 380] as const;

export default function GraphTraversalLab() {
  const [algorithm, setAlgorithm] = useState<TraversalAlgorithm>("bfs");
  const [start, setStart] = useState<GraphVertexId>("gate");
  const [goal, setGoal] = useState<GraphVertexId>("garden");
  const [frameIndex, setFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1);

  const traversal = useMemo(
    () => campusTraversal(algorithm, start, goal),
    [algorithm, goal, start]
  );
  const lastFrameIndex = traversal.frames.length - 1;
  const atEnd = frameIndex >= lastFrameIndex;
  const frame = traversal.frames[Math.min(frameIndex, lastFrameIndex)];
  const goalReached = frame.visited.includes(goal);

  useEffect(() => {
    if (!playing || atEnd) return;
    const timer = window.setTimeout(
      () => setFrameIndex((current) => Math.min(current + 1, lastFrameIndex)),
      SPEEDS[speedIndex]
    );
    return () => window.clearTimeout(timer);
  }, [atEnd, frameIndex, lastFrameIndex, playing, speedIndex]);

  const resetPlayback = () => {
    setFrameIndex(0);
    setPlaying(false);
  };

  const changeAlgorithm = (next: TraversalAlgorithm) => {
    setAlgorithm(next);
    resetPlayback();
  };

  const changeEndpoint = (
    setter: (value: GraphVertexId) => void,
    value: GraphVertexId
  ) => {
    setter(value);
    resetPlayback();
  };

  const togglePlayback = () => {
    if (atEnd) setFrameIndex(0);
    setPlaying((current) => !current || atEnd);
  };

  const activeVertex = frame.current
    ? CAMPUS_VERTEX_BY_ID.get(frame.current)
    : undefined;
  const frontierLabel = algorithm === "bfs" ? "Queue" : "Stack";

  return (
    <div className="bg-[#041014]/72 overflow-hidden border border-emerald-100/[0.15] shadow-[0_38px_110px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
      <div className="grid lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className="border-b border-white/[0.08] p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-100/60">
            Search strategy
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(["bfs", "dfs"] as const).map((value) => {
              const selected = algorithm === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => changeAlgorithm(value)}
                  aria-pressed={selected}
                  className={`border px-3 py-3 text-left transition ${
                    selected
                      ? value === "bfs"
                        ? "border-cyan-200/40 bg-cyan-300/[0.09] text-cyan-50"
                        : "border-violet-200/40 bg-violet-300/[0.09] text-violet-50"
                      : "border-white/[0.08] bg-black/15 text-slate-500 hover:border-white/[0.16] hover:text-slate-300"
                  }`}
                >
                  <strong className="block font-mono text-[13px] uppercase">
                    {value}
                  </strong>
                  <span className="mt-1 block text-[11px] leading-4">
                    {value === "bfs" ? "layer by layer" : "one branch deeply"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-7 grid gap-4">
            <EndpointSelect
              id="graph-start"
              label="Start vertex"
              value={start}
              onChange={(value) => changeEndpoint(setStart, value)}
            />
            <EndpointSelect
              id="graph-goal"
              label="Goal vertex"
              value={goal}
              onChange={(value) => changeEndpoint(setGoal, value)}
            />
          </div>

          <div className="mt-7 border-y border-white/[0.08] py-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
                {frontierLabel}
              </span>
              <span className="font-mono text-[12px] text-amber-100">
                {frame.frontier.length > 0
                  ? vertexRoster(frame.frontier)
                  : "empty"}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
                Visited
              </span>
              <span className="font-mono text-[12px] text-emerald-100">
                {frame.visited.length} / {CAMPUS_VERTICES.length}
              </span>
            </div>
          </div>

          <p
            className="mt-5 min-h-20 text-[13px] leading-6 text-slate-400"
            aria-live="polite"
          >
            {activeVertex ? (
              <>
                <strong className="text-slate-100">
                  Visit {activeVertex.symbol} · {activeVertex.label}.
                </strong>{" "}
                Add every undiscovered neighbor to the{" "}
                {frontierLabel.toLowerCase()}.
              </>
            ) : (
              <>
                Place the start vertex in the {frontierLabel.toLowerCase()}. No
                vertex has been visited yet.
              </>
            )}
          </p>
        </div>

        <div className="min-w-0">
          <div className="bg-[#010608]/72 relative min-h-[410px] overflow-hidden p-2 sm:p-5">
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
            <CampusGraphDiagram
              visited={frame.visited}
              frontier={frame.frontier}
              current={frame.current}
              route={goalReached ? traversal.route : []}
              start={start}
              goal={goal}
              className="relative z-10 h-full min-h-[390px] w-full"
            />
          </div>

          <div className="border-t border-white/[0.08] bg-black/20 px-4 py-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={resetPlayback}
                className="flex h-10 w-10 items-center justify-center border border-white/[0.1] text-slate-400 transition hover:border-white/20 hover:text-white"
                aria-label="Reset traversal"
              >
                <RotateCcw size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setFrameIndex((current) => Math.max(0, current - 1));
                }}
                disabled={frameIndex === 0}
                className="flex h-10 w-10 items-center justify-center border border-white/[0.1] text-slate-400 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Previous traversal step"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                type="button"
                onClick={togglePlayback}
                className="flex h-11 min-w-28 items-center justify-center gap-2 border border-cyan-200/35 bg-cyan-300/[0.1] px-4 text-[12px] font-semibold text-cyan-50 transition hover:bg-cyan-300/[0.16]"
              >
                {playing && !atEnd ? <Pause size={16} /> : <Play size={16} />}
                {atEnd ? "Replay" : playing ? "Pause" : "Trace"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setFrameIndex((current) =>
                    Math.min(lastFrameIndex, current + 1)
                  );
                }}
                disabled={atEnd}
                className="flex h-10 w-10 items-center justify-center border border-white/[0.1] text-slate-400 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Next traversal step"
              >
                <ChevronRight size={17} />
              </button>

              <label className="ml-auto flex items-center gap-3 text-[11px] uppercase tracking-[0.12em] text-slate-500">
                Pace
                <select
                  value={speedIndex}
                  onChange={(event) =>
                    setSpeedIndex(Number(event.target.value))
                  }
                  className="h-10 border border-white/[0.1] bg-[#071014] px-3 text-[12px] normal-case tracking-normal text-slate-200 outline-none focus:border-cyan-200/40"
                >
                  <option value={0}>Deliberate</option>
                  <option value={1}>Steady</option>
                  <option value={2}>Quick</option>
                </select>
              </label>
            </div>

            <div className="mt-4">
              <input
                type="range"
                min={0}
                max={lastFrameIndex}
                step={1}
                value={frameIndex}
                onChange={(event) => {
                  setPlaying(false);
                  setFrameIndex(Number(event.target.value));
                }}
                className="w-full accent-cyan-300"
                aria-label="Traversal step"
              />
              <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-slate-600">
                <span>step {frameIndex}</span>
                <span>goal visit · frame {lastFrameIndex}</span>
              </div>
            </div>

            <div className="mt-4 min-h-14 border-l border-emerald-200/25 pl-4 text-[13px] leading-6 text-slate-400">
              {goalReached ? (
                <>
                  Route discovered:{" "}
                  <strong className="font-mono text-emerald-100">
                    {vertexRoster(traversal.route)}
                  </strong>
                  .{" "}
                  {algorithm === "bfs"
                    ? "Because this graph is unweighted, BFS reaches the goal along a shortest edge-count route."
                    : "DFS finds a route, but its deep-first order does not guarantee the fewest edges."}
                </>
              ) : (
                <>
                  Amber vertices are discovered but not yet visited. Teal
                  vertices have been removed from the{" "}
                  {frontierLabel.toLowerCase()} and explored.
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EndpointSelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: GraphVertexId;
  onChange: (value: GraphVertexId) => void;
}) {
  return (
    <label htmlFor={id} className="grid gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-500">
        {label}
      </span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as GraphVertexId)}
        className="h-11 border border-white/[0.1] bg-[#071014] px-3 text-[13px] text-slate-100 outline-none focus:border-cyan-200/40"
      >
        {CAMPUS_VERTICES.map((vertex) => (
          <option key={vertex.id} value={vertex.id}>
            {vertex.symbol} · {vertex.label}
          </option>
        ))}
      </select>
    </label>
  );
}
