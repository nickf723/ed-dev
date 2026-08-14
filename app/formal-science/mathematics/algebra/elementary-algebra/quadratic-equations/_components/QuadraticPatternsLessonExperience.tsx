"use client";

import { useState } from "react";
import { FunctionSquare } from "lucide-react";
import type { AssessmentQuestion } from "@/app/_components/Assessment";
import QuadraticMiniGraph from "./QuadraticMiniGraph";
import QuadraticsLessonShell, { type QuadraticsLessonNavItem } from "./QuadraticsLessonShell";

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: QuadraticsLessonNavItem;
  next?: QuadraticsLessonNavItem;
  unitHref: string;
};

type PatternKind = "linear" | "quadratic" | "other";

type PatternCase = {
  label: string;
  equation: string;
  xs: readonly number[];
  ys: readonly number[];
  kind: PatternKind;
  explanation: string;
};

const ACCENT = "96, 165, 250";
const PINK = "244, 114, 182";

const CASES: readonly PatternCase[] = [
  {
    label: "Constant first change",
    equation: "y = 2x + 1",
    xs: [-2, -1, 0, 1, 2],
    ys: [-3, -1, 1, 3, 5],
    kind: "linear",
    explanation: "The first differences are all 2, so the rate itself stays constant. This is linear, not quadratic.",
  },
  {
    label: "Constant second change",
    equation: "y = x² − 1",
    xs: [-2, -1, 0, 1, 2],
    ys: [3, 0, -1, 0, 3],
    kind: "quadratic",
    explanation: "The first differences change, but the second differences are all 2. That constant second change is the table signature of a quadratic pattern.",
  },
  {
    label: "Changing second change",
    equation: "y = 2ˣ",
    xs: [0, 1, 2, 3, 4],
    ys: [1, 2, 4, 8, 16],
    kind: "other",
    explanation: "Neither the first nor second differences stay constant. This pattern grows multiplicatively rather than quadratically.",
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "quadratic-patterns-second-difference",
    type: "mcq",
    prompt: "A table has first differences 3, 5, 7, 9. What are its second differences?",
    options: ["2, 2, 2", "3, 5, 7", "1, 1, 1", "They cannot be found"],
    correctAnswer: "2, 2, 2",
    explanation: "Subtract consecutive first differences: 5−3, 7−5, and 9−7 are all 2.",
  },
  {
    id: "quadratic-patterns-negative-a",
    type: "tf",
    prompt: "The function y = −3x² + 2 is still quadratic.",
    correctAnswer: true,
    explanation: "The leading coefficient may be negative. The x² term still has nonzero coefficient, so the function remains quadratic.",
  },
  {
    id: "quadratic-patterns-degree",
    type: "mcq",
    prompt: "Which expression is quadratic?",
    options: ["4x + 1", "2x² − 5x + 3", "x³ + 2", "7"],
    correctAnswer: "2x² − 5x + 3",
    explanation: "Its highest nonzero exponent is 2, which makes the polynomial degree 2.",
  },
];

