"use client";

import { useState } from "react";
import { Crosshair } from "lucide-react";
import type { AssessmentQuestion } from "@/app/_components/Assessment";
import QuadraticMiniGraph from "./QuadraticMiniGraph";
import QuadraticsLessonShell, { type QuadraticsLessonNavItem } from "./QuadraticsLessonShell";

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: QuadraticsLessonNavItem;
  next?: QuadraticsLessonNavItem;
  unitHref: string;
};

type RootCount = "two" | "one" | "none";

type RootCase = {
  label: string;
  equation: string;
  a: number;
  h: number;
  k: number;
  roots: readonly number[];
  count: RootCount;
  explanation: string;
};

const ACCENT = "244, 114, 182";
const BLUE = "96, 165, 250";
const TEAL = "45, 212, 191";

const CASES: readonly RootCase[] = [
  {
    label: "Cross twice",
    equation: "y = (x − 2)(x + 1)",
    a: 1,
    h: 0.5,
    k: -2.25,
    roots: [-1, 2],
    count: "two",
    explanation: "Each factor can equal zero: x − 2 = 0 or x + 1 = 0, so the graph crosses at x = 2 and x = −1.",
  },
  {
    label: "Touch once",
    equation: "y = (x + 2)²",
    a: 1,
    h: -2,
    k: 0,
    roots: [-2],
    count: "one",
    explanation: "The repeated factor x + 2 produces the same root twice. The vertex touches the x-axis at x = −2 and turns around.",
  },
  {
    label: "Never meet",
    equation: "y = x² + 1",
    a: 1,
    h: 0,
    k: 1,
    roots: [],
    count: "none",
    explanation: "The minimum output is 1, so y never reaches 0. The equation has no real roots even though the quadratic function still exists.",
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "roots-transfer-factored",
    type: "mcq",
    prompt: "What are the roots of y = (x − 5)(x + 2)?",
    options: ["5 and −2", "−5 and 2", "5 and 2", "−5 and −2"],
    correctAnswer: "5 and −2",
    explanation: "Set each factor equal to zero: x − 5 = 0 gives 5, and x + 2 = 0 gives −2.",
  },
  {
    id: "roots-transfer-language",
    type: "tf",
    prompt: "A root, zero, and x-intercept all describe the same event from different viewpoints.",
    correctAnswer: true,
    explanation: "They all occur when the output is zero. The root is the x-value, while the x-intercept is the corresponding point (x, 0).",
  },
  {
    id: "roots-transfer-repeated",
    type: "mcq",
    prompt: "How many distinct real roots does y = (x − 3)² have?",
    options: ["0", "1", "2", "Infinitely many"],
    correctAnswer: "1",
    explanation: "The factor x − 3 repeats, so both algebraic roots have the same value x = 3.",
  },
];

