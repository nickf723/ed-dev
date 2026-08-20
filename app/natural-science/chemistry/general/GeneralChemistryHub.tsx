"use client";

import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface, WorldSceneFocus, WorldWindow } from "@/app/_page-system/scene";
import GeneralChemistryBackground from "./GeneralChemistryBackground";
import ReactionConditionsLab from "./ReactionConditionsLab";
import {
  ArrowRight,
  Atom,
  BatteryCharging,
  Boxes,
  CircleGauge,
  Droplets,
  Flame,
  FlaskConical,
  Gauge,
  Scale,
  Sparkles,
  Timer,
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
  scene: "inventory" | "energy" | "rate" | "equilibrium";
  cue: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "natural.chemistry.general.atomic": {
    icon: Atom,
    rgb: "52, 211, 153",
    scene: "inventory",
    cue: "Identity, isotopes, electrons, periodicity, and recurring elemental properties.",
  },
  "natural.chemistry.general.bonding": {
    icon: Boxes,
    rgb: "34, 211, 238",
    scene: "inventory",
    cue: "Bonding, geometry, polarity, intermolecular forces, and structure-property relationships.",
  },
  "natural.chemistry.general.stoichiometry": {
    icon: Scale,
    rgb: "250, 204, 21",
    scene: "energy",
    cue: "Moles, equations, limiting reactants, solutions, yield, and quantitative conservation.",
  },
  "natural.chemistry.general.thermochemistry": {
    icon: Flame,
    rgb: "251, 146, 60",
    scene: "energy",
    cue: "Energy transfer, enthalpy, calorimetry, entropy, and process direction.",
  },
  "natural.chemistry.general.kinetics-equilibrium": {
    icon: Timer,
    rgb: "192, 132, 252",
    scene: "rate",
    cue: "Rates, mechanisms, activation energy, catalysts, reversibility, and equilibrium shifts.",
  },
  "natural.chemistry.general.acids-bases": {
    icon: Droplets,
    rgb: "34, 211, 238",
    scene: "equilibrium",
    cue: "Proton transfer, pH, buffers, titration, and linked acid-base equilibria.",
  },
  "natural.chemistry.general.electrochemistry": {
    icon: BatteryCharging,
    rgb: "244, 114, 182",
    scene: "equilibrium",
    cue: "Oxidation, reduction, cell potentials, batteries, electrolysis, and electron flow.",
  },
};

const WORLD_SCENES = [
  {
    id: "inventory",
    label: "Inventory",
    description: "Count the particles, elements, charge, and possible arrangements present in the system.",
    accentRgb: "52, 211, 153",
  },
  {
    id: "energy",
    label: "Energy landscape",
    description: "Read activation barriers, thermal distributions, and the energetic difference between states.",
    accentRgb: "250, 204, 21",
  },
  {
    id: "rate",
    label: "Collision & rate",
    description: "Change encounter frequency, energy, and pathway to alter how quickly the system evolves.",
    accentRgb: "192, 132, 252",
  },
  {
    id: "equilibrium",
    label: "Dynamic equilibrium",
    description: "Follow forward and reverse processes that continue even when macroscopic amounts stabilize.",
    accentRgb: "34, 211, 238",
  },
] as const;

