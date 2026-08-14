"use client";

import { useState } from "react";
import { Sigma } from "lucide-react";
import type { AssessmentQuestion } from "@/app/_components/Assessment";
import QuadraticMiniGraph from "./QuadraticMiniGraph";
import QuadraticsLessonShell, { type QuadraticsLessonNavItem } from "./QuadraticsLessonShell";

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: QuadraticsLessonNavItem;
  next?: QuadraticsLessonNavItem;
  unitHref: string;
};

type RootPrediction = "two" | "one" | "none";

type FormulaCase = {
  label: string;
  equation: string;
  a: number;
  b: number;
  c: number;
  h: number;
  k: number;
  discriminant: number;
  prediction: RootPrediction;
  roots: readonly number[];
  substitution: string;
  result: string;
  explanation: string;
};

const ACCENT = "34, 211, 238";
const PINK = "244, 114, 182";
const AMBER = "251, 191, 36";
const TEAL = "45, 212, 191";

const CASES: readonly FormulaCase[] = [
  {
    label: "Positive discriminant",
    equation: "x² − 5x + 6 = 0",
    a: 1,
    b: -5,
    c: 6,
    h: 2.5,
    k: -0.25,
    discriminant: 1,
    prediction: "two",
    roots: [2, 3],
    substitution: "x = (5 ± √1) / 2",
    result: "x = 2 or x = 3",
    explanation: "A positive discriminant has two real square-root directions, so the parabola meets the x-axis twice.",
  },
  {
    label: "Zero discriminant",
    equation: "x² + 4x + 4 = 0",
    a: 1,
    b: 4,
    c: 4,
    h: -2,
    k: 0,
    discriminant: 0,
    prediction: "one",
    roots: [-2],
    substitution: "x = (−4 ± √0) / 2",
    result: "x = −2",
    explanation: "When the discriminant is zero, plus and minus zero give the same root. The parabola touches the x-axis at its vertex.",
  },
  {
    label: "Negative discriminant",
    equation: "x² + 1 = 0",
    a: 1,
    b: 0,
    c: 1,
    h: 0,
    k: 1,
    discriminant: -4,
    prediction: "none",
    roots: [],
    substitution: "x = (0 ± √−4) / 2",
    result: "no real roots",
    explanation: "A negative number has no real square root. The graph never reaches the x-axis; complex numbers later extend the solution system.",
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "quadratic-formula-transfer-discriminant",
    type: "mcq",
    prompt: "What is the discriminant of 2x² + x − 3 = 0?",
    options: ["25", "−23", "7", "13"],
    correctAnswer: "25",
    explanation: "b² − 4ac = 1² − 4(2)(−3) = 1 + 24 = 25.",
  },
  {
    id: "quadratic-formula-transfer-roots",
    type: "mcq",
    prompt: "If a quadratic has discriminant 0, how many distinct real roots does it have?",
    options: ["0", "1", "2", "Infinitely many"],
    correctAnswer: "1",
    explanation: "The plus and minus branches coincide because √0 = 0.",
  },
  {
    id: "quadratic-formula-transfer-denominator",
    type: "tf",
    prompt: "In the quadratic formula, the entire numerator is divided by 2a.",
    correctAnswer: true,
    explanation: "Both −b and ±√(b² − 4ac) belong in the numerator over the single denominator 2a.",
  },
];

