"use client";

import { useState } from "react";
import { MoveHorizontal, RefreshCcw } from "lucide-react";
import type { AssessmentQuestion } from "@/app/_components/Assessment";
import InequalitiesLessonShell, { type InequalitiesLessonNavItem } from "./InequalitiesLessonShell";
import InequalityNumberLine, { compare, type Relation } from "./InequalityNumberLine";

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: InequalitiesLessonNavItem;
  next?: InequalitiesLessonNavItem;
  unitHref: string;
};

type Choice = {
  id: string;
  label: string;
  helpful: boolean;
  feedback: string;
};

type Stage = {
  expression: string;
  prompt: string;
  result: string;
  choices: readonly Choice[];
};

type SolveCase = {
  label: string;
  stages: readonly Stage[];
  boundary: number;
  relation: Relation;
  interval: string;
  probes: readonly number[];
};

const ACCENT = "56, 189, 248";

const CASES: readonly SolveCase[] = [
  {
    label: "Positive divisor",
    stages: [
      {
        expression: "2x + 1 < 7",
        prompt: "Remove the +1 from both sides.",
        result: "2x < 6",
        choices: [
          { id: "minus-1", label: "− 1", helpful: true, feedback: "Subtracting 1 from both sides preserves the order and removes the outer +1." },
          { id: "plus-1", label: "+ 1", helpful: false, feedback: "Adding 1 to both sides is legal, but it moves farther from isolating x." },
          { id: "divide-2", label: "÷ 2", helpful: false, feedback: "Legal if every term is divided, but it creates fractions before removing the additive layer." },
        ],
      },
      {
        expression: "2x < 6",
        prompt: "Remove the coefficient 2.",
        result: "x < 3",
        choices: [
          { id: "divide-2", label: "÷ 2", helpful: true, feedback: "Dividing by a positive number preserves the inequality direction: x < 3." },
          { id: "times-2", label: "× 2", helpful: false, feedback: "Multiplying by 2 is legal but strengthens the coefficient instead of removing it." },
          { id: "minus-2", label: "− 2", helpful: false, feedback: "Subtraction cannot undo multiplication by 2." },
        ],
      },
    ],
    boundary: 3,
    relation: "<",
    interval: "(−∞, 3)",
    probes: [2, 3, 5],
  },
  {
    label: "Negative divisor",
    stages: [
      {
        expression: "−2x + 1 < 7",
        prompt: "Remove the +1 from both sides.",
        result: "−2x < 6",
        choices: [
          { id: "minus-1", label: "− 1", helpful: true, feedback: "Subtracting 1 removes the additive layer without changing the inequality direction." },
          { id: "plus-1", label: "+ 1", helpful: false, feedback: "Balanced, but it does not simplify the expression around x." },
          { id: "divide-neg2", label: "÷ (−2)", helpful: false, feedback: "This could be done first if every term is divided, but it creates a less direct route." },
        ],
      },
      {
        expression: "−2x < 6",
        prompt: "Divide by −2. What happens to the order?",
        result: "x > −3",
        choices: [
          { id: "divide-flip", label: "÷ (−2), reverse < to >", helpful: true, feedback: "Correct. Multiplying or dividing both sides by a negative reflects both values across zero, reversing their order." },
          { id: "divide-keep", label: "÷ (−2), keep <", helpful: false, feedback: "Dividing by −2 without reversing the relation would claim x < −3, which does not describe an equivalent region." },
          { id: "times-neg2", label: "× (−2)", helpful: false, feedback: "This preserves an equivalent inequality only if the order reverses, but it moves away from isolating x." },
        ],
      },
    ],
    boundary: -3,
    relation: ">",
    interval: "(−3, ∞)",
    probes: [-5, -3, 0],
  },
  {
    label: "Inclusive boundary",
    stages: [
      {
        expression: "3x − 4 ≥ 8",
        prompt: "Remove the −4 from both sides.",
        result: "3x ≥ 12",
        choices: [
          { id: "plus-4", label: "+ 4", helpful: true, feedback: "Adding 4 to both sides removes the subtraction and preserves the order." },
          { id: "minus-4", label: "− 4", helpful: false, feedback: "Legal, but it moves farther from isolating x." },
          { id: "divide-3", label: "÷ 3", helpful: false, feedback: "Legal if applied to every term, but removing the additive layer first is cleaner." },
        ],
      },
      {
        expression: "3x ≥ 12",
        prompt: "Remove the coefficient 3.",
        result: "x ≥ 4",
        choices: [
          { id: "divide-3", label: "÷ 3", helpful: true, feedback: "Dividing by positive 3 gives x ≥ 4. The equality bar remains because 4 itself satisfies the original inequality." },
          { id: "times-3", label: "× 3", helpful: false, feedback: "Balanced, but it increases the coefficient." },
          { id: "minus-3", label: "− 3", helpful: false, feedback: "Subtraction cannot cancel multiplication by 3." },
        ],
      },
    ],
    boundary: 4,
    relation: "≥",
    interval: "[4, ∞)",
    probes: [3, 4, 6],
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "ineq-one-transfer-solve",
    type: "short_answer",
    prompt: "Solve 4x + 3 < 19. Enter the boundary inequality for x.",
    acceptableAnswers: ["x<4", "x < 4"],
    explanation: "Subtract 3 to get 4x < 16, then divide by 4: x < 4.",
  },
  {
    id: "ineq-one-transfer-negative",
    type: "mcq",
    prompt: "What results from dividing −3x ≤ 12 by −3?",
    options: ["x ≤ −4", "x ≥ −4", "x ≤ 4", "x ≥ 4"],
    correctAnswer: "x ≥ −4",
    explanation: "Division by a negative reverses the inequality, and 12 ÷ −3 = −4.",
  },
  {
    id: "ineq-one-transfer-boundary",
    type: "tf",
    prompt: "The boundary value 5 is included in x ≤ 5.",
    correctAnswer: true,
    explanation: "The equality bar includes the boundary, so the number line uses a closed endpoint at 5.",
  },
];

