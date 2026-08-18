import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ArrowDown,
  ArrowRight,
  Box,
  Factory,
  Hand,
  Layers3,
  PackageOpen,
  Palette,
  PenTool,
  Recycle,
  Ruler,
  Search,
  Shapes,
  Wrench,
} from "lucide-react";
import IndustrialDesignWorld2026 from "./IndustrialDesignWorld2026";
import ProductUseJourney2026 from "./ProductUseJourney2026";
import IsometricLab from "./_components/IsometricLab";

type Branch = {
  label: string;
  code: string;
  icon: LucideIcon;
  rgb: string;
  description: string;
};

const BRANCHES: readonly Branch[] = [
  { label: "Product Design Studio", code: "STU-01", icon: Shapes, rgb: "251,146,60", description: "Frame opportunities, generate alternatives, critique concepts, and integrate form with use." },
  { label: "Human Factors & Ergonomics", code: "HFE-02", icon: Hand, rgb: "244,114,182", description: "Study reach, grip, posture, perception, controls, feedback, variation, accessibility, and error." },
  { label: "Color, Material & Finish", code: "CMF-03", icon: Palette, rgb: "251,191,36", description: "Specify material expression, texture, gloss, color, pattern, coating, tactile quality, and aging." },
  { label: "Materials & Manufacturing", code: "MFG-04", icon: Factory, rgb: "125,211,252", description: "Connect form to process, draft, ribs, split lines, fasteners, assembly, tooling, tolerances, and cost." },
  { label: "Design Research & User Needs", code: "RES-05", icon: Search, rgb: "94,234,212", description: "Observe contexts, interview users, map tasks, synthesize evidence, and test assumptions." },
  { label: "Prototyping & Modelmaking", code: "PRO-06", icon: Box, rgb: "192,132,252", description: "Build the minimum-fidelity artifact needed to answer the current design question." },
  { label: "Sustainability & Product Lifecycle", code: "LCA-07", icon: Recycle, rgb: "134,239,172", description: "Consider sourcing, durability, repair, reuse, disassembly, recycling, logistics, and end of life." },
  { label: "Visualization, CAD & Communication", code: "VIS-08", icon: PenTool, rgb: "216,180,254", description: "Communicate geometry and intent through sketching, sections, CAD, rendering, annotation, and specification." },
] as const;

const PROCESS = [
  { label: "Observe", detail: "context · task · people · constraints", icon: Search, rgb: "94,234,212" },
  { label: "Frame", detail: "need · opportunity · criteria · tradeoffs", icon: Ruler, rgb: "251,191,36" },
  { label: "Explore", detail: "sketch · model · alternatives · CMF", icon: Palette, rgb: "244,114,182" },
  { label: "Prototype", detail: "form · function · interaction · assembly", icon: PackageOpen, rgb: "192,132,252" },
  { label: "Evaluate", detail: "use · manufacture · service · lifecycle", icon: Wrench, rgb: "125,211,252" },
] as const;

