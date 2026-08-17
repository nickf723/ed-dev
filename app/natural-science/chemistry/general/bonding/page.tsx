import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import {
  SceneFrame,
  Surface,
  WorldSceneFocus,
  WorldWindow,
} from "@/app/_page-system/scene";
import BondingWorldBackground from "./BondingWorldBackground";
import BondingLab from "./BondingLab";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Boxes,
  CircleDot,
  Gem,
  Grid3X3,
  Hexagon,
  Magnet,
  Network,
  Orbit,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";

const BONDING_SCENES = [
  {
    id: "sharing",
    label: "Shared density",
    description:
      "Treat a covalent bond as electron density distributed across more than one nucleus, with polarity shifting the distribution.",
    accentRgb: "34, 211, 238",
  },
  {
    id: "transfer",
    label: "Ionic separation",
    description:
      "Follow electron transfer, charge separation, electrostatic fields, and the repeating lattice that stabilizes an ionic solid.",
    accentRgb: "250, 204, 21",
  },
  {
    id: "shape",
    label: "Molecular geometry",
    description:
      "Convert electron-domain repulsion into a three-dimensional arrangement and distinguish domain geometry from molecular shape.",
    accentRgb: "192, 132, 252",
  },
  {
    id: "forces",
    label: "Intermolecular forces",
    description:
      "Watch molecular polarity, temporary charge fluctuations, and thermal motion compete to organize collections of molecules.",
    accentRgb: "244, 114, 182",
  },
] as const;

const MODELS: Array<{
  icon: LucideIcon;
  title: string;
  question: string;
  description: string;
  rgb: string;
  scene: "sharing" | "transfer" | "shape" | "forces";
}> = [
  {
    icon: Orbit,
    title: "Electron density",
    question: "Where is negative charge distributed?",
    description:
      "Covalent and polar-covalent models describe a continuum of shared density rather than two unrelated bond categories.",
    rgb: "34, 211, 238",
    scene: "sharing",
  },
  {
    icon: Magnet,
    title: "Electrostatic structure",
    question: "What arrangement best stabilizes separated charge?",
    description:
      "Ionic bonding is a collective lattice interaction. One cation-anion pair is a useful fragment, not the entire crystal.",
    rgb: "250, 204, 21",
    scene: "transfer",
  },
  {
    icon: Hexagon,
    title: "Geometry",
    question: "How do electron domains constrain molecular shape?",
    description:
      "VSEPR organizes domains by repulsion, then removes lone-pair positions when naming the visible molecular geometry.",
    rgb: "192, 132, 252",
    scene: "shape",
  },
  {
    icon: Waves,
    title: "Collective forces",
    question: "How do molecular attractions become bulk properties?",
    description:
      "Dispersion, dipoles, and hydrogen bonding compete with thermal motion to influence boiling, solubility, viscosity, and phase.",
    rgb: "244, 114, 182",
    scene: "forces",
  },
];

