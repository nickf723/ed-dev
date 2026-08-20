"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Gauge,
  Pause,
  Play,
  RefreshCw,
  StepForward,
  Users,
} from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type Cell = 0 | 1 | 2;

type GridMetrics = {
  satisfiedPercent: number;
  localSimilarityPercent: number;
  dissatisfied: number;
  agents: number;
};

const SIZE = 20;
const VACANCY_RATE = 0.12;

export default function SchellingModel() {
  const [threshold, setThreshold] = useState(30);
  const [grid, setGrid] = useState<Cell[]>(() => createGrid());
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState(0);

  const metrics = useMemo(
    () => analyzeGrid(grid, threshold / 100),
    [grid, threshold],
  );

  useEffect(() => {
    if (!running) return;
    if (metrics.dissatisfied === 0) {
      setRunning(false);
      return;
    }

    const timer = window.setInterval(() => {
      setGrid((current) => stepGrid(current, threshold / 100));
      setSteps((value) => value + 1);
    }, 460);

    return () => window.clearInterval(timer);
  }, [metrics.dissatisfied, running, threshold]);

  function step() {
    setRunning(false);
    setGrid((current) => stepGrid(current, threshold / 100));
    setSteps((value) => value + 1);
  }

  function reset() {
    setRunning(false);
    setGrid(createGrid());
    setSteps(0);
  }

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[32px] border-violet-100/[0.14]"
      style={{ background: "rgba(12,6,18,0.34)" }}
    >
      <div className="grid border-b border-violet-100/[0.09] lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-200/70">
            <Users size={14} /> Emergence laboratory · Schelling-style sorting
          </div>
          <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
            Local preferences can produce a pattern nobody explicitly designed.
          </h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-violet-100/70">
            Each occupied cell compares itself with nearby occupied neighbors. If the share of same-group neighbors falls below the selected threshold, that agent moves to a vacant cell. Watch aggregate clustering emerge from a simple local rule.
          </p>
        </div>
        <div className="border-t border-violet-100/[0.08] bg-black/[0.08] p-5 backdrop-blur-[14px] lg:border-l lg:border-t-0">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/70">
            Model boundary
          </div>
          <p className="mt-3 text-[13px] leading-6 text-slate-300/70">
            This is a toy model of residential sorting, not a one-cause explanation of real segregation. Law, discrimination, wealth, housing markets, zoning, institutions, history, and geography also shape real patterns.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[430px_minmax(0,1fr)]">
        <div className="border-b border-violet-100/[0.08] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div
            className="mx-auto grid aspect-square w-full max-w-[350px] gap-[1px] rounded-[18px] border border-violet-100/[0.10] bg-[#08050d]/74 p-2 shadow-[inset_0_0_70px_rgba(0,0,0,0.24)] backdrop-blur-[8px]"
            style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}
            role="img"
            aria-label="Grid of two groups and vacant cells in a Schelling-style segregation model"
          >
            {grid.map((cell, index) => (
              <span
                key={index}
                className={`rounded-[2px] transition-colors duration-300 ${
                  cell === 0
                    ? "bg-white/[0.025]"
                    : cell === 1
                      ? "bg-violet-400/90 shadow-[0_0_8px_rgba(167,139,250,0.18)]"
                      : "bg-teal-300/90 shadow-[0_0_8px_rgba(94,234,212,0.14)]"
                }`}
              />
            ))}
          </div>
          <div className="mx-auto mt-3 flex max-w-[350px] items-center justify-center gap-5 font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">
            <LegendDot className="bg-violet-400" label="Group A" />
            <LegendDot className="bg-teal-300" label="Group B" />
            <LegendDot className="bg-white/[0.08]" label="Vacant" />
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <Readout
              label="Satisfied"
              value={`${metrics.satisfiedPercent}%`}
              note="agents currently meeting the local threshold"
              rgb="167,139,250"
            />
            <Readout
              label="Mean local similarity"
              value={`${metrics.localSimilarityPercent}%`}
              note="same-group share among occupied neighbors"
              rgb="94,234,212"
            />
            <Readout
              label="Steps"
              value={String(steps)}
              note={`${metrics.dissatisfied} agents currently below threshold`}
              rgb="250,204,21"
            />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
            <label className="rounded-[18px] border border-violet-100/[0.09] bg-black/[0.12] p-4 backdrop-blur-[12px]">
              <span className="flex items-center justify-between gap-3 text-[13px] text-slate-300">
                <span className="flex items-center gap-2 font-semibold">
                  <Gauge size={15} className="text-violet-200" /> Similar-neighbor threshold
                </span>
                <strong className="font-mono text-violet-100">{threshold}%</strong>
              </span>
              <input
                type="range"
                min="0"
                max="70"
                step="5"
                value={threshold}
                onChange={(event) => {
                  setRunning(false);
                  setThreshold(Number(event.target.value));
                }}
                className="mt-4 w-full accent-violet-400"
              />
              <div className="mt-2 flex justify-between font-mono text-[11px] text-slate-600">
                <span>0%</span>
                <span>35%</span>
                <span>70%</span>
              </div>
              <p className="mt-3 text-[12px] leading-5 text-slate-400/70">
                The threshold is a local preference in this model. It is not a measured attitude score and should not be interpreted as one.
              </p>
            </label>

            <div className="rounded-[18px] border border-white/[0.08] bg-black/[0.10] p-4 backdrop-blur-[12px]">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">
                Simulation controls
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRunning((value) => !value)}
                  disabled={metrics.dissatisfied === 0}
                  className="flex min-h-[44px] items-center justify-center gap-2 rounded-[12px] border border-violet-200/[0.20] bg-violet-300/[0.06] text-[12px] font-semibold text-violet-100 disabled:opacity-35"
                >
                  {running ? <Pause size={14} /> : <Play size={14} />}
                  {running ? "Pause" : "Run"}
                </button>
                <button
                  type="button"
                  onClick={step}
                  disabled={running || metrics.dissatisfied === 0}
                  className="flex min-h-[44px] items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-black/[0.14] text-[12px] font-semibold text-slate-300 disabled:opacity-35"
                >
                  <StepForward size={14} /> Step
                </button>
              </div>
              <button
                type="button"
                onClick={reset}
                className="mt-2 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-black/[0.14] text-[12px] font-semibold text-slate-300 transition hover:bg-white/[0.04]"
              >
                <RefreshCw size={14} /> New random population
              </button>
            </div>
          </div>

          <div className="mt-4 border-l-2 border-violet-300/50 pl-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-violet-200/70">
              What to notice
            </div>
            <p className="mt-2 text-[14px] leading-6 text-slate-300/70">
              Compare the threshold you set with the eventual mean local similarity. The system can become more clustered than any single agent explicitly requested because one move changes the neighborhood conditions faced by others.
            </p>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function createGrid(): Cell[] {
  return Array.from({ length: SIZE * SIZE }, () => {
    const roll = Math.random();
    if (roll < VACANCY_RATE) return 0;
    return roll < VACANCY_RATE + (1 - VACANCY_RATE) / 2 ? 1 : 2;
  });
}

