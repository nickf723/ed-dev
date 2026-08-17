"use client";

import { useEffect, useState } from "react";
import {
  Boxes,
  CheckCircle2,
  Pause,
  Play,
  RotateCcw,
  Shuffle,
  StepForward,
} from "lucide-react";
import {
  DEFAULT_VALUES,
  advanceBubbleSort,
  initialSort,
  shuffleValues,
  type SortState,
} from "./algorithm-model";

export default function SortingLab() {
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
    }, 470);
    return () => window.clearInterval(timer);
  }, [running]);

  function reset(values = DEFAULT_VALUES) {
    setRunning(false);
    setState(initialSort(values));
  }

  return (
    <section className="overflow-hidden rounded-[26px] border border-emerald-100/[0.14] bg-[#07110b]/82 shadow-[0_28px_100px_rgba(0,0,0,0.25)] backdrop-blur-lg">
      <div className="flex flex-col gap-4 border-b border-emerald-100/[0.10] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-200/72">
            <Boxes size={14} /> Widget 02 · sorting conveyor
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,3rem)] font-semibold tracking-[-0.045em] text-white">
            Repeated local comparisons can build a global order.
          </h2>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/68">
            Bubble sort is deliberately simple rather than efficient. Each pass compares neighboring values and pushes the largest remaining value into the sorted suffix.
          </p>
        </div>
        <div className="rounded-[14px] border border-emerald-100/[0.12] bg-black/[0.18] px-4 py-3 text-right">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">
            Machine state
          </div>
          <strong className="mt-1 block text-[14px] text-emerald-100">
            {state.done ? "sorted" : `pass ${state.pass + 1} · compare ${state.index + 1}`}
          </strong>
        </div>
      </div>

      <div className="relative overflow-hidden border-b border-emerald-100/[0.09] bg-[#030905]/78 px-4 pb-5 pt-7 sm:px-6">
        <div className="pointer-events-none absolute inset-x-0 bottom-4 h-px bg-emerald-200/[0.14]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-1 h-3 bg-[repeating-linear-gradient(90deg,rgba(52,211,153,0.16)_0_18px,transparent_18px_34px)] opacity-50" />
        <div className="flex min-h-[270px] items-end justify-center gap-2 sm:gap-3">
          {state.values.map((value, index) => {
            const active = state.active?.includes(index) ?? false;
            const sorted = state.done || index >= state.values.length - state.pass;
            return (
              <div
                key={`${index}-${value}`}
                className="flex h-[250px] min-w-0 flex-1 flex-col justify-end"
              >
                <div
                  className="relative mx-auto w-full max-w-[64px] rounded-t-[10px] border transition-all duration-300"
                  style={{
                    height: `${32 + value * 21}px`,
                    borderColor: active
                      ? "rgba(250,204,21,0.56)"
                      : sorted
                        ? "rgba(52,211,153,0.38)"
                        : "rgba(34,211,238,0.20)",
                    background: active
                      ? "linear-gradient(180deg,rgba(250,204,21,0.34),rgba(49,31,3,0.84))"
                      : sorted
                        ? "linear-gradient(180deg,rgba(52,211,153,0.24),rgba(4,30,19,0.86))"
                        : "linear-gradient(180deg,rgba(34,211,238,0.17),rgba(3,18,25,0.84))",
                    boxShadow: active
                      ? "0 0 32px rgba(250,204,21,0.16)"
                      : undefined,
                    transform: active ? "translateY(-8px)" : undefined,
                  }}
                >
                  <span className="absolute inset-x-0 top-2 text-center font-mono text-[13px] font-semibold text-white/84">
                    {value}
                  </span>
                </div>
                <span className="mt-2 text-center font-mono text-[11px] text-slate-600">
                  {index}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div>
          <div className="grid gap-2 sm:grid-cols-3">
            <Readout label="Comparisons" value={String(state.comparisons)} rgb="250,204,21" />
            <Readout label="Swaps" value={String(state.swaps)} rgb="244,114,182" />
            <Readout label="Worst case" value="O(n²)" rgb="167,139,250" />
          </div>
          <div className="mt-3 rounded-[15px] border border-emerald-100/[0.10] bg-emerald-300/[0.03] p-3">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-200/68">
              <CheckCircle2 size={13} /> Loop invariant
            </div>
            <p className="mt-2 text-[13px] leading-5 text-slate-200/72">
              After pass k, the k largest values occupy their final positions at the right edge. The unsorted prefix shrinks as the invariant grows.
            </p>
          </div>
        </div>

        <div className="rounded-[18px] border border-white/[0.08] bg-black/[0.18] p-4">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/68">
            Conveyor controls
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setRunning((value) => !value)}
              disabled={state.done}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-[12px] border border-emerald-200/[0.18] bg-emerald-300/[0.05] text-[12px] font-semibold text-emerald-100 disabled:opacity-35"
            >
              {running ? <Pause size={14} /> : <Play size={14} />}
              {running ? "Pause" : "Run"}
            </button>
            <button
              type="button"
              onClick={() => setState((current) => advanceBubbleSort(current))}
              disabled={state.done || running}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-black/[0.18] text-[12px] font-semibold text-slate-300 disabled:opacity-35"
            >
              <StepForward size={14} /> Step
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-black/[0.18] text-[12px] font-semibold text-slate-300"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
          <button
            type="button"
            onClick={() => reset(shuffleValues(DEFAULT_VALUES))}
            className="mt-2 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[12px] border border-white/[0.08] bg-black/[0.18] text-[12px] font-semibold text-slate-300 transition hover:bg-white/[0.04]"
          >
            <Shuffle size={14} /> Randomize input
          </button>
          <p className="mt-3 text-[12px] leading-5 text-slate-400/68">
            The highlighted pair is the only local comparison happening now. The green suffix has already reached its final order.
          </p>
        </div>
      </div>
    </section>
  );
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return (
    <div className="rounded-[13px] border border-white/[0.08] bg-black/[0.16] p-3">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">
        {label}
      </div>
      <div
        className="mt-1.5 text-[14px] font-semibold"
        style={{ color: `rgb(${rgb})` }}
      >
        {value}
      </div>
    </div>
  );
}
