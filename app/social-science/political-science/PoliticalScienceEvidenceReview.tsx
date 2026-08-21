"use client";

import { useState } from "react";
import { CheckCircle2, RotateCcw, Scale, XCircle } from "lucide-react";
import {
  POLITICAL_EVIDENCE_CASES,
  isPoliticalEvidenceAnswerCorrect,
} from "./politicalScienceModel";

type CaseId = (typeof POLITICAL_EVIDENCE_CASES)[number]["id"];

export default function PoliticalScienceEvidenceReview() {
  const [activeId, setActiveId] = useState<CaseId>(
    POLITICAL_EVIDENCE_CASES[0].id
  );
  const [answers, setAnswers] = useState<Partial<Record<CaseId, string>>>({});
  const active =
    POLITICAL_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    POLITICAL_EVIDENCE_CASES[0];
  const selected = answers[active.id];
  const answered = selected !== undefined;
  const correct =
    answered && isPoliticalEvidenceAnswerCorrect(active.id, selected);

  function reset() {
    setAnswers({});
    setActiveId(POLITICAL_EVIDENCE_CASES[0].id);
  }

  return (
    <section className="overflow-hidden rounded-[32px] border border-amber-100/[0.13] bg-[#0e0b07]/65 shadow-[0_34px_120px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
      <div className="grid border-b border-white/[0.08] lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
        <div className="p-5 sm:p-7">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-100/65">
            <Scale size={14} aria-hidden="true" /> Evidence review · count,
            translate, explain, trace
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.8vw,3.7rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
            Political claims get stronger when each inference names its rule and
            boundary.
          </h2>
        </div>
        <div className="border-t border-white/[0.08] p-5 lg:border-l lg:border-t-0">
          <div className="mb-3 font-mono text-[11px] leading-5 text-slate-500">
            125 seats · 63 to govern · adoption ≠ effect
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.11] px-4 py-2.5 text-[12px] font-semibold text-slate-400 transition hover:border-amber-100/25 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
          >
            <RotateCcw size={13} aria-hidden="true" /> Reset cases
          </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="grid gap-2 border-b border-white/[0.08] p-4 sm:grid-cols-2 xl:grid-cols-1 xl:border-b-0 xl:border-r">
          {POLITICAL_EVIDENCE_CASES.map((item, index) => {
            const answer = answers[item.id];
            const itemCorrect = answer
              ? isPoliticalEvidenceAnswerCorrect(item.id, answer)
              : undefined;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.id === active.id}
                onClick={() => setActiveId(item.id)}
                className={`grid min-h-[76px] grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[17px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60 ${
                  item.id === active.id
                    ? "border-amber-200/30 bg-amber-300/[0.065]"
                    : "border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.09] font-mono text-[11px] text-slate-600">
                  {itemCorrect === true ? (
                    <CheckCircle2
                      size={16}
                      className="text-emerald-300"
                      aria-label="Correct"
                    />
                  ) : itemCorrect === false ? (
                    <XCircle
                      size={16}
                      className="text-rose-300"
                      aria-label="Try again"
                    />
                  ) : (
                    String(index + 1).padStart(2, "0")
                  )}
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.06em] text-slate-600">
                    {item.eyebrow}
                  </span>
                  <strong className="mt-1 block text-[13px] text-white/80">
                    {item.label}
                  </strong>
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-5 sm:p-7 xl:p-9">
          <h3 className="max-w-4xl text-[clamp(1.35rem,2.3vw,2rem)] font-semibold leading-[1.18] text-white">
            {active.prompt}
          </h3>
          <div
            className="mt-6 grid gap-3"
            role="group"
            aria-label={active.prompt}
          >
            {active.options.map((option) => {
              const optionCorrect = isPoliticalEvidenceAnswerCorrect(
                active.id,
                option.id
              );
              const chosen = option.id === selected;
              const state = answered
                ? optionCorrect
                  ? "border-emerald-300/38 bg-emerald-300/[0.07]"
                  : chosen
                    ? "border-rose-300/38 bg-rose-300/[0.07]"
                    : "border-white/[0.06] opacity-60"
                : "border-white/[0.08] hover:border-amber-100/24";
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={chosen}
                  onClick={() =>
                    setAnswers((current) => ({
                      ...current,
                      [active.id]: option.id,
                    }))
                  }
                  className={`rounded-[18px] border px-4 py-4 text-left text-[14px] leading-6 text-slate-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60 ${state}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div
            className={`mt-5 min-h-[104px] border-l-2 px-4 py-3 ${
              answered
                ? correct
                  ? "border-emerald-300/50 bg-emerald-300/[0.035]"
                  : "border-rose-300/50 bg-rose-300/[0.035]"
                : "border-white/[0.10]"
            }`}
            aria-live="polite"
          >
            <strong className="text-[13px] text-white">
              {answered
                ? correct
                  ? "The claim stays inside the evidence."
                  : "That conclusion skips a political mechanism or boundary."
                : "Choose the most defensible inference."}
            </strong>
            <p className="mt-2 text-[13px] leading-6 text-slate-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "Keep the actor, rule, institution, unit, denominator, time, implementation stage, uncertainty, and rival explanations attached to the claim."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
