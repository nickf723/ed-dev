"use client";

import { useState } from "react";
import { CheckCircle2, RotateCcw, Tags, XCircle } from "lucide-react";
import {
  TAXONOMY_ONTOLOGY_CASES,
  isTaxonomyOntologyAnswerCorrect,
} from "./taxonomyOntologyModel";

type CaseId = (typeof TAXONOMY_ONTOLOGY_CASES)[number]["id"];

export default function ClassificationChallenge() {
  const [activeId, setActiveId] = useState<CaseId>(TAXONOMY_ONTOLOGY_CASES[0].id);
  const [answers, setAnswers] = useState<Partial<Record<CaseId, string>>>({});
  const active = TAXONOMY_ONTOLOGY_CASES.find((item) => item.id === activeId) ?? TAXONOMY_ONTOLOGY_CASES[0];
  const selectedOptionId = answers[active.id];
  const answered = selectedOptionId !== undefined;
  const correct = answered ? isTaxonomyOntologyAnswerCorrect(active.id, selectedOptionId) : false;

  function reset() {
    setAnswers({});
    setActiveId(TAXONOMY_ONTOLOGY_CASES[0].id);
  }

  return (
    <section className="overflow-hidden rounded-[30px] border border-amber-100/[0.13] bg-[#0b0a18]/66 backdrop-blur-2xl">
      <div className="grid gap-4 border-b border-white/[0.07] p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-100/55"><Tags size={14} aria-hidden="true" /> Assessment · choose the commitment</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.9rem,3.5vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">Organize for the question without pretending the structure is the object.</h2>
        </div>
        <button type="button" onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-black/15 px-4 py-2 text-[12px] font-semibold text-slate-400 transition hover:border-amber-100/28 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"><RotateCcw size={13} aria-hidden="true" /> Reset cases</button>
      </div>

      <div className="grid xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="grid gap-2 border-b border-white/[0.07] p-4 sm:grid-cols-2 xl:grid-cols-1 xl:border-b-0 xl:border-r">
          {TAXONOMY_ONTOLOGY_CASES.map((item, index) => {
            const answer = answers[item.id];
            const itemCorrect = answer ? isTaxonomyOntologyAnswerCorrect(item.id, answer) : undefined;
            const selected = item.id === active.id;
            return (
              <button key={item.id} type="button" aria-pressed={selected} onClick={() => setActiveId(item.id)} className={`grid min-h-[64px] grid-cols-[32px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60 ${selected ? "border-amber-200/30 bg-amber-300/[0.06]" : "border-white/[0.06] bg-black/[0.04] hover:border-white/[0.14]"}`}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-black/15 font-mono text-[10px] text-slate-600">
                  {itemCorrect === true ? <CheckCircle2 size={15} className="text-emerald-300" aria-label="Correct" /> : itemCorrect === false ? <XCircle size={15} className="text-rose-300" aria-label="Try again" /> : String(index + 1).padStart(2, "0")}
                </span>
                <strong className="text-[12px] text-white/80">{item.label}</strong>
              </button>
            );
          })}
        </div>

        <div className="p-5 sm:p-7 xl:p-9">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-indigo-100/48">Design brief</div>
          <h3 className="mt-3 max-w-4xl text-[clamp(1.3rem,2.3vw,1.9rem)] font-semibold leading-[1.2] tracking-[-0.035em] text-white">{active.prompt}</h3>
          <div className="mt-6 grid gap-3" role="group" aria-label={active.prompt}>
            {active.options.map((option) => {
              const selected = option.id === selectedOptionId;
              const optionCorrect = isTaxonomyOntologyAnswerCorrect(active.id, option.id);
              const stateClass = answered
                ? optionCorrect
                  ? "border-emerald-300/38 bg-emerald-300/[0.07]"
                  : selected
                    ? "border-rose-300/38 bg-rose-300/[0.07]"
                    : "border-white/[0.06] bg-black/[0.04] opacity-[0.62]"
                : selected
                  ? "border-amber-200/36 bg-amber-300/[0.07]"
                  : "border-white/[0.08] bg-black/[0.07] hover:border-amber-100/24";
              return <button key={option.id} type="button" aria-pressed={selected} onClick={() => setAnswers((current) => ({ ...current, [active.id]: option.id }))} className={`rounded-[18px] border px-4 py-4 text-left text-[14px] leading-6 text-slate-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60 ${stateClass}`}>{option.label}</button>;
            })}
          </div>
          <div className={`mt-5 min-h-[96px] border-l-2 px-4 py-3 ${answered ? correct ? "border-emerald-300/50 bg-emerald-300/[0.035]" : "border-rose-300/50 bg-rose-300/[0.035]" : "border-white/[0.10] bg-black/[0.05]"}`} aria-live="polite">
            <strong className="text-[13px] text-white">{answered ? correct ? "The structure fits the question." : "That structure hides the requested relationship." : "Choose an organizing move, then inspect its assumptions."}</strong>
            <p className="mt-2 text-[13px] leading-6 text-slate-400">{answered ? correct ? active.success : active.correction : "Look for the difference between a browse hierarchy, a typed relation, a vocabulary rule, and a documented policy decision."}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
