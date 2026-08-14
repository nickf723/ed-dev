"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import PhysicsBackground, { type PhysicsBackgroundMode } from "./_components/PhysicsBackground";
import {
  Activity,
  ArrowRight,
  Atom,
  CircleDashed,
  Flame,
  Gauge,
  Hourglass,
  Microscope,
  MoveRight,
  Orbit,
  Radio,
  RefreshCw,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

type PhysicsBranch = {
  id: PhysicsBackgroundMode;
  title: string;
  eyebrow: string;
  description: string;
  question: string;
  href: string;
  icon: LucideIcon;
  rgb: string;
  specimen: string;
};

const BRANCHES: readonly PhysicsBranch[] = [
  {
    id: "classical",
    title: "Classical Mechanics",
    eyebrow: "Everyday scales",
    description: "Motion, forces, momentum, rotation, and energy in systems where classical models work beautifully.",
    question: "How do objects move and interact?",
    href: "/natural-science/physics/classical-mechanics",
    icon: Orbit,
    rgb: "251, 146, 60",
    specimen: "motion · forces · energy",
  },
  {
    id: "thermo",
    title: "Thermodynamics",
    eyebrow: "Energy in crowds",
    description: "Temperature, heat, entropy, equilibrium, and the direction large collections of particles naturally evolve.",
    question: "Which changes can happen, and which way do they go?",
    href: "/natural-science/physics/thermodynamics",
    icon: Flame,
    rgb: "248, 113, 113",
    specimen: "heat · entropy · equilibrium",
  },
  {
    id: "electromagnetism",
    title: "Electromagnetism",
    eyebrow: "Fields & charge",
    description: "Electricity, magnetism, circuits, fields, and electromagnetic radiation as one connected theory.",
    question: "How do charges influence matter across space?",
    href: "/natural-science/physics/electromagnetism",
    icon: Zap,
    rgb: "34, 211, 238",
    specimen: "charge · fields · circuits",
  },
  {
    id: "waves",
    title: "Waves & Optics",
    eyebrow: "Patterns that travel",
    description: "Oscillation, interference, sound, light, reflection, refraction, diffraction, and image formation.",
    question: "How can a disturbance carry information and energy?",
    href: "/natural-science/physics/waves-optics",
    icon: Waves,
    rgb: "96, 165, 250",
    specimen: "waves · light · interference",
  },
  {
    id: "relativity",
    title: "Relativity",
    eyebrow: "Space, time & gravity",
    description: "Special and general relativity, invariant laws, spacetime, gravity, and motion near the speed of light.",
    question: "What stays invariant when observers and spacetime differ?",
    href: "/natural-science/physics/relativity",
    icon: Hourglass,
    rgb: "167, 139, 250",
    specimen: "spacetime · gravity · invariance",
  },
  {
    id: "quantum",
    title: "Quantum Mechanics",
    eyebrow: "Physics of possibility",
    description: "Quantum states, probability amplitudes, measurement, uncertainty, and behavior beyond classical trajectories.",
    question: "What replaces a definite trajectory at tiny scales?",
    href: "/natural-science/physics/quantum-mechanics",
    icon: Atom,
    rgb: "232, 121, 249",
    specimen: "states · probability · measurement",
  },
  {
    id: "nuclear",
    title: "Nuclear Physics",
    eyebrow: "Inside the nucleus",
    description: "Binding energy, radioactivity, nuclear reactions, fission, fusion, and the forces acting inside nuclei.",
    question: "Why are some nuclei stable while others transform?",
    href: "/natural-science/physics/nuclear",
    icon: Microscope,
    rgb: "244, 114, 182",
    specimen: "binding · decay · reactions",
  },
  {
    id: "atomic",
    title: "Atomic Physics",
    eyebrow: "Atoms & light",
    description: "Electron structure, spectra, transitions, quantized energies, and the interaction between atoms and photons.",
    question: "Why do atoms absorb and emit specific energies?",
    href: "/natural-science/physics/atomic",
    icon: RefreshCw,
    rgb: "52, 211, 153",
    specimen: "spectra · levels · photons",
  },
] as const;

const FOUNDATIONS = [
  {
    title: "Motion",
    description: "Start by learning the language used to describe change in position over time.",
    href: "/natural-science/physics/motion",
    icon: MoveRight,
    rgb: "251, 146, 60",
    status: "live",
  },
  {
    title: "Forces",
    description: "Ask what interactions change motion, then build free-body diagrams and Newtonian models.",
    href: "/natural-science/physics/classical-mechanics",
    icon: Gauge,
    rgb: "250, 204, 21",
    status: "partial",
  },
  {
    title: "Energy",
    description: "Track how physical systems change without following every instant of their motion.",
    href: "/natural-science/physics/classical-mechanics",
    icon: Activity,
    rgb: "45, 212, 191",
    status: "partial",
  },
] as const;

export default function PhysicsPage() {
  const [backgroundMode, setBackgroundMode] = useState<PhysicsBackgroundMode>("overview");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#040910] text-slate-100 selection:bg-cyan-400/25">
      <PhysicsBackground mode={backgroundMode} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6 xl:px-8">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Natural Science", href: "/natural-science" },
            { label: "Physics" },
          ]}
          eyebrow="Matter · motion · energy · fields"
          icon={Atom}
          title={<span>Physics</span>}
          subtitle="Build models of how the universe changes, interacts, and constrains what can happen. Start with observable motion, then branch outward into forces, fields, matter, waves, spacetime, and quantum behavior."
          accentRgb="56, 189, 248"
          titleClassName="font-mono text-[clamp(2.8rem,5vw,5.5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.058em] text-[#f7fbff]"
          headerClassName="border-white/[0.10]"
          aside={
            <div className="rounded-full border border-white/[0.08] bg-black/25 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400 backdrop-blur-md">
              hover a field to retune the lab
            </div>
          }
        />

        <section className="mt-4 overflow-hidden rounded-[25px] border border-white/[0.08] bg-black/[0.22] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/70">Throughline</div>
              <h2 className="mt-2 max-w-2xl text-[clamp(1.65rem,3vw,2.5rem)] font-semibold tracking-[-0.04em] text-white">
                Observe a change. Measure it. Build the smallest model that explains it.
              </h2>
              <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-400">
                Physics is less a collection of formulas than a connected modeling language. The same ideas repeat at different scales: state, change, interaction, conservation, symmetry, and uncertainty.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {FOUNDATIONS.map((foundation) => {
                const Icon = foundation.icon;
                return (
                  <Link
                    key={foundation.title}
                    href={foundation.href}
                    onMouseEnter={() => setBackgroundMode(foundation.title === "Motion" ? "motion" : "classical")}
                    onMouseLeave={() => setBackgroundMode("overview")}
                    className="group rounded-[18px] border border-white/[0.06] bg-black/[0.16] p-4 transition hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${foundation.rgb})`, borderColor: `rgba(${foundation.rgb},0.20)`, background: `rgba(${foundation.rgb},0.055)` }}>
                        <Icon size={17} />
                      </div>
                      <ArrowRight size={14} className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-300" />
                    </div>
                    <strong className="mt-4 block text-[13px] text-white">{foundation.title}</strong>
                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">{foundation.description}</p>
                    <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.11em]" style={{ color: `rgba(${foundation.rgb},0.62)` }}>
                      {foundation.status === "live" ? "start here" : "building outward"}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className="mb-3 px-1">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/68">Fields of physics</div>
                <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.025em] text-white">Same universe, different scales and questions.</h2>
              </div>
              <p className="max-w-xl text-[11px] leading-5 text-slate-600">Every destination stays visible even while its lessons are being rebuilt, so this page remains the map for the subject.</p>
            </div>
          </div>

          <nav aria-label="Physics fields" className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {BRANCHES.map((branch, index) => {
              const Icon = branch.icon;
              return (
                <Link
                  key={branch.id}
                  href={branch.href}
                  onMouseEnter={() => setBackgroundMode(branch.id)}
                  onFocus={() => setBackgroundMode(branch.id)}
                  onMouseLeave={() => setBackgroundMode("overview")}
                  onBlur={() => setBackgroundMode("overview")}
                  className="group relative min-h-[214px] overflow-hidden rounded-[22px] border p-5 backdrop-blur-xl transition duration-200 hover:-translate-y-0.5"
                  style={{
                    borderColor: `rgba(${branch.rgb},0.13)`,
                    background: `linear-gradient(145deg, rgba(${branch.rgb},0.052), rgba(2,7,13,0.68))`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[9px] font-semibold" style={{ color: `rgba(${branch.rgb},0.58)` }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${branch.rgb})`, borderColor: `rgba(${branch.rgb},0.18)`, background: `rgba(${branch.rgb},0.045)` }}>
                      <Icon size={17} />
                    </div>
                  </div>

                  <div className="mt-5 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${branch.rgb},0.66)` }}>
                    {branch.eyebrow}
                  </div>
                  <h3 className="mt-1 text-[19px] font-semibold tracking-[-0.025em] text-white">{branch.title}</h3>
                  <p className="mt-2 text-[11px] leading-5 text-slate-500">{branch.description}</p>

                  <div className="mt-4 border-t border-white/[0.05] pt-3">
                    <div className="text-[10px] leading-5 text-slate-400">{branch.question}</div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <span className="font-mono text-[9px]" style={{ color: `rgba(${branch.rgb},0.58)` }}>{branch.specimen}</span>
                      <ArrowRight size={14} className="text-slate-700 transition group-hover:translate-x-1" style={{ color: `rgba(${branch.rgb},0.62)` }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </section>

        <section className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.34fr)]">
          <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.18] px-5 py-4 backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] text-slate-500">
              <span className="text-cyan-300/65">state</span>
              <span>→</span>
              <span className="text-orange-300/65">change</span>
              <span>→</span>
              <span className="text-yellow-300/65">interaction</span>
              <span>→</span>
              <span className="text-emerald-300/65">conservation</span>
              <span>→</span>
              <span className="text-violet-300/65">symmetry</span>
              <span>→</span>
              <span className="text-fuchsia-300/65">uncertainty</span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-[22px] border border-white/[0.06] bg-black/[0.14] px-5 py-4 text-[10px] text-slate-600 backdrop-blur-xl">
            <span className="inline-flex items-center gap-2"><Radio size={12} /> models refine with scale</span>
            <CircleDashed size={13} />
          </div>
        </section>

        <div className="pb-8" />
      </div>
    </main>
  );
}
