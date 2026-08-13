"use client";

import { useState } from "react";
import { GitMerge } from "lucide-react";
import type { AssessmentQuestion } from "@/app/_components/Assessment";
import SystemsLessonShell, { type SystemsLessonNavItem } from "./SystemsLessonShell";

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: SystemsLessonNavItem;
  next?: SystemsLessonNavItem;
  unitHref: string;
};

type ElimCase = {
  label: string;
  eqA: string;
  eqB: string;
  goal: string;
  prep?: string;
  preparedA?: string;
  combine: string;
  reduced: string;
  solve: string;
  back: string;
  solution: string;
  choices: readonly { label: string; correct: boolean; feedback: string }[];
};

const ACCENT = "129, 140, 248";
const CASES: readonly ElimCase[] = [
  {
    label: "Cancel immediately",
    eqA: "x + y = 7",
    eqB: "x − y = 1",
    goal: "Eliminate y",
    combine: "add the equations",
    reduced: "2x = 8",
    solve: "x = 4",
    back: "4 + y = 7 → y = 3",
    solution: "(4, 3)",
    choices: [
      { label: "Add the equations", correct: true, feedback: "+y and −y are additive inverses, so adding the equations cancels y." },
      { label: "Subtract B from A", correct: false, feedback: "That would cancel x instead. It is legal, but it does not match the stated goal of eliminating y." },
      { label: "Add only the left sides", correct: false, feedback: "Combining equations means performing the same combination on both sides of the equal signs." },
    ],
  },
  {
    label: "Scale, then cancel",
    eqA: "x + 2y = 7",
    eqB: "2x − y = 4",
    goal: "Eliminate x",
    prep: "multiply equation A by −2",
    preparedA: "−2x − 4y = −14",
    combine: "add the prepared A to B",
    reduced: "−5y = −10",
    solve: "y = 2",
    back: "x + 2(2) = 7 → x = 3",
    solution: "(3, 2)",
    choices: [
      { label: "Multiply all of A by −2", correct: true, feedback: "Scaling the entire equation by a nonzero factor preserves its solution set and creates −2x to cancel +2x." },
      { label: "Multiply only x by −2", correct: false, feedback: "Scaling only one term changes the equation. Every term on both sides must be multiplied by the same factor." },
      { label: "Add A and B immediately", correct: false, feedback: "That gives 3x + y = 11, so neither variable cancels. Prepare opposite coefficients first." },
    ],
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "elim-transfer-direct",
    type: "mcq",
    prompt: "For x + y = 9 and x − y = 3, which operation eliminates y immediately?",
    options: ["Add the equations", "Multiply only y by −1", "Subtract 9"],
    correctAnswer: "Add the equations",
    explanation: "+y and −y cancel when the equations are added side by side.",
  },
  {
    id: "elim-transfer-scale",
    type: "tf",
    prompt: "Multiplying every term of an equation by the same nonzero number preserves its solutions.",
    correctAnswer: true,
    explanation: "Scaling an entire equation by a nonzero factor creates an equivalent equation, which is why coefficient matching is allowed in elimination.",
  },
  {
    id: "elim-transfer-whole",
    type: "mcq",
    prompt: "What is invalid when preparing an equation for elimination?",
    options: ["Multiplying the entire equation by −3", "Adding two equations side by side", "Multiplying only one term by −3"],
    correctAnswer: "Multiplying only one term by −3",
    explanation: "A legal scale operation must apply to every term on both sides of the equation.",
  },
];

