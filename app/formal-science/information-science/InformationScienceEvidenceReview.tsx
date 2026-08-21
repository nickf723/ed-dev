"use client";

import { useState } from "react";
import { CheckCircle2, FileSearch, RotateCcw, XCircle } from "lucide-react";
import {
  INFORMATION_SCIENCE_EVIDENCE_CASES,
  isInformationScienceEvidenceAnswerCorrect,
} from "./informationScienceModel";

type CaseId = (typeof INFORMATION_SCIENCE_EVIDENCE_CASES)[number]["id"];
type Answers = Partial<Record<CaseId, string>>;

export default function InformationScienceEvidenceReview() {
  const [activeId, setActiveId] = useState<CaseId>(
    INFORMATION_SCIENCE_EVIDENCE_CASES[0].id,
  );
  const [answers, setAnswers] = useState<Answers>({});
  const active =
    INFORMATION_SCIENCE_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    INFORMATION_SCIENCE_EVIDENCE_CASES[0];
  const selectedOptionId = answers[active.id];
  const answered = selectedOptionId !== undefined;
  const correct = answered
    ? isInformationScienceEvidenceAnswerCorrect(active.id, selectedOptionId)
    : false;

  function reset() {
    setAnswers({});
    setActiveId(INFORMATION_SCIENCE_EVIDENCE_CASES[0].id);
  }

  return (
    <section className="overflow-hidden rounded-[30px] border border-cyan-100/[0.12] bg-[#06111a]/64 backdrop-blur-2xl">
      <div className="grid gap-4 border-b border-white/[0.07] p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-100/58">
            <FileSearch size={14} aria-hidden="true" /> Assessment · inspect the claim record
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.6vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white">
            Attach every conclusion to its representation, metric, collection boundary, and user context.
          </h2>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-black/20 px-4 py-2 text-[12px] font-semibold text-slate-300 transition hover:border-cyan-100/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60"
        >
          <RotateCcw size={13} aria-hidden="true" /> Reset review
        </button>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <div className="border-b border-white/[0.07] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <RecordPreview />
          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {INFORMATION_SCIENCE_EVIDENCE_CASES.map((item, index) => {
              const itemAnswer = answers[item.id];
              const itemCorrect = itemAnswer
                ? isInformationScienceEvidenceAnswerCorrect(item.id, itemAnswer)
                : undefined;
              const selected = item.id === active.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(item.id)}
                  className={`grid min-h-[68px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60 ${
                    selected
                      ? "border-cyan-200/30 bg-cyan-300/[0.06]"
                      : "border-white/[0.06] bg-black/[0.05] hover:border-white/[0.14]"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-black/20 font-mono text-[10px] text-slate-500">
                    {itemCorrect === true ? (
                      <CheckCircle2 size={15} className="text-emerald-300" aria-label="Correct" />
                    ) : itemCorrect === false ? (
                      <XCircle size={15} className="text-rose-300" aria-label="Try again" />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </span>
                  <span>
                    <span className="block text-[12px] font-semibold text-white/85">{item.label}</span>
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.08em] text-slate-600">{item.eyebrow}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-6 xl:p-8">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-violet-100/55">Observed record</div>
          <p className="mt-2 border-l border-violet-200/20 pl-4 text-[13px] leading-6 text-slate-300/75">{active.observation}</p>
          <h3 className="mt-6 max-w-4xl text-[clamp(1.3rem,2.25vw,1.85rem)] font-semibold leading-[1.22] tracking-[-0.035em] text-white">{active.prompt}</h3>

          <div className="mt-6 grid gap-3" role="group" aria-label={active.prompt}>
            {active.options.map((option) => {
              const selected = option.id === selectedOptionId;
              const optionCorrect = isInformationScienceEvidenceAnswerCorrect(active.id, option.id);
              const stateClass = answered
                ? optionCorrect
                  ? "border-emerald-300/38 bg-emerald-300/[0.07]"
                  : selected
                    ? "border-rose-300/38 bg-rose-300/[0.07]"
                    : "border-white/[0.06] bg-black/[0.05] opacity-[0.62]"
                : selected
                  ? "border-cyan-200/36 bg-cyan-300/[0.07]"
                  : "border-white/[0.08] bg-black/[0.08] hover:border-cyan-100/24";

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAnswers((current) => ({ ...current, [active.id]: option.id }))}
                  className={`rounded-[18px] border px-4 py-4 text-left text-[14px] leading-6 text-slate-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60 ${stateClass}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div
            className={`mt-5 min-h-[102px] border-l-2 px-4 py-3 ${
              answered
                ? correct
                  ? "border-emerald-300/50 bg-emerald-300/[0.035]"
                  : "border-rose-300/50 bg-rose-300/[0.035]"
                : "border-white/[0.10] bg-black/[0.06]"
            }`}
            aria-live="polite"
          >
            <strong className="text-[13px] text-white">
              {answered
                ? correct
                  ? "The claim fits its information boundary."
                  : "That claim discarded its own context."
                : "Choose a conclusion, then audit what makes it supportable."}
            </strong>
            <p className="mt-2 max-w-4xl text-[13px] leading-6 text-slate-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "Ask which representation, collection, metric, provenance trail, and user need define the result."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecordPreview() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-violet-100/[0.11] bg-[#030814]/78">
      <div className="border-b border-white/[0.07] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.09em] text-violet-100/50">record://collection/item/A17</div>
      <dl className="grid grid-cols-[94px_minmax(0,1fr)] text-[11px] leading-5">
        {[
          ["identifier", "loc.item/A17"],
          ["title", "Illustrative field photograph"],
          ["creator", "named photographer"],
          ["date", "recorded, qualified"],
          ["rights", "inspect item statement"],
          ["provenance", "source collection + query"],
        ].map(([term, value]) => (
          <div key={term} className="contents">
            <dt className="border-b border-r border-white/[0.055] px-3 py-2 font-mono text-cyan-200/42">{term}</dt>
            <dd className="border-b border-white/[0.055] px-3 py-2 text-slate-500">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="px-4 py-4 text-[12px] leading-5 text-slate-500">A usable record preserves enough identity and context to inspect the object, the description, and the path by which it was retrieved.</p>
    </div>
  );
}
