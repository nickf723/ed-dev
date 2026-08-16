"use client";

import { useState, type ComponentType } from "react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import MolecularReactionBackground from "@/app/_page-system/backgrounds/MolecularReactionBackground";
import PartsStructureProcessTopology from "@/app/_page-system/topologies/PartsStructureProcessTopology";
import PeriodicTable from "./_components/PeriodicTable";
import ElementInspector from "./_components/ElementInspector";
import MoleculeViewer from "./_components/MoleculeViewer";
import ReactionBalancer from "./_components/ReactionBalancer";
import type { APIElement } from "./_components/chemistry-api";
import {
  Activity,
  ArrowRight,
  Atom,
  Boxes,
  Dna,
  FlaskConical,
  Gauge,
  Hexagon,
  Microscope,
  Network,
  Orbit,
  RefreshCw,
  Scale,
  Search,
  type LucideIcon,
} from "lucide-react";

type Branch = {
  id: string;
  label: string;
  href: string;
  description?: string;
  status: "active" | "placeholder";
};

type Props = { branches: Branch[] };

type BranchMeta = { icon: LucideIcon; rgb: string; question: string };

const BRANCH_META: Record<string, BranchMeta> = {
  "natural.chemistry.general": { icon: FlaskConical, rgb: "52, 211, 153", question: "How do the foundational models of chemistry fit together?" },
  "natural.chemistry.organic": { icon: Hexagon, rgb: "34, 197, 94", question: "How does carbon support enormous structural and reaction diversity?" },
  "natural.chemistry.inorganic": { icon: Boxes, rgb: "96, 165, 250", question: "How do metals, minerals, complexes, and non-organic compounds behave?" },
  "natural.chemistry.physical": { icon: Gauge, rgb: "244, 114, 182", question: "What physical laws determine chemical states and change?" },
  "natural.chemistry.analytical": { icon: Search, rgb: "34, 211, 238", question: "How can composition and concentration be inferred from measurements?" },
  "natural.chemistry.biochemistry": { icon: Dna, rgb: "132, 204, 22", question: "How does chemistry become the machinery of life?" },
  "natural.chemistry.quantum": { icon: Orbit, rgb: "167, 139, 250", question: "How do quantum states determine electronic structure and bonding?" },
};

