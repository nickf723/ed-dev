"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  Axis3d,
  Combine,
  Globe2,
  Grid3X3,
  Ruler,
  Shapes,
  Triangle,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import GeometryBackground from "./GeometryBackground";

export type GeometryHubNode = {
  id: string;
  label: string;
  href: string;
  description?: string;
  status?: "active" | "placeholder";
};

type InvariantKey = "distance" | "angle" | "incidence" | "continuity" | "scale";

type GeometryMeta = {
  icon: LucideIcon;
  code: string;
  mode: string;
  move: string;
  keeps: readonly string[];
  changes: readonly string[];
  weights: Record<InvariantKey, number>;
  rgb: string;
};

type BuiltNode = GeometryHubNode & GeometryMeta;

const ORDER = [
  "formal.mathematics.geometry.euclidean",
  "formal.mathematics.geometry.trigonometry",
  "formal.mathematics.geometry.analytic",
  "formal.mathematics.geometry.non-euclidean",
  "formal.mathematics.geometry.topology",
  "formal.mathematics.geometry.fractal",
] as const;

const META: Record<string, GeometryMeta> = {
  "formal.mathematics.geometry.euclidean": {
    icon: Ruler,
    code: "EUC",
    mode: "Flat metric",
    move: "Fix a flat space and derive what follows from points, lines, distance, angle, parallelism, congruence, and proof.",
    keeps: ["distance", "angle", "parallel structure", "congruence"],
    changes: ["curvature held at zero"],
    weights: { distance: 1, angle: 1, incidence: 1, continuity: 0.7, scale: 0.35 },
    rgb: "56, 189, 248",
  },
  "formal.mathematics.geometry.trigonometry": {
    icon: Triangle,
    code: "TRG",
    mode: "Angle ↔ ratio",
    move: "Turn angular relationships into ratios and periodic functions so triangles, circles, rotation, and waves can speak the same language.",
    keeps: ["angle", "ratio", "periodicity", "orientation"],
    changes: ["length becomes relative", "geometry becomes function"],
    weights: { distance: 0.55, angle: 1, incidence: 0.55, continuity: 0.8, scale: 0.75 },
    rgb: "45, 212, 191",
  },
  "formal.mathematics.geometry.analytic": {
    icon: Axis3d,
    code: "ANA",
    mode: "Coordinates & equations",
    move: "Choose coordinates, encode geometric objects algebraically, and use equations or vectors to calculate relationships in space.",
    keeps: ["position", "distance", "shape equations", "transformations"],
    changes: ["picture becomes coordinates", "construction becomes algebra"],
    weights: { distance: 0.9, angle: 0.7, incidence: 0.9, continuity: 0.75, scale: 0.55 },
    rgb: "96, 165, 250",
  },
  "formal.mathematics.geometry.non-euclidean": {
    icon: Globe2,
    code: "CUR",
    mode: "Curved metric",
    move: "Change the parallel postulate or the curvature of space and watch familiar Euclidean conclusions become local rather than universal.",
    keeps: ["metric", "local angle", "geodesics", "deduction"],
    changes: ["parallelism", "triangle angle sums", "global shape"],
    weights: { distance: 0.95, angle: 0.9, incidence: 0.8, continuity: 0.75, scale: 0.45 },
    rgb: "129, 140, 248",
  },
  "formal.mathematics.geometry.topology": {
    icon: Combine,
    code: "TOP",
    mode: "Continuity",
    move: "Forget rigid measurement and ask which properties survive stretching, bending, and other continuous deformations without tearing or gluing.",
    keeps: ["continuity", "connectedness", "holes", "boundary structure"],
    changes: ["distance discarded", "angle discarded", "shape made flexible"],
    weights: { distance: 0.08, angle: 0.08, incidence: 0.45, continuity: 1, scale: 0.25 },
    rgb: "192, 132, 252",
  },
  "formal.mathematics.geometry.fractal": {
    icon: Activity,
    code: "FRC",
    mode: "Structure across scale",
    move: "Iterate geometric rules and study patterns whose detail persists across magnification, often producing non-integer notions of dimension.",
    keeps: ["self-similarity", "recursive rule", "scaling relation"],
    changes: ["dimension can be fractional", "detail has no single scale"],
    weights: { distance: 0.35, angle: 0.25, incidence: 0.45, continuity: 0.5, scale: 1 },
    rgb: "244, 114, 182",
  },
};

const INVARIANTS: readonly { id: InvariantKey; label: string; detail: string }[] = [
  { id: "distance", label: "Distance", detail: "metric length" },
  { id: "angle", label: "Angle", detail: "direction & rotation" },
  { id: "incidence", label: "Incidence", detail: "what meets what" },
  { id: "continuity", label: "Continuity", detail: "neighborhood structure" },
  { id: "scale", label: "Scale", detail: "behavior under magnification" },
];

