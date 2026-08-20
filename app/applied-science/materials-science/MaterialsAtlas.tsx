import Link from "next/link";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Atom,
  Boxes,
  Cable,
  CircleDot,
  Gauge,
  Gem,
  Layers3,
  Microscope,
  Waves,
  type LucideIcon,
} from "lucide-react";

type Motif = "grains" | "lattice" | "chains" | "fibers" | "signal";
type Meta = { icon: LucideIcon; code: string; question: string; rgb: string; motif: Motif };

const META: Record<string, Meta> = {
  "applied.materials-science.structure": { icon: Atom, code: "STR", question: "How do bonding, order, defects, phases, interfaces, and grains organize matter across scales?", rgb: "125,211,252", motif: "lattice" },
  "applied.materials-science.properties": { icon: Gauge, code: "PRP", question: "Which mechanical, thermal, electrical, magnetic, optical, chemical, or transport responses matter for the application?", rgb: "251,191,36", motif: "signal" },
  "applied.materials-science.metals": { icon: CircleDot, code: "MET", question: "How do alloying, phases, grains, dislocations, heat treatment, and corrosion shape metallic behavior?", rgb: "203,213,225", motif: "grains" },
  "applied.materials-science.ceramics": { icon: Gem, code: "CER", question: "Why can ionic, covalent, crystalline, and glassy structures combine high-temperature stability with limited fracture tolerance?", rgb: "192,132,252", motif: "lattice" },
  "applied.materials-science.polymers": { icon: Waves, code: "POL", question: "How do chain length, entanglement, crystallinity, cross-linking, temperature, and time scale control polymer response?", rgb: "244,114,182", motif: "chains" },
  "applied.materials-science.composites": { icon: Layers3, code: "CMP", question: "How can fibers, particles, matrices, interfaces, and orientation combine properties no single phase supplies alone?", rgb: "94,234,212", motif: "fibers" },
  "applied.materials-science.functional": { icon: Cable, code: "FUN", question: "How can electronic structure, polarization, magnetism, ionic motion, or optical response become an engineered function?", rgb: "96,165,250", motif: "signal" },
  "applied.materials-science.processing-characterization": { icon: Microscope, code: "LAB", question: "How do processing routes create structure, and which microscopy, diffraction, spectroscopy, and tests reveal what was produced?", rgb: "251,146,60", motif: "grains" },
};

const RAIL = ["applied.materials-science.structure", "applied.materials-science.properties", "applied.materials-science.processing-characterization"] as const;
const SPECIMENS = ["applied.materials-science.metals", "applied.materials-science.ceramics", "applied.materials-science.polymers", "applied.materials-science.composites", "applied.materials-science.functional"] as const;
const SPANS = ["lg:col-span-5", "lg:col-span-3", "lg:col-span-4", "lg:col-span-7", "lg:col-span-5"] as const;

export default function MaterialsAtlas({ children }: { children: readonly CurriculumNode[] }) {
  const byId = new Map(children.map((branch) => [branch.id, branch]));
  return (
    <nav aria-label="Materials Science fields" className="relative mt-5 overflow-hidden border border-sky-100/[0.10] bg-[#061019]/[0.28] shadow-[0_30px_90px_rgba(0,0,0,0.18)] backdrop-blur-[20px] backdrop-saturate-[1.08]">
      <div className="border-b border-white/[0.06] px-4 py-3">
        <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.10em] text-sky-100/46">Instrument rail · cross-cutting ways to interrogate every material family</div>
        <div className="mt-3 grid gap-2 lg:grid-cols-3">
          {RAIL.map((id) => { const branch = byId.get(id); return branch ? <RailRoute key={id} branch={branch} /> : null; })}
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-500">Specimen tray · material families</div><div className="mt-1 text-[12px] text-slate-400/72">Five families, five structural motifs, one shared structure-property problem.</div></div>
          <div className="hidden font-mono text-[8px] uppercase tracking-[0.08em] text-slate-600 sm:block">planned branches remain visible</div>
        </div>
        <div className="grid gap-3 lg:grid-cols-12">
          {SPECIMENS.map((id, index) => { const branch = byId.get(id); return branch ? <SpecimenRoute key={id} branch={branch} className={SPANS[index]} /> : null; })}
        </div>
      </div>
      <div className="border-t border-white/[0.06] px-4 py-2 font-mono text-[8px] uppercase tracking-[0.09em] text-slate-600">schematic motifs · not literal microscope images · every destination is a direct curriculum peer</div>
    </nav>
  );
}

