"use client";

import { useState } from "react";
import { Crosshair } from "lucide-react";
import type { AssessmentQuestion } from "@/app/_components/Assessment";
import SystemMiniGraph from "./SystemMiniGraph";
import SystemsLessonShell, { type SystemsLessonNavItem } from "./SystemsLessonShell";

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: SystemsLessonNavItem;
  next?: SystemsLessonNavItem;
  unitHref: string;
};

type Point = { x: number; y: number };

type GraphCase = {
  label: string;
  lineA: { m: number; b: number; rgb: string };
  lineB: { m: number; b: number; rgb: string };
  solution: Point;
  candidates: readonly Point[];
};

const ACCENT = "16, 185, 129";
const CASES: readonly GraphCase[] = [
  {
    label: "Clean intersection",
    lineA: { m: 1, b: 1, rgb: "6, 182, 212" },
    lineB: { m: -1, b: 5, rgb: "249, 115, 22" },
    solution: { x: 2, y: 3 },
    candidates: [{ x: 2, y: 3 }, { x: 1, y: 4 }, { x: 3, y: 2 }],
  },
  {
    label: "Different rates",
    lineA: { m: 2, b: -1, rgb: "6, 182, 212" },
    lineB: { m: 0, b: 3, rgb: "249, 115, 22" },
    solution: { x: 2, y: 3 },
    candidates: [{ x: 0, y: 3 }, { x: 2, y: 3 }, { x: 2, y: -1 }],
  },
  {
    label: "Negative intersection",
    lineA: { m: 1, b: 0, rgb: "6, 182, 212" },
    lineB: { m: -2, b: -3, rgb: "249, 115, 22" },
    solution: { x: -1, y: -1 },
    candidates: [{ x: -1, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 1 }],
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "systems-graph-transfer-definition",
    type: "mcq",
    prompt: "When solving a system by graphing, what point are you looking for?",
    options: ["Any point on either line", "The y-intercept of the first line", "A point shared by both graphs"],
    correctAnswer: "A point shared by both graphs",
    explanation: "The system solution must satisfy both equations, so it lies on both graphs.",
  },
  {
    id: "systems-graph-transfer-verify",
    type: "tf",
    prompt: "If a plotted intersection looks like (2, 3), substitution into both equations is a useful verification.",
    correctAnswer: true,
    explanation: "Graphing reveals the candidate geometrically; substitution confirms that the ordered pair satisfies both equations.",
  },
  {
    id: "systems-graph-transfer-estimate",
    type: "mcq",
    prompt: "Why can graphing be less exact than substitution or elimination?",
    options: ["Lines are never exact", "An intersection may fall between grid marks", "Graphing changes the equations"],
    correctAnswer: "An intersection may fall between grid marks",
    explanation: "A graph may only show an approximate location when the exact coordinates are fractional or irrational.",
  },
];