export default function RootsInterceptsLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [answer, setAnswer] = useState<RootCount | null>(null);
  const current = CASES[caseIndex];
  const correct = answer === current.count;

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
      step="03"
      title="Roots & X-Intercepts"
      subtitle="Connect three languages for one event: a root is an x-value where the function equals zero, and the graph records it as an x-intercept."
      eyebrow="Where output becomes zero"
      accentRgb={ACCENT}
      base="#130713"
      icon={Crosshair}
      practiceId="quadratic-roots-practice"
      questions={QUIZ}
      assessmentColor="fuchsia"
    >
      <section className="mt-4 grid gap-4 rounded-[26px] border border-pink-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-pink-300/75">The learner question</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">What does solving a quadratic look like on its graph?</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Solving f(x) = 0 asks where the graph reaches height zero. Those x-values are roots or zeros; the corresponding points are x-intercepts.</p>
        </div>
        <div className="rounded-[18px] border border-pink-200/[0.09] bg-pink-400/[0.025] px-4 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-pink-300/65">Same event, three names</div>
          <div className="mt-2 font-mono text-[13px] text-white">f(r) = 0</div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">r is a root or zero. The graph contains the x-intercept (r, 0).</p>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
        <div className="max-w-3xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-pink-300/72">Worked model</div>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">Read y = (x − 1)(x + 3) from its factors.</h2>
          <p className="mt-2 text-[12px] leading-5 text-slate-500">A product is zero when at least one factor is zero. That gives two x-values where the parabola reaches the x-axis.</p>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid content-center gap-3">
            <StepCard number="01" title="Set the output to zero" formula="0 = (x − 1)(x + 3)" text="Roots concern the places where y = 0." rgb={BLUE} />
            <StepCard number="02" title="Use the zero-product property" formula="x − 1 = 0  or  x + 3 = 0" text="At least one factor must become zero." rgb={TEAL} />
            <StepCard number="03" title="Name the intercepts" formula="x = 1 or x = −3" text="The graph crosses at (1, 0) and (−3, 0)." rgb={ACCENT} />
          </div>
          <QuadraticMiniGraph a={1} h={-1} k={-4} roots={[-3, 1]} accentRgb={BLUE} secondaryRgb={ACCENT} ariaLabel="Parabola with roots negative 3 and 1" />
        </div>
      </section>

      <section className="mt-4 grid gap-3 md:grid-cols-3">
        <RuleCard label="Two distinct roots" formula="crosses twice" text="The parabola passes through the x-axis at two different x-values." rgb={BLUE} />
        <RuleCard label="One repeated root" formula="touches once" text="The vertex lands on the x-axis, so the graph touches and turns." rgb={TEAL} />
        <RuleCard label="No real roots" formula="never reaches y = 0" text="The entire parabola stays above or below the x-axis." rgb={ACCENT} />
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.14fr)_minmax(320px,0.86fr)]">
        <div className="rounded-[28px] border border-pink-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-pink-300/72">Root geometry lab</div>
          <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Predict how many real roots the graph has.</h2>
          <div className="mt-4">
            <QuadraticMiniGraph a={current.a} h={current.h} k={current.k} roots={correct ? current.roots : []} accentRgb={BLUE} secondaryRgb={ACCENT} ariaLabel={`Graph for ${current.equation}`} />
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
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Current equation</div>
          <div className="mt-2 font-mono text-[16px] text-white">{current.equation}</div>
          <div className="mt-3 grid gap-2">
            <ChoiceButton label="Two distinct real roots" active={answer === "two"} onClick={() => setAnswer("two")} />
            <ChoiceButton label="One distinct real root" active={answer === "one"} onClick={() => setAnswer("one")} />
            <ChoiceButton label="No real roots" active={answer === "none"} onClick={() => setAnswer("none")} />
          </div>
          {answer ? (
            <div className={`mt-4 rounded-[16px] border p-3 ${correct ? "border-emerald-300/[0.18] bg-emerald-400/[0.035]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
              <div className={`text-[10px] font-semibold ${correct ? "text-emerald-200" : "text-amber-200"}`}>{correct ? "Root geometry identified" : "Compare the curve with y = 0"}</div>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">{correct ? current.explanation : "Count the distinct x-values where the curve meets the horizontal axis. Touching at the vertex counts as one distinct root."}</p>
            </div>
          ) : null}
          <div className="mt-5 border-t border-white/[0.06] pt-4 text-[11px] leading-5 text-slate-500"><strong className="text-pink-200">Do not confuse intercepts:</strong> the y-intercept occurs when x = 0. Roots occur when y = 0.</div>
        </div>
      </section>
    </QuadraticsLessonShell>
  );
}

function StepCard({ number, title, formula, text, rgb }: { number: string; title: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.13] p-4"><div className="flex items-center justify-between"><span className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.72)` }}>{number}</span><span className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">{title}</span></div><div className="mt-2 font-mono text-[13px] text-white">{formula}</div><p className="mt-1.5 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function RuleCard({ label, formula, text, rgb }: { label: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.17] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.75)` }}>{label}</div><div className="mt-2 font-mono text-[13px] text-white">{formula}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function ChoiceButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-[14px] border px-3 py-3 text-left text-[11px] font-semibold" style={{ borderColor: active ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${ACCENT},0.06)` : "rgba(255,255,255,0.012)", color: active ? "rgb(251,207,232)" : "rgb(148,163,184)" }}>{label}</button>;
}
