"use client";

import Link from "next/link";
import {
  Boxes,
  ExternalLink,
  Layers3,
  Network,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { PAGE_PATTERN_LIBRARY, type PagePatternKind } from "@/lib/page-system/pattern-library";
import type { FoundryPattern } from "@/lib/page-foundry/schema";

const ICON: Record<PagePatternKind, LucideIcon> = {
  topology: Network,
  widget: Boxes,
  background: Sparkles,
  adapter: Layers3,
  "card-grammar": Boxes,
  instrument: Layers3,
};

export default function FoundryPatternLibrary({ ledgerPatterns }: { ledgerPatterns: FoundryPattern[] }) {
  const ledgerById = new Map(ledgerPatterns.map((pattern) => [pattern.id, pattern]));

  return (
    <section className="mx-auto w-full max-w-[1720px] px-4 pb-8">
      <div className="rounded-[20px] border border-white/[0.08] bg-[#0b0e14] p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-violet-200/65">Extracted Studio vocabulary</div>
            <h2 className="mt-1 text-[18px] font-semibold tracking-[-0.035em] text-white">Pattern library</h2>
            <p className="mt-1 max-w-3xl text-[9px] leading-4 text-slate-600">Finished pages leave behind reusable topology, widget, and background primitives. Future Foundry briefs can reference these instead of reinventing the implementation.</p>
          </div>
          <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">{PAGE_PATTERN_LIBRARY.length} implemented patterns</div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {PAGE_PATTERN_LIBRARY.map((pattern) => {
            const Icon = ICON[pattern.kind];
            const ledger = ledgerById.get(pattern.id);
            return (
              <article key={pattern.id} className="rounded-[16px] border border-white/[0.065] bg-white/[0.018] p-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-[11px] border border-violet-300/[0.12] bg-violet-400/[0.035] text-violet-200/65"><Icon size={14} /></span>
                  <div className="text-right font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{pattern.kind} · {ledger?.status ?? "implemented"}</div>
                </div>
                <h3 className="mt-3 text-[11px] font-semibold text-slate-200">{pattern.label}</h3>
                <p className="mt-1.5 text-[8px] leading-4 text-slate-600">{pattern.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {pattern.parameters.map((parameter) => <span key={parameter} className="rounded-full border border-white/[0.06] bg-black/20 px-2 py-1 font-mono text-[7px] text-slate-700">{parameter}</span>)}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/[0.055] pt-3">
                  <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{pattern.scope} · {pattern.component ?? "metadata"}</span>
                  <Link href={pattern.sourcePage} target="_blank" className="flex items-center gap-1 text-[8px] text-slate-600 transition hover:text-white">source <ExternalLink size={9} /></Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
