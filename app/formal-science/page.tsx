"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Binary,
  BookOpen,
  Braces,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Database,
  GitGraph,
  Network,
  Scale,
  Terminal,
} from "lucide-react";
import Assessment from "@/app/_components/Assessment";
import GameOfLifeBackground from "./_components/GameOfLifeBackground";
import LogicGateSimulator from "./_components/LogicGateSimulator";
import NetworkBackground from "./_components/NetworkBackground";
import { AbstractionLens, DeductionDeck } from "./_components/FormalScienceMiniLabs";
import { formalScienceQuiz } from "./_components/assessment";

const FIELD_GROUPS = [
  {
    id: "foundations",
    number: "01",
    title: "Foundations",
    signal: "define",
    items: [
      {
        title: "Logic",
        short: "valid inference",
        signal: "P → Q",
        icon: Scale,
        href: "/formal-science/logic",
        color: "text-rose-300",
        surface: "bg-rose-500/10",
        border: "border-rose-500/25",
        hover: "hover:border-rose-400/50 hover:bg-rose-950/30",
      },
      {
        title: "Mathematics",
        short: "abstract structure",
        signal: "x ∈ ℝ",
        icon: Binary,
        href: "/formal-science/mathematics",
        color: "text-cyan-300",
        surface: "bg-cyan-500/10",
        border: "border-cyan-500/25",
        hover: "hover:border-cyan-400/50 hover:bg-cyan-950/20",
      },
    ],
  },
  {
    id: "computation",
    number: "02",
    title: "Computation",
    signal: "transform",
    items: [
      {
        title: "Computer Science",
        short: "rules in motion",
        signal: "in → out",
        icon: Terminal,
        href: "/formal-science/computer-science",
        color: "text-violet-300",
        surface: "bg-violet-500/10",
        border: "border-violet-500/25",
        hover: "hover:border-violet-400/50 hover:bg-violet-950/20",
      },
      {
        title: "Information Science",
        short: "meaning and flow",
        signal: "data ⇄ info",
        icon: Database,
        href: "/formal-science/information-science",
        color: "text-sky-300",
        surface: "bg-sky-500/10",
        border: "border-sky-500/25",
        hover: "hover:border-sky-400/50 hover:bg-sky-950/20",
      },
    ],
  },
  {
    id: "systems",
    number: "03",
    title: "Analysis + systems",
    signal: "interpret",
    items: [
      {
        title: "Data Science",
        short: "pattern from data",
        signal: "data → model",
        icon: GitGraph,
        href: "/formal-science/data-science",
        color: "text-emerald-300",
        surface: "bg-emerald-500/10",
        border: "border-emerald-500/25",
        hover: "hover:border-emerald-400/50 hover:bg-emerald-950/20",
      },
      {
        title: "Systems Science",
        short: "parts interacting",
        signal: "out ↻ in",
        icon: Network,
        href: "/formal-science/systems-science",
        color: "text-amber-300",
        surface: "bg-amber-500/10",
        border: "border-amber-500/25",
        hover: "hover:border-amber-400/50 hover:bg-amber-950/20",
      },
    ],
  },
];