export default function QuadraticPatternsLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
  const [caseIndex, setCaseIndex] = useState(1);
  const [answer, setAnswer] = useState<PatternKind | null>(null);
  const current = CASES[caseIndex];
  const first = differences(current.ys);
  const second = differences(first);
  const correct = answer === current.kind;

  function selectCase(index: number) {
    setCaseIndex(index);
    setAnswer(null);
  }

  return (
    <QuadraticsLessonShell
      breadcrumbs={breadcrumbs}
      previous={previous}
      next={next}
      unitHref={unitHref}
      step="01"
      title="Quadratic Patterns & Parabolas"
      subtitle="Recognize a quadratic relationship before reaching for a formula: its rate of change changes at a constant rate, producing a symmetric parabolic graph."
      eyebrow="Pattern before formula"
      accentRgb={ACCENT}
      base="#050b19"
      icon={FunctionSquare}
      practiceId="quadratic-patterns-practice"
      questions={QUIZ}
      assessmentColor="blue"
    >
      <section className="mt-4 grid gap-4 rounded-[26px] border border-blue-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300/75">The learner question</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">How can a table reveal that a relationship will bend?</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">A line adds the same amount each step. A quadratic changes by different amounts, but those changes themselves change by a constant amount.</p>
        </div>
        <div className="rounded-[18px] border border-blue-200/[0.09] bg-blue-400/[0.025] px-4 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-blue-300/65">Signature</div>
          <div className="mt-2 font-mono text-[14px] text-blue-100">constant second differences</div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">For equally spaced x-values, a nonzero constant second difference signals a quadratic pattern.</p>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
        <div className="max-w-3xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300/72">Worked model</div>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">Watch x² change from table to graph.</h2>
          <p className="mt-2 text-[12px] leading-5 text-slate-500">The outputs 4, 1, 0, 1, 4 do not change by one fixed amount. Their first differences are −3, −1, 1, 3, whose differences are constantly 2.</p>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid content-center gap-3">
            <DifferenceRow label="x" values={[-2, -1, 0, 1, 2]} rgb="148, 163, 184" />
            <DifferenceRow label="y = x²" values={[4, 1, 0, 1, 4]} rgb={ACCENT} />
            <DifferenceRow label="first Δ" values={[-3, -1, 1, 3]} rgb={PINK} />
            <DifferenceRow label="second Δ" values={[2, 2, 2]} rgb="52, 211, 153" />
            <div className="rounded-[17px] border border-emerald-300/[0.12] bg-emerald-400/[0.025] px-4 py-3 text-[11px] leading-5 text-slate-500"><strong className="text-emerald-200">What bends:</strong> the slope is not constant. <strong className="text-emerald-200">What stays regular:</strong> the slope changes by the same amount each step.</div>
          </div>
          <QuadraticMiniGraph a={1} h={0} k={0} accentRgb={ACCENT} secondaryRgb={PINK} ariaLabel="Graph of y equals x squared" />
        </div>
      </section>

      <section className="mt-4 grid gap-3 md:grid-cols-3">
        <RuleCard label="Linear" formula="constant first Δ" text="The output changes by one fixed amount for equal x-steps." rgb="45, 212, 191" />
        <RuleCard label="Quadratic" formula="constant second Δ" text="The first change varies, but its change is constant." rgb={ACCENT} />
        <RuleCard label="Degree" formula="ax² + bx + c, a ≠ 0" text="The highest nonzero exponent is 2. If a = 0, the quadratic term disappears." rgb={PINK} />
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
        <div className="rounded-[28px] border border-blue-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300/72">Difference detector</div>
          <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Classify the pattern from its changes.</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {CASES.map((item, index) => (
              <button key={item.label} type="button" onClick={() => selectCase(index)} className="rounded-[15px] border px-3 py-3 text-left" style={{ borderColor: caseIndex === index ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: caseIndex === index ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)" }}>
                <span className="block text-[10px] font-semibold text-slate-300">{item.label}</span>
                <span className="mt-1 block font-mono text-[10px] text-slate-600">{item.equation}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <DifferenceRow label="x" values={current.xs} rgb="148, 163, 184" />
            <DifferenceRow label="y" values={current.ys} rgb={ACCENT} />
            <DifferenceRow label="first Δ" values={first} rgb={PINK} />
            <DifferenceRow label="second Δ" values={second} rgb="52, 211, 153" />
          </div>
        </div>

        <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Your classification</div>
          <div className="mt-3 grid gap-2">
            <ChoiceButton label="Linear" active={answer === "linear"} onClick={() => setAnswer("linear")} />
            <ChoiceButton label="Quadratic" active={answer === "quadratic"} onClick={() => setAnswer("quadratic")} />
            <ChoiceButton label="Neither" active={answer === "other"} onClick={() => setAnswer("other")} />
          </div>
          {answer ? (
            <div className={`mt-4 rounded-[16px] border p-3 ${correct ? "border-emerald-300/[0.18] bg-emerald-400/[0.035]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
              <div className={`text-[10px] font-semibold ${correct ? "text-emerald-200" : "text-amber-200"}`}>{correct ? "Pattern identified" : "Follow the difference rows"}</div>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">{correct ? current.explanation : "Constant first differences indicate linear. Constant nonzero second differences indicate quadratic. If neither row is constant, choose neither."}</p>
            </div>
          ) : null}
          <div className="mt-5 border-t border-white/[0.06] pt-4 text-[11px] leading-5 text-slate-500"><strong className="text-pink-200">Boundary case:</strong> y = −x² still has constant second differences. The negative sign flips the parabola downward; it does not remove the quadratic pattern.</div>
        </div>
      </section>
    </QuadraticsLessonShell>
  );
}

function differences(values: readonly number[]) {
  return values.slice(1).map((value, index) => value - values[index]);
}

function DifferenceRow({ label, values, rgb }: { label: string; values: readonly number[]; rgb: string }) {
  return (
    <div className="grid grid-cols-[92px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.055] bg-black/[0.11] px-3 py-2.5">
      <span className="text-[9px] font-semibold uppercase tracking-[0.10em]" style={{ color: `rgba(${rgb},0.72)` }}>{label}</span>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${values.length}, minmax(0, 1fr))` }}>
        {values.map((value, index) => <span key={`${value}-${index}`} className="rounded-lg bg-white/[0.025] px-1 py-1.5 text-center font-mono text-[11px] text-slate-300">{value}</span>)}
      </div>
    </div>
  );
}

function RuleCard({ label, formula, text, rgb }: { label: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.17] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.75)` }}>{label}</div><div className="mt-2 font-mono text-[13px] text-white">{formula}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function ChoiceButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-[14px] border px-3 py-3 text-left text-[11px] font-semibold transition-colors" style={{ borderColor: active ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${ACCENT},0.06)` : "rgba(255,255,255,0.012)", color: active ? "rgb(219,234,254)" : "rgb(148,163,184)" }}>{label}</button>;
}