export default function BondingPage() {
  return (
    <SceneFrame
      background={<BondingWorldBackground />}
      initialScene="sharing"
      className="bg-[#010508] text-slate-100 selection:bg-cyan-400/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(1,5,9,0.58)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Natural Science", href: "/natural-science" },
            { label: "Chemistry", href: "/natural-science/chemistry" },
            {
              label: "General Chemistry",
              href: "/natural-science/chemistry/general",
            },
            { label: "Bonding & Molecular Structure" },
          ]}
          eyebrow="Density · charge · geometry · polarity · collective forces"
          eyebrowStyle="dot"
          icon={Network}
          title={<span>Bonding &amp; Molecular Structure</span>}
          subtitle="Atoms become chemical structures when electron density, charge, and geometry lower the energy of the whole system. Bond models describe different scales, from shared density between nuclei to lattices, molecular shape, and forces between molecules."
          accentRgb="34, 211, 238"
          titleClassName="font-sans text-[clamp(2.25rem,4.15vw,4.85rem)] font-semibold leading-[0.87] tracking-[-0.06em] text-[#f5fbff]"
          headerClassName="border-white/[0.08]"
        />
      }
    >
      <section className="mt-4">
        <WorldWindow
          density="compact"
          eyebrow="Bonding field laboratory"
          title="A bond is a model of charge distribution and energy."
          description="Keep the selected atoms, controls, visual response, and interpretation together. Change the model scale without pretending that a Lewis line, an ionic pair, a VSEPR shape, and a bulk material are the same object."
          scenes={[...BONDING_SCENES]}
        >
          <BondingLab />
        </WorldWindow>
      </section>

      <section className="mt-9">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-cyan-200/72">
              <CircleDot size={14} /> Four scales of explanation
            </div>
            <h2 className="mt-3 max-w-5xl text-[clamp(2rem,4vw,4.2rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
              The useful model changes when the question changes.
            </h2>
          </div>
          <p className="text-[15px] leading-7 text-slate-300/70">
            No single sketch carries every fact about bonding. Use density for polarity, lattices for ionic solids, domain geometry for shape, and intermolecular networks for bulk properties.
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {MODELS.map((model) => (
            <WorldSceneFocus key={model.title} scene={model.scene}>
              <ModelCard {...model} />
            </WorldSceneFocus>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
        <Surface variant="glass" className="rounded-[30px] p-6 sm:p-7">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-emerald-200/72">
            <Grid3X3 size={14} /> Beyond isolated molecules
          </div>
          <h2 className="mt-3 text-[clamp(1.9rem,3.5vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
            Extended structures create properties no single bond possesses.
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-300/70">
            Materials may repeat ionic attractions, delocalize electrons through a metal, or connect covalent bonds into a network. The repeating structure determines conductivity, hardness, melting behavior, and mechanical response.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <StructureCard
              icon={Gem}
              title="Ionic crystal"
              cue="alternating charge lattice"
              property="high melting point; brittle cleavage"
              rgb="250, 204, 21"
            />
            <StructureCard
              icon={Boxes}
              title="Metallic solid"
              cue="positive cores + delocalized electrons"
              property="conductive; malleable; reflective"
              rgb="96, 165, 250"
            />
            <StructureCard
              icon={Network}
              title="Network covalent"
              cue="continuous covalent framework"
              property="very hard; high thermal stability"
              rgb="52, 211, 153"
            />
          </div>
        </Surface>

        <Surface variant="ghost" className="rounded-[30px] p-6 sm:p-7">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-violet-200/72">
            <Atom size={14} /> Model boundary
          </div>
          <h2 className="mt-3 text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[0.97] tracking-[-0.048em] text-white">
            Lewis structures are ledgers, not photographs.
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-slate-300/70">
            A Lewis structure tracks valence electrons, formal charge, and connectivity. It usually does not show orbital phase, electron correlation, true charge density, resonance weighting, or the motion of nuclei.
          </p>
          <div className="mt-5 space-y-2">
            <BoundaryRow label="Lewis" use="electron bookkeeping and connectivity" />
            <BoundaryRow label="VSEPR" use="idealized domain geometry" />
            <BoundaryRow label="Density / orbitals" use="where electrons are distributed" />
            <BoundaryRow label="Material model" use="collective structure and bulk behavior" />
          </div>
        </Surface>
      </section>

      <nav className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="General chemistry sequence">
        <Link
          href="/natural-science/chemistry/general/atomic-structure"
          className="group rounded-[22px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-md transition hover:border-emerald-200/[0.22] hover:bg-black/[0.28]"
        >
          <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-emerald-200/68">
            <ArrowLeft size={13} /> Previous model
          </span>
          <strong className="mt-3 block text-[20px] text-white">Atomic Structure &amp; Periodicity</strong>
          <span className="mt-2 block text-[13px] leading-5 text-slate-400/70">
            Return to the nuclei and electron configurations that make bonding possible.
          </span>
        </Link>
        <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.12] p-5 opacity-70">
          <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-amber-200/62">
            Next model <ArrowRight size={13} />
          </span>
          <strong className="mt-3 block text-[20px] text-white">Stoichiometry &amp; Reactions</strong>
          <span className="mt-2 block text-[13px] leading-5 text-slate-400/70">
            Count structures and follow how conserved atoms are rearranged through chemical equations.
          </span>
        </div>
      </nav>
    </SceneFrame>
  );
}

function ModelCard({
  icon: Icon,
  title,
  question,
  description,
  rgb,
}: {
  icon: LucideIcon;
  title: string;
  question: string;
  description: string;
  rgb: string;
}) {
  return (
    <Surface
      variant="ghost"
      className="flex min-h-[250px] flex-col rounded-[22px] p-5 transition hover:-translate-y-1 hover:bg-black/[0.28]"
      style={{ borderColor: `rgba(${rgb},0.16)` }}
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-[14px] border"
        style={{
          color: `rgb(${rgb})`,
          borderColor: `rgba(${rgb},0.28)`,
          background: `rgba(${rgb},0.055)`,
        }}
      >
        <Icon size={18} />
      </span>
      <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.035em] text-white">{title}</h3>
      <strong className="mt-3 block text-[13px] leading-5 text-slate-200/82">{question}</strong>
      <p className="mt-2 text-[14px] leading-6 text-slate-400/70">{description}</p>
      <span
        className="mt-auto flex items-center gap-2 pt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
        style={{ color: `rgba(${rgb},0.72)` }}
      >
        <Sparkles size={13} /> focus model
      </span>
    </Surface>
  );
}

function StructureCard({
  icon: Icon,
  title,
  cue,
  property,
  rgb,
}: {
  icon: LucideIcon;
  title: string;
  cue: string;
  property: string;
  rgb: string;
}) {
  return (
    <div className="rounded-[18px] border border-white/[0.08] bg-black/[0.17] p-4">
      <Icon size={18} style={{ color: `rgb(${rgb})` }} />
      <h3 className="mt-3 text-[17px] font-semibold text-white">{title}</h3>
      <div className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.07em]" style={{ color: `rgba(${rgb},0.68)` }}>
        {cue}
      </div>
      <p className="mt-2 text-[13px] leading-5 text-slate-400/70">{property}</p>
    </div>
  );
}

function BoundaryRow({ label, use }: { label: string; use: string }) {
  return (
    <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 rounded-[14px] border border-white/[0.07] bg-black/[0.16] p-3">
      <strong className="text-[13px] text-violet-100">{label}</strong>
      <span className="text-[13px] leading-5 text-slate-400/72">{use}</span>
    </div>
  );
}
