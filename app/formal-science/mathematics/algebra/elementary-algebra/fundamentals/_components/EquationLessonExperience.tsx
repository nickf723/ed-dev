"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Equal,
  RefreshCcw,
  Scale,
  Sparkles,
} from "lucide-react";
import Assessment, { type AssessmentQuestion } from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import FundamentalsLessonBackgroundV2 from "./FundamentalsLessonBackgroundV2";

export type EquationLessonKey = "one-step-equations" | "two-step-equations";

export type EquationLessonNavItem = {
  label: string;
  href: string;
};

type EquationLessonExperienceProps = {
  lesson: EquationLessonKey;
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: EquationLessonNavItem;
  next?: EquationLessonNavItem;
  unitHref: string;
};

type OperationChoice = {
  id: string;
  label: string;
  explanation: string;
  helpful: boolean;
};

type SolveStage = {
  prompt: string;
  helpfulReason: string;
  resultLeft: string;
  resultRight: string;
  options: readonly OperationChoice[];
};

const ONE_STEP_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "one-inverse",
    type: "mcq",
    prompt: "What should you do to both sides of x + 9 = 15 to isolate x?",
    options: ["Subtract 9", "Add 9", "Multiply by 9"],
    correctAnswer: "Subtract 9",
    explanation: "Subtracting 9 undoes the +9 while keeping the equation balanced.",
  },
  {
    id: "one-balance",
    type: "tf",
    prompt: "If you subtract 4 from the left side of an equation, you must subtract 4 from the right side too.",
    correctAnswer: true,
    explanation: "Applying the same operation to both sides preserves equality.",
  },
  {
    id: "one-solve",
    type: "short_answer",
    prompt: "Solve x/5 = 3. Enter x.",
    acceptableAnswers: ["15", "x=15", "x = 15"],
    explanation: "Multiply both sides by 5 to undo division by 5.",
  },
];

const TWO_STEP_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "two-first",
    type: "mcq",
    prompt: "What is the cleanest first move for 3x + 5 = 20?",
    options: ["Subtract 5 from both sides", "Add 5 to both sides", "Multiply both sides by 3"],
    correctAnswer: "Subtract 5 from both sides",
    explanation: "Undo the outer +5 first, leaving 3x = 15.",
  },
  {
    id: "two-balance",
    type: "tf",
    prompt: "From 3x = 15, dividing both sides by 3 preserves equality.",
    correctAnswer: true,
    explanation: "The same nonzero division on both sides creates an equivalent equation.",
  },
  {
    id: "two-solve",
    type: "short_answer",
    prompt: "Solve 4x + 2 = 18. Enter x.",
    acceptableAnswers: ["4", "x=4", "x = 4"],
    explanation: "Subtract 2 to get 4x = 16, then divide both sides by 4.",
  },
];

