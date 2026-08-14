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
  RefreshCw,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

type AtlasNode = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  href?: string;
  icon: LucideIcon;
  rgb: string;
  mode: PhysicsBackgroundMode;
  x: number;
  y: number;
  size?: "sm" | "md" | "lg";
  planned?: boolean;
};

const MAJOR_NODES: readonly AtlasNode[] = [
  {
    id: "mechanics",
    title: "Mechanics",
    eyebrow: "Classical physics",
    description: "Motion, interactions, momentum, and energy at scales where classical models work well.",
    href: "/natural-science/physics/mechanics",
    icon: Orbit,
    rgb: "251, 146, 60",
    mode: "classical",
    x: 23,
    y: 25,
    size: "lg",
  },
  {
    id: "thermo",
    title: "Thermodynamics",
    eyebrow: "Classical physics",
    description: "Temperature, heat, entropy, equilibrium, and the collective behavior of many particles.",
    href: "/natural-science/physics/thermodynamics",
    icon: Flame,
    rgb: "248, 113, 113",
    mode: "thermo",
    x: 14,
    y: 66,
  },
  {
    id: "electromagnetism",
    title: "Electromagnetism",
    eyebrow: "Classical physics",
    description: "Charge, fields, circuits, magnetism, and electromagnetic radiation as one theory.",
    href: "/natural-science/physics/electromagnetism",
    icon: Zap,
    rgb: "34, 211, 238",
    mode: "electromagnetism",
    x: 39,
    y: 73,
  },
  {
    id: "waves",
    title: "Waves & Optics",
    eyebrow: "Classical physics",
    description: "Oscillation, interference, sound, light, refraction, diffraction, and image formation.",
    href: "/natural-science/physics/waves-optics",
    icon: Waves,
    rgb: "96, 165, 250",
    mode: "waves",
    x: 39,
    y: 25,
  },
  {
    id: "relativity",
    title: "Relativity",
    eyebrow: "Modern physics",
    description: "Spacetime, invariant laws, high-speed motion, gravity, and curved geometry.",
    href: "/natural-science/physics/relativity",
    icon: Hourglass,
    rgb: "167, 139, 250",
    mode: "relativity",
    x: 63,
    y: 24,
  },
  {
    id: "quantum",
    title: "Quantum Physics",
    eyebrow: "Modern physics",
    description: "States, probability amplitudes, measurement, uncertainty, and quantized behavior.",
    href: "/natural-science/physics/quantum-mechanics",
    icon: Atom,
    rgb: "232, 121, 249",
    mode: "quantum",
    x: 82,
    y: 27,
    size: "lg",
  },
  {
    id: "atomic",
    title: "Atomic Physics",
    eyebrow: "Modern physics",
    description: "Electron structure, spectra, energy levels, transitions, and atom-light interactions.",
    href: "/natural-science/physics/atomic",
    icon: RefreshCw,
    rgb: "52, 211, 153",
    mode: "atomic",
    x: 84,
    y: 65,
  },
  {
    id: "nuclear",
    title: "Nuclear Physics",
    eyebrow: "Modern physics",
    description: "Nuclei, binding, decay, fission, fusion, and nuclear reactions.",
    href: "/natural-science/physics/nuclear",
    icon: Microscope,
    rgb: "244, 114, 182",
    mode: "nuclear",
    x: 64,
    y: 73,
  },
] as const;

const MECHANICS_CHILDREN: readonly AtlasNode[] = [
  {
    id: "motion",
    title: "Motion",
    eyebrow: "Mechanics",
    description: "Describe position, velocity, and acceleration before asking what caused the change.",
    href: "/natural-science/physics/motion",
    icon: MoveRight,
    rgb: "251, 146, 60",
    mode: "motion",
    x: 12,
    y: 36,
    size: "sm",
  },
  {
    id: "forces",
    title: "Forces",
    eyebrow: "Mechanics",
    description: "Model the interactions that push, pull, constrain, or redirect a system.",
    icon: Gauge,
    rgb: "250, 204, 21",
    mode: "classical",
    x: 22,
    y: 47,
    size: "sm",
    planned: true,
  },
  {
    id: "energy",
    title: "Energy",
    eyebrow: "Mechanics",
    description: "Track transfer and conservation without following every instant of the motion.",
    icon: Activity,
    rgb: "45, 212, 191",
    mode: "classical",
    x: 33,
    y: 39,
    size: "sm",
    planned: true,
  },
] as const;

