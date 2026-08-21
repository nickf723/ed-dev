import Link from "next/link";
import DomainPageHeader, {
  type DomainHeaderCrumb,
} from "@/app/_components/DomainPageHeader";
import MolecularReactionBackground from "@/app/_page-system/backgrounds/MolecularReactionBackground";
import {
  SceneFrame,
  Surface,
  WorldSceneFocus,
  WorldWindow,
} from "@/app/_page-system/scene";
import PartsStructureProcessTopology, {
  type StructureStage,
} from "@/app/_page-system/topologies/PartsStructureProcessTopology";
import type { CurriculumNode } from "@/lib/curriculum/types";
import ElementExplorer from "./_components/ElementExplorer";
import MoleculeViewer from "./_components/MoleculeViewer";
import ReactionBalancer from "./_components/ReactionBalancer";
import ChemistryEvidenceLab from "./ChemistryEvidenceLab";
import {
  ArrowRight,
  Boxes,
  Database,
  Dna,
  ExternalLink,
  FlaskConical,
  Gauge,
  Hexagon,
  Microscope,
  Orbit,
  Search,
  type LucideIcon,
} from "lucide-react";

type Props = {
  branches: readonly CurriculumNode[];
  breadcrumbs: readonly DomainHeaderCrumb[];
};

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
    question:
      "How do atomic structure, bonding, energy, rate, and equilibrium work as one system?",
    scene: "reactions",
  },
  "natural.chemistry.organic": {
    icon: Hexagon,
    rgb: "34, 197, 94",
    question:
      "How does carbon support enormous structural and reaction diversity?",
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
    question:
      "How can composition and concentration be inferred from measurements?",
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
    question:
      "How do quantum states determine electronic structure and bonding?",
    scene: "elements",
  },
};

const WORLD_SCENES = [
  {
    id: "elements",
    label: "Element inventory",
    description:
      "Sort matter by atomic identity and recurring electronic patterns.",
    accentRgb: "52, 211, 153",
  },
  {
    id: "structures",
    label: "Molecular structure",
    description:
      "Watch arrangement and geometry create properties that isolated atoms do not have.",
    accentRgb: "34, 211, 238",
  },
  {
    id: "reactions",
    label: "Reaction dynamics",
    description:
      "Follow activation barriers, bond changes, conservation, conditions, and energy flow.",
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
  },
  {
    id: "structures",
    label: "Molecules & materials",
    question: "How are atoms arranged?",
    summary:
      "Connectivity, geometry, charge distribution, and larger-scale organization create properties not contained in an isolated element list.",
    rgb: "34, 211, 238",
  },
  {
    id: "reactions",
    label: "Reactions",
    question: "How does one arrangement become another?",
    summary:
      "Reactions reorganize nuclei and electrons while conserving elemental counts, transferring energy, and responding to conditions.",
    rgb: "250, 204, 21",
  },
];

