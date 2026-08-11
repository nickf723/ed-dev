"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Grid3X3,
  Layers,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";

type Relation = "<" | "≤" | ">" | "≥";

type Constraint = {
  label: string;
  slope: number;
  intercept: number;
  relation: Relation;
  rgb: string;
};

type SystemExample = {
  id: "wedge" | "band" | "empty";
  label: string;
  note: string;
  a: Constraint;
  b: Constraint;
  probe: { x: number; y: number };
  hasOverlap: boolean;
};

const GRAPH_MIN = -7;
const GRAPH_MAX = 7;

const EXAMPLES: readonly SystemExample[] = [
  {
    id: "wedge",
    label: "Overlapping wedge",
    note: "Two slanted half-planes overlap in a region between their boundaries.",
    a: { label: "A", slope: 1, intercept: 1, relation: "≥", rgb: "14, 165, 233" },
    b: { label: "B", slope: -1, intercept: 5, relation: "≤", rgb: "249, 115, 22" },
    probe: { x: 0, y: 2 },
    hasOverlap: true,
  },
  {
    id: "band",
    label: "Horizontal band",
    note: "One lower bound and one upper bound leave a strip of feasible points.",
    a: { label: "A", slope: 0, intercept: 1, relation: "≥", rgb: "14, 165, 233" },
    b: { label: "B", slope: 0, intercept: 4, relation: "<", rgb: "249, 115, 22" },
    probe: { x: 1, y: 2 },
    hasOverlap: true,
  },
  {
    id: "empty",
    label: "No shared region",
    note: "The lower requirement sits above the upper requirement, so nothing can satisfy both.",
    a: { label: "A", slope: 0, intercept: 3, relation: "≥", rgb: "14, 165, 233" },
    b: { label: "B", slope: 0, intercept: 1, relation: "≤", rgb: "249, 115, 22" },
    probe: { x: 0, y: 2 },
    hasOverlap: false,
  },
] as const;

