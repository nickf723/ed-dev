"use client";

import { useMemo, useState } from "react";
import { Box, GitBranch, Hash, List, type LucideIcon } from "lucide-react";
import FundamentalsIDE from "./FundamentalsIDE";
import { FUNDAMENTALS_DATA, type CodeConcept } from "./fundamentals-data";

type Category = CodeConcept["category"];
const CATEGORIES: readonly { id: Category; label: string; icon: LucideIcon; question: string }[] = [
  { id: "PRIMITIVES", label: "Values & Types", icon: Hash, question: "What information exists, and which operations make sense for it?" },
  { id: "DATA STRUCTURES", label: "Collections", icon: List, question: "How should related values be organized so the program can access and update them?" },
  { id: "CONTROL FLOW", label: "Control Flow", icon: GitBranch, question: "What determines which operation happens next, repeats, or handles failure?" },
  { id: "MODULARITY", label: "Functions & Objects", icon: Box, question: "How can behavior and state be packaged behind reusable boundaries?" },
] as const;

export default function FundamentalsWorkbench() {
  const [category, setCategory] = useState<Category>("PRIMITIVES");
  const [conceptId, setConceptId] = useState(FUNDAMENTALS_DATA[0].id);
  const visible = useMemo(() => FUNDAMENTALS_DATA.filter((item) => item.category === category), [category]);
  const active = FUNDAMENTALS_DATA.find((item) => item.id === conceptId && item.category === category) ?? visible[0];

  function chooseCategory(next: Category) {
    setCategory(next);
    const first = FUNDAMENTALS_DATA.find((item) => item.category === next);
    if (first) setConceptId(first.id);
  }

  return (
    <section className="mt-5 grid gap-5 xl:grid-cols-[390px_minmax(0,1fr)]">
      <aside className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.14] backdrop-blur-xl">
        <div className="border-b border-white/[0.07] p-4">
          <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-green-200/46">Concept families</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {CATEGORIES.map((item) => {
              const Icon = item.icon;
              const selected = item.id === category;
              return <button key={item.id} type="button" onClick={() => chooseCategory(item.id)} className={`rounded-[13px] border p-3 text-left transition ${selected ? "border-green-200/[0.20] bg-green-200/[0.04]" : "border-white/[0.06] bg-black/[0.08] hover:bg-white/[0.025]"}`}><Icon size={13} className={selected ? "text-green-200/68" : "text-slate-700"}/><strong className="mt-2 block text-[10px] text-white/80">{item.label}</strong></button>;
            })}
          </div>
        </div>
        <div className="p-4">
          <div className="rounded-[15px] border border-green-200/[0.08] bg-green-200/[0.015] p-3 text-[10px] leading-5 text-slate-500">{CATEGORIES.find((item) => item.id === category)?.question}</div>
          <div className="mt-3 space-y-1.5">
            {visible.map((concept) => {
              const Icon = concept.icon;
              const selected = concept.id === active.id;
              return <button key={concept.id} type="button" onClick={() => setConceptId(concept.id)} className={`grid w-full grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[13px] border px-3 py-3 text-left transition ${selected ? "border-green-200/[0.18] bg-green-200/[0.035]" : "border-white/[0.05] bg-black/[0.06] hover:bg-white/[0.02]"}`}><span className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-white/[0.06]"><Icon size={13} className={selected ? "text-green-200/64" : "text-slate-700"}/></span><span><strong className="block text-[11px] text-white/82">{concept.title}</strong><span className="mt-0.5 line-clamp-1 block text-[9px] text-slate-700">{concept.desc}</span></span></button>;
            })}
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="mb-4 rounded-[24px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
          <div className="font-mono text-[8px] uppercase tracking-[0.11em] text-green-200/44">{active.category}</div>
          <h2 className="mt-1 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">{active.title}</h2>
          <p className="mt-3 max-w-4xl text-[12px] leading-6 text-slate-400">{active.desc}</p>
        </div>
        <FundamentalsIDE concept={active} />
      </div>
    </section>
  );
}