const ALL_NODES = [...MAJOR_NODES, ...MECHANICS_CHILDREN] as const;

export default function PhysicsPage() {
  const [backgroundMode, setBackgroundMode] = useState<PhysicsBackgroundMode>("overview");
  const [activeId, setActiveId] = useState<string>("mechanics");
  const active = ALL_NODES.find((node) => node.id === activeId) ?? MAJOR_NODES[0];

  function activate(node: AtlasNode) {
    setActiveId(node.id);
    setBackgroundMode(node.mode);
  }

  function release() {
    setBackgroundMode("overview");
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03070d] text-slate-100 selection:bg-cyan-400/25">
      <PhysicsBackground mode={backgroundMode} />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 xl:px-8">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Natural Science", href: "/natural-science" },
            { label: "Physics" },
          ]}
          eyebrow="Models of matter, change, and interaction"
          icon={Atom}
          title={<span>Physics</span>}
          subtitle="A map of the physical world, organized by the kinds of systems we study and the models needed to describe them. Follow the hierarchy inward rather than treating every topic as an equal-sized box."
          accentRgb="56, 189, 248"
          titleClassName="font-mono text-[clamp(2.8rem,5vw,5.5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.058em] text-[#f7fbff]"
          headerClassName="border-white/[0.10]"
          aside={
            <div className="rounded-full border border-cyan-200/[0.10] bg-black/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-cyan-100/65 backdrop-blur-md">
              hover the atlas
            </div>
          }
        />

        <section className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(310px,0.32fr)]">
          <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.10] px-5 py-4 backdrop-blur-md">
            <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-cyan-300/68">A useful first split</div>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-slate-400">
              <span className="text-orange-200/80">Classical Physics</span>
              <span className="text-slate-700">studies familiar scales and continuous models</span>
              <span className="text-slate-700">·</span>
              <span className="text-fuchsia-200/80">Modern Physics</span>
              <span className="text-slate-700">extends the model when speed, gravity, or scale demand it</span>
            </div>
          </div>

          <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.12] px-5 py-4 backdrop-blur-md">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: `rgba(${active.rgb},0.72)` }}>{active.eyebrow}</div>
            <div className="mt-1 flex items-center justify-between gap-3">
              <strong className="text-[14px] text-white">{active.title}</strong>
              {active.planned ? <CircleDashed size={13} className="text-slate-600" /> : <ArrowRight size={13} style={{ color: `rgba(${active.rgb},0.75)` }} />}
            </div>
            <p className="mt-1.5 text-[10px] leading-5 text-slate-500">{active.description}</p>
          </div>
        </section>

        <section className="relative mt-4 overflow-hidden rounded-[34px] border border-white/[0.09] bg-black/[0.055] shadow-[0_34px_110px_rgba(0,0,0,0.24)] backdrop-blur-[2px]">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-5 text-[9px] font-semibold uppercase tracking-[0.18em] sm:px-8">
            <span className="text-orange-200/55">Classical Physics</span>
            <span className="text-cyan-100/28">Physics Atlas</span>
            <span className="text-fuchsia-200/55">Modern Physics</span>
          </div>

          <div className="relative hidden min-h-[660px] lg:block">
            <svg viewBox="0 0 1000 620" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <linearGradient id="classicalLine" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(251,146,60,0.10)" />
                  <stop offset="100%" stopColor="rgba(56,189,248,0.16)" />
                </linearGradient>
                <linearGradient id="modernLine" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(167,139,250,0.13)" />
                  <stop offset="100%" stopColor="rgba(232,121,249,0.15)" />
                </linearGradient>
              </defs>

              <path d="M500 310 C430 260 360 210 230 155" fill="none" stroke="url(#classicalLine)" strokeWidth="1.5" />
              <path d="M500 310 C395 330 270 390 140 410" fill="none" stroke="url(#classicalLine)" strokeWidth="1.2" />
              <path d="M500 310 C410 390 390 450 390 470" fill="none" stroke="url(#classicalLine)" strokeWidth="1.2" />
              <path d="M500 310 C430 230 405 180 390 155" fill="none" stroke="url(#classicalLine)" strokeWidth="1.2" />

              <path d="M500 310 C585 235 610 180 630 150" fill="none" stroke="url(#modernLine)" strokeWidth="1.2" />
              <path d="M500 310 C610 250 720 190 820 170" fill="none" stroke="url(#modernLine)" strokeWidth="1.5" />
              <path d="M500 310 C630 370 735 400 840 400" fill="none" stroke="url(#modernLine)" strokeWidth="1.2" />
              <path d="M500 310 C580 415 610 455 640 470" fill="none" stroke="url(#modernLine)" strokeWidth="1.2" />

              <path d="M230 155 C175 205 140 245 120 275" fill="none" stroke="rgba(251,146,60,0.18)" strokeWidth="1" strokeDasharray="5 7" />
              <path d="M230 155 C225 230 220 265 220 305" fill="none" stroke="rgba(250,204,21,0.15)" strokeWidth="1" strokeDasharray="5 7" />
              <path d="M230 155 C285 215 315 245 330 255" fill="none" stroke="rgba(45,212,191,0.15)" strokeWidth="1" strokeDasharray="5 7" />

              <circle cx="500" cy="310" r="112" fill="none" stroke="rgba(56,189,248,0.07)" strokeWidth="1" />
              <circle cx="500" cy="310" r="176" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" strokeDasharray="2 9" />
              <ellipse cx="230" cy="218" rx="160" ry="145" fill="none" stroke="rgba(251,146,60,0.055)" strokeWidth="1" />
              <ellipse cx="770" cy="280" rx="170" ry="180" fill="none" stroke="rgba(232,121,249,0.05)" strokeWidth="1" />
            </svg>

            <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-200/[0.16] bg-[#05111d]/70 text-center shadow-[0_0_70px_rgba(56,189,248,0.10)] backdrop-blur-xl">
              <Atom size={28} className="text-cyan-200/90" />
              <span className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white">Physics</span>
              <span className="mt-1 text-[8px] text-slate-600">models of reality</span>
            </div>

            {MAJOR_NODES.map((node) => (
              <AtlasNodeView key={node.id} node={node} active={activeId === node.id} onActivate={() => activate(node)} onRelease={release} />
            ))}
            {MECHANICS_CHILDREN.map((node) => (
              <AtlasNodeView key={node.id} node={node} active={activeId === node.id} onActivate={() => activate(node)} onRelease={release} child />
            ))}
          </div>

          <div className="space-y-7 px-5 pb-6 pt-14 lg:hidden">
            <MobileFamily title="Classical Physics" rgb="251, 146, 60">
              <div className="rounded-[22px] border border-orange-200/[0.12] bg-orange-400/[0.025] p-4">
                <MobileNode node={MAJOR_NODES[0]} onActivate={activate} onRelease={release} />
                <div className="ml-5 mt-3 space-y-2 border-l border-orange-200/[0.12] pl-4">
                  {MECHANICS_CHILDREN.map((node) => <MobileNode key={node.id} node={node} onActivate={activate} onRelease={release} small />)}
                </div>
              </div>
              {MAJOR_NODES.slice(1, 4).map((node) => <MobileNode key={node.id} node={node} onActivate={activate} onRelease={release} />)}
            </MobileFamily>

            <MobileFamily title="Modern Physics" rgb="232, 121, 249">
              {MAJOR_NODES.slice(4).map((node) => <MobileNode key={node.id} node={node} onActivate={activate} onRelease={release} />)}
            </MobileFamily>
          </div>
        </section>

        <section className="mt-4 rounded-[24px] border border-white/[0.07] bg-black/[0.10] px-5 py-4 backdrop-blur-md sm:px-6">
          <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">A recurring language</div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px]">
              <span className="text-cyan-300/65">state</span><span className="text-slate-700">→</span>
              <span className="text-orange-300/65">change</span><span className="text-slate-700">→</span>
              <span className="text-yellow-300/65">interaction</span><span className="text-slate-700">→</span>
              <span className="text-emerald-300/65">conservation</span><span className="text-slate-700">→</span>
              <span className="text-violet-300/65">symmetry</span><span className="text-slate-700">→</span>
              <span className="text-fuchsia-300/65">uncertainty</span>
            </div>
          </div>
        </section>

        <div className="pb-8" />
      </div>
    </main>
  );
}

