"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleX,
  RefreshCcw,
  Sparkles,
  Target,
} from "lucide-react";
import { generatedPracticeCase } from "./combinatoricsModel";

const TRANSFER_OPTIONS = [
  {
    id: "combination",
    label: "Combination: only the chosen flags matter.",
  },
  {
    id: "permutation",
    label: "Permutation: the same flags in a new order make a new signal.",
  },
  {
    id: "power",
    label: "Power: every flag may repeat in every position.",
  },
] as const;

export default function CombinatoricsAssessment() {
  const [transferChoice, setTransferChoice] = useState<string>();
  const [transferChecked, setTransferChecked] = useState(false);
  const [caseIndex, setCaseIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [attempted, setAttempted] = useState(0);
  const [correct, setCorrect] = useState(0);
  const practice = useMemo(() => generatedPracticeCase(caseIndex), [caseIndex]);
  const transferCorrect = transferChoice === "permutation";
  const numericPracticeAnswer = Number(practiceAnswer);
  const practiceCorrect =
    practiceChecked && numericPracticeAnswer === practice.answer;

  const checkPractice = () => {
    if (practiceAnswer === "" || practiceChecked) return;
    setPracticeChecked(true);
    setAttempted((value) => value + 1);
    if (numericPracticeAnswer === practice.answer) {
      setCorrect((value) => value + 1);
    }
  };

  const nextCase = () => {
    setCaseIndex((value) => value + 1);
    setPracticeAnswer("");
    setPracticeChecked(false);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <section
        className="bg-[#071113]/68 border border-cyan-100/[0.14] p-5 backdrop-blur-2xl sm:p-7"
        aria-labelledby="combinatorics-transfer-title"
      >
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/60">
          <Target size={14} /> Transfer · identify sameness
        </div>
        <h3
          id="combinatorics-transfer-title"
          className="mt-3 text-[25px] font-semibold tracking-[-0.04em] text-white"
        >
          Does reversing the objects create a new outcome?
        </h3>
        <p className="mt-4 text-[14px] leading-7 text-stone-300">
          A maritime signal displays three distinct flags selected from six. The
          top-to-bottom order changes the message. Which model counts the valid
          signals?
        </p>

        <div className="mt-6 grid gap-2">
          {TRANSFER_OPTIONS.map((option) => {
            const active = transferChoice === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setTransferChoice(option.id);
                  setTransferChecked(false);
                }}
                aria-pressed={active}
                className={`min-h-14 border px-4 py-3 text-left text-[13px] leading-5 transition-colors ${
                  active
                    ? "border-cyan-200/35 bg-cyan-300/[0.07] text-cyan-50"
                    : "border-white/[0.08] bg-black/15 text-stone-400 hover:border-white/[0.16] hover:text-stone-200"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setTransferChecked(true)}
          disabled={!transferChoice}
          className="mt-5 inline-flex min-h-11 items-center gap-2 border border-cyan-200/30 bg-cyan-300/[0.07] px-4 text-[13px] font-semibold text-cyan-50 transition-colors hover:bg-cyan-300/[0.12] disabled:cursor-not-allowed disabled:opacity-35"
        >
          Check the model <ArrowRight size={15} />
        </button>

        {transferChecked ? (
          <Feedback correct={transferCorrect}>
            {transferCorrect
              ? "Correct. A–B–C and C–B–A use the same flags but encode different signals, so order creates distinct outcomes. There are P(6,3) = 6 × 5 × 4 = 120 signals."
              : "Not yet. Ask what counts as the same signal: reversing the same three flags changes the message. Repetition is also forbidden, so the choices shrink from 6 to 5 to 4."}
          </Feedback>
        ) : null}
      </section>

      <section
        className="border border-amber-100/[0.14] bg-[#120c06]/70 p-5 backdrop-blur-2xl sm:p-7"
        aria-labelledby="combinatorics-practice-title"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100/60">
              <Sparkles size={14} /> Fluency · generated and checked
            </div>
            <h3
              id="combinatorics-practice-title"
              className="mt-3 text-[25px] font-semibold tracking-[-0.04em] text-white"
            >
              Compress the decision process.
            </h3>
          </div>
          <span className="w-fit border border-white/[0.08] bg-black/15 px-3 py-2 font-mono text-[10px] text-stone-500">
            {attempted} attempted · {correct} correct
          </span>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_210px]">
          <div>
            <p className="min-h-20 text-[14px] leading-7 text-stone-300">
              {practice.prompt}
            </p>
            <div className="mt-4 flex items-center gap-3 border-y border-white/[0.08] py-4">
              <span className="border border-amber-100/[0.15] bg-amber-300/[0.05] px-3 py-2 font-mono text-[12px] text-amber-100">
                n = {practice.n}
              </span>
              <span className="border border-cyan-100/[0.15] bg-cyan-300/[0.04] px-3 py-2 font-mono text-[12px] text-cyan-100">
                k = {practice.k}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">
                {practice.mode === "permutation"
                  ? "order matters"
                  : "order does not matter"}
              </span>
            </div>
          </div>

          <div>
            <label>
              <span className="block text-[11px] font-semibold text-stone-400">
                Number of outcomes
              </span>
              <input
                type="number"
                min={0}
                value={practiceAnswer}
                disabled={practiceChecked}
                onChange={(event) => {
                  setPracticeAnswer(event.target.value);
                  setPracticeChecked(false);
                }}
                className="mt-2 h-12 w-full border border-white/[0.12] bg-black/25 px-3 font-mono text-[17px] text-white outline-none focus:border-amber-200/40"
                placeholder="Enter a count"
              />
            </label>
            <button
              type="button"
              onClick={checkPractice}
              disabled={practiceAnswer === "" || practiceChecked}
              className="mt-2 min-h-11 w-full border border-amber-200/30 bg-amber-300/[0.075] px-4 text-[13px] font-semibold text-amber-50 transition-colors hover:bg-amber-300/[0.13] disabled:cursor-not-allowed disabled:opacity-35"
            >
              Check count
            </button>
          </div>
        </div>

        {practiceChecked ? (
          <Feedback correct={practiceCorrect}>
            {practiceCorrect
              ? `Correct. ${practice.factorText}. The count is ${practice.answer.toLocaleString("en-US")}.`
              : practice.mode === "permutation"
                ? `Use one shrinking factor for each position: ${practice.factorText}. Do not divide, because changing order creates a different outcome.`
                : `First count ordered placements, then collapse the ${practice.k}! reorderings of each selected group: ${practice.factorText}.`}
          </Feedback>
        ) : null}

        <button
          type="button"
          onClick={nextCase}
          className="mt-4 inline-flex min-h-10 items-center gap-2 text-[12px] font-semibold text-stone-500 transition-colors hover:text-amber-100"
        >
          <RefreshCcw size={14} /> Generate the next case
        </button>
      </section>
    </div>
  );
}

function Feedback({
  correct,
  children,
}: {
  correct: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mt-4 flex gap-3 border-l px-4 py-3 text-[13px] leading-6 ${
        correct
          ? "border-emerald-300/50 bg-emerald-300/[0.055] text-emerald-50/85"
          : "border-rose-300/50 bg-rose-300/[0.055] text-rose-50/85"
      }`}
      role="status"
    >
      {correct ? (
        <CheckCircle2 className="mt-1 shrink-0" size={15} />
      ) : (
        <CircleX className="mt-1 shrink-0" size={15} />
      )}
      <p>{children}</p>
    </div>
  );
}
