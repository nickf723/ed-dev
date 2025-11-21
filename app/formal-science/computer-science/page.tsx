"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Terminal,
  BrainCog,
  Network,
  Lock,
  Database,
  Server,
  Wifi,
  Zap,
  Binary
} from "@/components/icons";
import React from "react";
import Link from "next/link";
import { Code, Cpu, Layers, Monitor } from "lucide-react";

const csSymbols = [
  "0", "1", "\\text{CPU}", "\\text{RAM}", "\\text{ALGO}", "\\text{NP}", "\\text{P}", "\\text{HALT}",
];

// --- DATA: Core Areas ---
const disciplines = [
  {
    title: "Algorithms & Complexity",
    desc: "The study of efficient methods for solving problems. How fast? How much memory?",
    href: "/formal-science/computer-science/algorithms-complexity",
    Icon: Terminal,
    className: "theme-computer-science",
    subtitle: "The Recipe"
  },
  {
    title: "Artificial Intelligence",
    desc: "Designing agents that perceive, learn, and act. From Search algorithms to Neural Networks.",
    href: "/formal-science/computer-science/artificial-intelligence",
    Icon: BrainCog,
    className: "theme-computer-science",
    subtitle: "Machine Minds"
  },
  {
    title: "Systems & Architecture",
    desc: "How computers are built. Operating systems, compilers, and hardware design.",
    href: "/formal-science/computer-science/systems",
    Icon: Cpu,
    className: "theme-computer-science",
    subtitle: "The Machine"
  },
  {
    title: "Networks & Distributed",
    desc: "Connecting computers to share data. The Internet, protocols, and cloud computing.",
    href: "/formal-science/computer-science/networking",
    Icon: Network,
    className: "theme-computer-science",
    subtitle: "Connection"
  },
  {
    title: "Security & Cryptography",
    desc: "Protecting data and communication. Encryption, protocols, and adversarial thinking.",
    href: "/formal-science/computer-science/security-cryptography",
    Icon: Lock,
    className: "theme-computer-science",
    subtitle: "Defense"
  },
  {
    title: "Software Engineering",
    desc: "The systematic application of engineering approaches to the development of software.",
    href: "/formal-science/computer-science/software-engineering",
    Icon: Code,
    className: "theme-computer-science",
    subtitle: "Building at Scale"
  },
];

// --- DATA: The Tech Stack (Sidebar) ---
const stack = [
  { title: "User / Application", Icon: Monitor, color: "text-blue-400" },
  { title: "Operating System", Icon: Layers, color: "text-green-400" },
  { title: "Machine Code", Icon: Binary, color: "text-orange-400" },
  { title: "Logic Gates", Icon: Zap, color: "text-yellow-400" },
  { title: "Physics (Transistors)", Icon: Cpu, color: "text-red-400" },
];

// --- DATA: Grand Challenges ---
const challenges = [
  {
    title: "P vs NP",
    desc: "Can every problem whose solution can be quickly verified also be quickly solved?",
    tag: "Complexity"
  },
  {
    title: "AGI Alignment",
    desc: "How do we ensure superintelligent AI systems remain aligned with human values?",
    tag: "AI Safety"
  },
  {
    title: "Quantum Supremacy",
    desc: "Building quantum computers that solve problems classical computers fundamentally cannot.",
    tag: "Hardware"
  }
];

// --- COMPONENT: Stack Layer ---
function StackLayer({ item, isLast }: { item: typeof stack[0]; isLast: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group hover:bg-white/5 px-3 rounded-lg transition-colors cursor-default">
       <div className="flex items-center gap-3">
         <item.Icon size={16} className={`${item.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
         <span className="text-sm font-medium text-neutral-400 group-hover:text-neutral-200">
           {item.title}
         </span>
       </div>
       {/* Visual Indicator of 'Depth' */}
       <div className="flex gap-1">
         <div className="h-1.5 w-1.5 rounded-full bg-neutral-800 group-hover:bg-white/20" />
         <div className="h-1.5 w-1.5 rounded-full bg-neutral-800 group-hover:bg-white/20" />
       </div>
    </div>
  );
}

// --- COMPONENT: Challenge Card ---
function ChallengeCard({ item }: { item: typeof challenges[0] }) {
  return (
    <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:border-neutral-600 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-neutral-200 text-sm">{item.title}</h4>
        <span className="text-[10px] uppercase font-bold text-white/40 bg-white/5 px-1.5 py-0.5 rounded">
          {item.tag}
        </span>
      </div>
      <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
    </div>
  );
}

export default function ComputerSciencePage() {
  return (
    <main className="topic-page theme-computer-science lg:px-16">
      <FloatingSymbols symbols={csSymbols} />
      <PageHeader
        eyebrow="Formal Science"
        title="Computer Science"
        subtitle="The study of computation, automation, and information. From the theoretical limits of what can be computed to the practical design of globe-spanning networks."
      />

      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* MAIN CONTENT: Disciplines (8 cols) */}
        <div className="lg:col-span-8">
           <div className="mb-8 flex items-center gap-2 border-b border-neutral-800 pb-4">
            <Terminal className="text-green-400" />
            <h2 className="text-2xl font-bold text-neutral-100">Areas of Study</h2>
          </div>
          
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {disciplines.map((branch) => (
              <TopicCard
                key={branch.href}
                href={branch.href}
                title={branch.title}
                desc={branch.desc}
                Icon={branch.Icon}
                className={branch.className}
                subtitle={branch.subtitle}
              />
            ))}
          </section>
        </div>

        {/* SIDEBAR: The Stack & Challenges (4 cols) */}
        <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-24 h-fit">
          
          {/* The Computing Stack */}
          <div className="glass p-1 rounded-2xl border border-green-900/20 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80">
             <div className="p-4 border-b border-white/5">
               <h3 className="text-sm font-bold uppercase tracking-widest text-green-400 flex items-center gap-2">
                 <Layers size={16} /> The Computing Stack
               </h3>
             </div>
             <div className="p-2 flex flex-col-reverse"> {/* Reversed to show Physics at bottom */}
               {stack.map((layer, index) => (
                 <StackLayer key={layer.title} item={layer} isLast={index === stack.length - 1} />
               ))}
             </div>
          </div>

          {/* Grand Challenges */}
          <div>
             <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-neutral-200">
              <Zap className="text-yellow-500" /> Grand Challenges
            </h3>
            <div className="space-y-3">
              {challenges.map((c) => (
                 <ChallengeCard key={c.title} item={c} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}