export default function GeneralChemistryHub({ branches }: Props) {
  return (
    <SceneFrame
      background={<GeneralChemistryBackground />}
      initialScene="rate"
      className="bg-[#020607] text-slate-100 selection:bg-emerald-400/25"
      maxWidthClassName="max-w-[1640px]"
      headerBackground="rgba(2,7,8,0.58)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Natural Science", href: "/natural-science" },
            { label: "Chemistry", href: "/natural-science/chemistry" },
            { label: "General Chemistry" },
          ]}
          eyebrow="Particles · ledgers · conditions · energy · time"
          eyebrowStyle="rule"
          icon={FlaskConical}
          title={<span>General Chemistry</span>}
          subtitle="General chemistry is the control room for chemical systems. It connects what is present, how particles are arranged, which transformations are possible, how fast they occur, and where reversible processes settle."
          accentRgb="52, 211, 153"
          titleClassName="font-sans text-[clamp(2.7rem,5.5vw,6.1rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f4fffb]"
          headerClassName="border-white/[0.08]"
        />
      }
    >
      <section className="mt-6">
        <WorldWindow
          eyebrow="Chemical system console"
          title="The equation is only one frame of a moving system."
          description="Change temperature, concentration, pathway, and reversibility. The chamber separates four questions that are often collapsed together: what exists, whether change is energetically accessible, how quickly it proceeds, and where the system accumulates."
          scenes={[...WORLD_SCENES]}
        >
          <ReactionConditionsLab />
        </WorldWindow>
      </section>

      <section className="mt-12">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-cyan-200/72">
              <CircleGauge size={14} /> Seven control stations
            </div>
            <h2 className="mt-3 max-w-5xl text-[clamp(2.2rem,4.5vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.058em] text-white">
              Each branch holds one part of the same chemical system steady.
            </h2>
          </div>
          <p className="text-[15px] leading-7 text-slate-300/70">
            Atomic structure defines the inventory. Bonding creates the species. Stoichiometry counts them. Thermochemistry and kinetics describe possible pathways. Equilibrium, acid-base chemistry, and electrochemistry reveal coupled flows.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {branches.map((branch, index) => (
            <BranchStation key={branch.id} branch={branch} index={index} />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <Surface variant="glass" className="rounded-[32px] p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-amber-200/72">
            <Scale size={14} /> Three ledgers
          </div>
          <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.7rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
            A valid chemical story balances matter, charge, and energy at the same time.
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-300/70">
            Conservation does not mean the system looks unchanged. It means every nucleus and unit of charge remains accounted for while energy moves between chemical structure, motion, radiation, and the surroundings.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <Ledger
              icon={Atom}
              label="Matter"
              question="Where did every nucleus go?"
              text="Balance elements and count particles through moles, formulas, and stoichiometric ratios."
              rgb="52, 211, 153"
            />
            <Ledger
              icon={Sparkles}
              label="Charge"
              question="Where did every electron or proton go?"
              text="Track ions, oxidation states, proton transfer, and electron transfer through the system."
              rgb="34, 211, 238"
            />
            <Ledger
              icon={Flame}
              label="Energy"
              question="What became more or less available?"
              text="Follow enthalpy, entropy, activation barriers, heat, work, and stored chemical potential."
              rgb="250, 204, 21"
            />
          </div>
        </Surface>

        <Surface variant="ghost" className="rounded-[32px] p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-violet-200/72">
            <Gauge size={14} /> Four questions, one system
          </div>
          <div className="mt-5 space-y-3">
            <QuestionRow number="01" title="What is present?" answer="Identity, amount, state, concentration, and charge." rgb="52, 211, 153" />
            <QuestionRow number="02" title="What can happen?" answer="Allowed products, energetic direction, and accessible pathways." rgb="250, 204, 21" />
            <QuestionRow number="03" title="How fast?" answer="Collision frequency, mechanism, activation energy, and catalysts." rgb="192, 132, 252" />
            <QuestionRow number="04" title="Where does it settle?" answer="Forward and reverse rates, equilibrium position, and external constraints." rgb="34, 211, 238" />
          </div>
        </Surface>
      </section>
    </SceneFrame>
  );
}

function BranchStation({ branch, index }: { branch: Branch; index: number }) {
  const meta = BRANCH_META[branch.id] ?? BRANCH_META["natural.chemistry.general.atomic"];
  const Icon = meta.icon;
  const active = branch.status !== "placeholder";
  const card = (
    <Surface
      variant="ghost"
      className={`group flex min-h-[270px] flex-col rounded-[24px] p-5 transition ${
        active ? "hover:-translate-y-1 hover:bg-black/[0.28]" : "opacity-[0.58]"
      }`}
      style={{ borderColor: `rgba(${meta.rgb},${active ? 0.18 : 0.10})` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-[15px] border"
          style={{
            color: `rgb(${meta.rgb})`,
            borderColor: `rgba(${meta.rgb},0.28)`,
            background: `rgba(${meta.rgb},0.055)`,
          }}
        >
          <Icon size={19} />
        </span>
        <span className="font-mono text-[11px] text-white/30">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-6 text-[21px] font-semibold tracking-[-0.035em] text-white">
        {branch.label}
      </h3>
      <p className="mt-3 text-[14px] leading-6 text-slate-300/66">{meta.cue}</p>
      <span
        className="mt-auto flex items-center gap-2 pt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
        style={{ color: `rgba(${meta.rgb},0.76)` }}
      >
        {active ? (
          <>
            open station <ArrowRight size={13} />
          </>
        ) : (
          "planned station"
        )}
      </span>
    </Surface>
  );

  return (
    <WorldSceneFocus scene={meta.scene}>
      {active ? <Link href={branch.href}>{card}</Link> : <div aria-disabled="true">{card}</div>}
    </WorldSceneFocus>
  );
}

function Ledger({
  icon: Icon,
  label,
  question,
  text,
  rgb,
}: {
  icon: LucideIcon;
  label: string;
  question: string;
  text: string;
  rgb: string;
}) {
  return (
    <div className="rounded-[19px] border border-white/[0.08] bg-black/[0.18] p-5">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-[14px] border"
        style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.25)`, background: `rgba(${rgb},0.05)` }}
      >
        <Icon size={18} />
      </span>
      <h3 className="mt-4 text-[20px] font-semibold text-white">{label}</h3>
      <strong className="mt-2 block text-[13px] text-slate-200/82">{question}</strong>
      <p className="mt-2 text-[13px] leading-6 text-slate-400/70">{text}</p>
    </div>
  );
}

function QuestionRow({
  number,
  title,
  answer,
  rgb,
}: {
  number: string;
  title: string;
  answer: string;
  rgb: string;
}) {
  return (
    <div className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 rounded-[17px] border border-white/[0.08] bg-black/[0.18] p-4">
      <span className="font-mono text-[11px] font-semibold" style={{ color: `rgba(${rgb},0.72)` }}>
        {number}
      </span>
      <div>
        <strong className="text-[15px] text-white">{title}</strong>
        <p className="mt-1 text-[13px] leading-5 text-slate-400/72">{answer}</p>
      </div>
    </div>
  );
}
