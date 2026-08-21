"use client";

import { useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import {
  PHILOSOPHY_EVIDENCE_CASES,
  isPhilosophyEvidenceAnswerCorrect,
} from "./philosophyModel";

type CaseId = (typeof PHILOSOPHY_EVIDENCE_CASES)[number]["id"];

export default function PhilosophyEvidenceReview() {
  const [activeId, setActiveId] = useState<CaseId>(
    PHILOSOPHY_EVIDENCE_CASES[0].id
  );
  const [answers, setAnswers] = useState<Partial<Record<CaseId, string>>>({});
  const active =
    PHILOSOPHY_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    PHILOSOPHY_EVIDENCE_CASES[0];
  const selected = answers[active.id];
  const answered = selected !== undefined;
  const correct =
    answered && isPhilosophyEvidenceAnswerCorrect(active.id, selected);

  function reset() {
    setAnswers({});
    setActiveId(PHILOSOPHY_EVIDENCE_CASES[0].id);
  }

  return (
    <section className="bg-[#0b0808]/72 overflow-hidden rounded-[30px] border border-amber-100/[0.12] backdrop-blur-2xl">
      <div className="flex flex-col gap-4 border-b border-white/[0.07] p-5 sm:p-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-amber-200/64 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
            Assessment · form, quantifier, condition, target
          </div>
          <h2 className="mt-2 max-w-5xl font-serif text-[clamp(2rem,3.8vw,3.7rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white">
            Better disagreement begins by locating exactly what follows—and what
            does not.
          </h2>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] px-4 py-2 text-[12px] font-semibold text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
        >
          <RotateCcw size={13} aria-hidden="true" /> Reset review
        </button>
      </div>

      <div className="grid xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="grid gap-2 border-b border-white/[0.07] p-4 sm:grid-cols-2 xl:grid-cols-1 xl:border-b-0 xl:border-r">
          {PHILOSOPHY_EVIDENCE_CASES.map((item, index) => {
            const answer = answers[item.id];
            const itemCorrect = answer
              ? isPhilosophyEvidenceAnswerCorrect(item.id, answer)
              : undefined;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.id === active.id}
                onClick={() => setActiveId(item.id)}
                className={`grid min-h-[62px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border px-3 py-3 text-left text-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60 ${
                  item.id === active.id
                    ? "border-amber-200/30 bg-amber-300/[0.07]"
                    : "border-white/[0.06]"
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] font-mono text-[11px] text-slate-600">
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
                <strong className="text-white/80">
                  {item.id === "valid-sound"
                    ? "Validity / soundness"
                    : item.id === "counterexample"
                      ? "Counterexample"
                      : item.id === "conditions"
                        ? "Necessary / sufficient"
                        : "Objection target"}
                </strong>
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
              const optionCorrect = isPhilosophyEvidenceAnswerCorrect(
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
                : chosen
                  ? "border-amber-200/36 bg-amber-300/[0.07]"
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
                  className={`rounded-[18px] border px-4 py-4 text-left text-[14px] leading-6 text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60 ${state}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <div
            className={`mt-5 min-h-[92px] border-l-2 px-4 py-3 ${
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
                  ? "The inference stays inside its support."
                  : "The answer changes the form, quantifier, or target."
                : "Choose the most precise interpretation."}
            </strong>
            <p className="mt-2 text-[13px] leading-6 text-slate-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "Keep premise truth, inferential form, quantifiers, conditions, and objection targets distinct."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
