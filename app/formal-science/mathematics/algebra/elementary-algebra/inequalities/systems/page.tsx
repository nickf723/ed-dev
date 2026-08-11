"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Grid3X3,
  Layers,
  SlidersHorizontal,
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
const RELATIONS: readonly Relation[] = ["<", "≤", ">", "≥"];

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
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(-1);
  const [relation, setRelation] = useState<Relation>(">");
  const [singleProbeX, setSingleProbeX] = useState(0);
  const [singleProbeY, setSingleProbeY] = useState(0);

  const singleBoundaryAtProbe = slope * singleProbeX + intercept;
  const singlePasses = compare(singleProbeY, singleBoundaryAtProbe, relation);

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
          eyebrow="Boundary line · Half-plane · Intersection"
          icon={Layers}
          title={<span>Systems of Inequalities</span>}
          subtitle="Move from a one-dimensional solution interval to two-dimensional solution regions, then keep only the points that satisfy every constraint at once."
          accentRgb="129, 140, 248"
          titleClassName="font-mono text-[clamp(2.5rem,4.6vw,4.9rem)] font-semibold uppercase leading-[0.86] tracking-[-0.055em] text-[#f8f8ff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-indigo-300/[0.14]"
          aside={
            <div className="rounded-full border border-indigo-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[12px] text-indigo-200/85 backdrop-blur-md">
              one region → overlap
            </div>
          }
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-indigo-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.16fr)_minmax(330px,0.84fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-300/70">Dimensional jump</div>
            <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.035em] text-white">A linear inequality keeps a half-plane instead of a single line.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">
              The equality version gives the boundary line. The inequality chooses one side of that line. Strict inequalities exclude the boundary and use a dashed line; inclusive inequalities keep it and use a solid line.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <ConceptFact icon={Grid3X3} label="Boundary" text="Replace the inequality symbol with = to locate the dividing line." rgb="14, 165, 233" />
            <ConceptFact icon={Target} label="Side" text="Greater-than shades above; less-than shades below in y-form." rgb="129, 140, 248" />
            <ConceptFact icon={Layers} label="Inclusion" text="Strict means dashed; inclusive means solid." rgb="251, 191, 36" />
          </div>
        </section>

        <section className="mt-3 rounded-[26px] border border-sky-200/[0.11] bg-black/[0.24] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_24px_70px_rgba(0,0,0,0.20)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300/75">Build one region</div>
              <p className="mt-1 text-[13px] text-slate-500">Change each part of one linear inequality and watch the boundary, shading, and test point respond together.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-600">inequality ↔ boundary ↔ half-plane</div>
          </div>

          <div className="grid items-stretch gap-3 xl:min-h-[500px] xl:grid-cols-[300px_minmax(520px,1fr)_330px]">
            <div className="grid content-start gap-3 rounded-[20px] border border-sky-200/[0.08] bg-[#061221]/76 p-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-500">Current inequality</div>
                <div className="mt-2 font-mono text-[25px] font-semibold text-white">y <span className="text-indigo-300">{relation}</span> {formatLine(slope, intercept)}</div>
              </div>
              <SliderControl label="Boundary slope" value={slope} min={-3} max={3} step={0.5} rgb="14, 165, 233" onChange={setSlope} />
              <SliderControl label="Y-intercept" value={intercept} min={-5} max={5} step={1} rgb="244, 114, 182" onChange={setIntercept} />
              <RelationPicker value={relation} onChange={setRelation} />
              <div className="grid grid-cols-2 gap-2">
                <SliderControl label="Test x" value={singleProbeX} min={-6} max={6} step={1} rgb="251, 191, 36" onChange={setSingleProbeX} compact />
                <SliderControl label="Test y" value={singleProbeY} min={-6} max={6} step={1} rgb="52, 211, 153" onChange={setSingleProbeY} compact />
              </div>
            </div>

            <HalfPlaneGraph slope={slope} intercept={intercept} relation={relation} probeX={singleProbeX} probeY={singleProbeY} probePasses={singlePasses} />

            <div className="rounded-[20px] border border-indigo-200/[0.09] bg-[#080b1b]/76 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-indigo-300/70">Read the region</div>
              <div className="mt-3 grid gap-2">
                <Readout label="Boundary" value={`y = ${formatLine(slope, intercept)}`} rgb="14, 165, 233" />
                <Readout label="Shade" value={isGreaterRelation(relation) ? "above the line" : "below the line"} rgb="129, 140, 248" />
                <Readout label="Boundary style" value={isInclusive(relation) ? "solid · included" : "dashed · excluded"} rgb="251, 191, 36" />
                <Readout label={`Test (${singleProbeX}, ${singleProbeY})`} value={singlePasses ? "inside the solution region" : "outside the solution region"} rgb={singlePasses ? "52, 211, 153" : "251, 113, 133"} />
              </div>

              <div className={`mt-3 rounded-[15px] border p-3 ${singlePasses ? "border-emerald-300/[0.14] bg-emerald-400/[0.03]" : "border-rose-300/[0.12] bg-rose-400/[0.025]"}`}>
                <div className="flex items-center gap-2">
                  {singlePasses ? <Check size={14} className="text-emerald-300" /> : <X size={14} className="text-rose-300" />}
                  <strong className={`text-[11px] ${singlePasses ? "text-emerald-200" : "text-rose-200"}`}>Substitution test</strong>
                </div>
                <div className="mt-2 font-mono text-[12px] text-slate-300">{singleProbeY} {relation} {formatNumber(singleBoundaryAtProbe)}</div>
                <p className="mt-1 text-[10px] leading-4 text-slate-600">The point belongs exactly when this substituted statement is true.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3 grid gap-3 rounded-[22px] border border-white/[0.055] bg-black/[0.18] p-4 backdrop-blur-xl md:grid-cols-[auto_minmax(0,1fr)] md:items-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/[0.12] bg-emerald-400/[0.025] text-emerald-300"><ArrowRight size={17} /></div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300/70">Now add another constraint</div>
            <p className="mt-1 text-[12px] leading-5 text-slate-500">One inequality gives one allowed region. A system asks where two allowed regions overlap, so a point must pass both tests at the same time.</p>
          </div>
        </section>

        <section className="mt-3 rounded-[26px] border border-indigo-200/[0.12] bg-black/[0.25] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-300/75">Overlap studio</div>
              <p className="mt-1 text-[13px] text-slate-500">Compare three canonical systems, then move the test point to see whether it survives both constraints.</p>
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
                <div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Preset result</div>
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

              <div className="mt-3 rounded-[15px] border border-white/[0.05] bg-black/[0.17] p-3 font-mono text-[18px] text-white">({formatNumber(probeX)}, {formatNumber(probeY)})</div>

              <div className="mt-3 grid gap-2">
                <ConstraintTest label="Constraint A" expression={`${formatNumber(probeY)} ${example.a.relation} ${formatNumber(aBoundary)}`} passes={passesA} rgb={example.a.rgb} />
                <ConstraintTest label="Constraint B" expression={`${formatNumber(probeY)} ${example.b.relation} ${formatNumber(bBoundary)}`} passes={passesB} rgb={example.b.rgb} />
                <div className={`rounded-[15px] border p-3 ${passesSystem ? "border-emerald-300/[0.18] bg-emerald-400/[0.04]" : "border-rose-300/[0.16] bg-rose-400/[0.035]"}`}>
                  <div className="flex items-center gap-2">
                    {passesSystem ? <Check size={15} className="text-emerald-300" /> : <X size={15} className="text-rose-300" />}
                    <strong className={`text-[12px] ${passesSystem ? "text-emerald-200" : "text-rose-200"}`}>System verdict</strong>
                  </div>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500">{passesSystem ? "Both inequalities are true, so the point lies in the overlap." : "At least one inequality is false, so the point is outside the feasible region."}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3 rounded-[22px] border border-indigo-200/[0.09] bg-black/[0.20] p-4 backdrop-blur-xl">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-300/70">System workflow</div>
          <div className="mt-3 grid gap-2 md:grid-cols-4">
            <ProcessStep number="01" title="Graph A" text="Draw its boundary and shade the side that satisfies A." rgb="14, 165, 233" />
            <ProcessStep number="02" title="Graph B" text="Repeat the same boundary-and-shading process for B." rgb="249, 115, 22" />
            <ProcessStep number="03" title="Keep overlap" text="Only the region shared by both shaded sets satisfies the system." rgb="52, 211, 153" />
            <ProcessStep number="04" title="Test a point" text="Substitute one point into both inequalities to verify membership." rgb="129, 140, 248" />
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

