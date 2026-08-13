"use client";

import { useState } from "react";
import { Layers, RefreshCcw } from "lucide-react";
import type { AssessmentQuestion } from "@/app/_components/Assessment";
import InequalitiesLessonShell, { type InequalitiesLessonNavItem } from "./InequalitiesLessonShell";
import InequalityPlane, { satisfiesPlane, type PlaneConstraint } from "./InequalityPlane";

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: InequalitiesLessonNavItem;
  next?: InequalitiesLessonNavItem;
  unitHref: string;
};

type Point = { x: number; y: number };
type Side = "above" | "below";

type SystemCase = {
  label: string;
  a: PlaneConstraint;
  b: PlaneConstraint;
  result: string;
  explanation: string;
  probes: readonly Point[];
};

const ACCENT = "167, 139, 250";
const A_RGB = "56, 189, 248";
const B_RGB = "244, 114, 182";

const CASES: readonly SystemCase[] = [
  {
    label: "Wedge overlap",
    a: { label: "A", m: 1, b: 1, relation: "≥", rgb: A_RGB },
    b: { label: "B", m: -1, b: 5, relation: "≤", rgb: B_RGB },
    result: "above A AND below B",
    explanation: "The feasible region is where the upper half-plane from A overlaps the lower half-plane from B.",
    probes: [
      { x: 0, y: 2 },
      { x: 0, y: 0 },
      { x: 3, y: 3 },
    ],
  },
  {
    label: "Horizontal band",
    a: { label: "A", m: 0, b: 1, relation: "≥", rgb: A_RGB },
    b: { label: "B", m: 0, b: 4, relation: "<", rgb: B_RGB },
    result: "1 ≤ y < 4",
    explanation: "The overlap is the horizontal band at or above y = 1 but strictly below y = 4.",
    probes: [
      { x: -2, y: 2 },
      { x: 1, y: 4 },
      { x: 2, y: 0 },
    ],
  },
  {
    label: "Empty overlap",
    a: { label: "A", m: 0, b: 3, relation: "≥", rgb: A_RGB },
    b: { label: "B", m: 0, b: 1, relation: "≤", rgb: B_RGB },
    result: "no feasible points",
    explanation: "A point cannot be at or above y = 3 and at or below y = 1 simultaneously, so the intersection is empty.",
    probes: [
      { x: 0, y: 0 },
      { x: 0, y: 2 },
      { x: 0, y: 4 },
    ],
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "systems-ineq-transfer-boundary",
    type: "mcq",
    prompt: "How should the boundary y = 2x + 1 be drawn for y > 2x + 1?",
    options: ["Solid", "Dashed"],
    correctAnswer: "Dashed",
    explanation: "The strict inequality excludes points on the boundary, so the line is dashed.",
  },
  {
    id: "systems-ineq-transfer-side",
    type: "mcq",
    prompt: "Which side is shaded for y ≤ −x + 3?",
    options: ["Above the line", "Below the line"],
    correctAnswer: "Below the line",
    explanation: "Values of y must be less than or equal to the boundary value, so the allowed half-plane is below the line.",
  },
  {
    id: "systems-ineq-transfer-point",
    type: "tf",
    prompt: "A point solves a system of inequalities only if it satisfies every inequality in the system.",
    correctAnswer: true,
    explanation: "The feasible region is the intersection of all allowed half-planes.",
  },
];