export default function EliminationLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [stage, setStage] = useState(0);
  const current = CASES[caseIndex];
  const selected = choice === null ? null : current.choices[choice];

  function chooseCase(index: number) {
    setCaseIndex(index);
    setChoice(null);
    setStage(0);
  }

  return (
    <SystemsLessonShell
      breadcrumbs={breadcrumbs}
      previous={previous}
      next={next}
      unitHref={unitHref}
      step="04"
      title="Elimination"
      subtitle="Combine equivalent equations so one variable cancels, leaving a one-variable equation that still describes the same shared solution."
      eyebrow="Cancel one coordinate"
      accentRgb={ACCENT}
      base="#09081a"
      icon={GitMerge}
      practiceId="elimination-practice"
      questions={QUIZ}
      assessmentColor="indigo"
    >
      <section className="mt-4 grid gap-4 rounded-[26px] border border-indigo-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/75">The learner question</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">How can two equations be combined without losing their shared solution?</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">At a shared solution, both equalities are true simultaneously. Adding, subtracting, or safely scaling those equalities produces another true relationship, and opposite coefficients can cancel one variable entirely.</p>
        </div>
        <div className="rounded-[18px] border border-indigo-200/[0.09] bg-indigo-400/[0.025] px-4 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-indigo-300/65">Elimination target</div>
          <div className="mt-2 font-mono text-[14px] text-indigo-100">+ay + (−ay) = 0</div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">The cancellation is not magic. It is ordinary inverse arithmetic applied to two equivalent constraints.</p>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
        <div className="max-w-3xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/72">Worked model</div>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">Opposite coefficients disappear when the equations are added.</h2>
          <p className="mt-2 text-[12px] leading-5 text-slate-500">In x + y = 7 and x − y = 1, the y-coefficients are already opposites.</p>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-[22px] border border-white/[0.06] bg-black/[0.14] p-5 font-mono">
            <EquationRow left="x + y" right="7" rgb="6, 182, 212" />
            <EquationRow left="x − y" right="1" rgb="249, 115, 22" />
            <div className="my-3 border-t border-white/[0.12]" />
            <EquationRow left="2x + 0y" right="8" rgb={ACCENT} />
            <div className="mt-4 rounded-[16px] border border-indigo-300/[0.12] bg-indigo-400/[0.03] px-3 py-3 text-[12px] text-indigo-200">2x = 8 → x = 4</div>
          </div>
          <div className="grid content-center gap-3">
            <StepCard number="01" title="Line up like variables" text="Treat each equation as one complete equality." rgb="6, 182, 212" />
            <StepCard number="02" title="Combine both sides" text="Add left to left and right to right. +y and −y cancel to zero." rgb={ACCENT} />
            <StepCard number="03" title="Recover the other coordinate" text="x = 4, then 4 + y = 7 gives y = 3. Shared solution: (4, 3)." rgb="52, 211, 153" />
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <div className="rounded-[28px] border border-indigo-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/72">Elimination workbench</div>
          <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Create opposite coefficients, then combine.</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <EquationCard label="Equation A" equation={current.eqA} rgb="6, 182, 212" />
            <EquationCard label="Equation B" equation={current.eqB} rgb="249, 115, 22" />
          </div>
          <div className="mt-3 rounded-[16px] border border-white/[0.06] bg-black/[0.12] px-3 py-3 text-[11px] text-slate-500">Goal: <strong className="text-indigo-200">{current.goal}</strong></div>
          <div className="mt-3 flex gap-2">
            {CASES.map((item, index) => (
              <button key={item.label} type="button" onClick={() => chooseCase(index)} className="rounded-xl border px-3 py-2 text-[10px] font-semibold" style={{ borderColor: caseIndex === index ? `rgba(${ACCENT},0.28)` : "rgba(255,255,255,0.06)", background: caseIndex === index ? `rgba(${ACCENT},0.05)` : "transparent", color: caseIndex === index ? `rgb(${ACCENT})` : "rgb(100 116 139)" }}>{item.label}</button>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-4">
          {stage === 0 ? (
            <>
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Choose the useful legal move</div>
              <div className="mt-3 grid gap-2">
                {current.choices.map((item, index) => (
                  <button key={item.label} type="button" onClick={() => setChoice(index)} className="rounded-[15px] border px-3 py-3 text-left text-[11px] font-semibold" style={{ borderColor: choice === index ? `rgba(${ACCENT},0.28)` : "rgba(255,255,255,0.06)", background: choice === index ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)", color: choice === index ? `rgb(${ACCENT})` : "rgb(148 163 184)" }}>{item.label}</button>
                ))}
              </div>
              {selected ? (
                <div className={`mt-4 rounded-[16px] border p-3 ${selected.correct ? "border-emerald-300/[0.18] bg-emerald-400/[0.035]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
                  <div className={`text-[10px] font-semibold ${selected.correct ? "text-emerald-200" : "text-amber-200"}`}>{selected.correct ? "Legal and useful" : "Recheck the whole-equation operation"}</div>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500">{selected.feedback}</p>
                  {selected.correct ? <button type="button" onClick={() => setStage(1)} className="mt-3 w-full rounded-xl border border-emerald-300/[0.18] px-3 py-2 text-[10px] font-semibold text-emerald-200">Apply the move</button> : null}
                </div>
              ) : null}
            </>
          ) : (
            <div className="space-y-3">
              {current.prep && current.preparedA ? <ProgressLine active={stage >= 1} label="Prepare opposite coefficients" equation={`${current.prep}: ${current.preparedA}`} rgb="6, 182, 212" /> : null}
              <ProgressLine active={stage >= 1} label="Combine" equation={current.combine} rgb={ACCENT} />
              <ProgressLine active={stage >= 2} label="Reduced equation" equation={current.reduced} rgb="249, 115, 22" />
              <ProgressLine active={stage >= 3} label="Solve one variable" equation={current.solve} rgb="129, 140, 248" />
              <ProgressLine active={stage >= 4} label="Back-substitute" equation={current.back} rgb="6, 182, 212" />
              <ProgressLine active={stage >= 5} label="Shared solution" equation={current.solution} rgb="52, 211, 153" />
              {stage < 5 ? <button type="button" onClick={() => setStage((value) => Math.min(5, value + 1))} className="w-full rounded-xl border px-3 py-2.5 text-[10px] font-semibold" style={{ borderColor: `rgba(${ACCENT},0.24)`, background: `rgba(${ACCENT},0.05)`, color: `rgb(${ACCENT})` }}>Continue</button> : null}
            </div>
          )}
        </div>
      </section>

      <section className="mt-4 grid gap-3 md:grid-cols-2">
        <RuleCard label="Scale the entire equation" formula="E = F ⇒ kE = kF, k ≠ 0" text="Coefficient matching is legal only when the same nonzero factor multiplies every term on both sides." rgb="6, 182, 212" />
        <RuleCard label="Combine entire equalities" formula="A = B and C = D ⇒ A + C = B + D" text="Adding or subtracting equations preserves truth at the shared solution. Cancellation simply removes one coordinate from the resulting relationship." rgb={ACCENT} />
      </section>
    </SystemsLessonShell>
  );
}

function EquationRow({ left, right, rgb }: { left: string; right: string; rgb: string }) {
  return <div className="grid grid-cols-[1fr_32px_70px] items-center gap-2 py-2 text-[16px]"><span style={{ color: `rgb(${rgb})` }}>{left}</span><span className="text-slate-600">=</span><span className="text-right text-white">{right}</span></div>;
}

function StepCard({ number, title, text, rgb }: { number: string; title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><span className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.72)` }}>{number}</span><h3 className="mt-1 text-[14px] font-semibold text-white">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function EquationCard({ label, equation, rgb }: { label: string; equation: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.72)` }}>{label}</div><div className="mt-2 font-mono text-[16px] text-white">{equation}</div></div>;
}

function ProgressLine({ active, label, equation, rgb }: { active: boolean; label: string; equation: string; rgb: string }) {
  return <div className={`rounded-[16px] border p-3 transition-opacity ${active ? "opacity-100" : "opacity-20"}`} style={{ borderColor: active ? `rgba(${rgb},0.18)` : "rgba(255,255,255,0.05)", background: active ? `rgba(${rgb},0.025)` : "transparent" }}><div className="text-[8px] font-semibold uppercase tracking-[0.11em] text-slate-600">{label}</div><div className="mt-1.5 font-mono text-[12px]" style={{ color: active ? `rgb(${rgb})` : "rgb(71 85 105)" }}>{equation}</div></div>;
}

function RuleCard({ label, formula, text, rgb }: { label: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.16] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.72)` }}>{label}</div><div className="mt-2 font-mono text-[13px]" style={{ color: `rgb(${rgb})` }}>{formula}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