const PRINCIPLES = [
  ["Assumptions", "Choose what kind of space and transformations are allowed."],
  ["Invariants", "Ask which properties remain unchanged under those transformations."],
  ["Representation", "Switch among diagrams, coordinates, equations, constructions, and proofs without confusing the representation for the object."],
] as const;

function buildNodes(nodes: readonly GeometryHubNode[]): BuiltNode[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return ORDER.map((id) => {
    const node = byId.get(id);
    const meta = META[id];
    if (!node || !meta) throw new Error(`Geometry branch ${id} is incomplete.`);
    return { ...node, ...meta };
  });
}

export default function GeometryHub({ nodes }: { nodes: readonly GeometryHubNode[] }) {
  const branches = buildNodes(nodes);
  const [activeId, setActiveId] = useState("formal.mathematics.geometry.euclidean");
  const active = branches.find((branch) => branch.id === activeId) ?? branches[0];
  const ActiveIcon = active.icon;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#02040a] text-slate-100 selection:bg-sky-400/25">
      <GeometryBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_74%_18%,rgba(56,189,248,0.10),transparent_29%),radial-gradient(circle_at_16%_82%,rgba(129,140,248,0.07),transparent_28%),linear-gradient(to_bottom,rgba(2,4,10,0.15),rgba(2,4,10,0.72)_74%,rgba(2,4,10,0.94))]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.12] [background-image:linear-gradient(rgba(125,211,252,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.10)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#02040a]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Formal Sciences", href: "/formal-science" },
              { label: "Mathematics", href: "/formal-science/mathematics" },
              { label: "Geometry" },
            ]}
            eyebrow="Space · transformation · invariant"
            eyebrowStyle="rule"
            icon={Shapes}
            title={<span>Geometry</span>}
            subtitle="Geometry studies space by deciding what transformations are allowed and then asking what survives. Distance, angle, curvature, continuity, coordinates, and scale become different lenses on the same question: what makes a shape or space remain the same kind of thing?"
            accentRgb="56, 189, 248"
            titleClassName="font-sans text-[clamp(3rem,5.8vw,6.3rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#f2fbff]"
            headerClassName="border-sky-100/[0.10]"
          />
        </div>

        <section className="relative mt-5 overflow-hidden rounded-[34px] border border-sky-200/[0.11] bg-[#020711]/62 shadow-[0_32px_110px_rgba(0,0,0,0.32)] backdrop-blur-xl">
          <div className="grid gap-5 border-b border-white/[0.07] px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end lg:px-8 lg:py-7">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-sky-200/65">
                <Grid3X3 size={13} /> Primary navigation · invariant ladder
              </div>
              <h2 className="mt-2 max-w-5xl text-[clamp(2rem,4vw,4rem)] font-semibold leading-[0.92] tracking-[-0.052em] text-white">
                Change the rules of space, then track what remains meaningful.
              </h2>
            </div>
            <p className="text-[13px] leading-6 text-slate-400">
              The branches below are not six unrelated shape collections. Each changes the assumptions, representation, or notion of sameness used to study space.
            </p>
          </div>

          <div className="grid xl:grid-cols-[410px_minmax(0,1fr)]">
            <nav aria-label="Geometry branches" className="border-b border-white/[0.07] px-4 py-4 sm:px-6 xl:border-b-0 xl:border-r xl:px-6 xl:py-5">
              <div className="space-y-1">
                {branches.map((branch, index) => (
                  <BranchRoute
                    key={branch.id}
                    branch={branch}
                    index={index}
                    selected={active.id === branch.id}
                    onActivate={() => setActiveId(branch.id)}
                  />
                ))}
              </div>
            </nav>

            <div className="relative min-h-[560px] p-5 sm:p-7 lg:p-8">
              <div className="pointer-events-none absolute right-[-90px] top-[-100px] h-[360px] w-[360px] rounded-full border opacity-40" style={{ borderColor: `rgba(${active.rgb},0.17)` }} aria-hidden="true" />
              <div className="pointer-events-none absolute right-[-10px] top-[-20px] h-[200px] w-[200px] rounded-full border opacity-50" style={{ borderColor: `rgba(${active.rgb},0.13)` }} aria-hidden="true" />

              <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-[16px] border" style={{ color: `rgb(${active.rgb})`, borderColor: `rgba(${active.rgb},0.28)`, background: `rgba(${active.rgb},0.055)` }}>
                      <ActiveIcon size={20} />
                    </span>
                    <div>
                      <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em]" style={{ color: `rgba(${active.rgb},0.66)` }}>{active.code} · {active.mode}</div>
                      <h3 className="mt-0.5 text-[clamp(1.9rem,3vw,3.1rem)] font-semibold tracking-[-0.05em] text-white">{active.label}</h3>
                    </div>
                  </div>

                  <p className="mt-5 max-w-3xl text-[14px] leading-7 text-slate-300/74">{active.description}</p>

                  <div className="mt-6 border-l pl-4" style={{ borderColor: `rgba(${active.rgb},0.30)` }}>
                    <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-600">The geometric move</div>
                    <p className="mt-2 max-w-2xl text-[13px] leading-6 text-slate-400">{active.move}</p>
                  </div>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <div>
                      <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-600">Keeps visible</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {active.keeps.map((item) => <Tag key={item} text={item} rgb={active.rgb} />)}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-600">Relaxes or translates</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {active.changes.map((item) => <Tag key={item} text={item} rgb="148, 163, 184" />)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    {active.status === "placeholder" ? (
                      <div className="inline-flex items-center rounded-full border border-slate-300/[0.09] bg-black/20 px-4 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">planned branch · route intentionally disabled</div>
                    ) : (
                      <Link href={active.href} className="group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[12px] font-semibold transition hover:bg-white/[0.04]" style={{ color: `rgb(${active.rgb})`, borderColor: `rgba(${active.rgb},0.26)`, background: `rgba(${active.rgb},0.035)` }}>
                        Open {active.label} <ArrowRight size={13} className="transition group-hover:translate-x-1" />
                      </Link>
                    )}
                  </div>
                </div>

                <InvariantPanel branch={active} />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 grid border-y border-white/[0.08] md:grid-cols-3">
          {PRINCIPLES.map(([title, text], index) => (
            <div key={title} className="grid grid-cols-[38px_minmax(0,1fr)] gap-3 border-b border-white/[0.06] px-4 py-4 md:border-b-0 md:border-r md:last:border-r-0 sm:px-5">
              <span className="font-mono text-[9px] text-sky-200/38">0{index + 1}</span>
              <span><strong className="block text-[12px] text-slate-200/84">{title}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{text}</span></span>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

function BranchRoute({ branch, index, selected, onActivate }: { branch: BuiltNode; index: number; selected: boolean; onActivate: () => void }) {
  const Icon = branch.icon;
  const planned = branch.status === "placeholder";
  const className = `group grid min-h-[76px] grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3 border-b px-2 py-3 transition ${planned ? "opacity-48" : "hover:bg-white/[0.025]"}`;
  const content = (
    <>
      <span className="flex h-9 w-9 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${branch.rgb})`, borderColor: `rgba(${branch.rgb},${selected ? 0.34 : 0.18})`, background: selected ? `rgba(${branch.rgb},0.08)` : `rgba(${branch.rgb},0.025)` }}><Icon size={15} /></span>
      <span className="min-w-0"><span className="flex items-center gap-2"><strong className="text-[13px] text-white/88">{branch.label}</strong><span className="font-mono text-[7px] text-slate-700">0{index + 1}</span></span><span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.11em]" style={{ color: `rgba(${branch.rgb},0.60)` }}>{branch.mode}</span></span>
      <span className="font-mono text-[7px] uppercase tracking-[0.09em] text-slate-600">{planned ? "planned" : selected ? "selected" : "open"}</span>
    </>
  );

  return planned ? (
    <div className={className} onMouseEnter={onActivate} onFocus={onActivate} tabIndex={0} aria-label={`${branch.label}, planned`}>{content}</div>
  ) : (
    <Link href={branch.href} className={className} onMouseEnter={onActivate} onFocus={onActivate}>{content}</Link>
  );
}

function InvariantPanel({ branch }: { branch: BuiltNode }) {
  return (
    <aside className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/[0.18] p-4 backdrop-blur-md sm:p-5">
      <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">Invariant profile</div>
      <p className="mt-2 text-[11px] leading-5 text-slate-600">Emphasis, not a theorem. The bars show which notions are especially central to this branch.</p>
      <div className="mt-5 space-y-4">
        {INVARIANTS.map((item) => {
          const weight = branch.weights[item.id];
          return (
            <div key={item.id}>
              <div className="flex items-end justify-between gap-3"><span><strong className="block text-[11px] text-slate-300/80">{item.label}</strong><span className="text-[9px] text-slate-700">{item.detail}</span></span><span className="font-mono text-[8px]" style={{ color: `rgba(${branch.rgb},0.60)` }}>{Math.round(weight * 100)}%</span></div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.04]"><div className="h-full rounded-full transition-[width] duration-300" style={{ width: `${weight * 100}%`, background: `rgba(${branch.rgb},0.66)` }} /></div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 border-t border-white/[0.06] pt-4 font-mono text-[8px] uppercase leading-4 tracking-[0.1em] text-slate-700">same object · different allowed transformations · different invariants</div>
    </aside>
  );
}

function Tag({ text, rgb }: { text: string; rgb: string }) {
  return <span className="rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.08em]" style={{ color: `rgba(${rgb},0.72)`, borderColor: `rgba(${rgb},0.15)`, background: `rgba(${rgb},0.025)` }}>{text}</span>;
}