function RailRoute({ branch }: { branch: CurriculumNode }) {
  const meta = META[branch.id] ?? { icon: Boxes, code: "MAT", question: branch.description ?? "Explore this materials-science field.", rgb: "125,211,252", motif: "grains" as const };
  const Icon = meta.icon;
  const active = branch.status === "active";
  const body = <div className={`group grid min-h-[112px] grid-cols-[38px_minmax(0,1fr)_54px] gap-2 border bg-[#071019]/[0.42] px-3 py-3 backdrop-blur-[16px] transition ${active ? "hover:bg-[#071019]/[0.56]" : "opacity-52"}`} style={{ borderColor: `rgba(${meta.rgb},0.15)` }}><span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)`, background: `rgba(${meta.rgb},0.04)` }}><Icon size={12} /></span><span><span className="font-mono text-[8px] uppercase tracking-[0.07em]" style={{ color: `rgba(${meta.rgb},0.60)` }}>{meta.code}</span><strong className="mt-0.5 block text-[12px] text-white/84">{branch.label}</strong><span className="mt-1 block text-[9px] leading-4 text-slate-500">{meta.question}</span></span><span className="pt-1 text-right font-mono text-[8px] uppercase tracking-[0.06em] text-slate-600">{active ? "open" : "planned"}</span>{active ? <span className="col-span-3 flex items-center justify-end gap-1 font-mono text-[8px] uppercase tracking-[0.06em]" style={{ color: `rgba(${meta.rgb},0.58)` }}>open field <ArrowRight size={9} className="transition group-hover:translate-x-1" /></span> : null}</div>;
  return active ? <Link href={branch.href ?? "#"}>{body}</Link> : <div aria-disabled="true">{body}</div>;
}

function SpecimenRoute({ branch, className }: { branch: CurriculumNode; className: string }) {
  const meta = META[branch.id] ?? { icon: Boxes, code: "MAT", question: branch.description ?? "Explore this materials-science field.", rgb: "125,211,252", motif: "grains" as const };
  const Icon = meta.icon;
  const active = branch.status === "active";
  const body = <div className={`group relative grid min-h-[190px] overflow-hidden border bg-[#061019]/[0.38] px-4 py-4 backdrop-blur-[16px] transition ${active ? "hover:bg-[#061019]/[0.52]" : "opacity-52"}`} style={{ borderColor: `rgba(${meta.rgb},0.15)` }}><SpecimenMotif motif={meta.motif} rgb={meta.rgb} /><div className="relative z-10 flex items-start justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border bg-[#061019]/70 backdrop-blur-md" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.25)` }}><Icon size={14} /></span><span className="font-mono text-[8px] uppercase tracking-[0.06em] text-slate-600">{active ? "open" : "planned"}</span></div><div className="relative z-10 mt-auto rounded-[14px] bg-[#061019]/[0.58] px-3 py-2 backdrop-blur-[16px]"><span className="font-mono text-[8px] uppercase tracking-[0.07em]" style={{ color: `rgba(${meta.rgb},0.62)` }}>{meta.code} · specimen family</span><strong className="mt-1 block text-[14px] text-white/86">{branch.label}</strong><span className="mt-1 block max-w-2xl text-[10px] leading-4 text-slate-500">{meta.question}</span>{active ? <span className="mt-2 flex items-center justify-end gap-1 font-mono text-[8px] uppercase tracking-[0.06em]" style={{ color: `rgba(${meta.rgb},0.58)` }}>open specimen <ArrowRight size={9} className="transition group-hover:translate-x-1" /></span> : null}</div></div>;
  return active ? <Link href={branch.href ?? "#"} className={className}>{body}</Link> : <div aria-disabled="true" className={className}>{body}</div>;
}

function SpecimenMotif({ motif, rgb }: { motif: Motif; rgb: string }) {
  if (motif === "chains") return <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-55" viewBox="0 0 420 190" preserveAspectRatio="none" aria-hidden="true"><path d="M-20 55C35 18 75 92 130 55s95 37 150 0 95 37 160 0M-30 125c65-38 105 38 160 0s95 38 150 0 95 38 160 0" fill="none" stroke={`rgba(${rgb},0.19)`} strokeWidth="3"/></svg>;
  if (motif === "fibers") return <div className="pointer-events-none absolute inset-0 opacity-55" aria-hidden="true"><div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(22deg,rgba(${rgb},0.14) 0 3px,transparent 3px 24px)` }} /><div className="absolute inset-[18%] border" style={{ borderColor: `rgba(${rgb},0.10)` }} /></div>;
  if (motif === "lattice") return <div className="pointer-events-none absolute inset-0 opacity-55" aria-hidden="true" style={{ backgroundImage: `radial-gradient(circle,rgba(${rgb},0.18) 0 3px,transparent 3.5px)`, backgroundSize: "34px 34px" }}><span className="absolute left-[58%] top-[38%] h-4 w-4 rounded-full border bg-[#061019]" style={{ borderColor: `rgba(${rgb},0.20)` }} /></div>;
  if (motif === "signal") return <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-55" viewBox="0 0 420 190" preserveAspectRatio="none" aria-hidden="true"><path d="M0 112h58l24-54 32 91 34-71 34 35 38-17 30 18 32-55 31 72 35-32 62 2" fill="none" stroke={`rgba(${rgb},0.18)`} strokeWidth="2"/></svg>;
  return <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-55" viewBox="0 0 420 190" preserveAspectRatio="none" aria-hidden="true"><path d="M0 42L72 18l66 31 65-34 61 31 76-21 80 34v104l-79 15-61-28-75 26-70-23-73 24L0 151Z" fill="none" stroke={`rgba(${rgb},0.15)`} strokeWidth="2"/><path d="M72 18l7 67-79 66M138 49l-59 36 56 68M203 15l-3 73-65 65M264 46l-64 42 80 62M340 25l-18 68-42 57M420 59l-98 34 19 85" fill="none" stroke={`rgba(${rgb},0.10)`}/></svg>;
}