export default function EquationLessonExperience({
  lesson,
  breadcrumbs,
  previous,
  next,
  unitHref,
}: EquationLessonExperienceProps) {
  const oneStep = lesson === "one-step-equations";
  const accent = oneStep ? "34, 211, 238" : "96, 165, 250";
  const title = oneStep ? "Solving One-Step Equations" : "Solving Two-Step Equations";
  const subtitle = oneStep
    ? "Engineer the solution by undoing one operation on both sides, then verify the result in the original equation."
    : "Peel away two operations in order, keeping both sides balanced at every move, then verify the solution by substitution.";
  const eyebrow = oneStep ? "Lesson 02 · Balance one layer" : "Lesson 03 · Balance two layers";
  const core = oneStep
    ? "Do the same thing to both sides until x stands alone."
    : "Undo one layer at a time, and mirror every operation across the equal sign.";
  const originalLeft = oneStep ? "x + 6" : "2x + 6";
  const originalRight = "14";
  const solution = oneStep ? 8 : 4;
  const equations = oneStep
    ? [
        { left: "x + 6", right: "14" },
        { left: "x", right: "8" },
      ]
    : [
        { left: "2x + 6", right: "14" },
        { left: "2x", right: "8" },
        { left: "x", right: "4" },
      ];
  const stages: readonly SolveStage[] = oneStep
    ? [
        {
          prompt: "Which operation removes the +6?",
          helpfulReason: "−6 cancels +6, so the variable is exposed.",
          resultLeft: "x",
          resultRight: "8",
          options: [
            {
              id: "subtract-six",
              label: "− 6",
              explanation: "Subtract 6 from both sides.",
              helpful: true,
            },
            {
              id: "add-six",
              label: "+ 6",
              explanation: "Balanced, but this adds another 6 instead of removing one.",
              helpful: false,
            },
            {
              id: "times-two",
              label: "× 2",
              explanation: "Balanced, but multiplying both sides does not isolate x.",
              helpful: false,
            },
          ],
        },
      ]
    : [
        {
          prompt: "First, remove the outer +6.",
          helpfulReason: "−6 cancels the outside addition and leaves 2x = 8.",
          resultLeft: "2x",
          resultRight: "8",
          options: [
            {
              id: "subtract-six",
              label: "− 6",
              explanation: "Subtract 6 from both sides.",
              helpful: true,
            },
            {
              id: "add-six",
              label: "+ 6",
              explanation: "Balanced, but this moves the equation farther from isolating x.",
              helpful: false,
            },
            {
              id: "subtract-two",
              label: "− 2",
              explanation: "Balanced, but it does not cancel the +6 layer.",
              helpful: false,
            },
          ],
        },
        {
          prompt: "Now remove the coefficient 2.",
          helpfulReason: "Dividing by 2 turns 2x into x and 8 into 4.",
          resultLeft: "x",
          resultRight: "4",
          options: [
            {
              id: "divide-two",
              label: "÷ 2",
              explanation: "Divide both sides by 2.",
              helpful: true,
            },
            {
              id: "times-two",
              label: "× 2",
              explanation: "Balanced, but this doubles the coefficient instead of removing it.",
              helpful: false,
            },
            {
              id: "add-two",
              label: "+ 2",
              explanation: "Balanced, but addition cannot undo multiplication by 2.",
              helpful: false,
            },
          ],
        },
      ];

  const [stage, setStage] = useState(0);
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);
  const [checkStep, setCheckStep] = useState(0);

  const solved = stage >= stages.length;
  const currentEquation = equations[Math.min(stage, equations.length - 1)];
  const activeStage = solved ? null : stages[stage];
  const activeChoice = activeStage?.options.find((option) => option.id === selectedOperation) ?? null;

  const checkLines = oneStep
    ? ["x + 6 = 14", `${solution} + 6 = 14`, "14 = 14"]
    : ["2x + 6 = 14", `2(${solution}) + 6 = 14`, "8 + 6 = 14", "14 = 14"];

  function resetLab() {
    setStage(0);
    setSelectedOperation(null);
    setCheckStep(0);
  }

  function simplify() {
    if (!activeChoice?.helpful) return;
    setStage((current) => Math.min(current + 1, stages.length));
    setSelectedOperation(null);
    setCheckStep(0);
  }

  return (
    <main
      className="relative min-h-screen overflow-x-hidden text-stone-100"
      style={{ backgroundColor: oneStep ? "#03151b" : "#04111f" }}
    >
      <FundamentalsLessonBackgroundV2 lesson={lesson} />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03),rgba(0,0,0,0.42))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow={eyebrow}
          icon={oneStep ? Scale : Equal}
          title={<span>{title}</span>}
          subtitle={subtitle}
          accentRgb={accent}
          titleClassName="font-mono text-[clamp(2.15rem,4.2vw,4.4rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f7fff9]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <LessonUtilityBar
          practiceTargetId="fundamentals-practice"
          vocabulary
          accentRgb={accent}
        />

        <section className="mt-4 grid gap-4 rounded-[26px] border border-white/[0.10] bg-black/[0.20] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_26px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div>
            <div
              className="text-[9px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: `rgba(${accent},0.76)` }}
            >
              Core idea
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.45rem,2.5vw,2rem)] font-semibold tracking-[-0.035em] text-white">
              {core}
            </h2>
          </div>
          <div className="rounded-[18px] border border-white/[0.07] bg-white/[0.018] px-4 py-3">
            <div className="text-[8px] font-semibold uppercase tracking-[0.12em] text-stone-600">
              Original equation
            </div>
            <div className="mt-1 font-mono text-[18px] text-stone-200">
              {originalLeft} = {originalRight}
            </div>
            <p className="mt-1.5 text-[10px] leading-4 text-stone-500">
              The equation changes form as you solve it. The relationship must stay balanced.
            </p>
          </div>
        </section>

        <section
          className="mt-4 rounded-[28px] border bg-black/[0.18] p-5 backdrop-blur-2xl"
          style={{ borderColor: `rgba(${accent},0.16)` }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div
                className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: `rgba(${accent},0.76)` }}
              >
                Balance workbench
              </div>
              <h3 className="mt-1 text-[19px] font-semibold text-white">
                Build the solution one balanced move at a time.
              </h3>
            </div>
            <button
              type="button"
              onClick={resetLab}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.07] px-3 py-2 text-[10px] font-semibold text-stone-500 transition-colors hover:text-stone-300"
            >
              <RefreshCcw size={13} />
              Reset
            </button>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_340px]">
            <div>
              <div className="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-4 sm:p-6">
                <div
                  className="pointer-events-none absolute left-[8%] right-[8%] top-[58%] h-px"
                  style={{ background: `rgba(${accent},0.20)` }}
                />
                <div
                  className="pointer-events-none absolute left-1/2 top-[58%] h-12 w-px -translate-x-1/2"
                  style={{ background: `rgba(${accent},0.16)` }}
                />
                <div
                  className="pointer-events-none absolute left-1/2 top-[calc(58%+46px)] h-0 w-0 -translate-x-1/2 border-x-[18px] border-b-[28px] border-x-transparent"
                  style={{ borderBottomColor: `rgba(${accent},0.10)` }}
                />

                <div className="relative grid grid-cols-[1fr_54px_1fr] items-start gap-3">
                  <EquationSide
                    label="Left side"
                    expression={currentEquation.left}
                    operation={activeChoice?.label}
                    accent={accent}
                  />
                  <div
                    className="pt-8 text-center font-mono text-[38px]"
                    style={{ color: `rgb(${accent})` }}
                    aria-label="equals"
                  >
                    =
                  </div>
                  <EquationSide
                    label="Right side"
                    expression={currentEquation.right}
                    operation={activeChoice?.label}
                    accent={accent}
                  />
                </div>

                <div className="relative mt-12 flex justify-center">
                  <div className="rounded-full border border-white/[0.06] bg-black/40 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
                    Whatever happens here happens to both sides
                  </div>
                </div>
              </div>

              {activeChoice ? (
                <div
                  className="mt-3 rounded-[18px] border px-4 py-3"
                  style={{
                    borderColor: activeChoice.helpful
                      ? `rgba(${accent},0.22)`
                      : "rgba(251,191,36,0.16)",
                    background: activeChoice.helpful
                      ? `rgba(${accent},0.035)`
                      : "rgba(251,191,36,0.025)",
                  }}
                  aria-live="polite"
                >
                  <div
                    className="text-[10px] font-semibold"
                    style={{ color: activeChoice.helpful ? `rgb(${accent})` : "rgb(252 211 77)" }}
                  >
                    {activeChoice.helpful ? "Balanced and useful" : "Balanced, but not useful yet"}
                  </div>
                  <p className="mt-1 text-[11px] leading-5 text-stone-500">
                    {activeChoice.explanation}
                  </p>
                  {activeChoice.helpful && activeStage ? (
                    <div className="mt-3 flex flex-col gap-3 rounded-[15px] border border-white/[0.05] bg-black/[0.12] p-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="font-mono text-[14px] text-stone-300">
                        {activeStage.resultLeft} = {activeStage.resultRight}
                      </div>
                      <button
                        type="button"
                        onClick={simplify}
                        className="rounded-xl border px-4 py-2 text-[10px] font-semibold"
                        style={{
                          borderColor: `rgba(${accent},0.24)`,
                          background: `rgba(${accent},0.055)`,
                          color: `rgb(${accent})`,
                        }}
                      >
                        Simplify both sides
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="rounded-[22px] border border-white/[0.06] bg-black/[0.14] p-4">
              {!solved && activeStage ? (
                <>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
                    Step {stage + 1} of {stages.length}
                  </div>
                  <h4 className="mt-2 text-[17px] font-semibold text-white">
                    {activeStage.prompt}
                  </h4>
                  <p className="mt-2 text-[11px] leading-5 text-stone-500">
                    Choose an operation. It will be mirrored onto both sides automatically.
                  </p>

                  <div className="mt-4 grid gap-2">
                    {activeStage.options.map((option) => {
                      const selected = option.id === selectedOperation;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedOperation(option.id)}
                          className="flex items-center justify-between rounded-[16px] border px-4 py-3 text-left transition-colors"
                          style={{
                            borderColor: selected
                              ? `rgba(${accent},0.28)`
                              : "rgba(255,255,255,0.06)",
                            background: selected
                              ? `rgba(${accent},0.055)`
                              : "rgba(0,0,0,0.10)",
                          }}
                        >
                          <span className="text-[11px] font-semibold text-stone-400">
                            Apply to both sides
                          </span>
                          <span
                            className="font-mono text-[18px]"
                            style={{ color: selected ? `rgb(${accent})` : "rgb(168 162 158)" }}
                          >
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 rounded-[15px] border border-white/[0.05] bg-white/[0.012] p-3">
                    <div className="text-[8px] font-semibold uppercase tracking-[0.11em] text-stone-600">
                      Goal
                    </div>
                    <p className="mt-1.5 text-[10px] leading-4 text-stone-500">
                      {activeStage.helpfulReason}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex h-full min-h-[280px] flex-col justify-center">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                    style={{
                      borderColor: `rgba(${accent},0.24)`,
                      background: `rgba(${accent},0.05)`,
                      color: `rgb(${accent})`,
                    }}
                  >
                    <Check size={20} />
                  </div>
                  <div className="mt-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
                    Variable isolated
                  </div>
                  <div className="mt-2 font-mono text-[clamp(2.1rem,4vw,3.2rem)] font-semibold text-white">
                    x = {solution}
                  </div>
                  <p className="mt-3 text-[11px] leading-5 text-stone-500">
                    This value came from balanced transformations. Now verify it in the equation you started with.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 border-t border-white/[0.06] pt-5">
            <div
              className="text-[9px] font-semibold uppercase tracking-[0.13em]"
              style={{ color: `rgba(${accent},0.72)` }}
            >
              Check the solution
            </div>
            {!solved ? (
              <p className="mt-2 text-[11px] text-stone-600">
                Finish solving first. The substitution check belongs at the end, not at the beginning.
              </p>
            ) : (
              <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
                <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.11em] text-stone-600">
                    Original equation
                  </div>
                  <div className="mt-3 space-y-2">
                    {checkLines.slice(0, checkStep + 1).map((line, index) => (
                      <div
                        key={`${line}-${index}`}
                        className="flex items-center gap-3 rounded-xl border border-white/[0.045] bg-white/[0.012] px-3 py-2.5 font-mono text-[14px] text-stone-300"
                      >
                        <span
                          className="text-[9px]"
                          style={{ color: index === checkLines.length - 1 ? "rgb(110 231 183)" : `rgba(${accent},0.72)` }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{line}</span>
                        {index === checkLines.length - 1 ? (
                          <Check size={14} className="ml-auto text-emerald-300" />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
                  <h4 className="text-[14px] font-semibold text-white">
                    {checkStep === 0
                      ? `Plug x = ${solution} into the original.`
                      : checkStep < checkLines.length - 1
                        ? "Evaluate the left side."
                        : "Both sides match."}
                  </h4>
                  <p className="mt-2 text-[10px] leading-4 text-stone-500">
                    {checkStep === checkLines.length - 1
                      ? `The original equation is true when x = ${solution}, so the solution checks out.`
                      : "Substitution verifies the answer you derived. It is not how you discover the answer."}
                  </p>
                  {checkStep < checkLines.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCheckStep((current) => Math.min(current + 1, checkLines.length - 1))}
                      className="mt-4 w-full rounded-xl border px-4 py-2.5 text-[10px] font-semibold"
                      style={{
                        borderColor: `rgba(${accent},0.24)`,
                        background: `rgba(${accent},0.05)`,
                        color: `rgb(${accent})`,
                      }}
                    >
                      {checkStep === 0 ? `Substitute x = ${solution}` : "Evaluate"}
                    </button>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="fundamentals-practice" className="scroll-mt-24 mt-4">
          <details className="group overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/[0.18] backdrop-blur-2xl">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span>
                <span
                  className="block text-[9px] font-semibold uppercase tracking-[0.13em]"
                  style={{ color: `rgba(${accent},0.72)` }}
                >
                  Concept check
                </span>
                <strong className="mt-1 block text-[15px] text-stone-200">
                  Three questions when you want a checkpoint
                </strong>
              </span>
              <Sparkles size={16} style={{ color: `rgb(${accent})` }} />
            </summary>
            <div className="fundamentals-assessment border-t border-white/[0.06] p-3 sm:p-4">
              <Assessment
                title={`${title} check`}
                questions={oneStep ? ONE_STEP_QUESTIONS : TWO_STEP_QUESTIONS}
                accentColor="cyan"
              />
            </div>
          </details>
        </section>

        <LessonNavigation
          previous={previous}
          next={next}
          unitHref={unitHref}
          currentStep={oneStep ? "02" : "03"}
          accent={accent}
        />
      </div>

      <style>{`
        .fundamentals-assessment > div { border-radius: 18px !important; padding: 16px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
        .fundamentals-assessment > div > div { min-height: 300px !important; }
        .fundamentals-assessment h3 { margin-bottom: 16px !important; font-size: 1.05rem !important; line-height: 1.45 !important; }
        .fundamentals-assessment button { padding-top: 10px !important; padding-bottom: 10px !important; }
      `}</style>
    </main>
  );
}

function EquationSide({
  label,
  expression,
  operation,
  accent,
}: {
  label: string;
  expression: string;
  operation?: string;
  accent: string;
}) {
  return (
    <div className="text-center">
      <div className="text-[8px] font-semibold uppercase tracking-[0.12em] text-stone-600">
        {label}
      </div>
      <div className="mt-2 flex min-h-[106px] items-center justify-center rounded-[18px] border border-white/[0.07] bg-white/[0.015] px-3 font-mono text-[clamp(1.4rem,3vw,2.2rem)] font-semibold text-white">
        {expression}
      </div>
      <div
        className="mx-auto mt-3 flex min-h-10 max-w-[170px] items-center justify-center rounded-xl border font-mono text-[17px]"
        style={{
          borderColor: operation ? `rgba(${accent},0.24)` : "rgba(255,255,255,0.04)",
          background: operation ? `rgba(${accent},0.045)` : "rgba(0,0,0,0.10)",
          color: operation ? `rgb(${accent})` : "rgb(87 83 78)",
        }}
      >
        {operation ?? "operation"}
      </div>
    </div>
  );
}

function LessonNavigation({
  previous,
  next,
  unitHref,
  currentStep,
  accent,
}: {
  previous?: EquationLessonNavItem;
  next?: EquationLessonNavItem;
  unitHref: string;
  currentStep: string;
  accent: string;
}) {
  return (
    <nav className="mt-4 pb-8" aria-label="Algebra Fundamentals lesson navigation">
      <div className="mb-2 flex justify-end">
        <span className="font-mono text-[10px] text-stone-700">{currentStep} / 05</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? (
          <NavCard item={previous} direction="previous" accent={accent} />
        ) : (
          <div className="hidden sm:block" aria-hidden="true" />
        )}
        {next ? (
          <NavCard item={next} direction="next" accent={accent} />
        ) : (
          <Link
            href={unitHref}
            className="group flex min-h-[76px] items-center rounded-[18px] border px-4"
            style={{
              borderColor: `rgba(${accent},0.16)`,
              background: `rgba(${accent},0.035)`,
            }}
          >
            <span className="min-w-0 flex-1 text-right">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-stone-600">
                Unit complete
              </span>
              <strong className="mt-1 block text-[14px] text-stone-200">
                Return to Algebra Fundamentals
              </strong>
            </span>
            <Check size={15} className="ml-3" style={{ color: `rgb(${accent})` }} />
          </Link>
        )}
      </div>
    </nav>
  );
}

function NavCard({
  item,
  direction,
  accent,
}: {
  item: EquationLessonNavItem;
  direction: "previous" | "next";
  accent: string;
}) {
  const previous = direction === "previous";
  return (
    <Link
      href={item.href}
      className="group flex min-h-[76px] items-center gap-3 rounded-[18px] border px-4 py-3"
      style={{
        borderColor: `rgba(${accent},0.14)`,
        background: `rgba(${accent},0.025)`,
      }}
    >
      {previous ? <ArrowLeft size={15} style={{ color: `rgb(${accent})` }} /> : null}
      <span className={`min-w-0 flex-1 ${previous ? "" : "text-right"}`}>
        <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-stone-600">
          {previous ? "Previous lesson" : "Next lesson"}
        </span>
        <strong className="mt-1 block text-[14px] text-stone-200">{item.label}</strong>
      </span>
      {!previous ? <ArrowRight size={15} style={{ color: `rgb(${accent})` }} /> : null}
    </Link>
  );
}
