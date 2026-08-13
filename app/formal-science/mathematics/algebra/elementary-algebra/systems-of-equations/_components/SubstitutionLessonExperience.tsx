"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import type { AssessmentQuestion } from "@/app/_components/Assessment";
import SystemsLessonShell, { type SystemsLessonNavItem } from "./SystemsLessonShell";

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: SystemsLessonNavItem;
  next?: SystemsLessonNavItem;
  unitHref: string;
};

type SubCase = {
  label: string;
  isolated: string;
  other: string;
  replace: string;
  reduced: string;
  solvedX: string;
  solvedY: string;
  solution: string;
  choices: readonly { label: string; correct: boolean; feedback: string }[];
};

const ACCENT = "249, 115, 22";
const CASES: readonly SubCase[] = [
  {
    label: "y already isolated",
    isolated: "y = x + 1",
    other: "2x + y = 7",
    replace: "x + 1",
    reduced: "2x + (x + 1) = 7",
    solvedX: "3x + 1 = 7 → x = 2",
    solvedY: "y = 2 + 1 → y = 3",
    solution: "(2, 3)",
    choices: [
      { label: "replace y with x + 1", correct: true, feedback: "Correct. The first equation says y and x + 1 are equal, so one may replace the other." },
      { label: "replace x with x + 1", correct: false, feedback: "The equation isolates y, not x. Substitution must replace a quantity with something equal to that same quantity." },
      { label: "replace 7 with x + 1", correct: false, feedback: "Nothing says 7 equals x + 1 for every shared solution. Replace the isolated variable y." },
    ],
  },
  {
    label: "x already isolated",
    isolated: "x = y − 2",
    other: "x + 2y = 10",
    replace: "y − 2",
    reduced: "(y − 2) + 2y = 10",
    solvedX: "3y − 2 = 10 → y = 4",
    solvedY: "x = 4 − 2 → x = 2",
    solution: "(2, 4)",
    choices: [
      { label: "replace x with y − 2", correct: true, feedback: "Correct. x and y − 2 represent the same value on every shared solution." },
      { label: "replace y with y − 2", correct: false, feedback: "The isolated equation defines x, so x is the quantity that can be replaced." },
      { label: "replace 10 with y − 2", correct: false, feedback: "10 is not the isolated variable. Substitution follows an equality, not visual proximity." },
    ],
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "sub-transfer-replace",
    type: "mcq",
    prompt: "Given y = 3x − 2 and x + y = 10, what should replace y in the second equation?",
    options: ["3x − 2", "x + 10", "y − 2"],
    correctAnswer: "3x − 2",
    explanation: "Because y = 3x − 2, the expression 3x − 2 may replace y.",
  },
  {
    id: "sub-transfer-equivalence",
    type: "tf",
    prompt: "Substitution preserves the system because the replacement expression is equal to the variable it replaces.",
    correctAnswer: true,
    explanation: "The method relies on equality: equal quantities can replace one another without changing the shared solutions.",
  },
  {
    id: "sub-transfer-back",
    type: "mcq",
    prompt: "After substitution gives x = 4, what should you do next?",
    options: ["Stop immediately", "Use x = 4 in an original equation to find the other variable", "Multiply both equations by 4"],
    correctAnswer: "Use x = 4 in an original equation to find the other variable",
    explanation: "A system solution needs values for both variables, so back-substitute to recover the second coordinate.",
  },
];

