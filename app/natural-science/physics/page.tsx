"use client";
import { useState } from "react";
import Link from "next/link";
import PlasmaBackground from "@/app/natural-science/physics/PlasmaBackground";
import { M } from "@/components/Math";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Atom, Flame, Zap, Waves, Hourglass, Microscope, Orbit, 
  ArrowRight, RefreshCw, Sliders
} from "lucide-react";

// --- DOMAIN DATA ---
const domains = [
  {
    id: "classical",
    title: "Classical Mechanics",
    year: "1687",
    desc: "The clockwork universe. Motion, force, and inertia.",
    eq: <M>{'F = \\frac{dp}{dt}'}</M>,
    icon: Orbit,
    href: "/natural-science/physics/classical-mechanics",
    color: "text-orange-400",
    glow: "shadow-orange-500/50",
    fact: "If you removed all the empty space from the atoms that make up every human on Earth, the entire population would fit into an apple."
  },
  {
    id: "thermo",
    title: "Thermodynamics",
    year: "1824",
    desc: "Energy, entropy, and the arrow of time.",
    eq: "dS \\geq 0",
    icon: Flame,
    href: "/natural-science/physics/thermodynamics",
    color: "text-red-400",
    glow: "shadow-red-500/50",
    fact: "You cannot cool anything down to Absolute Zero (-273.15°C). Thermodynamics forbids it."
  },
  {
    id: "electromag",
    title: "Electromagnetism",
    year: "1865",
    desc: "The dance of charges and fields.",
    eq: <M>{"\\nabla \\times B = \\mu_0 J"}</M>,
    icon: Zap,
    href: "/natural-science/physics/electromagnetism",
    color: "text-cyan-400",
    glow: "shadow-cyan-500/50",
    fact: "Light is just an electromagnetic wave. Your eyes are antennas tuned to a specific frequency."
  },
  {
    id: "optics",
    title: "Optics",
    year: "1704",
    desc: "The behavior of light and vision.",
    eq: <M>{"n_1 \\sin \\theta_1 = n_2 \\sin \\theta_2"}</M>,
    icon: Waves,
    href: "/natural-science/physics/waves-optics",
    color: "text-blue-400",
    glow: "shadow-blue-500/50",
    fact: "Photons do not experience time. From a photon's perspective, it is emitted and absorbed instantly."
  },
  {
    id: "relativity",
    title: "Relativity",
    year: "1905",
    desc: "Spacetime, gravity, and the speed of light.",
    eq: <M>{"E = mc^2"}</M>,
    icon: Hourglass,
    href: "/natural-science/physics/relativity",
    color: "text-violet-400",
    glow: "shadow-violet-500/50",
    fact: "Time moves slower near massive objects. Your head is slightly older than your feet."
  },
  {
    id: "quantum",
    title: "Quantum Mechanics",
    year: "1925",
    desc: "Probability, uncertainty, and superposition.",
    eq: <M>{"i\\hbar\\dot{\\Psi} = \\hat{H}\\Psi"}</M>,
    icon: Atom,
    href: "/natural-science/physics/quantum-mechanics",
    color: "text-fuchsia-400",
    glow: "shadow-fuchsia-500/50",
    fact: "Particles can exist in multiple places at once until they are observed."
  },
  {
    id: "nuclear",
    title: "Nuclear Physics",
    year: "1932",
    desc: "The strong force and the heart of matter.",
    eq: <M>{"E = hf"}</M>,
    icon: Microscope,
    href: "/natural-science/physics/nuclear",
    color: "text-pink-400",
    glow: "shadow-pink-500/50",
    fact: "A teaspoon of neutron star material would weigh about 6 billion tons."
  },
  {
    id: "atomic",
    title: "Atomic Physics",
    year: "1913",
    desc: "The structure and behavior of atoms.",
    eq: <M>{"E_n = -13.6 \\frac{Z^2}{n^2} \\text{ eV}"}</M>,
    icon: RefreshCw,
    href: "/natural-science/physics/atomic",
    color: "text-emerald-400",
    glow: "shadow-emerald-500/50",
    fact: "Atoms are 99.9999999% empty space. If the nucleus were the size of a marble, the nearest electron would be about a kilometer away."
  }
];