function AtlasNodeView({ node, active, onActivate, onRelease, child = false }: { node: AtlasNode; active: boolean; onActivate: () => void; onRelease: () => void; child?: boolean }) {
  const Icon = node.icon;
  const dimensions = child ? "h-[76px] min-w-[106px]" : node.size === "lg" ? "h-[112px] min-w-[150px]" : "h-[94px] min-w-[134px]";
  const content = (
    <div
      className={`relative flex ${dimensions} -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[50%] border px-4 text-center transition duration-200 ${active ? "scale-105" : "hover:scale-[1.03]"}`}
      style={{
        borderColor: `rgba(${node.rgb},${active ? "0.42" : "0.20"})`,
        background: `radial-gradient(circle at 50% 35%, rgba(${node.rgb},${active ? "0.14" : "0.065"}), rgba(3,8,14,0.72) 70%)`,
        boxShadow: active ? `0 0 54px rgba(${node.rgb},0.18), inset 0 1px 0 rgba(255,255,255,0.04)` : `0 0 28px rgba(${node.rgb},0.055)`,
      }}
    >
      <Icon size={child ? 15 : 20} style={{ color: `rgb(${node.rgb})` }} />
      <strong className={`mt-2 ${child ? "text-[10px]" : "text-[11px]"} font-semibold text-white`}>{node.title}</strong>
      {node.planned ? <span className="mt-1 font-mono text-[7px] uppercase tracking-[0.10em] text-slate-600">planned</span> : null}
    </div>
  );

  const common = {
    onMouseEnter: onActivate,
    onMouseLeave: onRelease,
    onFocus: onActivate,
    onBlur: onRelease,
  };

  return (
    <div className="absolute" style={{ left: `${node.x}%`, top: `${node.y}%` }}>
      {node.href && !node.planned ? (
        <Link href={node.href} aria-label={node.title} {...common}>{content}</Link>
      ) : (
        <button type="button" aria-label={`${node.title} planned`} disabled className="cursor-default" {...common}>{content}</button>
      )}
    </div>
  );
}

