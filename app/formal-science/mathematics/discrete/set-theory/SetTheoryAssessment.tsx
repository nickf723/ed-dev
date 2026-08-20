"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleX,
  RefreshCcw,
  Sparkles,
  Target,
} from "lucide-react";

type OperationId = "union" | "intersection" | "difference";

type PracticeQuestion = {
  a: readonly string[];
  b: readonly string[];
  symbol: string;
  logic: string;
  answer: string;
  choices: readonly string[];
};

const UNIVERSE = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

const OPERATION_META: Record<OperationId, { symbol: string; logic: string }> = {
  union: { symbol: "A ∪ B", logic: "A OR B" },
  intersection: { symbol: "A ∩ B", logic: "A AND B" },
  difference: { symbol: "A ∖ B", logic: "A AND NOT B" },
};

const TRANSFER_CHOICES = [
  "Everyone who has a library card or a checked-out item.",
  "Cardholders who currently have no item checked out.",
  "People with a checked-out item who do not have a library card.",
] as const;

const TRANSFER_ANSWER = "Cardholders who currently have no item checked out.";

function roster(values: readonly string[]) {
  return values.length > 0 ? `{${values.join(", ")}}` : "∅";
}

function operate(
  operation: OperationId,
  a: readonly string[],
  b: readonly string[]
) {
  return UNIVERSE.filter((value) => {
    const inA = a.includes(value);
    const inB = b.includes(value);
    if (operation === "union") return inA || inB;
    if (operation === "intersection") return inA && inB;
    return inA && !inB;
  });
}

function toggleMember(values: readonly string[], member: string) {
  return values.includes(member)
    ? values.filter((value) => value !== member)
    : UNIVERSE.filter((value) => values.includes(value) || value === member);
}

function generateQuestion(seed: number): PracticeQuestion {
  const normalizedSeed = ((seed % 97) + 97) % 97;
  const a = UNIVERSE.filter(
    (_, index) => (index * 3 + normalizedSeed * 2 + 1) % 7 < 4
  );
  const b = UNIVERSE.filter(
    (_, index) => (index * 5 + normalizedSeed * 3 + 2) % 8 < 4
  );
  const operations: readonly OperationId[] = [
    "union",
    "intersection",
    "difference",
  ];
  const operation = operations[normalizedSeed % operations.length];
  const meta = OPERATION_META[operation];
  const answerSet = operate(operation, a, b);
  const answer = roster(answerSet);

  const candidateSets: string[][] = [
    answerSet,
    operate("union", a, b),
    operate("intersection", a, b),
    operate("difference", a, b),
    [...a],
    [...b],
    UNIVERSE.filter((value) => !answerSet.includes(value)),
    [],
  ];

  let mutationIndex = 0;
  while (new Set(candidateSets.map(roster)).size < 4) {
    const member = UNIVERSE[(normalizedSeed + mutationIndex) % UNIVERSE.length];
    candidateSets.push(toggleMember(answerSet, member));
    mutationIndex += 1;
  }

  const uniqueChoices = Array.from(
    new Map(candidateSets.map((values) => [roster(values), values])).keys()
  );
  const selectedChoices = uniqueChoices.slice(0, 4);
  const rotation = normalizedSeed % selectedChoices.length;
  const choices = [
    ...selectedChoices.slice(rotation),
    ...selectedChoices.slice(0, rotation),
  ];

  return {
    a,
    b,
    symbol: meta.symbol,
    logic: meta.logic,
    answer,
    choices,
  };
}

