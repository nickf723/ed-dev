import DomainPageHeader from "@/app/_components/DomainPageHeader";
import {
  SceneFrame,
  Surface,
  WorldSceneFocus,
  WorldWindow,
} from "@/app/_page-system/scene";
import AtomicStructureBackground from "./AtomicStructureBackground";
import AtomicStructureLab from "./AtomicStructureLab";
import {
  Atom,
  Binary,
  CircleDot,
  Orbit,
  Rows3,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ATOMIC_SCENES = [
  {
    id: "identity",
    label: "Nuclear identity",
    description:
      "Change isotope and charge while keeping atomic number visible as the defining identity ledger.",
    accentRgb: "52, 211, 153",
  },
  {
    id: "shells",
    label: "Electron structure",
    description:
      "Follow shell occupancy, valence electrons, ions, and the electronic patterns behind chemical behavior.",
    accentRgb: "34, 211, 238",
  },
  {
    id: "periodicity",
    label: "Periodic organization",
    description:
      "Place the atom in the table and read broad directional trends without treating them as isolated facts.",
    accentRgb: "167, 139, 250",
  },
] as const;

const CONCEPTS: Array<{
  icon: LucideIcon;
  title: string;
  question: string;
  description: string;
  rgb: string;
  scene: "identity" | "shells" | "periodicity";
}> = [
  {
    icon: CircleDot,
    title: "Isotopes preserve identity",
    question: "What can change without creating a new element?",
    description:
      "Changing neutron count changes mass and nuclear stability, but the atom remains the same element while proton number stays fixed.",
    rgb: "52, 211, 153",
    scene: "identity",
  },
  {
    icon: Orbit,
    title: "Ions reorganize electrons",
    question: "Why can charge change chemistry without changing the nucleus?",
    description:
      "Losing or gaining electrons changes net charge and valence structure. The element remains the same because its proton count is unchanged.",
    rgb: "34, 211, 238",
    scene: "shells",
  },
  {
    icon: Rows3,
    title: "Periodicity is repeated structure",
    question: "Why do distant elements show related behavior?",
    description:
      "Recurring outer-electron configurations create families of elements with related bonding tendencies and systematic property trends.",
    rgb: "167, 139, 250",
    scene: "periodicity",
  },
];

export default function AtomicStructurePage() {
  return (
    <SceneFrame
      background={<AtomicStructureBackground />}
      initialScene="identity"
      className="bg-[#010506] text-slate-100 selection:bg-emerald-400/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(1,6,7,0.60)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Natural Science", href: "/natural-science" },
            { label: "Chemistry", href: "/natural-science/chemistry" },
            {
              label: "General Chemistry",
              href: "/natural-science/chemistry/general",
            },
            { label: "Atomic Structure & Periodicity" },
          ]}
          eyebrow="Protons · isotopes · electrons · ions · periodic patterns"
          eyebrowStyle="rule"
          icon={Atom}
          title={<span>Atomic Structure &amp; Periodicity</span>}
          subtitle="Atomic number fixes elemental identity. Neutrons create isotopes, electrons create charge states and bonding possibilities, and repeated outer-electron structure organizes the periodic table."
          accentRgb="52, 211, 153"
          titleClassName="font-sans text-[clamp(2.35rem,4.35vw,5rem)] font-semibold leading-[0.86] tracking-[-0.061em] text-[#f4fffb]"
          headerClassName="border-white/[0.08]"
        />
      }
    >
      <section className="mt-4">
        <WorldWindow
          density="compact"
          eyebrow="Atomic identity workbench"
          title="One atom can be read through three linked ledgers."
          description="Choose an element, change its isotope or charge, and keep the nucleus, electron structure, periodic position, controls, and readouts together in one workbench."
          scenes={[...ATOMIC_SCENES]}
        >
          <AtomicStructureLab />
        </WorldWindow>
      </section>

      <section className="mt-9">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-emerald-200/72">
              <Binary size={14} /> Three linked definitions
            </div>
            <h2 className="mt-3 max-w-5xl text-[clamp(2rem,4vw,4.2rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
              Identity, mass, and charge answer different questions about the same atom.
            </h2>
          </div>
          <Surface variant="ghost" className="rounded-[22px] p-5">
            <div className="grid gap-2 font-mono text-[13px] text-slate-200/76">
              <Definition symbol="Z" meaning="number of protons" rgb="52, 211, 153" />
              <Definition symbol="A" meaning="protons + neutrons" rgb="167, 139, 250" />
              <Definition symbol="q" meaning="protons − electrons" rgb="34, 211, 238" />
            </div>
          </Surface>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {CONCEPTS.map((concept) => (
            <WorldSceneFocus key={concept.title} scene={concept.scene}>
              <ConceptCard {...concept} />
            </WorldSceneFocus>
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function Definition({
  symbol,
  meaning,
  rgb,
}: {
  symbol: string;
  meaning: string;
  rgb: string;
}) {
  return (
    <div className="grid grid-cols-[42px_minmax(0,1fr)] items-center gap-3 rounded-[13px] border border-white/[0.07] bg-black/[0.16] px-3 py-2.5">
      <strong className="text-center text-[18px]" style={{ color: `rgb(${rgb})` }}>
        {symbol}
      </strong>
      <span>{meaning}</span>
    </div>
  );
}

function ConceptCard({
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
      className="flex min-h-[230px] flex-col rounded-[22px] p-5 transition hover:-translate-y-1 hover:bg-black/[0.28]"
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
      <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.035em] text-white">
        {title}
      </h3>
      <strong className="mt-3 block text-[13px] leading-5 text-slate-200/82">
        {question}
      </strong>
      <p className="mt-2 text-[14px] leading-6 text-slate-400/70">
        {description}
      </p>
      <span
        className="mt-auto flex items-center gap-2 pt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
        style={{ color: `rgba(${rgb},0.72)` }}
      >
        <Sparkles size={13} /> linked model
      </span>
    </Surface>
  );
}
