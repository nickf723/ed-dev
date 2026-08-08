"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Binary,
  Braces,
  CheckCircle2,
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
import { formalScienceQuiz } from "./_components/assessment";

const BRANCH_ROWS = [
  {
    id: "foundations",
    title: "Foundations",
    description: "Define the pieces and establish what counts as a valid result.",
    items: [
      {
        title: "Logic",
        description: "Reasoning, inference, truth, and proof.",
        signal: "P → Q",
        icon: Scale,
        href: "/formal-science/logic",
        iconClass: "text-rose-300",
        iconBackground: "bg-rose-500/10",
        borderClass: "border-rose-500/20",
        hoverClass: "hover:bg-rose-950/25",
        glowClass: "group-hover:shadow-[0_0_24px_rgba(244,63,94,0.12)]",
      },
      {
        title: "Mathematics",
        description: "Quantity, structure, space, patterns, and change.",
        signal: "x ∈ ℝ",
        icon: Binary,
        href: "/formal-science/mathematics",
        iconClass: "text-cyan-300",
        iconBackground: "bg-cyan-500/10",
        borderClass: "border-cyan-500/20",
        hoverClass: "hover:bg-cyan-950/20",
        glowClass: "group-hover:shadow-[0_0_24px_rgba(34,211,238,0.10)]",
      },
    ],
  },
  {
    id: "computation",
    title: "Computation and information",
    description: "Transform, organize, store, and retrieve formal information.",
    items: [
      {
        title: "Computer Science",
        description: "Algorithms, software, computation, and machines.",
        signal: "{ input → output }",
        icon: Terminal,
        href: "/formal-science/computer-science",
        iconClass: "text-violet-300",
        iconBackground: "bg-violet-500/10",
        borderClass: "border-violet-500/20",
        hoverClass: "hover:bg-violet-950/20",
        glowClass: "group-hover:shadow-[0_0_24px_rgba(167,139,250,0.10)]",
      },
      {
        title: "Information Science",
        description: "Meaning, organization, flow, and retrieval.",
        signal: "data ⇄ meaning",
        icon: Database,
        href: "/formal-science/information-science",
        iconClass: "text-sky-300",
        iconBackground: "bg-sky-500/10",
        borderClass: "border-sky-500/20",
        hoverClass: "hover:bg-sky-950/20",
        glowClass: "group-hover:shadow-[0_0_24px_rgba(125,211,252,0.10)]",
      },
    ],
  },
  {
    id: "analysis",
    title: "Analysis and systems",
    description: "Find patterns and understand how formal parts interact.",
    items: [
      {
        title: "Data Science",
        description: "Patterns, evidence, models, and prediction.",
        signal: "data → model",
        icon: GitGraph,
        href: "/formal-science/data-science",
        iconClass: "text-emerald-300",
        iconBackground: "bg-emerald-500/10",
        borderClass: "border-emerald-500/20",
        hoverClass: "hover:bg-emerald-950/20",
        glowClass: "group-hover:shadow-[0_0_24px_rgba(52,211,153,0.10)]",
      },
      {
        title: "Systems Science",
        description: "Feedback, relationships, emergence, and complexity.",
        signal: "output ↻ input",
        icon: Network,
        href: "/formal-science/systems-science",
        iconClass: "text-amber-300",
        iconBackground: "bg-amber-500/10",
        borderClass: "border-amber-500/20",
        hoverClass: "hover:bg-amber-950/20",
        glowClass: "group-hover:shadow-[0_0_24px_rgba(251,191,36,0.10)]",
      },
    ],
  },
];

