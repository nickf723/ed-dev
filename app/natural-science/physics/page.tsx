"use client";
import { useState } from "react";
import Link from "next/link";
import PlasmaBackground from "@/app/natural-science/physics/PlasmaBackground";
import { M } from "@/app/_components/Math";
import { motion, AnimatePresence } from "framer-motion";
import {
  Atom,
  Flame,
  Zap,
  Waves,
  Hourglass,
  Microscope,
  Orbit,
  ArrowRight,
  RefreshCw,
  Sliders,
} from "lucide-react";

const domains = [
  {
    id: "classical",
    title: "Classical Mechanics",
    year: "1687",
    desc: "Motion, forces, momentum, and energy at everyday scales.",
    question: "How does motion change, and what interactions caused the change?",
    concepts: ["motion", "forces", "momentum", "energy"],
    eq: <M>{"F = \\frac{dp}{dt}"}</M>,
    icon: Orbit,
    href: "/natural-science/physics/classical-mechanics",
    startHref: "/natural-science/physics/classical-mechanics/kinematics",
    color: "text-orange-400",
    glow: "shadow-orange-500/50",
    fact: "The same Newtonian framework can describe a tossed ball, a pendulum, and a planet in orbit when speeds and scales stay far from relativistic or quantum extremes.",
  },
  {
    id: "thermo",
    title: "Thermodynamics",
    year: "1824",
    desc: "Energy transfer, temperature, entropy, and equilibrium.",
    question: "Which changes are possible, and which direction will a process naturally run?",
    concepts: ["temperature", "heat", "entropy", "equilibrium"],
    eq: "dS \\geq 0",
    icon: Flame,
    href: "/natural-science/physics/thermodynamics",
    color: "text-red-400",
    glow: "shadow-red-500/50",
    fact: "Absolute zero can be approached, but the third law prevents reaching it through a finite sequence of thermodynamic operations.",
  },
  {
    id: "electromag",
    title: "Electromagnetism",
    year: "1865",
    desc: "Charges, electric and magnetic fields, circuits, and radiation.",
    question: "How do charges create fields, and how do fields move energy and matter?",
    concepts: ["charge", "fields", "circuits", "radiation"],
    eq: <M>{"\\nabla \\times B = \\mu_0 J"}</M>,
    icon: Zap,
    href: "/natural-science/physics/electromagnetism",
    color: "text-cyan-400",
    glow: "shadow-cyan-500/50",
    fact: "Visible light, radio, microwaves, ultraviolet, and X-rays are all electromagnetic radiation with different frequencies and wavelengths.",
  },
  {
    id: "optics",
    title: "Waves & Optics",
    year: "1704",
    desc: "Oscillation, interference, sound, light, and image formation.",
    question: "How does a disturbance carry energy, combine with other waves, and interact with boundaries?",
    concepts: ["waves", "interference", "refraction", "images"],
    eq: <M>{"n_1 \\sin \\theta_1 = n_2 \\sin \\theta_2"}</M>,
    icon: Waves,
    href: "/natural-science/physics/waves-optics",
    color: "text-blue-400",
    glow: "shadow-blue-500/50",
    fact: "A prism separates white light because different wavelengths refract by different amounts inside the material.",
  },
  {
    id: "relativity",
    title: "Relativity",
    year: "1905",
    desc: "Spacetime, high-speed motion, gravity, and invariant laws.",
    question: "What stays the same when observers move differently or spacetime itself curves?",
    concepts: ["spacetime", "invariants", "gravity", "causality"],
    eq: <M>{"E = mc^2"}</M>,
    icon: Hourglass,
    href: "/natural-science/physics/relativity",
    color: "text-violet-400",
    glow: "shadow-violet-500/50",
    fact: "Satellite navigation systems need relativistic clock corrections because orbital speed and weaker gravity both shift the rate at which satellite clocks tick.",
  },
  {
    id: "quantum",
    title: "Quantum Mechanics",
    year: "1925",
    desc: "States, probability amplitudes, quantization, and measurement.",
    question: "How do physical systems behave when classical trajectories stop being enough?",
    concepts: ["states", "probability", "quantization", "measurement"],
    eq: <M>{"i\\hbar\\dot{\\Psi} = \\hat{H}\\Psi"}</M>,
    icon: Atom,
    href: "/natural-science/physics/quantum-mechanics",
    color: "text-fuchsia-400",
    glow: "shadow-fuchsia-500/50",
    fact: "Quantum states can exist in superpositions, while measurements produce outcomes according to probabilities encoded by the state.",
  },
  {
    id: "nuclear",
    title: "Nuclear Physics",
    year: "1932",
    desc: "Nuclei, radioactivity, binding energy, fission, and fusion.",
    question: "What holds atomic nuclei together, and how can nuclei transform into new ones?",
    concepts: ["nuclei", "binding", "decay", "reactions"],
    eq: <M>{"E = \\Delta mc^2"}</M>,
    icon: Microscope,
    href: "/natural-science/physics/nuclear",
    color: "text-pink-400",
    glow: "shadow-pink-500/50",
    fact: "Nuclear reactions release energy when the final products have greater binding energy per nucleon, with the mass difference appearing as released energy.",
  },
  {
    id: "atomic",
    title: "Atomic Physics",
    year: "1913",
    desc: "Electron structure, spectra, transitions, and atom-light interactions.",
    question: "Why do atoms absorb and emit only particular energies of light?",
    concepts: ["electrons", "spectra", "energy levels", "photons"],
    eq: <M>{"E_n = -13.6 \\frac{Z^2}{n^2} \\text{ eV}"}</M>,
    icon: RefreshCw,
    href: "/natural-science/physics/atomic",
    color: "text-emerald-400",
    glow: "shadow-emerald-500/50",
    fact: "Atoms produce characteristic spectra because bound electrons can change only between allowed energy states, absorbing or emitting matching photon energies.",
  },
];

