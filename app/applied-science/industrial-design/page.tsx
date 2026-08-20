import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ArrowRight,
  Box,
  Boxes,
  DraftingCompass,
  Factory,
  Hand,
  Layers3,
  Leaf,
  Palette,
  PenTool,
  ScanSearch,
  Shapes,
} from "lucide-react";
import IndustrialBackground from "./_components/IndustrialBackground";
import IsometricLab from "./_components/IsometricLab";

const NODE_ID = "applied.industrial-design";

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  rgb: string;
  prompt: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "applied.industrial-design.design-research": {
    icon: ScanSearch,
    code: "RES",
    rgb: "94,234,212",
    prompt: "Observe real contexts, separate evidence from interpretation, and identify needs worth designing around.",
  },
  "applied.industrial-design.human-factors": {
    icon: Hand,
    code: "HFE",
    rgb: "244,114,182",
    prompt: "Fit reach, grip, posture, perception, controls, feedback, accessibility, safety, and human variation.",
  },
  "applied.industrial-design.product-studio": {
    icon: Shapes,
    code: "STD",
    rgb: "125,211,252",
    prompt: "Generate and critique product concepts until form, use, identity, and constraints begin to cohere.",
  },
  "applied.industrial-design.cmf": {
    icon: Palette,
    code: "CMF",
    rgb: "192,132,252",
    prompt: "Use color, material, texture, gloss, coating, aging, and tactile quality as deliberate product decisions.",
  },
  "applied.industrial-design.visualization-cad": {
    icon: DraftingCompass,
    code: "CAD",
    rgb: "56,189,248",
    prompt: "Communicate geometry and intent through sketches, views, sections, CAD, rendering, annotation, and presentation.",
  },
  "applied.industrial-design.prototyping": {
    icon: Boxes,
    code: "PRO",
    rgb: "251,191,36",
    prompt: "Build only enough fidelity to answer the current question, from foam studies to functional test rigs.",
  },
  "applied.industrial-design.materials-manufacturing": {
    icon: Factory,
    code: "MFG",
    rgb: "251,146,60",
    prompt: "Make geometry compatible with material behavior, tooling, tolerances, assembly, cost, finish, and production scale.",
  },
  "applied.industrial-design.lifecycle": {
    icon: Leaf,
    code: "LCA",
    rgb: "134,239,172",
    prompt: "Consider sourcing, durability, repair, shipping, reuse, disassembly, recycling, and end-of-life pathways.",
  },
};

const LENSES = [
  {
    id: "evidence",
    label: "Evidence",
    note: "What do people actually need, do, perceive, reach, misunderstand, avoid, or adapt around?",
    left: "applied.industrial-design.design-research",
    right: "applied.industrial-design.human-factors",
    rgb: "94,234,212",
  },
  {
    id: "form",
    label: "Form",
    note: "What should the product become physically, visually, tactilely, and behaviorally?",
    left: "applied.industrial-design.product-studio",
    right: "applied.industrial-design.cmf",
    rgb: "125,211,252",
  },
  {
    id: "representation",
    label: "Representation",
    note: "How can an idea be communicated, modeled, tested, revised, and made legible before production?",
    left: "applied.industrial-design.visualization-cad",
    right: "applied.industrial-design.prototyping",
    rgb: "192,132,252",
  },
  {
    id: "realization",
    label: "Realization",
    note: "How will the product be manufactured, maintained, repaired, circulated, and eventually leave use?",
    left: "applied.industrial-design.materials-manufacturing",
    right: "applied.industrial-design.lifecycle",
    rgb: "251,191,36",
  },
] as const;