export default function IndustrialDesignHub2026() {
  return (
    <SceneFrame
      background={<IndustrialDesignWorld2026 />}
      className="bg-[#100d0b] text-stone-100 selection:bg-orange-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(16,13,11,0.50)"
      header={
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applied Sciences", href: "/applied-science" }, { label: "Industrial Design" }]}
          eyebrow="People · form · material · manufacture · lifecycle"
          eyebrowStyle="rule"
          icon={PackageOpen}
          title={<span>Industrial Design</span>}
          subtitle="Shape physical products around human use. Industrial design connects observation, ergonomics, form, color/material/finish, prototyping, manufacturing, accessibility, maintenance, lifecycle, and communication into objects that must make sense both in the hand and in production."
          accentRgb="251, 146, 60"
          titleClassName="font-sans text-[clamp(2.8rem,5.2vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#fff7ed]"
          headerClassName="border-orange-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-orange-100/[0.11] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(16,13,11,0.48),transparent_30%,transparent_70%,rgba(17,16,24,0.38))] backdrop-blur-[2px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-200/66"><Layers3 size={14} /> Primary navigation · studio pin-up</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Read the product from human contact outward to manufacturing and lifecycle.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/70">The studio wall behind the page keeps orthographic views, a section, foam-model silhouette, CMF swatches, dimensions, split lines, hand-contact studies, and one slow inspection light visible. Planned branches stay visibly planned until their routes are developed.</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Neighbor href="/applied-science/engineering" label="Engineering" note="performance" />
            <Neighbor href="/applied-science/materials-science" label="Materials" note="behavior" />
            <Neighbor href="/applied-science/computer-technology" label="Technology" note="systems" />
          </div>
        </div>

        <div className="relative mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-4">
          {BRANCHES.map((branch, index) => <StudioRecord key={branch.code} branch={branch} index={index} />)}
        </div>
      </section>

      <section className="mt-7 grid gap-5 xl:grid-cols-[290px_minmax(0,1fr)] xl:items-start">
        <DesignProcess />
        <div>
          <div className="mb-3"><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-pink-200/58">Use-journey critique</div><h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white">Keep the object fixed and move the design question through its life.</h2></div>
          <ProductUseJourney2026 />
        </div>
      </section>

      <section className="mt-8 grid gap-5 border-t border-orange-100/[0.10] pt-5 xl:grid-cols-[minmax(0,1fr)_520px]">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/58"><Accessibility size={14} /> Representation lab · preserved</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">A drawing is not just a picture. It is a contract about geometry.</h2>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-stone-400/72">The existing isometric lab remains part of the parent because projection and visual communication are distinctive industrial-design skills. It is kept separate from the use-journey critique so representation does not get confused with usability evidence.</p>
        </div>
        <IsometricLab />
      </section>
    </SceneFrame>
  );
}

function StudioRecord({ branch, index }: { branch: Branch; index: number }) {
  const Icon = branch.icon;
  return (
    <div aria-disabled="true" className="min-h-[150px] border-b border-white/[0.06] px-4 py-4 backdrop-blur-[8px] md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(4n)]:border-r-0">
      <div className="flex items-start justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgb(${branch.rgb})`, borderColor: `rgba(${branch.rgb},0.25)` }}><Icon size={14} /></span><span className="font-mono text-[10px] uppercase text-stone-600">planned</span></div>
      <span className="mt-4 block font-mono text-[11px] font-semibold" style={{ color: `rgba(${branch.rgb},0.68)` }}>{branch.code} · 0{index + 1}</span>
      <strong className="mt-1 block text-[14px] text-white/86">{branch.label}</strong>
      <span className="mt-2 block text-[11px] leading-4 text-stone-500">{branch.description}</span>
    </div>
  );
}

function DesignProcess() {
  return (
    <Surface variant="open" className="relative min-h-[520px] overflow-hidden rounded-[30px] border-orange-100/[0.08]" style={{ background: "rgba(20,13,9,0.025)" }}>
      <div className="p-4"><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-orange-200/54"><PenTool size={13} /> Iteration loop</div><p className="mt-2 text-[12px] leading-5 text-stone-400/64">The process moves forward, but critique regularly sends the project back to an earlier question.</p></div>
      <div className="mx-4 mt-1 space-y-1">
        {PROCESS.map((step, index) => {
          const Icon = step.icon;
          return <div key={step.label} className="border-b border-white/[0.06] py-3 last:border-b-0"><div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${step.rgb})`, borderColor: `rgba(${step.rgb},0.24)`, background: `rgba(${step.rgb},0.04)` }}><Icon size={13} /></span><span><strong className="block text-[13px]" style={{ color: `rgba(${step.rgb},0.84)` }}>{step.label}</strong><span className="mt-1 block text-[11px] leading-4 text-stone-500">{step.detail}</span></span></div>{index < PROCESS.length - 1 ? <ArrowDown size={13} className="ml-[10px] mt-2 text-stone-600" /> : null}</div>;
        })}
      </div>
      <div className="absolute inset-x-4 bottom-4 border-t border-orange-100/[0.07] pt-3 text-center font-mono text-[11px] uppercase tracking-[0.07em] text-orange-200/34">prototype the uncertainty, not the presentation</div>
    </Surface>
  );
}

function Neighbor({ href, label, note }: { href: string; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[68px] flex-col justify-between border border-white/[0.07] bg-black/[0.055] px-2.5 py-2.5 backdrop-blur-[8px] transition hover:bg-black/[0.10]"><span className="text-[11px] font-semibold text-white/76">{label}</span><span className="flex items-end justify-between gap-2"><span className="text-[9px] text-stone-600">{note}</span><ArrowRight size={11} className="text-stone-600 transition group-hover:translate-x-1" /></span></Link>;
}
