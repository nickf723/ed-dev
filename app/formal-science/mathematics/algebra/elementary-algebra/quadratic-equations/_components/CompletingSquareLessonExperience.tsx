"use client";

import { useState } from "react";
import { Square } from "lucide-react";
import type { AssessmentQuestion } from "@/app/_components/Assessment";
import QuadraticsLessonShell, { type QuadraticsLessonNavItem } from "./QuadraticsLessonShell";

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: QuadraticsLessonNavItem;
  next?: QuadraticsLessonNavItem;
  unitHref: string;
};

type SquareCase = {
  label: string;
  source: string;
  normalized: string;
  b: number;
  add: number;
  options: readonly number[];
  balanced: string;
  squareForm: string;
  solution: string;
  explanation: string;
};

const ACCENT = "167, 139, 250";
const PINK = "244, 114, 182";
const TEAL = "45, 212, 191";

const CASES: readonly SquareCase[] = [
  {
    label: "Positive middle term",
    source: "x² + 8x = 9",
    normalized: "x² + 8x = 9",
    b: 8,
    add: 16,
    options: [4, 8, 16],
    balanced: "x² + 8x + 16 = 9 + 16",
    squareForm: "(x + 4)² = 25",
    solution: "x = 1 or x = −9",
    explanation: "Half of 8 is 4, and 4² = 16. That completes the perfect-square trinomial.",
  },
  {
    label: "Negative middle term",
    source: "x² − 10x = 11",
    normalized: "x² − 10x = 11",
    b: -10,
    add: 25,
    options: [10, 20, 25],
    balanced: "x² − 10x + 25 = 11 + 25",
    squareForm: "(x − 5)² = 36",
    solution: "x = 11 or x = −1",
    explanation: "Half of −10 is −5, and (−5)² = 25. The sign stays inside the completed binomial.",
  },
  {
    label: "Leading coefficient",
    source: "2x² + 8x = 6",
    normalized: "x² + 4x = 3",
    b: 4,
    add: 4,
    options: [2, 4, 8],
    balanced: "x² + 4x + 4 = 3 + 4",
    squareForm: "(x + 2)² = 7",
    solution: "x = −2 ± √7",
    explanation: "Divide every term by 2 first so the x² coefficient becomes 1. Then half of 4 is 2, and 2² = 4.",
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "complete-square-transfer-add",
    type: "mcq",
    prompt: "What number completes the square in x² + 12x + ___?",
    options: ["6", "12", "24", "36"],
    correctAnswer: "36",
    explanation: "Half of 12 is 6, and 6² = 36.",
  },
  {
    id: "complete-square-transfer-balance",
    type: "tf",
    prompt: "When solving an equation, adding the square-completing number only to the left side preserves equality.",
    correctAnswer: false,
    explanation: "The same value must be added to both sides of the equation to preserve the solution set.",
  },
  {
    id: "complete-square-transfer-rewrite",
    type: "mcq",
    prompt: "Which binomial square equals x² − 14x + 49?",
    options: ["(x − 7)²", "(x + 7)²", "(x − 14)²", "(x + 14)²"],
    correctAnswer: "(x − 7)²",
    explanation: "(x − 7)² expands to x² − 14x + 49.",
  },
];

