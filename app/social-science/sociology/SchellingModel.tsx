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
import {
  SCHELLING_GRID_SIZE,
  SCHELLING_INITIAL_SEED,
  analyzeSchellingGrid,
  createSchellingGrid,
  stepSchellingGrid,
} from "./sociologyModel";

export default function SchellingModel() {
  const [threshold, setThreshold] = useState(30);
  const [seed, setSeed] = useState(SCHELLING_INITIAL_SEED);
  const [grid, setGrid] = useState(() => createSchellingGrid());
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState(0);

  const metrics = useMemo(
    () => analyzeSchellingGrid(grid, threshold / 100),
    [grid, threshold]
  );
  const activelyRunning = running && metrics.dissatisfied > 0;

  useEffect(() => {
    if (!activelyRunning) return;

    const timer = window.setInterval(() => {
      setGrid((current) =>
        stepSchellingGrid(current, threshold / 100, seed + steps + 1)
      );
      setSteps((value) => value + 1);
    }, 460);

    return () => window.clearInterval(timer);
  }, [activelyRunning, seed, steps, threshold]);

  function step() {
    setRunning(false);
    setGrid((current) =>
      stepSchellingGrid(current, threshold / 100, seed + steps + 1)
    );
    setSteps((value) => value + 1);
  }

  function reset() {
    setRunning(false);
    const nextSeed = seed + 1;
    setSeed(nextSeed);
    setGrid(createSchellingGrid(nextSeed));
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
            Each occupied cell compares itself with nearby occupied neighbors.
            If the share of same-group neighbors falls below the selected
            threshold, that agent moves to a vacant cell. Watch aggregate
            clustering emerge from a simple local rule.
          </p>
        </div>
        <div className="border-t border-violet-100/[0.08] bg-black/[0.08] p-5 backdrop-blur-[14px] lg:border-l lg:border-t-0">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/70">
            Model boundary
          </div>
          <p className="mt-3 text-[13px] leading-6 text-slate-300/70">
            This is a toy model of residential sorting, not a one-cause
            explanation of real segregation. Law, discrimination, wealth,
            housing markets, zoning, institutions, history, and geography also
            shape real patterns.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[430px_minmax(0,1fr)]">
        <div className="border-b border-violet-100/[0.08] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div
            className="bg-[#08050d]/74 mx-auto grid aspect-square w-full max-w-[350px] gap-[1px] rounded-[18px] border border-violet-100/[0.10] p-2 shadow-[inset_0_0_70px_rgba(0,0,0,0.24)] backdrop-blur-[8px]"
            style={{
              gridTemplateColumns: `repeat(${SCHELLING_GRID_SIZE}, minmax(0, 1fr))`,
            }}
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
                  <Gauge size={15} className="text-violet-200" />{" "}
                  Similar-neighbor threshold
                </span>
                <strong className="font-mono text-violet-100">
                  {threshold}%
                </strong>
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
                The threshold is a local preference in this model. It is not a
                measured attitude score and should not be interpreted as one.
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
                  {activelyRunning ? <Pause size={14} /> : <Play size={14} />}
                  {activelyRunning ? "Pause" : "Run"}
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
                <RefreshCw size={14} /> New seeded population
              </button>
            </div>
          </div>

          <div className="mt-4 border-l-2 border-violet-300/50 pl-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-violet-200/70">
              What to notice
            </div>
            <p className="mt-2 text-[14px] leading-6 text-slate-300/70">
              Compare the threshold you set with the eventual mean local
              similarity. The system can become more clustered than any single
              agent explicitly requested because one move changes the
              neighborhood conditions faced by others.
            </p>
          </div>
        </div>
      </div>
    </Surface>
  );
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
    <div
      className="border-l px-3 py-2"
      style={{ borderColor: `rgba(${rgb},0.42)` }}
    >
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
        {label}
      </div>
      <div
        className="mt-1 text-[24px] font-semibold"
        style={{ color: `rgb(${rgb})` }}
      >
        {value}
      </div>
      <div className="mt-1 text-[11px] leading-4 text-slate-500">{note}</div>
    </div>
  );
}
