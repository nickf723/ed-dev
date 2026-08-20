import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  CircleDot,
  Compass,
  Cuboid,
  DraftingCompass,
  GitCompareArrows,
  MoveUpRight,
  PenTool,
  Ruler,
  ScanLine,
  Shapes,
  Triangle,
  type LucideIcon,
} from "lucide-react";
import AnglePlayground from "./AnglePlayground";
import BlueprintGrid from "./BlueprintGrid";

const NODE_ID = "formal.mathematics.geometry.euclidean";

type LessonMeta = {
  icon: LucideIcon;
  code: string;
  rgb: string;
  stage: "primitives" | "forms" | "reasoning";
};

const META: Record<string, LessonMeta> = {
  "formal.mathematics.geometry.euclidean.points-lines": {
    icon: ScanLine,
    code: "PTL",
    rgb: "125, 211, 252",
    stage: "primitives",
  },
  "formal.mathematics.geometry.euclidean.angles-intersections": {
    icon: MoveUpRight,
    code: "ANG",
    rgb: "34, 211, 238",
    stage: "primitives",
  },
  "formal.mathematics.geometry.euclidean.triangle-congruence": {
    icon: GitCompareArrows,
    code: "CON",
    rgb: "192, 132, 252",
    stage: "forms",
  },
  "formal.mathematics.geometry.euclidean.polygons-circles": {
    icon: Shapes,
    code: "POL",
    rgb: "52, 211, 153",
    stage: "forms",
  },
  "formal.mathematics.geometry.euclidean.solids": {
    icon: Cuboid,
    code: "3D",
    rgb: "250, 204, 21",
    stage: "forms",
  },
  "formal.mathematics.geometry.euclidean.logic-proofs": {
    icon: PenTool,
    code: "PRF",
    rgb: "251, 146, 60",
    stage: "reasoning",
  },
  "formal.mathematics.geometry.euclidean.classic-constructions": {
    icon: DraftingCompass,
    code: "CNS",
    rgb: "244, 114, 182",
    stage: "reasoning",
  },
};

const STAGES = [
  {
    id: "primitives" as const,
    number: "01",
    title: "Define the flat-space primitives",
    detail: "Begin with points, lines, planes, angles, intersections, and parallel structure before asking what larger figures must do.",
    rgb: "34, 211, 238",
  },
  {
    id: "forms" as const,
    number: "02",
    title: "Build and compare figures",
    detail: "Use the primitives to reason about congruence, polygons, circles, and three-dimensional solids through measurement and relationships.",
    rgb: "167, 139, 250",
  },
  {
    id: "reasoning" as const,
    number: "03",
    title: "Prove and construct",
    detail: "Turn diagrams into justified conclusions, then create exact figures from permitted compass-and-straightedge operations.",
    rgb: "251, 146, 60",
  },
] as const;

const EUCLIDEAN_RULES = [
  ["Metric", "Lengths and distances are meaningful and preserved by rigid motions."],
  ["Angle", "Angle measure behaves consistently under translations, rotations, and reflections."],
  ["Parallelism", "Through a point outside a line, exactly one parallel line exists."],
  ["Triangle sum", "Every nondegenerate Euclidean triangle has interior angles summing to 180°."],
] as const;