export default function PhysicsCollider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeScale, setTimeScale] = useState(1);
  const active = domains[activeIndex];

  return (
    <main className="relative h-screen w-full bg-black text-white overflow-hidden flex flex-col font-sans selection:bg-white/30">
      <PlasmaBackground timeScale={timeScale} />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      <header className="relative z-20 px-6 py-5 md:px-8 md:py-6 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <h1 className="text-xl font-bold tracking-widest text-white/80">PHYSICS ENGINE</h1>
          </div>
          <p className="text-[10px] font-mono text-neutral-400 mt-1">V.2.1 // MODEL REALITY</p>
        </div>

        <div className="flex flex-col items-end gap-2 bg-black/40 p-3 rounded-lg border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <Sliders size={12} /> REALITY DISTORTION
          </div>
          <input
            aria-label="Reality distortion"
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={timeScale}
            onChange={(event) => setTimeScale(parseFloat(event.target.value))}
            className="w-32 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer hover:bg-white/40 accent-white"
          />
        </div>
      </header>

      <div className="relative z-10 flex-1 flex items-center justify-center px-5 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl w-full"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
              <div className={`relative flex-shrink-0 w-36 h-36 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full border-4 border-white/10 flex items-center justify-center bg-black/20 backdrop-blur-xl ${active.glow} shadow-[0_0_100px_-20px]`}>
                <active.icon size={72} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                <div className="absolute inset-0 border border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
              </div>

              <div className="text-center md:text-left space-y-4 lg:space-y-5 min-w-0">
                <div>
                  <span className={`text-xs font-bold px-2 py-1 rounded bg-white/10 border border-white/20 ${active.color}`}>
                    EST. {active.year}
                  </span>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white mt-3 drop-shadow-xl">
                    {active.title}
                  </h2>
                </div>

                <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
                  {active.desc}
                </p>

                <div className="hidden md:block rounded-2xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-md">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/35">Core question</div>
                  <div className="mt-1 text-sm text-white/75">{active.question}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.concepts.map((concept) => (
                      <span key={concept} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.08em] text-white/45">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:block py-1">
                  <div className="text-3xl font-serif text-white/50">
                    {typeof active.eq === "string" ? <M>{active.eq}</M> : active.eq}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-3 items-center md:items-start lg:items-center">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <Link
                      href={active.href}
                      className="px-6 py-3 rounded-full font-bold text-black bg-white hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] flex items-center gap-2 text-sm"
                    >
                      Enter Domain <ArrowRight size={16} />
                    </Link>
                    {active.startHref ? (
                      <Link
                        href={active.startHref}
                        className="px-4 py-3 rounded-full border border-orange-300/20 bg-orange-400/[0.08] text-xs font-semibold text-orange-100 hover:bg-orange-400/[0.13] transition-colors"
                      >
                        Start with motion
                      </Link>
                    ) : null}
                  </div>

                  <div className="hidden xl:block px-5 py-3 rounded-2xl border border-white/20 bg-black/20 backdrop-blur-md text-[10px] leading-4 text-white/60 max-w-md">
                    <span className="font-bold text-white/85 block mb-1">FIELD NOTE</span>
                    {active.fact}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-20 h-28 md:h-32 border-t border-white/10 bg-black/40 backdrop-blur-xl flex items-center overflow-x-auto px-6 md:px-8 gap-4 snap-x">
        {domains.map((domain, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative flex-shrink-0 px-5 py-3 md:px-6 md:py-4 rounded-xl border transition-all duration-300 snap-center flex flex-col items-center gap-2 min-w-[132px] md:min-w-[140px] ${isActive ? "bg-white/10 border-white scale-105" : "bg-transparent border-white/5 hover:bg-white/5 hover:border-white/20 opacity-60 hover:opacity-100"}`}
            >
              <domain.icon size={20} className={isActive ? "text-white" : domain.color} />
              <span className="text-xs font-bold uppercase tracking-wider">{domain.title.split(" ")[0]}</span>
              {isActive ? (
                <motion.div
                  layoutId="rail-glow"
                  className="absolute inset-0 rounded-xl bg-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </main>
  );
}
