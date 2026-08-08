"use client";

import Link from "next/link";
import {
  ArrowRight,
  Binary,
  BookOpen,
  Braces,
  CheckCircle2,
  CircleDot,
  Database,
  GitGraph,
  Network,
  Scale,
  Terminal,
} from "lucide-react";
import GameOfLifeBackground from "./_components/GameOfLifeBackground";
import NetworkBackground from "./_components/NetworkBackground";

const CHILDREN = [
  {
    number: "01",
    title: "Logic",
    description: "Reasoning, inference, truth, and proof.",
    href: "/formal-science/logic",
    icon: Scale,
    accent: "text-rose-300",
    border: "border-rose-500/45",
    surface: "from-rose-950/55 via-rose-950/22 to-black/45",
    glow: "shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_0_34px_rgba(244,63,94,0.10)]",
    hover: "hover:border-rose-400/75 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.065),0_0_48px_rgba(244,63,94,0.18)]",
    aura: "bg-rose-500/16",
    dots: "bg-[radial-gradient(circle,rgba(251,113,133,0.42)_1px,transparent_1.5px)]",
  },
  {
    number: "02",
    title: "Mathematics",
    description: "Structure, patterns, quantity, space, and change.",
    href: "/formal-science/mathematics",
    icon: Binary,
    accent: "text-sky-300",
    border: "border-sky-500/45",
    surface: "from-sky-950/55 via-sky-950/20 to-black/45",
    glow: "shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_0_34px_rgba(14,165,233,0.10)]",
    hover: "hover:border-sky-400/75 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.065),0_0_48px_rgba(14,165,233,0.18)]",
    aura: "bg-sky-500/16",
    dots: "bg-[radial-gradient(circle,rgba(125,211,252,0.42)_1px,transparent_1.5px)]",
  },
  {
    number: "03",
    title: "Computer Science",
    description: "Algorithms, systems, software, and computation.",
    href: "/formal-science/computer-science",
    icon: Terminal,
    accent: "text-violet-300",
    border: "border-violet-500/45",
    surface: "from-violet-950/55 via-violet-950/20 to-black/45",
    glow: "shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_0_34px_rgba(139,92,246,0.10)]",
    hover: "hover:border-violet-400/75 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.065),0_0_48px_rgba(139,92,246,0.18)]",
    aura: "bg-violet-500/16",
    dots: "bg-[radial-gradient(circle,rgba(196,181,253,0.42)_1px,transparent_1.5px)]",
  },
  {
    number: "04",
    title: "Information Science",
    description: "Representation, meaning, organization, and retrieval.",
    href: "/formal-science/information-science",
    icon: Database,
    accent: "text-orange-300",
    border: "border-orange-500/45",
    surface: "from-orange-950/55 via-orange-950/20 to-black/45",
    glow: "shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_0_34px_rgba(249,115,22,0.10)]",
    hover: "hover:border-orange-400/75 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.065),0_0_48px_rgba(249,115,22,0.18)]",
    aura: "bg-orange-500/16",
    dots: "bg-[radial-gradient(circle,rgba(253,186,116,0.42)_1px,transparent_1.5px)]",
  },
  {
    number: "05",
    title: "Data Science",
    description: "Data, models, evidence, patterns, and insight.",
    href: "/formal-science/data-science",
    icon: GitGraph,
    accent: "text-teal-300",
    border: "border-teal-500/45",
    surface: "from-teal-950/55 via-teal-950/20 to-black/45",
    glow: "shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_0_34px_rgba(20,184,166,0.10)]",
    hover: "hover:border-teal-400/75 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.065),0_0_48px_rgba(20,184,166,0.18)]",
    aura: "bg-teal-500/16",
    dots: "bg-[radial-gradient(circle,rgba(94,234,212,0.42)_1px,transparent_1.5px)]",
  },
  {
    number: "06",
    title: "Systems Science",
    description: "Complex systems, feedback, behavior, and dynamics.",
    href: "/formal-science/systems-science",
    icon: Network,
    accent: "text-amber-300",
    border: "border-amber-500/45",
    surface: "from-amber-950/55 via-amber-950/20 to-black/45",
    glow: "shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_0_34px_rgba(245,158,11,0.10)]",
    hover: "hover:border-amber-400/75 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.065),0_0_48px_rgba(245,158,11,0.18)]",
    aura: "bg-amber-500/16",
    dots: "bg-[radial-gradient(circle,rgba(252,211,77,0.42)_1px,transparent_1.5px)]",
  },
];