export default function PhysicsCollider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeScale, setTimeScale] = useState(1); // Reality Distortion
  const active = domains[activeIndex];

  return (
    <main className="relative h-screen w-full bg-black text-white overflow-hidden flex flex-col font-sans selection:bg-white/30">
      
      {/* 1. VISUAL ENGINE (Background) */}
      <PlasmaBackground timeScale={timeScale} />
      
      {/* Overlay Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 px-8 py-6 flex justify-between items-start">
        <div>
           <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
             <h1 className="text-xl font-bold tracking-widest text-white/80">PHYSICS ENGINE</h1>
           </div>
           <p className="text-[10px] font-mono text-neutral-400 mt-1">V.2.0 // HIGH ENERGY</p>
        </div>
        
        {/* REALITY DISTORTION SLIDER */}
        <div className="flex flex-col items-end gap-2 bg-black/40 p-3 rounded-lg border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                <Sliders size={12} /> REALITY DISTORTION
            </div>
            <input 
                type="range" 
                min="0" 
                max="5" 
                step="0.1"
                value={timeScale}
                onChange={(e) => setTimeScale(parseFloat(e.target.value))}
                className="w-32 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer hover:bg-white/40 accent-white"
            />
        </div>
      </header>


      {/* 3. MAIN STAGE (Center Content) */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
         <AnimatePresence mode="wait">
            <motion.div 
                key={active.id}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl w-full"
            >
                <div className="flex flex-col md:flex-row items-center gap-12">
                    
                    {/* Left: Graphic/Icon */}
                    <div className={`
                        relative flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-full 
                        border-4 border-white/10 flex items-center justify-center
                        bg-black/20 backdrop-blur-xl ${active.glow} shadow-[0_0_100px_-20px]
                    `}>
                        <active.icon size={80} className={`text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]`} />
                        
                        {/* Orbiting Decor */}
                        <div className="absolute inset-0 border border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
                    </div>

                    {/* Right: Info */}
                    <div className="text-center md:text-left space-y-6">
                        <div>
                            <span className={`text-xs font-bold px-2 py-1 rounded bg-white/10 border border-white/20 ${active.color}`}>
                                EST. {active.year}
                            </span>
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white mt-4 drop-shadow-xl">
                                {active.title}
                            </h2>
                        </div>
                        
                        <p className="text-2xl text-white/80 font-light leading-relaxed">
                            {active.desc}
                        </p>

                        <div className="py-4">
                            <div className="text-4xl font-serif text-white/50">
                                {typeof active.eq === "string" ? <M>{active.eq}</M> : active.eq}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <Link 
                                href={active.href}
                                className={`
                                    px-8 py-4 rounded-full font-bold text-black bg-white 
                                    hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]
                                    flex items-center gap-2
                                `}
                            >
                                Enter Simulation <ArrowRight size={18} />
                            </Link>

                            <div className="px-6 py-4 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-xs text-white/70 max-w-sm">
                                <span className="font-bold text-white block mb-1">DID YOU KNOW?</span>
                                {active.fact}
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
         </AnimatePresence>
      </div>


      {/* 4. TIMELINE RAIL (Navigation) */}
      <div className="relative z-20 h-32 border-t border-white/10 bg-black/40 backdrop-blur-xl flex items-center overflow-x-auto px-8 gap-4 snap-x">
          {domains.map((d, i) => {
              const isActive = i === activeIndex;
              return (
                  <button
                    key={d.id}
                    onClick={() => setActiveIndex(i)}
                    className={`
                        relative flex-shrink-0 px-6 py-4 rounded-xl border transition-all duration-300 snap-center
                        flex flex-col items-center gap-2 min-w-[140px]
                        ${isActive 
                            ? "bg-white/10 border-white scale-105" 
                            : "bg-transparent border-white/5 hover:bg-white/5 hover:border-white/20 opacity-60 hover:opacity-100"
                        }
                    `}
                  >
                      <d.icon size={20} className={isActive ? "text-white" : d.color} />
                      <span className="text-xs font-bold uppercase tracking-wider">{d.title.split(" ")[0]}</span>
                      {isActive && (
                          <motion.div 
                            layoutId="rail-glow"
                            className="absolute inset-0 rounded-xl bg-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]" 
                          />
                      )}
                  </button>
              );
          })}
      </div>

    </main>
  );
}