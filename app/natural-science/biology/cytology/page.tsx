import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Activity, ArrowRight, BookOpen, Dna, FlaskConical, Layers3, Microscope, Network, ScanSearch } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { CYTOLOGY_CURRICULUM } from "@/lib/curriculum/natural/biology/cytology";
import CytologyBackground from "./CytologyBackground";
import CellVisualizer from "./CellVisualizer";

const RGB = [
  "52,211,153",
  "192,132,252",
  "34,211,238",
  "251,191,36",
  "96,165,250",
  "244,114,182",
  "163,230,53",
  "125,211,252",
  "148,163,184",
] as const;

const SCALE_NOTES = [
  ["Diagram", "A teaching diagram can place structures together clearly even when their real sizes, shapes, numbers, and positions vary."],
  ["Light microscopy", "Visible structures depend on optical resolution, contrast, staining or fluorescence, specimen preparation, and what labels are present."],
  ["Electron microscopy", "Higher spatial resolution can reveal membrane and ultrastructural detail, but preparation produces a particular view of fixed material rather than a live whole cell."],
  ["Live-cell imaging", "Time-dependent behavior can be observed, but labels, illumination, sampling rate, focal plane, and experimental conditions shape what becomes visible."],
] as const;

const SYSTEM_PRINCIPLES = [
  ["Compartments create local conditions", "Membranes can separate reactions, gradients, enzymes, substrates, and regulatory states while still allowing controlled exchange."],
  ["Traffic links compartments", "Vesicles, pores, transporters, diffusion, motor proteins, and membrane contact sites move information and material between cellular regions."],
  ["Structure and process are inseparable", "A membrane, filament, pore, ribosome, enzyme complex, or organelle matters because its physical organization changes what reactions and movements are possible."],
  ["Cells are variable", "Organelle number, morphology, abundance, location, gene expression, metabolic state, and membrane organization differ across cell types and conditions."],
  ["Models choose what to show", "No single cell picture can truthfully display molecular scale, organelle architecture, dynamic trafficking, whole-cell geometry, and experimental evidence at once."],
  ["Evidence has a method", "Claims about cell structure come from microscopy, labeling, genetics, biochemical assays, perturbations, fractionation, sequencing, and many other methods with different limitations."],
] as const;

export default function CytologyPage() {
  const branches = CYTOLOGY_CURRICULUM.children ?? [];

  return (
    <SceneFrame
      background={<CytologyBackground />}
      className="bg-[#03100c] text-slate-100 selection:bg-emerald-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(3,16,12,0.49)"
      header={
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Natural Sciences", href: "/natural-science" }, { label: "Biology", href: "/natural-science/biology" }, { label: "Cytology" }]}
          eyebrow="Membranes · compartments · traffic · energy · signaling · division"
          eyebrowStyle="rule"
          icon={Microscope}
          title={<span>Cytology</span>}
          subtitle="Study cells as organized living systems. Cytology connects membranes, compartments, molecular machinery, cytoskeleton, transport, energy conversion, signaling, growth, division, and experimental evidence across many scales."
          accentRgb="52, 211, 153"
          titleClassName="font-sans text-[clamp(3rem,5.4vw,5.8rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#ecfdf5]"
          headerClassName="border-emerald-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-emerald-100/[0.10] py-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,16,12,0.45),transparent_31%,transparent_73%,rgba(7,16,26,0.34))] backdrop-blur-[2px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px] xl:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-emerald-200/62"><BookOpen size={14} /> Primary navigation · cell systems index</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">A cell is not a bag of tiny departments. It is an interacting physical system.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">The confocal-style world behind the page shows one generalized animal-cell slice with membrane, nucleus, rough ER, Golgi, mitochondria, microtubule tracks, and a single slow transport carrier. The composition is deliberately schematic, but its relationships are biologically grounded.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/natural-science/biology" icon={Dna} label="Biology" note="parent living-systems field" />
            <Neighbor href="/natural-science/biology/microbiology" icon={FlaskConical} label="Microbiology" note="microbes and cellular diversity" />
            <Neighbor href="/natural-science/biology/anatomy" icon={Activity} label="Anatomy & Physiology" note="cells within tissues and organisms" />
            <Neighbor href="/natural-science/chemistry/general" icon={Layers3} label="Chemistry" note="molecular interactions and reactions" />
          </div>
        </div>

        <div className="relative mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-3">
          {branches.map((branch, index) => {
            const rgb = RGB[index % RGB.length];
            return <div key={branch.id} aria-disabled="true" className="min-h-[142px] border-b border-white/[0.06] px-4 py-4 backdrop-blur-[7px] md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0"><div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] font-semibold" style={{ color: `rgba(${rgb},0.68)` }}>CY.{String(index + 1).padStart(2, "0")}</span><span className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-600">planned</span></div><strong className="mt-2 block text-[14px] text-white/84">{branch.label}</strong><p className="mt-2 text-[11px] leading-4 text-slate-500">{branch.description}</p></div>;
          })}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_405px] lg:items-end">
          <div><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-emerald-200/58"><Network size={13} /> Signature instrument · cell structure & exchange</div><h2 className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-white">Select a structure, then follow its dependencies outward.</h2></div>
          <p className="text-[12px] leading-5 text-slate-500">The old page treated organelles as factory departments and displayed invented counts and performance metrics. The new lab focuses on actual structures, processes, and connections, and keeps scale limitations visible.</p>
        </div>
        <CellVisualizer />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_430px] xl:items-start">
        <Surface variant="open" className="rounded-[28px] border-emerald-100/[0.08]" style={{ background: "rgba(3,16,12,0.025)" }}>
          <div className="p-5"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-emerald-200/48"><ScanSearch size={12} /> Seeing cells · reference, not navigation</div><h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">A cell diagram and a micrograph answer different questions.</h3></div>
          <div className="grid border-y border-white/[0.07] sm:grid-cols-2">
            {SCALE_NOTES.map(([term, detail], index) => <div key={term} className="border-b border-white/[0.06] p-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"><span className="font-mono text-[9px] text-emerald-200/38">0{index + 1}</span><strong className="mt-1 block text-[13px] text-slate-200/86">{term}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">{detail}</p></div>)}
          </div>
        </Surface>

        <Surface variant="glass" className="overflow-hidden rounded-[28px] border-cyan-100/[0.08]" style={{ background: "rgba(5,15,20,0.12)" }}>
          <div className="p-5"><div className="font-mono text-[10px] uppercase tracking-[0.08em] text-cyan-200/46">System principles</div><h3 className="mt-2 text-[20px] font-semibold tracking-[-0.035em] text-white">Structure only makes sense in process.</h3></div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.07]">
            {SYSTEM_PRINCIPLES.map(([term, detail], index) => <div key={term} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 px-4 py-3"><span className="font-mono text-[10px] text-cyan-200/36">0{index + 1}</span><span><strong className="block text-[12px] text-white/78">{term}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{detail}</span></span></div>)}
          </div>
        </Surface>
      </section>
    </SceneFrame>
  );
}

function Neighbor({ href, icon: Icon, label, note }: { href: string; icon: LucideIcon; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[72px] flex-col justify-between border border-white/[0.07] bg-black/[0.055] px-3 py-3 backdrop-blur-[8px] transition hover:bg-black/[0.11]"><span className="flex items-center gap-2 text-[11px] font-semibold text-white/78"><Icon size={12} className="text-emerald-200/52" />{label}</span><span className="flex items-end justify-between gap-2"><span className="text-[9px] leading-4 text-slate-600">{note}</span><ArrowRight size={10} className="text-slate-600 transition group-hover:translate-x-1" /></span></Link>;
}
