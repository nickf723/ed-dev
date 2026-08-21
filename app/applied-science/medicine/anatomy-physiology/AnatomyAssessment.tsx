"use client";

import { useState } from "react";
import {
  CheckCircle2,
  CircleHelp,
  RotateCcw,
  ScanSearch,
  XCircle,
} from "lucide-react";
import {
  ANATOMY_EVIDENCE_CASES,
  isEvidenceAnswerCorrect,
  type AnatomyEvidenceCaseId,
} from "./anatomyModel";

type Answers = Partial<Record<AnatomyEvidenceCaseId, string>>;

export default function AnatomyAssessment() {
  const [activeId, setActiveId] = useState<AnatomyEvidenceCaseId>(
    ANATOMY_EVIDENCE_CASES[0].id
  );
  const [answers, setAnswers] = useState<Answers>({});
  const active =
    ANATOMY_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    ANATOMY_EVIDENCE_CASES[0];
  const selectedOptionId = answers[active.id];
  const answered = selectedOptionId !== undefined;
  const correct = answered
    ? isEvidenceAnswerCorrect(active.id, selectedOptionId)
    : false;
  const answeredCount = Object.keys(answers).length;

  function selectAnswer(optionId: string) {
    setAnswers((current) => ({ ...current, [active.id]: optionId }));
  }

  function reset() {
    setAnswers({});
    setActiveId(ANATOMY_EVIDENCE_CASES[0].id);
  }

  return (
    <section className="overflow-hidden rounded-[28px] border border-violet-100/[0.12] bg-[#0d0912]/60 backdrop-blur-2xl">
      <div className="grid gap-4 border-b border-white/[0.07] p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="text-violet-100/62 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]">
            <ScanSearch size={14} aria-hidden="true" /> Check · read structure
            as evidence
          </div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.3vw,3.1rem)] font-semibold leading-[0.98] tracking-[-0.048em] text-white">
            Use the model on a new structure, region, and organ.
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-400">
            Each case asks for an inference, not a memorized label. Choose the
            explanation that keeps scale, location, and interacting systems
            distinct.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-black/20 px-4 py-2 text-[12px] font-semibold text-slate-300 transition hover:border-violet-100/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200/60"
        >
          <RotateCcw size={13} aria-hidden="true" /> Reset cases
        </button>
      </div>

      <div className="grid lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="border-b border-white/[0.07] p-3 lg:border-b-0 lg:border-r">
          <div className="px-2 pb-3 text-[11px] leading-5 text-slate-500">
            {answeredCount} of {ANATOMY_EVIDENCE_CASES.length} cases reasoned
            through
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {ANATOMY_EVIDENCE_CASES.map((item, index) => {
              const itemAnswer = answers[item.id];
              const itemCorrect = itemAnswer
                ? isEvidenceAnswerCorrect(item.id, itemAnswer)
                : undefined;
              const selected = item.id === active.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(item.id)}
                  className={`flex min-h-[68px] items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200/60 ${
                    selected
                      ? "border-violet-200/30 bg-violet-300/[0.07]"
                      : "border-white/[0.06] bg-black/[0.05] hover:border-white/[0.14]"
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-black/20 font-mono text-[11px] text-slate-400">
                    {itemCorrect === true ? (
                      <CheckCircle2
                        size={15}
                        className="text-emerald-300"
                        aria-label="Correct"
                      />
                    ) : itemCorrect === false ? (
                      <XCircle
                        size={15}
                        className="text-rose-300"
                        aria-label="Try again"
                      />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </span>
                  <span className="text-[12px] font-semibold leading-5 text-white/80">
                    {item.eyebrow}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-6 lg:p-8">
          <div className="text-rose-100/52 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em]">
            <CircleHelp size={13} aria-hidden="true" /> {active.eyebrow}
          </div>
          <h3 className="mt-3 max-w-4xl text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-white">
            {active.prompt}
          </h3>

          <div
            className="mt-6 grid gap-3"
            role="group"
            aria-label={active.prompt}
          >
            {active.options.map((option) => {
              const selected = option.id === selectedOptionId;
              const optionCorrect = isEvidenceAnswerCorrect(
                active.id,
                option.id
              );
              const verdictClass = answered
                ? optionCorrect
                  ? "border-emerald-300/36 bg-emerald-300/[0.07]"
                  : selected
                    ? "border-rose-300/36 bg-rose-300/[0.07]"
                    : "border-white/[0.06] bg-black/[0.05] opacity-[0.62]"
                : selected
                  ? "border-violet-200/36 bg-violet-300/[0.07]"
                  : "border-white/[0.08] bg-black/[0.08] hover:border-violet-100/24";

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectAnswer(option.id)}
                  className={`rounded-[18px] border px-4 py-4 text-left text-[14px] leading-6 text-slate-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200/60 ${verdictClass}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div
            className={`mt-5 min-h-[86px] border-l-2 px-4 py-3 ${
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
                  ? "The evidence supports that inference."
                  : "Re-read the physical evidence."
                : "Make an inference, then inspect the explanation."}
            </strong>
            <p className="mt-2 max-w-4xl text-[13px] leading-6 text-slate-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "A useful answer connects what the structure is made of, where it is, and what changes because of that organization."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
