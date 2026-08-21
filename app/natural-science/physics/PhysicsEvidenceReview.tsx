"use client";

import { useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import {
  PHYSICS_EVIDENCE_CASES,
  isPhysicsEvidenceAnswerCorrect,
} from "./physicsModel";

type CaseId = (typeof PHYSICS_EVIDENCE_CASES)[number]["id"];

export default function PhysicsEvidenceReview() {
  const [activeId, setActiveId] = useState<CaseId>(
    PHYSICS_EVIDENCE_CASES[0].id
  );
  const [answers, setAnswers] = useState<Partial<Record<CaseId, string>>>({});
  const active =
    PHYSICS_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    PHYSICS_EVIDENCE_CASES[0];
  const selected = answers[active.id];
  const answered = selected !== undefined;
  const correct =
    answered && isPhysicsEvidenceAnswerCorrect(active.id, selected);

  function reset() {
    setAnswers({});
    setActiveId(PHYSICS_EVIDENCE_CASES[0].id);
  }

  return (
    <section className="overflow-hidden rounded-[30px] border border-orange-100/[0.12] bg-[#0a1016]/70 backdrop-blur-2xl">
      <div className="flex flex-col gap-4 border-b border-white/[0.07] p-5 sm:p-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-orange-200/62 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
            Assessment · calculate, convert, compare, diagnose
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.7vw,3.5rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
            Equations constrain a claim only when the measurement contract is
            intact.
          </h2>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] px-4 py-2 text-[12px] font-semibold text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/60"
        >
          <RotateCcw size={13} aria-hidden="true" /> Reset review
        </button>
      </div>

      <div className="grid xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="grid gap-2 border-b border-white/[0.07] p-4 sm:grid-cols-2 xl:grid-cols-1 xl:border-b-0 xl:border-r">
          {PHYSICS_EVIDENCE_CASES.map((item, index) => {
            const answer = answers[item.id];
            const itemCorrect = answer
              ? isPhysicsEvidenceAnswerCorrect(item.id, answer)
              : undefined;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.id === active.id}
                onClick={() => setActiveId(item.id)}
                className={`grid min-h-[62px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border px-3 py-3 text-left text-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/60 ${
                  item.id === active.id
                    ? "border-orange-200/30 bg-orange-300/[0.07]"
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
                  {item.id === "velocity"
                    ? "Average velocity"
                    : item.id === "units"
                      ? "Unit conversion"
                      : item.id === "uncertainty"
                        ? "Prediction interval"
                        : "Patterned residual"}
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
              const optionCorrect = isPhysicsEvidenceAnswerCorrect(
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
                  ? "border-orange-200/36 bg-orange-300/[0.07]"
                  : "border-white/[0.08] hover:border-orange-100/24";
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
                  className={`rounded-[18px] border px-4 py-4 text-left text-[14px] leading-6 text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/60 ${state}`}
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
                  ? "The calculation and claim keep their contract."
                  : "A quantity, unit, interval, or inference changed."
                : "Choose the bounded result."}
            </strong>
            <p className="mt-2 text-[13px] leading-6 text-slate-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "Keep the system, coordinate, unit, uncertainty, conditions, and model regime attached."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
