"use client";

import { useState } from "react";
import { Crosshair, Equal, GitMerge, Layers } from "lucide-react";
import type { AssessmentQuestion } from "@/app/_components/Assessment";
import SystemMiniGraph from "./SystemMiniGraph";
import SystemsLessonShell, { type SystemsLessonNavItem } from "./SystemsLessonShell";

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: SystemsLessonNavItem;
  next?: SystemsLessonNavItem;
  unitHref: string;
};

type Status = "one" | "none" | "infinite";

type SystemCase = {
  label: string;
  lineA: { m: number; b: number; rgb: string };
  lineB: { m: number; b: number; rgb: string };
  status: Status;
  point?: { x: number; y: number };
  explanation: string;
};

const ACCENT = "6, 182, 212";
const CASES: readonly SystemCase[] = [
  {
    label: "Cross once",
    lineA: { m: 1, b: 2, rgb: "6, 182, 212" },
    lineB: { m: -1, b: 4, rgb: "249, 115, 22" },
    status: "one",
    point: { x: 1, y: 3 },
    explanation: "The two lines share exactly one ordered pair: (1, 3).",
  },
  {
    label: "Parallel",
    lineA: { m: 1, b: 2, rgb: "6, 182, 212" },
    lineB: { m: 1, b: -2, rgb: "249, 115, 22" },
    status: "none",
    explanation: "Equal slopes with different intercepts create distinct parallel lines, so no ordered pair satisfies both equations.",
  },
  {
    label: "Same line",
    lineA: { m: 0.5, b: 1, rgb: "6, 182, 212" },
    lineB: { m: 0.5, b: 1, rgb: "249, 115, 22" },
    status: "infinite",
    explanation: "Both equations describe the same line, so every point on that line satisfies both equations.",
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "systems-types-parallel",
    type: "mcq",
    prompt: "What solution type has y = 2x + 1 and y = 2x − 4?",
    options: ["One solution", "No solution", "Infinitely many solutions"],
    correctAnswer: "No solution",
    explanation: "The lines have the same slope but different intercepts, so they are parallel and never share a point.",
  },
  {
    id: "systems-types-point",
    type: "tf",
    prompt: "If (2, 5) satisfies only one equation in a system, then it solves the system.",
    correctAnswer: false,
    explanation: "A system solution must satisfy every equation simultaneously.",
  },
  {
    id: "systems-types-same",
    type: "mcq",
    prompt: "If two equations simplify to the same line, how many solutions does the system have?",
    options: ["0", "1", "Infinitely many"],
    correctAnswer: "Infinitely many",
    explanation: "Every point on the shared line satisfies both equations.",
  },
];