export default function FormalSciencePage() {
  const openVocabulary = () => {
    window.dispatchEvent(new Event("educationstation:open-vocabulary"));
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030305] text-slate-100 selection:bg-rose-500/30">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-90">
        <GameOfLifeBackground />
        <NetworkBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(rgba(244,63,94,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.035)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_70%_5%,rgba(244,63,94,0.16),transparent_32%),radial-gradient(circle_at_8%_72%,rgba(127,29,29,0.10),transparent_25%),linear-gradient(to_bottom,rgba(3,3,5,0.12),rgba(3,3,5,0.72))]" />
      <div className="pointer-events-none fixed inset-0 z-[2] opacity-30 mix-blend-soft-light bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_3px,rgba(255,255,255,0.018)_4px)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1280px] flex-col gap-3 px-3 py-3 sm:px-4 sm:py-4 lg:h-screen lg:min-h-[760px]">
        <header className="relative shrink-0 overflow-hidden rounded-[22px] border border-rose-500/25 bg-[linear-gradient(135deg,rgba(42,7,19,0.70),rgba(4,5,8,0.78))] shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_20px_55px_rgba(0,0,0,0.38),0_0_40px_rgba(244,63,94,0.055)] backdrop-blur-2xl">
          <PanelScrews />
          <div className="flex min-h-9 items-center justify-between border-b border-rose-500/20 bg-black/20 px-4 py-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-slate-500 transition-colors hover:text-white"
            >
              <ArrowLeft size={13} aria-hidden="true" />
              Home
            </Link>
            <button
              type="button"
              onClick={openVocabulary}
              className="inline-flex items-center gap-2 rounded-lg border border-rose-500/25 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-100 transition-colors hover:border-rose-400/50 hover:bg-rose-500/20"
            >
              <BookOpen size={14} aria-hidden="true" />
              Vocabulary
            </button>
          </div>

          <div className="grid items-center gap-4 px-4 py-4 sm:px-5 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-rose-400/30 bg-[linear-gradient(145deg,rgba(244,63,94,0.18),rgba(55,8,24,0.34))] text-rose-200 shadow-[inset_0_0_18px_rgba(244,63,94,0.11),0_0_24px_rgba(244,63,94,0.08)]">
                <Binary size={27} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Formal Science
                </h1>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">
                  Define the pieces, choose the rules, then follow what must be true.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 rounded-2xl border border-white/10 bg-black/30 p-2 shadow-[inset_0_0_22px_rgba(0,0,0,0.55)]">
              <SystemStage icon={CircleDot} title="Axioms" subtitle="pieces" />
              <ArrowRight size={14} className="text-rose-400/60" aria-hidden="true" />
              <SystemStage icon={Braces} title="Rules" subtitle="moves" />
              <ArrowRight size={14} className="text-rose-400/60" aria-hidden="true" />
              <SystemStage icon={CheckCircle2} title="Theorems" subtitle="results" />
            </div>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[0.88fr_1.22fr_0.78fr]">
          <FieldMap />
          <LogicGateSimulator />
          <aside className="grid min-h-0 gap-3 lg:grid-rows-[1.08fr_0.92fr]">
            <AbstractionLens />
            <DeductionDeck />
          </aside>
        </div>

        <details className="group relative shrink-0 overflow-hidden rounded-[18px] border border-rose-500/20 bg-[linear-gradient(135deg,rgba(30,6,15,0.70),rgba(3,4,7,0.80))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_16px_38px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-2.5 [&::-webkit-details-marker]:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-500/25 bg-rose-500/10 text-rose-300">
                <CheckCircle2 size={15} aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Check your understanding</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
                  {formalScienceQuiz.length} questions · opens below
                </div>
              </div>
            </div>
            <ChevronDown
              size={17}
              className="text-slate-600 transition-transform group-open:rotate-180 group-open:text-rose-300"
              aria-hidden="true"
            />
          </summary>
          <div className="border-t border-rose-500/20 p-3 sm:p-4">
            <Assessment
              title="Check your understanding"
              questions={formalScienceQuiz}
              accentColor="rose"
              onComplete={(score: number, total: number) =>
                console.log(`Formal Science assessment: ${score}/${total}`)
              }
            />
          </div>
        </details>
      </div>
    </main>
  );
}

function FieldMap() {
  return (
    <section className="relative flex min-h-0 flex-col overflow-hidden rounded-[20px] border border-rose-500/20 bg-[linear-gradient(145deg,rgba(34,7,17,0.72),rgba(3,4,7,0.82))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
      <PanelScrews />
      <header className="flex min-h-14 items-center justify-between border-b border-rose-500/20 px-4 py-2.5">
        <div>
          <h2 className="text-sm font-semibold text-white">Field map</h2>
          <p className="mt-0.5 text-[11px] text-slate-500">Six routes through formal systems.</p>
        </div>
        <span className="rounded-md border border-white/10 bg-black/30 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-rose-300/60">
          6 fields
        </span>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-3 divide-y divide-white/5">
        {FIELD_GROUPS.map((group) => (
          <div key={group.id} className="flex min-h-0 flex-col p-3">
            <div className="flex items-center justify-between gap-3 px-0.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-rose-400/60">{group.number}</span>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {group.title}
                </h3>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-700">
                {group.signal}
              </span>
            </div>

            <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 gap-2">
              {group.items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group relative flex min-h-0 flex-col justify-between overflow-hidden rounded-xl border bg-black/30 p-3 transition-all ${item.border} ${item.hover}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${item.border} ${item.surface} ${item.color}`}>
                      <item.icon size={15} aria-hidden="true" />
                    </div>
                    <span className={`font-mono text-[8px] ${item.color}`}>{item.signal}</span>
                  </div>
                  <div className="mt-3 min-w-0">
                    <h4 className="text-xs font-semibold leading-4 text-white">{item.title}</h4>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500">{item.short}</p>
                  </div>
                  <ArrowRight
                    size={12}
                    className="absolute bottom-3 right-3 text-slate-800 transition-all group-hover:translate-x-0.5 group-hover:text-white"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type SystemStageProps = {
  icon: typeof CircleDot;
  title: string;
  subtitle: string;
};

function SystemStage({ icon: Icon, title, subtitle }: SystemStageProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5 shadow-[inset_0_0_14px_rgba(255,255,255,0.012)]">
      <Icon size={14} className="text-rose-300" aria-hidden="true" />
      <div className="mt-1.5 text-xs font-semibold text-white">{title}</div>
      <div className="font-mono text-[8px] uppercase tracking-wider text-slate-600">{subtitle}</div>
    </div>
  );
}

function PanelScrews() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full border border-white/20 bg-black/70" />
      <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full border border-white/20 bg-black/70" />
      <span className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full border border-white/20 bg-black/70" />
      <span className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full border border-white/20 bg-black/70" />
    </div>
  );
}