export default function EuclideanPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const children = context.children.map((child: CurriculumNode) => ({
    child,
    meta: META[child.id],
  }));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07162f] text-slate-100 selection:bg-sky-300/25">
      <BlueprintGrid />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_16%,rgba(56,189,248,0.11),transparent_28%),linear-gradient(to_bottom,rgba(7,22,47,0.08),rgba(5,15,34,0.72)_72%,rgba(4,12,28,0.96))]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.09] [background-image:linear-gradient(rgba(186,230,253,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(186,230,253,0.14)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#07162f]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Flat space · measure · congruence · proof · construction"
            eyebrowStyle="rule"
            icon={Ruler}
            title={<span>Euclidean Geometry</span>}
            subtitle="Euclidean geometry develops the structure of flat space from simple objects and assumptions. Points, lines, angles, distance, congruence, circles, solids, proof, and exact construction form one connected deductive system."
            accentRgb="56, 189, 248"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f2fbff]"
            headerClassName="border-sky-100/[0.10]"
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
          <div className="rounded-[28px] border border-sky-100/[0.10] bg-black/[0.14] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-sky-200/62"><Compass size={13} /> Axiomatic workshop</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.9rem,3.5vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Start with a few primitive relationships, then prove an entire geometry.</h2>
            <p className="mt-3 max-w-4xl text-[13px] leading-6 text-slate-300/70">A Euclidean diagram is evidence for intuition, not proof by itself. Definitions, postulates, and previously established results determine what conclusions actually follow.</p>
          </div>

          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-200/56"><CircleDot size={13} /> Boundary of the model</div>
            <p className="mt-3 text-[13px] leading-6 text-slate-400">The familiar 180° triangle sum and unique-parallel rule are properties of Euclidean flat space, not universal facts about every geometry.</p>
            <Link href="/formal-science/mathematics/geometry/non-euclidean" className="group mt-4 flex items-center justify-between gap-3 rounded-[15px] border border-indigo-200/[0.12] bg-indigo-200/[0.025] px-3 py-2.5 text-[10px] text-indigo-100/64 transition hover:bg-indigo-200/[0.05]">
              Compare curved geometries <ArrowRight size={12} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-sky-100/[0.10] bg-[#071b38]/58 shadow-[0_26px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end sm:px-6">
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-sky-200/62">Primary navigation · blueprint sequence</div>
              <h2 className="mt-2 text-[clamp(1.8rem,3.4vw,3rem)] font-semibold leading-[0.95] tracking-[-0.048em] text-white">Learn the objects, study their relationships, then justify what must be true.</h2>
            </div>
            <p className="text-[11px] leading-5 text-slate-500">All seven routes below are active lessons. Their grouping shows the role each one plays in the Euclidean system rather than treating them as interchangeable topic cards.</p>
          </div>

          <div>
            {STAGES.map((stage, stageIndex) => {
              const stageChildren = children.filter((item) => item.meta?.stage === stage.id);
              return (
                <section key={stage.id} className={`grid gap-4 px-5 py-6 sm:px-6 xl:grid-cols-[290px_minmax(0,1fr)] xl:gap-7 ${stageIndex ? "border-t border-white/[0.065]" : ""}`}>
                  <div>
                    <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border font-mono text-[9px]" style={{ color: `rgb(${stage.rgb})`, borderColor: `rgba(${stage.rgb},0.26)` }}>{stage.number}</span><span className="font-mono text-[8px] uppercase tracking-[0.13em]" style={{ color: `rgba(${stage.rgb},0.58)` }}>{stage.id}</span></div>
                    <h3 className="mt-3 text-[19px] font-semibold tracking-[-0.035em] text-white">{stage.title}</h3>
                    <p className="mt-2 text-[11px] leading-5 text-slate-500">{stage.detail}</p>
                  </div>

                  <nav aria-label={`${stage.title} lessons`} className={`grid gap-x-5 gap-y-1 ${stageChildren.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                    {stageChildren.map(({ child, meta }) => meta ? <LessonRoute key={child.id} node={child} meta={meta} /> : null)}
                  </nav>
                </section>
              );
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_360px] xl:items-start">
          <AnglePlayground />
          <aside className="overflow-hidden rounded-[26px] border border-white/[0.08] bg-black/[0.14] backdrop-blur-xl">
            <div className="p-5">
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-cyan-200/56"><Triangle size={13} /> Flat-space fingerprint</div>
              <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-white">What stays Euclidean?</h2>
              <p className="mt-2 text-[11px] leading-5 text-slate-500">These properties organize the lessons on this page and distinguish the flat model from nearby geometries.</p>
            </div>
            <div className="border-t border-white/[0.07]">
              {EUCLIDEAN_RULES.map(([term, detail], index) => (
                <div key={term} className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 border-b border-white/[0.06] px-4 py-3 last:border-b-0"><span className="font-mono text-[8px] text-sky-200/36">0{index + 1}</span><span><strong className="block text-[11px] text-slate-200/82">{term}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{detail}</span></span></div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function LessonRoute({ node, meta }: { node: CurriculumNode; meta: LessonMeta }) {
  const Icon = meta.icon;
  return (
    <Link href={node.href} className="group flex min-h-[92px] items-center gap-3 border-b border-white/[0.07] px-1 py-3 transition hover:bg-white/[0.025]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.21)`, background: `rgba(${meta.rgb},0.035)` }}><Icon size={16} /></span>
      <span className="min-w-0 flex-1"><span className="font-mono text-[7px] font-semibold uppercase tracking-[0.1em]" style={{ color: `rgba(${meta.rgb},0.56)` }}>{meta.code}</span><strong className="mt-0.5 block text-[12px] text-white/86">{node.label}</strong><span className="mt-1 line-clamp-2 block text-[9px] leading-4 text-slate-600">{node.description}</span></span>
      <ArrowRight size={12} className="shrink-0 text-slate-600 transition group-hover:translate-x-1" />
    </Link>
  );
}