export default function SolutionTypesLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [answer, setAnswer] = useState<Status | null>(null);
  const [probe, setProbe] = useState<"shared" | "single" | null>(null);
  const current = CASES[caseIndex];
  const correct = answer === current.status;
  const probePoint = probe === "shared" ? { x: 1, y: 3 } : probe === "single" ? { x: 0, y: 2 } : null;
  const probeA = probePoint ? current.lineA.m * probePoint.x + current.lineA.b === probePoint.y : null;
  const probeB = probePoint ? current.lineB.m * probePoint.x + current.lineB.b === probePoint.y : null;

  function selectCase(index: number) {
    setCaseIndex(index);
    setAnswer(null);
    setProbe(null);
  }

  return (
    <SystemsLessonShell
      breadcrumbs={breadcrumbs}
      previous={previous}
      next={next}
      unitHref={unitHref}
      step="01"
      title="Intersections & Solution Types"
      subtitle="Interpret a system as several constraints that must be satisfied at the same time, then distinguish one shared solution, no shared solution, and infinitely many shared solutions."
      eyebrow="Shared constraints"
      accentRgb={ACCENT}
      base="#040914"
      icon={Layers}
      practiceId="solution-types-practice"
      questions={QUIZ}
      assessmentColor="cyan"
    >
      <section className="mt-4 grid gap-4 rounded-[26px] border border-cyan-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/75">The learner question</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">What does it mean to solve two equations at the same time?</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Each equation allows its own set of ordered pairs. A system keeps only the pairs that survive every constraint. Geometrically, that means finding the intersection of the solution sets.</p>
        </div>
        <div className="rounded-[18px] border border-cyan-200/[0.09] bg-cyan-400/[0.025] px-4 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-300/65">Invariant</div>
          <div className="mt-2 font-mono text-[15px] text-cyan-100">solution = A ∩ B</div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">Graphing, substitution, and elimination will all search for this same shared set in different ways.</p>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
        <div className="max-w-3xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/72">Worked model</div>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">One point must make both equations true.</h2>
          <p className="mt-2 text-[12px] leading-5 text-slate-500">For y = x + 2 and y = −x + 4, the lines cross at (1, 3). Substitution into both equations confirms why the intersection is the system solution.</p>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <SystemMiniGraph
            lineA={{ m: 1, b: 2, rgb: "6, 182, 212" }}
            lineB={{ m: -1, b: 4, rgb: "249, 115, 22" }}
            point={{ x: 1, y: 3, label: "shared: (1, 3)" }}
            ariaLabel="Two lines intersecting at the shared solution (1, 3)"
          />
          <div className="grid content-center gap-3">
            <CheckCard label="Constraint A" equation="3 = 1 + 2" text="(1, 3) satisfies y = x + 2." rgb="6, 182, 212" />
            <CheckCard label="Constraint B" equation="3 = −1 + 4" text="The same point also satisfies y = −x + 4." rgb="249, 115, 22" />
            <CheckCard label="System verdict" equation="true ∧ true" text="Because both constraints are true, (1, 3) solves the system." rgb="52, 211, 153" />
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-3 md:grid-cols-3">
        <GeometryCard icon={Crosshair} title="One solution" rule="m₁ ≠ m₂" text="Distinct nonparallel lines cross once." rgb="16, 185, 129" />
        <GeometryCard icon={GitMerge} title="No solution" rule="m₁ = m₂, b₁ ≠ b₂" text="Distinct parallel lines never meet." rgb="251, 113, 133" />
        <GeometryCard icon={Equal} title="Infinitely many" rule="same line" text="Equivalent equations share every point." rgb="163, 230, 53" />
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
        <div className="rounded-[28px] border border-cyan-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/72">Classification lab</div>
          <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Read the geometry, then name the shared solution set.</h2>
          <div className="mt-4">
            <SystemMiniGraph
              lineA={current.lineA}
              lineB={current.lineB}
              point={correct && current.point ? { ...current.point, label: `shared: (${current.point.x}, ${current.point.y})` } : null}
              ariaLabel={`System case: ${current.label}`}
            />
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {CASES.map((item, index) => (
              <button key={item.label} type="button" onClick={() => selectCase(index)} className="rounded-[15px] border px-3 py-3 text-left" style={{ borderColor: caseIndex === index ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: caseIndex === index ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)" }}>
                <span className="block text-[10px] font-semibold text-slate-300">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Classify this system</div>
          <div className="mt-3 grid gap-2">
            <ChoiceButton label="One solution" active={answer === "one"} onClick={() => setAnswer("one")} />
            <ChoiceButton label="No solution" active={answer === "none"} onClick={() => setAnswer("none")} />
            <ChoiceButton label="Infinitely many solutions" active={answer === "infinite"} onClick={() => setAnswer("infinite")} />
          </div>
          {answer ? (
            <div className={`mt-4 rounded-[16px] border p-3 ${correct ? "border-emerald-300/[0.18] bg-emerald-400/[0.035]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
              <div className={`text-[10px] font-semibold ${correct ? "text-emerald-200" : "text-amber-200"}`}>{correct ? "Correct classification" : "Look at the shared geometry again"}</div>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">{correct ? current.explanation : "A system is classified by how many ordered pairs satisfy both equations, not by how many equations are written."}</p>
            </div>
          ) : null}

          <div className="mt-5 border-t border-white/[0.06] pt-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/70">Stress-test the definition</div>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">For the one-solution model, compare a shared point with a point that satisfies only one equation.</p>
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={() => setProbe("shared")} className="rounded-xl border border-white/[0.07] px-3 py-2 font-mono text-[10px] text-slate-400">(1, 3)</button>
              <button type="button" onClick={() => setProbe("single")} className="rounded-xl border border-white/[0.07] px-3 py-2 font-mono text-[10px] text-slate-400">(0, 2)</button>
            </div>
            {probePoint ? (
              <div className="mt-3 rounded-[15px] border border-white/[0.06] bg-black/[0.12] p-3 text-[11px] leading-5 text-slate-500">
                A: <strong className={probeA ? "text-emerald-200" : "text-rose-200"}>{probeA ? "true" : "false"}</strong> · B: <strong className={probeB ? "text-emerald-200" : "text-rose-200"}>{probeB ? "true" : "false"}</strong>. {probeA && probeB ? "Both survive, so the point solves the system." : "One true equation is not enough; the point must survive both constraints."}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </SystemsLessonShell>
  );
}

function CheckCard({ label, equation, text, rgb }: { label: string; equation: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.75)` }}>{label}</div><div className="mt-2 font-mono text-[15px]" style={{ color: `rgb(${rgb})` }}>{equation}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function GeometryCard({ icon: Icon, title, rule, text, rgb }: { icon: typeof Crosshair; title: string; rule: string; text: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.16] p-4"><div className="flex items-center gap-2"><Icon size={15} style={{ color: `rgb(${rgb})` }} /><strong className="text-[14px] text-white">{title}</strong></div><div className="mt-3 font-mono text-[11px]" style={{ color: `rgb(${rgb})` }}>{rule}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function ChoiceButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-[15px] border px-3 py-3 text-left text-[11px] font-semibold" style={{ borderColor: active ? `rgba(${ACCENT},0.28)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)", color: active ? `rgb(${ACCENT})` : "rgb(148 163 184)" }}>{label}</button>;
}