export default function SubstitutionLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
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
      step="03"
      title="Substitution"
      subtitle="Replace a variable with an equivalent expression so two simultaneous constraints collapse into one equation, then recover the second variable and verify the shared solution."
      eyebrow="Replace equals with equals"
      accentRgb={ACCENT}
      base="#160a03"
      icon={RefreshCw}
      practiceId="substitution-practice"
      questions={QUIZ}
      assessmentColor="amber"
    >
      <section className="mt-4 grid gap-4 rounded-[26px] border border-orange-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-orange-300/75">The learner question</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">How can one equation be inserted into the other without changing the system?</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">If an equation tells us two expressions are equal, either expression can replace the other. Substitution uses that equality to remove one variable while preserving every shared solution.</p>
        </div>
        <div className="rounded-[18px] border border-orange-200/[0.09] bg-orange-400/[0.025] px-4 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-orange-300/65">Core permission</div>
          <div className="mt-2 font-mono text-[14px] text-orange-100">if y = E, replace y with E</div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">The replacement works because the two forms name the same value, not because of a memorized symbol trick.</p>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
        <div className="max-w-3xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-orange-300/72">Worked model</div>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">Turn two equations into one equation in one variable.</h2>
          <p className="mt-2 text-[12px] leading-5 text-slate-500">Start with y = x + 1 and 2x + y = 7. Since y and x + 1 are equal, replace y in the second equation.</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <StepCard number="01" title="Identify an equality" formula="y = x + 1" text="The first equation gives a replacement for y." rgb="6, 182, 212" />
          <StepCard number="02" title="Substitute" formula="2x + (x + 1) = 7" text="The system has become one equation in x." rgb={ACCENT} />
          <StepCard number="03" title="Solve" formula="3x + 1 = 7 → x = 2" text="Now ordinary equation solving exposes one coordinate." rgb="129, 140, 248" />
          <StepCard number="04" title="Back-substitute" formula="y = 2 + 1 = 3" text="Recover the second coordinate: (2, 3)." rgb="52, 211, 153" />
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <div className="rounded-[28px] border border-orange-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-orange-300/72">Substitution workbench</div>
          <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Choose the equality that actually permits the replacement.</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <EquationCard label="Isolated equation" equation={current.isolated} rgb="6, 182, 212" />
            <EquationCard label="Other constraint" equation={current.other} rgb="249, 115, 22" />
          </div>
          <div className="mt-3 flex gap-2">
            {CASES.map((item, index) => (
              <button key={item.label} type="button" onClick={() => chooseCase(index)} className="rounded-xl border px-3 py-2 text-[10px] font-semibold" style={{ borderColor: caseIndex === index ? `rgba(${ACCENT},0.28)` : "rgba(255,255,255,0.06)", background: caseIndex === index ? `rgba(${ACCENT},0.05)` : "transparent", color: caseIndex === index ? `rgb(${ACCENT})` : "rgb(100 116 139)" }}>{item.label}</button>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-4">
          {stage === 0 ? (
            <>
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">What replacement is justified?</div>
              <div className="mt-3 grid gap-2">
                {current.choices.map((item, index) => (
                  <button key={item.label} type="button" onClick={() => setChoice(index)} className="rounded-[15px] border px-3 py-3 text-left text-[11px] font-semibold" style={{ borderColor: choice === index ? `rgba(${ACCENT},0.28)` : "rgba(255,255,255,0.06)", background: choice === index ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)", color: choice === index ? `rgb(${ACCENT})` : "rgb(148 163 184)" }}>{item.label}</button>
                ))}
              </div>
              {selected ? (
                <div className={`mt-4 rounded-[16px] border p-3 ${selected.correct ? "border-emerald-300/[0.18] bg-emerald-400/[0.035]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
                  <div className={`text-[10px] font-semibold ${selected.correct ? "text-emerald-200" : "text-amber-200"}`}>{selected.correct ? "Equivalent replacement" : "That replacement is not licensed by the equality"}</div>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500">{selected.feedback}</p>
                  {selected.correct ? <button type="button" onClick={() => setStage(1)} className="mt-3 w-full rounded-xl border border-emerald-300/[0.18] px-3 py-2 text-[10px] font-semibold text-emerald-200">Substitute into the other equation</button> : null}
                </div>
              ) : null}
            </>
          ) : (
            <div className="space-y-3">
              <ProgressLine active={stage >= 1} label="Substitute" equation={current.reduced} rgb={ACCENT} />
              <ProgressLine active={stage >= 2} label="Solve the one-variable equation" equation={current.solvedX} rgb="129, 140, 248" />
              <ProgressLine active={stage >= 3} label="Back-substitute" equation={current.solvedY} rgb="6, 182, 212" />
              <ProgressLine active={stage >= 4} label="Shared solution" equation={current.solution} rgb="52, 211, 153" />
              {stage < 4 ? <button type="button" onClick={() => setStage((value) => Math.min(4, value + 1))} className="w-full rounded-xl border px-3 py-2.5 text-[10px] font-semibold" style={{ borderColor: `rgba(${ACCENT},0.24)`, background: `rgba(${ACCENT},0.05)`, color: `rgb(${ACCENT})` }}>Continue the transformation</button> : null}
            </div>
          )}
        </div>
      </section>

      <section className="mt-4 grid gap-3 md:grid-cols-2">
        <RuleCard label="Substitution preserves meaning" formula="equal ↔ replaceable" text="The method does not discard an equation. It carries its information into the other equation through an equivalent expression." rgb="249, 115, 22" />
        <RuleCard label="Back-substitution completes the pair" formula="x alone is not the system solution" text="A two-variable system normally needs both coordinates. After solving for one variable, recover the other and verify the ordered pair in the original constraints." rgb="6, 182, 212" />
      </section>
    </SystemsLessonShell>
  );
}

function StepCard({ number, title, formula, text, rgb }: { number: string; title: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4"><span className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.72)` }}>{number}</span><h3 className="mt-1 text-[14px] font-semibold text-white">{title}</h3><div className="mt-3 font-mono text-[12px]" style={{ color: `rgb(${rgb})` }}>{formula}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
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
