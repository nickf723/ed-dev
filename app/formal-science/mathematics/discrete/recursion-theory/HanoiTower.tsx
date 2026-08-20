"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleStop,
  MousePointer2,
  Pause,
  Play,
  RefreshCcw,
  Route,
} from "lucide-react";
import {
  CANONICAL_RECURSION_CASE,
  HANOI_DISKS,
  HANOI_PEGS,
  createHanoiTowers,
  generateHanoiMoves,
  hanoiMoveCount,
  towersAfterMoves,
  tryManualHanoiMove,
  type HanoiPeg,
  type HanoiTowers,
} from "./recursionModel";

type WorkbenchMode = "trace" | "manual";

const MANUAL_REASON = {
  empty: "That peg has no disk to move.",
  "same-peg": "Source and destination must be different pegs.",
  "larger-on-smaller": "A larger disk cannot rest on a smaller disk.",
} as const;

export default function HanoiTower() {
  const [mode, setMode] = useState<WorkbenchMode>("trace");
  const [diskCount, setDiskCount] = useState(
    CANONICAL_RECURSION_CASE.diskCount
  );
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [manualTowers, setManualTowers] = useState<HanoiTowers>(() =>
    createHanoiTowers(CANONICAL_RECURSION_CASE.diskCount)
  );
  const [selectedPeg, setSelectedPeg] = useState<HanoiPeg>();
  const [manualMoves, setManualMoves] = useState(0);
  const [message, setMessage] = useState(
    "Begin with the smaller H(2) subproblem."
  );

  const moves = useMemo(() => generateHanoiMoves(diskCount), [diskCount]);
  const traceTowers = useMemo(
    () => towersAfterMoves(diskCount, moves, step),
    [diskCount, moves, step]
  );
  const towers = mode === "trace" ? traceTowers : manualTowers;
  const currentMove = step > 0 ? moves[step - 1] : undefined;
  const nextMove = step < moves.length ? moves[step] : undefined;

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setStep((current) => {
        if (current >= moves.length) {
          setIsPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 650);

    return () => window.clearInterval(timer);
  }, [isPlaying, moves.length]);

  const reset = (nextMode: WorkbenchMode = mode, nextCount = diskCount) => {
    setIsPlaying(false);
    setStep(0);
    setManualTowers(createHanoiTowers(nextCount));
    setSelectedPeg(undefined);
    setManualMoves(0);
    setMessage(
      nextMode === "trace"
        ? `Begin with the smaller H(${nextCount - 1}) subproblem.`
        : `Select a source peg, then a destination. Aim for ${hanoiMoveCount(nextCount)} moves.`
    );
  };

  const chooseMode = (nextMode: WorkbenchMode) => {
    setMode(nextMode);
    reset(nextMode);
  };

  const chooseDiskCount = (nextCount: number) => {
    setDiskCount(nextCount);
    reset(mode, nextCount);
  };

  const choosePeg = (peg: HanoiPeg) => {
    if (mode !== "manual") return;

    if (!selectedPeg) {
      if (manualTowers[peg].length === 0) {
        setMessage(MANUAL_REASON.empty);
        return;
      }
      setSelectedPeg(peg);
      setMessage(`Peg ${peg} selected. Choose a destination.`);
      return;
    }

    const result = tryManualHanoiMove(manualTowers, selectedPeg, peg);
    setSelectedPeg(undefined);

    if (!result.ok) {
      setMessage(MANUAL_REASON[result.reason]);
      return;
    }

    const nextMoveCount = manualMoves + 1;
    setManualTowers(result.towers);
    setManualMoves(nextMoveCount);

    if (result.towers.C.length === diskCount) {
      const minimum = hanoiMoveCount(diskCount);
      setMessage(
        nextMoveCount === minimum
          ? `Solved in the minimum ${minimum} moves.`
          : `Solved in ${nextMoveCount} moves; the recursive trace uses ${minimum}.`
      );
    } else {
      setMessage(`Moved disk ${result.disk} from ${selectedPeg} to ${peg}.`);
    }
  };

  return (
    <div className="bg-[#050a16]/74 border border-cyan-100/[0.15] shadow-[0_36px_110px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
      <div className="grid border-b border-white/[0.08] xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-5 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/60">
                <Route size={14} /> Recursive workbench
              </div>
              <h3 className="mt-2 text-[27px] font-semibold tracking-[-0.045em] text-white">
                Tower of Hanoi
              </h3>
              <p className="mt-2 max-w-2xl text-[13px] leading-6 text-slate-400">
                Move the whole stack from A to C. Only the top disk may move,
                and no larger disk may rest on a smaller one.
              </p>
            </div>

            <div className="flex flex-wrap gap-2" aria-label="Workbench mode">
              <ModeButton
                active={mode === "trace"}
                onClick={() => chooseMode("trace")}
                icon={Route}
              >
                Guided trace
              </ModeButton>
              <ModeButton
                active={mode === "manual"}
                onClick={() => chooseMode("manual")}
                icon={MousePointer2}
              >
                Try the puzzle
              </ModeButton>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 border-y border-white/[0.07] py-3">
            <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-600">
              disks
            </span>
            {[2, 3, 4, 5].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => chooseDiskCount(count)}
                aria-pressed={diskCount === count}
                className={`h-9 min-w-9 border px-3 font-mono text-[12px] transition-colors ${
                  diskCount === count
                    ? "border-violet-200/35 bg-violet-300/[0.1] text-violet-50"
                    : "border-white/[0.08] bg-black/15 text-slate-500 hover:border-white/[0.16] hover:text-slate-300"
                }`}
              >
                {count}
              </button>
            ))}
            <span className="ml-auto font-mono text-[11px] text-violet-100/70">
              minimum · {hanoiMoveCount(diskCount)} moves
            </span>
          </div>
        </div>

        <aside className="border-t border-white/[0.08] bg-black/15 p-5 sm:p-7 xl:border-l xl:border-t-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-100/55">
            {mode === "trace" ? "Trace readout" : "Manual readout"}
          </div>
          <strong className="mt-3 block font-mono text-[22px] font-medium text-white">
            {mode === "trace"
              ? `${step} / ${moves.length}`
              : `${manualMoves} move${manualMoves === 1 ? "" : "s"}`}
          </strong>
          <p
            className="mt-3 min-h-12 text-[13px] leading-6 text-slate-400"
            role="status"
          >
            {mode === "trace"
              ? currentMove
                ? `Move ${currentMove.index}: disk ${currentMove.disk}, ${currentMove.from} → ${currentMove.to}. Depth ${currentMove.depth}.`
                : message
              : message}
          </p>

          {mode === "trace" ? (
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setStep((value) => Math.max(0, value - 1));
                }}
                disabled={step === 0}
                aria-label="Previous move"
                className="control-button"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying((value) => !value)}
                disabled={step === moves.length}
                className="control-button min-w-24"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setStep((value) => Math.min(moves.length, value + 1));
                }}
                disabled={step === moves.length}
                aria-label="Next move"
                className="control-button"
              >
                <ChevronRight size={15} />
              </button>
              <button
                type="button"
                onClick={() => reset("trace")}
                aria-label="Reset trace"
                className="control-button ml-auto"
              >
                <RefreshCcw size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => reset("manual")}
              className="control-button mt-5"
            >
              <RefreshCcw size={14} /> Reset puzzle
            </button>
          )}
        </aside>
      </div>

      <div className="p-4 sm:p-7">
        <div className="relative min-h-[330px] overflow-hidden border border-white/[0.08] bg-[linear-gradient(180deg,rgba(8,15,30,0.72),rgba(2,6,15,0.94))] px-2 pb-7 pt-9 sm:px-7">
          <div className="absolute inset-x-0 bottom-6 h-px bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent" />
          <div className="absolute inset-x-[8%] top-1/2 h-px bg-violet-200/[0.04]" />

          <div className="grid min-h-[280px] grid-cols-3 gap-2 sm:gap-5">
            {HANOI_PEGS.map((peg) => (
              <button
                key={peg}
                type="button"
                onClick={() => choosePeg(peg)}
                disabled={mode === "trace"}
                aria-pressed={mode === "manual" && selectedPeg === peg}
                aria-label={`Peg ${peg}, ${towers[peg].length} disk${towers[peg].length === 1 ? "" : "s"}`}
                className={`group relative flex min-w-0 flex-col items-center justify-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/50 ${
                  mode === "manual" ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <span
                  className={`absolute bottom-5 left-1/2 top-9 w-1 -translate-x-1/2 rounded-t-full transition-colors ${
                    selectedPeg === peg
                      ? "bg-cyan-200 shadow-[0_0_24px_rgba(103,232,249,0.42)]"
                      : "bg-slate-600/80 group-hover:bg-slate-500/90"
                  }`}
                />
                <span className="relative z-10 flex w-full max-w-[190px] flex-col-reverse items-center gap-1.5 px-1 pb-5">
                  {towers[peg].map((size) => (
                    <HanoiDiskMark key={size} size={size} maximum={diskCount} />
                  ))}
                </span>
                <span className="relative z-10 mt-3 flex h-9 min-w-9 items-center justify-center border border-white/[0.1] bg-[#06101d] font-mono text-[12px] text-slate-300">
                  {peg}
                </span>
              </button>
            ))}
          </div>
        </div>

        {mode === "trace" ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-center">
            <label>
              <span className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                move trace
                <span>
                  {nextMove
                    ? `next · disk ${nextMove.disk} ${nextMove.from}→${nextMove.to}`
                    : "complete · stack transferred"}
                </span>
              </span>
              <input
                type="range"
                min={0}
                max={moves.length}
                value={step}
                onChange={(event) => {
                  setIsPlaying(false);
                  setStep(Number(event.target.value));
                }}
                className="mt-3 w-full accent-cyan-300"
              />
            </label>
            <div className="border-violet-200/18 flex items-center gap-3 border-l pl-4 text-[12px] leading-5 text-slate-500">
              <CircleStop size={17} className="shrink-0 text-violet-200/60" />
              The base case moves one disk directly. Every larger call leaves
              work waiting while a smaller call runs.
            </div>
          </div>
        ) : null}
      </div>

      <style>{`
        .control-button {
          display: inline-flex;
          min-height: 2.5rem;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          border: 1px solid rgba(165, 243, 252, 0.16);
          background: rgba(34, 211, 238, 0.055);
          padding: 0 0.75rem;
          color: rgba(224, 231, 255, 0.82);
          font-size: 0.75rem;
          font-weight: 600;
          transition: background-color 160ms ease, border-color 160ms ease;
        }
        .control-button:hover:not(:disabled) {
          border-color: rgba(165, 243, 252, 0.3);
          background: rgba(34, 211, 238, 0.1);
        }
        .control-button:disabled {
          cursor: not-allowed;
          opacity: 0.3;
        }
        .control-button:focus-visible {
          outline: 2px solid rgba(165, 243, 252, 0.58);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Route;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-10 items-center gap-2 border px-3 text-[12px] font-semibold transition-colors ${
        active
          ? "border-cyan-200/30 bg-cyan-300/[0.08] text-cyan-50"
          : "border-white/[0.08] bg-black/15 text-slate-500 hover:border-white/[0.16] hover:text-slate-300"
      }`}
    >
      <Icon size={14} /> {children}
    </button>
  );
}

const DISK_TONE = {
  cyan: "border-cyan-100/50 bg-gradient-to-r from-cyan-800 to-cyan-500 text-cyan-50 shadow-[0_0_24px_rgba(6,182,212,0.12)]",
  violet:
    "border-violet-100/50 bg-gradient-to-r from-violet-800 to-violet-500 text-violet-50 shadow-[0_0_24px_rgba(139,92,246,0.12)]",
  rose: "border-rose-100/50 bg-gradient-to-r from-rose-800 to-rose-500 text-rose-50 shadow-[0_0_24px_rgba(244,63,94,0.12)]",
  amber:
    "border-amber-100/50 bg-gradient-to-r from-amber-800 to-amber-500 text-amber-50 shadow-[0_0_24px_rgba(245,158,11,0.12)]",
  emerald:
    "border-emerald-100/50 bg-gradient-to-r from-emerald-800 to-emerald-500 text-emerald-50 shadow-[0_0_24px_rgba(16,185,129,0.12)]",
} as const;

function HanoiDiskMark({ size, maximum }: { size: number; maximum: number }) {
  const disk = HANOI_DISKS[size - 1];
  const width = 42 + (size / maximum) * 56;

  return (
    <span
      className={`flex h-8 items-center justify-center rounded-full border font-mono text-[11px] font-semibold ${DISK_TONE[disk.tone]}`}
      style={{ width: `${width}%` }}
    >
      {disk.label}
    </span>
  );
}