function HalfPlaneGraph({ slope, intercept, relation, probeX, probeY, probePasses }: { slope: number; intercept: number; relation: Relation; probeX: number; probeY: number; probePasses: boolean }) {
  const size = 440;
  const center = size / 2;
  const scale = size / (GRAPH_MAX - GRAPH_MIN);
  const xFor = (x: number) => center + x * scale;
  const yFor = (y: number) => center - y * scale;
  const constraint: Constraint = { label: "", slope, intercept, relation, rgb: "14, 165, 233" };
  const polygon = halfPlanePolygon(constraint, size, xFor, yFor);
  const leftY = slope * GRAPH_MIN + intercept;
  const rightY = slope * GRAPH_MAX + intercept;

  return (
    <div className="relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-[20px] border border-sky-200/[0.10] bg-[#050d1a]/86 p-4">
      <div className="pointer-events-none absolute left-4 top-4 z-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Half-plane</div>
        <div className="mt-1 font-mono text-[12px] text-sky-300/80">y {relation} {formatLine(slope, intercept)}</div>
      </div>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full max-h-[470px] w-full max-w-[470px]" aria-label="Coordinate plane with one shaded linear inequality">
        <polygon points={polygon} fill="rgba(14,165,233,0.12)" />
        {Array.from({ length: 15 }, (_, index) => GRAPH_MIN + index).map((coord) => {
          const x = xFor(coord);
          const y = yFor(coord);
          return <g key={coord}><line x1={x} y1="0" x2={x} y2={size} stroke="#38bdf8" strokeWidth="0.7" opacity={coord === 0 ? 0.30 : 0.11} /><line x1="0" y1={y} x2={size} y2={y} stroke="#38bdf8" strokeWidth="0.7" opacity={coord === 0 ? 0.30 : 0.11} /></g>;
        })}
        <line x1={xFor(GRAPH_MIN)} y1={yFor(leftY)} x2={xFor(GRAPH_MAX)} y2={yFor(rightY)} stroke="#38bdf8" strokeWidth="3" strokeDasharray={isInclusive(relation) ? undefined : "8 7"} />
        <circle cx={xFor(probeX)} cy={yFor(probeY)} r="7" fill={probePasses ? "#34d399" : "#fb7185"} />
        <circle cx={xFor(probeX)} cy={yFor(probeY)} r="14" fill="none" stroke={probePasses ? "rgba(52,211,153,0.46)" : "rgba(251,113,133,0.46)"} />
      </svg>
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
        <defs><clipPath id="constraint-a-region"><polygon points={polygonA} /></clipPath></defs>
        <polygon points={polygonA} fill="rgba(14,165,233,0.10)" />
        <polygon points={polygonB} fill="rgba(249,115,22,0.09)" />
        <polygon points={polygonB} fill="rgba(52,211,153,0.23)" clipPath="url(#constraint-a-region)" />
        {Array.from({ length: 15 }, (_, index) => GRAPH_MIN + index).map((coord) => {
          const x = xFor(coord);
          const y = yFor(coord);
          return <g key={coord}><line x1={x} y1="0" x2={x} y2={size} stroke="#818cf8" strokeWidth="0.7" opacity={coord === 0 ? 0.28 : 0.10} /><line x1="0" y1={y} x2={size} y2={y} stroke="#818cf8" strokeWidth="0.7" opacity={coord === 0 ? 0.28 : 0.10} /></g>;
        })}
        <line x1={xFor(GRAPH_MIN)} y1={yFor(aLeft)} x2={xFor(GRAPH_MAX)} y2={yFor(aRight)} stroke="#0ea5e9" strokeWidth="3" strokeDasharray={isInclusive(example.a.relation) ? undefined : "8 7"} />
        <line x1={xFor(GRAPH_MIN)} y1={yFor(bLeft)} x2={xFor(GRAPH_MAX)} y2={yFor(bRight)} stroke="#f97316" strokeWidth="3" strokeDasharray={isInclusive(example.b.relation) ? undefined : "8 7"} />
        <circle cx={xFor(probeX)} cy={yFor(probeY)} r="7" fill={passesSystem ? "#34d399" : "#fb7185"} />
        <circle cx={xFor(probeX)} cy={yFor(probeY)} r="14" fill="none" stroke={passesSystem ? "rgba(52,211,153,0.46)" : "rgba(251,113,133,0.46)"} />
      </svg>
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 rounded-xl border border-white/[0.05] bg-black/60 px-3 py-2 text-[10px] text-slate-500 backdrop-blur-md">
        <span className="text-sky-300">■ A</span><span className="text-orange-300">■ B</span><span className="text-emerald-300">■ overlap</span>
      </div>
    </div>
  );
}