export default function GraphingSystemsLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [verified, setVerified] = useState(false);
  const current = CASES[caseIndex];
  const selected = choice === null ? null : current.candidates[choice];
  const correct = Boolean(selected && selected.x === current.solution.x && selected.y === current.solution.y);
  const valueA = selected ? current.lineA.m * selected.x + current.lineA.b : null;
  const valueB = selected ? current.lineB.m * selected.x + current.lineB.b : null;

  function chooseCase(index: number) {
    setCaseIndex(index);
    setChoice(null);
    setVerified(false);
  }

  return (
    <SystemsLessonShell
      breadcrumbs={breadcrumbs}
      previous={previous}
      next={next}
      unitHref={unitHref}
      step="02"
      title="Solving by Graphing"
      subtitle="Solve a linear system by finding the ordered pair shared by both graphs, then verify that the visual intersection really satisfies both equations."
      eyebrow="Intersection on the plane"
      accentRgb={ACCENT}
      base="#03100d"
      icon={Crosshair}
      practiceId="systems-graphing-practice"
      questions={QUIZ}
      assessmentColor="emerald"
    >
      <section className="mt-4 grid gap-4 rounded-[26px] border border-emerald-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/75">The learner question</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">How can the graph solve both equations at once?</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Each graph shows every solution to one equation. Their intersection automatically keeps only the ordered pairs that belong to both solution sets.</p>
        </div>
        <div className="rounded-[18px] border border-emerald-200/[0.09] bg-emerald-400/[0.025] px-4 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-300/65">Graphing method</div>
          <div className="mt-2 font-mono text-[13px] text-emerald-100">graph A → graph B → read A ∩ B</div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">The method changes the representation, not the definition of a system solution.</p>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
        <div className="max-w-3xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/72">Worked model</div>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">The crossing point is a candidate. Both equations verify it.</h2>
          <p className="mt-2 text-[12px] leading-5 text-slate-500">For y = x + 1 and y = −x + 5, the graphs cross at (2, 3). Reading the graph gives the candidate; substitution explains why it is valid.</p>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <SystemMiniGraph
            lineA={{ m: 1, b: 1, rgb: "6, 182, 212" }}
            lineB={{ m: -1, b: 5, rgb: "249, 115, 22" }}
            point={{ x: 2, y: 3, label: "intersection (2, 3)" }}
            ariaLabel="Two system lines intersecting at (2, 3)"
          />
          <div className="grid content-center gap-3">
            <StepCard number="01" title="Graph both equations" text="Every point on each line satisfies its own equation." rgb="6, 182, 212" />
            <StepCard number="02" title="Read the intersection" text="The lines share the point (2, 3)." rgb={ACCENT} />
            <StepCard number="03" title="Verify both constraints" text="3 = 2 + 1 and 3 = −2 + 5, so the point survives both equations." rgb="249, 115, 22" />
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.14fr)_minmax(320px,0.86fr)]">
        <div className="rounded-[28px] border border-emerald-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/72">Intersection lab</div>
          <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Locate the point shared by both lines.</h2>
          <div className="mt-4">
            <SystemMiniGraph
              lineA={current.lineA}
              lineB={current.lineB}
              point={correct ? { ...current.solution, label: `shared (${current.solution.x}, ${current.solution.y})` } : null}
              candidates={choice === null ? current.candidates.map((point) => ({ ...point, rgb: "251, 191, 36" })) : []}
              ariaLabel={`Graphing-system case: ${current.label}`}
            />
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {CASES.map((item, index) => (
              <button key={item.label} type="button" onClick={() => chooseCase(index)} className="rounded-[15px] border px-3 py-3 text-left" style={{ borderColor: caseIndex === index ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: caseIndex === index ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)" }}>
                <span className="block text-[10px] font-semibold text-slate-300">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Choose the intersection</div>
          <div className="mt-3 grid gap-2">
            {current.candidates.map((point, index) => (
              <button key={`${point.x}-${point.y}`} type="button" onClick={() => { setChoice(index); setVerified(false); }} className="rounded-[15px] border px-3 py-3 font-mono text-[12px]" style={{ borderColor: choice === index ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: choice === index ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)", color: choice === index ? `rgb(${ACCENT})` : "rgb(148 163 184)" }}>
                ({point.x}, {point.y})
              </button>
            ))}
          </div>

          {selected ? (
            <div className={`mt-4 rounded-[16px] border p-3 ${correct ? "border-emerald-300/[0.18] bg-emerald-400/[0.035]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
              <div className={`text-[10px] font-semibold ${correct ? "text-emerald-200" : "text-amber-200"}`}>{correct ? "That is the visual intersection" : "That point is not shared by both lines"}</div>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">{correct ? "Now verify the coordinates algebraically." : "A point can sit on one graph without solving the system. Look for where both graphs occupy the same coordinate."}</p>
              {correct ? <button type="button" onClick={() => setVerified(true)} className="mt-3 w-full rounded-xl border border-emerald-300/[0.18] px-3 py-2 text-[10px] font-semibold text-emerald-200">Verify both equations</button> : null}
            </div>
          ) : null}

          {verified && selected ? (
            <div className="mt-3 rounded-[16px] border border-white/[0.06] bg-black/[0.12] p-3 text-[11px] leading-5 text-slate-500">
              Constraint A gives y = <strong className="text-cyan-200">{formatNumber(valueA ?? 0)}</strong>. Constraint B gives y = <strong className="text-orange-200">{formatNumber(valueB ?? 0)}</strong>. Both match the chosen y-coordinate {selected.y}, so ({selected.x}, {selected.y}) solves the system.
            </div>
          ) : null}
        </div>
      </section>

      <section className="mt-4 rounded-[24px] border border-amber-200/[0.10] bg-black/[0.18] p-4 backdrop-blur-2xl">
        <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/72">Boundary of the method</div>
        <h3 className="mt-2 text-[18px] font-semibold text-white">A graph can reveal structure without always revealing exact coordinates.</h3>
        <p className="mt-2 max-w-4xl text-[12px] leading-5 text-slate-500">The system y = x and y = −x + 1 intersects at (1/2, 1/2). On a coarse grid that location may only be estimated. Substitution and elimination can recover exact coordinates when the graph is visually ambiguous.</p>
      </section>
    </SystemsLessonShell>
  );
}

function StepCard({ number, title, text, rgb }: { number: string; title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><span className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.72)` }}>{number}</span><h3 className="mt-1 text-[14px] font-semibold text-white">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}
