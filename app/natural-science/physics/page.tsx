"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import PhysicsBackground, { type PhysicsBackgroundMode } from "./_components/PhysicsBackground";
import {
  ArrowRight,
  Atom,
  Flame,
  Hourglass,
  Microscope,
  Orbit,
  RefreshCw,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

type AtlasNode = {
  id: string;
  title: string;
  family: "Classical" | "Modern";
  description: string;
  href: string;
  icon: LucideIcon;
  rgb: string;
  mode: PhysicsBackgroundMode;
  x: number;
  y: number;
  size?: "md" | "lg";
  note: string;
};

const NODES: readonly AtlasNode[] = [
  {
    id: "mechanics",
    title: "Mechanics",
    family: "Classical",
    description: "Motion, interactions, momentum, rotation, and energy at scales where classical models work well.",
    href: "/natural-science/physics/mechanics",
    icon: Orbit,
    rgb: "251, 146, 60",
    mode: "classical",
    x: 20,
    y: 27,
    size: "lg",
    note: "contains Motion · Forces · Energy & Momentum",
  },
  {
    id: "thermo",
    title: "Thermodynamics",
    family: "Classical",
    description: "Temperature, heat, entropy, equilibrium, and the collective behavior of many particles.",
    href: "/natural-science/physics/thermodynamics",
    icon: Flame,
    rgb: "248, 113, 113",
    mode: "thermo",
    x: 13,
    y: 68,
    note: "many-particle behavior",
  },
  {
    id: "electromagnetism",
    title: "Electromagnetism",
    family: "Classical",
    description: "Charge, electric and magnetic fields, circuits, induction, and electromagnetic radiation.",
    href: "/natural-science/physics/electromagnetism",
    icon: Zap,
    rgb: "34, 211, 238",
    mode: "electromagnetism",
    x: 39,
    y: 68,
    note: "charge · fields · radiation",
  },
  {
    id: "waves",
    title: "Waves & Optics",
    family: "Classical",
    description: "Oscillation, interference, sound, light, reflection, refraction, diffraction, and imaging.",
    href: "/natural-science/physics/waves-optics",
    icon: Waves,
    rgb: "96, 165, 250",
    mode: "waves",
    x: 38,
    y: 26,
    note: "patterns that propagate",
  },
  {
    id: "relativity",
    title: "Relativity",
    family: "Modern",
    description: "Spacetime, invariant laws, high-speed motion, gravity, and curved geometry.",
    href: "/natural-science/physics/relativity",
    icon: Hourglass,
    rgb: "167, 139, 250",
    mode: "relativity",
    x: 63,
    y: 25,
    note: "speed · gravity · spacetime",
  },
  {
    id: "quantum",
    title: "Quantum Physics",
    family: "Modern",
    description: "States, probability amplitudes, quantization, uncertainty, measurement, and nonclassical behavior.",
    href: "/natural-science/physics/quantum-mechanics",
    icon: Atom,
    rgb: "232, 121, 249",
    mode: "quantum",
    x: 82,
    y: 29,
    size: "lg",
    note: "states · amplitudes · measurement",
  },
  {
    id: "atomic",
    title: "Atomic Physics",
    family: "Modern",
    description: "Electron structure, spectra, transitions, energy levels, and atom-light interactions.",
    href: "/natural-science/physics/atomic",
    icon: RefreshCw,
    rgb: "52, 211, 153",
    mode: "atomic",
    x: 83,
    y: 66,
    note: "electrons · spectra · photons",
  },
  {
    id: "nuclear",
    title: "Nuclear Physics",
    family: "Modern",
    description: "Nuclei, binding energy, radioactivity, fission, fusion, and nuclear reactions.",
    href: "/natural-science/physics/nuclear",
    icon: Microscope,
    rgb: "244, 114, 182",
    mode: "nuclear",
    x: 64,
    y: 70,
    note: "binding · decay · reactions",
  },
] as const;

const CONNECTIONS = [
  ["Mechanics", "Relativity", "Classical motion becomes relativistic when speed or gravity can no longer be ignored."],
  ["Waves & Optics", "Electromagnetism", "Light is an electromagnetic wave, so optics and field theory meet directly."],
  ["Thermodynamics", "Atomic Physics", "Temperature and heat emerge from microscopic states and energy exchange."],
  ["Quantum Physics", "Atomic / Nuclear", "Quantum rules organize electron structure, nuclei, spectra, and reactions."],
] as const;

export default function PhysicsPage() {
  const [backgroundMode, setBackgroundMode] = useState<PhysicsBackgroundMode>("overview");
  const [activeId, setActiveId] = useState("mechanics");
  const active = NODES.find((node) => node.id === activeId) ?? NODES[0];

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

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-4 pb-10 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#03070d]/78 px-4 pb-3 pt-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Natural Science", href: "/natural-science" },
              { label: "Physics" },
            ]}
            eyebrow="Models of matter, change, and interaction"
            icon={Atom}
            title={<span>Physics</span>}
            subtitle="A hierarchy of physical models. Enter a field, then follow its children inward rather than jumping directly from Physics to individual lessons."
            accentRgb="56, 189, 248"
            titleClassName="font-mono text-[clamp(2.6rem,4.6vw,5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.058em] text-[#f7fbff]"
            headerClassName="border-white/[0.08]"
            aside={
              <div className="rounded-full border border-cyan-200/[0.12] bg-cyan-400/[0.045] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-cyan-100/70">
                hover to retune the field
              </div>
            }
          />
        </div>

        <section className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.08] px-5 py-4 backdrop-blur-sm">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.11em]">
              <span className="text-orange-200/80">Classical Physics</span>
              <span className="text-slate-700">familiar scales · continuous models</span>
              <span className="text-slate-800">→</span>
              <span className="text-violet-200/80">limits of the classical picture</span>
              <span className="text-slate-800">→</span>
              <span className="text-fuchsia-200/80">Modern Physics</span>
              <span className="text-slate-700">extreme speed · gravity · small scales</span>
            </div>
          </div>

          <div className="rounded-[24px] border px-5 py-4 backdrop-blur-lg" style={{ borderColor: `rgba(${active.rgb},0.18)`, background: `rgba(${active.rgb},0.045)` }}>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: `rgba(${active.rgb},0.74)` }}>{active.family} Physics</div>
            <div className="mt-1 flex items-center justify-between gap-4">
              <strong className="text-[14px] text-white">{active.title}</strong>
              <ArrowRight size={14} style={{ color: `rgba(${active.rgb},0.72)` }} />
            </div>
            <p className="mt-1.5 text-[10px] leading-5 text-slate-400">{active.description}</p>
          </div>
        </section>

        <section className="relative mt-4 overflow-hidden rounded-[36px] border border-white/[0.11] bg-black/[0.025] shadow-[0_40px_120px_rgba(0,0,0,0.22)] backdrop-blur-[1px]">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-7 pt-5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] sm:px-9">
            <span className="text-orange-200/62">Classical Physics</span>
            <span className="text-cyan-100/42">Field Atlas</span>
            <span className="text-fuchsia-200/62">Modern Physics</span>
          </div>

          <div className="relative hidden min-h-[720px] lg:block">
            <svg viewBox="0 0 1000 680" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <linearGradient id="classic" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="rgba(251,146,60,0.26)" /><stop offset="100%" stopColor="rgba(56,189,248,0.11)" /></linearGradient>
                <linearGradient id="modern" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="rgba(167,139,250,0.17)" /><stop offset="100%" stopColor="rgba(232,121,249,0.25)" /></linearGradient>
              </defs>

              <path d="M500 330 C425 260 330 190 205 160" fill="none" stroke="url(#classic)" strokeWidth="1.7" />
              <path d="M500 330 C410 245 395 190 380 165" fill="none" stroke="url(#classic)" strokeWidth="1.2" />
              <path d="M500 330 C390 400 250 455 130 465" fill="none" stroke="url(#classic)" strokeWidth="1.35" />
              <path d="M500 330 C425 430 410 465 395 475" fill="none" stroke="url(#classic)" strokeWidth="1.35" />

              <path d="M500 330 C575 240 610 180 635 160" fill="none" stroke="url(#modern)" strokeWidth="1.3" />
              <path d="M500 330 C630 245 730 185 820 170" fill="none" stroke="url(#modern)" strokeWidth="1.7" />
              <path d="M500 330 C625 420 725 455 835 450" fill="none" stroke="url(#modern)" strokeWidth="1.3" />
              <path d="M500 330 C570 455 610 485 645 480" fill="none" stroke="url(#modern)" strokeWidth="1.3" />

              <path d="M380 165 C410 245 425 280 500 330" fill="none" stroke="rgba(96,165,250,0.14)" strokeDasharray="5 8" />
              <path d="M395 475 C520 510 700 520 835 450" fill="none" stroke="rgba(52,211,153,0.11)" strokeDasharray="5 8" />
              <path d="M820 170 C770 260 720 330 645 480" fill="none" stroke="rgba(232,121,249,0.11)" strokeDasharray="5 8" />

              <circle cx="500" cy="330" r="112" fill="none" stroke="rgba(56,189,248,0.10)" />
              <circle cx="500" cy="330" r="178" fill="none" stroke="rgba(255,255,255,0.035)" strokeDasharray="2 9" />
              <ellipse cx="255" cy="315" rx="205" ry="225" fill="rgba(251,146,60,0.014)" stroke="rgba(251,146,60,0.075)" />
              <ellipse cx="755" cy="320" rx="205" ry="230" fill="rgba(232,121,249,0.012)" stroke="rgba(232,121,249,0.07)" />
            </svg>

            <div className="absolute left-1/2 top-[48.5%] flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-100/[0.20] bg-[#051321]/76 text-center shadow-[0_0_90px_rgba(56,189,248,0.18)] backdrop-blur-xl">
              <Atom size={30} className="text-cyan-100" />
              <span className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Physics</span>
              <span className="mt-1 text-[8px] text-slate-500">measure → model → predict</span>
            </div>

            {NODES.map((node) => (
              <AtlasNodeView key={node.id} node={node} active={activeId === node.id} onActivate={() => activate(node)} onRelease={release} />
            ))}
          </div>

          <div className="grid gap-3 px-5 pb-6 pt-14 sm:grid-cols-2 lg:hidden">
            {NODES.map((node) => <MobileNode key={node.id} node={node} onActivate={() => activate(node)} onRelease={release} />)}
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.08] backdrop-blur-md">
          <div className="grid lg:grid-cols-[280px_1fr]">
            <div className="border-b border-white/[0.06] p-6 lg:border-b-0 lg:border-r">
              <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan-300/68">Scale changes the model</div>
              <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-white">One universe, several useful descriptions.</h2>
              <p className="mt-3 text-[11px] leading-5 text-slate-500">The branches are not isolated subjects. They overlap because the appropriate model depends on scale, speed, energy, and what we choose to measure.</p>
            </div>

            <div className="relative min-h-[240px] overflow-hidden p-6">
              <div className="absolute left-[8%] right-[8%] top-1/2 h-px bg-gradient-to-r from-orange-300/40 via-cyan-300/35 to-fuchsia-300/40" />
              <div className="relative grid min-h-[190px] grid-cols-5 items-center text-center">
                <ScalePoint top label="Everyday" detail="Mechanics" rgb="251, 146, 60" />
                <ScalePoint label="Many particles" detail="Thermodynamics" rgb="248, 113, 113" />
                <ScalePoint top label="Atoms" detail="Atomic Physics" rgb="52, 211, 153" />
                <ScalePoint label="Nuclei" detail="Nuclear Physics" rgb="244, 114, 182" />
                <ScalePoint top label="Quantum states" detail="Quantum Physics" rgb="232, 121, 249" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.78fr]">
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.08] p-6 backdrop-blur-md">
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-violet-300/68">Fields overlap</div>
            <div className="mt-4 divide-y divide-white/[0.055]">
              {CONNECTIONS.map(([left, right, text]) => (
                <div key={`${left}-${right}`} className="grid gap-2 py-3 sm:grid-cols-[150px_20px_150px_1fr] sm:items-center">
                  <span className="font-mono text-[10px] text-slate-300">{left}</span>
                  <span className="text-slate-700">↔</span>
                  <span className="font-mono text-[10px] text-slate-300">{right}</span>
                  <span className="text-[10px] leading-5 text-slate-600">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-cyan-200/[0.10] bg-cyan-400/[0.025] p-6 backdrop-blur-md">
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan-300/70">Shared language</div>
            <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[10px]">
              {[
                ["state", "56, 189, 248"],
                ["change", "251, 146, 60"],
                ["interaction", "250, 204, 21"],
                ["field", "34, 211, 238"],
                ["conservation", "45, 212, 191"],
                ["symmetry", "167, 139, 250"],
                ["probability", "232, 121, 249"],
              ].map(([label, rgb], index, array) => (
                <span key={label} className="contents">
                  <span className="rounded-full border px-3 py-1.5" style={{ borderColor: `rgba(${rgb},0.18)`, color: `rgba(${rgb},0.86)`, background: `rgba(${rgb},0.035)` }}>{label}</span>
                  {index < array.length - 1 ? <span className="text-slate-800">→</span> : null}
                </span>
              ))}
            </div>
            <p className="mt-5 text-[11px] leading-6 text-slate-500">These ideas recur across branches. The hierarchy tells you where a topic lives; the shared language tells you why physics still feels like one subject.</p>
          </div>
        </section>
      </div>
    </main>
  );
}

function AtlasNodeView({ node, active, onActivate, onRelease }: { node: AtlasNode; active: boolean; onActivate: () => void; onRelease: () => void }) {
  const Icon = node.icon;
  const large = node.size === "lg";
  return (
    <Link
      href={node.href}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onMouseLeave={onRelease}
      onBlur={onRelease}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      <div
        className={`relative flex items-center gap-3 rounded-full border backdrop-blur-xl transition duration-200 group-hover:scale-[1.04] ${large ? "min-w-[196px] px-4 py-3.5" : "min-w-[170px] px-3.5 py-3"}`}
        style={{
          borderColor: `rgba(${node.rgb},${active ? "0.42" : "0.20"})`,
          background: `rgba(3,9,16,${active ? "0.88" : "0.72"})`,
          boxShadow: active ? `0 0 42px rgba(${node.rgb},0.20)` : `0 12px 34px rgba(0,0,0,0.18)`,
        }}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${node.rgb})`, borderColor: `rgba(${node.rgb},0.25)`, background: `rgba(${node.rgb},0.08)` }}><Icon size={17} /></span>
        <span className="min-w-0">
          <strong className="block text-[11px] text-white">{node.title}</strong>
          <span className="mt-0.5 block max-w-[150px] truncate font-mono text-[8px]" style={{ color: `rgba(${node.rgb},0.64)` }}>{node.note}</span>
        </span>
      </div>
    </Link>
  );
}

function MobileNode({ node, onActivate, onRelease }: { node: AtlasNode; onActivate: () => void; onRelease: () => void }) {
  const Icon = node.icon;
  return (
    <Link href={node.href} onMouseEnter={onActivate} onMouseLeave={onRelease} className="rounded-[20px] border p-4 backdrop-blur-xl" style={{ borderColor: `rgba(${node.rgb},0.16)`, background: `rgba(${node.rgb},0.035)` }}>
      <div className="flex items-center gap-3"><Icon size={17} style={{ color: `rgb(${node.rgb})` }} /><strong className="text-[12px] text-white">{node.title}</strong></div>
      <p className="mt-2 text-[10px] leading-5 text-slate-500">{node.description}</p>
      <div className="mt-3 font-mono text-[8px]" style={{ color: `rgba(${node.rgb},0.62)` }}>{node.note}</div>
    </Link>
  );
}

function ScalePoint({ top = false, label, detail, rgb }: { top?: boolean; label: string; detail: string; rgb: string }) {
  return (
    <div className={`relative flex h-full flex-col items-center ${top ? "justify-start pt-5" : "justify-end pb-5"}`}>
      <div className="max-w-[130px]">
        <div className="font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: `rgba(${rgb},0.82)` }}>{label}</div>
        <div className="mt-1 text-[9px] text-slate-600">{detail}</div>
      </div>
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#07101a]" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 20px rgba(${rgb},0.55)` }} />
    </div>
  );
}