export default function FormalSciencePage() {
  const openVocabulary = () => {
    window.dispatchEvent(new Event("educationstation:open-vocabulary"));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030305] text-slate-100 selection:bg-rose-500/30">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
        <GameOfLifeBackground />
        <NetworkBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(rgba(244,63,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.03)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_72%_8%,rgba(190,24,93,0.14),transparent_30%),radial-gradient(circle_at_15%_70%,rgba(127,29,29,0.08),transparent_28%),linear-gradient(to_bottom,rgba(3,3,5,0.12),rgba(3,3,5,0.74))]" />
      <div className="pointer-events-none fixed inset-0 z-[2] opacity-25 mix-blend-soft-light bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_3px,rgba(255,255,255,0.018)_4px)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1420px] flex-col justify-center px-4 py-5 sm:px-6 lg:min-h-[760px] lg:px-8 lg:py-6">
        <section className="relative overflow-hidden rounded-[28px] border border-rose-500/20 bg-[linear-gradient(145deg,rgba(25,5,13,0.68),rgba(2,3,5,0.80))] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_26px_80px_rgba(0,0,0,0.42),0_0_48px_rgba(244,63,94,0.045)] backdrop-blur-2xl">
          <PanelCorners />

          <header className="grid gap-5 border-b border-rose-500/15 px-5 py-5 sm:px-7 lg:grid-cols-[minmax(0,1fr)_210px_330px] lg:items-stretch lg:px-8 lg:py-6">
            <div className="flex min-w-0 flex-col justify-center">
              <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-rose-300/65">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.7)]" />
                Discipline hub
              </div>

              <h1 className="font-serif text-5xl font-medium leading-[0.95] tracking-[-0.035em] text-[#f7f3ef] sm:text-6xl lg:text-7xl">
                Formal Science
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Study abstract systems by defining, connecting, and proving.
              </p>

              <div className="mt-5 flex w-fit max-w-full items-center gap-2 rounded-xl border border-rose-500/20 bg-black/30 px-2 py-2 shadow-[inset_0_0_18px_rgba(0,0,0,0.52)]">
                <Stage icon={CircleDot} label="Axioms" />
                <ArrowRight size={14} className="shrink-0 text-rose-400/70" aria-hidden="true" />
                <Stage icon={Braces} label="Rules" />
                <ArrowRight size={14} className="shrink-0 text-rose-400/70" aria-hidden="true" />
                <Stage icon={CheckCircle2} label="Theorems" />
              </div>
            </div>

            <button
              type="button"
              onClick={openVocabulary}
              className="group relative overflow-hidden rounded-2xl border border-rose-500/20 bg-black/30 p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all hover:border-rose-400/45 hover:bg-rose-950/20"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300">
                  <BookOpen size={15} className="text-rose-300" aria-hidden="true" />
                  Vocabulary
                </div>
                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-slate-400">
                  151+
                </span>
              </div>
              <p className="mt-5 text-xs leading-5 text-slate-500">
                Definitions gathered from this field and every branch below it.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-rose-300">
                Explore
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </button>

            <div className="relative overflow-hidden rounded-2xl border border-rose-500/20 bg-[radial-gradient(circle_at_65%_45%,rgba(244,63,94,0.11),transparent_34%),rgba(0,0,0,0.28)] p-4 shadow-[inset_0_0_24px_rgba(244,63,94,0.025)]">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-rose-300/70">
                Formal mechanism
              </div>
              <FormalMechanism />
            </div>
          </header>

          <div className="px-4 pb-5 pt-5 sm:px-6 lg:px-7 lg:pb-7 lg:pt-6">
            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {CHILDREN.map((child) => (
                <ChildCard key={child.title} child={child} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

type Child = (typeof CHILDREN)[number];

function ChildCard({ child }: { child: Child }) {
  const Icon = child.icon;

  return (
    <Link
      href={child.href}
      className={`group relative min-h-[330px] overflow-hidden rounded-[22px] border bg-gradient-to-b p-5 transition-all duration-300 xl:min-h-[365px] ${child.border} ${child.surface} ${child.glow} ${child.hover}`}
    >
      <div className={`pointer-events-none absolute -left-8 top-4 h-40 w-40 rounded-full blur-3xl ${child.aura}`} />
      <div className={`pointer-events-none absolute right-4 top-4 h-9 w-16 bg-[size:8px_8px] opacity-35 ${child.dots}`} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

      <div className="relative flex h-full flex-col">
        <div className={`font-mono text-xs tracking-[0.14em] ${child.accent}`}>
          {child.number}
        </div>

        <div className="flex flex-1 items-center justify-center py-7">
          <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32 xl:h-28 xl:w-28 2xl:h-32 2xl:w-32">
            <div className={`absolute inset-0 rounded-full border opacity-30 ${child.border}`} />
            <div className={`absolute inset-[14px] rounded-full border opacity-25 ${child.border}`} />
            <div className={`absolute inset-[30px] rounded-2xl border bg-black/25 ${child.border} shadow-[inset_0_0_22px_rgba(0,0,0,0.55)]`} />
            <Icon size={42} strokeWidth={1.6} className={`relative z-10 drop-shadow-[0_0_12px_currentColor] ${child.accent}`} aria-hidden="true" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight text-white xl:text-lg 2xl:text-xl">
            {child.title}
          </h2>
          <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400 xl:text-xs xl:leading-5 2xl:text-sm 2xl:leading-6">
            {child.description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <ArrowRight
            size={20}
            className={`transition-transform duration-300 group-hover:translate-x-1 ${child.accent}`}
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}

function Stage({ icon: Icon, label }: { icon: typeof CircleDot; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-200">
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-rose-500/25 bg-rose-500/10 text-rose-300">
        <Icon size={13} aria-hidden="true" />
      </span>
      {label}
    </div>
  );
}

function FormalMechanism() {
  return (
    <div className="relative mt-3 h-[128px]" aria-label="Inputs combine under a formal rule to produce an output">
      <div className="absolute left-0 top-5 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
        Inputs
      </div>
      <div className="absolute right-0 top-5 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
        Output
      </div>

      <div className="absolute left-1 top-12 space-y-3">
        {["bg-rose-400", "bg-sky-400", "bg-violet-400"].map((color) => (
          <div key={color} className="flex items-center">
            <span className={`h-2 w-2 rounded-full border border-white/30 ${color}`} />
            <span className="h-px w-16 bg-gradient-to-r from-white/30 to-rose-500/30" />
          </div>
        ))}
      </div>

      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-[38%] items-center justify-center rounded-full border border-rose-400/45 bg-rose-950/30 shadow-[0_0_28px_rgba(244,63,94,0.20),inset_0_0_22px_rgba(244,63,94,0.08)]">
        <div className="absolute inset-2 rounded-full border border-rose-400/20" />
        <Binary size={25} className="relative text-rose-200" aria-hidden="true" />
      </div>

      <div className="absolute left-[calc(50%+40px)] right-6 top-[72px] flex items-center">
        <span className="h-px flex-1 bg-gradient-to-r from-rose-500/50 to-rose-400/20" />
        <ArrowRight size={12} className="text-rose-300/70" aria-hidden="true" />
        <span className="ml-2 h-3 w-3 rounded-full border border-rose-300/50 bg-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.35)]" />
      </div>
    </div>
  );
}

function PanelCorners() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-rose-400/35" />
      <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-rose-400/35" />
      <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-rose-400/25" />
      <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-rose-400/25" />
    </div>
  );
}
