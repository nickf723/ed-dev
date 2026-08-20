"use client";

import { useMemo, useState } from "react";
import { Check, Circle, GitMerge, Lightbulb, Scale, Waypoints } from "lucide-react";

const CHECKS = [
  {
    id: "sequence",
    label: "Sequence",
    prompt: "Did the proposed cause actually come first?",
    icon: Waypoints,
  },
  {
    id: "mechanism",
    label: "Mechanism",
    prompt: "Can you explain how it could produce the outcome?",
    icon: GitMerge,
  },
  {
    id: "evidence",
    label: "Evidence",
    prompt: "Is there source evidence connecting the two?",
    icon: Lightbulb,
  },
  {
    id: "alternatives",
    label: "Alternatives",
    prompt: "Have other plausible causes been compared?",
    icon: Scale,
  },
] as const;

export default function CausationCheck({
  cause = "Earlier event",
  outcome = "Later change",
}: {
  cause?: string;
  outcome?: string;
}) {
  const [checked, setChecked] = useState<string[]>(["sequence"]);
  const complete = checked.length === CHECKS.length;
  const strength = useMemo(() => Math.round((checked.length / CHECKS.length) * 100), [checked]);

  return (
    <div className="rounded-[26px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/70">Causation check</div>
          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.035em] text-white">Order is necessary. It is not enough.</h2>
          <p className="mt-2 max-w-2xl text-[11px] leading-5 text-slate-500">
            A timeline can show that one thing preceded another. Historical causation needs a mechanism, evidence, and comparison with alternatives before the sequence becomes an explanation.
          </p>
        </div>
        <div className="rounded-[16px] border border-amber-200/[0.12] bg-amber-300/[0.035] px-4 py-3 text-right">
          <div className="font-mono text-[7px] uppercase tracking-[0.12em] text-amber-200/55">Claim strength</div>
          <div className="mt-1 text-[22px] font-semibold text-amber-100">{strength}%</div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 overflow-x-auto rounded-[16px] border border-white/[0.06] bg-white/[0.015] p-3">
        <span className="shrink-0 rounded-full border border-white/[0.07] px-3 py-1.5 text-[9px] text-slate-300">{cause}</span>
        <div className="h-px min-w-10 flex-1 bg-gradient-to-r from-amber-300/30 to-cyan-300/30" />
        <span className="shrink-0 rounded-full border border-white/[0.07] px-3 py-1.5 text-[9px] text-slate-300">{outcome}</span>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {CHECKS.map((item) => {
          const active = checked.includes(item.id);
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                setChecked((current) =>
                  current.includes(item.id)
                    ? current.filter((value) => value !== item.id)
                    : [...current, item.id],
                )
              }
              className={`rounded-[16px] border p-4 text-left transition ${
                active
                  ? "border-emerald-200/[0.16] bg-emerald-300/[0.045]"
                  : "border-white/[0.06] bg-white/[0.012] hover:bg-white/[0.025]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 ${active ? "text-emerald-200" : "text-slate-700"}`}>
                  {active ? <Check size={14} /> : <Circle size={14} />}
                </span>
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-semibold text-white"><Icon size={12} /> {item.label}</div>
                  <p className="mt-1.5 text-[9px] leading-4 text-slate-600">{item.prompt}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className={`mt-4 rounded-[14px] border px-4 py-3 text-[9px] leading-4 ${complete ? "border-emerald-200/[0.13] bg-emerald-300/[0.035] text-emerald-100/70" : "border-white/[0.06] bg-white/[0.012] text-slate-600"}`}>
        {complete
          ? "This claim now has the minimum structure of a causal explanation. It can still be challenged by stronger evidence or a better competing explanation."
          : "Check the missing dimensions before treating chronological order as a causal explanation."}
      </div>
    </div>
  );
}