export default function QuadraticFormulaLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [prediction, setPrediction] = useState<RootPrediction | null>(null);
  const current = CASES[caseIndex];
  const correct = prediction === current.prediction;

  function selectCase(index: number) {
    setCaseIndex(index);
    setPrediction(null);
  }

  return (
    <QuadraticsLessonShell
      breadcrumbs={breadcrumbs}
      previous={previous}
      next={next}
      unitHref={unitHref}
      step="05"
      title="Quadratic Formula & Discriminant"
      subtitle="Use one general solving method for any quadratic in standard form, and read the discriminant first to predict how many real roots the graph can have."
      eyebrow="General solver"
      accentRgb={ACCENT}
      base="#041018"
      icon={Sigma}
      practiceId="quadratic-formula-practice"
      questions={QUIZ}
      assessmentColor="cyan"
    >
      <section className="mt-4 grid gap-4 rounded-[26px] border border-cyan-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/75">The learner question</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">How can one formula solve every quadratic equation?</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">The quadratic formula packages the completing-the-square process for ax² + bx + c = 0. Its square-root input also reveals the root geometry before we finish calculating.</p>
        </div>
        <div className="rounded-[18px] border border-cyan-200/[0.09] bg-cyan-400/[0.025] px-4 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-300/65">The formula</div>
          <div className="mt-2 font-mono text-[13px] text-white">x = (−b ± √(b² − 4ac)) / 2a</div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">Write the equation as ax² + bx + c = 0 before identifying a, b, and c.</p>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
        <div className="max-w-3xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/72">Worked model</div>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">Solve 2x² + 3x − 2 = 0 without guessing factors.</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <StepCard number="01" title="Identify coefficients" formula="a = 2, b = 3, c = −2" text="Signs belong to their coefficients." rgb={PINK} />
          <StepCard number="02" title="Compute the discriminant" formula="Δ = 3² − 4(2)(−2) = 25" text="Positive Δ predicts two real roots." rgb={AMBER} />
          <StepCard number="03" title="Substitute as one fraction" formula="x = (−3 ± 5) / 4" text="The whole numerator is divided by 2a = 4." rgb={ACCENT} />
          <StepCard number="04" title="Evaluate both branches" formula="x = 1/2 or x = −2" text="The plus and minus create the two roots." rgb={TEAL} />
        </div>
      </section>

      <section className="mt-4 grid gap-3 md:grid-cols-3">
        <RuleCard label="Δ > 0" formula="two distinct real roots" text="The square root has positive magnitude, so plus and minus separate." rgb={TEAL} />
        <RuleCard label="Δ = 0" formula="one distinct real root" text="Both formula branches collapse to the same value." rgb={AMBER} />
        <RuleCard label="Δ < 0" formula="no real roots" text="The square root leaves the real-number system; the parabola misses the x-axis." rgb={PINK} />
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.14fr)_minmax(320px,0.86fr)]">
        <div className="rounded-[28px] border border-cyan-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/72">Discriminant forecast</div>
          <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Predict the root geometry before solving.</h2>
          <div className="mt-4">
            <QuadraticMiniGraph a={current.a} h={current.h} k={current.k} roots={correct ? current.roots : []} accentRgb={ACCENT} secondaryRgb={PINK} ariaLabel={`Graph for ${current.equation}`} />
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {CASES.map((item, index) => (
              <button key={item.label} type="button" onClick={() => selectCase(index)} className="rounded-[15px] border px-3 py-3 text-left" style={{ borderColor: caseIndex === index ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: caseIndex === index ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)" }}>
                <span className="block text-[10px] font-semibold text-slate-300">{item.label}</span>
                <span className="mt-1 block font-mono text-[10px] text-slate-600">{item.equation}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Coefficient map</div>
          <div className="mt-2 font-mono text-[16px] text-white">{current.equation}</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Coefficient label="a" value={current.a} rgb={TEAL} />
            <Coefficient label="b" value={current.b} rgb={PINK} />
            <Coefficient label="c" value={current.c} rgb={ACCENT} />
          </div>
          <div className="mt-4 rounded-[15px] border border-amber-300/[0.11] bg-amber-400/[0.025] px-3 py-3">
            <div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-amber-300/70">Discriminant</div>
            <div className="mt-1 font-mono text-[13px] text-amber-100">Δ = b² − 4ac = {current.discriminant}</div>
          </div>
          <div className="mt-3 grid gap-2">
            <ChoiceButton label="Two distinct real roots" active={prediction === "two"} onClick={() => setPrediction("two")} />
            <ChoiceButton label="One distinct real root" active={prediction === "one"} onClick={() => setPrediction("one")} />
            <ChoiceButton label="No real roots" active={prediction === "none"} onClick={() => setPrediction("none")} />
          </div>

          {prediction ? (
            <div className={`mt-4 rounded-[16px] border p-3 ${correct ? "border-emerald-300/[0.18] bg-emerald-400/[0.035]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
              <div className={`text-[10px] font-semibold ${correct ? "text-emerald-200" : "text-amber-200"}`}>{correct ? "Forecast confirmed" : "Read the sign of Δ"}</div>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">{correct ? current.explanation : "Positive means two, zero means one repeated root, and negative means no real roots."}</p>
            </div>
          ) : null}

          {correct ? (
            <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
              <EquationStep label="Formula substitution" value={current.substitution} rgb={ACCENT} />
              <EquationStep label="Real solution result" value={current.result} rgb={PINK} />
            </div>
          ) : null}

          <div className="mt-5 border-t border-white/[0.06] pt-4 text-[11px] leading-5 text-slate-500"><strong className="text-cyan-200">Sign discipline:</strong> if b is negative, then −b is positive. Keep parentheses around coefficient substitutions until the arithmetic is finished.</div>
        </div>
      </section>
    </QuadraticsLessonShell>
  );
}

function StepCard({ number, title, formula, text, rgb }: { number: string; title: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.13] p-4"><div className="flex items-center justify-between"><span className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.72)` }}>{number}</span><span className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">{title}</span></div><div className="mt-2 font-mono text-[11px] text-white">{formula}</div><p className="mt-1.5 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function RuleCard({ label, formula, text, rgb }: { label: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.17] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.75)` }}>{label}</div><div className="mt-2 font-mono text-[12px] text-white">{formula}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function Coefficient({ label, value, rgb }: { label: string; value: number; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.055] bg-black/[0.10] px-3 py-2.5 text-center"><div className="text-[8px] font-semibold uppercase tracking-[0.08em] text-slate-700">{label}</div><div className="mt-1 font-mono text-[12px]" style={{ color: `rgb(${rgb})` }}>{value}</div></div>;
}

function ChoiceButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-[14px] border px-3 py-3 text-left text-[11px] font-semibold" style={{ borderColor: active ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${ACCENT},0.06)` : "rgba(255,255,255,0.012)", color: active ? "rgb(207,250,254)" : "rgb(148,163,184)" }}>{label}</button>;
}

function EquationStep({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[14px] border border-white/[0.055] bg-black/[0.11] px-3 py-2.5"><div className="text-[8px] font-semibold uppercase tracking-[0.09em] text-slate-700">{label}</div><div className="mt-1 font-mono text-[11px]" style={{ color: `rgb(${rgb})` }}>{value}</div></div>;
}
