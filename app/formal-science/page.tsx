"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import GameOfLifeBackground from "@/app/formal-science/GameOfLifeBackground";
import {
  Binary,
  Key,
  Calculator,
  Network,
  Terminal,
  ArrowRight,
  Cpu,
  Infinity as InfinityIcon,
  ShieldCheck,
  Database,
  Signal,
  Sparkles,
  Activity,
  Search,
  Route,
} from "lucide-react";

type Module = {
  title: string;
  href: string;
  icon: any;
  stat: string;
};

type Layer = {
  id: string;
  label: string;
  title: string;
  desc: string;
  icon: any;
  radius: number;
  speed: number;
  modules: Module[];
  ui: {
    accentText: string;
    accentBg: string;
    accentBorder: string;
    chipBorder: string;
    glow: string;
    ring: string;
  };
};

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

// --- DATA: THE ABSTRACTION HIERARCHY ---
const HIERARCHY: Layer[] = [
  {
    id: "L5",
    label: "Process",
    title: "Computation & Data",
    desc: "Active processing. Abstract machines simulating logic to extract meaning.",
    icon: Cpu,
    radius: 280,
    speed: 60,
    modules: [
      {
        title: "Computer Science",
        href: "/formal-science/computer-science",
        icon: Terminal,
        stat: "TURING_COMPLETE",
      },
      {
        title: "Data Science",
        href: "/formal-science/data-science",
        icon: Database,
        stat: "PREDICTIVE",
      },
    ],
    ui: {
      accentText: "text-emerald-300",
      accentBg: "bg-emerald-500",
      accentBorder: "border-emerald-500/30",
      chipBorder: "border-emerald-400/30",
      glow: "shadow-[0_0_28px_rgba(16,185,129,0.35)]",
      ring: "border-emerald-400/25",
    },
  },
  {
    id: "L4",
    label: "System",
    title: "Systems & Info",
    desc: "Structure & transmission. How parts interact and signals flow.",
    icon: Network,
    radius: 210,
    speed: 50,
    modules: [
      {
        title: "Systems Science",
        href: "/formal-science/systems-science",
        icon: Activity,
        stat: "HOLISTIC",
      },
      {
        title: "Information Science",
        href: "/formal-science/information-science",
        icon: Signal,
        stat: "ENTROPIC",
      },
    ],
    ui: {
      accentText: "text-violet-300",
      accentBg: "bg-violet-500",
      accentBorder: "border-violet-500/30",
      chipBorder: "border-violet-400/30",
      glow: "shadow-[0_0_28px_rgba(139,92,246,0.35)]",
      ring: "border-violet-400/25",
    },
  },
  {
    id: "L3",
    label: "Structure",
    title: "Mathematics",
    desc: "Number, quantity, and space. The hidden patterns of the universe.",
    icon: Calculator,
    radius: 140,
    speed: 40,
    modules: [
      {
        title: "Mathematics",
        href: "/formal-science/mathematics",
        icon: Key,
        stat: "UNIVERSAL",
      },
    ],
    ui: {
      accentText: "text-sky-300",
      accentBg: "bg-sky-500",
      accentBorder: "border-sky-500/30",
      chipBorder: "border-sky-400/30",
      glow: "shadow-[0_0_28px_rgba(56,189,248,0.35)]",
      ring: "border-sky-400/25",
    },
  },
  {
    id: "L2",
    label: "Logic",
    title: "Logic",
    desc: "Valid inference. The framework distinguishing truth from falsehood.",
    icon: Binary,
    radius: 80,
    speed: 30,
    modules: [
      {
        title: "Formal Logic",
        href: "/formal-science/logic",
        icon: ShieldCheck,
        stat: "DEDUCTIVE",
      },
    ],
    ui: {
      accentText: "text-cyan-300",
      accentBg: "bg-cyan-500",
      accentBorder: "border-cyan-500/30",
      chipBorder: "border-cyan-400/30",
      glow: "shadow-[0_0_28px_rgba(34,211,238,0.35)]",
      ring: "border-cyan-400/25",
    },
  },
];