export default function SetTheoryAssessment() {
  const [transferChoice, setTransferChoice] = useState<string | null>(null);
  const [transferSubmitted, setTransferSubmitted] = useState(false);
  const [caseIndex, setCaseIndex] = useState(0);
  const [practiceChoice, setPracticeChoice] = useState<string | null>(null);
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(0);
  const [correct, setCorrect] = useState(0);

  const question = useMemo(() => generateQuestion(caseIndex), [caseIndex]);
  const transferCorrect = transferChoice === TRANSFER_ANSWER;
  const practiceCorrect = practiceChoice === question.answer;

  const checkPractice = () => {
    if (!practiceChoice || practiceSubmitted) return;
    setPracticeSubmitted(true);
    setAttempted((value) => value + 1);
    if (practiceChoice === question.answer) {
      setCorrect((value) => value + 1);
    }
  };

  const nextPractice = () => {
    setCaseIndex((value) => value + 1);
    setPracticeChoice(null);
    setPracticeSubmitted(false);
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
      <section className="border border-emerald-200/[0.15] bg-[#06110f]/70 p-5 backdrop-blur-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-emerald-100/62 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]">
              <Target size={14} /> Insight transfer
            </div>
            <h3 className="mt-2 text-[25px] font-semibold tracking-[-0.04em] text-white">
              Translate the difference
            </h3>
          </div>
          <span className="font-mono text-[18px] text-emerald-100">A ∖ B</span>
        </div>

        <p className="mt-5 text-[14px] leading-7 text-slate-300">
          In a library, let A be people with a library card and B be people who
          currently have an item checked out. What does A ∖ B describe?
        </p>

        <div className="mt-5 space-y-2">
          {TRANSFER_CHOICES.map((choice) => {
            const active = transferChoice === choice;
            const correctChoice =
              transferSubmitted && choice === TRANSFER_ANSWER;
            const incorrectChoice =
              transferSubmitted && active && !correctChoice;
            return (
              <button
                key={choice}
                type="button"
                disabled={transferSubmitted}
                onClick={() => setTransferChoice(choice)}
                className={`min-h-14 w-full border px-4 py-3 text-left text-[13px] leading-5 transition-colors ${
                  correctChoice
                    ? "border-emerald-200/35 bg-emerald-300/[0.07] text-emerald-50"
                    : incorrectChoice
                      ? "border-rose-200/28 bg-rose-300/[0.055] text-rose-100"
                      : active
                        ? "border-emerald-200/36 bg-emerald-300/[0.055] text-white"
                        : "border-white/[0.08] bg-white/[0.018] text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {!transferSubmitted ? (
          <button
            type="button"
            disabled={!transferChoice}
            onClick={() => setTransferSubmitted(true)}
            className="border-emerald-200/28 mt-4 border bg-emerald-300/[0.07] px-4 py-2.5 text-[12px] font-semibold text-emerald-50 transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
          >
            Check interpretation
          </button>
        ) : (
          <div
            className={`mt-4 border p-4 ${
              transferCorrect
                ? "border-emerald-200/[0.18] bg-emerald-300/[0.035]"
                : "border-rose-200/[0.16] bg-rose-300/[0.03]"
            }`}
          >
            <div className="flex items-center gap-2">
              {transferCorrect ? (
                <CheckCircle2 className="text-emerald-300" size={16} />
              ) : (
                <CircleX className="text-rose-300" size={16} />
              )}
              <strong
                className={`text-[13px] ${
                  transferCorrect ? "text-emerald-100" : "text-rose-100"
                }`}
              >
                {transferCorrect ? "That rule transferred." : "Start inside A."}
              </strong>
            </div>
            <p className="mt-2 text-[12px] leading-6 text-slate-400">
              Difference begins with members of A, then removes anyone who is
              also in B. The result is cardholders with no current checkout.
            </p>
            <button
              type="button"
              onClick={() => {
                setTransferChoice(null);
                setTransferSubmitted(false);
              }}
              className="mt-3 text-[11px] font-semibold text-slate-400 hover:text-white"
            >
              Try the interpretation again
            </button>
          </div>
        )}
      </section>

      <section className="bg-[#050e16]/72 border border-cyan-200/[0.15] p-5 backdrop-blur-2xl sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-cyan-100/62 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]">
              <Sparkles size={14} /> Generated fluency
            </div>
            <h3 className="mt-2 text-[25px] font-semibold tracking-[-0.04em] text-white">
              Compute the result set
            </h3>
          </div>
          <div className="border border-white/[0.08] bg-black/20 px-3 py-2 font-mono text-[11px] text-slate-500">
            {attempted} attempted · {correct} correct
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.88fr)_minmax(320px,1.12fr)]">
          <div className="bg-[#02070c]/68 border border-white/[0.08] p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-500">
              Apply {question.logic}
            </div>
            <div className="mt-4 space-y-2 font-mono text-[14px] leading-7 text-slate-200">
              <div>A = {roster(question.a)}</div>
              <div>B = {roster(question.b)}</div>
            </div>
            <div className="mt-5 border-t border-white/[0.08] pt-5 font-mono text-[clamp(1.45rem,3vw,2.15rem)] font-semibold text-cyan-50">
              {question.symbol} = ?
            </div>
            <p className="mt-4 text-[11px] leading-5 text-slate-500">
              Each case is generated from a reproducible seed. The checker
              evaluates membership element by element over U = {"{1, …, 8}"}.
            </p>
          </div>

          <div>
            <div className="grid gap-2 sm:grid-cols-2">
              {question.choices.map((choice) => {
                const active = practiceChoice === choice;
                const correctChoice =
                  practiceSubmitted && choice === question.answer;
                const incorrectChoice =
                  practiceSubmitted && active && !correctChoice;
                return (
                  <button
                    key={choice}
                    type="button"
                    disabled={practiceSubmitted}
                    onClick={() => setPracticeChoice(choice)}
                    className={`min-h-14 border px-3 py-3 text-left font-mono text-[13px] transition-colors ${
                      correctChoice
                        ? "border-emerald-200/34 bg-emerald-300/[0.065] text-emerald-50"
                        : incorrectChoice
                          ? "border-rose-200/26 bg-rose-300/[0.05] text-rose-100"
                          : active
                            ? "border-cyan-200/36 bg-cyan-300/[0.06] text-white"
                            : "border-white/[0.08] bg-white/[0.018] text-slate-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>

            {!practiceSubmitted ? (
              <button
                type="button"
                disabled={!practiceChoice}
                onClick={checkPractice}
                className="border-cyan-200/28 mt-3 border bg-cyan-300/[0.07] px-4 py-2.5 text-[12px] font-semibold text-cyan-50 transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
              >
                Check result
              </button>
            ) : (
              <div
                className={`mt-3 border p-4 ${
                  practiceCorrect
                    ? "border-emerald-200/[0.18] bg-emerald-300/[0.035]"
                    : "border-rose-200/[0.16] bg-rose-300/[0.03]"
                }`}
              >
                <div className="flex items-center gap-2">
                  {practiceCorrect ? (
                    <CheckCircle2 className="text-emerald-300" size={16} />
                  ) : (
                    <CircleX className="text-rose-300" size={16} />
                  )}
                  <strong
                    className={`text-[13px] ${
                      practiceCorrect ? "text-emerald-100" : "text-rose-100"
                    }`}
                  >
                    {practiceCorrect
                      ? "Every selected member passes the rule."
                      : `The result is ${question.answer}.`}
                  </strong>
                </div>
                <p className="mt-2 text-[12px] leading-6 text-slate-400">
                  Test each number against {question.logic}. Keep it exactly
                  when that condition is true, then write each surviving element
                  once.
                </p>
                <button
                  type="button"
                  onClick={nextPractice}
                  className="mt-3 inline-flex items-center gap-2 border border-white/[0.1] bg-white/[0.025] px-3 py-2 text-[11px] font-semibold text-slate-300 hover:text-white"
                >
                  <RefreshCcw size={13} /> Another generated case
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