export default function FormalSciencePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030305] text-slate-100 selection:bg-rose-500/30">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-90">
        <GameOfLifeBackground />
        <NetworkBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(rgba(244,63,94,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.035)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_68%_8%,rgba(244,63,94,0.13),transparent_34%),linear-gradient(to_bottom,rgba(3,3,5,0.10),rgba(3,3,5,0.66))]" />

      <div className="relative z-10 mx-auto max-w-[1480px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="overflow-hidden rounded-2xl border border-rose-500/25 bg-[#090307]/80 shadow-[0_0_40px_rgba(244,63,94,0.07)] backdrop-blur-xl">
          <div className="flex h-11 items-center justify-between border-b border-rose-500/15 bg-rose-950/15 px-4 sm:px-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-white"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Home
            </Link>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500/25" />
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500/45" />
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-rose-500/25 bg-rose-500/10 text-rose-300 shadow-[inset_0_0_18px_rgba(244,63,94,0.08)]">
                  <Binary size={27} aria-hidden="true" />
                </div>
                <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
                  Formal Science
                </h1>
              </div>

              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Abstract systems built from exact definitions and rules. Once the
                pieces are fixed, deduction determines what must follow.
              </p>
            </div>

            <div className="border-t border-rose-500/15 bg-black/25 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
              <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                <div className="rounded-xl border border-white/10 bg-black/35 p-4">
                  <CircleDot size={18} className="text-rose-300" aria-hidden="true" />
                  <div className="mt-3 font-semibold text-white">Axioms</div>
                  <div className="mt-1 text-xs text-slate-500">starting pieces</div>
                </div>
                <ArrowRight
                  size={17}
                  className="hidden text-rose-400 sm:block"
                  aria-hidden="true"
                />
                <div className="rounded-xl border border-white/10 bg-black/35 p-4">
                  <Braces size={18} className="text-rose-300" aria-hidden="true" />
                  <div className="mt-3 font-semibold text-white">Rules</div>
                  <div className="mt-1 text-xs text-slate-500">allowed moves</div>
                </div>
                <ArrowRight
                  size={17}
                  className="hidden text-rose-400 sm:block"
                  aria-hidden="true"
                />
                <div className="rounded-xl border border-white/10 bg-black/35 p-4">
                  <CheckCircle2
                    size={18}
                    className="text-rose-300"
                    aria-hidden="true"
                  />
                  <div className="mt-3 font-semibold text-white">Theorems</div>
                  <div className="mt-1 text-xs text-slate-500">required results</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-5 overflow-hidden rounded-2xl border border-rose-500/20 bg-black/65 shadow-[0_0_34px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex flex-col gap-1 border-b border-rose-500/15 px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Explore the field
            </h2>
            <p className="text-sm text-slate-500">
              Six branches arranged by the job they perform.
            </p>
          </div>

          <div className="divide-y divide-white/5">
            {BRANCH_ROWS.map((row, rowIndex) => (
              <div
                key={row.id}
                className="grid lg:grid-cols-[230px_minmax(0,1fr)_minmax(0,1fr)]"
              >
                <div className="flex gap-4 border-b border-white/5 bg-rose-950/10 p-5 lg:border-b-0 lg:border-r lg:p-6">
                  <span className="font-mono text-xs text-rose-400/70">
                    0{rowIndex + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-100">{row.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {row.description}
                    </p>
                  </div>
                </div>

                {row.items.map((item, itemIndex) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`group relative flex min-h-[138px] items-center gap-4 overflow-hidden border-white/5 p-5 transition-colors sm:p-6 ${
                      itemIndex === 0
                        ? "border-b lg:border-b-0 lg:border-r"
                        : ""
                    } ${item.hoverClass}`}
                  >
                    <div
                      className={`absolute inset-y-0 left-0 w-px ${item.iconBackground}`}
                      aria-hidden="true"
                    />
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${item.borderClass} ${item.iconBackground} ${item.iconClass} transition-shadow ${item.glowClass}`}
                    >
                      <item.icon size={22} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h4 className="text-lg font-semibold text-white">
                          {item.title}
                        </h4>
                        <span className={`font-mono text-xs ${item.iconClass}`}>
                          {item.signal}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={17}
                      className="shrink-0 text-slate-700 transition-all group-hover:translate-x-1 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-2xl border border-rose-500/20 bg-black/65 shadow-[0_0_34px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 border-b border-rose-500/15 px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Build a rule
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Flip the inputs, swap the gate, and follow the lit signal.
              </p>
            </div>
            <div className="font-mono text-xs text-rose-300/70">
              inputs → rule → result
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <LogicGateSimulator />
          </div>
        </section>

        <section className="mt-5 pb-24" aria-label="Formal Science assessment">
          <Assessment
            title="Check your understanding"
            questions={formalScienceQuiz}
            accentColor="rose"
            onComplete={(score: number, total: number) =>
              console.log(`Formal Science assessment: ${score}/${total}`)
            }
          />
        </section>
      </div>
    </main>
  );
}
