"use client";

import Link from "next/link";
import { useState } from "react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import MolecularReactionBackground from "@/app/_page-system/backgrounds/MolecularReactionBackground";
import { SceneFrame, Surface, WorldSceneFocus, WorldWindow } from "@/app/_page-system/scene";
import PartsStructureProcessTopology, {
  type StructureStage,
} from "@/app/_page-system/topologies/PartsStructureProcessTopology";
import PeriodicTable from "./_components/PeriodicTable";
import ElementInspector from "./_components/ElementInspector";
import MoleculeViewer from "./_components/MoleculeViewer";
import ReactionBalancer from "./_components/ReactionBalancer";
import type { APIElement } from "./_components/chemistry-api";
import {
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

type BranchMeta = {
  icon: LucideIcon;
  rgb: string;
  question: string;
  scene: "elements" | "structures" | "reactions";
};

const BRANCH_META: Record<string, BranchMeta> = {
  "natural.chemistry.general": {
    icon: FlaskConical,
    rgb: "52, 211, 153",
    question: "How do atomic structure, bonding, energy, rate, and equilibrium work as one system?",
    scene: "reactions",
  },
  "natural.chemistry.organic": {
    icon: Hexagon,
    rgb: "34, 197, 94",
    question: "How does carbon support enormous structural and reaction diversity?",
    scene: "structures",
  },
  "natural.chemistry.inorganic": {
    icon: Boxes,
    rgb: "96, 165, 250",
    question: "How do metals, minerals, complexes, and extended solids behave?",
    scene: "structures",
  },
  "natural.chemistry.physical": {
    icon: Gauge,
    rgb: "244, 114, 182",
    question: "Which physical laws determine chemical states and change?",
    scene: "reactions",
  },
  "natural.chemistry.analytical": {
    icon: Search,
    rgb: "34, 211, 238",
    question: "How can composition and concentration be inferred from measurements?",
    scene: "elements",
  },
  "natural.chemistry.biochemistry": {
    icon: Dna,
    rgb: "132, 204, 22",
    question: "How does chemistry become the machinery of living systems?",
    scene: "structures",
  },
  "natural.chemistry.quantum": {
    icon: Orbit,
    rgb: "167, 139, 250",
    question: "How do quantum states determine electronic structure and bonding?",
    scene: "elements",
  },
};

const WORLD_SCENES = [
  {
    id: "elements",
    label: "Element inventory",
    description: "Sort matter by atomic identity and recurring electronic patterns.",
    accentRgb: "52, 211, 153",
  },
  {
    id: "structures",
    label: "Molecular structure",
    description: "Watch arrangement and geometry create properties that isolated atoms do not have.",
    accentRgb: "34, 211, 238",
  },
  {
    id: "reactions",
    label: "Reaction dynamics",
    description: "Follow collisions, activation barriers, bond changes, conservation, and energy flow.",
    accentRgb: "250, 204, 21",
  },
] as const;

const STRUCTURE_STAGES: StructureStage[] = [
  {
    id: "elements",
    label: "Elements",
    question: "What building blocks are available?",
    summary:
      "Atomic number fixes identity. Electron structure and periodic position reveal recurring tendencies in bonding and reactivity.",
    rgb: "52, 211, 153",
    icon: Atom,
  },
  {
    id: "structures",
    label: "Molecules & materials",
    question: "How are atoms arranged?",
    summary:
      "Connectivity, geometry, charge distribution, and larger-scale organization create new chemical and physical properties.",
    rgb: "34, 211, 238",
    icon: Network,
  },
  {
    id: "reactions",
    label: "Reactions",
    question: "How does one arrangement become another?",
    summary:
      "Reactions reorganize atoms and electrons while conserving nuclei, transferring energy, and responding to conditions.",
    rgb: "250, 204, 21",
    icon: RefreshCw,
  },
];

export default function ChemistryHub({ branches }: Props) {
  const [selectedElement, setSelectedElement] = useState<APIElement | null>(null);

  return (
    <SceneFrame
      background={<MolecularReactionBackground />}
      initialScene="elements"
      className="bg-[#020705] text-slate-100 selection:bg-emerald-400/25"
      maxWidthClassName="max-w-[1640px]"
      headerBackground="rgba(2,8,6,0.58)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Natural Science", href: "/natural-science" },
            { label: "Chemistry" },
          ]}
          eyebrow="Composition · structure · property · energy · reaction"
          eyebrowStyle="dot"
          icon={FlaskConical}
          title={<span>Chemistry</span>}
          subtitle="Chemistry asks how a limited inventory of elements becomes an immense world of substances. Identity comes from nuclei, properties emerge from arrangement, and reactions reorganize matter under physical constraints."
          accentRgb="52, 211, 153"
          titleClassName="font-sans text-[clamp(3rem,5.8vw,6.6rem)] font-semibold leading-[0.82] tracking-[-0.068em] text-[#f3fff8]"
          headerClassName="border-white/[0.08]"
        />
      }
    >
      <section className="mt-6">
        <WorldWindow
          eyebrow="Chemical world stage"
          title="Matter becomes interesting when arrangement starts to matter."
          description="Move from elemental identity to molecular structure to chemical change. The reaction field reorganizes with the selected scale instead of sitting behind the page as ornamental wallpaper."
          scenes={[...WORLD_SCENES]}
        >
          <PartsStructureProcessTopology stages={STRUCTURE_STAGES} presentation="world" />
        </WorldWindow>
      </section>

      <section className="mt-10">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-violet-200/70">
              <Microscope size={14} /> Choose a chemical lens
            </div>
            <h2 className="mt-3 max-w-5xl text-[clamp(2.2rem,4.4vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-white">
              The branches change the dominant systems and questions, not the chemical grammar.
            </h2>
          </div>
          <p className="text-[15px] leading-7 text-slate-300/70">
            Every branch still connects composition, electronic structure, geometry, energy, measurement, and transformation. Enter through the system you want to explain.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {branches.map((branch, index) => (
            <BranchCell key={branch.id} branch={branch} index={index} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Surface variant="glass" className="overflow-hidden rounded-[34px]">
          <div className="grid gap-5 border-b border-white/[0.08] p-6 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end sm:p-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-emerald-200/72">
                <Atom size={14} /> Elemental inventory
              </div>
              <h2 className="mt-3 text-[clamp(2rem,4vw,4rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
                The periodic table is a property map, not a list to memorize.
              </h2>
            </div>
            <p className="text-[15px] leading-7 text-slate-300/70">
              Atomic number fixes identity. Position exposes repeating electron patterns, so neighboring cells often share valence behavior while trends change across rows and columns.
            </p>
          </div>

          <div className="grid gap-5 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_390px] xl:p-7">
            <div className="overflow-x-auto rounded-[24px] border border-white/[0.08] bg-black/[0.22] p-4 sm:p-5">
              <PeriodicTable onSelect={setSelectedElement} activeZ={selectedElement?.number ?? 0} />
            </div>
            <div className="xl:sticky xl:top-[196px] xl:self-start">
              <ElementInspector element={selectedElement} />
            </div>
          </div>
        </Surface>
      </section>

      <section className="mt-12">
        <div className="max-w-5xl">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-cyan-200/72">
            Structure → change
          </div>
          <h2 className="mt-3 text-[clamp(2.2rem,4.5vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.058em] text-white">
            Build a structure, then account for every atom when it changes.
          </h2>
          <p className="mt-4 max-w-4xl text-[15px] leading-7 text-slate-300/70">
            Geometry explains why a substance behaves as it does. A balanced equation then records how whole molecular arrangements are exchanged without allowing matter to vanish between the two sides.
          </p>
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-2">
          <WorldSceneFocus scene="structures">
            <MoleculeViewer />
          </WorldSceneFocus>
          <WorldSceneFocus scene="reactions">
            <ReactionBalancer />
          </WorldSceneFocus>
        </div>
      </section>
    </SceneFrame>
  );
}

function BranchCell({ branch, index }: { branch: Branch; index: number }) {
  const meta = BRANCH_META[branch.id] ?? BRANCH_META["natural.chemistry.general"];
  const Icon = meta.icon;
  const active = branch.status !== "placeholder";
  const content = (
    <Surface
      variant="ghost"
      className={`group flex min-h-[265px] flex-col rounded-[24px] p-5 transition ${
        active ? "hover:-translate-y-1 hover:bg-black/[0.28]" : "opacity-[0.58]"
      }`}
      style={{ borderColor: `rgba(${meta.rgb},${active ? 0.17 : 0.09})` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-[15px] border"
          style={{
            color: `rgb(${meta.rgb})`,
            borderColor: `rgba(${meta.rgb},0.26)`,
            background: `rgba(${meta.rgb},0.055)`,
          }}
        >
          <Icon size={19} />
        </span>
        <span className="font-mono text-[11px] text-white/28">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-6 text-[21px] font-semibold tracking-[-0.035em] text-white">
        {branch.label}
      </h3>
      <p className="mt-3 text-[14px] leading-6 text-slate-300/66">{meta.question}</p>
      <span
        className="mt-auto flex items-center gap-2 pt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
        style={{ color: `rgba(${meta.rgb},0.74)` }}
      >
        {active ? (
          <>
            enter branch <ArrowRight size={13} />
          </>
        ) : (
          "planned branch"
        )}
      </span>
    </Surface>
  );

  return (
    <WorldSceneFocus scene={meta.scene}>
      {active ? <Link href={branch.href}>{content}</Link> : <div aria-disabled="true">{content}</div>}
    </WorldSceneFocus>
  );
}