function MobileFamily({ title, rgb, children }: { title: string; rgb: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, rgba(${rgb},0.35), transparent)` }} />
        <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em]" style={{ color: `rgba(${rgb},0.72)` }}>{title}</div>
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function MobileNode({ node, onActivate, onRelease, small = false }: { node: AtlasNode; onActivate: (node: AtlasNode) => void; onRelease: () => void; small?: boolean }) {
  const Icon = node.icon;
  const content = (
    <div className={`flex items-center gap-3 rounded-full border bg-black/[0.12] ${small ? "px-3 py-2.5" : "px-4 py-3"}`} style={{ borderColor: `rgba(${node.rgb},0.13)` }}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${node.rgb})`, borderColor: `rgba(${node.rgb},0.22)`, background: `rgba(${node.rgb},0.055)` }}><Icon size={14} /></div>
      <div className="min-w-0 flex-1">
        <strong className="block text-[11px] text-white">{node.title}</strong>
        <span className="mt-0.5 block text-[9px] text-slate-600">{node.description}</span>
      </div>
      {node.planned ? <CircleDashed size={13} className="text-slate-700" /> : <ArrowRight size={13} style={{ color: `rgba(${node.rgb},0.68)` }} />}
    </div>
  );

  return node.href && !node.planned ? (
    <Link href={node.href} onMouseEnter={() => onActivate(node)} onMouseLeave={onRelease}>{content}</Link>
  ) : (
    <div aria-disabled="true">{content}</div>
  );
}
