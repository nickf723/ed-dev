"use client";

import { useState } from "react";
import { Combine, RefreshCcw } from "lucide-react";
import type { AssessmentQuestion } from "@/app/_components/Assessment";
import InequalitiesLessonShell, { type InequalitiesLessonNavItem } from "./InequalitiesLessonShell";
import InequalityNumberLine, { compare, type Relation } from "./InequalityNumberLine";

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: InequalitiesLessonNavItem;
  next?: InequalitiesLessonNavItem;
  unitHref: string;
};

type Region = { boundary: number; relation: Relation; rgb: string };
type Mode = "intersection" | "union";

type CompoundCase = {
  label: string;
  leftText: string;
  rightText: string;
  connector: "AND" | "OR";
  left: Region;
  right: Region;
  mode: Mode;
  combined: string;
  interval: string;
  explanation: string;
  probes: readonly number[];
};

const ACCENT = "129, 140, 248";
const LEFT_RGB = "56, 189, 248";
const RIGHT_RGB = "192, 132, 252";

const CASES: readonly CompoundCase[] = [
  {
    label: "Bounded AND",
    leftText: "x > −2",
    rightText: "x ≤ 5",
    connector: "AND",
    left: { boundary: -2, relation: ">", rgb: LEFT_RGB },
    right: { boundary: 5, relation: "≤", rgb: RIGHT_RGB },
    mode: "intersection",
    combined: "−2 < x ≤ 5",
    interval: "(−2, 5]",
    explanation: "AND keeps values that satisfy both constraints, so only the overlap between −2 and 5 survives.",
    probes: [-3, -2, 0, 5, 6],
  },
  {
    label: "Split OR",
    leftText: "x < −3",
    rightText: "x ≥ 4",
    connector: "OR",
    left: { boundary: -3, relation: "<", rgb: LEFT_RGB },
    right: { boundary: 4, relation: "≥", rgb: RIGHT_RGB },
    mode: "union",
    combined: "x < −3 or x ≥ 4",
    interval: "(−∞, −3) ∪ [4, ∞)",
    explanation: "OR keeps values that satisfy at least one constraint, so the two separated rays both remain.",
    probes: [-5, -3, 0, 4, 7],
  },
  {
    label: "Empty AND",
    leftText: "x > 4",
    rightText: "x < 1",
    connector: "AND",
    left: { boundary: 4, relation: ">", rgb: LEFT_RGB },
    right: { boundary: 1, relation: "<", rgb: RIGHT_RGB },
    mode: "intersection",
    combined: "no values",
    interval: "∅",
    explanation: "No number can be greater than 4 and less than 1 at the same time, so the intersection is empty.",
    probes: [0, 2, 5],
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "compound-transfer-and",
    type: "mcq",
    prompt: "What does x ≥ 1 AND x < 6 describe?",
    options: ["[1, 6)", "(−∞, 1] ∪ (6, ∞)", "[6, ∞)", "∅"],
    correctAnswer: "[1, 6)",
    explanation: "AND keeps the overlap: values at least 1 and still below 6.",
  },
  {
    id: "compound-transfer-or",
    type: "tf",
    prompt: "x < −2 OR x > 3 produces two separated solution rays.",
    correctAnswer: true,
    explanation: "OR keeps either region, so values below −2 and values above 3 are both included.",
  },
  {
    id: "compound-transfer-empty",
    type: "mcq",
    prompt: "What is the solution to x > 5 AND x ≤ 2?",
    options: ["x > 5", "x ≤ 2", "All real numbers", "No solution"],
    correctAnswer: "No solution",
    explanation: "The two regions do not overlap, so their intersection is empty.",
  },
];