export default function OneVariableInequalityLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [probe, setProbe] = useState<number | null>(null);

  const current = CASES[caseIndex];
  const solved = stage >= current.stages.length;
  const activeStage = solved ? null : current.stages[stage];
  const activeChoice = activeStage?.choices.find((item) => item.id === choice) ?? null;

  function reset(index = caseIndex) {
    setCaseIndex(index);
    setStage(0);
    setChoice(null);
    setProbe(null);
  }

  function apply() {
    if (!activeChoice?.helpful) return;
    setStage((value) => value + 1);
    setChoice(null);
    setProbe(null);
  }

  const probeValid = probe === null ? false : compare(probe, current.boundary, current.relation);

  return (
    <InequalitiesLessonShell
      breadcrumbs={breadcrumbs}
      previous={previous}
      next={next}
      unitHref={unitHref}
      step="01"
      title="One-Variable Inequalities"
      subtitle="Solve a one-variable inequality by preserving order, then interpret the result as an entire region of allowed values instead of one exact answer."
      eyebrow="Boundary & region"
      accentRgb={ACCENT}
      base="#071426"
      icon={MoveHorizontal}
      practiceId="one-variable-practice"
      questions={QUIZ}
      assessmentColor="cyan"
    >
      <section className="mt-4 grid gap-4 rounded-[26px] border border-sky-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-sky-300/75">The learner question</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">Why does an inequality usually have a whole region of answers?</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">An equation asks where two quantities are equal. An inequality asks where one stays ordered relative to another. Once the variable is isolated, a boundary divides the number line into allowed and disallowed regions.</p>
        </div>
        <div className="rounded-[18px] border border-sky-200/[0.09] bg-sky-400/[0.025] px-4 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-sky-300/65">Read the endpoint</div>
          <div className="mt-2 font-mono text-[14px] text-sky-100">&lt; or &gt; → open ○</div>
          <div className="mt-1 font-mono text-[14px] text-sky-100">≤ or ≥ → closed ●</div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">The equality bar decides whether the boundary value itself belongs to the region.</p>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
        <div className="max-w-3xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-sky-300/72">Worked model</div>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">Solve first. Interpret the region second.</h2>
          <p className="mt-2 text-[12px] leading-5 text-slate-500">For 2x + 1 &lt; 7, the algebra follows the same balance logic as an equation. The difference appears at the end: x &lt; 3 names every value to the left of 3.</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <ModelCard number="01" formula="2x + 1 < 7" text="Subtract 1 from both sides." rgb="56, 189, 248" />
          <ModelCard number="02" formula="2x < 6" text="Divide both sides by positive 2. The order stays the same." rgb="34, 211, 238" />
          <ModelCard number="03" formula="x < 3" text="3 is the boundary; all smaller values satisfy the inequality." rgb="96, 165, 250" />
        </div>
        <div className="mt-4">
          <InequalityNumberLine regions={[{ boundary: 3, relation: "<", rgb: ACCENT }]} />
        </div>
      </section>

      <section className="mt-4 rounded-[28px] border border-amber-200/[0.10] bg-black/[0.18] p-5 backdrop-blur-2xl">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] lg:items-center">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/72">Why negatives reverse order</div>
            <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Multiplying by a negative reflects the number line.</h2>
            <p className="mt-2 text-[12px] leading-5 text-slate-500">Start with 2 &lt; 5. Multiply both values by −1 and they become −2 and −5. Reflection across zero swaps left and right, so the equivalent comparison is −2 &gt; −5. The symbol reversal records that geometric change in order.</p>
          </div>
          <div className="rounded-[20px] border border-amber-200/[0.10] bg-amber-400/[0.025] p-4 font-mono text-center">
            <div className="text-[20px] text-amber-100">2 &lt; 5</div>
            <div className="my-2 text-[10px] uppercase tracking-[0.12em] text-slate-600">multiply both by −1</div>
            <div className="text-[20px] text-amber-100">−2 &gt; −5</div>
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <div className="rounded-[28px] border border-sky-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-sky-300/72">Solve workbench</div>
              <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Preserve the order while you isolate x.</h2>
            </div>
            <button type="button" onClick={() => reset()} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.07] px-3 py-2 text-[10px] font-semibold text-slate-500 hover:text-slate-300"><RefreshCcw size={13} />Reset</button>
          </div>

          <div className="mt-4 rounded-[22px] border border-white/[0.07] bg-black/[0.14] p-5 text-center">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">{solved ? "Solved inequality" : `Step ${stage + 1} of ${current.stages.length}`}</div>
            <div className="mt-3 font-mono text-[clamp(1.7rem,3.6vw,2.6rem)] text-white">{solved ? `x ${current.relation} ${current.boundary}` : activeStage?.expression}</div>
            {!solved ? <p className="mt-3 text-[11px] leading-5 text-slate-500">{activeStage?.prompt}</p> : <p className="mt-3 text-[11px] text-sky-200">Interval: {current.interval}</p>}
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {CASES.map((item, index) => (
              <button key={item.label} type="button" onClick={() => reset(index)} className="rounded-[15px] border px-3 py-3 text-left" style={{ borderColor: caseIndex === index ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: caseIndex === index ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)" }}>
                <span className="block text-[10px] font-semibold text-slate-300">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-4">
          {!solved && activeStage ? (
            <>
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Choose the next move</div>
              <div className="mt-3 grid gap-2">
                {activeStage.choices.map((item) => (
                  <button key={item.id} type="button" onClick={() => setChoice(item.id)} className="rounded-[14px] border px-3 py-3 text-left font-mono text-[12px]" style={{ borderColor: choice === item.id ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: choice === item.id ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)", color: choice === item.id ? `rgb(${ACCENT})` : "rgb(148 163 184)" }}>{item.label}</button>
                ))}
              </div>
              {activeChoice ? (
                <div className={`mt-4 rounded-[16px] border p-3 ${activeChoice.helpful ? "border-emerald-300/[0.18] bg-emerald-400/[0.035]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
                  <div className={`text-[10px] font-semibold ${activeChoice.helpful ? "text-emerald-200" : "text-amber-200"}`}>{activeChoice.helpful ? "Equivalent and useful" : "Not the cleanest path"}</div>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500">{activeChoice.feedback}</p>
                  {activeChoice.helpful ? (
                    <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/[0.05] bg-black/[0.12] p-3">
                      <span className="font-mono text-[13px] text-slate-300">{activeStage.result}</span>
                      <button type="button" onClick={apply} className="rounded-lg border border-sky-300/[0.18] bg-sky-400/[0.04] px-3 py-2 text-[10px] font-semibold text-sky-200">Simplify</button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </>
          ) : (
            <>
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Interpret and test</div>
              <div className="mt-3"><InequalityNumberLine regions={[{ boundary: current.boundary, relation: current.relation, rgb: ACCENT }]} marker={probe === null ? undefined : { value: probe, valid: probeValid, label: `x=${probe}` }} /></div>
              <div className="mt-3 flex flex-wrap gap-2">
                {current.probes.map((value) => <button key={value} type="button" onClick={() => setProbe(value)} className="rounded-xl border border-white/[0.07] px-3 py-2 font-mono text-[10px] text-slate-400">x = {value}</button>)}
              </div>
              {probe !== null ? <p className={`mt-3 text-[11px] ${probeValid ? "text-emerald-200" : "text-rose-200"}`}>{probeValid ? `${probe} belongs to the solution region.` : `${probe} does not satisfy x ${current.relation} ${current.boundary}.`}</p> : null}
            </>
          )}
        </div>
      </section>
    </InequalitiesLessonShell>
  );
}

function ModelCard({ number, formula, text, rgb }: { number: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.72)` }}>{number}</div><div className="mt-2 font-mono text-[16px]" style={{ color: `rgb(${rgb})` }}>{formula}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
