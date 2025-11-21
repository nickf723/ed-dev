"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Network,
  Waves,
  RefreshCcw,
  Sigma,
  GitMerge,
  Target,
  Users
} from "@/components/icons";
import React, { Activity } from "react";

const systemsScienceSymbols = [
  "\\Sigma F", "I \\to O", "\\text{Feedback}", "E=mc^2", "\\frac{dx}{dt}", "\\approx", "\\lambda", "\\phi",
];

const branches = [
  {
    title: "General Systems Theory",
    desc: "The search for universal principles that apply to systems in nature, society, and technology.",
    href: "/formal-science/systems-science/general-systems-theory",
    Icon: Network,
    className: "theme-systems-science",
  },
  {
    title: "Complexity & Chaos",
    desc: "Studying how order emerges from chaos, the butterfly effect, and non-linear dynamics.",
    href: "/formal-science/systems-science/complexity-chaos",
    Icon: Waves,
    className: "theme-systems-science",
  },
  {
    title: "Cybernetics",
    desc: "The science of communication and control. How systems regulate themselves through feedback.",
    href: "/formal-science/systems-science/cybernetics-control",
    Icon: RefreshCcw,
    className: "theme-systems-science",
  },
  {
    title: "System Dynamics",
    desc: "Modeling complex problems by mapping stocks, flows, and causal loops over time.",
    href: "/formal-science/systems-science/system-dynamics",
    Icon: Sigma,
    className: "theme-systems-science",
  },
];

// --- DATA: Archetypes ---
const archetypes = [
  { title: "Balancing Loop", desc: "A system that seeks stability (e.g., a thermostat).", Icon: RefreshCcw, color: "text-emerald-400" },
  { title: "Reinforcing Loop", desc: "A system that grows exponentially (e.g., viral content).", Icon: Activity, color: "text-red-400" },
  { title: "Tragedy of the Commons", desc: "Individuals acting rationally deplete a shared resource.", Icon: Users, color: "text-amber-400" }, // Need Users imported if not available use generic
];

function ArchetypeRow({ item }: { item: any }) {
  return (
    <div className="flex gap-3 py-3 border-b border-white/5 last:border-0">
      <div className={`mt-0.5 ${item.color}`}><item.Icon size={16} /></div>
      <div>
        <h4 className="text-sm font-bold text-neutral-200">{item.title}</h4>
        <p className="text-xs text-neutral-500 mt-0.5">{item.desc}</p>
      </div>
    </div>
  );
}

export default function SystemsSciencePage() {
  return (
    <main className="topic-page theme-systems-science lg:px-16">
      <FloatingSymbols symbols={systemsScienceSymbols} />
      <PageHeader
        eyebrow="Formal Science"
        title="Systems Science"
        subtitle="The study of complexity. How parts interact to form wholes, and how patterns like feedback and emergence appear across biology, sociology, and engineering."
      />

      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
           <div className="mb-8 flex items-center gap-2 border-b border-neutral-800 pb-4">
            <GitMerge className="text-purple-400" />
            <h2 className="text-2xl font-bold text-neutral-100">Core Frameworks</h2>
          </div>
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {branches.map((branch) => (
              <TopicCard key={branch.href} {...branch} />
            ))}
          </section>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <div className="glass p-6 rounded-2xl border border-purple-900/20 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80">
             <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-purple-400 flex items-center gap-2">
               <Target size={16} /> Systems Archetypes
             </h3>
             <div>
               {archetypes.map((a) => <ArchetypeRow key={a.title} item={a} />)}
             </div>
          </div>

          <div className="p-5 rounded-xl border border-dashed border-neutral-700/50 bg-neutral-900/20">
            <h4 className="text-sm font-bold text-neutral-300 mb-2">Emergence</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              "The whole is greater than the sum of its parts." Emergence occurs when complex patterns arise from simple interactions (e.g., a flock of birds).
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}