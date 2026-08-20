"use client";

import { Atom, Layers, Scale, Sparkles } from "lucide-react";
import type { APIElement } from "./chemistry-api";

export default function ElementInspector({ element }: { element: APIElement | null }) {
  if (!element) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[24px] border border-white/[0.09] bg-black/[0.24] p-8 text-center backdrop-blur-md">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-200/[0.15] bg-emerald-300/[0.04] text-emerald-100/30">
          <Atom size={34} strokeWidth={1.4} />
        </span>
        <h3 className="mt-5 text-[20px] font-semibold text-white/78">Select an element</h3>
        <p className="mt-2 max-w-xs text-[14px] leading-6 text-slate-400/68">
          Open a cell to inspect identity, mass, electronic structure, and chemical family.
        </p>
      </div>
    );
  }

  return (
    <article className="overflow-hidden rounded-[24px] border border-white/[0.10] bg-black/[0.28] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-200/72">
          <Atom size={14} /> Atomic record
        </div>
        <span className="font-mono text-[22px] font-semibold text-white/18">
          {String(element.number).padStart(3, "0")}
        </span>
      </div>

      <div className="p-6">
        <div className="grid gap-5 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-center xl:grid-cols-1">
          <div className="relative flex h-36 w-36 items-center justify-center rounded-[26px] border border-white/[0.10] bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(145deg,rgba(52,211,153,0.08),rgba(0,0,0,0.28))] shadow-inner">
            <span className="text-[64px] font-semibold tracking-[-0.07em] text-white">
              {element.symbol}
            </span>
            <span className="absolute left-3 top-3 font-mono text-[12px] text-emerald-200/76">
              {element.number}
            </span>
            <span className="absolute bottom-3 right-3 font-mono text-[11px] text-slate-400/60">
              {element.atomic_mass.toFixed(2)}
            </span>
          </div>

          <div>
            <h2 className="text-[30px] font-semibold tracking-[-0.045em] text-white">
              {element.name}
            </h2>
            <span className="mt-2 inline-flex rounded-full border border-emerald-200/[0.15] bg-emerald-300/[0.045] px-3 py-1.5 text-[12px] font-medium capitalize text-emerald-100/78">
              {element.category}
            </span>
            <p className="mt-4 text-[14px] leading-6 text-slate-300/66">
              Atomic number fixes the element&apos;s identity. Electron configuration and periodic position expose recurring chemical behavior.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <StatRow icon={Scale} label="Atomic mass" value={`${element.atomic_mass.toFixed(4)} u`} />
          <StatRow icon={Layers} label="Electron configuration" value={element.electron_configuration || "Not reported"} />
          <StatRow icon={Sparkles} label="Periodic family" value={element.category} />
        </div>
      </div>
    </article>
  );
}

function StatRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Atom;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-[15px] border border-white/[0.07] bg-white/[0.018] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-400">
        <Icon size={15} className="text-emerald-200/58" />
        {label}
      </div>
      <span className="break-words font-mono text-[12px] text-slate-200/82 sm:max-w-[58%] sm:text-right">
        {value}
      </span>
    </div>
  );
}
