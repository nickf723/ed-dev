"use client";

import { useState } from "react";
import { Check, Scale } from "lucide-react";

const REWRITE_STEPS = [
  {
    label: "Start",
    equation: "2(x + 3) = 10",
    operation: "same relationship",
    note: "An equation states that two expressions represent the same value.",
  },
  {
    label: "Expand",
    equation: "2x + 6 = 10",
    operation: "distribute 2",
    note: "The expression changes form, but its value does not.",
  },
  {
    label: "Isolate",
    equation: "2x = 4",
    operation: "subtract 6 from both sides",
    note: "Applying the same reversible operation preserves the solution set.",
  },
  {
    label: "Normalize",
    equation: "x = 2",
    operation: "divide both sides by 2",
    note: "A simpler representation reveals the hidden value directly.",
  },
] as const;

export default function EquivalenceRail() {
  const [rewriteIndex, setRewriteIndex] = useState(0);
  const rewrite = REWRITE_STEPS[rewriteIndex];

  return (
    <section className="mt-3 grid gap-3 rounded-[22px] border border-blue-200/[0.12] bg-black/[0.23] p-3.5 backdrop-blur-xl xl:h-[112px] xl:grid-cols-[230px_minmax(0,1fr)_330px] xl:items-stretch">
      <div className="flex min-w-0 items-center gap-3 xl:h-[82px]">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-300/[0.18] bg-blue-400/[0.055] text-blue-300">
          <Scale size={19} strokeWidth={1.45} />
        </span>
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-300/65">Equivalence rail</div>
          <p className="mt-1 text-[11px] leading-4 text-slate-500">Rewrite without changing what is true.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 xl:h-[82px]">
        {REWRITE_STEPS.map((step, index) => {
          const active = index === rewriteIndex;
          return (
            <button
              key={step.label}
              type="button"
              onClick={() => setRewriteIndex(index)}
              onMouseEnter={() => setRewriteIndex(index)}
              className="h-full min-w-0 rounded-xl border px-2 py-2.5 text-left transition-colors"
              style={{
                borderColor: active ? "rgba(96,165,250,0.34)" : "rgba(255,255,255,0.055)",
                background: active ? "rgba(96,165,250,0.075)" : "rgba(0,0,0,0.16)",
              }}
            >
              <div className={`text-[9px] font-semibold ${active ? "text-blue-300" : "text-slate-600"}`}>{step.label}</div>
              <div className="mt-1 truncate font-mono text-[11px] text-slate-300">{step.equation}</div>
            </button>
          );
        })}
      </div>

      <div className="grid h-[82px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.018] px-3.5 py-2.5">
        <div className="grid min-w-0 grid-rows-[24px_18px_32px]">
          <div className="truncate font-mono text-[17px] font-semibold leading-6 text-white">{rewrite.equation}</div>
          <div className="truncate text-[10px] font-medium leading-4 text-blue-300/70">{rewrite.operation}</div>
          <p className="line-clamp-2 text-[10px] leading-4 text-slate-500">{rewrite.note}</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-300/[0.15] bg-emerald-400/[0.045] text-emerald-300" title="Solution preserved">
          <Check size={14} />
        </div>
      </div>
    </section>
  );
}
