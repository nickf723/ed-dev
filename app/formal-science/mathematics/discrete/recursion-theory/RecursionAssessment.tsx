"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleX,
  ListTree,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import { generatedRecursionPracticeCase } from "./recursionModel";

const TRANSFER_OPTIONS = [
  {
    id: "shrinks",
    code: "length([]) = 0\nlength([first, ...rest]) = 1 + length(rest)",
    label: "Remove one item, then solve the shorter list.",
  },
  {
    id: "same-input",
    code: "length([]) = 0\nlength(items) = 1 + length(items)",
    label: "Call the rule again with the unchanged list.",
  },
  {
    id: "self-base",
    code: "length([]) = length([])\nlength(items) = 1 + length(rest)",
    label: "Let the empty case refer to itself.",
  },
] as const;

export default function RecursionAssessment() {
  const [transferChoice, setTransferChoice] = useState<string>();
  const [transferChecked, setTransferChecked] = useState(false);
  const [caseIndex, setCaseIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [attempted, setAttempted] = useState(0);
  const [correct, setCorrect] = useState(0);
  const practice = useMemo(
    () => generatedRecursionPracticeCase(caseIndex),
    [caseIndex]
  );
  const transferCorrect = transferChoice === "shrinks";
  const numericAnswer = Number(practiceAnswer);
  const practiceCorrect = practiceChecked && numericAnswer === practice.answer;

  const checkPractice = () => {
    if (practiceAnswer === "" || practiceChecked) return;
    setPracticeChecked(true);
    setAttempted((value) => value + 1);
    if (numericAnswer === practice.answer) {
      setCorrect((value) => value + 1);
    }
  };

  const nextCase = () => {
    setCaseIndex((value) => value + 1);
    setPracticeAnswer("");
    setPracticeChecked(false);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[1.04fr_0.96fr]">
      <section
        className="bg-[#041018]/72 border border-cyan-100/[0.14] p-5 backdrop-blur-2xl sm:p-7"
        aria-labelledby="recursion-transfer-title"
      >
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/60">
          <ListTree size={14} /> Transfer · inspect a new structure
        </div>
        <h3
          id="recursion-transfer-title"
          className="mt-3 text-[25px] font-semibold tracking-[-0.04em] text-white"
        >
          Which definition can actually reach its base case?
        </h3>
        <p className="mt-4 text-[14px] leading-7 text-slate-300">
          We want the length of a list. A sound recursive definition must say
          what happens to an empty list and make every other call smaller.
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
                className={`grid min-h-24 gap-3 border px-4 py-3 text-left transition-colors sm:grid-cols-[minmax(0,1fr)_220px] sm:items-center ${
                  active
                    ? "border-cyan-200/35 bg-cyan-300/[0.07] text-cyan-50"
                    : "border-white/[0.08] bg-black/15 text-slate-400 hover:border-white/[0.16] hover:text-slate-200"
                }`}
              >
                <code className="whitespace-pre-wrap font-mono text-[12px] leading-6 text-inherit">
                  {option.code}
                </code>
                <span className="text-[12px] leading-5 text-slate-500">
                  {option.label}
                </span>
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
          Check the definition <ArrowRight size={15} />
        </button>

        {transferChecked ? (
          <Feedback correct={transferCorrect}>
            {transferCorrect
              ? "Correct. The empty list is known directly, and rest contains one fewer item. Each call therefore approaches the base case before the pending +1 operations return."
              : transferChoice === "same-input"
                ? "The empty case exists, but the recursive call receives the unchanged list. No call gets closer to empty, so the process does not terminate."
                : "A base case must give a result directly. length([]) = length([]) only repeats the same unanswered question."}
          </Feedback>
        ) : null}
      </section>

      <section
        className="bg-[#0d0718]/72 border border-violet-100/[0.14] p-5 backdrop-blur-2xl sm:p-7"
        aria-labelledby="recursion-practice-title"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-100/60">
              <Sparkles size={14} /> Fluency · generated and checked
            </div>
            <h3
              id="recursion-practice-title"
              className="mt-3 text-[25px] font-semibold tracking-[-0.04em] text-white"
            >
              Unfold the move recurrence.
            </h3>
          </div>
          <span className="w-fit border border-white/[0.08] bg-black/15 px-3 py-2 font-mono text-[10px] text-slate-500">
            {attempted} attempted · {correct} correct
          </span>
        </div>

        <p className="mt-6 min-h-24 text-[14px] leading-7 text-slate-300">
          {practice.prompt}
        </p>

        <div className="mt-4 border-y border-white/[0.08] py-4">
          <div className="font-mono text-[13px] text-violet-100">T(1) = 1</div>
          <div className="mt-2 font-mono text-[13px] text-cyan-100">
            T(n) = 2 · T(n − 1) + 1
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <label>
            <span className="block text-[11px] font-semibold text-slate-400">
              Minimum moves for {practice.diskCount} disks
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
              className="mt-2 h-12 w-full border border-white/[0.12] bg-black/25 px-3 font-mono text-[17px] text-white outline-none focus:border-violet-200/40"
              placeholder="Enter a count"
            />
          </label>
          <button
            type="button"
            onClick={checkPractice}
            disabled={practiceAnswer === "" || practiceChecked}
            className="min-h-12 border border-violet-200/30 bg-violet-300/[0.075] px-5 text-[13px] font-semibold text-violet-50 transition-colors hover:bg-violet-300/[0.13] disabled:cursor-not-allowed disabled:opacity-35"
          >
            Check count
          </button>
        </div>

        {practiceChecked ? (
          <Feedback correct={practiceCorrect}>
            {practiceCorrect
              ? `Correct. ${practice.explanation}`
              : `Use the two smaller subproblems and the one largest-disk move: ${practice.explanation}`}
          </Feedback>
        ) : null}

        <button
          type="button"
          onClick={nextCase}
          className="mt-4 inline-flex min-h-10 items-center gap-2 text-[12px] font-semibold text-slate-500 transition-colors hover:text-violet-100"
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