export default function ChemistryHub({ branches, breadcrumbs }: Props) {
  return (
    <SceneFrame
      background={<MolecularReactionBackground />}
      initialScene="elements"
      className="bg-[#020705] text-slate-100 selection:bg-emerald-400/25"
      maxWidthClassName="max-w-[1640px]"
      headerBackground="rgba(2,8,6,0.58)"
      header={
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="Composition · structure · property · energy · reaction"
          eyebrowStyle="dot"
          icon={FlaskConical}
          title={<span>Chemistry</span>}
          subtitle="Chemistry asks how a limited inventory of elements becomes an immense world of substances. Identity comes from nuclei, properties emerge from arrangement, and reactions reorganize matter under physical constraints."
          accentRgb="52, 211, 153"
          titleClassName="font-sans text-[clamp(3rem,5.8vw,6.6rem)] font-semibold leading-[0.82] tracking-[-0.068em] text-[#f3fff8]"
          headerClassName="border-white/[0.08]"
          aside={
            <div className="grid grid-cols-3 border border-emerald-100/[0.12] bg-black/20 font-mono">
              <HeaderMeasure value="7" label="branches" />
              <HeaderMeasure value="118" label="elements" bordered />
              <HeaderMeasure value="3" label="views" />
            </div>
          }
        />
      }
    >
      <section
        data-navigation="chemistry-branch-atlas"
        className="relative isolate mt-10 overflow-hidden border-y border-emerald-100/[0.11] py-7"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,5,0.46),transparent_27%,transparent_74%,rgba(2,7,5,0.38))] backdrop-blur-[5px]" />
        <div className="relative">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
            <div className="rounded-[18px] bg-[#03110b]/[0.24] px-4 py-3 backdrop-blur-[16px]">
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-violet-200/70">
                <Microscope size={14} aria-hidden="true" /> Primary navigation ·
                choose a chemical lens
              </div>
              <h2 className="mt-3 max-w-5xl text-[clamp(2.1rem,4.2vw,4.4rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-white">
                The branches change the dominant systems and questions, not the
                chemical grammar.
              </h2>
            </div>
            <p className="rounded-[16px] bg-[#03110b]/[0.22] px-4 py-3 text-[15px] leading-7 text-slate-300/70 backdrop-blur-[14px]">
              Every branch still connects composition, electronic structure,
              geometry, energy, measurement, and transformation. General and
              Quantum Chemistry are open; five substantive branches remain
              visibly planned.
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {branches.map((branch, index) => (
              <BranchCell key={branch.id} branch={branch} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24">
        <WorldWindow
          eyebrow="Chemical representation bench"
          title="Matter becomes interesting when arrangement starts to matter."
          description="Move from elemental identity to molecular structure to chemical change. The selected scale reorganizes the topology and active specimen while the stable background keeps symbols, particles, measurement, and safety in view."
          scenes={[...WORLD_SCENES]}
        >
          <PartsStructureProcessTopology
            stages={STRUCTURE_STAGES}
            presentation="world"
          />
        </WorldWindow>
      </section>

      <section className="mt-24">
        <Surface variant="glass" className="overflow-hidden rounded-[34px]">
          <div className="grid gap-5 border-b border-white/[0.08] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
            <div>
              <div className="text-emerald-200/72 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em]">
                <Database size={14} aria-hidden="true" /> Elemental repository ·
                PubChem with reviewed fallback
              </div>
              <h2 className="mt-3 text-[clamp(2rem,4vw,4rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
                The periodic table is a property map, not a list to memorize.
              </h2>
            </div>
            <p className="text-[15px] leading-7 text-slate-300/70">
              Atomic number fixes identity. Position exposes repeating electron
              patterns. Search all provider records by name, symbol, number,
              family, period, or standard state, with honest partial and
              fallback states when the provider is unavailable.
            </p>
          </div>

          <ElementExplorer />
        </Surface>
      </section>

      <section className="mt-24">
        <div className="max-w-5xl rounded-[18px] bg-[#03110b]/[0.18] px-4 py-3 backdrop-blur-[14px]">
          <div className="text-cyan-200/72 font-mono text-[11px] font-semibold uppercase tracking-[0.13em]">
            Particle model → symbolic record
          </div>
          <h2 className="mt-3 text-[clamp(2.2rem,4.5vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.058em] text-white">
            Build a structure, then account for every atom when it changes.
          </h2>
          <p className="mt-4 max-w-4xl text-[15px] leading-7 text-slate-300/70">
            Geometry helps explain molecular behavior. A balanced equation
            records how whole formulas relate without allowing elemental counts
            to vanish between the two sides. Neither picture alone shows a full
            reaction mechanism or measured rate.
          </p>
        </div>

        <div className="mt-7 grid gap-5 xl:grid-cols-2">
          <WorldSceneFocus scene="structures">
            <MoleculeViewer />
          </WorldSceneFocus>
          <WorldSceneFocus scene="reactions">
            <ReactionBalancer />
          </WorldSceneFocus>
        </div>
      </section>

      <section className="mt-24">
        <ChemistryEvidenceLab />
      </section>

      <section
        data-source-boundary="chemistry"
        className="mt-24 grid gap-5 border-t border-emerald-100/[0.10] px-1 pt-8 md:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)]"
      >
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-500">
            Source, representation &amp; safety boundary
          </div>
          <p className="mt-3 max-w-4xl text-[13px] leading-6 text-slate-500">
            Element records come from PubChem with IUPAC as the naming and
            atomic-weight reference; the reviewed local spine is a smaller
            fallback, not a complete substitute. Molecular sizes, colors,
            orientations, dipoles, nuclei, and reaction paths are schematic. The
            equation lab conserves elemental counts but does not model
            mechanism, energy, rate, phase, yield, reversibility, or hazards.
            NIST property records are condition-specific, and an educational
            interface never replaces a laboratory&apos;s chemical-hygiene plan,
            training, labels, safety data, controls, or disposal procedures.
          </p>
        </div>
        <div className="flex flex-wrap content-start gap-2 md:justify-end">
          <SourceLink
            href="https://iupac.org/what-we-do/periodic-table-of-elements/"
            label="IUPAC · Periodic Table"
          />
          <SourceLink
            href="https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON"
            label="PubChem · Element provider"
          />
          <SourceLink
            href="https://webbook.nist.gov/chemistry/"
            label="NIST · Chemistry WebBook"
          />
          <SourceLink
            href="https://www.osha.gov/laboratories"
            label="OSHA · Laboratory safety"
          />
        </div>
      </section>
    </SceneFrame>
  );
}

function HeaderMeasure({
  value,
  label,
  bordered = false,
}: {
  value: string;
  label: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`min-w-[82px] px-3 py-3 text-center ${bordered ? "border-x border-emerald-100/[0.10]" : ""}`}
    >
      <strong className="block text-[16px] text-emerald-100/80">{value}</strong>
      <span className="mt-1 block text-[11px] uppercase tracking-[0.08em] text-slate-600">
        {label}
      </span>
    </div>
  );
}

function BranchCell({
  branch,
  index,
}: {
  branch: CurriculumNode;
  index: number;
}) {
  const meta =
    BRANCH_META[branch.id] ?? BRANCH_META["natural.chemistry.general"];
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
          <Icon size={19} aria-hidden="true" />
        </span>
        <span className="text-white/28 font-mono text-[11px]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-6 text-[21px] font-semibold tracking-[-0.035em] text-white">
        {branch.label}
      </h3>
      <p className="text-slate-300/66 mt-3 text-[14px] leading-6">
        {meta.question}
      </p>
      <span
        className="mt-auto flex items-center gap-2 pt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
        style={{ color: `rgba(${meta.rgb},0.74)` }}
      >
        {active ? (
          <>
            enter branch <ArrowRight size={13} aria-hidden="true" />
          </>
        ) : (
          "planned branch"
        )}
      </span>
    </Surface>
  );

  return (
    <WorldSceneFocus scene={meta.scene}>
      {active ? (
        <Link
          href={branch.href}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60"
        >
          {content}
        </Link>
      ) : (
        <div aria-disabled="true">{content}</div>
      )}
    </WorldSceneFocus>
  );
}

function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="hover:border-emerald-100/28 inline-flex items-center gap-2 rounded-full border border-emerald-100/[0.11] bg-black/15 px-4 py-2.5 text-[11px] font-semibold text-emerald-100/60 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60"
    >
      {label} <ExternalLink size={12} aria-hidden="true" />
    </a>
  );
}