export default function SystemsOfInequalitiesPage() {
  const [exampleId, setExampleId] = useState<SystemExample["id"]>("wedge");
  const example = EXAMPLES.find((item) => item.id === exampleId) ?? EXAMPLES[0];
  const [probeX, setProbeX] = useState(example.probe.x);
  const [probeY, setProbeY] = useState(example.probe.y);

  const aBoundary = example.a.slope * probeX + example.a.intercept;
  const bBoundary = example.b.slope * probeX + example.b.intercept;
  const passesA = compare(probeY, aBoundary, example.a.relation);
  const passesB = compare(probeY, bBoundary, example.b.relation);
  const passesSystem = passesA && passesB;

  const chooseExample = (id: SystemExample["id"]) => {
    const next = EXAMPLES.find((item) => item.id === id) ?? EXAMPLES[0];
    setExampleId(id);
    setProbeX(next.probe.x);
    setProbeY(next.probe.y);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080b18] text-slate-100 selection:bg-indigo-400/25">
      <SystemsInequalitiesBackdrop />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Formal Sciences", href: "/formal-science" },
            { label: "Mathematics", href: "/formal-science/mathematics" },
            { label: "Algebra", href: "/formal-science/mathematics/algebra" },
            { label: "Integrated Algebra", href: "/formal-science/mathematics/algebra/elementary-algebra" },
            { label: "Algebraic Inequalities", href: "/formal-science/mathematics/algebra/elementary-algebra/inequalities" },
            { label: "Systems of Inequalities" },
          ]}
          eyebrow="Constraint · Half-plane · Intersection"
          icon={Layers}
          title={<span>Systems of Inequalities</span>}
          subtitle="Each inequality keeps a region. A system keeps only the points that survive every constraint at the same time."
          accentRgb="129, 140, 248"
          titleClassName="font-mono text-[clamp(2.5rem,4.6vw,4.9rem)] font-semibold uppercase leading-[0.86] tracking-[-0.055em] text-[#f8f8ff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-indigo-300/[0.14]"
          aside={
            <div className="rounded-full border border-indigo-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[12px] text-indigo-200/85 backdrop-blur-md">
              region A ∩ region B
            </div>
          }
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-indigo-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.16fr)_minmax(330px,0.84fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-300/70">Core idea</div>
            <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.035em] text-white">The solution is the overlap of all allowed regions.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">
              Graph each inequality as a half-plane. A point belongs to the system only if it satisfies constraint A <em>and</em> constraint B. The final feasible region is their intersection, not either shaded region by itself.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <ConceptFact icon={Grid3X3} label="1 · Graph A" text="Draw its boundary and shade its valid side." rgb="14, 165, 233" />
            <ConceptFact icon={Grid3X3} label="2 · Graph B" text="Add the second boundary and region." rgb="249, 115, 22" />
            <ConceptFact icon={Target} label="3 · Keep overlap" text="Only points satisfying both constraints remain." rgb="52, 211, 153" />
          </div>
        </section>

        <section className="mt-3 rounded-[26px] border border-indigo-200/[0.12] bg-black/[0.25] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-300/75">Overlap studio</div>
              <p className="mt-1 text-[13px] text-slate-500">Study a few canonical systems, then test whether individual points survive every constraint.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-600">A ∩ B = feasible region</div>
          </div>

          <div className="grid items-start gap-3 xl:grid-cols-[310px_minmax(520px,1fr)_350px]">
            <div className="rounded-[20px] border border-indigo-200/[0.08] bg-[#090b1a]/78 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Choose a system</div>
              <div className="mt-3 grid gap-2">
                {EXAMPLES.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => chooseExample(item.id)}
                    className={`rounded-[15px] border p-3 text-left transition-colors ${exampleId === item.id ? "border-indigo-300/[0.28] bg-indigo-400/[0.06]" : "border-white/[0.045] bg-black/[0.14] hover:border-white/[0.09]"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-slate-600">0{index + 1}</span>
                      <strong className="text-[12px] text-slate-200">{item.label}</strong>
                    </div>
                    <div className="mt-2 grid gap-1 font-mono text-[11px]">
                      <span className="text-sky-300">{formatConstraint(item.a)}</span>
                      <span className="text-orange-300">{formatConstraint(item.b)}</span>
                    </div>
                    <p className="mt-2 text-[10px] leading-4 text-slate-600">{item.note}</p>
                  </button>
                ))}
              </div>

              <div className={`mt-3 rounded-[15px] border p-3 ${example.hasOverlap ? "border-emerald-300/[0.12] bg-emerald-400/[0.025]" : "border-rose-300/[0.12] bg-rose-400/[0.025]"}`}>
                <div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">System result</div>
                <div className={`mt-1 text-[13px] font-semibold ${example.hasOverlap ? "text-emerald-300" : "text-rose-300"}`}>
                  {example.hasOverlap ? "A shared feasible region exists" : "The feasible region is empty"}
                </div>
              </div>
            </div>

            <OverlapGraph example={example} probeX={probeX} probeY={probeY} passesSystem={passesSystem} />

            <div className="rounded-[20px] border border-emerald-200/[0.08] bg-[#07130f]/74 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300/70">Test a point</div>
              <p className="mt-1 text-[11px] leading-5 text-slate-600">A point belongs to the system only when every row below is true.</p>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <PointSlider label="x" value={probeX} onChange={setProbeX} />
                <PointSlider label="y" value={probeY} onChange={setProbeY} />
              </div>

              <div className="mt-3 rounded-[15px] border border-white/[0.05] bg-black/[0.17] p-3 font-mono text-[18px] text-white">
                ({formatNumber(probeX)}, {formatNumber(probeY)})
              </div>

              <div className="mt-3 grid gap-2">
                <ConstraintTest
                  label="Constraint A"
                  expression={`${formatNumber(probeY)} ${example.a.relation} ${formatNumber(aBoundary)}`}
                  passes={passesA}
                  rgb={example.a.rgb}
                />
                <ConstraintTest
                  label="Constraint B"
                  expression={`${formatNumber(probeY)} ${example.b.relation} ${formatNumber(bBoundary)}`}
                  passes={passesB}
                  rgb={example.b.rgb}
                />
                <div className={`rounded-[15px] border p-3 ${passesSystem ? "border-emerald-300/[0.18] bg-emerald-400/[0.04]" : "border-rose-300/[0.16] bg-rose-400/[0.035]"}`}>
                  <div className="flex items-center gap-2">
                    {passesSystem ? <Check size={15} className="text-emerald-300" /> : <X size={15} className="text-rose-300" />}
                    <strong className={`text-[12px] ${passesSystem ? "text-emerald-200" : "text-rose-200"}`}>System verdict</strong>
                  </div>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    {passesSystem ? "Both inequalities are true, so the point lies in the overlap." : "At least one inequality is false, so the point is outside the feasible region."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3 rounded-[22px] border border-indigo-200/[0.09] bg-black/[0.20] p-4 backdrop-blur-xl">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-300/70">Graphing workflow</div>
          <div className="mt-3 grid gap-2 md:grid-cols-4">
            <ProcessStep number="01" title="Boundary A" text="Replace the first inequality with equality and draw its line." rgb="14, 165, 233" />
            <ProcessStep number="02" title="Shade A" text="Use the inequality direction or a test point to choose its side." rgb="14, 165, 233" />
            <ProcessStep number="03" title="Boundary + shade B" text="Repeat the same process for the second constraint." rgb="249, 115, 22" />
            <ProcessStep number="04" title="Keep the intersection" text="The overlap is the solution to the entire system." rgb="52, 211, 153" />
          </div>
        </section>

        <TopicNavigation />
      </div>
    </main>
  );
}

function SystemsInequalitiesBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_26%,rgba(14,165,233,0.10),transparent_30%),radial-gradient(circle_at_76%_30%,rgba(249,115,22,0.08),transparent_28%),radial-gradient(circle_at_50%_72%,rgba(52,211,153,0.07),transparent_25%),linear-gradient(to_bottom,rgba(8,11,24,0.30),rgba(3,5,14,0.94))]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(129,140,248,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(129,140,248,0.022)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute -left-[12%] top-[18%] h-[55%] w-[70%] rotate-[18deg] bg-sky-400/[0.025]" />
      <div className="absolute -right-[10%] top-[16%] h-[58%] w-[68%] -rotate-[20deg] bg-orange-400/[0.022]" />
      <div className="absolute left-[34%] top-[31%] h-[34%] w-[32%] rounded-full bg-emerald-300/[0.018] blur-3xl" />
    </div>
  );
}

function OverlapGraph({ example, probeX, probeY, passesSystem }: { example: SystemExample; probeX: number; probeY: number; passesSystem: boolean }) {
  const size = 460;
  const center = size / 2;
  const scale = size / (GRAPH_MAX - GRAPH_MIN);
  const xFor = (x: number) => center + x * scale;
  const yFor = (y: number) => center - y * scale;

  const polygonA = halfPlanePolygon(example.a, size, xFor, yFor);
  const polygonB = halfPlanePolygon(example.b, size, xFor, yFor);
  const aLeft = example.a.slope * GRAPH_MIN + example.a.intercept;
  const aRight = example.a.slope * GRAPH_MAX + example.a.intercept;
  const bLeft = example.b.slope * GRAPH_MIN + example.b.intercept;
  const bRight = example.b.slope * GRAPH_MAX + example.b.intercept;

  return (
    <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-[20px] border border-indigo-200/[0.10] bg-[#050817]/86 p-4">
      <div className="pointer-events-none absolute left-4 top-4 z-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Feasible-region graph</div>
        <div className="mt-1 text-[10px] text-emerald-300/70">brighter overlap = satisfies both</div>
      </div>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full max-h-[490px] w-full max-w-[490px]" aria-label="Graph of a system of linear inequalities">
        <defs>
          <clipPath id="constraint-a-region">
            <polygon points={polygonA} />
          </clipPath>
        </defs>

        <polygon points={polygonA} fill="rgba(14,165,233,0.10)" />
        <polygon points={polygonB} fill="rgba(249,115,22,0.09)" />
        <polygon points={polygonB} fill="rgba(52,211,153,0.23)" clipPath="url(#constraint-a-region)" />

        {Array.from({ length: 15 }, (_, index) => GRAPH_MIN + index).map((coord) => {
          const x = xFor(coord);
          const y = yFor(coord);
          return (
            <g key={coord}>
              <line x1={x} y1="0" x2={x} y2={size} stroke="#818cf8" strokeWidth="0.7" opacity={coord === 0 ? 0.28 : 0.10} />
              <line x1="0" y1={y} x2={size} y2={y} stroke="#818cf8" strokeWidth="0.7" opacity={coord === 0 ? 0.28 : 0.10} />
            </g>
          );
        })}

        <line x1={xFor(GRAPH_MIN)} y1={yFor(aLeft)} x2={xFor(GRAPH_MAX)} y2={yFor(aRight)} stroke="#0ea5e9" strokeWidth="3" strokeDasharray={isInclusive(example.a.relation) ? undefined : "8 7"} />
        <line x1={xFor(GRAPH_MIN)} y1={yFor(bLeft)} x2={xFor(GRAPH_MAX)} y2={yFor(bRight)} stroke="#f97316" strokeWidth="3" strokeDasharray={isInclusive(example.b.relation) ? undefined : "8 7"} />

        <circle cx={xFor(probeX)} cy={yFor(probeY)} r="7" fill={passesSystem ? "#34d399" : "#fb7185"} />
        <circle cx={xFor(probeX)} cy={yFor(probeY)} r="14" fill="none" stroke={passesSystem ? "rgba(52,211,153,0.46)" : "rgba(251,113,133,0.46)"} />
      </svg>

      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 rounded-xl border border-white/[0.05] bg-black/60 px-3 py-2 text-[10px] text-slate-500 backdrop-blur-md">
        <span className="text-sky-300">■ A</span>
        <span className="text-orange-300">■ B</span>
        <span className="text-emerald-300">■ overlap</span>
      </div>
    </div>
  );
}

function PointSlider({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="rounded-[14px] border border-white/[0.045] bg-white/[0.012] p-3">
      <span className="flex items-center justify-between text-[10px] font-semibold text-slate-500"><span>{label}</span><span className="font-mono text-emerald-300">{value}</span></span>
      <input type="range" min="-6" max="6" step="1" value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-emerald-400" />
    </label>
  );
}

function ConstraintTest({ label, expression, passes, rgb }: { label: string; expression: string; passes: boolean; rgb: string }) {
  return (
    <div className="rounded-[14px] border border-white/[0.045] bg-white/[0.012] p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold text-slate-500">{label}</span>
        <span className={`flex items-center gap-1 text-[10px] font-semibold ${passes ? "text-emerald-300" : "text-rose-300"}`}>{passes ? <Check size={12} /> : <X size={12} />}{passes ? "true" : "false"}</span>
      </div>
      <div className="mt-2 font-mono text-[13px]" style={{ color: `rgb(${rgb})` }}>{expression}</div>
    </div>
  );
}

function ConceptFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return (
    <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={15} /></span>
      <span><strong className="block text-[11px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span>
    </div>
  );
}

function ProcessStep({ number, title, text, rgb }: { number: string; title: string; text: string; rgb: string }) {
  return (
    <div className="rounded-[16px] border p-3" style={{ borderColor: `rgba(${rgb},0.13)`, background: `rgba(${rgb},0.022)` }}>
      <div className="font-mono text-[10px] font-semibold" style={{ color: `rgba(${rgb},0.70)` }}>{number}</div>
      <h3 className="mt-1 text-[13px] font-semibold text-white">{title}</h3>
      <p className="mt-1.5 text-[11px] leading-5 text-slate-500">{text}</p>
    </div>
  );
}

function TopicNavigation() {
  return (
    <nav className="mt-3 pb-8" aria-label="Systems of inequalities navigation">
      <div className="mb-2">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/inequalities" className="inline-flex items-center gap-2 rounded-full border border-sky-300/[0.09] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300">
          <Layers size={12} /> Parent: Algebraic Inequalities
        </Link>
      </div>
      <div className="flex justify-end">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations" className="group flex min-h-[74px] w-full max-w-[620px] items-center gap-3 rounded-[18px] border border-rose-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-rose-300/[0.18]">
          <span className="min-w-0 flex-1 text-right">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-600">Next Integrated Algebra topic</span>
            <strong className="mt-0.5 block text-[15px] text-slate-200">Quadratic Equations</strong>
          </span>
          <ArrowRight size={15} className="text-rose-300 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </nav>
  );
}

function halfPlanePolygon(constraint: Constraint, size: number, xFor: (x: number) => number, yFor: (y: number) => number) {
  const leftY = constraint.slope * GRAPH_MIN + constraint.intercept;
  const rightY = constraint.slope * GRAPH_MAX + constraint.intercept;
  const lineLeft = `${xFor(GRAPH_MIN)},${yFor(leftY)}`;
  const lineRight = `${xFor(GRAPH_MAX)},${yFor(rightY)}`;
  return isGreaterRelation(constraint.relation)
    ? `0,0 ${size},0 ${lineRight} ${lineLeft}`
    : `${lineLeft} ${lineRight} ${size},${size} 0,${size}`;
}

function formatConstraint(constraint: Constraint) {
  return `y ${constraint.relation} ${formatLine(constraint.slope, constraint.intercept)}`;
}

function formatLine(slope: number, intercept: number) {
  const mx = slope === 0 ? "" : slope === 1 ? "x" : slope === -1 ? "−x" : `${formatNumber(slope)}x`;
  if (slope === 0) return formatNumber(intercept);
  if (intercept === 0) return mx;
  return `${mx} ${intercept > 0 ? "+" : "−"} ${Math.abs(intercept)}`;
}

function compare(left: number, right: number, relation: Relation) {
  if (relation === "<") return left < right;
  if (relation === "≤") return left <= right;
  if (relation === ">") return left > right;
  return left >= right;
}

function isGreaterRelation(relation: Relation) {
  return relation === ">" || relation === "≥";
}

function isInclusive(relation: Relation) {
  return relation === "≤" || relation === "≥";
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value);
  return Number(value.toFixed(2)).toString();
}