function analyzeGrid(grid: Cell[], threshold: number): GridMetrics {
  let agents = 0;
  let satisfied = 0;
  let similaritySum = 0;
  let similarityCount = 0;
  let dissatisfied = 0;

  for (let index = 0; index < grid.length; index += 1) {
    const cell = grid[index];
    if (cell === 0) continue;
    agents += 1;
    const ratio = localSimilarity(grid, index, cell);
    if (ratio === null || ratio >= threshold) satisfied += 1;
    else dissatisfied += 1;
    if (ratio !== null) {
      similaritySum += ratio;
      similarityCount += 1;
    }
  }

  return {
    agents,
    dissatisfied,
    satisfiedPercent: agents === 0 ? 100 : Math.round((satisfied / agents) * 100),
    localSimilarityPercent:
      similarityCount === 0
        ? 100
        : Math.round((similaritySum / similarityCount) * 100),
  };
}

function stepGrid(grid: Cell[], threshold: number): Cell[] {
  const next = [...grid];
  const vacant = grid
    .map((cell, index) => (cell === 0 ? index : -1))
    .filter((index) => index >= 0);
  const movers = grid
    .map((cell, index) => {
      if (cell === 0) return -1;
      const ratio = localSimilarity(grid, index, cell);
      return ratio !== null && ratio < threshold ? index : -1;
    })
    .filter((index) => index >= 0);

  shuffleInPlace(movers);

  for (const source of movers) {
    if (vacant.length === 0) break;
    const agent = next[source];
    if (agent === 0) continue;
    const vacancyIndex = Math.floor(Math.random() * vacant.length);
    const target = vacant[vacancyIndex];
    next[target] = agent;
    next[source] = 0;
    vacant[vacancyIndex] = source;
  }

  return next;
}

function localSimilarity(grid: Cell[], index: number, cell: Exclude<Cell, 0>) {
  const row = Math.floor(index / SIZE);
  const column = index % SIZE;
  let occupiedNeighbors = 0;
  let sameNeighbors = 0;

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
      if (rowOffset === 0 && columnOffset === 0) continue;
      const neighborRow = row + rowOffset;
      const neighborColumn = column + columnOffset;
      if (
        neighborRow < 0 ||
        neighborRow >= SIZE ||
        neighborColumn < 0 ||
        neighborColumn >= SIZE
      ) {
        continue;
      }
      const neighbor = grid[neighborRow * SIZE + neighborColumn];
      if (neighbor === 0) continue;
      occupiedNeighbors += 1;
      if (neighbor === cell) sameNeighbors += 1;
    }
  }

  return occupiedNeighbors === 0 ? null : sameNeighbors / occupiedNeighbors;
}

function shuffleInPlace(values: number[]) {
  for (let index = values.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [values[index], values[swapIndex]] = [values[swapIndex], values[index]];
  }
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-[2px] ${className}`} />
      {label}
    </span>
  );
}

function Readout({
  label,
  value,
  note,
  rgb,
}: {
  label: string;
  value: string;
  note: string;
  rgb: string;
}) {
  return (
    <div className="border-l px-3 py-2" style={{ borderColor: `rgba(${rgb},0.42)` }}>
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-[24px] font-semibold" style={{ color: `rgb(${rgb})` }}>
        {value}
      </div>
      <div className="mt-1 text-[11px] leading-4 text-slate-500">{note}</div>
    </div>
  );
}
