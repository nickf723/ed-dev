import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  Flame,
  Gauge,
  Hourglass,
  Microscope,
  Orbit,
  RefreshCw,
  Ruler,
  ScanLine,
  Sparkles,
  Waves,
  Zap,
} from "lucide-react";
import PhysicsEvidenceReview from "./PhysicsEvidenceReview";
import PhysicsMeasurementBench from "./PhysicsMeasurementBench";
import PhysicsRegimeLab from "./PhysicsRegimeLab";
import PhysicsRootBackground from "./PhysicsRootBackground";
import {
  PHYSICS_DEFINING_CONSTANTS,
  PHYSICS_DIRECT_BRANCH_IDS,
  type PhysicsBranchId,
} from "./physicsModel";

const NODE_ID = "natural.physics";

export const metadata: Metadata = {
  title: "Physics | Education Station 64",
  description:
    "Learn physics by defining systems, matching model regimes, measuring change, testing predictions, and navigating mechanics through nuclear physics.",
};

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  question: string;
  rgb: string;
  bank: "familiar" | "extended";
};

const BRANCH_META: Record<PhysicsBranchId, BranchMeta> = {
  "natural.physics.mechanics": {
    icon: Orbit,
    code: "MEC",
    question:
      "How do motion, interactions, energy, and momentum change a physical system?",
    rgb: "251,146,60",
    bank: "familiar",
  },
  "natural.physics.thermodynamics": {
    icon: Flame,
    code: "THM",
    question:
      "How do microscopic possibilities become temperature, heat, work, and macroscopic direction?",
    rgb: "248,113,113",
    bank: "familiar",
  },
  "natural.physics.electromagnetism": {
    icon: Zap,
    code: "EMF",
    question:
      "How do charge, fields, potential, current, magnetism, and radiation fit together?",
    rgb: "34,211,238",
    bank: "familiar",
  },
  "natural.physics.waves-optics": {
    icon: Waves,
    code: "WAV",
    question:
      "How do oscillations propagate, overlap, reflect, refract, diffract, resonate, and form images?",
    rgb: "96,165,250",
    bank: "familiar",
  },
  "natural.physics.relativity": {
    icon: Hourglass,
    code: "REL",
    question:
      "What must change when invariant laws meet high speed, precise clocks, or curved spacetime?",
    rgb: "167,139,250",
    bank: "extended",
  },
  "natural.physics.quantum-mechanics": {
    icon: Sparkles,
    code: "QTM",
    question:
      "How do states, amplitudes, quantization, uncertainty, and measurement determine probabilities?",
    rgb: "232,121,249",
    bank: "extended",
  },
  "natural.physics.atomic": {
    icon: RefreshCw,
    code: "ATM",
    question:
      "How do quantized electrons, photons, spectra, and transitions organize atomic behavior?",
    rgb: "52,211,153",
    bank: "extended",
  },
  "natural.physics.nuclear": {
    icon: Microscope,
    code: "NUC",
    question:
      "How do nuclei bind, decay, split, combine, and transform through nuclear reactions?",
    rgb: "244,114,182",
    bank: "extended",
  },
};

const MODEL_CYCLE = [
  ["01", "Define", "system · boundary · frame"],
  ["02", "Measure", "quantity · unit · uncertainty"],
  ["03", "Model", "assumptions · regime · relation"],
  ["04", "Test", "prediction · residual · revision"],
] as const;