function SliderControl({ label, value, min, max, step, rgb, onChange, compact = false }: { label: string; value: number; min: number; max: number; step: number; rgb: string; onChange: (value: number) => void; compact?: boolean }) {
  return <label className={`block rounded-[15px] border border-white/[0.045] bg-white/[0.012] ${compact ? "p-2.5" : "p-3"}`}><span className="flex items-center justify-between gap-2"><span className="text-[10px] font-semibold text-slate-400">{label}</span><span className="rounded-md px-2 py-1 font-mono text-[10px]" style={{ color: `rgb(${rgb})`, background: `rgba(${rgb},0.06)` }}>{formatNumber(value)}</span></span><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-indigo-400" /></label>;
}

function RelationPicker({ value, onChange }: { value: Relation; onChange: (value: Relation) => void }) {
  return <div className="rounded-[15px] border border-white/[0.045] bg-white/[0.012] p-3"><div className="text-[10px] font-semibold text-slate-400">Relation</div><div className="mt-2 grid grid-cols-4 gap-1.5">{RELATIONS.map((item) => <button key={item} type="button" onClick={() => onChange(item)} className={`h-9 rounded-lg border font-mono text-[14px] ${value === item ? "border-indigo-300/[0.28] bg-indigo-400/[0.07] text-indigo-200" : "border-white/[0.045] bg-black/[0.14] text-slate-500"}`}>{item}</button>)}</div></div>;
}