export default function CompoundInequalitiesLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [choice, setChoice] = useState<Mode | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [probe, setProbe] = useState<number | null>(null);
  const current = CASES[caseIndex];
  const correct = choice === current.mode;
  const probeValid = probe === null ? false : satisfiesCompound(probe, current);

  function reset(index = caseIndex) {
    setCaseIndex(index);
    setChoice(null);
    setRevealed(false);
    setProbe(null);
  }

  return (
    <InequalitiesLessonShell
      breadcrumbs={breadcrumbs}
      previous={previous}
      next={next}
      unitHref={unitHref}
      step="02"
      title="Compound Inequalities"
      subtitle="Combine two one-dimensional constraints by keeping either their shared overlap or every value accepted by at least one of them."
      eyebrow="Intersection & union"
      accentRgb={ACCENT}
      base="#0a0b20"
      icon={Combine}
      practiceId="compound-practice"
      questions={QUIZ}
      assessmentColor="indigo"
    >
      <section className="mt-4 grid gap-4 rounded-[26px] border border-indigo-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/75">The learner question</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">What happens when x must obey two inequalities at once?</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Each inequality contributes its own region. The connector tells us how to combine them: AND keeps only shared membership; OR keeps membership in either region.</p>
        </div>
        <div className="rounded-[18px] border border-indigo-200/[0.09] bg-indigo-400/[0.025] px-4 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-indigo-300/65">Set logic</div>
          <div className="mt-2 font-mono text-[14px] text-indigo-100">AND → intersection ∩</div>
          <div className="mt-1 font-mono text-[14px] text-indigo-100">OR → union ∪</div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">This same intersection/union language will reappear later in systems, domains, probability, and set theory.</p>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
        <div className="max-w-3xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/72">Worked model</div>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">AND means survive both filters.</h2>
          <p className="mt-2 text-[12px] leading-5 text-slate-500">Take x &gt; −2 and x ≤ 5. The first constraint accepts everything right of −2. The second accepts everything at or left of 5. The values accepted by both form one bounded interval.</p>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          <div>
            <div className="mb-2 font-mono text-[11px] text-sky-200">x &gt; −2</div>
            <InequalityNumberLine regions={[{ boundary: -2, relation: ">", rgb: LEFT_RGB }]} />
          </div>
          <div>
            <div className="mb-2 font-mono text-[11px] text-violet-200">x ≤ 5</div>
            <InequalityNumberLine regions={[{ boundary: 5, relation: "≤", rgb: RIGHT_RGB }]} />
          </div>
        </div>
        <div className="mt-4 rounded-[20px] border border-indigo-200/[0.10] bg-indigo-400/[0.025] p-4">
          <div className="font-mono text-[16px] text-indigo-100">−2 &lt; x ≤ 5</div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">The chained form compresses two comparisons around the same variable. It means exactly the intersection of the two number-line regions.</p>
        </div>
      </section>

      <section className="mt-4 grid gap-3 md:grid-cols-2">
        <RuleCard label="AND keeps overlap" formula="A AND B → A ∩ B" text="A value must satisfy both inequalities. If the regions never overlap, the solution set is empty." rgb="56, 189, 248" />
        <RuleCard label="OR keeps either" formula="A OR B → A ∪ B" text="A value may satisfy the first inequality, the second inequality, or both. Separated pieces can remain separated." rgb="192, 132, 252" />
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
        <div className="rounded-[28px] border border-indigo-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/72">Region combiner</div>
              <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Decide what survives the two filters.</h2>
            </div>
            <button type="button" onClick={() => reset()} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.07] px-3 py-2 text-[10px] font-semibold text-slate-500 hover:text-slate-300"><RefreshCcw size={13} />Reset</button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[18px] border border-sky-300/[0.10] bg-sky-400/[0.025] p-3"><div className="font-mono text-[14px] text-sky-100">{current.leftText}</div></div>
            <div className="rounded-[18px] border border-violet-300/[0.10] bg-violet-400/[0.025] p-3"><div className="font-mono text-[14px] text-violet-100">{current.rightText}</div></div>
          </div>
          <div className="my-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">connected by {current.connector}</div>
          <div className="grid gap-3 lg:grid-cols-2">
            <InequalityNumberLine regions={[current.left]} />
            <InequalityNumberLine regions={[current.right]} />
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {CASES.map((item, index) => (
              <button key={item.label} type="button" onClick={() => reset(index)} className="rounded-[15px] border px-3 py-3 text-left" style={{ borderColor: caseIndex === index ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: caseIndex === index ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)" }}><span className="block text-[10px] font-semibold text-slate-300">{item.label}</span></button>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">How should the regions combine?</div>
          <div className="mt-3 grid gap-2">
            <ChoiceButton label="Keep only the overlap" active={choice === "intersection"} onClick={() => { setChoice("intersection"); setRevealed(false); }} />
            <ChoiceButton label="Keep either region" active={choice === "union"} onClick={() => { setChoice("union"); setRevealed(false); }} />
          </div>
          {choice ? (
            <div className={`mt-4 rounded-[16px] border p-3 ${correct ? "border-emerald-300/[0.18] bg-emerald-400/[0.035]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
              <div className={`text-[10px] font-semibold ${correct ? "text-emerald-200" : "text-amber-200"}`}>{correct ? "Correct set operation" : "Check the connector"}</div>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">{correct ? current.explanation : current.connector === "AND" ? "AND requires simultaneous membership, so keep only the intersection." : "OR accepts membership in either set, so keep the union."}</p>
              {correct && !revealed ? <button type="button" onClick={() => setRevealed(true)} className="mt-3 rounded-lg border border-indigo-300/[0.18] bg-indigo-400/[0.04] px-3 py-2 text-[10px] font-semibold text-indigo-200">Combine regions</button> : null}
            </div>
          ) : null}

          {revealed ? (
            <div className="mt-4">
              <InequalityNumberLine regions={[current.left, current.right]} mode={current.mode} marker={probe === null ? undefined : { value: probe, valid: probeValid, label: `x=${probe}` }} />
              <div className="mt-3 font-mono text-[14px] text-indigo-100">{current.combined}</div>
              <div className="mt-1 font-mono text-[11px] text-slate-600">{current.interval}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {current.probes.map((value) => <button key={value} type="button" onClick={() => setProbe(value)} className="rounded-xl border border-white/[0.07] px-3 py-2 font-mono text-[10px] text-slate-400">x = {value}</button>)}
              </div>
              {probe !== null ? <p className={`mt-3 text-[11px] ${probeValid ? "text-emerald-200" : "text-rose-200"}`}>{probeValid ? `${probe} survives the compound constraint.` : `${probe} is rejected by the combined region.`}</p> : null}
            </div>
          ) : null}
        </div>
      </section>
    </InequalitiesLessonShell>
  );
}

function satisfiesCompound(value: number, item: CompoundCase) {
  const left = compare(value, item.left.boundary, item.left.relation);
  const right = compare(value, item.right.boundary, item.right.relation);
  return item.mode === "intersection" ? left && right : left || right;
}

function RuleCard({ label, formula, text, rgb }: { label: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.16] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.72)` }}>{label}</div><div className="mt-2 font-mono text-[15px]" style={{ color: `rgb(${rgb})` }}>{formula}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function ChoiceButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-[14px] border px-3 py-3 text-left text-[11px] font-semibold" style={{ borderColor: active ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)", color: active ? `rgb(${ACCENT})` : "rgb(148 163 184)" }}>{label}</button>;
}