export default function PhysicsPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const directIds = context.children.map((branch) => branch.id);
  if (
    directIds.length !== PHYSICS_DIRECT_BRANCH_IDS.length ||
    directIds.some((id, index) => id !== PHYSICS_DIRECT_BRANCH_IDS[index])
  ) {
    throw new Error("Physics branches must match the curriculum registry");
  }

  const familiar = context.children.filter(
    (branch) => BRANCH_META[branch.id as PhysicsBranchId].bank === "familiar"
  );
  const extended = context.children.filter(
    (branch) => BRANCH_META[branch.id as PhysicsBranchId].bank === "extended"
  );
  const branchRoutes = context.children.map((branch) => ({
    id: branch.id as PhysicsBranchId,
    label: branch.label,
    href: branch.href,
  }));

  return (
    <SceneFrame
      background={<PhysicsRootBackground />}
      className="bg-[#071019] text-slate-100 selection:bg-sky-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(7,16,25,0.50)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="System · scale · interaction · state · prediction · measurement"
          eyebrowStyle="rule"
          icon={Atom}
          title={<span>Physics</span>}
          subtitle="Physics makes the physical world testable. Define a system and reference frame, measure quantities with units and uncertainty, choose a model whose assumptions fit the regime, then compare its prediction with what happens. The equations matter because that full contract travels with them."
          accentRgb="125, 211, 252"
          titleClassName="font-sans text-[clamp(3rem,6vw,6.7rem)] font-semibold leading-[0.82] tracking-[-0.074em] text-[#f0f9ff]"
          headerClassName="border-sky-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-6 border-y border-sky-100/[0.11] py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,25,0.56),transparent_27%,transparent_73%,rgba(7,16,25,0.54))] backdrop-blur-[2px]" />
        <div className="relative">
          <div className="text-sky-200/66 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
            <Gauge size={14} aria-hidden="true" /> Primary navigation · model
            families
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.8vw,3.8rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
            Eight routes share one discipline; their useful boundaries come from
            the system and scale.
          </h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">
            Every destination below is a direct curriculum child. The two banks
            are analytical cues, not extra ontology levels: familiar-scale
            models on the left, extended or specialized regimes on the right.
          </p>

          <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_260px_minmax(0,1fr)]">
            <div className="xl:col-start-1 xl:row-start-1">
              <BranchBank
                label="Familiar-scale toolkits"
                branches={familiar}
                side="left"
              />
            </div>
            <div className="xl:col-start-3 xl:row-start-1">
              <BranchBank
                label="Extended & specialized regimes"
                branches={extended}
                side="right"
              />
            </div>
            <div className="flex flex-col justify-center border-y border-white/[0.08] py-4 xl:col-start-2 xl:row-start-1 xl:border-x xl:border-y-0 xl:px-4 xl:py-0">
              <div className="text-orange-200/58 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">
                Reusable investigation cycle
              </div>
              <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-white/[0.07] bg-white/[0.06] xl:grid-cols-1">
                {MODEL_CYCLE.map(([number, label, detail]) => (
                  <div key={label} className="bg-[#071019]/92 p-3.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-sky-200/40">
                        {number}
                      </span>
                      <strong className="text-white/82 text-[12px]">
                        {label}
                      </strong>
                    </div>
                    <span className="mt-1 block pl-7 font-mono text-[9px] uppercase tracking-[0.07em] text-slate-600">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <PhysicsRegimeLab branches={branchRoutes} />
      </section>

      <section className="mt-20">
        <PhysicsMeasurementBench />
      </section>

      <section className="mt-20 border-t border-sky-100/[0.10] pt-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="text-sky-200/58 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              <Ruler size={14} aria-hidden="true" /> Finite reference collection
              · exact SI definitions
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.9rem,3.4vw,3.3rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
              Some constants are not merely measured numbers; they help define
              the units used to measure everything else.
            </h2>
          </div>
          <p className="text-[13px] leading-6 text-slate-400">
            These four values are exact in the revised SI. Do not copy that
            status onto every physical constant: many CODATA values are
            measured, correlated, uncertain, versioned, and periodically
            adjusted.
          </p>
        </div>

        <div className="mt-6 grid gap-px overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 xl:grid-cols-4">
          {PHYSICS_DEFINING_CONSTANTS.map((constant) => (
            <article key={constant.id} className="bg-[#071019]/94 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="text-orange-200/86 font-serif text-[34px] italic">
                  {constant.symbol}
                </span>
                <span className="border-emerald-200/16 text-emerald-200/58 rounded-full border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.09em]">
                  exact
                </span>
              </div>
              <h3 className="text-white/84 mt-3 text-[13px] font-semibold">
                {constant.name}
              </h3>
              <div className="mt-4 font-mono text-[17px] leading-6 text-sky-100">
                {constant.value}
              </div>
              <div className="text-sky-200/52 mt-1 font-mono text-[11px]">
                {constant.unit}
              </div>
              <p className="mt-4 border-t border-white/[0.07] pt-3 text-[11px] leading-5 text-slate-600">
                {constant.connects}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <PhysicsEvidenceReview />
      </section>

      <section className="bg-[#071019]/48 mt-20 overflow-hidden border-y border-white/[0.09] backdrop-blur-xl">
        <div className="grid lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          <div className="border-b border-white/[0.07] p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <div className="text-orange-200/54 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
              <ScanLine size={14} aria-hidden="true" /> Reference-data boundary
              · future repository
            </div>
            <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
              A constant or spectral line needs its definition, uncertainty,
              version, and query context.
            </h2>
            <p className="mt-4 text-[13px] leading-6 text-slate-400">
              The root makes no render-time provider request. A future physics
              reference adapter can cache official records while retaining
              whether a value is exact or measured, its unit and uncertainty,
              release, correlations, species, ionization stage, wavelength
              convention, observed or derived status, and bibliography.
            </p>
          </div>
          <div className="grid gap-px bg-white/[0.055] sm:grid-cols-2">
            {[
              [
                "NIST · Fundamental Physical Constants",
                "The current reference distinguishes exact SI-defining constants from measured CODATA values and retains adjustment history, units, uncertainty, and correlations.",
                "https://physics.nist.gov/cuu/Constants/",
              ],
              [
                "NIST · Atomic Spectra Database",
                "Query forms expose critically evaluated lines, levels, and ionization energies. Species, charge state, units, wavelength medium, uncertainty, output fields, version, and references must travel with a result.",
                "https://physics.nist.gov/asd",
              ],
            ].map(([label, note, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="bg-[#071019]/94 group px-5 py-6 transition hover:bg-[#0a1723]"
              >
                <strong className="text-white/82 flex items-center justify-between gap-3 text-[12px] transition group-hover:text-sky-100">
                  {label}
                  <ArrowUpRight
                    size={13}
                    className="text-sky-200/40"
                    aria-hidden="true"
                  />
                </strong>
                <span className="mt-3 block text-[11px] leading-5 text-slate-500">
                  {note}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </SceneFrame>
  );
}

function BranchBank({
  label,
  branches,
  side,
}: {
  label: string;
  branches: readonly CurriculumNode[];
  side: "left" | "right";
}) {
  return (
    <nav aria-label={label}>
      <div
        className={`mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 ${
          side === "right" ? "xl:text-right" : ""
        }`}
      >
        {label}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {branches.map((branch) => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </div>
    </nav>
  );
}

function BranchCard({ branch }: { branch: CurriculumNode }) {
  const meta = BRANCH_META[branch.id as PhysicsBranchId];
  const Icon = meta.icon;
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-[13px] border"
          style={{
            color: `rgb(${meta.rgb})`,
            borderColor: `rgba(${meta.rgb},0.24)`,
            background: `rgba(${meta.rgb},0.055)`,
          }}
        >
          <Icon size={18} aria-hidden="true" />
        </span>
        <span
          className="font-mono text-[9px] font-semibold tracking-[0.12em]"
          style={{ color: `rgba(${meta.rgb},0.54)` }}
        >
          {meta.code}
        </span>
      </div>
      <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.025em] text-white">
        {branch.label}
      </h3>
      <p className="mt-2 text-[12px] leading-5 text-slate-400">
        {meta.question}
      </p>
      <span className="mt-auto flex items-center justify-between gap-3 pt-5 font-mono text-[9px] uppercase tracking-[0.09em] text-slate-600">
        {branch.status === "active" ? "Open field" : "Planned field"}
        {branch.status === "active" ? (
          <ArrowRight size={13} aria-hidden="true" />
        ) : (
          <span className="h-2 w-2 rounded-full border border-white/[0.14]" />
        )}
      </span>
    </>
  );

  const className =
    "group flex min-h-[205px] flex-col rounded-[20px] border border-white/[0.08] bg-[#071019]/62 p-5 backdrop-blur-[10px] transition hover:border-white/[0.16] hover:bg-[#0a1723]/76 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60";

  return branch.status === "active" ? (
    <Link href={branch.href} className={className}>
      {content}
    </Link>
  ) : (
    <div className={`${className} opacity-72`}>{content}</div>
  );
}
