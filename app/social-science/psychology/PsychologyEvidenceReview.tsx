"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ClipboardCheck,
  RotateCcw,
  XCircle,
} from "lucide-react";
import {
  ATTENTION_CONDITION_SCORES,
  ATTENTION_CONDITION_SUMMARY,
  PSYCHOLOGY_EVIDENCE_CASES,
  isPsychologyEvidenceAnswerCorrect,
  type PsychologyEvidenceCaseId,
} from "./psychologyModel";

type Answers = Partial<Record<PsychologyEvidenceCaseId, string>>;

export default function PsychologyEvidenceReview() {
  const [activeId, setActiveId] = useState<PsychologyEvidenceCaseId>(
    PSYCHOLOGY_EVIDENCE_CASES[0].id,
  );
  const [answers, setAnswers] = useState<Answers>({});
  const active =
    PSYCHOLOGY_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    PSYCHOLOGY_EVIDENCE_CASES[0];
  const selectedOptionId = answers[active.id];
  const answered = selectedOptionId !== undefined;
  const correct = answered
    ? isPsychologyEvidenceAnswerCorrect(active.id, selectedOptionId)
    : false;

  function reset() {
    setAnswers({});
    setActiveId(PSYCHOLOGY_EVIDENCE_CASES[0].id);
  }

  return (
    <section className="overflow-hidden rounded-[30px] border border-pink-100/[0.13] bg-[#0b0714]/60 backdrop-blur-2xl">
      <div className="grid gap-4 border-b border-white/[0.07] p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-pink-100/62">
            <ClipboardCheck size={14} aria-hidden="true" /> Check · evidence
            before conclusion
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.6vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white">
            Calculate what was observed, then stop the claim where the design
            stops.
          </h2>
          <p className="mt-3 max-w-4xl text-[15px] leading-7 text-slate-400">
            These files move from rote arithmetic to measurement, causal
            reasoning, and the clinical boundary. Each answer is checked by the
            same fixed model that produces the study ledger.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-black/20 px-4 py-2 text-[12px] font-semibold text-slate-300 transition hover:border-pink-100/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200/60"
        >
          <RotateCcw size={13} aria-hidden="true" /> Reset files
        </button>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <div className="border-b border-white/[0.07] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <ConditionLedger />

          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {PSYCHOLOGY_EVIDENCE_CASES.map((item, index) => {
              const itemAnswer = answers[item.id];
              const itemCorrect = itemAnswer
                ? isPsychologyEvidenceAnswerCorrect(item.id, itemAnswer)
                : undefined;
              const selected = item.id === active.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(item.id)}
                  className={`grid min-h-[68px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200/60 ${
                    selected
                      ? "border-pink-200/30 bg-pink-300/[0.06]"
                      : "border-white/[0.06] bg-black/[0.05] hover:border-white/[0.14]"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-black/20 font-mono text-[10px] text-slate-500">
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
                  <span>
                    <span className="block text-[12px] font-semibold text-white/85">
                      {item.label}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.08em] text-slate-600">
                      {item.eyebrow}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-6 xl:p-8">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-cyan-100/55">
            Recorded observation
          </div>
          <p className="mt-2 border-l border-cyan-200/20 pl-4 text-[13px] leading-6 text-slate-300/75">
            {active.observation}
          </p>
          <h3 className="mt-6 max-w-4xl text-[clamp(1.3rem,2.25vw,1.85rem)] font-semibold leading-[1.22] tracking-[-0.035em] text-white">
            {active.prompt}
          </h3>

          <div className="mt-6 grid gap-3" role="group" aria-label={active.prompt}>
            {active.options.map((option) => {
              const selected = option.id === selectedOptionId;
              const optionCorrect = isPsychologyEvidenceAnswerCorrect(
                active.id,
                option.id,
              );
              const stateClass = answered
                ? optionCorrect
                  ? "border-emerald-300/38 bg-emerald-300/[0.07]"
                  : selected
                    ? "border-rose-300/38 bg-rose-300/[0.07]"
                    : "border-white/[0.06] bg-black/[0.05] opacity-[0.62]"
                : selected
                  ? "border-pink-200/36 bg-pink-300/[0.07]"
                  : "border-white/[0.08] bg-black/[0.08] hover:border-pink-100/24";

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() =>
                    setAnswers((current) => ({
                      ...current,
                      [active.id]: option.id,
                    }))
                  }
                  className={`rounded-[18px] border px-4 py-4 text-left text-[14px] leading-6 text-slate-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200/60 ${stateClass}`}
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
                  ? "The conclusion fits the evidence boundary."
                  : "That conclusion goes beyond the record."
                : "Choose a conclusion, then inspect the reasoning."}
            </strong>
            <p className="mt-2 max-w-4xl text-[13px] leading-6 text-slate-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "Separate the construct from its measure, association from cause, and educational feedback from professional assessment."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConditionLedger() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-cyan-100/[0.11] bg-[#060c16]/76">
      <div className="grid grid-cols-[minmax(0,1fr)_72px] border-b border-white/[0.07] px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-slate-500">
        <span>Attention-task score ledger</span>
        <span className="text-right">mean</span>
      </div>
      <ConditionRow
        label="Uninterrupted"
        values={ATTENTION_CONDITION_SCORES.uninterrupted}
        mean={ATTENTION_CONDITION_SUMMARY.uninterruptedMean}
        tone="cyan"
      />
      <ConditionRow
        label="Interrupted"
        values={ATTENTION_CONDITION_SCORES.interrupted}
        mean={ATTENTION_CONDITION_SUMMARY.interruptedMean}
        tone="pink"
      />
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-white/[0.07] bg-amber-300/[0.025] px-4 py-4">
        <span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-amber-100/52">
            observed mean contrast
          </span>
          <span className="mt-1 block text-[12px] text-slate-500">
            A descriptive difference; design determines the claim.
          </span>
        </span>
        <strong className="font-mono text-[24px] text-amber-100">
          {ATTENTION_CONDITION_SUMMARY.meanDifference}
        </strong>
      </div>
    </div>
  );
}

function ConditionRow({
  label,
  values,
  mean,
  tone,
}: {
  label: string;
  values: readonly number[];
  mean: number;
  tone: "cyan" | "pink";
}) {
  const toneClasses =
    tone === "cyan"
      ? "border-cyan-200/18 bg-cyan-300/[0.045] text-cyan-100"
      : "border-pink-200/18 bg-pink-300/[0.045] text-pink-100";

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_56px] gap-3 border-b border-white/[0.06] px-4 py-4 last:border-b-0">
      <div>
        <strong className="text-[12px] text-white/80">{label}</strong>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {values.map((value, index) => (
            <span
              key={`${label}-${index}-${value}`}
              className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[11px] ${toneClasses}`}
            >
              {value}
            </span>
          ))}
        </div>
      </div>
      <strong className="self-center text-right font-mono text-[22px] text-white">
        {mean}
      </strong>
    </div>
  );
}