function PointSlider({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label className="rounded-[14px] border border-white/[0.045] bg-white/[0.012] p-3"><span className="flex items-center justify-between text-[10px] font-semibold text-slate-500"><span>{label}</span><span className="font-mono text-emerald-300">{value}</span></span><input type="range" min="-6" max="6" step="1" value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-emerald-400" /></label>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[14px] border border-white/[0.045] bg-white/[0.012] px-3 py-2.5"><div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 text-[11px] font-medium" style={{ color: `rgba(${rgb},0.82)` }}>{value}</div></div>;
}

function ConstraintTest({ label, expression, passes, rgb }: { label: string; expression: string; passes: boolean; rgb: string }) {
  return <div className="rounded-[14px] border border-white/[0.045] bg-white/[0.012] p-3"><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-semibold text-slate-500">{label}</span><span className={`flex items-center gap-1 text-[10px] font-semibold ${passes ? "text-emerald-300" : "text-rose-300"}`}>{passes ? <Check size={12} /> : <X size={12} />}{passes ? "true" : "false"}</span></div><div className="mt-2 font-mono text-[13px]" style={{ color: `rgb(${rgb})` }}>{expression}</div></div>;
}

function ConceptFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={15} /></span><span><strong className="block text-[11px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span></div>;
}

function ProcessStep({ number, title, text, rgb }: { number: string; title: string; text: string; rgb: string }) {
  return <div className="rounded-[16px] border p-3" style={{ borderColor: `rgba(${rgb},0.13)`, background: `rgba(${rgb},0.022)` }}><div className="font-mono text-[10px] font-semibold" style={{ color: `rgba(${rgb},0.70)` }}>{number}</div><h3 className="mt-1 text-[13px] font-semibold text-white">{title}</h3><p className="mt-1.5 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function TopicNavigation() {
  return (
    <nav className="mt-3 pb-8" aria-label="Systems of inequalities navigation">
      <div className="mb-2">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/inequalities" className="inline-flex items-center gap-2 rounded-full border border-sky-300/[0.09] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300"><Layers size={12} /> Parent: Algebraic Inequalities</Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/inequalities" className="group flex min-h-[74px] items-center gap-3 rounded-[18px] border border-sky-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-sky-300/[0.18]"><Grid3X3 size={15} className="text-sky-300" /><span><span className="block text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-600">Previous lesson</span><strong className="mt-0.5 block text-[15px] text-slate-200">Algebraic Inequalities</strong></span></Link>
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations" className="group flex min-h-[74px] items-center gap-3 rounded-[18px] border border-rose-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-rose-300/[0.18]"><span className="min-w-0 flex-1 text-right"><span className="block text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-600">Next Integrated Algebra topic</span><strong className="mt-0.5 block text-[15px] text-slate-200">Quadratic Equations</strong></span><ArrowRight size={15} className="text-rose-300 transition-transform group-hover:translate-x-0.5" /></Link>
      </div>
    </nav>
  );
}