export default function FormalSciencePage() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const moduleCount = useMemo(
    () => HIERARCHY.reduce((acc, l) => acc + l.modules.length, 0),
    []
  );

  const filteredHierarchy = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HIERARCHY;

    return HIERARCHY.map((layer) => ({
      ...layer,
      modules: layer.modules.filter((m) =>
        `${m.title} ${m.stat}`.toLowerCase().includes(q)
      ),
    })).filter((layer) => layer.modules.length > 0);
  }, [query]);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#020202] text-white selection:bg-cyan-500/30 font-sans flex flex-col md:flex-row">
      {/* Background & Ambient Effects */}
      <div className="absolute inset-0 opacity-50 pointer-events-none z-0">
        <GameOfLifeBackground />
      </div>

      {/* Softer vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/20 pointer-events-none z-0" />

      {/* --- LEFT PANEL: THE ORBITAL ENGINE --- */}
      <div className="relative z-10 w-full md:w-3/5 h-[52vh] md:h-full flex items-center justify-center overflow-hidden">
        {/* Title Overlay (Top Left) */}
        <div className="absolute top-6 left-8 pointer-events-none">
          <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-500 mb-1 opacity-90">
            <Sparkles size={10} />
            <span>DOMAIN_01 // THE_CODE</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase leading-[0.9]">
            Formal
            <br />
            Sciences
          </h1>

          <div className="mt-3 text-xs text-neutral-400 max-w-[22rem] leading-relaxed">
            A layered map of abstraction: axioms at the core, structure and systems in orbit,
            computation beyond.
          </div>
        </div>

        {/* ORBITAL SYSTEM */}
        <div className="relative flex items-center justify-center scale-[0.56] sm:scale-[0.62] md:scale-[0.85] transition-transform duration-500 translate-y-4 md:translate-y-0">
          {/* A. The Core (Axioms) */}
          <Link
            href="formal-science/axioms"
            className="relative z-50 group outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 focus-visible:ring-offset-0 rounded-full"
            aria-label="Axioms (L1)"
            onFocus={() => setActiveLayer("L1")}
            onBlur={() => setActiveLayer(null)}
          >
            <div
              className={cx(
                "w-16 h-16 rounded-full bg-black border border-red-500/50 flex items-center justify-center",
                "shadow-[0_0_32px_rgba(220,38,38,0.28)]",
                "transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_56px_rgba(220,38,38,0.55)]"
              )}
            >
              <InfinityIcon className="text-red-500" size={32} />
            </div>

            {/* Move tooltip ABOVE so it never clips at bottom */}
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 text-[10px] font-mono text-red-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              L1 // Axioms
            </div>
          </Link>

          {/* B. The Rings */}
          {HIERARCHY.map((layer, i) => {
            const isActive = activeLayer === layer.id;

            return (
              <div
                key={layer.id}
                // IMPORTANT: rings ignore pointer events, satellites opt-in.
                className="absolute rounded-full flex items-center justify-center pointer-events-none"
                style={{
                  width: layer.radius * 2,
                  height: layer.radius * 2,
                  zIndex: 40 - i,
                }}
              >
                {/* Ring Path */}
                <div
                  className={cx(
                    "absolute inset-0 rounded-full border border-dashed transition-all duration-500",
                    isActive ? cx(layer.ui.accentBorder, "border-opacity-100") : "border-white/8",
                    isActive && layer.ui.glow
                  )}
                />

                {/* Soft ring sheen */}
                <div
                  className={cx(
                    "absolute inset-0 rounded-full opacity-0 transition-opacity duration-500",
                    isActive && "opacity-100"
                  )}
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.10), rgba(255,255,255,0) 55%)",
                  }}
                />

                {/* Rotating Container */}
                <motion.div
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { repeat: Infinity, duration: layer.speed, ease: "linear" }
                  }
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Orbit tracer */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/80 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.65)]" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-t border-white/15 rotate-45" />

                  {/* Satellites */}
                  {layer.modules.map((mod, j) => {
                    const angle = (360 / layer.modules.length) * j;

                    const q = query.trim().toLowerCase();
                    const matches = !q || `${mod.title} ${mod.stat}`.toLowerCase().includes(q);

                    return (
                      <div
                        key={mod.title}
                        className="absolute top-0 left-1/2 -ml-4 -mt-4 w-8 h-8 pointer-events-auto"
                        style={{
                          transformOrigin: `50% ${layer.radius}px`,
                          transform: `rotate(${angle}deg)`,
                        }}
                      >
                        <Link
                          href={mod.href}
                          aria-label={mod.title}
                          className="outline-none"
                          onFocus={() => setActiveLayer(layer.id)}
                          onBlur={() => setActiveLayer(null)}
                        >
                          <motion.div
                            whileHover={reduceMotion ? undefined : { scale: 1.55 }}
                            whileFocus={reduceMotion ? undefined : { scale: 1.55 }}
                            className={cx(
                              "w-8 h-8 rounded-lg bg-[#0A0A0A] border flex items-center justify-center transition-all cursor-pointer group",
                              matches ? "opacity-100" : "opacity-25",
                              isActive ? "border-white/25" : "border-white/15",
                              "hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_22px_rgba(255,255,255,0.65)]",
                              "focus-visible:ring-2 focus-visible:ring-white/40"
                            )}
                            onMouseEnter={() => setActiveLayer(layer.id)}
                            onMouseLeave={() => setActiveLayer(null)}
                          >
                            <mod.icon
                              size={14}
                              className={cx(layer.ui.accentText, "group-hover:text-black")}
                            />
                          </motion.div>
                        </Link>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- RIGHT PANEL: THE TERMINAL LIST --- */}
      <div className="w-full md:w-2/5 h-[48vh] md:h-full bg-neutral-900/10 border-l border-white/5 backdrop-blur-md flex flex-col">
        {/* Header */}

        {/* Scrollable List */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-6 space-y-8"
        >
          {filteredHierarchy.map((layer) => {
            const isActive = activeLayer === layer.id;

            return (
              <motion.div
                key={layer.id}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0.72 }}
                onMouseEnter={() => setActiveLayer(layer.id)}
                onMouseLeave={() => setActiveLayer(null)}
                className={cx("transition-all duration-300", isActive && "translate-x-2")}
              >
                {/* Layer Header */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={cx(
                      "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border bg-white/5",
                      layer.ui.accentText,
                      layer.ui.chipBorder
                    )}
                  >
                    {layer.id}
                  </span>

                  <span
                    className={cx(
                      "text-sm font-bold uppercase tracking-wider",
                      isActive ? "text-white" : "text-neutral-400"
                    )}
                  >
                    {layer.title}
                  </span>

                  {isActive && <div className={cx("h-px flex-1 opacity-40", layer.ui.accentBg)} />}
                </div>

                <p className="text-xs text-neutral-500 mb-4 leading-relaxed max-w-sm">
                  {layer.desc}
                </p>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 gap-3">
                  {layer.modules.map((mod) => (
                    <Link
                      key={mod.title}
                      href={mod.href}
                      className={cx(
                        "group flex items-center justify-between p-3 rounded-xl border transition-all duration-200",
                        "outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                        isActive
                          ? "bg-white/5 border-white/20"
                          : "bg-transparent border-white/8 hover:bg-white/5 hover:border-white/12"
                      )}
                      onFocus={() => setActiveLayer(layer.id)}
                      onBlur={() => setActiveLayer(null)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cx(
                            "p-1.5 rounded-lg bg-black/50 border border-white/10",
                            layer.ui.accentText
                          )}
                        >
                          <mod.icon size={16} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-neutral-200 group-hover:text-white transition-colors">
                            {mod.title}
                          </div>
                          <div className="text-[10px] font-mono text-neutral-500 group-hover:text-cyan-300 transition-colors">
                            stat: {mod.stat}
                          </div>
                        </div>
                      </div>

                      <ArrowRight
                        size={14}
                        className="text-neutral-700 group-hover:text-white -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
                      />
                    </Link>
                  ))}
                </div>
              </motion.div>
            );
          })}
          {/* Core Footer in List */}
          <div className="pt-8 border-t border-white/5">
            <Link
              href="formal-science/axioms"
              className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-red-400/40 rounded-lg p-1 -ml-1 w-fit"
            >
              <InfinityIcon size={16} className="text-red-500" />
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
                Axiomatic Core // L1
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