const PROJECTION_NOTES = [
  {
    term: "Orthographic",
    text: "Front, top, side, section, and detail views remove perspective so geometry and dimensions can be communicated precisely.",
  },
  {
    term: "Isometric",
    text: "Three principal axes are drawn with equal scale, producing a readable 3D-like view without perspective convergence.",
  },
  {
    term: "Prototype",
    text: "A representation becomes useful when its fidelity matches the question. A rough model can answer questions a polished rendering cannot.",
  },
  {
    term: "Signifier",
    text: "Shape, placement, texture, motion, labeling, and feedback can communicate where and how a product expects to be used.",
  },
] as const;

export default function IndustrialDesignPage() {
  const { node, breadcrumbs } = requireCurriculumPageContext(NODE_ID);
  const children = node.children ?? [];
  const byId = new Map(children.map((child) => [child.id, child]));

  return (
    <SceneFrame
      background={<IndustrialBackground />}
      className="bg-[#080b10] text-zinc-100 selection:bg-sky-300/25"
      maxWidthClassName="max-w-[1640px]"
      headerBackground="rgba(8,11,16,0.52)"
      header={
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="People · form · materials · prototypes · manufacturing · lifecycle"
          eyebrowStyle="rule"
          icon={PenTool}
          title={<span>Industrial Design</span>}
          subtitle="Design physical products around human use by connecting research, ergonomics, form, color and material decisions, prototyping, manufacturing, accessibility, lifecycle thinking, and clear visual communication."
          accentRgb="56, 189, 248"
          titleClassName="font-sans text-[clamp(2.8rem,5.4vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#f0f9ff]"
          headerClassName="border-sky-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-sky-100/[0.11] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,0.34),transparent_28%,transparent_72%,rgba(8,11,16,0.30))] backdrop-blur-[5px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div className="rounded-[20px] bg-[#091019]/[0.24] px-3 py-2 backdrop-blur-[18px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-sky-100/62">
              <Layers3 size={13} /> Primary navigation · exploded product section
            </div>
            <h2 className="mt-1 max-w-5xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.046em] text-white">
              Take a product apart by the questions a designer has to coordinate.
            </h2>
            <p className="mt-2 max-w-4xl text-[12px] leading-5 text-zinc-400/78">
              The four bands below are lenses, not a mandatory sequence. Industrial design loops among evidence, form, representation, and realization as new constraints and test results appear.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/applied-science/engineering" label="Engineering" note="analysis · mechanisms · systems" />
            <Neighbor href="/applied-science/materials-science" label="Materials Science" note="structure · properties · processing" />
          </div>
        </div>

        <nav aria-label="Industrial Design fields" className="relative mt-5 overflow-hidden border border-sky-100/[0.10] bg-[#08111a]/[0.26] shadow-[0_30px_90px_rgba(0,0,0,0.20)] backdrop-blur-[20px] backdrop-saturate-[1.08]">
          <div className="hidden lg:block">
            {LENSES.map((lens, index) => (
              <ExplodedLens key={lens.id} lens={lens} index={index} byId={byId} />
            ))}
          </div>
          <div className="grid gap-3 p-3 sm:grid-cols-2 lg:hidden">
            {LENSES.flatMap((lens) => [lens.left, lens.right]).map((id, index) => {
              const child = byId.get(id);
              return child ? <MobileField key={id} child={child} index={index} /> : null;
            })}
          </div>
          <div className="border-t border-white/[0.06] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.09em] text-zinc-600">
            conceptual section · every branch is a direct peer · planned branches remain visible until developed
          </div>
        </nav>
      </section>

      <section className="mt-8">
        <div className="mb-3 grid gap-3 border-b border-sky-100/[0.08] pb-3 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div className="rounded-[18px] bg-[#091019]/[0.18] px-3 py-2 backdrop-blur-[14px]">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-sky-100/56">Projection instrument · after the field map</div>
            <h2 className="mt-1 text-[clamp(1.55rem,2.6vw,2.45rem)] font-semibold tracking-[-0.042em] text-white">One footprint, two representations.</h2>
          </div>
          <p className="rounded-[16px] bg-[#091019]/[0.16] px-3 py-2 text-[11px] leading-5 text-zinc-500 backdrop-blur-[14px]">
            Add block heights in the top view and watch the same geometry become an isometric drawing. Right-click or shift-click removes height.
          </p>
        </div>
        <IsometricLab />
      </section>

      <section className="mt-8 border-t border-sky-100/[0.09] pt-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="rounded-[18px] bg-[#091019]/[0.16] px-3 py-2 backdrop-blur-[14px]">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-indigo-100/52">Representation notes · reference, not navigation</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
              A drawing, model, prototype, and production part answer different questions.
            </h2>
          </div>
          <p className="rounded-[16px] bg-[#091019]/[0.16] px-3 py-2 text-[13px] leading-6 text-zinc-400/76 backdrop-blur-[14px]">
            Form should support use, but function is not the only input. Cost, manufacture, accessibility, repair, identity, aesthetics, context, regulation, durability, and environmental effects can all reshape a product.
          </p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-4">
          {PROJECTION_NOTES.map((item, index) => (
            <div key={item.term} className="grid min-h-[142px] grid-cols-[38px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] bg-[#091019]/[0.12] px-4 py-4 backdrop-blur-[12px] xl:border-r xl:border-b-0 xl:last:border-r-0">
              <span className="font-mono text-[10px] text-sky-100/36">0{index + 1}</span>
              <span><strong className="text-[12px] text-white/82">{item.term}</strong><span className="mt-2 block text-[11px] leading-5 text-zinc-500">{item.text}</span></span>
            </div>
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function ExplodedLens({ lens, index, byId }: { lens: (typeof LENSES)[number]; index: number; byId: Map<string, CurriculumNode> }) {
  const left = byId.get(lens.left);
  const right = byId.get(lens.right);

  return (
    <section className="grid min-h-[176px] grid-cols-[minmax(0,1fr)_300px_minmax(0,1fr)] border-b border-white/[0.06] last:border-b-0">
      <div className="flex items-center border-r border-white/[0.055] p-3">{left ? <FieldRoute child={left} side="left" /> : null}</div>
      <div className="relative flex items-center justify-center overflow-hidden px-5 py-4">
        <div className="absolute inset-x-5 top-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.11] to-transparent" />
        <div className="relative z-10 grid w-full grid-cols-[44px_minmax(0,1fr)] items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border bg-[#08111a]/80 font-mono text-[11px]" style={{ color: `rgb(${lens.rgb})`, borderColor: `rgba(${lens.rgb},0.24)` }}>0{index + 1}</span>
          <span className="rounded-[16px] bg-[#08111a]/[0.52] px-3 py-2 backdrop-blur-[16px]"><strong className="block text-[13px]" style={{ color: `rgba(${lens.rgb},0.86)` }}>{lens.label}</strong><span className="mt-1 block text-[10px] leading-4 text-zinc-500">{lens.note}</span></span>
        </div>
        <ProductLayer index={index} rgb={lens.rgb} />
      </div>
      <div className="flex items-center border-l border-white/[0.055] p-3">{right ? <FieldRoute child={right} side="right" /> : null}</div>
    </section>
  );
}

function ProductLayer({ index, rgb }: { index: number; rgb: string }) {
  const widths = [112, 138, 124, 150];
  const heights = [26, 34, 30, 38];
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 opacity-45">
      <div className="relative" style={{ width: widths[index], height: heights[index] }}>
        <div className="absolute inset-0 skew-x-[-18deg] border" style={{ borderColor: `rgba(${rgb},0.18)`, background: `rgba(${rgb},0.025)` }} />
        <div className="absolute -left-4 top-1/2 h-px w-4" style={{ background: `rgba(${rgb},0.16)` }} />
        <div className="absolute -right-4 top-1/2 h-px w-4" style={{ background: `rgba(${rgb},0.16)` }} />
      </div>
    </div>
  );
}

function FieldRoute({ child, side }: { child: CurriculumNode; side: "left" | "right" }) {
  const meta = BRANCH_META[child.id] ?? { icon: Box, code: "IND", rgb: "148,163,184", prompt: child.description ?? "Explore this industrial design field." };
  const Icon = meta.icon;
  const active = child.status === "active";
  const body = (
    <div className={`group grid w-full min-h-[132px] grid-cols-[42px_minmax(0,1fr)_58px] gap-3 border bg-[#091019]/[0.44] px-3 py-3 backdrop-blur-[16px] transition ${active ? "hover:bg-[#091019]/[0.58]" : "opacity-52"}`} style={{ borderColor: `rgba(${meta.rgb},0.14)` }}>
      <span className={`flex h-9 w-9 items-center justify-center rounded-full border ${side === "right" ? "lg:order-3" : ""}`} style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.25)`, background: `rgba(${meta.rgb},0.04)` }}><Icon size={14} /></span>
      <span className={side === "right" ? "lg:text-right" : ""}><span className="font-mono text-[9px] font-semibold uppercase tracking-[0.07em]" style={{ color: `rgba(${meta.rgb},0.62)` }}>{meta.code}</span><strong className="mt-1 block text-[13px] leading-4 text-white/84">{child.label}</strong><span className="mt-2 block text-[10px] leading-4 text-zinc-500">{meta.prompt}</span></span>
      <span className={`pt-1 font-mono text-[8px] uppercase tracking-[0.06em] text-zinc-600 ${side === "right" ? "lg:order-1 lg:text-left" : "text-right"}`}>{active ? "open" : "planned"}</span>
      {active ? <span className={`col-span-3 flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.06em] ${side === "right" ? "justify-start" : "justify-end"}`} style={{ color: `rgba(${meta.rgb},0.58)` }}>open field <ArrowRight size={9} className="transition group-hover:translate-x-1" /></span> : null}
    </div>
  );
  return active ? <Link href={child.href ?? "#"} className="w-full">{body}</Link> : <div aria-disabled="true" className="w-full">{body}</div>;
}

function MobileField({ child, index }: { child: CurriculumNode; index: number }) {
  const meta = BRANCH_META[child.id] ?? { icon: Box, code: `ID${index + 1}`, rgb: "148,163,184", prompt: child.description ?? "Explore this industrial design field." };
  const Icon = meta.icon;
  const active = child.status === "active";
  const body = <div className={`group grid min-h-[104px] grid-cols-[38px_minmax(0,1fr)_18px] gap-2 border bg-[#091019]/[0.40] px-3 py-3 backdrop-blur-[16px] ${active ? "" : "opacity-52"}`} style={{ borderColor: `rgba(${meta.rgb},0.15)` }}><span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)` }}><Icon size={12} /></span><span><span className="font-mono text-[8px] uppercase tracking-[0.07em]" style={{ color: `rgba(${meta.rgb},0.58)` }}>{meta.code}</span><strong className="mt-0.5 block text-[11px] text-white/82">{child.label}</strong><span className="mt-1 block text-[9px] leading-4 text-zinc-500">{meta.prompt}</span></span>{active ? <ArrowRight size={11} className="mt-2 text-zinc-500 transition group-hover:translate-x-1" /> : null}</div>;
  return active ? <Link href={child.href ?? "#"}>{body}</Link> : <div aria-disabled="true">{body}</div>;
}

function Neighbor({ href, label, note }: { href: string; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[68px] flex-col justify-between border border-white/[0.08] bg-[#091019]/[0.34] px-3 py-2.5 backdrop-blur-[16px] transition hover:bg-[#091019]/[0.46]"><span className="text-[11px] font-semibold text-white/82">{label}</span><span className="flex items-end justify-between gap-2"><span className="text-[9px] leading-3 text-zinc-500">{note}</span><ArrowRight size={11} className="text-zinc-500 transition group-hover:translate-x-1" /></span></Link>;
}
