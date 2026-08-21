"use client";

import { useState } from "react";
import { CheckCircle2, Languages, RotateCcw, XCircle } from "lucide-react";
import {
  LANGUAGE_EVIDENCE_CASES,
  calculatePhraseDirectionShare,
  formatLanguagePercent,
  isLanguageEvidenceAnswerCorrect,
} from "./languagesModel";

type CaseId = (typeof LANGUAGE_EVIDENCE_CASES)[number]["id"];

export default function LanguageEvidenceReview() {
  const [activeId, setActiveId] = useState<CaseId>(
    LANGUAGE_EVIDENCE_CASES[0].id
  );
  const [answers, setAnswers] = useState<Partial<Record<CaseId, string>>>({});
  const active =
    LANGUAGE_EVIDENCE_CASES.find((item) => item.id === activeId) ??
    LANGUAGE_EVIDENCE_CASES[0];
  const selected = answers[active.id];
  const answered = selected !== undefined;
  const correct =
    answered && isLanguageEvidenceAnswerCorrect(active.id, selected);
  const directionShare = calculatePhraseDirectionShare("thanks", "RTL");

  function reset() {
    setAnswers({});
    setActiveId(LANGUAGE_EVIDENCE_CASES[0].id);
  }

  return (
    <section className="bg-[#100d18]/68 overflow-hidden rounded-[34px] border border-violet-100/[0.13] shadow-[0_34px_120px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
      <div className="grid border-b border-white/[0.08] lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <div className="p-5 sm:p-7">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-200/65">
            <Languages size={14} aria-hidden="true" /> Evidence review · sample,
            meaning, modality, record
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.8vw,3.7rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
            A form belongs to a language, a community, a situation, and a
            source—not just a cell in a phrase table.
          </h2>
        </div>
        <div className="border-t border-white/[0.08] p-5 lg:border-l lg:border-t-0">
          <div className="font-mono text-[11px] leading-5 text-stone-500">
            displayed RTL share
            <br />1 / 7 = {formatLanguagePercent(directionShare)}
          </div>
          <button
            type="button"
            onClick={reset}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.11] px-4 py-2.5 text-[12px] font-semibold text-stone-400 transition hover:border-violet-100/25 hover:text-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200/60"
          >
            <RotateCcw size={13} aria-hidden="true" /> Reset cases
          </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-[330px_minmax(0,1fr)]">
        <div className="grid gap-2 border-b border-white/[0.08] p-4 sm:grid-cols-2 xl:grid-cols-1 xl:border-b-0 xl:border-r">
          {LANGUAGE_EVIDENCE_CASES.map((item, index) => {
            const answer = answers[item.id];
            const itemCorrect = answer
              ? isLanguageEvidenceAnswerCorrect(item.id, answer)
              : undefined;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.id === active.id}
                onClick={() => setActiveId(item.id)}
                className={`grid min-h-[78px] grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[17px] border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200/60 ${
                  item.id === active.id
                    ? "border-violet-200/30 bg-violet-300/[0.065]"
                    : "border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.09] font-mono text-[11px] text-stone-600">
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
                  <span className="block font-mono text-[11px] uppercase tracking-[0.06em] text-stone-600">
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
              const optionCorrect = isLanguageEvidenceAnswerCorrect(
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
                : "border-white/[0.08] hover:border-violet-100/24";
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
                  className={`rounded-[18px] border px-4 py-4 text-left text-[14px] leading-6 text-stone-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200/60 ${state}`}
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
                  ? "The conclusion preserves the sample, language context, and record type."
                  : "That conclusion changes the sample or flattens a language or record boundary."
                : "Choose the bounded interpretation."}
            </strong>
            <p className="mt-2 text-[13px] leading-6 text-stone-400">
              {answered
                ? correct
                  ? active.success
                  : active.correction
                : "Keep speaker, community, modality, script, context, register, genre, source, version, access, and rights attached."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
