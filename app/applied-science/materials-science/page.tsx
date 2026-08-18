import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowDown,
  ArrowRight,
  Atom,
  Boxes,
  Cable,
  CircleDot,
  FlaskConical,
  Gauge,
  Gem,
  Layers3,
  Microscope,
  ScanSearch,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";
import MechanicalResponseLab from "./MechanicalResponseLab";
import MicrostructureBackground from "./MicrostructureBackground";

const NODE_ID = "applied.materials-science";

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  question: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "applied.materials-science.structure": {
    icon: Atom,
    code: "STR",
    question: "How do bonding, order, defects, phases, interfaces, and grains organize matter across scales?",
    rgb: "125,211,252",
  },
  "applied.materials-science.properties": {
    icon: Gauge,
    code: "PRP",
    question: "Which mechanical, thermal, electrical, magnetic, optical, chemical, or transport responses matter for the application?",
    rgb: "251,191,36",
  },
  "applied.materials-science.metals": {
    icon: CircleDot,
    code: "MET",
    question: "How do alloying, phases, grains, dislocations, heat treatment, and corrosion shape metallic behavior?",
    rgb: "203,213,225",
  },
  "applied.materials-science.ceramics": {
    icon: Gem,
    code: "CER",
    question: "Why can ionic, covalent, crystalline, and glassy structures combine high-temperature stability with limited fracture tolerance?",
    rgb: "192,132,252",
  },
  "applied.materials-science.polymers": {
    icon: Waves,
    code: "POL",
    question: "How do chain length, entanglement, crystallinity, cross-linking, temperature, and time scale control polymer response?",
    rgb: "244,114,182",
  },
  "applied.materials-science.composites": {
    icon: Layers3,
    code: "CMP",
    question: "How can fibers, particles, matrices, interfaces, and orientation combine properties no single phase supplies alone?",
    rgb: "94,234,212",
  },
  "applied.materials-science.functional": {
    icon: Cable,
    code: "FUN",
    question: "How can electronic structure, polarization, magnetism, ionic motion, or optical response become an engineered function?",
    rgb: "96,165,250",
  },
  "applied.materials-science.processing-characterization": {
    icon: Microscope,
    code: "LAB",
    question: "How do processing routes create structure, and which microscopy, diffraction, spectroscopy, and tests reveal what was produced?",
    rgb: "251,146,60",
  },
};

const RELATIONSHIP = [
  { label: "Processing", note: "casting · forming · heat · deposition · curing", rgb: "251,146,60" },
  { label: "Structure", note: "bonding · defects · phases · grains · interfaces", rgb: "125,211,252" },
  { label: "Properties", note: "mechanical · thermal · electrical · optical", rgb: "251,191,36" },
  { label: "Performance", note: "function · reliability · lifetime · failure", rgb: "94,234,212" },
] as const;

const SELECTION_QUESTIONS = [
  { label: "Function", text: "Which responses actually control success in the intended service condition?" },
  { label: "Environment", text: "What temperatures, chemicals, radiation, moisture, loads, fields, or wear will the material experience?" },
  { label: "Processing", text: "Can the needed structure be made repeatably at the required geometry, rate, and scale?" },
  { label: "Failure", text: "Which fracture, fatigue, creep, corrosion, wear, delamination, or degradation modes deserve explicit margins?" },
  { label: "Manufacture & repair", text: "How will parts be joined, inspected, maintained, recycled, repaired, or replaced?" },
  { label: "Lifecycle", text: "How do cost, embodied energy, scarcity, toxicity, reuse, and end-of-life constraints change the choice?" },
] as const;