export default function SystemsInequalitiesLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [sideChoice, setSideChoice] = useState<Side | null>(null);
  const [probeIndex, setProbeIndex] = useState<number | null>(null);
  const current = CASES[caseIndex];
  const activeConstraint = stage === 0 ? current.a : stage === 1 ? current.b : null;
  const correctSide = activeConstraint ? sideFor(activeConstraint) : null;
  const sideCorrect = sideChoice !== null && sideChoice === correctSide;
  const probe = probeIndex === null ? null : current.probes[probeIndex];
  const probeValid = probe ? satisfiesPlane(probe, current.a) && satisfiesPlane(probe, current.b) : false;

  function reset(index = caseIndex) {
    setCaseIndex(index);
    setStage(0);
    setSideChoice(null);
    setProbeIndex(null);
  }

  function advance() {
    if (!sideCorrect) return;
    setStage((value) => Math.min(2, value + 1));
    setSideChoice(null);
    setProbeIndex(null);
  }

  return (
    <InequalitiesLessonShell
      breadcrumbs={breadcrumbs}
      previous={previous}
      next={next}
      unitHref={unitHref}
      step="03"
      title="Systems of Inequalities"
      subtitle="Turn each linear inequality into a boundary plus a half-plane, then keep only the coordinate-plane region that satisfies every constraint at once."
      eyebrow="Half-planes & overlap"
      accentRgb={ACCENT}
      base="#08091c"
      icon={Layers}
      practiceId="systems-inequalities-practice"
      questions={QUIZ}
      assessmentColor="violet"
    >
      <section className="mt-4 grid gap-4 rounded-[26px] border border-violet-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/75">The learner question</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">How does an inequality become an area instead of a line?</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">The related equation draws the boundary. The inequality chooses one side of that boundary. A system keeps only the points that survive every half-plane constraint.</p>
        </div>
        <div className="rounded-[18px] border border-violet-200/[0.09] bg-violet-400/[0.025] px-4 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-violet-300/65">Boundary grammar</div>
          <div className="mt-2 font-mono text-[13px] text-violet-100">&lt; or &gt; → dashed boundary</div>
          <div className="mt-1 font-mono text-[13px] text-violet-100">≤ or ≥ → solid boundary</div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">Strict inequalities exclude the boundary line. Inclusive inequalities keep it.</p>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
        <div className="max-w-3xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/72">Worked model</div>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">Boundary first, test point second, shading third.</h2>
          <p className="mt-2 text-[12px] leading-5 text-slate-500">For y ≥ x + 1, first draw y = x + 1 as a solid line. A test point such as (0, 2) makes 2 ≥ 1 true, so the half-plane containing that point is allowed.</p>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <InequalityPlane
            constraints={[{ label: "A", m: 1, b: 1, relation: "≥", rgb: A_RGB }]}
            marker={{ x: 0, y: 2, valid: true, label: "test: (0, 2) ✓" }}
            ariaLabel="Half-plane for y greater than or equal to x plus 1"
          />
          <div className="grid content-center gap-3">
            <StepCard number="01" title="Draw the boundary" formula="y = x + 1" text="Because ≥ includes equality, the boundary is solid." rgb={A_RGB} />
            <StepCard number="02" title="Test one side" formula="(0,2): 2 ≥ 1 ✓" text="The test point satisfies the inequality, so its side is allowed." rgb="52, 211, 153" />
            <StepCard number="03" title="Shade the half-plane" formula="y ≥ x + 1" text="Every point on the accepted side satisfies the same constraint." rgb={ACCENT} />
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-3 md:grid-cols-3">
        <RuleCard label="y > or y ≥" formula="shade above" text="The allowed y-values are greater than the boundary value for each x." rgb="56, 189, 248" />
        <RuleCard label="y < or y ≤" formula="shade below" text="The allowed y-values are less than the boundary value for each x." rgb="244, 114, 182" />
        <RuleCard label="System" formula="A ∩ B" text="Keep only points that survive every shaded constraint." rgb={ACCENT} />
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.14fr)_minmax(320px,0.86fr)]">
        <div className="rounded-[28px] border border-violet-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/72">Feasible-region builder</div>
              <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Build each half-plane, then intersect them.</h2>
            </div>
            <button type="button" onClick={() => reset()} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.07] px-3 py-2 text-[10px] font-semibold text-slate-500 hover:text-slate-300"><RefreshCcw size={13} />Reset</button>
          </div>

          <div className="mt-4">
            <InequalityPlane
              constraints={stage === 0 ? [current.a] : stage === 1 ? [current.b] : [current.a, current.b]}
              showOverlap={stage >= 2}
              marker={probe ? { ...probe, valid: probeValid, label: `(${probe.x}, ${probe.y}) ${probeValid ? "✓" : "✕"}` } : undefined}
              ariaLabel={`System of inequalities case: ${current.label}`}
            />
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {CASES.map((item, index) => (
              <button key={item.label} type="button" onClick={() => reset(index)} className="rounded-[15px] border px-3 py-3 text-left" style={{ borderColor: caseIndex === index ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: caseIndex === index ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)" }}><span className="block text-[10px] font-semibold text-slate-300">{item.label}</span></button>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-4">
          {stage < 2 && activeConstraint ? (
            <>
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Constraint {activeConstraint.label}</div>
              <div className="mt-2 font-mono text-[16px]" style={{ color: `rgb(${activeConstraint.rgb})` }}>y {activeConstraint.relation} {formatLine(activeConstraint.m, activeConstraint.b)}</div>
              <p className="mt-2 text-[11px] leading-5 text-slate-500">Which side of the boundary satisfies this inequality?</p>
              <div className="mt-3 grid gap-2">
                <ChoiceButton label="Shade above the line" active={sideChoice === "above"} onClick={() => setSideChoice("above")} />
                <ChoiceButton label="Shade below the line" active={sideChoice === "below"} onClick={() => setSideChoice("below")} />
              </div>
              {sideChoice ? (
                <div className={`mt-4 rounded-[16px] border p-3 ${sideCorrect ? "border-emerald-300/[0.18] bg-emerald-400/[0.035]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
                  <div className={`text-[10px] font-semibold ${sideCorrect ? "text-emerald-200" : "text-amber-200"}`}>{sideCorrect ? "Correct half-plane" : "Check the y-values"}</div>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500">{sideCorrect ? `${activeConstraint.relation === ">" || activeConstraint.relation === "≥" ? "Greater y-values lie above" : "Smaller y-values lie below"} the boundary.` : "Compare y to the boundary value at the same x. Greater y is above; smaller y is below."}</p>
                  {sideCorrect ? <button type="button" onClick={advance} className="mt-3 rounded-lg border border-violet-300/[0.18] bg-violet-400/[0.04] px-3 py-2 text-[10px] font-semibold text-violet-200">{stage === 0 ? "Add constraint B" : "Intersect the half-planes"}</button> : null}
                </div>
              ) : null}
            </>
          ) : (
            <>
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Feasible region</div>
              <div className="mt-2 font-mono text-[15px] text-violet-100">{current.result}</div>
              <p className="mt-2 text-[11px] leading-5 text-slate-500">{current.explanation}</p>
              <div className="mt-4 border-t border-white/[0.06] pt-4">
                <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/70">Test a point</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {current.probes.map((point, index) => <button key={`${point.x}-${point.y}`} type="button" onClick={() => setProbeIndex(index)} className="rounded-xl border border-white/[0.07] px-3 py-2 font-mono text-[10px] text-slate-400">({point.x}, {point.y})</button>)}
                </div>
                {probe ? (
                  <div className="mt-3 rounded-[15px] border border-white/[0.06] bg-black/[0.12] p-3 text-[11px] leading-5 text-slate-500">
                    A: <strong className={satisfiesPlane(probe, current.a) ? "text-emerald-200" : "text-rose-200"}>{satisfiesPlane(probe, current.a) ? "true" : "false"}</strong> · B: <strong className={satisfiesPlane(probe, current.b) ? "text-emerald-200" : "text-rose-200"}>{satisfiesPlane(probe, current.b) ? "true" : "false"}</strong>. {probeValid ? "The point survives both constraints." : "The point is outside the feasible intersection."}
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </section>
    </InequalitiesLessonShell>
  );
}

function sideFor(constraint: PlaneConstraint): Side {
  return constraint.relation === ">" || constraint.relation === "≥" ? "above" : "below";
}

function formatLine(m: number, b: number) {
  if (m === 0) return String(b);
  const slope = m === 1 ? "x" : m === -1 ? "−x" : `${m}x`;
  if (b === 0) return slope;
  return `${slope} ${b > 0 ? "+" : "−"} ${Math.abs(b)}`;
}

function StepCard({ number, title, formula, text, rgb }: { number: string; title: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.72)` }}>{number}</div><div className="mt-1 text-[12px] font-semibold text-slate-300">{title}</div><div className="mt-2 font-mono text-[13px]" style={{ color: `rgb(${rgb})` }}>{formula}</div><p className="mt-2 text-[10px] leading-4 text-slate-500">{text}</p></div>;
}

function RuleCard({ label, formula, text, rgb }: { label: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.16] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.72)` }}>{label}</div><div className="mt-2 font-mono text-[15px]" style={{ color: `rgb(${rgb})` }}>{formula}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function ChoiceButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-[14px] border px-3 py-3 text-left text-[11px] font-semibold" style={{ borderColor: active ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)", color: active ? `rgb(${ACCENT})` : "rgb(148 163 184)" }}>{label}</button>;
}
