import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import {
  SceneFrame,
  Surface,
  WorldSceneFocus,
  WorldWindow,
} from "@/app/_page-system/scene";
import QuantumBackground from "./_components/QuantumBackground";
import OrbitalVisualizer from "./_components/OrbitalVisualizer";
import {
  Atom,
  Layers,
  Orbit,
  Radio,
  Sparkles,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ORBITAL_SCENES = [
  {
    id: "1s",
    label: "1s · ground state",
    description:
      "No node and no preferred direction: probability is concentrated around the nucleus.",
    accentRgb: "34, 211, 238",
  },
  {
    id: "2s",
    label: "2s · radial node",
    description:
      "Two probability regions are separated by a radius where the wavefunction is zero.",
    accentRgb: "52, 211, 153",
  },
  {
    id: "2px",
    label: "2pₓ · angular node",
    description:
      "Opposite phase lobes lie along one axis and are separated by a nodal plane.",
    accentRgb: "192, 132, 252",
  },
  {
    id: "2py",
    label: "2pᵧ · orientation",
    description:
      "The same p-state geometry points along a different spatial axis.",
    accentRgb: "244, 114, 182",
  },
] as const;

const MODULES: Array<{
  icon: LucideIcon;
  title: string;
  question: string;
  description: string;
  rgb: string;
  scene: "1s" | "2s" | "2px" | "2py";
}> = [
  {
    icon: Waves,
    title: "Wave-particle behavior",
    question: "Why does interference appear in particle experiments?",
    description:
      "Quantum states propagate and interfere as amplitudes, while individual measurements produce discrete outcomes.",
    rgb: "34, 211, 238",
    scene: "1s",
  },
  {
    icon: Orbit,
    title: "Molecular orbitals",
    question: "How do atomic wavefunctions become bonds?",
    description:
      "Constructive and destructive combinations distribute electron density across more than one nucleus.",
    rgb: "192, 132, 252",
    scene: "2px",
  },
  {
    icon: Radio,
    title: "Spectroscopy",
    question: "How can energy gaps become observable signals?",
    description:
      "Absorption and emission connect quantized states to measured wavelengths, revealing structure without direct sight.",
    rgb: "52, 211, 153",
    scene: "2s",
  },
  {
    icon: Layers,
    title: "Spin & exclusion",
    question: "Why can electrons not all occupy the same state?",
    description:
      "Spin and the Pauli exclusion principle organize electron configurations and therefore periodic chemical behavior.",
    rgb: "244, 114, 182",
    scene: "2py",
  },
];

export default function QuantumChemistryPage() {
  return (
    <SceneFrame
      background={<QuantumBackground />}
      initialScene="1s"
      className="bg-[#010208] text-slate-100 selection:bg-cyan-400/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(1,3,11,0.58)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Natural Science", href: "/natural-science" },
            { label: "Chemistry", href: "/natural-science/chemistry" },
            { label: "Quantum Chemistry" },
          ]}
          eyebrow="Wavefunctions · probability · nodes · energy · bonding"
          eyebrowStyle="dot"
          icon={Orbit}
          title={<span>Quantum Chemistry</span>}
          subtitle="Quantum states replace miniature planetary paths with amplitudes and probability. Their shape, energy, and symmetry explain electronic structure, bonding, and spectroscopy."
          accentRgb="34, 211, 238"
          titleClassName="font-sans text-[clamp(2.5rem,4.7vw,5.25rem)] font-semibold leading-[0.86] tracking-[-0.062em] text-[#f7fbff]"
          headerClassName="border-white/[0.08]"
        />
      }
    >
      <section className="mt-4">
        <WorldWindow
          density="compact"
          eyebrow="Wavefunction observatory"
          title="An orbital is a probability state, not a track."
          description="Change the state and keep its controls, density map, nodes, and explanation in one visual field. Empty regions and phase changes are features of the wavefunction."
          scenes={[...ORBITAL_SCENES]}
        >
          <OrbitalVisualizer compact />
        </WorldWindow>
      </section>

      <section className="mt-10 grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)]">
        <Surface variant="glass" className="rounded-[30px] p-6 sm:p-7">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-cyan-200/72">
            <Waves size={14} /> State evolution
          </div>
          <h2 className="mt-3 text-[clamp(1.9rem,3.5vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
            The Schrödinger equation evolves amplitudes, not hidden classical trajectories.
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-300/72">
            The wavefunction <M>{String.raw`\Psi`}</M> carries the information used to predict measurement probabilities. Its time evolution is determined by the system&apos;s kinetic and potential energy.
          </p>
          <div className="mt-5 overflow-x-auto rounded-[18px] border border-cyan-100/[0.10] bg-black/[0.24] p-5 text-center text-[18px] text-white sm:text-[21px]">
            <M display>{String.raw`i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t)=\hat{H}\Psi(\mathbf{r},t)`}</M>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Concept
              label="State"
              text="The mathematical object containing amplitudes for possible outcomes."
              rgb="34, 211, 238"
            />
            <Concept
              label="Hamiltonian"
              text="The operator representing the system's total energy and constraints."
              rgb="192, 132, 252"
            />
            <Concept
              label="Probability"
              text="The squared magnitude of an amplitude predicts outcome frequency."
              rgb="52, 211, 153"
            />
          </div>
        </Surface>

        <Surface variant="ghost" className="rounded-[30px] p-6 sm:p-7">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-violet-200/72">
            <Zap size={14} /> Measurement limit
          </div>
          <h2 className="mt-3 text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[0.97] tracking-[-0.048em] text-white">
            Uncertainty is built into the state description.
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-slate-300/70">
            Position and momentum are represented by incompatible observables. Sharpening one distribution necessarily broadens the other; this is not merely an instrument defect.
          </p>
          <div className="mt-5 rounded-[18px] border border-violet-100/[0.11] bg-black/[0.24] p-5 text-center text-[21px] text-white">
            <M display>{String.raw`\Delta x\,\Delta p\geq\frac{\hbar}{2}`}</M>
          </div>
          <div className="mt-5 rounded-[16px] border border-white/[0.08] bg-white/[0.018] p-4 text-[14px] leading-6 text-slate-300/68">
            The probability cloud is therefore not a fuzzy drawing of an unknown orbit. It is a map of what the quantum state permits a position measurement to reveal.
          </div>
        </Surface>
      </section>

      <section className="mt-10">
        <div className="max-w-5xl">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-emerald-200/72">
            <Atom size={14} /> From states to chemistry
          </div>
          <h2 className="mt-3 text-[clamp(2rem,4vw,4.2rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
            Quantum structure becomes chemical structure when states interact.
          </h2>
          <p className="mt-4 max-w-4xl text-[15px] leading-7 text-slate-300/70">
            The same framework that shapes one-electron orbitals also explains electron configuration, bonding combinations, allowed transitions, and the spectral fingerprints used to infer molecular structure.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {MODULES.map((module) => (
            <WorldSceneFocus key={module.title} scene={module.scene}>
              <ModuleCard {...module} />
            </WorldSceneFocus>
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function Concept({
  label,
  text,
  rgb,
}: {
  label: string;
  text: string;
  rgb: string;
}) {
  return (
    <div className="rounded-[16px] border border-white/[0.08] bg-black/[0.18] p-4">
      <div
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
        style={{ color: `rgba(${rgb},0.74)` }}
      >
        {label}
      </div>
      <p className="mt-2 text-[13px] leading-6 text-slate-400/72">{text}</p>
    </div>
  );
}

function ModuleCard({
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
      className="flex min-h-[260px] flex-col rounded-[22px] p-5 transition hover:-translate-y-1 hover:bg-black/[0.28]"
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
        <Sparkles size={13} /> conceptual module
      </span>
    </Surface>
  );
}