export default function ChemistryHub({ branches }: Props) {
  const [selectedElement, setSelectedElement] = useState<APIElement | null>(null);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030b08] text-slate-100 selection:bg-emerald-400/25">
      <MolecularReactionBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1580px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#030b08]/78 px-4 pb-3 pt-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Natural Science", href: "/natural-science" },
              { label: "Chemistry" },
            ]}
            eyebrow="Composition · structure · property · energy · reaction"
            eyebrowStyle="dot"
            icon={FlaskConical}
            title={<span>Chemistry</span>}
            subtitle="Chemistry explains how elemental building blocks acquire new properties through arrangement and how those structures transform through reactions. The periodic table is a property map; molecules are arrangements; equations track rearrangement."
            accentRgb="52, 211, 153"
            titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6.2rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#f3fff8]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5">
          <PartsStructureProcessTopology
            stages={[
              {
                id: "elements",
                label: "Elements",
                question: "What building blocks are available?",
                summary: "An element is defined by proton number. Electron structure and periodic position help predict recurring chemical properties.",
                rgb: "52, 211, 153",
                icon: Atom,
              },
              {
                id: "structures",
                label: "Molecules & materials",
                question: "How are atoms arranged and bonded?",
                summary: "Bonding and three-dimensional arrangement create properties that individual atoms do not possess alone.",
                rgb: "34, 211, 238",
                icon: Network,
              },
              {
                id: "processes",
                label: "Reactions",
                question: "How does one arrangement become another?",
                summary: "Chemical reactions rearrange atoms and electrons while conserving elemental nuclei and tracking energy through the transformation.",
                rgb: "250, 204, 21",
                icon: RefreshCw,
              },
            ]}
          />
        </section>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.13] shadow-[0_30px_105px_rgba(0,0,0,0.23)] backdrop-blur-xl">
          <SectionHeader
            icon={Atom}
            eyebrow="01 · elemental inventory"
            title="The periodic table is a compressed model of recurring properties."
            text="Atomic number fixes identity. Position in the table exposes patterns in valence structure, metallic character, reactivity, and other properties because electron configurations repeat in systematic ways."
            rgb="52, 211, 153"
          />
          <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_360px] sm:p-5">
            <div className="overflow-x-auto rounded-[22px] border border-white/[0.06] bg-black/[0.18] p-4">
              <PeriodicTable onSelect={setSelectedElement} activeZ={selectedElement?.number ?? 0} />
            </div>
            <div className="xl:sticky xl:top-[190px] xl:self-start">
              <ElementInspector element={selectedElement} />
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="rounded-[28px] border border-cyan-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/65"><Network size={12} /> 02 · molecular structure</div>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">Composition alone does not determine behavior.</h2>
            <p className="mt-3 text-[11px] leading-6 text-slate-400">Connectivity, bond polarity, geometry, intermolecular forces, and larger-scale arrangement can make substances with similar ingredients behave completely differently.</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <MiniConcept label="Bond" text="A stabilizing electronic relationship between atoms." />
              <MiniConcept label="Geometry" text="The spatial arrangement of bonded atoms." />
              <MiniConcept label="Polarity" text="Uneven charge distribution across a bond or molecule." />
              <MiniConcept label="Material" text="Many particles arranged into a larger physical structure." />
            </div>
          </div>
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.12] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:p-5">
            <MoleculeViewer />
          </div>
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="rounded-[28px] border border-amber-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/65"><Activity size={12} /> 03 · reaction bookkeeping</div>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">A chemical equation records rearrangement, not disappearance.</h2>
            <p className="mt-3 text-[11px] leading-6 text-slate-400">Balanced coefficients make conservation visible. The atoms present before a reaction must still be accounted for afterward, even though their molecular partners and energy state may have changed.</p>
            <div className="mt-5 space-y-2">
              <ReactionRule icon={Scale} label="Conserve nuclei" text="Balance each element across reactants and products." />
              <ReactionRule icon={RefreshCw} label="Rearrange bonds" text="Chemical identity changes because connectivity and electron distribution change." />
              <ReactionRule icon={Gauge} label="Track energy" text="Breaking and forming interactions changes the energy of the chemical system and surroundings." />
            </div>
          </div>
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.12] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:p-5">
            <ReactionBalancer />
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.12] backdrop-blur-xl">
          <SectionHeader
            icon={Microscope}
            eyebrow="discipline map"
            title="Chemistry branches by the kinds of systems and questions being studied."
            text="Foundational ideas recur everywhere. Specialized fields change the dominant molecules, materials, measurements, or theoretical tools—not the basic fact that composition, structure, energy, and reaction remain connected."
            rgb="167, 139, 250"
          />
          <div className="grid sm:grid-cols-2 xl:grid-cols-4">
            {branches.map((branch, index) => <BranchCell key={branch.id} branch={branch} index={index} />)}
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionHeader({ icon: Icon, eyebrow, title, text, rgb }: { icon: LucideIcon; eyebrow: string; title: string; text: string; rgb: string }) {
  return (
    <div className="grid gap-4 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:p-6">
      <div>
        <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: `rgba(${rgb},0.65)` }}><Icon size={12} /> {eyebrow}</div>
        <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">{title}</h2>
      </div>
      <p className="text-[10px] leading-5 text-slate-500">{text}</p>
    </div>
  );
}

function MiniConcept({ label, text }: { label: string; text: string }) {
  return <div className="rounded-[15px] border border-white/[0.06] bg-white/[0.012] p-3"><div className="font-mono text-[8px] uppercase tracking-[0.1em] text-cyan-200/55">{label}</div><p className="mt-1.5 text-[8px] leading-4 text-slate-700">{text}</p></div>;
}

function ReactionRule({ icon: Icon, label, text }: { icon: LucideIcon; label: string; text: string }) {
  return <div className="flex gap-3 rounded-[15px] border border-white/[0.06] bg-white/[0.012] p-3"><Icon size={13} className="mt-0.5 shrink-0 text-amber-200/55" /><div><strong className="block text-[9px] text-slate-300">{label}</strong><p className="mt-1 text-[8px] leading-4 text-slate-700">{text}</p></div></div>;
}

function BranchCell({ branch, index }: { branch: Branch; index: number }) {
  const meta = BRANCH_META[branch.id] ?? BRANCH_META["natural.chemistry.general"];
  const Icon = meta.icon;
  const active = branch.status !== "placeholder";
  const content = (
    <article className={`group flex min-h-[230px] flex-col border-b border-r border-white/[0.06] p-5 ${active ? "transition hover:bg-white/[0.02]" : "opacity-55"}`}>
      <div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.20)` }}><Icon size={16} /></span><span className="font-mono text-[7px] text-slate-800">{String(index + 1).padStart(2, "0")}</span></div>
      <h3 className="mt-5 text-[15px] font-semibold text-white">{branch.label}</h3>
      <p className="mt-2 text-[9px] leading-4 text-slate-600">{meta.question}</p>
      <span className="mt-auto flex items-center gap-2 pt-5 font-mono text-[7px] uppercase tracking-[0.09em]" style={{ color: `rgba(${meta.rgb},0.58)` }}>{active ? <>open <ArrowRight size={9} /></> : "planned"}</span>
    </article>
  );
  return active ? <a href={branch.href}>{content}</a> : <div>{content}</div>;
}
