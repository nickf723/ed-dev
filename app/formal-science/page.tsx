"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Binary,
  Database,
  GitGraph,
  Network,
  Scale,
  Terminal,
} from "lucide-react";
import Assessment from "@/app/_components/Assessment";
import LogicGateSimulator from "@/app/formal-science/_components/LogicGateSimulator";
import { formalScienceQuiz } from "./_components/assessment";

const BRANCH_GROUPS = [
  {
    id: "foundations",
    title: "Foundations",
    description: "The structures used to define objects and justify conclusions.",
    items: [
      {
        title: "Logic",
        description: "Valid reasoning, inference, truth, and proof.",
        icon: Scale,
        href: "/formal-science/logic",
        iconClass: "text-rose-300",
        iconBackground: "bg-rose-500/10",
        borderClass: "border-rose-500/20",
        hoverClass: "hover:border-rose-400/50 hover:bg-rose-950/20",
      },
      {
        title: "Mathematics",
        description: "Quantity, structure, space, patterns, and change.",
        icon: Binary,
        href: "/formal-science/mathematics",
        iconClass: "text-cyan-300",
        iconBackground: "bg-cyan-500/10",
        borderClass: "border-cyan-500/20",
        hoverClass: "hover:border-cyan-400/50 hover:bg-cyan-950/20",
      },
    ],
  },
  {
    id: "computation-and-information",
    title: "Computation and information",
    description: "How rules transform, organize, store, and retrieve information.",
    items: [
      {
        title: "Computer Science",
        description: "Computation, algorithms, software, and machines.",
        icon: Terminal,
        href: "/formal-science/computer-science",
        iconClass: "text-violet-300",
        iconBackground: "bg-violet-500/10",
        borderClass: "border-violet-500/20",
        hoverClass: "hover:border-violet-400/50 hover:bg-violet-950/20",
      },
      {
        title: "Information Science",
        description: "The organization, meaning, flow, and retrieval of information.",
        icon: Database,
        href: "/formal-science/information-science",
        iconClass: "text-sky-300",
        iconBackground: "bg-sky-500/10",
        borderClass: "border-sky-500/20",
        hoverClass: "hover:border-sky-400/50 hover:bg-sky-950/20",
      },
    ],
  },
  {
    id: "analysis-and-systems",
    title: "Analysis and systems",
    description: "Methods for finding patterns and understanding interacting parts.",
    items: [
      {
        title: "Data Science",
        description: "Extracting patterns, evidence, and useful models from data.",
        icon: GitGraph,
        href: "/formal-science/data-science",
        iconClass: "text-emerald-300",
        iconBackground: "bg-emerald-500/10",
        borderClass: "border-emerald-500/20",
        hoverClass:
          "hover:border-emerald-400/50 hover:bg-emerald-950/20",
      },
      {
        title: "Systems Science",
        description: "Relationships, feedback, emergence, and complex behavior.",
        icon: Network,
        href: "/formal-science/systems-science",
        iconClass: "text-amber-300",
        iconBackground: "bg-amber-500/10",
        borderClass: "border-amber-500/20",
        hoverClass: "hover:border-amber-400/50 hover:bg-amber-950/20",
      },
    ],
  },
];

export default function FormalSciencePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#08090d] text-slate-100 selection:bg-rose-500/30">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#08090d]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_75%_0%,rgba(244,63,94,0.12),transparent_34%),radial-gradient(circle_at_10%_45%,rgba(244,63,94,0.05),transparent_26%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(244,63,94,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.025)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <header className="max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-200"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Home
          </Link>

          <div className="mt-10 flex items-center gap-3">
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-rose-300">
              <Binary size={24} aria-hidden="true" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
              Formal Science
            </h1>
          </div>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Formal science studies abstract systems through precise definitions,
            rules, and deduction. Instead of testing a claim against the physical
            world, it asks what must follow from the structure we define.
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-slate-300"
            aria-label="The basic flow of a formal system"
          >
            <span className="rounded-lg bg-white/5 px-3 py-2">Assumptions</span>
            <ArrowRight size={16} className="text-rose-400" aria-hidden="true" />
            <span className="rounded-lg bg-white/5 px-3 py-2">Rules</span>
            <ArrowRight size={16} className="text-rose-400" aria-hidden="true" />
            <span className="rounded-lg bg-white/5 px-3 py-2">Conclusions</span>
          </div>
        </header>

        <section className="mt-20" aria-labelledby="formal-branches-heading">
          <div className="max-w-3xl">
            <h2
              id="formal-branches-heading"
              className="text-2xl font-bold text-white sm:text-3xl"
            >
              Explore the field
            </h2>
            <p className="mt-3 leading-7 text-slate-400">
              These branches share a concern for structure and valid reasoning,
              but each studies a different kind of formal object.
            </p>
          </div>

          <div className="mt-10 space-y-12">
            {BRANCH_GROUPS.map((group) => (
              <section key={group.title} aria-labelledby={`group-${group.id}`}>
                <div className="mb-5">
                  <h3
                    id={`group-${group.id}`}
                    className="text-base font-semibold text-slate-200"
                  >
                    {group.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {group.description}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {group.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={`group flex min-h-36 items-start gap-4 rounded-2xl border bg-black/25 p-5 transition-colors ${item.borderClass} ${item.hoverClass}`}
                    >
                      <div
                        className={`rounded-xl border border-white/5 p-3 ${item.iconBackground} ${item.iconClass}`}
                      >
                        <item.icon size={22} aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h4 className="text-lg font-semibold text-white">
                            {item.title}
                          </h4>
                          <ArrowRight
                            size={17}
                            className="shrink-0 text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-slate-300"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-3xl border border-rose-500/15 bg-black/25 p-5 sm:p-8 lg:p-10">
          <div className="grid items-start gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                From rules to results
              </h2>
              <p className="mt-4 leading-7 text-slate-300">
                A logic gate is a small formal system. It receives defined inputs,
                applies one exact rule, and produces the output required by that
                rule.
              </p>

              <ol className="mt-7 space-y-4 text-sm leading-6 text-slate-400">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-rose-500/25 bg-rose-500/10 text-xs text-rose-300">
                    1
                  </span>
                  Choose values for inputs A and B.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-rose-500/25 bg-rose-500/10 text-xs text-rose-300">
                    2
                  </span>
                  Select the rule that connects them.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-rose-500/25 bg-rose-500/10 text-xs text-rose-300">
                    3
                  </span>
                  Compare the result with the rule&apos;s definition.
                </li>
              </ol>
            </div>

            <div className="lg:col-span-3">
              <LogicGateSimulator />
            </div>
          </div>
        </section>

        <section className="mt-24 pb-24" aria-label="Formal Science assessment">
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