export default function MaterialsSciencePage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const left = context.children.slice(0, 4);
  const right = context.children.slice(4);

  return (
    <SceneFrame
      background={<MicrostructureBackground />}
      className="bg-[#05080c] text-slate-100 selection:bg-sky-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(5,8,12,0.48)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Processing · structure · properties · performance · characterization"
          eyebrowStyle="rule"
          icon={Microscope}
          title={<span>Materials Science</span>}
          subtitle="Materials science asks how structure is created, how structure produces properties, and whether those properties survive the conditions of use. Move between atoms, defects, microstructures, processing routes, measurements, and real performance rather than treating a material name as a complete specification."
          accentRgb="125, 211, 252"
          titleClassName="font-sans text-[clamp(2.8rem,5.3vw,6rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#f4fbff]"
          headerClassName="border-sky-100/[0.09]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-sky-100/[0.11] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,12,0.40),transparent_31%,transparent_69%,rgba(5,8,12,0.36))] backdrop-blur-[2px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-200/66"><ScanSearch size={14} /> Primary navigation · material worlds</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              Choose a material family, a property question, or the structure-processing machinery underneath both.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">
              The microscope background deliberately shows four separate schematic windows, not one impossible material: grains and phases, a lattice with defects, polymer chains, and a fiber-matrix composite. The branches below let those structural ideas specialize honestly.
            </p>
          </div>
          <Link href="/applied-science" className="group flex items-center justify-between gap-4 border-l border-sky-200/[0.18] bg-black/[0.09] px-4 py-3 backdrop-blur-[8px] transition hover:bg-black/[0.16]">
            <span><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Parent field</span><strong className="mt-1 block text-[14px] text-white">Applied Sciences</strong></span>
            <ArrowRight size={15} className="text-sky-200/55 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px_minmax(0,1fr)] xl:items-stretch">
          <div className="space-y-2.5">{left.map((branch) => <MaterialRoute key={branch.id} branch={branch} side="left" />)}</div>
          <RelationshipCore />
          <div className="space-y-2.5">{right.map((branch) => <MaterialRoute key={branch.id} branch={branch} side="right" />)}</div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/62">Response instrument</div>
            <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.035em] text-white">Read mechanical behavior from curve shape before assigning a material name.</h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">idealized normalized curves</span>
        </div>
        <MechanicalResponseLab />
      </section>

      <section className="mt-8 border-t border-sky-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-violet-200/58"><FlaskConical size={14} /> Selection questions · reference, not navigation</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">The strongest material on a datasheet can still be the wrong material for the system.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-400/72">Material selection is constrained optimization. Properties matter only relative to geometry, environment, manufacturing, uncertainty, cost, failure consequences, maintenance, and lifecycle requirements.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {SELECTION_QUESTIONS.map((item, index) => (
            <div key={item.label} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-4 py-4 md:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b xl:[&:nth-last-child(-n+3)]:border-b-0 xl:border-r xl:[&:nth-child(3n)]:border-r-0">
              <span className="font-mono text-[11px] text-sky-200/42">0{index + 1}</span>
              <span><strong className="block text-[13px] text-slate-200/86">{item.label}</strong><span className="mt-1 block text-[12px] leading-5 text-slate-500">{item.text}</span></span>
            </div>
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function MaterialRoute({ branch, side }: { branch: CurriculumNode; side: "left" | "right" }) {
  const meta = BRANCH_META[branch.id] ?? { icon: Boxes, code: "MAT", question: branch.description ?? "Explore this materials-science branch.", rgb: "125,211,252" };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const content = (
    <div className="group relative min-h-[108px] border-y border-white/[0.07] bg-black/[0.075] px-3 py-3 backdrop-blur-[10px] transition hover:bg-black/[0.13]" style={{ boxShadow: `inset ${side === "left" ? "3px" : "-3px"} 0 0 rgba(${meta.rgb},0.38)` }}>
      <div className="grid grid-cols-[40px_minmax(0,1fr)_54px] gap-3">
        <span className="flex h-9 w-9 items-center justify-center border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.26)`, background: `rgba(${meta.rgb},0.045)` }}><Icon size={15} /></span>
        <span><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.rgb},0.70)` }}>{meta.code}</span><strong className="mt-0.5 block text-[15px] text-white/88">{branch.label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{meta.question}</span></span>
        <span className="pt-1 text-right font-mono text-[11px] uppercase text-slate-600">{planned ? "planned" : "open"}</span>
      </div>
    </div>
  );
  return planned ? <div aria-disabled="true">{content}</div> : <Link href={branch.href}>{content}</Link>;
}

function RelationshipCore() {
  return (
    <Surface variant="ghost" className="relative min-h-[452px] overflow-hidden rounded-[28px] border-sky-100/[0.09]" style={{ background: "rgba(3,8,12,0.06)" }}>
      <div className="relative p-4">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-sky-200/54"><Sparkles size={13} /> Materials relationship</div>
        <p className="mt-2 text-[12px] leading-5 text-slate-400/64">A classic organizing chain, with feedback in both directions during real design and research.</p>
      </div>
      <div className="relative mx-4 mt-1 space-y-1">
        {RELATIONSHIP.map((step, index) => (
          <div key={step.label} className="relative border-b border-white/[0.06] py-3 last:border-b-0">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[11px]" style={{ color: `rgb(${step.rgb})`, borderColor: `rgba(${step.rgb},0.24)`, background: `rgba(${step.rgb},0.04)` }}>0{index + 1}</span>
              <span><strong className="block text-[13px]" style={{ color: `rgba(${step.rgb},0.84)` }}>{step.label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{step.note}</span></span>
            </div>
            {index < RELATIONSHIP.length - 1 ? <ArrowDown size={13} className="ml-[10px] mt-2 text-slate-600" /> : null}
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 inset-x-4 border-t border-sky-100/[0.07] pt-3 text-center font-mono text-[11px] uppercase tracking-[0.07em] text-sky-200/34">requirements can send the chain backward</div>
    </Surface>
  );
}