export default function CompletingSquareLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedAdd, setSelectedAdd] = useState<number | null>(null);
  const current = CASES[caseIndex];
  const correct = selectedAdd === current.add;
  const half = current.b / 2;

  function selectCase(index: number) {
    setCaseIndex(index);
    setSelectedAdd(null);
  }

  return (
    <QuadraticsLessonShell
      breadcrumbs={breadcrumbs}
      previous={previous}
      next={next}
      unitHref={unitHref}
      step="04"
      title="Completing the Square"
      subtitle="Engineer a perfect-square trinomial by adding the exact missing area, then solve or reveal vertex form without changing the equation's truth."
      eyebrow="Build the hidden square"
      accentRgb={ACCENT}
      base="#0b071b"
      icon={Square}
      practiceId="completing-square-practice"
      questions={QUIZ}
      assessmentColor="purple"
    >
      <section className="mt-4 grid gap-4 rounded-[26px] border border-purple-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-purple-300/75">The learner question</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">How can an unfinished quadratic expression become one square?</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">The middle coefficient tells us the missing side length. Half it, square it, and add that value to complete a perfect-square trinomial.</p>
        </div>
        <div className="rounded-[18px] border border-purple-200/[0.09] bg-purple-400/[0.025] px-4 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-purple-300/65">Square builder</div>
          <div className="mt-2 font-mono text-[13px] text-white">x² + bx + (b/2)² = (x + b/2)²</div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">Inside an equation, add the same square-completing value to both sides.</p>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
        <div className="max-w-3xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-purple-300/72">Worked model</div>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">Solve x² + 6x = 7 by completing the square.</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <StepCard number="01" title="Half the middle coefficient" formula="6 ÷ 2 = 3" text="The completed binomial will contain x + 3." rgb={PINK} />
          <StepCard number="02" title="Square the half" formula="3² = 9" text="Nine is the exact term missing from the perfect square." rgb={TEAL} />
          <StepCard number="03" title="Preserve equality" formula="x² + 6x + 9 = 7 + 9" text="Adding 9 to both sides keeps the same solutions." rgb={ACCENT} />
          <StepCard number="04" title="Unsquare carefully" formula="(x + 3)² = 16 → x + 3 = ±4" text="Both square roots matter, giving x = 1 or x = −7." rgb="96, 165, 250" />
        </div>
      </section>

      <section className="mt-4 grid gap-3 md:grid-cols-3">
        <RuleCard label="Normalize first" formula="coefficient of x² must be 1" text="If a ≠ 1, divide or factor it out before using the half-and-square rule." rgb="96, 165, 250" />
        <RuleCard label="Balance the equation" formula="add the same value to both sides" text="Completing the square is an equivalent transformation, not a one-sided edit." rgb={TEAL} />
        <RuleCard label="Keep both roots" formula="u² = n → u = ±√n" text="The plus-or-minus appears when reversing a square, not when building one." rgb={PINK} />
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
        <div className="rounded-[28px] border border-purple-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-purple-300/72">Square construction lab</div>
          <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Choose the term that completes the square.</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {CASES.map((item, index) => (
              <button key={item.label} type="button" onClick={() => selectCase(index)} className="rounded-[15px] border px-3 py-3 text-left" style={{ borderColor: caseIndex === index ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: caseIndex === index ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)" }}>
                <span className="block text-[10px] font-semibold text-slate-300">{item.label}</span>
                <span className="mt-1 block font-mono text-[10px] text-slate-600">{item.source}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-[20px] border border-white/[0.07] bg-black/[0.13] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Start</div>
            <div className="mt-2 font-mono text-[18px] text-white">{current.source}</div>
            {current.normalized !== current.source ? (
              <div className="mt-3 rounded-[14px] border border-blue-300/[0.11] bg-blue-400/[0.025] px-3 py-2.5"><span className="text-[9px] uppercase tracking-[0.09em] text-blue-300/70">Normalize every term</span><div className="mt-1 font-mono text-[13px] text-blue-100">{current.normalized}</div></div>
            ) : null}
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {current.options.map((value) => <button key={value} type="button" onClick={() => setSelectedAdd(value)} className="rounded-[14px] border px-3 py-3 font-mono text-[12px]" style={{ borderColor: selectedAdd === value ? `rgba(${ACCENT},0.34)` : "rgba(255,255,255,0.06)", background: selectedAdd === value ? `rgba(${ACCENT},0.07)` : "rgba(255,255,255,0.012)", color: selectedAdd === value ? "rgb(233,213,255)" : "rgb(148,163,184)" }}>add {value}</button>)}
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Construction logic</div>
          <div className="mt-3 space-y-2">
            <Readout label="Middle coefficient b" value={String(current.b)} rgb={PINK} />
            <Readout label="Half of b" value={String(half)} rgb={TEAL} />
            <Readout label="Square of the half" value={String(current.add)} rgb={ACCENT} hidden={!correct} />
          </div>

          {selectedAdd !== null ? (
            <div className={`mt-4 rounded-[16px] border p-3 ${correct ? "border-emerald-300/[0.18] bg-emerald-400/[0.035]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
              <div className={`text-[10px] font-semibold ${correct ? "text-emerald-200" : "text-amber-200"}`}>{correct ? "Square completed" : "Half first, then square"}</div>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">{correct ? current.explanation : `The missing term is not b or b ÷ 2. Compute (${current.b} ÷ 2)².`}</p>
            </div>
          ) : null}

          {correct ? (
            <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
              <EquationStep label="Add to both sides" value={current.balanced} rgb={TEAL} />
              <EquationStep label="Rewrite as one square" value={current.squareForm} rgb={ACCENT} />
              <EquationStep label="Solve" value={current.solution} rgb={PINK} />
            </div>
          ) : null}
        </div>
      </section>
    </QuadraticsLessonShell>
  );
}

function StepCard({ number, title, formula, text, rgb }: { number: string; title: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.13] p-4"><div className="flex items-center justify-between"><span className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.72)` }}>{number}</span><span className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">{title}</span></div><div className="mt-2 font-mono text-[12px] text-white">{formula}</div><p className="mt-1.5 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function RuleCard({ label, formula, text, rgb }: { label: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.17] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.75)` }}>{label}</div><div className="mt-2 font-mono text-[12px] text-white">{formula}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function Readout({ label, value, rgb, hidden = false }: { label: string; value: string; rgb: string; hidden?: boolean }) {
  return <div className="flex items-center justify-between gap-4 rounded-[13px] border border-white/[0.05] bg-black/[0.10] px-3 py-2"><span className="text-[10px] text-slate-600">{label}</span><strong className="font-mono text-[11px]" style={{ color: hidden ? "rgb(51,65,85)" : `rgb(${rgb})` }}>{hidden ? "?" : value}</strong></div>;
}

function EquationStep({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[14px] border border-white/[0.055] bg-black/[0.11] px-3 py-2.5"><div className="text-[8px] font-semibold uppercase tracking-[0.09em] text-slate-700">{label}</div><div className="mt-1 font-mono text-[11px]" style={{ color: `rgb(${rgb})` }}>{value}</div></div>;
}