function halfPlanePolygon(constraint: Constraint, size: number, xFor: (x: number) => number, yFor: (y: number) => number) {
  const leftY = constraint.slope * GRAPH_MIN + constraint.intercept;
  const rightY = constraint.slope * GRAPH_MAX + constraint.intercept;
  const lineLeft = `${xFor(GRAPH_MIN)},${yFor(leftY)}`;
  const lineRight = `${xFor(GRAPH_MAX)},${yFor(rightY)}`;
  return isGreaterRelation(constraint.relation) ? `0,0 ${size},0 ${lineRight} ${lineLeft}` : `${lineLeft} ${lineRight} ${size},${size} 0,${size}`;
}

function formatConstraint(constraint: Constraint) { return `y ${constraint.relation} ${formatLine(constraint.slope, constraint.intercept)}`; }
function formatLine(slope: number, intercept: number) { const mx = slope === 0 ? "" : slope === 1 ? "x" : slope === -1 ? "−x" : `${formatNumber(slope)}x`; if (slope === 0) return formatNumber(intercept); if (intercept === 0) return mx; return `${mx} ${intercept > 0 ? "+" : "−"} ${Math.abs(intercept)}`; }
function compare(left: number, right: number, relation: Relation) { if (relation === "<") return left < right; if (relation === "≤") return left <= right; if (relation === ">") return left > right; return left >= right; }
function isGreaterRelation(relation: Relation) { return relation === ">" || relation === "≥"; }
function isInclusive(relation: Relation) { return relation === "≤" || relation === "≥"; }
function formatNumber(value: number) { if (Number.isInteger(value)) return String(value); return Number(value.toFixed(2)).toString(); }
